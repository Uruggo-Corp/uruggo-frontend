<script lang="ts">
	import '../styles/tailwind.css';
	import '../styles/app.css';
	import 'iconify-icon';

	import Navbar from '$lib/components/shared/Navbar.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
</script>

<div class="flex flex-col min-h-screen max-w-[1600px] mx-auto shadow-lg">
	<Navbar />
	<main class="flex-grow">
		<slot />
	</main>
	<Footer />
</div>
