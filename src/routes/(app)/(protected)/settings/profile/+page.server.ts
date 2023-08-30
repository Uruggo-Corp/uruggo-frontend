import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { z } from 'zod';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

const schema = z.object({
	first_name: z.string().optional(),
	last_name: z.string().optional(),
	phone_number: z.string().optional(),
	address: z.string().optional()
});

type Error = {
	first_name?: [string];
	last_name?: [string];
	phone_number?: [string];
	address?: [string];
	server?: [string];
};

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const first_name = formData.get('first_name');
		const last_name = formData.get('last_name');
		const phone_number = formData.get('phone_number');
		const address = formData.get('address');

		const dataToValidate = {
			...(first_name?.toString().length && { first_name }),
			...(last_name?.toString().length && { last_name }),
			...(phone_number?.toString().length && { phone_number }),
			...(address?.toString().length && { address })
		};

		try {
			const dataToUpdate = schema.parse(dataToValidate);

			const session = await locals.auth.validate();
			if (!session) {
				throw redirect(
					302,
					`/auth/login?redirect=${url.pathname}&message=You must be logged in to do that`
				);
			}

			// Check if phone number is already in use
			if (dataToUpdate.phone_number) {
				const userWithPhoneNumber = await prisma.user.findFirst({
					where: {
						phone_number: dataToUpdate.phone_number
					}
				});

				if (userWithPhoneNumber && userWithPhoneNumber.id !== session.user.userId) {
					return fail(400, {
						message: 'Phone number is already in use',
						errors: {
							phone_number: ['Phone number is already in use']
						} as Error
					});
				}
			}

			const user = await prisma.user.update({
				where: {
					id: session.user.userId
				},
				data: {
					...dataToUpdate
				}
			});

			return {
				success: true,
				user
			};
		} catch (error) {
			console.log(error);
			return fail(500, {
				message: 'Failed to update profile',
				errors: {
					server: ['Failed to update profile']
				} as Error
			});
		}
	}
};
