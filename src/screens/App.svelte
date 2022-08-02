<script lang="ts">
	import { onMount } from 'svelte';
	import { query } from 'svelte-apollo';

	import { LIST_COUNTRIES } from '../gql/index';
	import type { countriesTypeData } from '../types';

	import Card from '../components/Card.svelte';
	import SelectInput from '../components/SelectInput.svelte';

	const countries = query<countriesTypeData>(LIST_COUNTRIES);

	// Btcusdt state //
	let BtcUsdtTradeData: [string, number] = ['loading...', -0];
	let BtcUsdtTickerData: number[] = [0, 0];

	// Ethusdt state//
	let EthUsdtTradeData: [string, number] = ['loading...', 0];
	let EthUsdtTickerData: number[] = [0, 0];

	// AdaUsdt state//
	let AdaUsdtTradeData: [string, number] = ['loading...', 0];
	let AdaUsdtTickerData: number[] = [0, 0];

	let selectedCountry = 'USD';
	let exChangeRate: number = 1;

	// selected country currency value //
	$: btcusdt = +BtcUsdtTradeData[1];
	$: ethusdt = +EthUsdtTradeData[1];
	$: adausdt = +AdaUsdtTradeData[1];

	// tailwind conditional style check for asset percentage//
	$: BtcUsdtPercentageStyle = BtcUsdtTickerData[0].toString().startsWith('-')
		? 'text-[red]'
		: 'text-[#90e9cd]';

	$: EthUsdtPercentageStyle = EthUsdtTickerData[0].toString().startsWith('-')
		? 'text-[red]'
		: 'text-[#90e9cd]';

	$: AdaUsdtPercentageStyle = AdaUsdtTickerData[0].toString().startsWith('-')
		? 'text-[red]'
		: 'text-[#90e9cd]';

	onMount(() => {
		// WebSocket BtcUsdt connection with binance api //
		let wsBtcUsdtTrade = new window.WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
		let wsBtcUsdtTicker = new window.WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

		// WebSocket EthUsdt connection with binance api  //
		let wsEthUsdtTrade = new window.WebSocket('wss://stream.binance.com:9443/ws/ethusdt@trade');
		let wsEthUsdtTicker = new window.WebSocket('wss://stream.binance.com:9443/ws/ethusdt@ticker');

		// WebSocket EthUsdt connection with binance api  //
		let wsAdaUsdtTrade = new window.WebSocket('wss://stream.binance.com:9443/ws/adausdt@trade');
		let wsAdaUsdtTicker = new window.WebSocket('wss://stream.binance.com:9443/ws/adausdt@ticker');

		// BtcUsdt WebSocket data for price, vol and percentage //
		wsBtcUsdtTrade.onmessage = (event: MessageEvent) => {
			const tradeData = JSON.parse(event?.data);
			BtcUsdtTradeData = [tradeData?.s, +tradeData?.p];
		};
		wsBtcUsdtTicker.onmessage = (event: MessageEvent) => {
			const tickerData = JSON.parse(event?.data);
			BtcUsdtTickerData = [+tickerData?.P, +tickerData?.v];
		};

		// EthUsdt WebSocket data for price, vol and percentage //
		wsEthUsdtTrade.onmessage = (event: MessageEvent) => {
			const tradeData = JSON.parse(event?.data);
			EthUsdtTradeData = [tradeData?.s, +tradeData?.p];
		};
		wsEthUsdtTicker.onmessage = (event: MessageEvent) => {
			const tickerData = JSON.parse(event?.data);
			EthUsdtTickerData = [+tickerData?.P, +tickerData?.v];
		};

		// AdaUsdt WebSocket data for price, vol and percentage //
		wsAdaUsdtTrade.onmessage = (event: MessageEvent) => {
			const tradeData = JSON.parse(event?.data);
			AdaUsdtTradeData = [tradeData?.s, +tradeData?.p];
		};
		wsAdaUsdtTicker.onmessage = (event: MessageEvent) => {
			const tickerData = JSON.parse(event?.data);
			AdaUsdtTickerData = [+tickerData?.P, +tickerData?.v];
		};
	});

	const handleSelect = (e: CustomEvent) => {
		selectedCountry = e.detail?.currency;
		switch (selectedCountry) {
			case 'GBP':
				exChangeRate = 0.82;
				break;
			case 'CAD':
				exChangeRate = 1.28;
				break;
			case 'NGN':
				exChangeRate = 415.87;
				break;
			case 'ZAR':
				exChangeRate = 16.59;
				break;
			case 'CNY':
				exChangeRate = 6.74;
				break;
			default:
				exChangeRate = 1;
				break;
		}
	};

	const handleConvert = () => {
		btcusdt = +BtcUsdtTradeData[1] * exChangeRate;
		ethusdt = +EthUsdtTradeData[1] * exChangeRate;
		adausdt = +AdaUsdtTradeData[1] * exChangeRate;
	};

	$: btcusdt, adausdt, ethusdt && handleConvert();
</script>

{#await $countries}
	Loading..
{:then result}
	<main class="w-full h-screen flex justify-center items-center ">
		<div
			class="bg-white w-9/12	h-5/6 rounded-lg shadow-xl flex flex-col justify-center items-center p-10"
		>
			<SelectInput countriesData={result?.data?.countries} on:handle-select={handleSelect} />
			<div class="flex flex-col">
				<div class="flex gap-6 mt-8">
					<Card>
						<div class="flex justify-between w-full">
							<span class="text-[#8a8799]">{BtcUsdtTradeData[0]}</span>
							<span class={BtcUsdtPercentageStyle}>
								{BtcUsdtTickerData[0]?.toFixed(2) + '%'}
							</span>
						</div>
						<span class="text-[#31315e] text-xl font-bold">
							{BtcUsdtTradeData[1]?.toFixed(2)}
						</span>
						<span class="text-[#57547a] font-bold text-sm">
							Volume: {BtcUsdtTickerData[1]?.toFixed(2)}
						</span>
					</Card>
					<Card>
						<div class="flex justify-between w-full">
							<span class="text-[#8a8799]">{EthUsdtTradeData[0]}</span>
							<span class={EthUsdtPercentageStyle}>
								{EthUsdtTickerData[0]?.toFixed(2) + '%'}
							</span>
						</div>
						<span class="text-[#31315e] text-xl font-bold">
							{EthUsdtTradeData[1]?.toFixed(2)}
						</span>
						<span class="text-[#57547a] font-bold text-sm">
							Volume: {EthUsdtTickerData[1]?.toFixed(2)}
						</span>
					</Card>
					<Card>
						<div class="flex justify-between w-full">
							<span class="text-[#8a8799]">{AdaUsdtTradeData[0]}</span>
							<span class={AdaUsdtPercentageStyle}>
								{AdaUsdtTickerData[0]?.toFixed(2) + '%'}
							</span>
						</div>
						<span class="text-[#31315e] text-xl font-bold">
							{AdaUsdtTradeData[1]?.toFixed(2)}
						</span>
						<span class="text-[#57547a] font-bold text-sm">
							Volume: {AdaUsdtTickerData[1]?.toFixed(2)}
						</span>
					</Card>
				</div>
				<div class="flex gap-6 mt-4">
					<span class="w-60 text-[#515173] font-bold p-2"
						>{selectedCountry}:{btcusdt?.toFixed(2)}
					</span>
					<span class="w-60 text-[#515173] font-bold p-2"
						>{selectedCountry}:{ethusdt?.toFixed(2)}
					</span>
					<span class="w-60 text-[#515173] font-bold p-2"
						>{selectedCountry}:{adausdt?.toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	</main>
{:catch error}
	<p class="error">{error}</p>
{/await}
