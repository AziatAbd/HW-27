import { AppBar, Button, Grid, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/system'
import { useDispatch } from 'react-redux'
import { signOut } from '../../../store/auth/auth.thunk'

const menus = [
    {
        path: 'meals',
        title: 'Meals',
    },
    {
        path: 'orders',
        title: 'Orders',
    },
]

const AdminHeader = () => {
    const dispatch = useDispatch()

    const signOutHandler = () => {
        dispatch(signOut())
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Appbar>
                    <StyledGrid>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {menus.map((item) => (
                            <NavLink key={item.path} to={item.path}>
                                {item.title}
                            </NavLink>
                        ))}
                    </StyledGrid>
                    <Button color="inherit" onClick={signOutHandler}>
                        SignOut
                    </Button>
                </Appbar>
            </Toolbar>
        </AppBar>
    )
}

export default AdminHeader

const Appbar = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}))

const StyledGrid = styled(Grid)(() => ({
    display: 'flex',
    gap: '10px',
}))
