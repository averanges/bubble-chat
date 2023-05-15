import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import socket from "../socket";
import { logoutUser } from "./authService";
import { openAddFriendPopup } from "../slices/userSlice";

const app = axios.create({baseURL:'https://bubblechat-api.onrender.com/user', withCredentials: true})

export const searchFriend = createAsyncThunk('user/searchFriend', async(data, {rejectWithValue}) => {
    try {
      const response = await app.get('/search-friends', {params: data})
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.error)
    }
})
export const addFriend = createAsyncThunk('user/addFriend', async(data, {rejectWithValue}) => {
  console.log(data)
    try {
      const response = await app.post('/add-friends', data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.error)
    }
})
export const getFriends = createAsyncThunk('user/getFriends', async(data,{rejectWithValue, dispatch}) => {
  try {
      const response = await app.get('/get-friends', {params: data})
      return response.data
    } catch (error) {
      if (error.response.request.status == 401){
        dispatch(logoutUser())
      }
      return rejectWithValue(error.response.data.error)
    }
})
export const startChatWithUser = createAsyncThunk('user/startChat', async(data,{dispatch, rejectWithValue}) => {
  try {
      const response = await new Promise ((resolve, reject) => {
        socket.emit('start-chat', data)
        socket.on('get-messages', (chatRoom) => {
          resolve(chatRoom)
        })
      })
      dispatch(openAddFriendPopup(false))
      return response
    } catch (error) {
      return rejectWithValue(error.response.data.error)
    }
})
export const deleteFriend = createAsyncThunk('user/deleteFriend', async(data, {rejectWithValue}) => {
  try {
    const response = await app.post('/delete-friend', data)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data.error)
  }
})
export const addToFavoriteList = createAsyncThunk('user/addToFavoriteList', async(data, {rejectWithValue}) => {
  try {
    const response = await app.post('/favorite-list', data)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data.error)
  }
})
export const addToBlockList = createAsyncThunk('user/addToBlockList', async(data, {rejectWithValue}) => {
  try {
    const response = await app.post('/block-list', data)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data.error)
  }
})
export const searchChat = createAsyncThunk('user/searchChat', async(data, {rejectWithValue}) => {
  try {
    const response = await app.get('/search-chat', {params: data})
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data.error)
  }
})
export const searchAddedFriends = createAsyncThunk('user/searchAddedFriends', async(data, {rejectWithValue}) => {
  try {
    const response = await app.get('/search-chat', {params: data})
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data.error)
  }
})
