<script lang="ts">
	import Select from 'svelte-select';
	import { query } from 'svelte-apollo';
	import { gql } from 'apollo-boost';
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

	const countries = query(LIST_COUNTRIES);

	console.log($countries);

	const items = [
		{ value: 'United Kingdom', label: '🇬🇧 United Kingdom', currency: 'GBP' },
		{ value: 'Canada', label: '🇨🇦 Canada', currency: 'CAD' },
		{ value: 'Nigeria', label: '🇳🇬 Nigeria', currency: 'NGN' },
		{ value: 'South Africa', label: '🇿🇦 South Africa', currency: 'ZAR' },
		{ value: 'China', label: '🇨🇳 China', currency: 'CNY' }
	];

	let selectedCountry: { value: string; label: string; currency: string };

	function handleSelect(event: CustomEvent) {
		selectedCountry = event.detail;
		dispatch('handle-select', selectedCountry);
	}

	function handleClear() {
		selectedCountry;
	}
</script>

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
