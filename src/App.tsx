import React from "react";
import "antd/dist/antd.css";
import s from "./App.module.scss";
import { Pokemons } from "./components/Pokemons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PokemonPage } from "./components/PokemonPage";

function App() {
  return (
    <div className={s.app}>
      <Router>
        <Routes>
          <Route path="/" element={<Pokemons />} />
          <Route path={"/:name"} element={<PokemonPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
