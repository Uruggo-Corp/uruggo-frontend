<script lang="ts">
	let numbers = [1, 2, 3, 4];
</script>

<section class="bg-[#F5FAFF] text-primary py-10">
	<div class="mx-auto md:px-10 px-5">
		<div class="header md:flex md:space-y-0 space-y-3  justify-between items-start">
			<p class="bg-[#DCE4EF] px-5 py-2">Featured Listings</p>
			<div
				class="bg-primary p-5 rounded-[10px] text-light font-primary grid gap-2 grid-cols-2 items-center text-sm md:flex md:space-x-5"
			>
				<div class="dropdown ">
					<button
						tabindex="-1"
						class="border p-2 border-secondary md:space-x-5 justify-between w-full rounded-[5px] font-bold flex items-center"
						><p>2bed flat</p>
						<iconify-icon
							inline
							icon="material-symbols:arrow-drop-down-circle-outline"
							width="20"
							height="20"
						/></button
					>
					<ul
						tabindex="-1"
						class="dropdown-content menu text-light shadow p-2 bg-primary rounded-box w-fit"
					>
						<li><button>1 Bed Flat</button></li>
						<li><button>2 Bed Flat</button></li>
						<li><button>3 Bed Flat</button></li>
						<li><button>4 Bed Flat</button></li>
						<li><button>5 Bed Flat</button></li>
					</ul>
				</div>

				<div class="dropdown ">
					<button
						tabindex="-1"
						class="p-2 rounded-[5px] md:space-x-5 w-full border font-bold flex items-center justify-between "
						><p>No flat mate</p>
						<iconify-icon
							inline
							icon="material-symbols:arrow-drop-down-circle-outline"
							width="20"
							height="20"
						/></button
					>
					<ul
						tabindex="-1"
						class="dropdown-content menu text-light shadow p-2 bg-primary rounded-box w-fit"
					>
						<li><button>1 flat mate</button></li>
						<li><button>2 flat mate</button></li>
						<li><button>3 flat mate</button></li>
						<li><button>4 flat mate</button></li>
						<li><button>5 flat mate</button></li>
					</ul>
				</div>

				<input
					type="text"
					placeholder="Preferred Location"
					class="bg-primary text-light rounded focus:outline-secondary focus:outline-none p-2"
				/>

				<button class="btn btn-secondary font-primary font-bold rounded-[5px] text-base"
					>Search</button
				>
			</div>
		</div>

		<div class="grid grid-cols-1 md:mt-10 mt-5 gap-10 md:grid-cols-2">
			{#each numbers as number}
				<div class="grid grid-cols-2 border md:p-5 p-3 md:gap-5 gap-3 items-center border-primary ">
					<div class="w-full h-full">
						<img class="h-full " src="/images/house.png" alt="House " />
					</div>
					<div class="space-y-1">
						<h3 class="md:text-2xl text-lg">Furnished 2 bedroom flat</h3>
						<div class="flex items-center md:space-x-2">
							<iconify-icon inline icon="material-symbols:location-on" width="20" height="20" />
							<p class="text-sm">Lekki, Lagos</p>
						</div>
						<p class="md:text-xl text-base font-bold">250,000/yr</p>
						<a
							href="/listing/this"
							class="btn m-0 rounded-none px-5 btn-outline text-lg font-normal">View</a
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	input::placeholder {
		color: #c4dcfa;
		font-weight: 500;
	}

	.btn {
		text-transform: capitalize;
		transition: all 300ms ease;
		margin: 0;
	}

	.btn:hover {
		transform: scale(1.1);
	}
</style>
