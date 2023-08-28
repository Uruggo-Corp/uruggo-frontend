<script lang="ts">
	import { currentUser } from '$lib/stores/users';
	import { Role } from '@prisma/client';

	export let onlyLogo: Boolean = false;
	export let isFixed: Boolean = false;
</script>

<div class="bg-dark py-4 text-white {isFixed ? 'fixed w-screen' : ''}">
	<div class="flex items-center justify-between container container-padding mx-auto">
		<div>
			<a href="/">
				<img src="/uruggo.svg" alt="Uruggo logo" width="100px" />
			</a>
		</div>
		{#if !onlyLogo}
			{#if $currentUser}
				<div class="space-x-[20px]">
					<details class="dropdown dropdown-bottom dropdown-end">
						<summary class="no-arrow cursor-pointer"
							><div class="avatar placeholder">
								<div class="bg-neutral-focus text-neutral-content rounded-full w-8">
									<span class="text-xs">
										{#if $currentUser.first_name}
											{$currentUser.first_name[0]}
										{:else}
											S
										{/if}
									</span>
								</div>
							</div></summary
						>
						<div
							class="p-5 space-y-3 shadow dropdown-content min-w-max dro z-[1] rounded-box bg-dark border border-light"
						>
							<a href="/settings/profile" class="hover:text-primary flex space-x-3">
								{#if $currentUser.role === Role.AGENT}
									<iconify-icon icon="material-symbols:dashboard" width="20" />
									<span>Agent dashboard</span>
								{:else}
									<iconify-icon icon="iconamoon:profile" width="20" />
									<span>My profile</span>
								{/if}
							</a>
							<form action="/?/logout" method="post" class="w-full">
								<button class="button button--primary w-full">Logout</button>
							</form>
						</div>
					</details>
				</div>
			{:else}
				<div class="space-x-[20px]">
					<a href="/auth/login">Login</a>
					<a href="/auth/register" class="button button--primary">Register</a>
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	details > summary {
		list-style: none;
	}
	details > summary::-webkit-details-marker {
		display: none;
	}
</style>
