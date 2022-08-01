import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	resolve: {
		alias: {
			'svelte-apollo': '/node_modules/svelte-apollo/dist/svelte-apollo.es.js'
		}
	}
};

export default config;
