import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
		adapter: adapter()
	},
	vite: {
		resolve: {
			alias: {
				'svelte-apollo': '/node_modules/svelte-apollo/dist/svelte-apollo.es.js'
			}
		},
		optimizeDeps: {
			exclude: ['@apollo/client']
		},
		ssr: {
			noExternal: ['@apollo/client']
		}
	}
};

export default config;
