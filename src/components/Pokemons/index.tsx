import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filteredPokemonsSelector,
  getSearchPokemonsAction,
  loadingSelector,
  offsetSelector,
  pokemonsSelector,
  setOffsetAction,
} from "../../store/pokemonsReducer";
import { fetchPokemons } from "../../store/asyncActions/pokemons";
import { IPokemons } from "../../types/pokemonsType";
import { stripValue } from "../../utils";
import { Button, Input, Skeleton } from "antd";
import s from "./Pokemons.module.scss";
import { Pokemon } from "./Pokemon";

export const Pokemons = () => {
  const [searchPokemonValue, setSearchPokemonValue] = useState<string>("");

  const pokemonsList: IPokemons[] = useSelector(pokemonsSelector);
  const filteredPokemonsList: IPokemons[] = useSelector(
    filteredPokemonsSelector
  );
  const offset: number = useSelector(offsetSelector);
  const loading: boolean = useSelector(loadingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOffsetAction(offset));
    dispatch(fetchPokemons(offset));
  }, [offset]);

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = stripValue(e.target.value);
    setSearchPokemonValue(trimmedValue);
    dispatch(getSearchPokemonsAction(trimmedValue));
  };

  const incrementPage = () => {
    dispatch(setOffsetAction(offset + 20));
  };
  const decrementPage = () => {
    if (offset <= 0) return;
    dispatch(setOffsetAction(offset - 20));
  };

  const renderPokemon = (pokemons: IPokemons[]) => {
    const sorting = (a: IPokemons, b: IPokemons) => {
      if (!a.pokemonTypes || !b.pokemonTypes) return 0;
      return a.pokemonTypes.length - b.pokemonTypes.length;
    };
    return pokemons.sort(sorting).map((item: IPokemons) => {
      return <Pokemon key={item.name} name={item.name} />;
    });
  };

  const pagination = () => {
    return (
      <div>
        <Button disabled={offset / 20 === 0} onClick={() => decrementPage()}>
          prev
        </Button>
        <span className={s.pageNumber}>{offset / 20 + 1}</span>
        <Button onClick={() => incrementPage()}>next</Button>
      </div>
    );
  };
  const showFiltered = searchPokemonValue !== "";
  const pokemonsToShow = showFiltered ? filteredPokemonsList : pokemonsList;

  return (
    <div className={s.wrapperListPokemons}>
      <Input type="text" onChange={(e) => handlerChange(e)} />
      <div className={s.listPokemons}>
        {loading ? <Skeleton active /> : renderPokemon(pokemonsToShow)}
      </div>
      {pagination()}
    </div>
  );
};
