import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const slug = params.slug;

	const listing = await prisma.listing.findUnique({
		where: {
			slug
		},
		include: {
			agent: true,
			images: true
		}
	});

	if (!listing) {
		throw redirect(302, '/?message=Listing not found');
	}
	return {
		listing
	};
}) satisfies PageServerLoad;
