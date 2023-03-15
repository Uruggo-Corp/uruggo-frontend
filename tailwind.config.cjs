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
	plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
	daisyui: {
		themes: [
			{
				uruggoTheme: {
					primary: '#06111F',
					secondary: '#9BA809',
					accent: '#37CDBE',
					neutral: '#06111F',
					'base-100': '#FFFFFF',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#dc2626'
				}
			}
		]
	}
};
