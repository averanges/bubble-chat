import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loggedUser } from '../../slices/authSlice'
import { addToBlockList, addToFavoriteList, startChatWithUser } from '../../services/userService'
import { Link } from 'react-router-dom'
import { openDeletePopup } from '../../slices/popupSlice'

const ContactsProfile = ({props}) => {
  const chatRoomData = useSelector(state => state.user.chatRoom)
  const [friendSideBarOpen, setFriendSideBarOpen] = useState(false)
  const sender = useSelector(loggedUser)
  const senderId = sender.id
  const receiverId = props.id
  const dispatch = useDispatch()
  const handleFavorite = () => {
    dispatch(addToFavoriteList({senderId, receiverId}))
  }
  const handleBlocked = () => {
    dispatch(addToBlockList({senderId, receiverId}))
  }
  return (
    <div className='relative'>
    <div className='w-full p-5 flex flex-col justify-around hover:dark:bg-gray-600 hover:bg-slate-200 hover:opacity-80 hover:rounded-xl group/item'>
        <div className='flex items-center gap-3'>
            <div className={`rounded-full h-10 w-10 min-h-[2.5rem] min-w-[2.5rem] bg-gray-400 relative flex justify-center items-center 
            after:absolute after:top-1 after:left-0 ${props?.online ? 'after:bg-green-300' : 'after:bg-gray-300'} after:h-2 after:w-2 after:rounded-full after:block
            before:absolute before:top-0.5 before:-left-0.5 before:bg-white before:h-3 before:w-3 before:rounded-full before:block`}>
            {
            props?.img ? <img src={props?.img} alt="" className='rounded-full w-full h-full'/>
            :
            <p className='text-2xl'>{props?.name?.charAt(0)?.toUpperCase()}</p>
            }
            </div>
            <div className='w-5/6'>
                <div className='flex justify-between'>
                  <div className='flex flex-col'>
                    <h2 className='font-bold'>{props?.name}</h2>
                    <div className='flex gap-2'>
                      <span className={`${props.favoriteFriend ? 'inline' : 'hidden'} bg-teal-300 p-px text-sm font-bold text-white`}>Favorite</span>
                      <span className={`${props.blockedFriend ? 'inline' : 'hidden'} bg-red-500 p-px text-sm font-bold text-white`}>Blocked</span>
                    </div>
                  </div>
                    <div className='flex items-center'>
                      <Link to={`/friends/${chatRoomData?._id ? chatRoomData?._id : receiverId}`}>
                        <div className='dark:bg-gray-700 cursor-pointer invisible group-hover/item:visible w-fit h-fit p-2 flex hover:bg-slate-300 rounded-full items-center' onClick={() => dispatch(startChatWithUser({senderId, receiverId}))}>
                          <span>Chat</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="black" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </div>
                      </Link>
                      <div className='cursor-pointer invisible group-hover/item:visible'
                      onClick={() => setFriendSideBarOpen(!friendSideBarOpen)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="black" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className={`p-1 absolute -right-2 duration-500 ${friendSideBarOpen ? 'scale-100' : 'scale-0'} top-0 bg-white w-fit h-20 shadow-xl rounded-2xl flex flex-col items-center justify-between dark:bg-dark-gray`}>
        <div className='group/delete cursor-pointer' 
        onClick={() => dispatch(openDeletePopup({open: true, receiver: props}))}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6">
              <path className="group-hover/delete:stroke-teal-400" strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
        </div>
        <div className='group/fav cursor-pointer'
        onClick={handleFavorite}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill={`${props.favoriteFriend ? 'pink' : 'none'}`} viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${props.favoriteFriend ? 'pink' : 'gray'}`} className="w-5 h-5">
            <path className="group-hover/fav:stroke-teal-400" strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
        <div className='group/block cursor-pointer'
        onClick={handleBlocked}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={`${props.blockedFriend ? 'red' : 'gray'}`} className="w-5 h-5">
            <path className="group-hover/block:stroke-teal-400" strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </div>
    </div>
    </div>
  )
}

export default ContactsProfile