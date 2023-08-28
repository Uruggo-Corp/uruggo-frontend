<script lang="ts">
	import { currentUser } from '$lib/stores/users';

	let loading = false;

	let user = $currentUser || {
		first_name: '',
		last_name: '',
		phone_number: '',
		address: '',
		avatar: ''
	};
</script>

<svelte:head>
	<title>Profile - Uruggo</title>
</svelte:head>

<h2 class="text-3xl text-dark font-serif mb-10">Profile</h2>

<form class="grid grid-cols-1 md:grid-cols-2 gap-5" action="" method="post">
	<div class="form-section">
		<input
			type="text"
			placeholder="First name"
			name="firstName"
			bind:value={user.first_name}
			class="form-control"
		/>
	</div>
	<div class="form-section">
		<input
			type="text"
			placeholder="Last name"
			name="lastName"
			bind:value={user.last_name}
			class="form-control"
		/>
	</div>
	<div class="form-section">
		<input
			type="text"
			placeholder="Phone number"
			name="phoneNumber"
			bind:value={user.phone_number}
			class="form-control"
		/>
	</div>
	<div class="form-section">
		<input
			type="text"
			placeholder="Address"
			name="address"
			bind:value={user.address}
			class="form-control"
		/>
	</div>
	<div class="form-section col-span-2">
		<button class="button button--primary w-full">Save</button>
	</div>
</form>

<style>
</style>
