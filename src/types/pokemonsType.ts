import { Type } from "./pokemonType";

export interface IPokemons {
    name: string;
  url: string;
  pokemonTypes?: Type[];
}
