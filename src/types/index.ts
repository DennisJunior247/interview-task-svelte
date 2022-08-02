export type countryType = {
	name: string;
	code: string;
	emoji: string;
	currency: string;
};

export type countriesTypeData = {
	countries: countryType[];
};

export type stateType = {
	value: string;
	label: string;
	currency: string;
}[];
