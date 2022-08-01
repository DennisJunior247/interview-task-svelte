import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

};

export default config;

// optimizeDeps: {
// 	exclude: ['@apollo/client']
// },
// ssr: {
// 	noExternal: ['@apollo/client']
// }
