import { createSlice } from '@reduxjs/toolkit'
import { STORAGE_KEYS } from '../../lib/constants/common'
import signUp, { signIn } from './auth.thunk'

const getInitialState = () => {
    const jsonData = localStorage.getItem(STORAGE_KEYS.AUTH)
    if (jsonData) {
        const userData = JSON.parse(jsonData)
        return userData
    }
    return jsonData
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
