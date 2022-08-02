<script lang="ts">
	import Select from 'svelte-select';

	import { createEventDispatcher, beforeUpdate } from 'svelte';
	import type { countryType, stateType } from 'src/types';

	export let countriesData: countryType[] | undefined = [];

	let dispatch = createEventDispatcher();

	let state: stateType | undefined = [];
	let selectedCountry: stateType;

	beforeUpdate(() => {
		//filtering country data //
		const res = countriesData
			?.filter((res) => {
				return (
					res?.name === 'United Kingdom' ||
					res?.name === 'Canada' ||
					res?.name === 'Nigeria' ||
					res?.name === 'South Africa' ||
					res?.name === 'China'
				);
			})
			.map((items) => {
				return {
					value: items?.name,
					label: `${items?.emoji} ${items?.name}`,
					currency: items?.currency
				};
			});

		state = res;
	});

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
			items={state}
			on:select={handleSelect}
			on:clear={handleClear}
		/>
	</div>
</div>
