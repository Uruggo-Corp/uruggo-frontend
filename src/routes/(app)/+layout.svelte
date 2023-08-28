<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
</script>

<div class="flex flex-col min-h-screen">
	<Navbar />
	<main class="mb-auto">
		<slot />
	</main>
	{#if !$page.url.pathname.includes('/settings')}
		<Footer />
	{/if}
</div>
