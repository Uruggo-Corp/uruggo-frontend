<div class="w-full max-w-[450px] mx-auto px-5">
	<h2 class="text-3xl font-primary text-center md:text-left">Welcome back</h2>
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
					d="M18.1404 21.62C17.2604 21.88 16.2204 22 15.0004 22H9.00035C7.78035 22 6.74035 21.88 5.86035 21.62C6.08035 19.02 8.75035 16.97 12.0004 16.97C15.2504 16.97 17.9204 19.02 18.1404 21.62Z"
					stroke="#B4B4B0"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M15 2H9C4 2 2 4 2 9V15C2 18.78 3.14 20.85 5.86 21.62C6.08 19.02 8.75 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62C20.86 20.85 22 18.78 22 15V9C22 4 20 2 15 2ZM12 14.17C10.02 14.17 8.42 12.56 8.42 10.58C8.42 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58C15.58 12.56 13.98 14.17 12 14.17Z"
					stroke="#B4B4B0"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M15.5799 10.58C15.5799 12.56 13.9799 14.17 11.9999 14.17C10.0199 14.17 8.41992 12.56 8.41992 10.58C8.41992 8.60002 10.0199 7 11.9999 7C13.9799 7 15.5799 8.60002 15.5799 10.58Z"
					stroke="#B4B4B0"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<input class="form-input" type="email" placeholder="E-mail" />
		</div>

		<div class="form-control">
			<svg
				width="24"
				height="25"
				viewBox="0 0 24 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6 10.5V8.5C6 5.19 7 2.5 12 2.5C17 2.5 18 5.19 18 8.5V10.5"
					stroke="#ADAAAA"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M12 19C13.3807 19 14.5 17.8807 14.5 16.5C14.5 15.1193 13.3807 14 12 14C10.6193 14 9.5 15.1193 9.5 16.5C9.5 17.8807 10.6193 19 12 19Z"
					stroke="#ADAAAA"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M17 22.5H7C3 22.5 2 21.5 2 17.5V15.5C2 11.5 3 10.5 7 10.5H17C21 10.5 22 11.5 22 15.5V17.5C22 21.5 21 22.5 17 22.5Z"
					stroke="#ADAAAA"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<input type="password" placeholder="Password" class="form-input" />
		</div>

		<div class="form-link">
			<a href="/forgot-password" class="text-primary">Forgot password?</a>
		</div>

		<button class="btn btn-secondary">Login</button>

		<div class="form-link-bottom">
			Don't have an account? <a href="/register" class="text-primary">Register</a>
		</div>
	</form>
</div>

<style>
	.form-control {
		border: 1px solid #b4b4b0;
		display: flex;
		align-items: center;
		flex-direction: row;
		width: 100%;
		margin-top: 1rem;
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

	.form-control svg {
		width: 2rem;
		height: 2rem;
		margin: 0 1rem;
	}

	.form-input:focus {
		outline: none;
	}

	.form-link {
		margin-top: 1rem;
		text-align: right;
	}

	.btn {
		margin-top: 1rem;
		width: 100%;
		border-radius: 0%;
		text-transform: capitalize;
		font-size: 1rem;
		color: var(--color-primary);
	}

	.btn:hover {
		transform: scale(0.9);
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
