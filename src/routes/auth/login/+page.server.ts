import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { auth } from '$lib/server/lucia';

let schema = z.object({
	email: z
		.string({
			required_error: 'Email is required'
		})
		.email({
			message: 'Email is invalid'
		}),
	password: z.string({
		required_error: 'Password is required'
	})
});

type Error = {
	email?: [string];
	password?: [string];
	server?: [string];
};

export let actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		const dataToValidate = {
			...(email && { email }),
			...(password && { password })
		};

		try {
			const validatedData = schema.parse(dataToValidate);

			const key = await auth.useKey(
				'email',
				validatedData.email.toLowerCase(),
				validatedData.password
			);
			const session = await auth.createSession({
				userId: key.userId,
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
