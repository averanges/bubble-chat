import { createSlice } from "@reduxjs/toolkit"


    const initialState = {
    deleteFriendPopup: false,
    startNewChatPopup: false,
    switchTabPopup: false,
    welcomeUserPopup: false
    }

    const popupSlice = createSlice({
        name: 'popup',
        initialState,
        reducers: {
            openDeletePopup: (state, action) => {
                state.deleteFriendPopup = action.payload
            },
            openStartNewChatPopup: (state, action) => {
                state.startNewChatPopup = action.payload
            },
            openWelcomeUserPopup: (state, action) => {
                state.welcomeUserPopup = action.payload
            },
            switcherTab: (state, action) => {
                state.switchTabPopup = action.payload
            },
        },
        extraReducers: {

        }
})

export const {openDeletePopup, openFriendSideBar, openStartNewChatPopup, openWelcomeUserPopup, switcherTab} = popupSlice.actions

export default popupSlice.reducer