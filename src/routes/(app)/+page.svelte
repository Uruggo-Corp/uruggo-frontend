<script lang="ts">
	import ApartmentCard from '$lib/components/ApartmentCard.svelte';
	import type { ListingWithImages } from '$lib/types/listings.types';
	import type { ActionData, PageData } from './$types';
	import Selector from '$lib/components/Selector.svelte';
	import type { FilterValidationError, Option } from '$lib/types/types';
	import { fly } from 'svelte/transition';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { showToastr } from '$lib/utils';
	import { enhance } from '$app/forms';

	const apartmentTypes: Option[] = [
		{
			name: 'Studio apartment',
			value: 1
		},
		{
			name: '2 bedrooms',
			value: 2
		},
		{
			name: '3 bedrooms',
			value: 3
		},
		{
			name: '4 bedrooms',
			value: 4
		}
	];

	const bathTypes: Option[] = [
		{
			name: '1 bathroom',
			value: 1
		},
		{
			name: '2 bathrooms',
			value: 2
		},
		{
			name: '3 bathrooms',
			value: 3
		},
		{
			name: '4 bathrooms',
			value: 4
		},
		{
			name: '5 bathrooms',
			value: 5
		},
		{
			name: '6 bathrooms',
			value: 6
		}
	];
	let selectedApartmentType = apartmentTypes[0].value;
	let advancedFilterModal: HTMLDialogElement;

	export let data: PageData;
	export let form: ActionData;
	let listings: ListingWithImages[] = data.listings as ListingWithImages[];
	$: filteredListings = form?.filtered as ListingWithImages[];

	let fetching: boolean = false;

	const filter: SubmitFunction = async ({ formData }) => {
		bathrooms && formData.set('bathrooms', `${bathrooms}`);
		bedrooms && formData.set('bedrooms', `${bedrooms}`);

		fetching = true;
		return async ({ update, result }) => {
			try {
				if (result.status === 200) {
					if (filteredListings) {
						noListings;
						listings = filteredListings;
					}
					showToastr('Filter successful.', 'success');
				} else if (result.status === 500) {
					result?.data?.errors?.server.forEach((error) => {
						showToastr(error, 'error');
					});
				} else if (result.status === 404) {
					listings = [];
					noListings = true;
					showToastr(result?.data.errors?.server[0], 'error');
				} else if (result.status === 400) {
					errors = result.data.errors;
					// console.log(errors);
				}
			} finally {
				update();
				fetching = false;
			}
		};
	};

	let errors: FilterValidationError;

	let bathrooms: string;
	let bedrooms: string;

	let clearFilters: boolean = false;

	const clear = () => {
		clearFilters = true;
		noListings = false;
		listings = data.listings as ListingWithImages[];
	};
	let location: string;
	let noListings: boolean = false;
	$: if (clearFilters) {
		location = '';
	}
</script>

<svelte:head>
	{#if selectedApartmentType}
		<title>
			{apartmentTypes.find((type) => type.value === selectedApartmentType)?.name} Apartments - Uruggo
		</title>
	{:else}
		<title>All Apartments - Uruggo</title>
	{/if}
</svelte:head>

{#if noListings || filteredListings}
	<button
		on:click={clear}
		class="fixed shadow bottom-28 sm:bottom-5 items-center flex gap-2 shadow-primary/20 bg-dark text-white right-3 py-3 px-6 rounded-full"
	>
		<span>Clear filters</span><iconify-icon width="20" icon="mdi:filter-off-outline" /></button
	>
{/if}
<section class="filter container container-padding mx-auto my-[40px]">
	<div class="search-input-group bg-light">
		<!-- For more settings use the AutoHTML plugin tab ... -->
		<div class="icon">
			<svg
				class="ri-search-line"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M18.031 16.617L22.314 20.899L20.899 22.314L16.617 18.031C15.0237 19.3082 13.042 20.0029 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20.0029 13.042 19.3082 15.0237 18.031 16.617ZM16.025 15.875C17.2941 14.5699 18.0029 12.8204 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18C12.8204 18.0029 14.5699 17.2941 15.875 16.025L16.025 15.875Z"
					fill="#B4B4B0"
				/>
			</svg>
		</div>

		<input class="bg-light" type="text" name="search" placeholder="Search for an apartment" />
	</div>

	<form
		use:enhance={filter}
		action="?/filter"
		method="post"
		class="sm:gap-x-[40px] sm:gap-y-2 gap-x-[20px] gap-y-4 bg-dark relative items-center py-4 rounded-lg px-3 overflow-x-scroll grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-between lg: md:w-fit w-full"
		style="overflow: visible;"
	>
		<dialog
			class="max-w-[32rem] rounded px-3 sm:px-10 py-6 bg-white w-full z-50"
			in:fly={{ x: 200, delay: 300, duration: 500 }}
			bind:this={advancedFilterModal}
		>
			<div class="w-full flex justify-between text-dark mb-8 items-center">
				<h1 class="text-2xl font-medium font-serif">Filter Listings</h1>
				<button type="button" class="flex items-center" on:click={() => advancedFilterModal.close()}
					><iconify-icon width="25" icon="formkit:close" /></button
				>
			</div>

			<div class="w-full grid grid-cols-2 gap-5">
				<div class="w-full col-span-2 flex flex-col gap-1">
					<label class="font-medium text-xs sm:text-sm" for="price-range">Price range</label>
					<div class="flex items-center gap-1 sm:gap-2">
						<input
							class="outline-none border border-primary hover:border-primary focus:border-primary placeholder-shown:border-dark/20 rounded px-1 py-1 sm:px-2"
							id="price-min"
							name="price-range"
							type="number"
							placeholder="50000"
						/>
						<span>to</span>
						<input
							class="outline-none border border-primary hover:border-primary focus:border-primary placeholder-shown:border-dark/20 rounded px-1.5 py-1 sm:px-2"
							id="price-max"
							name="price-range"
							type="number"
							placeholder="50000"
						/>
					</div>
					{#if errors?.maxPrice || errors?.minPrice}
						<p class="text-error text-xs">{errors?.maxPrice[0] || errors?.minPrice[0]}</p>
					{/if}
				</div>
				<div class="flex flex-col mb-10 h-3 relative" style="overflow: visible;">
					<label class="font-medium text-sm" for="filter-listing-type">Room(s)</label>
					<Selector
						{clearFilters}
						on:change={(e) => (bedrooms = `${e.detail}`)}
						className="border rounded border-dark/20 text-dark hover:border-primary"
						inputName="filter-listing-type"
						placeholder="Bedrooms"
						options={apartmentTypes}
					/>
				</div>
				<div class="flex flex-col mb-10 h-3 relative">
					<label class="font-medium text-sm" for="filter-listing-bathrooms">Bathrooms</label>
					<Selector
						{clearFilters}
						on:change={(e) => (bathrooms = `${e.detail}`)}
						className="border rounded border-dark/20 text-dark hover:border-primary"
						inputName="filter-listing-bathrooms"
						placeholder="Bathrooms"
						options={bathTypes}
					/>
				</div>
				<div class="flex flex-col">
					<label class="font-medium text-sm" for="city">City</label>
					<input
						type="text"
						class="outline-none border border-primary hover:border-primary focus:border-primary placeholder-shown:border-dark/20 rounded px-2 py-1"
						name="city"
						id="city"
						placeholder="City"
					/>
					{#if errors?.city}
						<p class="text-error text-xs">{errors?.city[0]}</p>
					{/if}
				</div>
				<div class="flex flex-col">
					<label for="state" class="font-medium text-sm">State</label>
					<input
						type="text"
						class="outline-none border border-primary hover:border-primary focus:border-primary placeholder-shown:border-dark/20 rounded px-2 py-1"
						name="state"
						id="state"
						placeholder="State"
					/>
					{#if errors?.state}
						<p class="text-error text-xs">{errors?.state}</p>
					{/if}
				</div>
				<div class="flex flex-col">
					<label for="country" class="font-medium text-sm">Country</label>
					<input
						type="text"
						class="outline-none border border-primary hover:border-primary focus:border-primary placeholder-shown:border-dark/20 rounded px-2 py-1"
						name="country"
						id="country"
						placeholder="Country"
					/>
				</div>
				{#if errors?.country}
					<p class="text-error text-xs">{errors?.country}</p>
				{/if}
			</div>
			<div class="w-full mt-5">
				<button type="submit" class="bg-primary px-4 w-full rounded py-1.5 font-medium"
					>Search</button
				>
			</div>
		</dialog>
		<div>
			<Selector
				on:change={(e) => (bedrooms = `${e.detail}`)}
				{clearFilters}
				inputName="listing-type"
				placeholder="Bedrooms"
				options={apartmentTypes}
			/>
		</div>
		<div>
			<Selector
				on:change={(e) => (bathrooms = `${e.detail}`)}
				{clearFilters}
				inputName="listing-bathrooms"
				placeholder="Bathrooms"
				options={bathTypes}
			/>
		</div>
		<input
			bind:value={location}
			type="text"
			name="location"
			id="location"
			placeholder="Preferred Location"
			class="bg-inherit py-1.5 px-2 text-white rounded transform focus:border focus:border-primary hover:border hover:border-primary outline-none"
		/>
		<div class="flex gap-2 sm:w-full md:w-auto sm:justify-end sm:mt-2 md:mt-0">
			<button
				type="submit"
				class="bg-primary hover:bg-primary/90 py-1.5 font-serif font-bold rounded px-5"
				>Search</button
			>
			<button
				type="button"
				on:click={() => advancedFilterModal.showModal()}
				class="flex items-center transition-all hover:bg-gray/20 text-white px-3 py-1 rounded"
			>
				<iconify-icon width="25" height="25" icon="mi:filter" />
			</button>
		</div>
	</form>
</section>

<section class="my-[80px] container container-padding mx-auto">
	<h3 class="text-center text-3xl font-serif text-dark font-bold">
		{listings.length > 0 ? 'Available Apartments' : 'No listing found'}
	</h3>
	<div class="mt-[40px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px] mx-auto">
		{#if listings.length > 0}
			{#each listings as listing}
				<ApartmentCard {listing} />
			{/each}
		{:else}
			<div class="col-span-full text-dark h-[10em] flex w-full items-center justify-center">
				<iconify-icon width="75" icon="pepicons-print:house-circle-off" />
			</div>
		{/if}
	</div>
</section>

<!-- <section class="my-[80px] container container-padding mx-auto">
	<h3 class="text-center text-3xl font-serif text-dark font-bold">Recommended for you</h3>
	<div class="mt-[40px] grid md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
		{#each { length: 8 } as _}
			<ApartmentCard inRecommended />
		{/each}
	</div>
</section> -->

<style>
	.filter {
		display: flex;
		flex-direction: column;
		gap: 40px;
		justify-content: center;
		align-items: center;
	}

	.search-input-group {
		display: flex;
		align-items: center;
		padding: 0 40px;
		width: 100%;
	}

	.search-input-group .icon {
		margin-right: 24px;
	}

	.search-input-group input {
		height: 100%;
		width: 100%;
		padding: 18px 0;
	}

	.search-input-group input::placeholder {
		color: #b4b4b0;
	}

	.search-input-group input:focus {
		outline: none;
	}

	.search-input-group input:focus::placeholder {
		color: transparent;
	}
</style>
