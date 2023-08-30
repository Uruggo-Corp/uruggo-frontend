<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { currentUser } from '$lib/stores/users.js';
	import { showToastr } from '$lib/utils.js';

	type UserTypes = 'user' | 'agent';
	let registerType: UserTypes = 'user';

	let step = 1;

	export let form;
	let loading = false;

	let passwordVisible = false;
	let confirmPasswordVisible = false;
</script>

<svelte:head>
	<title>Register - Uruggo</title>
</svelte:head>

<div class="w-full h-full justify-between flex flex-col">
	<form
		action=""
		method="post"
		class="flex-grow flex flex-col justify-center mx-auto w-full items-center"
		use:enhance={() => {
			loading = true;
			return async ({ result, update }) => {
				try {
					if (result.status === 500) {
						showToastr('Ooops! Something went wrong. Please try again later.', 'error');
					} else if (result?.data?.errors?.server) {
						result?.data?.errors?.server.forEach((element) => {
							showToastr(element, 'error');
						});
					} else if (result.data?.success) {
						showToastr('Account created successfully', 'success');
						currentUser.set(result.data?.user);
						let next = $page.url.searchParams.get('redirect');
						await goto(next || '/');
					}
				} finally {
					loading = false;
					update();
				}
			};
		}}
	>
		<div class="max-w-[400px] mx-auto w-full">
			<div class="flex justify-between items-center mb-[30px]">
				<h1 class="text-3xl font-serif w-full">Create account</h1>
				{#if step === 2}
					<button
						on:click={() => (step = 1)}
						type="button"
						class="text-primary hover:text-primary-hover transition-all duration-300"
					>
						Back
					</button>
				{/if}
			</div>
			{#if step === 1}
				<div class="grid md:grid-cols-2 grid-cols-1 gap-[50px]">
					<button
						on:click={() => (registerType = 'user')}
						class="py-[18px] hover:bg-gray-100 transition-all duration-300 px-[23px] bg-light space-y-[24px] flex flex-col justify-center items-center"
						class:active={registerType === 'user'}
						type="button"
					>
						<svg
							class="user-square"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M18.1404 21.62C17.2604 21.88 16.2204 22 15.0004 22H9.00035C7.78035 22 6.74035 21.88 5.86035 21.62C6.08035 19.02 8.75035 16.97 12.0004 16.97C15.2504 16.97 17.9204 19.02 18.1404 21.62Z"
								stroke="#9BA809"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M15 2H9C4 2 2 4 2 9V15C2 18.78 3.14 20.85 5.86 21.62C6.08 19.02 8.75 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62C20.86 20.85 22 18.78 22 15V9C22 4 20 2 15 2ZM12 14.17C10.02 14.17 8.42 12.56 8.42 10.58C8.42 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58C15.58 12.56 13.98 14.17 12 14.17Z"
								stroke="#9BA809"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M15.5799 10.58C15.5799 12.56 13.9799 14.17 11.9999 14.17C10.0199 14.17 8.41992 12.56 8.41992 10.58C8.41992 8.60002 10.0199 7 11.9999 7C13.9799 7 15.5799 8.60002 15.5799 10.58Z"
								stroke="#9BA809"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<p>I’m looking for an apartment / roomate</p>
					</button>
					<button
						on:click={() => (registerType = 'agent')}
						class="py-[35px] hover:bg-gray-100 transition-all duration-300 px-[23px] bg-light space-y-[24px] flex flex-col justify-center items-center"
						class:active={registerType === 'agent'}
						type="button"
					>
						<svg
							class="user-square"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M18.1404 21.62C17.2604 21.88 16.2204 22 15.0004 22H9.00035C7.78035 22 6.74035 21.88 5.86035 21.62C6.08035 19.02 8.75035 16.97 12.0004 16.97C15.2504 16.97 17.9204 19.02 18.1404 21.62Z"
								stroke="#9BA809"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M15 2H9C4 2 2 4 2 9V15C2 18.78 3.14 20.85 5.86 21.62C6.08 19.02 8.75 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62C20.86 20.85 22 18.78 22 15V9C22 4 20 2 15 2ZM12 14.17C10.02 14.17 8.42 12.56 8.42 10.58C8.42 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58C15.58 12.56 13.98 14.17 12 14.17Z"
								stroke="#9BA809"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M15.5799 10.58C15.5799 12.56 13.9799 14.17 11.9999 14.17C10.0199 14.17 8.41992 12.56 8.41992 10.58C8.41992 8.60002 10.0199 7 11.9999 7C13.9799 7 15.5799 8.60002 15.5799 10.58Z"
								stroke="#9BA809"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<p>I’m a property agent / Landlord</p>
					</button>
				</div>
				<button
					on:click={() => (step = 2)}
					type="button"
					disabled={!registerType}
					class="{registerType
						? 'bg-primary hover:bg-primary-hover'
						: 'bg-[#B4B4B0]'} mt-[45px] text-dark w-full py-[15px] transition-all duration-300"
				>
					Next
				</button>
			{:else}
				<input type="text" bind:value={registerType} class="hidden" name="type" />
				<div class="form-section">
					<div class="form-group">
						<div class="icon">
							<svg
								class="user-square"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M18.1404 21.62C17.2604 21.88 16.2204 22 15.0004 22H9.00035C7.78035 22 6.74035 21.88 5.86035 21.62C6.08035 19.02 8.75035 16.97 12.0004 16.97C15.2504 16.97 17.9204 19.02 18.1404 21.62Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M15 2H9C4 2 2 4 2 9V15C2 18.78 3.14 20.85 5.86 21.62C6.08 19.02 8.75 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62C20.86 20.85 22 18.78 22 15V9C22 4 20 2 15 2ZM12 14.17C10.02 14.17 8.42 12.56 8.42 10.58C8.42 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58C15.58 12.56 13.98 14.17 12 14.17Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M15.5799 10.58C15.5799 12.56 13.9799 14.17 11.9999 14.17C10.0199 14.17 8.41992 12.56 8.41992 10.58C8.41992 8.60002 10.0199 7 11.9999 7C13.9799 7 15.5799 8.60002 15.5799 10.58Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
						<input type="text" name="email" placeholder="Email" class="form-control" />
					</div>
					{#if form?.errors?.email}
						{#each form.errors.email as error}
							<p class="form-error">{error}</p>
						{/each}
					{/if}
				</div>
				<div class="form-section">
					<div class="form-group">
						<div class="icon">
							<svg
								class="lock"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
									stroke="#B4B4B0"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
						<input
							type={passwordVisible ? 'text' : 'password'}
							name="password"
							placeholder="Password"
							class="form-control"
						/>
						<button
							on:click={() => (passwordVisible = !passwordVisible)}
							class="icon"
							type="button"
						>
							<svg
								class="eye"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.41998 11.9999 8.41998C13.9799 8.41998 15.5799 10.02 15.5799 12Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg></button
						>
					</div>
					{#if form?.errors?.password}
						{#each form.errors.password as error}
							<p class="form-error">{error}</p>
						{/each}
					{/if}
				</div>
				<div class="form-section">
					<div class="form-group">
						<div class="icon">
							<svg
								class="lock"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
									stroke="#B4B4B0"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
						<input
							type={confirmPasswordVisible ? 'text' : 'password'}
							name="confirmPassword"
							placeholder="Confirm password"
							class="form-control"
						/>
						<button
							on:click={() => (confirmPasswordVisible = !confirmPasswordVisible)}
							class="icon"
							type="button"
						>
							<svg
								class="eye"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.41998 11.9999 8.41998C13.9799 8.41998 15.5799 10.02 15.5799 12Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M11.9998 20.27C15.5298 20.27 18.8198 18.19 21.1098 14.59C22.0098 13.18 22.0098 10.81 21.1098 9.39997C18.8198 5.79997 15.5298 3.71997 11.9998 3.71997C8.46984 3.71997 5.17984 5.79997 2.88984 9.39997C1.98984 10.81 1.98984 13.18 2.88984 14.59C5.17984 18.19 8.46984 20.27 11.9998 20.27Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg></button
						>
					</div>
					{#if form?.errors?.confirmPassword}
						{#each form.errors.confirmPassword as error}
							<p class="form-error">{error}</p>
						{/each}
					{/if}
				</div>
				<button
					class="bg-primary text-dark w-full py-[15px] hover:bg-primary-hover transition-all duration-300"
				>
					{#if loading}
						<iconify-icon icon="eos-icons:bubble-loading" width="20" style="margin-bottom: 0;" />
					{:else}
						Register
					{/if}
				</button>
			{/if}
		</div>
	</form>
	<div class="text-center">
		<p class="text-dark text-sm">
			Already have an account? <a href="/auth/login" class="text-primary">Login</a>
		</p>
	</div>
</div>

<style>
	.active {
		color: var(--primary-color);
		border: 1px solid var(--primary-color);
	}
</style>
