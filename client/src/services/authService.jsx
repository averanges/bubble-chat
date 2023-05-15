import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import io from 'socket.io-client'
import socket from "../socket";

const app = axios.create({baseURL: 'https://bubblechat-api.onrender.com/auth', withCredentials: true})

export const registerUser = createAsyncThunk ('auth/registerUser', async (user, {rejectWithValue}) => {
    try {
        const response = await app.post('/signup', user)
        return response.data
      } catch (error) {
        return rejectWithValue(error.response.data.error)
      }
})
export const loginUser = createAsyncThunk ('auth/loginUser', async (user, {rejectWithValue}) => {
  try {
        const response = await app.post('/login', user)
        return response.data
      } catch (error) {
        return rejectWithValue(error.response.data.error)
      }
})
export const logoutUser = createAsyncThunk('auth/logoutUser', async (user) => {
      await socket.disconnect()
      await socket.emit('logout', user)
})
export const connectSocket = createAsyncThunk('auth/connectSocket', async () => {
      const socket = io('http://localhost:5000');
      return socket;
});