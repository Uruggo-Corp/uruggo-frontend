<script lang="ts">
	import { onMount } from 'svelte';

	let apartments: Array<any>;
	apartments = [];
	const fetchApartments = () => {
		fetch('https://api.uruggo.com/listings?search&page=1&limit=10')
			.then((res) => {
				if (!res.ok) {
					throw new Error('Failed to fetch apartments data');
				}
				return res.json();
			})
			.then((data) => {
				// Update apartments store with fetched data
				apartments = data.data;
			})
			.catch((error) => {
				console.error(error);
				// Handle error, e.g., set apartments store to empty array or show error message
			});
	};

	onMount(() => {
		fetchApartments();
	});
</script>

<div class="apartments">
	<h2>Recommended for you</h2>
	<!-- Render apartments data in your component -->
	{#if apartments.length}
		<div class="container">
			{#each apartments as apartment}
				<div class="apartment-block">
					<img class="apartment-image" src="https://placehold.co/600x400" alt="apartment" />
					<div class="apartment-description">
						<div class="apartment-title">{apartment.title}</div>
						<div class="apartment-location">
							<img src="/icons/location-icon.svg" alt="" />
							<div>
								{apartment.location.city + ', ' + apartment.location.state}
							</div>
						</div>
						<div class="apartment-price">
							{apartment.price.toLocaleString('en-US', {})}/yr
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="loading">
			<span class="loader" />
		</div>
	{/if}
</div>

<style lang="scss">
	.apartments {
		h2 {
			text-align: center;
			font-weight: 700;
			font-size: 1.875rem;
			color: #06111f;
			padding: 1.5rem 0;
		}
		.apartment-block {
			height: 20.75rem;
			width: 100%;
			display: flex;
			flex-direction: column;
			margin: 0 auto;
			border: 0.5px solid #06111f;
			border-radius: 4px;
			.apartment-description {
				padding: 16px;

				.apartment-title {
					font-size: 1.25rem;
					font-weight: 400;
					line-height: 1.625rem;
				}
				.apartment-location {
					display: flex;
					gap: 6px;
				}
				.apartment-price {
					font-size: 1.25rem;
					font-weight: 700;
					line-height: 1.625rem;
					color: #06111f;
					padding: 16px 0;
				}
			}
			.apartment-image {
				height: 60%;
				width: 100%;
				object-fit: cover;
			}
		}
	}
	.container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
		padding: 0 3.8125rem;
		@media (max-width: 767px) {
			// Styles for mobile screens
			grid-template-columns: repeat(2, 1fr);
			gap: 1.25rem;
			padding: 0 1.25rem;
		}
	}

	.loading {
		height: 100vh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.loader {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		position: relative;
		animation: rotate 1s linear infinite;
	}
	.loader::before {
		content: '';
		box-sizing: border-box;
		position: absolute;
		inset: 0px;
		border-radius: 50%;
		border: 5px solid #9ba809;
		animation: prixClipFix 2s linear infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes prixClipFix {
		0% {
			clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
		}
		25% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
		}
		50% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
		}
		75% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
		}
		100% {
			clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
		}
	}
</style>
