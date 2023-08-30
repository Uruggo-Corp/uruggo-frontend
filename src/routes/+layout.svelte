<script lang="ts">
	import { onMount } from 'svelte';
	import '../styles/app.postcss';
	import '../styles/global.css';
	import 'iconify-icon';
	import { Toaster } from 'svelte-french-toast';
	import { currentUser } from '$lib/stores/users';
	import { navigating, page } from '$app/stores';
	import { showToastr } from '$lib/utils';
	export let data;

	let url = $page.url;

	onMount(() => {
		if (data.user) currentUser.set(data.user);
	});

	$: {
		url = $page.url;
		if (url.searchParams.get('message')) {
			showToastr(url.searchParams.get('message') || '', 'info');
		}
	}
</script>

<Toaster />
<slot />

{#if !!$navigating}
	<div
		class="z-[9999] fixed h-screen w-screen text-primary flex justify-center items-center top-0 left-0"
	>
		<div class="absolute top-0 left-0 w-full h-full bg-black/30" />
		<div class="p-5 z-50 bg-dark">
			<iconify-icon icon="eos-icons:bubble-loading" width="40" s />
		</div>
	</div>
{/if}
