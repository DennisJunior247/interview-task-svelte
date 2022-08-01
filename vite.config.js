import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()]
};

export default config;

// resolve: {
// 	alias: {
// 		'svelte-apollo': '/node_modules/svelte-apollo/dist/svelte-apollo.es.js'
// 	}
// },
// optimizeDeps: {
// 	exclude: ['@apollo/client']
// },
// ssr: {
// 	noExternal: ['@apollo/client']
// }
