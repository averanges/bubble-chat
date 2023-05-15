import { createSlice } from "@reduxjs/toolkit"
import {  loginUser, logoutUser, registerUser } from "../services/authService"

const existUser = JSON.parse(localStorage.getItem('user'))


const initialState = {
    user:  existUser ? existUser : null,
    error: null,
    isLoading: false,
    isLogged: existUser ? true : false,
    socket: null
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        socketConnect: (state, action) => {
            state.socket = action.payload
        }
    },
    extraReducers: {
        [registerUser.pending] : (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled] : (state, action) => {
            state.user = action.payload
            state.error = null
            state.isLoading = false
            state.isLogged = true
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        [registerUser.rejected] : (state, action) => {
            state.error = action.payload
        },
        [loginUser.pending] : (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled] : (state, action) => {
            state.user = action.payload
            state.error = null
            state.isLoading = false
            state.isLogged = true
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        [loginUser.rejected] : (state, action) => {
            state.error = action.payload
        },
        [logoutUser.fulfilled] : (state, action) => {
            localStorage.clear()
            state.isLogged = false
        },
    }
})

export const loggedUser = state => state.auth.user
export const errorMessage = state => state.auth.error
export const isLoadingOn = state => state.auth.isLoading
export const isLoggedIn = state => state.auth.isLogged


export default authSlice.reducer