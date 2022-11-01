import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pokemonSelector } from "../../store/pokemonsReducer";
import { useSelector } from "react-redux";
import { fetchPokemon } from "../../store/asyncActions/pokemon";
import { IPokemon } from "../../types/pokemonType";
import s from "./Pokemon.module.scss";
import { Spin } from "antd";

export const PokemonPage = () => {
  const { name } = useParams();
  const dispatch = useDispatch();

  const pokemon: IPokemon | null = useSelector(pokemonSelector);

  useEffect(() => {
    if (name) {
      dispatch(fetchPokemon(name));
    }
  }, [name]);

  const renderInfo = () => {
    return (
      <div className={s.pokemonPage}>
        {pokemon === null || pokemon.name !== name ? (
          <Spin size="large" />
        ) : (
          <>
            <img src={pokemon.sprites.front_default} alt="" />
            <h1>{pokemon.name}</h1>
            <div className={s.pokemonInfo}>
              <div>
                <h1>Move</h1>
                <div className={s.moves}>
                  {pokemon.moves.map((item: any) => {
                    return <div key={item.move.name}>{item.move.name}</div>;
                  })}
                </div>
              </div>
              <div>
                <h1>Stats</h1>
                <div className={s.stats}>
                  {pokemon.stats.map((item: any) => {
                    return (
                      <div key={item.stat.name}>
                        {item.stat.name} - {item.base_stat}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  return <>{renderInfo()}</>;
};
