import { createTheme, ThemeProvider } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import './App.css'
import Snackbar from './components/UI/Snackbar'
import { darkTheme, lightTheme } from './lib/constants/theme'
import Routes from './routes/Routes'
import { uiActions } from './store/UI/ui.slice'

function App() {
    const dispatch = useDispatch()

    const snackbar = useSelector((state) => state.ui.snackbar)

    const themeMode = useSelector((state) => state.ui.themeMode)

    const theme = useMemo(() => {
        const currentTheme =
            themeMode === 'light' ? { ...lightTheme } : { ...darkTheme }

        return createTheme(currentTheme)
    }, [themeMode])

    const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  background-color: ${theme.palette.primary.dark};
}
`

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Snackbar
                    isOpen={snackbar.isOpen}
                    severity={snackbar.severity}
                    message={snackbar.message}
                    autoHideDuration={4000}
                    onClose={() => dispatch(uiActions.closeSnackbar())}
                />
                <GlobalStyle />
                <Routes />
            </ThemeProvider>
        </div>
    )
}

export default App
