import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { auth } from '$lib/server/lucia';
import { Role } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

let schema = z
	.object({
		email: z
			.string({
				required_error: 'Email is required'
			})
			.email({
				message: 'Email is invalid'
			}),
		password: z
			.string({
				required_error: 'Password is required'
			})
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
				message:
					'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
			}),
		confirmPassword: z.string({
			required_error: 'Confirm password is required'
		})
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['confirmPassword']
			});
		}
	});

type Error = {
	email?: [string];
	password?: [string];
	confirmPassword?: [string];
	server?: [string];
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirmPassword');
		const type = formData.get('type');

		const dataToValidate = {
			...(email && { email }),
			...(password && { password }),
			...(confirmPassword && { confirmPassword })
		};

		try {
			const validatedData = schema.parse(dataToValidate);
			const user = await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: validatedData.email.toLowerCase(),
					password: validatedData.password
				},
				attributes: {
					email: validatedData.email,
					role: type === 'user' ? Role.USER : Role.AGENT
				}
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			locals.auth.setSession(session);

			return {
				success: true,
				user: session.user
			};
		} catch (error) {
			let toSend = {
				message: 'Oops, something went wrong!',
				errors: {} as Error
			};
			if (error instanceof z.ZodError) {
				let validationError = error.flatten().fieldErrors as Error;
				return fail(400, {
					message: 'Validation failed',
					errors: validationError
				});
			} else if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					toSend.errors.server = ['User with this email already exists'];
					return fail(409, toSend);
				}
				return fail(500, toSend);
			} else {
				return fail(500, toSend);
			}
		}
	}
};
