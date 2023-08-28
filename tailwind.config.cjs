/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				dark: '#06111F',
				light: '#FCFCFC',
				primary: '#9BA809',
				'primary-hover': '#8c9902'
				// text: '#666565'
			},
			fontFamily: {
				serif: ['Caudex', 'serif'],
				primary: ['DM Sans', 'sans-serif']
			}
		}
	},

	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['[data-theme=light]'],
					primary: '#9BA809',
					'primary-focus': '#8c9902'
				}
			}
		]
	}
};

module.exports = config;
