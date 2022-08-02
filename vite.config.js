import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()]
};

export default config;

// ssr: {
// 	noExternal: ['@apollo/client']
// }

// optimizeDeps: {
// 	exclude: ['@apollo/client']
// }
