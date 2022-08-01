import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	optimizeDeps: {
		include: ['@apollo/client/core'],
		exclude: ['@apollo/client']
	},
	ssr: {
		noExternal: ['@apollo/client']
	}
};

export default config;
