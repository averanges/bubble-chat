import { loginUser } from "../services/authService"
import socket from "../socket"
import { startChatWithUser } from "../services/userService"
import { clearChatRoom, openMobileChat } from "../slices/userSlice"

const chatMiddleware = ({getState, dispatch}) => next => async (action) => {
    if (action.type === loginUser.fulfilled.type){
        await next(action)
        const user = getState().auth.user
        await socket.connect()
        await socket.emit('setup', user) 
    }
    if (action.type === startChatWithUser.fulfilled.type){
        await next(action)
        dispatch(openMobileChat())
        dispatch(clearChatRoom())
    }
    return next(action)
}

export default chatMiddleware