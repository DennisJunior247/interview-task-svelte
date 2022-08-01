<script lang="ts">
	import Select from 'svelte-select';
	import { query, getClient } from 'svelte-apollo';
	import { gql } from '@apollo/client/core';
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();

	const LIST_COUNTRIES = gql`
		{
			countries {
				name
				code
				currency
				emoji
			}
		}
	`;

	interface countryType {
		name: string;
		code: string;
		emoji: string;
		currency: string;
	}

	interface countriesTypeData {
		countries: countryType[];
	}

	const countries = query<countriesTypeData>(LIST_COUNTRIES);

	console.log($countries);
	let state: any;

	const items = [
		{ value: 'United Kingdom', label: '🇬🇧 United Kingdom', currency: 'GBP', exChangeRate: 0.82 },
		{ value: 'Canada', label: '🇨🇦 Canada', currency: 'CAD', exChangeRate: 1.28 },
		{ value: 'Nigeria', label: '🇳🇬 Nigeria', currency: 'NGN', exChangeRate: 415.87 },
		{ value: 'South Africa', label: '🇿🇦 South Africa', currency: 'ZAR', exChangeRate: 16.59 },
		{ value: 'China', label: '🇨🇳 China', currency: 'CNY', exChangeRate: 6.74 }
	];

	let selectedCountry: { value: string; label: string; currency: string; exChangeRate: string };

	function handleSelect(event: CustomEvent) {
		selectedCountry = event.detail;
		dispatch('handle-select', selectedCountry);
	}

	function handleClear() {
		selectedCountry;
	}
</script>

<!-- {#await $countries}
	Loading..
{:then result}
	{console.log(result, 'res')}
	{(state = result?.data)}
	<div>
		{#if result && result.data}
			{#each result.data.countries as country (country?.code)}
				<h1>
					{country?.name}
				</h1>
			{/each}
		{/if}
	</div>
{:catch error}
	<p class="error">{error}</p>
{/await} -->

<div>
	<label class="text-xs text-[#dcdbe1]" for="food">Select your Country </label>
	<div class="w-96">
		<Select
			showChevron={true}
			id="food"
			placeholder="Select"
			{items}
			on:select={handleSelect}
			on:clear={handleClear}
		/>
	</div>
</div>
