import { prisma as adapter } from '@lucia-auth/adapter-prisma';
import { lucia } from 'lucia';
import prisma from './prisma';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import * as argon2 from 'argon2';

export const auth = lucia({
	adapter: adapter(prisma, {
		user: 'user',
		session: 'session',
		key: 'key'
	}),
	middleware: sveltekit(),
	env: dev ? 'DEV' : 'PROD',
	getUserAttributes: (user) => ({
		email: user.email,
		first_name: user.first_name,
		last_name: user.last_name,
		role: user.role,
		phone_number: user.phone_number,
		avatar: user.avatar,
		address: user.address
	}),
	passwordHash: {
		generate(password) {
			return argon2.hash(password);
		},
		validate(password, hash) {
			return argon2.verify(hash, password);
		}
	}
});

export type Auth = typeof auth;
