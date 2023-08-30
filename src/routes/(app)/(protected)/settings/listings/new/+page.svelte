<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import ImageSelector from '../../../../../../lib/components/ImageSelector.svelte';
	import { showToastr } from '../../../../../../lib/utils';

	export let form;

	let loading = false;

	let files: any = [];

	let previewImage: string;
	let previewImages: File[] = [];
	const handleImages = (files: any) => {
		previewImage = URL.createObjectURL(files[0]);
		previewImages = [...files];
	};
</script>

<svelte:head>
	<title>New Listing - Uruggo</title>
</svelte:head>

<div class="mb-10 flex justify-between items-center">
	<h2 class="text-3xl text-dark font-serif">New Listing</h2>
</div>

<form
	class="grid grid-cols-1 md:grid-cols-2 gap-5"
	method="post"
	enctype="multipart/form-data"
	use:enhance={() => {
		loading = true;
		return async ({ result, update }) => {
			try {
				if (result.status === 200) {
					// Listing created successfully they should wait for approval
					// before it is listed
					showToastr('Listing created successfully. It will be listed after approval.', 'success');
					await goto('/settings/listings');
				} else if (result.status === 500) {
					result?.data?.errors?.server.forEach((element) => {
						showToastr(element, 'error');
					});
				}
			} finally {
				loading = false;
				update();
			}
		};
	}}
>
	<div class="form-section flex flex-col md:col-span-2">
		<label for="images" class="form-label font-serif"> Listing Images </label>
		<ImageSelector />
		{#if form?.errors?.images}
			{#each form.errors.images as error}
				<p class="form-error">{error}</p>
			{/each}
		{:else}
			<p class="form-help mt-2">
				Select up to 10 photos of your property. The first photo will be the cover photo.
			</p>
		{/if}
	</div>
	<div class="form-section md:col-span-2">
		<label class="form-label font-serif" for="title">Title</label>
		<input
			type="text"
			placeholder="Furnished 2 bedroom apartment"
			id="title"
			name="title"
			class="form-control"
		/>
		{#if form?.errors?.title}
			{#each form.errors.title as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>
	<div class="form-section md:col-span-2">
		<label class="form-label font-serif" for="description">Description</label>
		<textarea
			placeholder="Description for furnished 2 bedroom apartment"
			name="description"
			id="description"
			cols="30"
			rows="5"
			class="form-control"
		/>

		{#if form?.errors?.description}
			{#each form.errors.description as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>
	<div class="form-section">
		<label class="form-label font-serif" for="street_address">Street Address</label>
		<input
			type="text"
			placeholder="3, Adebisola Str, Oke Agba"
			name="street_address"
			class="form-control"
			id="street_address"
		/>
		{#if form?.errors?.street_address}
			{#each form.errors.street_address as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>
	<div class="form-section">
		<label class="form-label font-serif" for="city">City</label>
		<input type="text" placeholder="Lagos" name="city" class="form-control" id="city" />
		{#if form?.errors?.city}
			{#each form.errors.city as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>
	<div class="form-section">
		<label class="form-label font-serif" for="state">State</label>
		<input type="text" placeholder="Lagos" name="state" class="form-control" id="state" />
		{#if form?.errors?.state}
			{#each form.errors.state as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>
	<div class="form-section">
		<label class="form-label font-serif" for="zip">Zip Code (optional)</label>
		<input type="text" placeholder="104122" name="zip" class="form-control" id="zip" />
		{#if form?.errors?.zip_code}
			{#each form.errors.zip_code as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>
	<div class="form-section">
		<label class="form-label font-serif" for="country">Country</label>
		<input type="text" placeholder="Nigeria" name="country" class="form-control" id="country" />
		{#if form?.errors?.country}
			{#each form.errors.country as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>

	<div class="form-section">
		<label class="form-label font-serif" for="price">Price</label>
		<input type="text" placeholder="100000" name="price" class="form-control" id="price" />
		{#if form?.errors?.price}
			{#each form.errors.price as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>

	<div class="form-section">
		<label class="form-label font-serif" for="bedrooms">Bedrooms</label>
		<input type="text" placeholder="2" name="bedrooms" class="form-control" id="bedrooms" />
		{#if form?.errors?.bedrooms}
			{#each form.errors.bedrooms as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>

	<div class="form-section">
		<label class="form-label font-serif" for="bathrooms">Bathrooms</label>
		<input type="text" placeholder="3" name="bathrooms" class="form-control" id="bathrooms" />
		{#if form?.errors?.bathrooms}
			{#each form.errors.bathrooms as error}
				<p class="form-error">{error}</p>
			{/each}
		{/if}
	</div>

	<div class="form-section md:col-span-2">
		<button class="button button--primary w-full">
			{#if loading}
				<iconify-icon icon="eos-icons:bubble-loading" width="20" style="margin-bottom: 0;" />
			{:else}
				Save
			{/if}
		</button>
	</div>
</form>
