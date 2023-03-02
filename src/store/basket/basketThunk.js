import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    addToBasketReq,
    deleteBasketItemReq,
    getBasketReq,
    updateBasketItemReq,
} from '../../api/mealService'
import fetchAPI from '../../lib/fetchApi'

export const getBasket = createAsyncThunk(
    'basket/getBasket',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getBasketReq()
            return data.data.items
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addToBasket = createAsyncThunk(
    'basket/addNewBasket',
    async (newItem, { dispatch, rejectWithValue }) => {
        try {
            await addToBasketReq(newItem)
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
            await updateBasketItemReq(id, amount)
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
            await deleteBasketItemReq(id)
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
