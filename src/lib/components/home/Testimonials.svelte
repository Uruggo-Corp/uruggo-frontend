<section
	class="bg-primary text-light md:px-14 px-10 py-10 grid md:grid-cols-3 gap-5 items-center grid-cols-1"
>
	<div class="col-span-2 relative text-center md:text-left">
		<img src="/images/quote.png" alt="Quote" class="absolute hidden md:flex top-[-50px]" />
		<h3 class="font-primary text-4xl font-bold">Testimonials</h3>
		<p class="mt-3 text">
			I was able to secure my apartment in a short amount of time, thanks to the efficiency of
			Uruggo. I highly recommend it to others.
		</p>
		<p class="font-primary mt-5 text-xl name">
			Samuel <span class="text-base font-primary"> (Unilag Student)</span>
		</p>
		<div class="flex items-center justify-center md:justify-start space-x-3 mt-3">
			<button class="border border-light rounded "
				><iconify-icon inline icon="material-symbols:chevron-left" width="24" /></button
			>
			<p>1</p>
			<button class="border border-light rounded "
				><iconify-icon inline icon="material-symbols:chevron-right" width="24" /></button
			>
		</div>
	</div>
	<div class="item-2 mb-10 md:mb-0">
		<img src="/images/testimonials.png" alt="Testimonial" />
	</div>
</section>

<style>
	.text {
		font-family: 'DM Sans';
		font-style: normal;
		font-weight: 400;
		line-height: 25px;
	}

	.name {
		font-style: italic;
	}

	@media only screen and (max-width: 768px) {
		.item-2 {
			order: -1;
		}
	}
</style>
