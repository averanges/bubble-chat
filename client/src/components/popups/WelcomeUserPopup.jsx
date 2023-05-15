import React from 'react'
import StartNewChatPopup from './StartNewChatPopup'
import { useSelector } from 'react-redux'
import AddFriendPopUp from './AddFriendPopUp'

const WelcomeUserPopup = () => {
    const switchTab = useSelector(state=> state.popup.switchTabPopup)
  return (
    <>
    {switchTab ? <StartNewChatPopup/> : <AddFriendPopUp/>}
    </>
  )
}

export default WelcomeUserPopup