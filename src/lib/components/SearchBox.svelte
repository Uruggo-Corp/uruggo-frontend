<div class="search-box__container">
	<div class="search-box">
		<div class="search-icon">
			<img src="/icons/search.svg" alt="search icon" />
		</div>
		<input placeholder="Search for an apartment" class="search-box-input" />
	</div>
</div>

<style lang="scss">
	.search-box__container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 2rem;
		width: 100vw;
		margin: 3rem 0;
		.search-box {
			display: flex;
			align-items: center;
			width: 80vw;
			border: 1px solid #ccc;
			padding: 0.7rem 1rem;
			font-size: 0.875;
			font-weight: 400;
			outline: none;
			color: #b4b4b0;
			.search-box-input {
				flex: 1;
				border: none;
				outline: none;
			}
		}
		.search-icon {
			margin-right: 1rem;
		}
		input {
			flex: 1;
			border: none;
			outline: none;
		}
	}
</style>
