<script lang="ts">
	import { enhance } from '$app/forms';
	import ImageSelector from '$lib/components/ImageSelector.svelte';
	import { currentUser } from '$lib/stores/users';
	import { showToastr } from '$lib/utils';

	export let form;

	let loading = false;

	let user = $currentUser || {
		first_name: '',
		last_name: '',
		phone_number: '',
		address: '',
		avatar: ''
	};

	$: if ($currentUser) user = $currentUser;
</script>

<svelte:head>
	<title>Profile - Uruggo</title>
</svelte:head>

<h2 class="text-3xl text-dark font-serif mb-10">Profile</h2>

<form
	class="grid grid-cols-1 md:grid-cols-2 gap-5"
	method="post"
	enctype="multipart/form-data"
	use:enhance={() => {
		loading = true;
		return async ({ update, result }) => {
			try {
				if (result.data?.success) {
					currentUser.set(result.data?.user);
					showToastr('Profile updated successfully!', 'success');
				} else if (result.status === 500) {
					// console.log(result.data?.errors);
					result.data?.errors.server.forEach((error) => {
						showToastr(error, 'error');
					});
				} else {
					showToastr('Please check your form for errors.', 'error');
				}
			} finally {
				loading = false;
				update();
			}
		};
	}}
>
	<div class="form-section flex flex-col md:col-span-2">
		<label for="images" class="form-label"> Profile Photo</label>
		<ImageSelector inputName={'image'} displayImages={user.avatar} />
		{#if form?.errors?.avatar}
			{#each form.errors.avatar as error}
				<p class="form-error">{error}</p>
			{/each}
		{:else}
			<p class="form-help mt-2">Select an image, This will be your profile photo.</p>
		{/if}
	</div>
	<div class="form-section">
		<input
			type="text"
			placeholder="First name"
			name="first_name"
			bind:value={user.first_name}
			class="form-control"
		/>
		{#if form?.errors?.first_name}
			{#each form.errors.first_name as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>
	<div class="form-section">
		<input
			type="text"
			placeholder="Last name"
			name="last_name"
			bind:value={user.last_name}
			class="form-control"
		/>
		{#if form?.errors?.last_name}
			{#each form.errors.last_name as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>
	<div class="form-section">
		<input
			type="text"
			placeholder="Phone number"
			name="phone_number"
			bind:value={user.phone_number}
			class="form-control"
		/>
		{#if form?.errors?.phone_number}
			{#each form.errors.phone_number as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>
	<div class="form-section">
		<input
			type="text"
			placeholder="Address"
			name="address"
			bind:value={user.address}
			class="form-control"
		/>
		{#if form?.errors?.address}
			{#each form.errors.address as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>
	<div class="form-section md:col-span-2">
		<button disabled={loading} class="button button--primary w-full"
			>{#if loading}
				<iconify-icon icon="eos-icons:bubble-loading" width="20" style="margin-bottom: 0;" />
			{:else}
				Save
			{/if}</button
		>
	</div>
</form>

<style>
</style>
