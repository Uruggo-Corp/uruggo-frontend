<script lang="ts">
	import { onMount } from 'svelte';
	import '../styles/app.postcss';
	import '../styles/global.css';
	import 'iconify-icon';
	import { Toaster } from 'svelte-french-toast';
	import { currentUser } from '../lib/stores/users';
	import { page } from '$app/stores';
	import { showToastr } from '../lib/utils';
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
