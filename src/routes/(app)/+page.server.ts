import { fail, type Actions, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { z } from 'zod';
import type { FilterValidationError } from '$lib/types/types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	const listings = await prisma.listing.findMany({
		orderBy: {
			_relevance: {
				fields: ['street_address', 'city', 'state', 'country'],
				search: session?.user.address?.split(' ').join(' & ') || '',
				sort: 'desc'
			}
		},
		include: {
			agent: true,
			images: true
		}
	});

	return {
		listings
	};
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		throw redirect(302, '/auth/login'); // redirect to login page
	},

	filter: async ({ request }) => {
		const formData = await request.formData();
		const city = formData.get('city');
		const state = formData.get('state');
		const country = formData.get('country');
		const minPrice = formData.getAll('price-range')[0];
		const maxPrice = formData.getAll('price-range')[1];
		const bedrooms = formData.get('listing-type');
		const bathrooms = formData.get('listing-bathrooms');
		const modalBedrooms = formData.get('filter-listing-type');
		const modalBathrooms = formData.get('filter-listing-bathrooms');

		const listingFilterSchema = z
			.object({
				city: z
					.string({ required_error: 'City is required' })
					.min(3, 'City must be at least 3 characters long')
					.optional(),
				state: z
					.string({ required_error: 'State is required' })
					.min(3, 'State must be at least 3 characters long')
					.optional(),
				country: z.string({ required_error: 'Country is required' }).optional(),
				minPrice: z // In naira symbol
					.number({ required_error: 'Price is required' })
					.min(1, 'Price must be at least ₦1')
					.optional(),
				maxPrice: z // In naira symbol
					.number({ required_error: 'Price is required' })
					.min(1, 'Price must be at least ₦1')
					.optional(),
				bedrooms: z
					.number({ required_error: 'Bedrooms is required' })
					.min(1, 'Bedrooms must be at least 1')
					.optional(),
				bathrooms: z
					.number({ required_error: 'Bathrooms is required' })
					.min(1, 'Bathrooms must be at least 1')
					.optional(),
				modalBedrooms: z
					.number({ required_error: 'Bedrooms is required' })
					.min(1, 'Bedrooms must be at least 1')
					.optional(),
				modalBathrooms: z
					.number({ required_error: 'Bathrooms is required' })
					.min(1, 'Bathrooms must be at least 1')
					.optional()
			})
			.superRefine(({ minPrice, maxPrice }, ctx) => {
				if (minPrice && maxPrice) {
					if (minPrice >= maxPrice) {
						ctx.addIssue({
							code: 'custom',
							message: 'Max.price must be greater than Min.price',
							path: ['maxPrice']
						});
					}
				}
			});
		const body = {
			...(city && { city: String(city) }),
			...(state && { state: String(state) }),
			...(country && { country: String(country) }),
			...(minPrice && { minPrice: Number(minPrice) }),
			...(maxPrice && { maxPrice: Number(maxPrice) }),
			...(bedrooms && { bedrooms: Number(bedrooms) }),
			...(bathrooms && { bathrooms: Number(bathrooms) }),
			...(modalBedrooms && { modalBedrooms: Number(modalBedrooms) }),
			...(modalBathrooms && { modalBathrooms: Number(modalBathrooms) })
		};

		try {
			// console.log(body);

			const validatedData = listingFilterSchema.parse(body);
			const filteredListings = await prisma.listing.findMany({
				where: {
					bathrooms: {
						...(validatedData.bathrooms &&
							validatedData.modalBathrooms && {
								lte:
									validatedData.bathrooms > validatedData.modalBathrooms
										? validatedData.bathrooms
										: validatedData.modalBathrooms,
								gte:
									validatedData.bathrooms > validatedData.modalBathrooms
										? validatedData.bathrooms
										: validatedData.modalBathrooms
							}),
						...(validatedData.bathrooms &&
							!validatedData.modalBathrooms && {
								equals: validatedData.bathrooms
							}),
						...(validatedData.modalBathrooms &&
							!validatedData.bathrooms && {
								equals: validatedData.modalBathrooms
							})
					},
					bedrooms: {
						...(validatedData.bedrooms &&
							validatedData.modalBedrooms && {
								lte:
									validatedData.bedrooms > validatedData.modalBedrooms
										? validatedData.bedrooms
										: validatedData.modalBedrooms,
								gte:
									validatedData.bedrooms > validatedData.modalBedrooms
										? validatedData.bedrooms
										: validatedData.modalBedrooms
							}),
						...(validatedData.bedrooms &&
							!validatedData.modalBedrooms && {
								equals: validatedData.bedrooms
							}),
						...(validatedData.modalBedrooms &&
							!validatedData.bedrooms && {
								equals: validatedData.modalBedrooms
							})
					},
					price: {
						...(validatedData.maxPrice && {
							lte: validatedData.maxPrice
						}),
						...(validatedData.minPrice && {
							gte: validatedData.minPrice
						})
					},
					country: {
						...(validatedData.country && {
							equals: validatedData.country
						})
					},
					state: {
						...(validatedData.state && {
							equals: validatedData.state
						})
					},
					city: {
						...(validatedData.city && {
							equals: validatedData.city
						})
					}
				}
			});

			if (filteredListings.length > 0) {
				// console.log(filteredListings);

				return {
					filtered: filteredListings
				};
			} else {
				return fail(404, {
					errors: {
						server: ['Matching listings not found']
					}
				});
			}
		} catch (e) {
			if (e instanceof z.ZodError) {
				// console.log(e.issues);
				const errors = e.flatten().fieldErrors as FilterValidationError;

				return fail(400, {
					errors
				});
			}

			// console.log(e);
		}

		return fail(500, {
			errors: {
				server: ['Ooops something went wrong!!']
			} as FilterValidationError
		});
	}
};
