import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';
import { Role } from '@prisma/client';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const session = await locals.auth.validate();

	if (!session) {
		throw redirect(302, `/auth/login?redirect=${url.pathname}`);
	}
};
