<!-- We then show them a form based on that -->
<script lang="ts">
	// Keep track of the current step
	let step = 1;

	// Keep track of the user type
	let userType = '';
</script>

<!-- The registration has 3 steps -->
<!-- We first ask what kind of user theyy want to register as. Agent/Landlord or Normal users-->

<div class="w-full max-w-[450px] mx-auto px-5 space-y-5">
	<div class="form-header">
		<h2 class="text-3xl font-primary text-center md:text-left">Create an account</h2>
		<progress
			class="progress progress-secondary w-56 transition-all"
			value={step === 1 ? '25' : step === 2 ? '50' : '75'}
			max="100"
		/>
	</div>
	{#if step === 1}
		<div class="space-y-5">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
				<button
					on:click={() => (userType = 'agent')}
					class="border p-3 bg-[#FCFCFC] "
					class:border-secondary={userType == 'agent'}
					class:text-secondary={userType == 'agent'}
				>
					<p class="text-center">I’m looking for an apartment /roomate</p>
				</button>
				<button
					on:click={() => (userType = 'normal')}
					class="border p-3 bg-[#FCFCFC] "
					class:border-secondary={userType == 'normal'}
					class:text-secondary={userType == 'normal'}
				>
					<p class="text-center">I’m a property agent/Landlord</p>
				</button>
			</div>
			<button class="btn btn-secondary" on:click={() => step++}>Next</button>
		</div>
	{/if}

	{#if step === 2}
		{#if userType === 'normal'}
			<form class="form">
				<div class="form-control">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z"
							stroke="#ADAAAA"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M12 14C12.5304 14 13.0391 14.2107 13.4142 14.5858C13.7893 14. 9609 15.4696 15 16C15.5304 16.5304 15.7411 17.0391 15.5858 17.4142C15.4304 17.7893 15.0391 18 14.5 18H9.5C8.96086 18 8.56957 17.7893 8.41421 17.4142C8.25885 17.0391 8.46957 16.5304 9 16C9.53043 15.4696 10.0391 15.2589 10.4142 15.4142C10.7893 15.5696 11 15.9609 11 16.5V20"
							stroke="#ADAAAA"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<input type="text" placeholder="Full Name" />
				</div>
				<div class="form-control">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z"
							stroke="#ADAAAA"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M12 14C12.5304 14 13.0391 14.2107 13.4142 14.5858C13.7893 14. 9609 15.4696 15 16C15.5304 16.5304 15.7411 17.0391 15.5858 17.4142C15.4304 17.7893 15.0391 18 14.5 18H9.5C8.96086 18 8.56957 17.7893 8.41421 17.4142C8.25885 17.0391 8.46957 16.5304 9 16C9.53043 15.4696 10.0391 15.2589 10.4142 15.4142C10.7893 15.5696 11 15.9609 11 16.5V20"
							stroke="#ADAAAA"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<input type="text" placeholder="Email" />
				</div>

				<div class="form-control">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z"
							stroke="#ADAAAA"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M12 14C12.5304 14 13.0391 14.2107 13.4142 14.5858C13.7893 14. 9609 15.4696 15 16C15.5304 16.5304 15.7411 17.0391 15.5858 17.4142C15.4304 17.7893 15.0391 18 14.5 18H9.5C8.96086 18 8.56957 17.7893 8.41421 17.4142C8.25885 17.0391 8.46957 16.5304 9 16C9.53043 15.4696 10.0391 15.2589 10.4142 15.4142C10.7893 15.5696 11 15.9609 11 16.5V20"
							stroke="#ADAAAA"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<input type="text" placeholder="Phone Number" />
				</div>

				<div class="form-control">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z"
							stroke="#ADAAAA"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M12 14C12.5304 14 13.0391 14.2107 13.4142 14.5858C13.7893 14. 9609 15.4696 15 16C15.5304 16.5304 15.7411 17.0391 15.5858 17.4142C15.4304 17.7893 15.0391 18 14.5 18H9.5C8.96086 18 8.56957 17.7893 8.41421 17.4142C8.25885 17.0391 8.46957 16.5304 9 16C9.53043 15.4696 10.0391 15.2589 10.4142 15.4142C10.7893 15.5696 11 15.9609 11 16.5V20"
							stroke="#ADAAAA"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<input type="text" placeholder="Password" />
				</div>

				<div class="form-control">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2Z"
							stroke="#ADAAAA"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M12 14C12.5304 14 13.0391 14.2107 13.4142 14.5858C13.7893 14. 9609 15.4696 15 16C15.5304 16.5304 15.7411 17.0391 15.5858 17.4142C15.4304 17.7893 15.0391 18 14.5 18H9.5C8.96086 18 8.56957 17.7893 8.41421 17.4142C8.25885 17.0391 8.46957 16.5304 9 16C9.53043 15.4696 10.0391 15.2589 10.4142 15.4142C10.7893 15.5696 11 15.9609 11 16.5V20"
							stroke="#ADAAAA"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<input type="text" placeholder="Confirm Password" />
				</div>

				<button type="submit">Sign Up</button>
			</form>
		{/if}
	{/if}
	<div class="form-link-bottom">
		Already have an account? <a href="/login" class="text-primary">Login</a>
	</div>
</div>

<style>
	.btn {
		margin-top: 1rem;
		width: 100%;
		border-radius: 0%;
		text-transform: capitalize;
		font-size: 1rem;
		color: var(--color-primary);
	}

	.btn-secondary {
		background-color: var(--color-secondary);
	}

	.form-link-bottom {
		margin-top: 1rem;
		text-align: center;
	}

	.form-link-bottom a {
		color: var(--color-secondary);
	}
</style>
