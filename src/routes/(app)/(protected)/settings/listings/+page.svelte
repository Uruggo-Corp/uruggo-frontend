<script lang="ts">
	import { enhance } from '$app/forms';
	import AgentListingCard from '$lib/components/AgentListingCard.svelte';
	import type { ListingWithImages } from '$lib/types/listings.types';
	import { showToastr } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;
	let dialog: any;

	let listings: ListingWithImages[] = data.listings;

	let deleteModalOpen = false;
	let listingToDelete: ListingWithImages;

	const handleDelete = (e: any) => {
		dialog.showModal();
		listingToDelete = e.detail;
	};

	const closeModal = () => {
		dialog.close();
	};

	let listingStatusFilters = [
		{ name: 'All', value: 'all' },
		{ name: 'Available', value: 'available' },
		{ name: 'Pending', value: 'pending' },
		{ name: 'Rented', value: 'rented' }
	];

	let activeFilter = 'all';

	const handleFilter = (e: any) => {
		activeFilter = e.target.value;
		if (activeFilter === 'all') {
			listings = data.listings;
		} else if (activeFilter === 'available') {
			listings = data.availableListings;
		} else if (activeFilter === 'pending') {
			listings = data.pendingListings;
		} else if (activeFilter === 'rented') {
			listings = data.rentedListings;
		}
	};
</script>

<svelte:head>
	<title>My Listings - Uruggo</title>
</svelte:head>

<div class="mb-10">
	<div class="mb-5 flex justify-between items-center">
		<h2 class="text-3xl text-dark font-serif">Listings</h2>
		<a href="/settings/listings/new" class="button button--primary">Post new listing</a>
	</div>

	<div>
		<div class="flex items-center flex-wrap gap-5">
			<p class="text-lg text-dark">Filter by status:</p>
			{#each listingStatusFilters as filter}
				<label class="flex items-center space-x-2">
					<input
						type="radio"
						name="filter"
						class="radio checked:bg-primary"
						value={filter.value}
						checked={activeFilter === filter.value}
						on:change={handleFilter}
					/>
					<span class="text-dark">{filter.name}</span>
				</label>
			{/each}
		</div>
	</div>
</div>

{#if listings.length}
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px]">
		{#each listings as listing}
			<AgentListingCard {listing} on:delete={handleDelete} />
		{/each}
	</div>
{:else}
	<div class="h-full flex flex-col justify-center items-center space-y-5 text-gray-400">
		<iconify-icon icon="bi:house-x-fill" width="100px" />
		<p class="text-lg text-dark text-center">
			You have no {activeFilter} listings, click the button below to post a new listing.
		</p>
		<a href="/settings/listings/new" class="button button--primary">Post new listing</a>
	</div>
{/if}

<dialog class="modal" bind:this={dialog}>
	<div class="modal-box">
		<form
			id="deleteForm"
			action="?/delete"
			method="post"
			use:enhance={() => {
				return ({ result, update }) => {
					if (result.status === 200) {
						showToastr('Successfully deleted listing', 'success');
						listings = listings.filter((listing) => listing.slug !== listingToDelete.slug);
					} else {
						showToastr("Couldn't delete listing", 'error');
					}
				};
			}}
		>
			{#if listingToDelete}
				<p class="text-lg text-dark">
					Are you sure you want to delete
					<span class="font-bold">{listingToDelete.title || 'Listing'}</span>
				</p>
				<input type="text" class="hidden" bind:value={listingToDelete.slug} name="slug" />
			{/if}
			<div class="modal-action">
				<!-- if there is a button, it will close the modal -->
				<button class="button" on:click={closeModal} type="button">Close</button>
				<button on:click={closeModal} class="button button--error">Delete</button>
			</div>
		</form>
	</div>
</dialog>
