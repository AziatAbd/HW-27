import thunk from "redux-thunk";
import { basketSlice } from "./basket/basketSlice";
import { mealsSlice } from "./meals/MealsSlice";
import { uiSlice } from "./UI/uiSlice";

const { combineReducers, createStore, applyMiddleware } = require("redux");

const rootReducer = combineReducers({
  [mealsSlice.name]: mealsSlice.reducer,
  [basketSlice.name]: basketSlice.reducer,
  [uiSlice.name]: uiSlice.reducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
