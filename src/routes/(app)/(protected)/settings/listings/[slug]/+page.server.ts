import { redirect, type Actions, fail } from '@sveltejs/kit';
import prisma from '../../../../../../lib/server/prisma';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { deleteImage, uploadImage } from '$lib/server/firebase';
import { slugifyTitle } from '$lib/utils';
import { ListingSchema, type ListingValidationError } from '$lib/schemas/listing.schema';

export const load = (async ({ params, locals, url }) => {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, `/auth/login?redirect=${url.pathname}`);
	}

	const listing = await prisma.listing.findUnique({
		where: {
			slug: params.slug
		},
		include: {
			images: true,
			agent: true
		}
	});

	if (!listing) {
		throw redirect(302, '/settings/listings?message=Listing does not exist');
	}

	if (listing.agent.id !== session.user.userId) {
		throw redirect(302, '/settings/listings?message=You are not authorized to edit this listing');
	}

	return {
		listing
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();

		const images = formData.getAll('images');
		const slug = formData.get('slug');
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
			const listing = await prisma.listing.findUnique({
				where: {
					slug: slug as string
				},
				include: {
					images: true
				}
			});

			if (!listing) {
				throw redirect(302, '/settings/listings?message=Listing does not exist');
			}

			const validated = ListingSchema.parse(body);

			let uploadedImages: any[] = [];

			if (validated.images.length > 0 && validated.images[0].type !== 'application/octet-stream') {
				for (let i = 0; i < validated.images.length; i++) {
					const image = validated.images[i];

					const imageUrl = await uploadImage(image);

					uploadedImages.push(imageUrl);
				}
			}

			let { images: _, ...rest } = validated;

			await prisma.listing.update({
				where: {
					slug: slug as string
				},
				data: {
					...rest,
					slug: slugifyTitle(validated.title),
					agent_id: session.user.userId,
					...(uploadedImages.length > 0 && {
						images: {
							deleteMany: {
								listingId: listing.id
							},
							create: uploadedImages.map((url) => ({
								url
							}))
						}
					})
				}
			});

			listing.images.forEach(async (image) => {
				try {
					await deleteImage(image.url);
				} catch {
					console.log('Failed delete: ', image);
				}
			});

			return {
				success: true,
				message: 'Listing updated successfully'
			};
		} catch (err) {
			if (err instanceof z.ZodError) {
				let errors = err.flatten().fieldErrors as ListingValidationError;
				let imageErrors: string[] = [];
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
