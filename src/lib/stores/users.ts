import type { User } from 'lucia';
import { writable } from 'svelte/store';

export let currentUser = writable<User | null>(null);
