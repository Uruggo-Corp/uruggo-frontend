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
		const location = formData.get('location');
		const city = formData.get('city');
		const state = formData.get('state');
		const country = formData.get('country');
		const minPrice = formData.getAll('price-range')[0];
		const maxPrice = formData.getAll('price-range')[1];
		const bedrooms = formData.get('bedrooms');
		const bathrooms = formData.get('bathrooms');

		const listingFilterSchema = z
			.object({
				location: z
					.string({ required_error: 'Location is required' })
					.min(3, 'Location must be at least 3 characters long')
					.optional(),
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
			...(location && { location: String(location) }),
			...(city && { city: String(city) }),
			...(state && { state: String(state) }),
			...(country && { country: String(country) }),
			...(minPrice && { minPrice: Number(minPrice) }),
			...(maxPrice && { maxPrice: Number(maxPrice) }),
			...(bedrooms && { bedrooms: Number(bedrooms) }),
			...(bathrooms && { bathrooms: Number(bathrooms) })
		};

		try {
			const validatedData = listingFilterSchema.parse(body);
			const filteredListings = await prisma.listing.findMany({
				where: {
					...(validatedData.location && {
						OR: [
							{
								city: {
									search: validatedData.location
								}
							},
							{
								street_address: {
									search: validatedData.location
								}
							},
							{
								state: {
									search: validatedData.location
								}
							},
							{
								country: {
									search: validatedData.location
								}
							}
						]
					}),
					...(validatedData.bathrooms && {
						bathrooms: {
							equals: validatedData.bathrooms
						}
					}),
					...(validatedData.bedrooms && {
						bedrooms: {
							equals: validatedData.bedrooms
						}
					}),
					...(validatedData.maxPrice &&
						validatedData.minPrice && {
							price: {
								lte: validatedData.maxPrice,
								gte: validatedData.minPrice
							}
						}),

					...(validatedData.country && {
						country: {
							equals: validatedData.country
						}
					}),
					...(validatedData.state && {
						state: {
							equals: validatedData.state
						}
					}),
					...(validatedData.city && {
						city: {
							equals: validatedData.city
						}
					})
				},
				include: {
					agent: true,
					images: true
				}
			});

			if (filteredListings && filteredListings.length > 0) {
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
				const errors = e.flatten().fieldErrors as FilterValidationError;
				console.log(errors);

				return fail(400, {
					errors
				});
			}
		}

		return fail(500, {
			errors: {
				server: ['Ooops something went wrong!!']
			} as FilterValidationError
		});
	}
};
