import React from 'react'
import { Avatar } from './buttons/PhotoCircleButtons'
import { FriendsButton, MessageButton, LogoutButton, DarkModeButton, BellButton } from './buttons/Buttons'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../services/authService'
import { loggedUser } from '../slices/authSlice'

const Sidebar = () => {
  const dispatch = useDispatch()
  const user = useSelector(loggedUser)
  const mobileChat = useSelector(state => state.user.mobileChat)
  const logout = () => {
    dispatch(logoutUser(user))
  }
  return (
    <div className={`${mobileChat ? 'hidden' : 'flex'} h-fit w-full lg:w-20 lg:h-full pb-2 pt-2 lg:flex justify-around lg:justify-between lg:flex-col lg:pb-2 shadow-lg border-r-2 dark:bg-dark-gray dark:border-dark-gray`}>
            <Avatar/>
        <div className='flex lg:flex-col lg:gap-12 gap-5 lg:w-full items-center'>
            <MessageButton/>
            <FriendsButton/> 
        </div>
        <div className='flex lg:flex-col lg:gap-12 gap-5 lg:w-full items-center'>
            <DarkModeButton/>  
            <LogoutButton logout={logout}/>
        </div>
    </div>
  )
}

export default Sidebar