<script lang="ts">
	import ApartmentCard from '$lib/components/ApartmentCard.svelte';

	const apartmentTypes = [
		{
			name: 'All',
			value: ''
		},
		{
			name: 'Self-con',
			value: 'self-con'
		},
		{
			name: 'One bedroom',
			value: 'one-bedroom'
		},
		// Till 4 bedrooms
		{
			name: 'Two bedrooms',
			value: 'two-bedrooms'
		},
		{
			name: 'Three bedrooms',
			value: 'three-bedrooms'
		},
		{
			name: 'Four bedrooms',
			value: 'four-bedrooms'
		},
		{
			name: 'Shared apartment',
			value: 'shared-apartment'
		}
	];

	let selectedApartmentType = apartmentTypes[0].value;

	const selectApartmentType = (value: string) => {
		selectedApartmentType =
			apartmentTypes.find((type) => type.value === value)?.value || apartmentTypes[0].value;
	};
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

	<div class="gap-x-[40px] gap-y-2 overflow-x-scroll carousel md:w-fit w-full">
		{#each apartmentTypes as type}
			<button
				class="text-sm font-medium carousel-item text-gray-500 hover:text-gray-900 filter-btn min-w-fit"
				class:active={selectedApartmentType === type.value}
				on:click={() => selectApartmentType(type.value)}
			>
				{type.name}
			</button>
		{/each}
	</div>
</section>

<section class="my-[80px] container container-padding mx-auto">
	<h3 class="text-center text-3xl font-serif text-dark font-bold">Available Apartments</h3>
	<div class="mt-[40px] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px] mx-auto">
		{#each { length: 9 } as _}
			<ApartmentCard />
		{/each}
	</div>
</section>

<section class="my-[80px] container container-padding mx-auto">
	<h3 class="text-center text-3xl font-serif text-dark font-bold">Recommended for you</h3>
	<div class="mt-[40px] grid md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
		{#each { length: 8 } as _}
			<ApartmentCard inRecommended />
		{/each}
	</div>
</section>

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

	.filter-btn.active {
		color: var(--primary-color);
	}
</style>
