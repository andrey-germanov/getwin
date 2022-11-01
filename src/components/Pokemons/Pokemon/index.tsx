import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemon } from "../../../store/asyncActions/pokemon";
import { IPokemon } from "../../../types/pokemonType";
import { useEffect } from "react";
import { updatePokemonAction } from "../../../store/pokemonsReducer";
import { Tag } from "antd";
import stc from "string-to-color";
import { Link } from "react-router-dom";

interface IPokemonProps {
  name: string;
}

export const Pokemon = ({ name }: IPokemonProps) => {
  const [pokemonData, setPokemonData] = useState<IPokemon>();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await getPokemon(name);
      setPokemonData(res);
      dispatch(updatePokemonAction(res.types, name));
    })();
  }, [name]);

  const pokemonType = (pokemonData: IPokemon | undefined) => {
    if (!pokemonData) return null;
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
        {pokemonType(pokemonData)}
        {name}
      </Link>
    </>
  );
};
