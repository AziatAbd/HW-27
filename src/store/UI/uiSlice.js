import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
  snackbar: {
    isOpen: false,
    message: "",
    severity: "",
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showSnackbar(state, action) {
      state.snackbar.isOpen = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity;
    },
    closeSnackbar(state, action) {
      state.snackbar = initialState.snackbar;
    },
    changeTheme(state, action) {
      state.themeMode = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
