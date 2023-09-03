<script lang="ts">
	import type { Option } from '$lib/types/types';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	export let inputName: string;
	export let placeholder: string = 'Select options';
	export let options: Option[];
	export let className: string = 'text-white font-serif';
	export let clearFilters: boolean = false;

	const dispatch = createEventDispatcher();

	$: {
		dispatch('change', currentValue);
	}
	let currentOption: Option;

	$: currentValue = clearFilters ? '' : currentOption?.value || '';
	$: currentName = !clearFilters && currentOption?.name;

	// const clearCurrentOption = () => {
	// 	for (let key in currentOption) delete currentOption[key];
	// };
	// $: clearFilters && clearCurrentOption();
	let show = false;
</script>

<div class="dropdown w-full min-w-max {className}">
	<input bind:value={currentValue} type="text" name={inputName} id={inputName} class="hidden" />
	<button
		type="button"
		on:click={() => (show = !show)}
		tabindex="0"
		class=" w-full cursor-pointer rounded px-2 py-1 flex items-center gap-3 sm:gap-8 justify-between"
	>
		<span class="w-full">{currentName || placeholder}</span>
		<iconify-icon icon="iconamoon:arrow-down-6-circle" width="20" />
	</button>

	{#if show}
		<ul
			tabindex="0"
			class="z-50 dropdown-content transition-transform mt-2 bg-dark text-white border border-primary rounded absolute min-w-max w-full flex flex-col gap-3 py-3 shadow"
			in:slide={{ duration: 200 }}
			out:slide={{ duration: 200 }}
		>
			{#each options as option, i}
				<button
					class="w-full px-3 py-1 hover:bg-primary text-start h-full"
					type="button"
					on:click={(e) => {
						clearFilters = false;
						currentOption = option;
						show = !show;
					}}
				>
					<li class="">
						{option.name}
					</li>
				</button>
			{/each}
		</ul>
	{/if}
</div>
