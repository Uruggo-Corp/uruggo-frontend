<script lang="ts">
	import { client } from '$lib/utils/client';
	import type { Listing } from '../../types/listings.types';
	import type { Paginated } from '../../types/paginated.type';
	import { formatPrice } from '../../utils/format';

	const getFeaturedListings = async () => {
		const { data } = await client.get<Paginated<Listing>>('/listings', {
			params: {
				'filter.isFeatured': true,
				limit: 4
			}
		});
		return data.data;
	};

	let listings = getFeaturedListings();
</script>

<section id="featured" class="bg-[#F5FAFF] text-primary py-10">
	<div class="mx-auto md:px-10 px-5">
		<div class="header md:flex md:space-y-0 text-xs space-y-3  justify-between items-start">
			<p class="bg-[#DCE4EF] px-5 py-2">Featured Listings</p>
			<div
				class="bg-primary p-5 rounded-[10px] text-light font-primary grid gap-2 md:grid-cols-3 grid-cols-2 items-center text-sm lg:flex lg:space-x-5"
			>
				<div class="dropdown ">
					<button
						tabindex="-1"
						class="border p-2 border-secondary text-xs md:space-x-5 justify-between w-full rounded-[5px] font-bold flex items-center"
						><p>2bed flat</p>
						<iconify-icon
							inline
							icon="material-symbols:arrow-drop-down-circle-outline"
							width="20"
							height="20"
						/></button
					>
					<ul
						tabindex="-1"
						class="dropdown-content menu  text-light shadow p-2 bg-primary rounded-box w-fit"
					>
						<li><button>1 Bed Flat</button></li>
						<li><button>2 Bed Flat</button></li>
						<li><button>3 Bed Flat</button></li>
						<li><button>4 Bed Flat</button></li>
						<li><button>5 Bed Flat</button></li>
					</ul>
				</div>

				<div class="dropdown ">
					<button
						tabindex="-1"
						class="p-2 rounded-[5px] text-xs md:space-x-5 w-full border font-bold flex items-center justify-between "
						><p>No flat mate</p>
						<iconify-icon
							inline
							icon="material-symbols:arrow-drop-down-circle-outline"
							width="20"
							height="20"
						/></button
					>
					<ul
						tabindex="-1"
						class="dropdown-content menu text-light shadow p-2 bg-primary rounded-box w-fit"
					>
						<li><button>1 flat mate</button></li>
						<li><button>2 flat mate</button></li>
						<li><button>3 flat mate</button></li>
						<li><button>4 flat mate</button></li>
						<li><button>5 flat mate</button></li>
					</ul>
				</div>

				<input
					type="text"
					placeholder="Preferred Location"
					class="bg-primary text-xs text-light rounded focus:outline-secondary focus:outline-none p-2"
				/>

				<button class="btn btn-secondary font-primary md:col-span-3 font-bold rounded-[5px] text-xs"
					>Search</button
				>
			</div>
		</div>

		<div class="grid grid-cols-1 md:mt-10 mt-5 gap-10 md:grid-cols-2">
			{#await listings}
				{#each [1, 2, 3, 4] as _}
					<div
						class="grid grid-cols-2 animate-pulse border md:p-5 p-3 md:gap-5 gap-3 items-center border-primary "
					>
						<div class="w-full h-full">
							<div class="bg-slate-200 w-full h-[200px]" />
						</div>
						<div class="space-y-1">
							<div class="bg-slate-200 h-5 w-full rounded-full" />
							<div class="bg-slate-200 h-5 w-[80%] rounded-full" />
							<div class="flex items-center md:space-x-2 text-slate-200">
								<iconify-icon inline icon="material-symbols:location-on" width="20" height="20" />
								<div class="bg-slate-200 h-2 w-1/2 rounded-full" />
							</div>
							<div class="bg-slate-200 h-5 w-full rounded-full" />
							<div class="bg-slate-200 h-10 w-20 mt-2" />
						</div>
					</div>
				{/each}
			{:then listings}
				{#each listings as listing}
					<div
						class="grid grid-cols-2 border md:p-5 p-3 md:gap-5 gap-3 items-center border-primary "
					>
						<div class="w-full h-full">
							<img class="h-full " src="/images/house.png" alt="House " />
						</div>
						<div class="space-y-1">
							<h3 class="md:text-2xl text-lg">{listing.title}</h3>
							<div class="flex items-center md:space-x-2">
								<iconify-icon inline icon="material-symbols:location-on" width="20" height="20" />
								<p class="text-sm">{listing.location.city}, {listing.location.state}</p>
							</div>
							<p class="md:text-xl text-base font-bold">
								{formatPrice(listing.price)}/{#if listing.leaseTerm === 'monthly'}mth
								{:else if listing.leaseTerm === 'quarterly'}qt
								{:else}
									yr{/if}
							</p>
							<a
								href="/listing/this"
								class="btn m-0 rounded-none px-5 btn-outline text-lg font-normal">View</a
							>
						</div>
					</div>
				{:else}
					<div class=" col-span-2 flex flex-col items-center justify-center">
						<p class="text-2xl font-primary text-center">
							There are currently no featured posts...
						</p>
					</div>
				{/each}
			{/await}
		</div>
	</div>
</section>

<style>
	input::placeholder {
		color: #c4dcfa;
		font-weight: 500;
	}

	.btn {
		text-transform: capitalize;
		transition: all 300ms ease;
		margin: 0;
	}

	.btn:hover {
		transform: scale(0.9);
	}
</style>
