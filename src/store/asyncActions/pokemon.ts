import { Dispatch } from "react";
import { AnyAction } from "redux";
import axios from "axios";
import { getPokemonAction } from "../pokemonsReducer";
import { IPokemon } from "../../types/pokemonType";

export const fetchPokemon = (name: string): any => {
  const controller = new AbortController();
  const signal = controller.signal;

  return (dispatch: Dispatch<AnyAction>) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}/`, { signal })
      .then((res) => res.data)
      .then((data) => {
        dispatch(getPokemonAction(data));
      });

    return () => {
      controller.abort();
    };
  };
};

export const getPokemon = async (name: string): Promise<IPokemon> => {
  return await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then((res) => res.data);
};
