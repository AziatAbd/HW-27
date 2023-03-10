import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    postMealRequest,
    deleteMealRequest,
    getMealRequest,
    editMealRequest,
} from '../../api/mealService'

export const getMeals = createAsyncThunk(
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

export const postMeal = createAsyncThunk(
    'meal/postMeal',
    async (newMeal, { dispatch, rejectWithValue }) => {
        try {
            await postMealRequest(newMeal)
            return dispatch(getMeals())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteMeal = createAsyncThunk(
    'meal/deleteMeal',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            await deleteMealRequest(id)
            return dispatch(getMeals())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const editMeal = createAsyncThunk(
    'meal/editMeal',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            await editMealRequest(data)
            return dispatch(getMeals())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
