<script lang="ts">
	import { currentUser } from '$lib/stores/users';
	import { Role } from '$lib/types/roles.types';

	export let onlyLogo: Boolean = false;
	export let isFixed: Boolean = false;
</script>

<div class="bg-dark py-4 z-50 text-white {isFixed ? 'fixed w-screen' : ''}">
	<div class="flex items-center justify-between container container-padding mx-auto">
		<div>
			<a href="/">
				<img src="/uruggo.svg" alt="Uruggo logo" width="100px" />
			</a>
		</div>
		{#if !onlyLogo}
			{#if $currentUser}
				<div class="space-x-[20px]">
					<div class="dropdown dropdown-bottom dropdown-end">
						<label class="no-arrow cursor-pointer" tabindex="0">
							<div class="avatar placeholder">
								<div class="bg-neutral-focus text-neutral-content rounded-full w-8">
									<span class="text-xs">
										{#if $currentUser.first_name}
											{$currentUser.first_name[0]}
										{:else}
											S
										{/if}
									</span>
								</div>
							</div>
						</label>
						<div
							tabindex="0"
							class="p-5 space-y-3 shadow dropdown-content min-w-max dro z-[1] rounded-box bg-dark border border-light"
						>
							<a href="/settings/profile" class="hover:text-primary flex items-center space-x-3">
								<iconify-icon icon="mdi-light:settings" width="20" />
								<span>My Profile</span>
							</a>

							{#if $currentUser.role === Role.AGENT}
								<a href="/settings/listings" class="hover:text-primary flex items-center space-x-3">
									<iconify-icon icon="system-uicons:home" width="20" />
									<span>My Listings</span>
								</a>
							{/if}
							<a href="/settings" class="hover:text-primary flex md:hidden items-center space-x-3">
								<iconify-icon icon="mdi-light:settings" width="20" />
								<span>Settings</span>
							</a>
							<form action="/?/logout" method="post" class="w-full">
								<button class="button button--primary w-full">Logout</button>
							</form>
						</div>
					</div>
				</div>
			{:else}
				<div class="space-x-[24px] flex items-center">
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
