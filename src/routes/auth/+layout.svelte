<script lang="ts">
	import Navbar from '../../lib/components/Navbar.svelte';
</script>

<Navbar onlyLogo isFixed />
<main class="grid grid-cols-1 md:grid-cols-2 w-full h-screen pt-[60px]">
	<div class="bg h-full w-full md:flex hidden" />
	<div class="px-5 py-10 flex items-center h-full flex-col justify-center">
		<slot />
	</div>
</main>

<style>
	.bg {
		background-image: url('/auth-bg.png');
		background-size: cover;
		background-position: center;
	}
</style>
