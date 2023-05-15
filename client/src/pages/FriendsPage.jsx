import React from 'react'
import {  useSelector } from 'react-redux'
import { isLoggedIn, loggedUser } from '../slices/authSlice'
import { Navigate, Outlet } from 'react-router-dom'
import FriendsSide from '../Modules/Friends Module/components/FriendsSide'

const FriendsPage = () => {
  const isAuthenticated = useSelector(isLoggedIn)
  const mobileChat = useSelector(state => state.user.mobileChat)
  const user = useSelector(loggedUser)

  if(!isAuthenticated || !user){
    return <Navigate to='/'/>
  }

  return (
    <>
    <div className='w-full flex'>
      <FriendsSide/>
      <div className={`${mobileChat ? '' : 'top-0 left-0 absolute invisible -z-10'} md:static md:z-0 md:visible w-full md:w-[68%] h-full border-x-2 dark:bg-side-dark dark:text-white dark:border-dark-gray`}>  
        <Outlet/>
      </div>
    </div>
    </>
  )
}

export default FriendsPage