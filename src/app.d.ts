// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Role, Session, User } from '@prisma/client';

declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
	}
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			email: string;
			first_name?: string;
			last_name?: string;
			phone_number?: string;
			avatar?: string;
			address?: string;
			role: Role;
		};
		type DatabaseSessionAttributes = Record<string, never>;
	}
}

export {};
