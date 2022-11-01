import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { pokemonsReducer } from "./pokemonsReducer";

export interface IRootReducer {
  pokemonsReducer: typeof pokemonsReducer;
}

const rootReducer = combineReducers({
  pokemonsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
