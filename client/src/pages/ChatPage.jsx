import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import ChatSide from '../Modules/Chat Module/components/ChatSide'
import { useSelector } from 'react-redux'
import { isLoggedIn, loggedUser } from '../slices/authSlice'
 
const ChatPage = () => {
  const mobileChat = useSelector(state => state.user.mobileChat)
  const user = useSelector(loggedUser)
  const isAuthenticated = useSelector(isLoggedIn)
  if(!isAuthenticated || !user){
    return <Navigate to='/login'/>
  }
  return (
    <div className='w-full flex overflow-hidden dark:bg-chat-dark dark:text-white'>
        <ChatSide/>
        <div className={`${mobileChat ? '' : 'top-0 left-0 absolute invisible -z-10'} max-h-screen lg:static lg:z-0 lg:visible w-full lg:w-[68%] h-full border-x-2 dark:bg-side-dark dark:text-white dark:border-dark-gray`}>  
          <Outlet/>
        </div>
      </div>
  )
}

export default ChatPage