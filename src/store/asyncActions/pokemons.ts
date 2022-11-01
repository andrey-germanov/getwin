import { Dispatch } from "react";
import { AnyAction } from "redux";
import { getPokemonsAction, loadingAction } from "../pokemonsReducer";
import axios from "axios";

export const fetchPokemons = (offset = 0): any => {
  const controller = new AbortController();
  const signal = controller.signal;

  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(loadingAction(true));
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=0&offset=${offset}`, {
        signal,
      })
      .then((res) => res.data)
      .then((json) => {
        dispatch(loadingAction(false));
        dispatch(getPokemonsAction(json.results));
      });

    return () => {
      controller.abort();
    };
  };
};
