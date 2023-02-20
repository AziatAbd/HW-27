import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../lib/fetchApi";

export const mealsActionTypes = {
  GET_MEALS_SUCCESS: "GET_MEALS_SUCCESS",
  GET_MEALS_STARTED: "GET_MEALS_STARTED",
  GET_MEALS_FAILED: "GET_MEALS_FAILED",
};

const initialState = {
  meals: [],
  isLoading: false,
  error: "",
};

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    getMealsStarted(state, action) {
      state.isLoading = true;
    },
    getMealsSuccess(state, action) {
      state.meals = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getMealsFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMeals.fulfilled, (state, action) => {
      state.meals = action.payload;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getMeals.pending, (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    });
    builder.addCase(getMeals.rejected, (state, action) => {
      state.meals = action.payload;
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const mealsActions = mealsSlice.actions;

export const getMeals = createAsyncThunk(
  "meals/getMeals",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchAPI("foods");
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
