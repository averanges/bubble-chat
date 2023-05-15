import { configureStore } from "@reduxjs/toolkit";
import chatMiddleware from "./middleware/chatMiddleware";
import authSlice from './slices/authSlice'
import popupSlice from "./slices/popupSlice";
import userSlice from "./slices/userSlice";


const store = configureStore ({
    reducer: {
        auth: authSlice,
        user: userSlice,
        popup: popupSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatMiddleware),
    devTools: false
})

export default store