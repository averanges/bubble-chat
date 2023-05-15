import React, { useEffect, useState } from 'react'
import { fetchAllChats } from '../../../slices/userSlice'
import { openStartNewChatPopup } from '../../../slices/popupSlice'
import getChatsHelper from '../helpers/chatHelpers'
import { useDispatch, useSelector } from 'react-redux'
import { SearchButton } from '../../../components/buttons/Buttons'
import socket from '../../../socket'
import { loggedUser } from '../../../slices/authSlice'
import { searchChat } from '../../../services/userService'

const ChatSide = () => {
    const dispatch = useDispatch()
    const mobileChat = useSelector(state => state.user.mobileChat)
    const lastMessage = useSelector(state=> state.user.lastMessage)
    const user = useSelector(loggedUser)
    const chats = getChatsHelper()
    const [search, setSearch] = useState('')
    useEffect(() => {
      socket.emit('requested-chats', (user.id))
        socket.on('get-chats', (data) => {
          const {requestSocketId, chatRooms} = data
          const fetchChatRooms = !chatRooms ? data : chatRooms
          if(localStorage.getItem('socketId')) {
            localStorage.setItem('socketId', requestSocketId)
          }
          dispatch(fetchAllChats(fetchChatRooms))
        })
         return () => {
          socket.off('get-chats')
         }
      },[dispatch, lastMessage])
     const handleChatSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchChat({search,user}))
    }
  return (
    <div className={`${!mobileChat ? 'block min-w-full' : 'hidden'} w-full lg:min-w-[32%] max-w-[32%] h-screen
    pt-2 md:flex bg-gray-50 justify-center shadow-inner dark:bg-chat-dark dark:text-white`} >
       <div className=' h-full w-full flex flex-col gap-3 overflow-y-auto overflow-x-hidden'>
         <div className='flex w-full items-center justify-between'>
            <h1 className='text-2xl ml-5 font-semibold'>Chats</h1>
            <div className='flex mr-10 gap-3'>
                <button className='flex items-center cursor-pointer group/item'
                onClick={() => dispatch(openStartNewChatPopup(true))}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} className="w-5 h-5 stroke-gray-500 dark:stroke-gray-200">
                    <path className='group-hover/item:stroke-teal-500' strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    <span htmlFor="newOneMessage" className='text-gray-400 group-hover/item:text-teal-400 cursor-pointer'>New</span>
                </button>
            </div>
         </div>
        <div className='relative h-10 w-full ml-5 min-h-[2.5rem]'>
            <SearchButton/>
            <input type="search" placeholder='Search...' onChange={(e) => handleChatSearch(e)} value={search}
            className='h-full rounded-full bg-gray-200 w-10/12 pl-10 focus:outline-teal-300  dark:bg-dark-gray'/>
        </div>
        <span className="flex justify-center items-center ml-5 mt-5 mb-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:opacity-50 before:bg-teal-500 relative w-16">
             <span className="relative text-white font-bold">Recent</span>
        </span>
        <div className='flex flex-col gap-2 ml-5 mr-3 md:max-lg:mr-0 md:max-lg:ml-0 pb-14'> 
            {chats}
        </div>
       </div>
    </div>
  )
}

export default ChatSide