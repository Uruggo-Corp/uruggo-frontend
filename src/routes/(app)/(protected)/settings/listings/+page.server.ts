import { ListingStatus, Role } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session?.user.role !== Role.AGENT) {
		throw redirect(302, `/?message=You are not an agent`);
	}

	const listings = await prisma.listing.findMany({
		where: {
			agent_id: session.user.userId
		},
		include: {
			images: true,
			agent: true
		},
		orderBy: {
			created_at: 'desc'
		}
	});

	const availableListings = await prisma.listing.findMany({
		where: {
			agent_id: session.user.userId,
			status: ListingStatus.AVAILABLE
		},
		include: {
			images: true,
			agent: true
		},
		orderBy: {
			created_at: 'desc'
		}
	});

	const pendingListings = await prisma.listing.findMany({
		where: {
			agent_id: session.user.userId,
			status: ListingStatus.PENDING
		},
		include: {
			images: true,
			agent: true
		},
		orderBy: {
			created_at: 'desc'
		}
	});

	const rentedListings = await prisma.listing.findMany({
		where: {
			agent_id: session.user.userId,
			status: ListingStatus.RENTED
		},
		include: {
			images: true,
			agent: true
		},
		orderBy: {
			created_at: 'desc'
		}
	});

	return {
		listings,
		availableListings,
		pendingListings,
		rentedListings
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const formData = await request.formData();

		const slug = formData.get('slug') as string;

		const session = await locals.auth.validate();

		if (session?.user.role !== Role.AGENT) {
			throw redirect(302, `/?message=You are not an agent`);
		}

		const listing = await prisma.listing.findFirst({
			where: {
				slug
			}
		});

		if (listing?.agent_id !== session?.user.userId) {
			throw redirect(302, `/settings/listings?message=You are not the agent of this listing`);
		}

		try {
			await prisma.listing.delete({
				where: {
					slug
				}
			});

			return {
				success: true,
				listingId: listing.id
			};
		} catch (error) {
			return {
				success: false
			};
		}
	}
};
