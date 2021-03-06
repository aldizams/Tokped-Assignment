import { gql } from '@apollo/client';

export const GET_POKEMONLIST = gql`
	query pokemons($limit: Int, $offset: Int) {
		pokemons(limit: $limit, offset: $offset) {
			count
			next
			previous
			nextOffset
			prevOffset
			status
			message
			results {
				id
				url
				name
				image
				artwork
			}
		}
	}
`;
export const GET_POKEMON = gql`
	query pokemon($name: String!) {
		pokemon(name: $name) {
			id
			name
			sprites {
				front_default
			}
			moves {
				move {
					name
				}
			}
			types {
				type {
					name
				}
			}
		}
	}
`;
