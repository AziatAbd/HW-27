import thunk from "redux-thunk";
import { basketSlice } from "./basket/basketSlice";
import { mealsSlice } from "./meals/MealsSlice";

const { combineReducers, createStore, applyMiddleware } = require("redux");

const rootReducer = combineReducers({
  [mealsSlice.name]: mealsSlice.reducer,
  [basketSlice.name]: basketSlice.reducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
