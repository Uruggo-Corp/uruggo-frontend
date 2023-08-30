import { Role } from '$lib/types/roles.types';

const navLinks = [
	{
		name: 'Profile',
		href: '/settings/profile',
		icon: 'solar:user-linear',
		onlyFor: [Role.AGENT, Role.USER]
	},
	{
		name: 'Listings',
		href: '/settings/listings',
		icon: 'system-uicons:home',
		onlyFor: [Role.AGENT]
	}
];

export default navLinks;
