import { createAsyncThunk } from '@reduxjs/toolkit'
import { getMealRequest } from '../../api/mealService'

const getMeals = createAsyncThunk(
    'meals/getMeals',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getMealRequest()
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export default getMeals
