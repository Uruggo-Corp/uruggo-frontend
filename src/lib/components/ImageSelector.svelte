<script lang="ts">
	import type { Image } from '@prisma/client';
	import { showToastr } from '../utils';

	let images: FileList | undefined = undefined;
	export let displayImages: Image[] | string | undefined = undefined;
	let previewImage: string | undefined = undefined;

	export let maximumImages: number = 10;
	export let inputName: string = 'images';
	export let allowMultiple: boolean = true;
	const setPreview = (image: File) => {
		previewImage = URL.createObjectURL(image);
	};

	$: {
		if (images) {
			setPreview(images[0]);
		}

		// Check if the number of images is greater than the maximum allowed
		if (images && images.length > maximumImages) {
			images = undefined;
			previewImage = undefined;
			showToastr(`You can only upload up to ${maximumImages} images`, 'error');
		}

		// Check if the images are too large
		if (images) {
			for (let i = 0; i < images.length; i++) {
				if (images[i].size > 5 * 1024 * 1024) {
					images = undefined;
					previewImage = undefined;
					showToastr('Images must be less than 5MB', 'error');
					break;
				}
			}
		}

		// Check if the images are not of the correct type
		if (images) {
			for (let i = 0; i < images.length; i++) {
				if (!images[i].type.startsWith('image')) {
					images = undefined;
					previewImage = undefined;
					showToastr('Only images are allowed', 'error');
					break;
				}
			}
		}
	}

	$: {
		if (displayImages && !images?.length) {
			if (displayImages instanceof Array) {
				previewImage = displayImages[0]?.url;
			} else previewImage = displayImages;
		}
	}
</script>

<div class=" mx-auto w-full md:px-0 px-4">
	<div
		class="h-[15rem] flex relative flex-col items-center justify-center gap-4 border-2 hover:border-primary focus:border-primary
        {images && images.length ? 'border-primary' : 'border-gray-300'} 
            border-dashed rounded-t-md w-full"
	>
		{#if previewImage}
			<img
				src={previewImage}
				alt=""
				style="aspect-ratio: 4/3"
				class=" h-full absolute w-full object-contain"
			/>
		{/if}
		<input
			bind:files={images}
			on:drop={(e) => {
				e.preventDefault();
				images = e.dataTransfer?.files;
			}}
			type="file"
			name={inputName}
			id={inputName}
			class="w-full cursor-pointer h-full absolute z-10 opacity-0"
			accept="image/*"
			multiple={maximumImages > 1}
		/>
		{#if !previewImage}
			<p>Upload image</p>
		{/if}
	</div>
	{#if images}
		<div
			class="py-1 px-3 w-full flex space-x-5 rounded-b bg-primary/30 border-b-2 border-l-2 border-r-2 border-dashed border-primary"
		>
			{#each images as image}
				<button type="button" on:click={() => setPreview(image)}>
					<div class="w-[50px] h-[50px] flex relative cursor-pointer">
						<img src={URL.createObjectURL(image)} alt={image.name} />
					</div>
				</button>
			{/each}
		</div>
	{:else if displayImages}
		<div
			class="py-1 px-3 w-full flex space-x-5 rounded-b bg-primary/30 border-b-2 border-l-2 border-r-2 border-dashed border-primary"
		>
			{#if displayImages instanceof Array}
				{#each displayImages as image}
					<button type="button" on:click={() => (previewImage = image.url)}>
						<div class="w-[50px] h-[50px] flex relative cursor-pointer">
							<img src={image.url} alt="" />
						</div>
					</button>
				{/each}
			{:else}
				<div class="w-[50px] h-[50px] flex relative cursor-pointer">
					<img src={displayImages} alt="" />
				</div>
			{/if}
		</div>
	{/if}
</div>
