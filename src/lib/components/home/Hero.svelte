<section
	id="hero"
	class="bg-primary text-light py-10 px-10 items-center grid grid-cols-1 md:grid-cols-2"
>
	<div class="relative">
		<h2 class="title font-primary md:text-5xl text-2xl font-bold">
			Lets help you find your next apartment or your next roommate
		</h2>
		<p class="lg:text-lg md:mt-10 mt-5 text-justify md:text-left">
			Finding a new apartment can be a daunting task, but with Uruggo, we've made the process much
			simpler. You can easily search for apartments in any location, find a compatible roommate, and
			even list properties for sale, rent, or lease.
		</p>
		<div class="buttons  space-x-5 font-primary text-lg relative">
			<a
				href="/register"
				class="inline-block mt-5 bg-secondary hover:scale-110 transition-all md:px-6 md:py-4 px-3 py-2 w-[46%] text-center  text-primary"
				>Sign me up!</a
			>
			<a
				href="#featured"
				class="inline-block mt-5 hover:scale-110 transition-all border border-secondary w-[46%] text-center text-secondary md:px-6 md:py-4 px-3 py-2"
				>Look around<img src="/images/hero-arrow.png" alt="Arrow pointing down" /></a
			>
			<!-- <div class="flex justify-end relative h-10"> -->

			<!-- </div> -->
		</div>
	</div>
	<div class="flex items-center item-2 justify-center">
		<img src="/images/hero.png" class="w-[80%]" alt="Group of house pictures" />
	</div>
</section>

<style>
	#hero {
		background-image: url('/images/hero-bg.png');
	}

	a {
		position: relative;
	}

	a img {
		position: absolute;
		height: 100px;
		right: -90px;
	}

	@media only screen and (max-width: 768px) {
		.item-2 {
			order: -1;
		}

		a img {
			height: 60px;
			right: -40px;
		}

		.title {
			text-align: center;
		}
	}
</style>
