<script lang="ts">
	import Business from './Business.svelte';
	import Call from './Call.svelte';
	import Eye from './Eye.svelte';
	import EyeSlash from './EyeSlash.svelte';
	import Home from './Home.svelte';
	import Lock from './Lock.svelte';
	import Sms from './Sms.svelte';
	import UserSquare from './UserSquare.svelte';
	import UserSquareGreen from './UserSquareGreen.svelte';

	import { regStep1Schema, regStep2AgentSchema, regStep2UsersSchema } from './schema';
	import { z } from 'zod';
	import { createUser, uploadImage } from './logic';
	import { AxiosError } from 'axios';
	import toast from 'svelte-french-toast';

	// Keep track of the current step
	// let step = 1; //TODO: uncomment this
	let step = 3; // TODO: remove this

	// Keep track of the user type
	// let userType = ''; // TODO: uncomment this
	let userType = 'agent'; //TODO: remove this

	let loading = false;

	let passwordVisible = false;
	const togglePasswordVisibility = () => (passwordVisible = !passwordVisible);

	let errors: any = {};
	let data: any = {};

	const nextStep = () => {
		errors = {};
		if (step === 1) {
			step = 2;
		} else if (step === 2) {
			try {
				regStep1Schema.parse(data);
				step = 3;
			} catch (err) {
				if (err instanceof z.ZodError) {
					errors = err.flatten().fieldErrors;
				}
			}
		} else if (step === 3) {
			step = 4;
		}
	};

	const register = async () => {
		loading = true;
		errors = {};
		try {
			regStep2UsersSchema.parse(data);
			await createUser(data);
			nextStep();
		} catch (err) {
			if (err instanceof z.ZodError) {
				errors = err.flatten().fieldErrors;
			}
			if (err instanceof AxiosError) {
				toast.error(
					err.response?.data.message || 'Ooops something went wrong, please try again later!',
					{
						position: 'bottom-right'
					}
				);
			}
		} finally {
			loading = false;
		}
	};

	const registerAgent = async () => {
		loading = true;
		errors = {};
		try {
			regStep2AgentSchema.parse(data);
			console.log('registering agent user');
			// nextStep(); TODO: uncomment this
		} catch (err) {
			if (err instanceof z.ZodError) {
				errors = err.flatten().fieldErrors;
			}
		} finally {
			loading = false;
		}
	};

	const upload = async (path: 'idFront' | 'idBack') => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.onchange = async (e) => {
			if (e.target instanceof HTMLInputElement && e.target.files?.length) {
				const file = e.target.files[0];
				const blob = new Blob([file], { type: file.type });
				const url = await uploadImage(blob, file.name);
				data[path] = {
					name: file.name,
					url
				};
			}
		};
		input.click();
	};
</script>

<svelte:head>
	<title>Register - Uruggo</title>
</svelte:head>

<div class="w-full max-w-[450px] mx-auto px-5 space-y-5">
	<div class="form-header flex flex-col">
		<h2 class="text-3xl font-primary ">
			{#if step === 4}Confirmation code{:else}Create an account{/if}
		</h2>
		<progress
			class="progress progress-secondary w-56 transition-all"
			value={step === 1 ? '25' : step === 2 ? '50' : step === 3 ? '75' : '100'}
			max="100"
		/>
	</div>
	{#if step === 1}
		<div class="space-y-5 pt-10">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
				<button
					on:click={() => (userType = 'normal')}
					class="border py-10 px-3 bg-[#FCFCFC] max-w-[180px] mx-auto  hover:scale-90 transition-transform flex flex-col items-center justify-center space-y-5"
					class:border-secondary={userType == 'normal'}
					class:text-secondary={userType == 'normal'}
				>
					<UserSquareGreen />

					<p class="text-center">I’m looking for an apartment /roomate</p>
				</button>
				<button
					on:click={() => (userType = 'agent')}
					class="border py-10 px-3 bg-[#FCFCFC] max-w-[180px] mx-auto hover:scale-90 transition-transform flex flex-col items-center justify-center space-y-5"
					class:border-secondary={userType == 'agent'}
					class:text-secondary={userType == 'agent'}
				>
					<UserSquareGreen />
					<p class="text-center">I’m a property agent/Landlord</p>
				</button>
			</div>
			<button class="btn btn-secondary" disabled={userType.length < 1} on:click={nextStep}
				>Next</button
			>
		</div>
	{/if}

	{#if step === 2}
		<form class="form">
			<div class="form-control">
				<UserSquare />

				<input
					type="text"
					bind:value={data.firstName}
					placeholder="First Name"
					class="form-input"
				/>
			</div>

			{#if errors.firstName}
				{#each errors.firstName as error}
					<p class="text-red-500 text-xs mt-1">{error}</p>
				{/each}
			{/if}

			<div class="form-control">
				<UserSquare />

				<input type="text" bind:value={data.lastName} placeholder="Last Name" class="form-input" />
			</div>

			{#if errors.lastName}
				{#each errors.lastName as error}
					<p class="text-red-500 text-xs mt-1">{error}</p>
				{/each}
			{/if}

			<div class="form-control">
				<Sms />
				<input type="email" bind:value={data.email} placeholder="Email" class="form-input" />
			</div>

			{#if errors.email}
				{#each errors.email as error}
					<p class="text-red-500 text-xs mt-1">{error}</p>
				{/each}
			{/if}

			<div class="form-control">
				<Call />

				<input
					type="text"
					bind:value={data.phoneNumber}
					placeholder="Phone Number"
					class="form-input"
				/>
			</div>

			{#if errors.phoneNumber}
				{#each errors.phoneNumber as error}
					<p class="text-red-500 text-xs mt-1">{error}</p>
				{/each}
			{/if}

			<button on:click={nextStep} type="button" class="btn btn-secondary">Next</button>
		</form>
	{/if}

	{#if step === 3}
		<form class="form">
			<div class="form-control">
				<Lock />
				<input
					type={!passwordVisible ? 'password' : 'text'}
					placeholder="Password"
					class="form-input"
					value={data.password || ''}
					on:input={(e) => (data.password = e.target?.value)}
				/>
				<button on:click={togglePasswordVisibility}>
					{#if !passwordVisible}
						<EyeSlash />
					{:else}
						<Eye />
					{/if}
				</button>
			</div>

			{#if errors.password}
				{#each errors.password as error}
					<p class="text-red-500 text-xs mt-1">{error}</p>
				{/each}
			{/if}

			<div class="form-control">
				<Lock />
				<input
					type={!passwordVisible ? 'password' : 'text'}
					placeholder="Confirm password"
					class="form-input"
					on:input={(e) => (data.confirmPassword = e.target?.value)}
					value={data.confirmPassword || ''}
				/>
				<button on:click={togglePasswordVisibility}>
					{#if !passwordVisible}
						<EyeSlash />
					{:else}
						<Eye />
					{/if}
				</button>
			</div>

			{#if errors.confirmPassword}
				{#each errors.confirmPassword as error}
					<p class="text-red-500 text-xs mt-1">{error}</p>
				{/each}
			{/if}
			{#if userType === 'normal'}
				<button on:click={register} type="button" class="btn btn-secondary">
					{#if loading}<iconify-icon icon="eos-icons:bubble-loading" width="24" />
					{:else}
						Create Account{/if}
				</button>
			{:else if userType === 'agent'}
				<div class="form-control">
					<Home />

					<input type="text" bind:value={data.address} placeholder="Address" class="form-input" />
				</div>

				{#if errors.address}
					{#each errors.address as error}
						<p class="text-red-500 text-xs mt-1">{error}</p>
					{/each}
				{/if}

				<div class="form-control">
					<Business />

					<input
						type="text"
						bind:value={data.businessName}
						placeholder="Business name"
						class="form-input"
					/>
				</div>

				{#if errors.businessName}
					{#each errors.businessName as error}
						<p class="text-red-500 text-xs mt-1">{error}</p>
					{/each}
				{/if}

				<div class="w-full text-sm bg-[#FCFCFC] p-5 text-[#B4B4B0] mt-[1rem]">
					<p>Kindly upload needed document, so your identity can be verified.</p>

					<div class="flex mt-3 justify-between ">
						<div class="flex items-center">
							<p>ID card front</p>
							<button class="file-button line-clamp-1 ma" on:click={() => upload('idFront')}>
								{#if data.idFront}
									{data.idFront.name}
								{:else}
									Upload
								{/if}
							</button>
						</div>
						<div class="flex items-center">
							<p>ID card back</p>
							<button class="file-button line-clamp-1 ma" on:click={() => upload('idBack')}>
								{#if data.idBack}
									{data.idBack.name.length < 10
										? data.idBack.name
										: `${data.idBack.name.substr(0, 10)}...`}
								{:else}
									Upload
								{/if}
							</button>
						</div>
					</div>
				</div>

				<button on:click={registerAgent} type="button" class="btn btn-secondary">
					{#if loading}<iconify-icon icon="eos-icons:bubble-loading" width="24" />
					{:else}Create Account{/if}
				</button>
			{/if}
		</form>
	{/if}

	<div class="form-link-bottom">
		Have an account? <a href="/login" class="text-primary">Login</a>
	</div>
</div>

<style>
	.form-control {
		border: 1px solid #b4b4b0;
		display: flex;
		align-items: center;
		flex-direction: row;
		width: 100%;
		margin-top: 1rem;
		background-color: #fcfcfc;
	}

	.form-input {
		width: 100%;
		border: none;
		height: 100%;
		padding: 1rem;
	}

	.form-input::placeholder {
		color: #b4b4b0;
	}

	.form-input:focus {
		outline: none;
	}

	.btn {
		margin-top: 1rem;
		width: 100%;
		border-radius: 0%;
		text-transform: capitalize;
		font-size: 1rem;
		color: var(--color-primary);
	}

	.btn:disabled {
		background-color: #b4b4b0;
	}

	.btn-secondary {
		background-color: var(--color-secondary);
	}

	.btn:hover {
		transform: scale(0.9);
	}

	.form-link-bottom {
		margin-top: 1rem;
		text-align: center;
	}

	.form-link-bottom a {
		color: var(--color-secondary);
	}

	.file-button {
		margin: 0 0.5rem;
		border: 1px solid #b4b4b0;
		padding: 0.5rem;
	}
</style>
