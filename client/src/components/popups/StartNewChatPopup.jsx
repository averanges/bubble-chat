import React, { useEffect, useRef } from 'react'
import { SearchButton } from '../buttons/Buttons'
import { openStartNewChatPopup, openWelcomeUserPopup, switcherTab } from '../../slices/popupSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getFriends } from '../../services/userService'
import { loggedUser } from '../../slices/authSlice'
import { addedFriends, clean } from '../../slices/userSlice'
import ContactsProfile from '../sub-components/ContactsProfile'

const StartNewChatPopup = () => {
    const friendsList = useSelector(addedFriends)
    const user = useSelector(loggedUser)
    const userId = user.id
    const dispatch = useDispatch()
    const popupRef = useRef()
    const popupCloseButton = useRef()
    const popupCloseRef = useRef()
    const welcomeUserPopup = useSelector(state => state.popup.welcomeUserPopup)
    const closePopup = (e) => {
        if(e.target === popupCloseRef.current){
        dispatch(openStartNewChatPopup(false))
        dispatch(openWelcomeUserPopup(false))
        }
        if(e.target === popupCloseButton.current){
          dispatch(openStartNewChatPopup(false))
          dispatch(openWelcomeUserPopup(false))
          }
          if(e.target === popupRef.current){
            dispatch(openStartNewChatPopup(false))
            dispatch(openWelcomeUserPopup(false))
            }
    }
    useEffect(() => {
        dispatch(getFriends({userId, name: 'friendsList'}))
        return () => {
          dispatch(clean()) 
        }
      },[dispatch])
    const organizedFriendsList = friendsList?.length ? friendsList?.map(el => <ContactsProfile key={el._id} props={el}/>) : []
    const handleSearch = (e) => {
        // setSearchFriendValue({[searchByName]: e.target.value})
      }
  return (
    <div className='w-screen h-screen bg-[rgba(0,0,0,0.7)] absolute flex justify-center items-center z-10'
        onClick={(e) => closePopup(e)}
        ref={popupRef}>
          {welcomeUserPopup ? <div className='flex flex-col gap-1'>
            <button onClick={() => dispatch(switcherTab(true))}
            className='dark:bg-chat-dark dark:text-white whitespace-nowrap hover:bg-teal-300 transition duration-500 w-14 h-40 bg-white rounded-l-lg cursor-pointer shadow-lg flex justify-center items-center'>
              <h2 className='-rotate-90 font-bold'>Start new chat!</h2>
            </button>
            <button  onClick={() => dispatch(switcherTab(false))} 
            className='dark:bg-chat-dark dark:text-white whitespace-nowrap hover:bg-teal-300 transition duration-500 w-14 h-28 bg-white rounded-l-lg cursor-pointer shadow-lg flex justify-center items-center'>
              <h2 className='-rotate-90 font-bold '>Find friend!</h2>
            </button> 
        </div> : null}
        <div className='w-80 h-96 bg-white relative p-5 flex flex-col gap-7 dark:bg-side-dark dark:text-white'>
           <div className='shadow-2xl border-2 border-[rgba(0,0,0,0.7)] rounded-full w-10 h-10 bg-white absolute -top-6 -right-6 flex justify-center items-center cursor-pointer dark:bg-side-dark'
           onClick={(e) => closePopup(e)} ref={popupCloseButton}
          >
            <svg ref={popupCloseRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
           </div>
                <p className='flex w-full gap-2 text-xl'>Pick user to <span className="flex justify-center items-center before:block before:absolute before:-inset-1 before:-skew-y-3 before:opacity-50 before:bg-teal-400 relative w-fit">
                    <span className="relative text-white font-bold">start </span>
                    </span>a new chat.
                </p>
           <div className='relative h-10 w-full '>
                <SearchButton/>
                <input type="search" placeholder='Search...' 
                className='h-full rounded-full bg-gray-200 w-11/12 pl-10 focus:outline-teal-300 pr-5 dark:bg-dark-gray'
                onChange={(e) => handleSearch(e)}
                />
            </div>
            <div className='flex flex-col overflow-y-scroll'>
            {organizedFriendsList ? organizedFriendsList : null}
            </div>
        </div>
    </div>
  )
}

export default StartNewChatPopup