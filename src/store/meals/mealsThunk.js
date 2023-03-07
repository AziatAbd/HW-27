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
    async (newMeal, { dispatch, rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth

            await postMealRequest(newMeal, token)
            return dispatch(getMeals())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteMeal = createAsyncThunk(
    'meal/deleteMeal',
    async (id, { dispatch, rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth
            await deleteMealRequest(token, id)
            return dispatch(getMeals())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const editMeal = createAsyncThunk(
    'meal/editMeal',
    async (data, { dispatch, rejectWithValue, getState }) => {
        try {
            const { token } = getState().auth
            await editMealRequest(token, data)
            return dispatch(getMeals())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
