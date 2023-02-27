import { createAsyncThunk } from '@reduxjs/toolkit'
import fetchAPI from '../../lib/fetchApi'

export const getBasket = createAsyncThunk(
    'basket/getBasket',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await fetchAPI('basket')
            return data.items
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addToBasket = createAsyncThunk(
    'basket/addNewBasket',
    async (newItem, { dispatch, rejectWithValue }) => {
        try {
            await fetchAPI(`foods/${newItem.id}/addToBasket`, {
                method: 'POST',
                body: { amount: newItem.amount },
            })
            dispatch(getBasket())
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const updateBasketItem = createAsyncThunk(
    'basket/updateBasket',
    async ({ id, amount }, { dispatch, rejectWithValue }) => {
        try {
            await fetchAPI(`basketItem/${id}/update`, {
                method: 'PUT',
                body: { amount },
            })
            dispatch(getBasket())
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const deleteBasketItem = createAsyncThunk(
    'basket/deleteBasket',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            await fetchAPI(`basketItem/${id}/delete`, {
                method: 'DELETE',
            })
            dispatch(getBasket())
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const submitOrder = createAsyncThunk(
    'basket/submitOrder',
    async ({ orderData }, { dispatch, rejectWithValue }) => {
        try {
            await fetchAPI(`https://jsonplaceholder.typicode.com/postssad`, {
                method: 'POST',
                body: orderData,
            })
            return dispatch(getBasket())
        } catch (error) {
            return rejectWithValue('Something went wrong')
        }
    }
)
