<script>
	import NavArrow from './NavArrow.svelte';
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
