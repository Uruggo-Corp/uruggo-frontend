<div class="header">
	<div class="header__inner">
		<div class="title">Uru<span class="brand-color">gg</span>o</div>
		<div class="links">
			<button class="post-ad-button">post An Ad</button>

			<div class="account-button">
				<img src="/icons/account-icon.svg" alt="account-icon" />
				My account
			</div>
		</div>
		<div class="menu">
			<img src="/icons/menu-icon.svg" alt="menu-icon" />
		</div>
	</div>
</div>

<style lang="scss">
	.header {
		height: 4rem;
		width: 100vw;
		background-color: #05101f;
		color: #dcdcdc;
		.header__inner {
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #fff;
			padding: 0 4rem;
			@media (max-width: 767px) {
				// Styles for mobile screens
				padding: 0 1rem;
			}
			.title {
				font-size: 2rem;
				font-weight: 400;
				text-transform: capitalize;
			}
		}
		.links {
			display: flex;
			@media (max-width: 767px) {
				// Styles for mobile screens
				display: none;
			}
			justify-content: space-between;
			align-items: center;
			width: auto;
			height: 100%;
			padding: 0 0.4rem;
			gap: 1.2rem;
			.post-ad-button {
				padding: 0.7rem 0.92rem;
				text-transform: capitalize;
				font-size: 1.2rem;
				font-weight: 500;
				background-color: #9ba809;
				color: #dcdcdc;
				border: none;
				border-radius: 5px;
				cursor: pointer;
				&:hover {
					background-color: #848f0a;
				}
			}
			.account-button {
				display: flex;
				align-items: center;
				cursor: pointer;
			}
		}
		.menu {
			@media (min-width: 768px) {
				// Styles for mobile screens
				display: none;
			}
		}
		.brand-color {
			color: #9ba809;
		}
	}
</style>
