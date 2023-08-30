<div class="footer-container">
	<div class="footer-items">
		<div class="footer-item company">
			<div class="items-title">Company</div>
			<a href="https://www.uruggo.com/" class="item-link">About us</a>
			<a href="https://www.uruggo.com/" class="item-link">Terms and Conditions</a>
			<a href="https://www.uruggo.com/" class="item-link">Privacy</a>
			<a href="https://www.uruggo.com/" class="item-link">Features </a>
		</div>
		<div class="footer-item resources">
			<div class="items-title">Resources</div>
			<a href="https://www.uruggo.com/" class="item-link">Blog</a>
			<a href="https://www.uruggo.com/" class="item-link">Newsletter</a>
			<a href="https://www.uruggo.com/" class="item-link">How-To</a>
			<a href="https://www.uruggo.com/" class="item-link">Support </a>
			<a href="https://www.uruggo.com/" class="item-link">FAQ</a>
		</div>
		<div class="footer-item contact">
			<div class="items-title">Contact Us</div>
			<a href="https://www.uruggo.com/" class="item-link">+2348146897635</a>
			<a href="https://www.uruggo.com/" class="item-link">services@uruggo.com</a>
			<div class="contact-icons">
				<a href="https://www.uruggo.com/">
					<img src="/icons/twitter-icon.svg" alt="Twitter" />
				</a>

				<a href="https://www.uruggo.com/">
					<img src="/icons/facebook-icon.svg" alt="Facebook" />
				</a>
				<a href="https://www.uruggo.com/">
					<img src="/icons/instagram-icon.svg" alt="Instagram" />
				</a>
			</div>
		</div>
	</div>
	<div class="credits">2023 Uruggo</div>
</div>

<style lang="scss">
	.footer-container {
		background-color: #06111f;
		color: #fff;
		padding: 1rem;
		text-align: center;
		padding: 3rem 2rem;

		@media (max-width: 766px) {
			overflow-x: scroll;
			font-size: 0.875rem;
			white-space: nowrap;
		}
		.footer-items {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			@media (max-width: 766px) {
				display: block;
			}

			.footer-item {
				width: 33%;
				display: flex;
				flex-direction: column;
				text-align: left;
				@media (max-width: 766px) {
					width: 50%;
				}
				a {
					color: #fff;
					text-decoration: none;
					font-weight: 400;
					font-size: 1.5rem;
					line-height: 1.9375rem;
					padding: 0.75rem 0;
				}
				.contact-icons {
					width: 30%;
					display: flex;
					justify-content: space-between;
				}
			}
			.items-title {
				color: #c4dcfa;
				font-size: 1.875rem;
				font-weight: 400;
				padding: 1.5rem 0;
			}
		}
		.credits {
			font-weight: 400;
			font-size: 1.25rem;
			text-align: left;
			padding-top: 5.5rem;
		}
	}
</style>
