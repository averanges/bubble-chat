import { createSlice } from "@reduxjs/toolkit"
import { logoutUser } from "../services/authService"
import { addFriend, addToBlockList, addToFavoriteList, deleteFriend, getFriends, searchAddedFriends, searchChat, searchFriend, startChatWithUser } from "../services/userService"

const chatRoomExist = JSON.parse(localStorage.getItem('chatRoom'))
const receiverExist = JSON.parse(localStorage.getItem('receiver'))

const initialState = {
    addFriendPopup: false,
    searchedFriends: null,
    friendsList: [],
    favoriteList: [],
    blockedList: [],
    openChat: false, 
    selectedUser: receiverExist ? receiverExist : null,
    error: null,
    chatRoom: chatRoomExist ? chatRoomExist : null,
    allChats: [],
    mobileChat: false,
    isLoading: false,
    lastMessage: null,
}

const userSlice = createSlice ({
    name: 'popups',
    initialState,
    reducers: {
        openAddFriendPopup: (state,action) => {
            state.addFriendPopup = action.payload
        },
        clean: (state) => {
            state.friendsList = []
        },
        clearChatRoom: (state, action) => {
            state.chatRoom = null
        },
        fetchMessages: (state, action) => {
            state.chatRoom = action.payload
            localStorage.setItem('chatRoom', JSON.stringify(action.payload))
        },
        switchPage: (state, action) => {
            state.mobileChat = false
        },
        openMobileChat: (state, action) => {
            state.mobileChat = true
        },
        fetchAllChats: (state, action) => {
            state.allChats = action.payload
        },
     }, extraReducers: {
        [searchFriend.fulfilled]: (state, action) => {
            state.searchedFriends = action.payload
        },
        [addFriend.fulfilled]: (state, action) => {
            state.friendsList.push(action.payload)
        }, 
        [getFriends.fulfilled]: (state, action) => {
            state.friendsList = action.payload
        },
        [getFriends.rejected]: (state, action) => {
            state.friendsList = []
            state.error = action.payload
        },
        [startChatWithUser.fulfilled]: (state, action) => {
            const {receiver, chatRoom} = action.payload
            if (chatRoom) {
                state.chatRoom = chatRoom
                localStorage.setItem('chatRoom', JSON.stringify(chatRoom))
            }
            state.selectedUser = receiver
            localStorage.setItem('receiver', JSON.stringify(receiver))
            state.openChat = true
            state.isLoading = false
        },
        [startChatWithUser.pending]: (state, action) => {
            state.isLoading = false
        },
        [deleteFriend.fulfilled]: (state, action) => {
            state.friendsList = action.payload
        },
        [addToFavoriteList.fulfilled]: (state, action) => {
            state.friendsList = action.payload
        },
        [addToBlockList.fulfilled]: (state, action) => {
            state.friendsList = action.payload
        },
        [logoutUser.fulfilled] : (state, action) => {
            state.chatRoom = null
            state.mobileChat = false
            state.allChats = []
            state.selectedUser = null
        },   
        [searchChat.fulfilled]: (state, action) => {
            state.allChats = action.payload
        },
        [searchAddedFriends.fulfilled]: (state, action) => {
            state.friendsList = action.payload
        },
    }
})
export const addedFriends = state => state.user.friendsList
export const addFriendPopupOn = state => state.user.addFriendPopup
export const foundFriends = state => state.user.searchedFriends
export const selectedToChat = state => state.user.selectedUser
export const chatOpen = state => state.user.openChat
export const userError = state => state.user.error

export const {openAddFriendPopup, clean, clearChatRoom, fetchMessages, switchPage, openMobileChat, fetchAllChats} = userSlice.actions

export default userSlice.reducer