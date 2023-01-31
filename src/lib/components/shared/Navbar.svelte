<script>
	import NavArrow from './NavArrow.svelte';

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<nav id="navbar" class="bg-primary text-light font-primary p-5 flex items-center justify-between">
	<a href="/">
		<img src="/images/logo.png" alt="Uruggo Logo" class="w-[100px]" />
	</a>
	<ul class="md:flex items-center space-x-10 hidden">
		<li><a href="/contact" class="nav-item">Contact us <NavArrow /></a></li>
		<li><a href="/about" class="nav-item">About us <NavArrow /></a></li>
		<li><a href="/login" class="nav-item">Login</a></li>
		<li><a href="/register" class="nav-btn">Register</a></li>
	</ul>
	<div class="md:hidden">
		<button on:click={toggleMenu} class="text-secondary">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-8 w-8"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
	</div>

	<!-- Mobile Sidebar -->
	<!-- It slides in from the left -->
	<!-- It is full screen and it has a smooth transition with translateX-->

	<div
		class="fixed top-0 left-0 h-screen w-screen bg-primary text-light z-10 flex flex-col justify-center items-center"
		style="transform: translateX({isMenuOpen ? '0' : '-100%'}); transition: all 150ms ease;"
	>
		<div class="flex justify-end p-5 absolute top-0 right-0">
			<button on:click={toggleMenu} class="text-secondary">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
		<ul class="flex flex-col items-center space-y-10">
			<li><a href="/contact" class="nav-item">Contact us <NavArrow /></a></li>
			<li><a href="/about" class="nav-item">About us <NavArrow /></a></li>
			<li><a href="/login" class="nav-item">Login</a></li>
			<li><a href="/register" class="nav-btn">Register</a></li>
		</ul>
	</div>
</nav>

<style>
	#navbar {
		box-shadow: 10px 4px 20px 5px rgba(0, 0, 0, 0.25);
	}

	.nav-item {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-light);
	}

	.nav-item:hover {
		color: var(--color-secondary);
	}

	.nav-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-light);
		background-color: var(--color-secondary);
		padding: 0.5rem 1rem;
		border-radius: 5px;
		transition: all 150ms ease;
	}

	.nav-btn:hover {
		transform: scale(1.1);
	}
</style>
