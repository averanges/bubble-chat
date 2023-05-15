import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startChatWithUser } from '../../../services/userService'
import { loggedUser } from '../../../slices/authSlice'
import { dateCount } from '../../../helpers/dateCount'

const MessageChat = ({img, receiver, lastMessage, time, chatRoomDataId, messages, lastVisited}) => {
  const date = dateCount(time)
  const user = useSelector(loggedUser)
  const senderId = user.id
  const receiverId = receiver?._id
  const dispatch = useDispatch()
  const lastVisitedTime = new Date(lastVisited).getTime()
  const unreadMessages = messages?.filter(el => el.sender !== senderId)
  .filter(el => new Date(el.timestamp).getTime() > lastVisitedTime)
  const openNewChat =  () => {
     dispatch(startChatWithUser({senderId, receiverId}))
  }
  return (
    <Link to={`/chat/${chatRoomDataId}`}>
    <div className={`p-5 hover:dark:bg-gray-500 flex flex-col justify-around cursor-pointer hover:bg-slate-200 hover:rounded-xl hover:opacity-80 duration-500 
    ${unreadMessages?.length && 'border-[1px] border-solid border-teal-400 shadow-lg'} `}
    onClick={openNewChat}
    >
        <div className='flex items-center gap-3'>
            <div className={`rounded-full h-10 w-10 min-h-[2.5rem] min-w-[2.5rem]  bg-gray-400 relative flex justify-center items-center
            after:absolute after:top-1 after:left-0  ${receiver?.online ? 'after:bg-green-300' : 'after:bg-gray-300'} after:h-2 after:w-2 after:rounded-full after:block
            before:absolute before:top-0.5 before:-left-0.5 before:bg-white before:h-3 before:w-3 before:rounded-full before:block z-0`}>
            {
            img ? <img src={img} alt="" className='rounded-full w-full h-full'/>
            :
            <p className='text-2xl'>{receiver?.name?.charAt(0).toUpperCase()}</p>
            }
            </div>
            <div className='w-5/6'>
            <div className='flex justify-between'>
                <h2 className='font-bold'>{receiver?.name}</h2>
                <p className='text-gray-400'>{date}</p>
            </div>
            <div className='w-full h-full flex gap-3'>
              <p>{lastMessage.length <= 15 ? lastMessage : lastMessage.split('').slice(0,15).join('') + '...'}</p>
              {unreadMessages?.length ? 
              <span className='pl-2 pr-2 max-h-[1.5rem] max-w-[2rem] bg-teal-400 opacity-70 rounded-full flex justify-center items-center text-white'>
                {unreadMessages.length}
                </span>
                :
                null
                  }
            </div>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default MessageChat