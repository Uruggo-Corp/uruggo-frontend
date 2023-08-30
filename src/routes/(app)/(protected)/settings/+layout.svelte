<script lang="ts">
	import { page } from '$app/stores';
	import { currentUser } from '$lib/stores/users';
	import { Role } from '@prisma/client';

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
</script>

<div class="md:flex hidden flex-row">
	<aside
		class="flex flex-col w-64 h-screen fixed top-0 left-0 z-20 pt-20 bg-gray-100 border-r border-gray-200"
	>
		<div class="border-b border-[#B4B4B0] mx-5 py-3">
			<!-- Profile -->
			<div class="flex w-full justify-center items-center py-[25px]">
				<div class="avatar">
					<div class="w-24 rounded-full">
						<img src="/seyi.jpg" alt="{$currentUser?.first_name}'s profile" />
					</div>
				</div>
			</div>
			<div class="mt-[11px] text-center">
				<h2 class="text-black text-xl">
					{$currentUser?.first_name || 'Agent'}
					{$currentUser?.last_name || 'Doe'}
				</h2>
				<p class="text-xs text-[#716E6E] mt-[5px]">
					{$currentUser?.phone_number || '09012345678'}
				</p>
				<p class="text-xs mt-[10px] flex items-center justify-center text-[#B4B4B0]">
					<iconify-icon icon="system-uicons:location" width="18" />
					<span>
						{$currentUser?.address || 'Lagos, Nigeria'}
					</span>
				</p>
			</div>
		</div>
		<div class="flex flex-col flex-grow p-4 space-y-4">
			{#each navLinks as navLink}
				{#if navLink.onlyFor.includes($currentUser?.role === Role.AGENT ? Role.AGENT : Role.USER)}
					<a
						href={navLink.href}
						class="button space-x-3"
						class:button--primary={$page.url.pathname.startsWith(navLink.href)}
					>
						<iconify-icon icon={navLink.icon} width="18" />
						<span>{navLink.name}</span>
					</a>
				{/if}
			{/each}
		</div>
		<form action="/?/logout" method="post" class="w-full p-4">
			<button class="button space-x-3 w-full">
				<iconify-icon icon="material-symbols:logout" width="20" />
				<span>Logout</span>
			</button>
		</form>
	</aside>
	<main class="flex flex-col flex-grow p-5 md:p-10 ml-64">
		<slot />
	</main>
</div>
<div class="md:hidden flex flex-col flex-grow p-5">
	<slot />
</div>
