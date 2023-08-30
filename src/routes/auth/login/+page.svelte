<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { currentUser } from '$lib/stores/users.js';
	import { showToastr } from '$lib/utils.js';

	export let form;
	let loading = false;

	let passwordVisible = false;
</script>

<svelte:head>
	<title>Login - Uruggo</title>
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
						currentUser.set(result.data?.user);
						let next = $page.url.searchParams.get('redirect');
						await goto(next || '/');
					}
				} finally {
					console.log(result);
					loading = false;
					update();
				}
			};
		}}
	>
		<div class="max-w-[400px] mx-auto w-full">
			<h1 class="text-3xl font-serif w-full mb-[30px]">Welcome back</h1>
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
					<input type="text" placeholder="Email" class="form-control" name="email" />
				</div>
				{#if form?.errors?.email}
					{#each form?.errors.email as error}
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
					<button on:click={() => (passwordVisible = !passwordVisible)} class="icon" type="button">
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
					{#each form?.errors.password as error}
						<p class="form-error">{error}</p>
					{/each}
				{/if}
			</div>
			<div class="">
				<div class="w-full text-right mb-[25px]">
					<a href="/auth/forgot-password" class="text-sm w-full hover:text-primary"
						>Forgot password?</a
					>
				</div>
				<button
					class="bg-primary text-dark w-full py-[15px] hover:bg-primary-hover transition-all duration-300"
				>
					{#if loading}
						<iconify-icon icon="eos-icons:bubble-loading" width="20" style="margin-bottom: 0;" />
					{:else}
						Login
					{/if}
				</button>
			</div>
		</div>
	</form>
	<div class="text-center">
		<p class="text-dark text-sm">
			Don’t have an account? <a href="/auth/register" class="text-primary">Create an account</a>
		</p>
	</div>
</div>
