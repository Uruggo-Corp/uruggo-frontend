import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { z } from 'zod';
import { uploadImage } from '$lib/server/upload';
import type { ListingValidationError } from '$lib/schemas/listing.schema';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

const MAX_FILE_SIZE = 5000000;
const schema = z.object({
	first_name: z.string().optional(),
	last_name: z.string().optional(),
	phone_number: z.string().optional(),
	address: z.string().optional(),
	avatar: z
		.any()
		.refine((image) => image.size < MAX_FILE_SIZE, 'Image is too large')
		.refine(
			(image) => image.type.startsWith('image/') || image.type === 'application/octet-stream',
			'Only .jpg, .jpeg, .png and .webp formats are supported.'
		)
});

type Error = {
	first_name?: [string];
	last_name?: [string];
	phone_number?: [string];
	address?: [string];
	server?: [string];
	avatar?: [string];
};

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const first_name = formData.get('first_name');
		const last_name = formData.get('last_name');
		const phone_number = formData.get('phone_number');
		const address = formData.get('address');
		const avatar = formData.getAll('image')[0];

		const dataToValidate = {
			...(first_name?.toString().length && { first_name }),
			...(last_name?.toString().length && { last_name }),
			...(phone_number?.toString().length && { phone_number }),
			...(address?.toString().length && { address }),
			...(avatar && { avatar })
		};

		try {
			const dataToUpdate = schema.parse(dataToValidate);

			if (dataToUpdate?.avatar && dataToUpdate.avatar.type.startsWith('image/')) {
				const imageUrl = await uploadImage(dataToUpdate.avatar);
				dataToUpdate.avatar = imageUrl;
			}
			const session = await locals.auth.validate();
			if (!session) {
				throw redirect(
					302,
					`/auth/login?redirect=${url.pathname}&message=You must be logged in to perfom this action`
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
		} catch (err) {
			console.log(avatar);
			if (err instanceof z.ZodError) {
				const errors = err.flatten().fieldErrors as ListingValidationError;

				return fail(400, {
					errors
				});
			}
			return fail(500, {
				message: 'Failed to update profile',
				errors: {
					server: ['Failed to update profile']
				} as Error
			});
		}
	}
};
