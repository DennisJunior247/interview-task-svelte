import { gql } from '@apollo/client/core/index';

export const LIST_COUNTRIES = gql`
	{
		countries {
			name
			code
			currency
			emoji
		}
	}
`;
