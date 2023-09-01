<script lang="ts">
	import { formatCurrency, getDefaultImage } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;
	const { listing } = data;
	console.log(listing);
</script>

<svelte:head>
	<title>{listing.title} - Uruggo</title>
</svelte:head>

<main class="container container-padding mx-auto my-[40px]" role="contentinfo">
	<section class="grid w-full grid-cols-1 md:grid-cols-2 gap-2" role="main">
		<div class="w-full flex flex-row-reverse md:flex-col gap-3">
			<img
				style="aspect-ratio: 4/3"
				class="md:w-full w-[70%] object-cover h-full"
				src={getDefaultImage(listing.images).url}
				alt=""
			/>
			<div class="flex flex-col md:flex-row gap-3 md:carousel w-full">
				{#each listing.images as image, i}
					{#if image.id !== listing.images[0].id}
						<div class="carousel-item h-[56px] w-[82px] md:h-[170px] md:w-[170px]">
							<img src={image.url} class="w-full h-full object-cover" alt="" />
						</div>
					{/if}
				{/each}
			</div>
		</div>
		<div class="w-full grid grid-cols-1 gap-10 border-[#CCCCCC] md:px-8 py-5">
			<section class="flex flex-col gap-3 w-full">
				<h1 class="font-primary text-secondary text-2xl md:text-[30px]" style="line-height: 41px;">
					{listing.title}
				</h1>
				<h3
					class="font-bold font-primary text-dark text-[26px] md:text-[32px]"
					style="line-height: 52px;"
				>
					{formatCurrency(listing.price)}/yr
				</h3>

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
					<span class="text-sm"> {listing.city}, {listing.state} </span>
				</div>

				<div class="flex items-center w-full gap-4">
					<p class="items-center flex gap-1 font-medium font-primary">
						<span>{listing.bedrooms} {listing.bedrooms <= 1 ? 'Room' : 'Rooms'}</span><iconify-icon
							class="text-primary"
							icon="la:bed"
						/>
					</p>
					<p class="items-center flex gap-1 font-medium font-primary">
						<span>{listing.bathrooms} {listing.bathrooms <= 1 ? 'Bath' : 'Baths'}</span
						><iconify-icon class="text-primary" icon="fa:bath" />
					</p>
				</div>

				<p role="contentinfo" class="text-sm mt-4">{listing.description}</p>
				<p class="font-primary text-gray text-sm">
					Posted by: {listing.agent.first_name}
					{listing.agent.last_name}
				</p>
			</section>

			<section class="w-full grid grid-cols-1 gap-4">
				<button type="button" class="button w-full button--primary"
					>Call Agent ({listing.agent.phone_number})</button
				>
				<button type="button" class="button w-full border-primary text-primary rounded-[5px] border"
					>Send a message</button
				>
			</section>
		</div>
	</section>
</main>
