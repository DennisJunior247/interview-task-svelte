<script contex>
	import '../app.css';

	import { ApolloClient, InMemoryCache } from '@apollo/client/core/core.cjs';
	import { setClient } from 'svelte-apollo';

	// const httpLink = new HttpLink({
	// 	uri: 'https://countries.trevorblades.com/'
	// });

	const cache = new InMemoryCache();

	const client = new ApolloClient({
		cache: cache,
		uri: 'https://countries.trevorblades.com/'
	});

	setClient(client);
</script>

<slot />
