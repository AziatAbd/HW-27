import { store } from "../../store";

export const lightTheme = {
  palette: {
    primary: {
      main: "#8a2b06",
      light: "#c44817",
      dark: "#481805",
      contrastText: "#fff",
    },

    secondary: {
      main: "#8a2b06",
      light: "#c44817",
      dark: "#481805",
      contrastText: "#fff",
    },

    error: {
      main: "#ee1616",
      light: "#ee1616",
      dark: "#ee1616",
      contrastText: "#fff",
    },

    success: {
      main: "#0cec32",
      light: "#0cec32",
      dark: "#0cec32",
      contrastText: "#fff",
    },
    //   warning: {
    //     main: "#8a2b06",
    //     light: "#c44817",
    //     dark: "#481805",
    //   },
    //   info: {
    //     main: "#8a2b06",
    //     light: "#c44817",
    //     dark: "#481805",
    //   },
  },
  typography: {
    fontFamily: "Roboto",
    fonSize: 14,
  },
  spacing: {},
};

export const darkTheme = {
  palette: {
    primary: {
      main: "#123e6a",
      light: "#1976d2",
      dark: "#1976d2",
      contrastText: "#fff",
    },

    secondary: {
      main: "#8a2b06",
      light: "#c44817",
      dark: "#481805",
      contrastText: "#fff",
    },

    error: {
      main: "#ee1616",
      light: "#ee1616",
      dark: "#ee1616",
      contrastText: "#fff",
    },

    success: {
      main: "#0cec32",
      light: "#0cec32",
      dark: "#0cec32",
      contrastText: "#fff",
    },
    //   warning: {
    //     main: "#8a2b06",
    //     light: "#c44817",
    //     dark: "#481805",
    //   },
    //   info: {
    //     main: "#8a2b06",
    //     light: "#c44817",
    //     dark: "#481805",
    //   },
  },
  typography: {
    fontFamily: "Roboto",
    fonSize: 14,
  },
  // spacing: {},
};

export const getTheme = () => {
  const currentTheme = store.getState().ui.themeMode;

  return currentTheme === "light" ? lightTheme : darkTheme;
};
