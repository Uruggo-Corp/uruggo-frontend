/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#06111F',
				secondary: '#9BA809',
				light: '#C4DCFA'
			},
			fontFamily: {
				primary: ['"Caudex"', 'serif']
			}
		}
	},
	plugins: []
};
