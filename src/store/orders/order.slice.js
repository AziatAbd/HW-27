import { createSlice } from '@reduxjs/toolkit'
import { getAllOrders, getOrders } from './order.thunk'

const initialState = {
    items: [],
    allItems: [],
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.items = action.payload
        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.allItems = action.payload
        })
    },
})
