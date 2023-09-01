<script lang="ts">
	import type { Option } from '$lib/types/types';
	import { slide } from 'svelte/transition';
	export let inputName: string;
	export let placeholder: string = 'Select options';
	export let options: Option[];
	export let className: string = 'text-white font-serif';

	let currentOption: Option = options[0];
	$: currentValue = currentOption.value || 1;

	let show = false;
</script>

<div class="dropdown w-full min-w-max {className}">
	<input bind:value={currentValue} type="text" name={inputName} id={inputName} class="hidden" />
	<button
		type="button"
		on:click={() => (show = !show)}
		tabindex="0"
		class=" w-full cursor-pointer rounded px-2 py-1 flex items-center gap-8 justify-between"
	>
		<span class="w-full">{currentOption?.name || placeholder}</span>
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
				<li class="hover:bg-primary px-3 py-1">
					<button
						type="button"
						on:click={(e) => {
							currentOption = option;
							show = !show;
						}}>{option.name}</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>
