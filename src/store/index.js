import { configureStore } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk'
import { basketSlice } from './basket/basket.slice'
import { mealsSlice } from './meals/Meals.slice'
import { uiSlice } from './UI/ui.slice'

// const { combineReducers, createStore, applyMiddleware } = require('redux')

// const rootReducer = combineReducers({
//     [mealsSlice.name]: mealsSlice.reducer,
//     [basketSlice.name]: basketSlice.reducer,
//     [uiSlice.name]: uiSlice.reducer,
// })

const store = configureStore({
    reducer: {
        [mealsSlice.name]: mealsSlice.reducer,
        [basketSlice.name]: basketSlice.reducer,
        [uiSlice.name]: uiSlice.reducer,
    },
})

export default store
