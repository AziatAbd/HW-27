import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    getAllOrdersRequest,
    getOrdersRequest,
    postOrderRequest,
} from '../../api/orderService'

export const getOrders = createAsyncThunk(
    'order/getOrders',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getOrdersRequest()
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getAllOrders = createAsyncThunk(
    'order/getAllOrders',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getAllOrdersRequest()
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const postOrders = createAsyncThunk(
    'order/postOrder',
    async (totalPrice, { rejectWithValue, dispatch }) => {
        try {
            await postOrderRequest(totalPrice)
            return dispatch(getOrders())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
