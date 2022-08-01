import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	optimizeDeps: {
		exclude: ['@apollo/client']
	}
};

export default config;
