import { createSlice } from '@reduxjs/toolkit'
import UserRoles, { STORAGE_KEYS } from '../../lib/constants/common'
import signUp, { signIn } from './auth.thunk'

const getInitialState = () => {
    const jsonData = localStorage.getItem(STORAGE_KEYS.AUTH)
    if (jsonData) {
        const userData = JSON.parse(jsonData)
        return {
            isAuthorized: false,
            token: userData.token,
            user: {
                name: userData.name,
                email: userData.email,
                role: userData.role,
            },
        }
    }
    return {
        isAuthorized: false,
        token: '',
        user: {
            role: UserRoles.GUEST,
            email: '',
            name: '',
        },
    }
}

const initialState = {
    isAuthorized: false,
    ...getInitialState(),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(signUp.fulfilled, (state, { payload }) => {
            state.isAuthorized = true
            state.token = payload.token

            state.user = {
                name: payload.user.name,
                email: payload.user.email,
                role: payload.user.role,
            }
        })
        builder.addCase(signIn.fulfilled, (state) => {
            state.isAuthorized = true
        })
    },
})

export default authSlice
