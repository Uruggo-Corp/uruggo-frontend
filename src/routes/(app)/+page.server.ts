import { fail, type Actions, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

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
	}
};
