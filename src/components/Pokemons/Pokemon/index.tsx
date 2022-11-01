import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../../store/asyncActions/pokemon";
import { IPokemon } from "../../../types/pokemonType";
import { useEffect } from "react";
import {
  loadingSelector,
  updatePokemonAction,
} from "../../../store/pokemonsReducer";
import { Tag, Skeleton } from "antd";
import stc from "string-to-color";
import { Link } from "react-router-dom";
import s from "../Pokemons.module.scss";

interface IPokemonProps {
  name: string;
}

export const Pokemon = ({ name }: IPokemonProps) => {
  const [pokemonData, setPokemonData] = useState<IPokemon>();
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);

  useEffect(() => {
    (async () => {
      const res = await getPokemon(name);
      setPokemonData(res);
      dispatch(updatePokemonAction(res.types, name));
    })();
  }, [name]);

  const pokemonType = (pokemonData: IPokemon | undefined) => {
    if (!pokemonData) return <Skeleton.Button active />;
    const types = pokemonData.types.map((type) => {
      const color = stc(type.type.name);
      return (
        <Tag key={type.type.name} color={color}>
          {type.type.name}
        </Tag>
      );
    });
    return <>{types}</>;
  };
  return (
    <>
      <Link to={`${name}`} key={name}>
        <div className={s.types}>{pokemonType(pokemonData)}</div>
        <>{name}</>
      </Link>
    </>
  );
};
