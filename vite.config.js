import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	optimizeDeps: {
		include: ['@apollo/client/core'],
		exclude: ['@apollo/client']
	},
	resolve: {
		alias: {
			'svelte-apollo': '/node_modules/svelte-apollo/dist/svelte-apollo.es.js'
		}
	}
};

export default config;
