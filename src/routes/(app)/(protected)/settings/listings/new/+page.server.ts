import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { uploadImage } from '$lib/server/upload';
import prisma from '$lib/server/prisma';
import { slugifyTitle } from '$lib/utils';
import { ListingSchema, type ListingValidationError } from '$lib/schemas/listing.schema';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();

		const images = formData.getAll('images');
		const title = formData.get('title');
		const description = formData.get('description');
		const street_address = formData.get('street_address');
		const city = formData.get('city');
		const state = formData.get('state');
		const zip_code = formData.get('zip_code');
		const country = formData.get('country');
		const price = formData.get('price');
		const bedrooms = formData.get('bedrooms');
		const bathrooms = formData.get('bathrooms');

		const session = await locals.auth.validate();

		if (!session) {
			throw redirect(302, `/auth/login?redirect=${url.pathname}`);
		}

		const body = {
			...(title && { title }),
			...(description && { description }),
			...(street_address && { street_address }),
			...(city && { city }),
			...(state && { state }),
			...(zip_code && { zip_code }),
			...(country && { country }),
			...(price && { price: Number(price) }),
			...(bedrooms && { bedrooms: Number(bedrooms) }),
			...(bathrooms && { bathrooms: Number(bathrooms) }),
			...(images && { images })
		};

		try {
			const validated = ListingSchema.parse(body);

			const uploadedImages: any[] = [];

			for (let i = 0; i < validated.images.length; i++) {
				const image = validated.images[i];

				const imageUrl = await uploadImage(image);

				uploadedImages.push(imageUrl);
			}

			console.log(uploadedImages);

			await prisma.listing.create({
				data: {
					...validated,
					slug: slugifyTitle(validated.title),
					agent_id: session.user.userId,
					images: {
						create: uploadedImages.map((url) => ({
							url
						}))
					}
				}
			});

			// validated.images.forEach(async (image: any) => {
			// 	const imageUrl = await uploadImage(image);

			// 	await prisma.image.create({
			// 		data: {
			// 			url: imageUrl,
			// 			listingId: listing.id
			// 		}
			// 	});
			// });

			return {
				success: true,
				message: 'Listing created successfully'
			};
		} catch (err) {
			if (err instanceof z.ZodError) {
				const errors = err.flatten().fieldErrors as ListingValidationError;
				const imageErrors: string[] = [];
				if (errors.images) {
					errors.images.forEach((error) => {
						if (!imageErrors.includes(error)) {
							imageErrors.push(error);
						}
					});

					errors.images = imageErrors;
				}

				return fail(400, {
					errors
				});
			}

			return fail(500, {
				errors: {
					server: ['Something went wrong. Please try again later']
				} as ListingValidationError
			});
		}
	}
};
