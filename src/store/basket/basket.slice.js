/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import {
    addToBasket,
    deleteBasketItem,
    getBasket,
    updateBasketItem,
} from './basketThunk'

export const basketActionTypes = {
    ADD_ITEM_SUCCESS: 'ADD_ITEM_SUCCESS',
    GET_BUSKET_SUCCESSS: 'GET_BUSKET_SUCCESSS',
}

const initialState = {
    items: [],
    isLoading: false,
    error: '',
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        getBasketStarted(state, action) {
            state.items = action.payload
            state.isLoading = true
        },
        getBasketSuccess(state, action) {
            state.items = action.payload
            state.isLoading = false
            state.error = ''
        },
        getBasketFailed(state, action) {
            state.items = action.payload
            state.error = 'Something went wrong'
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getBasket.fulfilled, (state, action) => {
            state.items = action.payload
            state.isLoading = false
            state.error = ''
        })

        builder.addCase(getBasket.pending, (state, action) => {
            state.isLoading = true
            state.error = action.payload
        })

        builder.addCase(getBasket.rejected, (state, action) => {
            state.items = action.payload
            state.isLoading = false
            state.error = 'error'
        })

        builder.addCase(addToBasket.fulfilled, (state) => {
            state.isLoading = false
            state.error = ''
        })

        builder.addCase(addToBasket.pending, (state) => {
            state.isLoading = true
            state.error = ''
        })

        builder.addCase(addToBasket.rejected, (state) => {
            state.isLoading = false
            state.error = 'error'
        })

        builder.addCase(updateBasketItem.fulfilled, (state) => {
            state.isLoading = false
            state.error = ''
        })

        builder.addCase(updateBasketItem.pending, (state) => {
            state.isLoading = true
            state.error = ''
        })

        builder.addCase(updateBasketItem.rejected, (state) => {
            state.isLoading = false
            state.error = 'error'
        })

        builder.addCase(deleteBasketItem.fulfilled, (state) => {
            state.isLoading = false
            state.error = ''
        })

        builder.addCase(deleteBasketItem.pending, (state) => {
            state.isLoading = true
            state.error = ''
        })

        builder.addCase(deleteBasketItem.rejected, (state) => {
            state.isLoading = false
            state.error = 'error'
        })
    },
})

export const basketActions = basketSlice.actions
