<script contex>
	import '../app.css';

	import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
	import { setClient } from 'svelte-apollo';
	// import { ApolloClient, InMemoryCache, HttpLink, } from 'apollo-boost';

	const httpLink = new HttpLink({
		uri: 'https://countries.trevorblades.com/'
	});
	const cache = new InMemoryCache();

	const client = new ApolloClient({
		cache: cache,
		link: httpLink
	});

	setClient(client);
</script>

<slot />
