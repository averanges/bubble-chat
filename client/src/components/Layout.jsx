import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../slices/authSlice'
import { openFriendSideBar } from '../slices/popupSlice'
import { addFriendPopupOn } from '../slices/userSlice'
import AddFriendPopUp from './popups/AddFriendPopUp'
import ConfirmDeletePopup from './popups/ConfirmDeletePopup'
import Sidebar from './Sidebar'
import StartNewChatPopup from './popups/StartNewChatPopup'
import WelcomeUserPopup from './popups/WelcomeUserPopup'

const Layout = () => {
  const isAuthenticated = useSelector(isLoggedIn)
  const addFriendPopup = useSelector(addFriendPopupOn)
  const welcomeUserPopup = useSelector(state=> state.popup.welcomeUserPopup)
  const deleteFriendPopup = useSelector(state => state.popup.deleteFriendPopup)
  const startNewChatPopup = useSelector(state => state.popup.startNewChatPopup)
  const dispatch = useDispatch ()

  useEffect(() => {
    if (localStorage.getItem('dark')){ 
      document.querySelector('html').classList.add('dark')
    }
  },[])
  return (
    <>
    {welcomeUserPopup ? <WelcomeUserPopup/> : null}
    {startNewChatPopup ? <StartNewChatPopup/> : null}
    {deleteFriendPopup?.open ? <ConfirmDeletePopup/> : null}
    {addFriendPopup ? <AddFriendPopUp/> : null}
    <div className={`w-screen h-screen flex flex-col lg:flex-row overflow-hidden ${addFriendPopup || deleteFriendPopup?.open && 'blur-sm'}`}
    >
       <Sidebar/>
        {isAuthenticated ? <Outlet/> : <Navigate to='/login'/>}
    </div>
    </>
  )
}

export default Layout