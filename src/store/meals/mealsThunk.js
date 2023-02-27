import { createAsyncThunk } from '@reduxjs/toolkit'
import fetchAPI from '../../lib/fetchApi'

const getMeals = createAsyncThunk(
    'meals/getMeals',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await fetchAPI('foods')
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export default getMeals
