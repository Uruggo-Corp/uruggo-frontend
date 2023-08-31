<script lang="ts">
	import type { ListingWithImages } from '../types/listings.types';
	import { formatCurrency, getDefaultImage } from '../utils';

	export let inRecommended: boolean = false;
	export let listing: ListingWithImages;
</script>

<div class="overflow-hidden rounded-[5px] border border-dark flex flex-col">
	<div class="w-full overflow-hidden relative">
		<div class="relative">
			<a href="/{listing.slug}" class="group relative">
				<div
					class="opacity-0 z-10 space-x-2 text-white font-medium text-lg flex justify-center items-center group-hover:opacity-40 bg-dark absolute top-0 w-full h-full transition-all duration-300"
				>
					<span> View </span>
				</div>
				<img
					src={getDefaultImage(listing.images).url}
					class="w-full group-hover:scale-105 transition-all duration-300"
					alt="Apartment placeholder"
					style="object-fit: cover; object-position: center; aspect-ratio: 520/347;"
				/>
			</a>
		</div>
	</div>

	<div class="p-[16px] space-y-[4px] flex-grow flex justify-between flex-col">
		<div class="space-y-[4px]">
			<h3 class="text-lg line-clamp-2">{listing.title}</h3>
			<div class="flex space-x-[4px] items-center">
				<!-- For more settings use the AutoHTML plugin tab ... -->
				<svg
					class="vector"
					width="12"
					height="16"
					viewBox="0 0 12 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M6 0C2.68286 0 0 2.57216 0 5.75244C0 9.17925 3.78857 13.9045 5.34857 15.7042C5.69143 16.0986 6.31714 16.0986 6.66 15.7042C8.21143 13.9045 12 9.17925 12 5.75244C12 2.57216 9.31714 0 6 0ZM6 7.80688C4.81714 7.80688 3.85714 6.88649 3.85714 5.75244C3.85714 4.61839 4.81714 3.698 6 3.698C7.18286 3.698 8.14286 4.61839 8.14286 5.75244C8.14286 6.88649 7.18286 7.80688 6 7.80688Z"
						fill="#41413F"
					/>
				</svg>
				<span class="text-sm"> {listing.city}, {listing.country} </span>
			</div>
		</div>
		<div class="flex justify-between items-end">
			<p class="text-dark font-bold">{formatCurrency(listing.price)}/yr</p>
			{#if !inRecommended}
				<a href="/{listing.slug}" class="px-5 py-2 bg-[#DCE4EF] text-lg">View</a>
			{/if}
		</div>
	</div>
</div>
