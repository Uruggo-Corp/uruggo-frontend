<script lang="ts">
	import '../../styles/tailwind.css';
	import '../../styles/app.css';
	import 'iconify-icon';
</script>

<!-- On desktop it is a screen with a fixed full height image at the left and the slot content on the left -->
<!-- On mobile it is just the slot content -->
<div
	class="flex min-h-screen max-w-[1600px] relative mx-auto shadow-lg flex-col lg:flex-row gap-10 h-screen"
>
	<nav
		id="navbar"
		class="bg-primary text-light absolute w-full font-primary p-5 flex items-center justify-between"
	>
		<a href="/">
			<img src="/images/logo.png" alt="Uruggo Logo" class="w-[100px]" />
		</a>
	</nav>

	<div
		class="flex-1 hidden lg:block w-1/2 h-screen bg-cover bg-center"
		style="background-image: url('/images/auth.png'); background-size: cover;"
	/>
	<div class="flex-1 flex-grow flex items-center justify-center w-full ">
		<slot />
	</div>
</div>
