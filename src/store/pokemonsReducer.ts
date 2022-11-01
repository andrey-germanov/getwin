import { RootState } from ".";
import { IPokemons } from "../types/pokemonsType";
import { IPokemon, Type } from "../types/pokemonType";

export interface IStore {
  pokemons: IPokemons[];
  pokemon: IPokemon | null;
  filteredPokemons: IPokemons[];
  offset: number;
  loading: boolean;
}
const defaultState: IStore = {
  pokemons: [],
  pokemon: null,
  filteredPokemons: [],
  offset: 0,
  loading: false,
};

export interface action {
  type: string;
  pokemons: IPokemons[];
  pokemon: IPokemon;
  searchPokemons: string;
  offset: number;
  loading: boolean;
  pokemonName: string;
  pokemonTypes: Type[];
}

const GET_POKEMONS = "GET_POKEMONS";
const SEARCH_POKEMONS = "SEARCH_POKEMONS";
const SET_OFFSET = "SET_OFFSET";
const GET_POKEMON = "GET_POKEMON";
const LOADING = "LOADING";
const UPDATE_POKEMON = "UPDATE_POKEMON";

export const pokemonsReducer = (
  state = defaultState,
  action: action
): IStore => {
  switch (action.type) {
    case SEARCH_POKEMONS:
      return {
        ...state,
        filteredPokemons: state.pokemons.filter((pokemon: IPokemons) =>
          pokemon.name.includes(action.searchPokemons)
        ),
      };
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.pokemons,
        filteredPokemons: action.pokemons,
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.offset,
      };
    case GET_POKEMON:
      return {
        ...state,
        pokemon: action.pokemon,
      };
    case UPDATE_POKEMON:
      return {
        ...state,
        pokemons: state.pokemons.map((pokemon: IPokemons) => {
          const { pokemonTypes } = action;
          if (pokemon.name === action.pokemonName)
            return { ...pokemon, pokemonTypes };
          return pokemon;
        }),
        // WARNING: Posibly need to update filtered pokemons
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

// Dispatch actions

export const getPokemonsAction = (pokemons: IPokemons[]) => ({
  type: GET_POKEMONS,
  pokemons,
});

export const updatePokemonAction = (
  pokemonTypes: Type[],
  pokemonName: string
) => ({
  type: UPDATE_POKEMON,
  pokemonTypes,
  pokemonName,
});

export const getSearchPokemonsAction = (searchPokemons: string) => ({
  type: SEARCH_POKEMONS,
  searchPokemons,
});

export const setOffsetAction = (offset: number) => ({
  type: SET_OFFSET,
  offset,
});

export const getPokemonAction = (pokemon: IPokemon) => ({
  type: GET_POKEMON,
  pokemon,
});

export const loadingAction = (loading: boolean) => ({
  type: LOADING,
  loading,
});

// Selectors

export const pokemonsSelector = (state: RootState): IPokemons[] =>
  state.pokemonsReducer.pokemons;

export const pokemonSelector = (state: RootState): IPokemon | null =>
  state.pokemonsReducer.pokemon;

export const offsetSelector = (state: RootState): number =>
  state.pokemonsReducer.offset;

export const filteredPokemonsSelector = (state: RootState): IPokemons[] =>
  state.pokemonsReducer.filteredPokemons;

export const loadingSelector = (state: RootState): boolean =>
  state.pokemonsReducer.loading;
