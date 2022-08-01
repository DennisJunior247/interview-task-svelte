import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	vite: {
		resolve: {
			alias: {
				'svelte-apollo': '/node_modules/svelte-apollo/dist/svelte-apollo.es.js'
			}
		}
	},
	optimizeDeps: {
		include: ['@apollo/client/core'],
		exclude: ['@apollo/client', 'svelte-apollo']
	},
	ssr: {
		noExternal: ['@apollo/client']
	}
};

export default config;
