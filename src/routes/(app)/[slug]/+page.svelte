<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { listing } = data;
	console.log(listing);
</script>

<main class="container container-padding my-[40px]" role="contentinfo">
	<section class="grid w-full grid-cols-2 gap-2" role="main">
		<div class="w-full">
			{#each listing.images as image, i}
				{#if image.id === listing.images[0].id}
					<img src={image.url} alt="" />
				{:else}
					hi
				{/if}
			{/each}
		</div>
	</section>
</main>
