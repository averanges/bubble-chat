import React, {useEffect, useState} from 'react'
import { Avatar } from '../buttons/PhotoCircleButtons'
import { useSelector } from 'react-redux'
import { loggedUser } from '../../slices/authSlice'
import { onlyHourMinutes } from '../../helpers/dateCount'
import socket from '../../socket'

const ChatWindowMessages = ({isDeleting, messageId, setMessageId, setIsEdited, messageHasDeleted, receiverName,
   setNewMessage, sender, online, messages, time, isEdited, setIsDeleting, chatRoomId, setDeleteMessageData}) => {
  const [clickedMessage, setClickedMessage] = useState(false)
  const [editingText, setEditingText] = useState(false)
  const [messageDeleting, setMessageDeleting] = useState(false)
  const user = useSelector(loggedUser)
  const sendTime = onlyHourMinutes(time)
  const img = null
  const editMessage = () => {
    setMessageId(messageId)
    setIsEdited(true)
    setEditingText(true)
    setNewMessage(messages)
  }
  const closeEditMessage = () => {
    setMessageId(null)
    setIsEdited(false)
    setEditingText(false)
    setNewMessage('')
  }
  const handleMessageDelete = (payload) => {
    setIsDeleting(payload)
    setMessageDeleting(payload)
    setDeleteMessageData({messageId, chatRoomId})
  }
  const handleClickMessage = () => {
    if (editingText || messageDeleting || isEdited || isDeleting || messageHasDeleted) {
      return
    }
      setClickedMessage(!clickedMessage)
  }
  useEffect(() => {
    socket.on('get-messageId', editedMessageId => {
      if (messageId === editedMessageId){
        setEditingText(isEdited)
      }
    })
  }, [isEdited])
  useEffect(() => {
    isDeleting === false && setMessageDeleting(false)
  }, [isDeleting])
  if(user.id !== sender) {
    return (
      <div className={`flex h-fit w-full gap-2`}
      >
            <div className='rounded-full h-14 w-14 border mt-5 flex justify-center items-center border-gray-400 hover:border-teal-300 duration-500'>
       <div className={`rounded-full h-10 w-10 bg-gray-400 relative cursor-pointer
               after:absolute after:top-0.5 after:left-0.5 ${online ? 'after:bg-green-300' : 'after:bg-gray-300'} after:h-2 after:w-2 after:rounded-full after:block
               before:absolute before:top-0 before:left-0 before:bg-white before:h-3 before:w-3 before:rounded-full before:block`}>
              {
            img ? <img src={img} alt="" className='rounded-full w-full h-full'/>
            :
            <p className='text-2xl w-full h-full flex justify-center items-center'>{receiverName?.charAt(0)?.toUpperCase()}</p>
            }
       </div>
       </div>
           <div className='flex flex-col'>
             <div className='shadow-lg rounded-full font-bold h-fit flex justify-center items-center pl-3 pr-3 pt-2 pb-2 w-fit dark:bg-chat-dark'>
                {messages ? messages : null}
              </div>
              <div className='flex relative justify-start pl-2 gap-2'>
                <p className='text-gray-400'>{sendTime ?? null}</p>
              </div>
           </div>
         </div>
    )
  }
  return (
    <>
      <div className={`relative flex h-fit w-full justify-end cursor-pointer ${messageDeleting ? 'bg-red-300' : ''} ${(clickedMessage && !isEdited) || editingText ? 'bg-slate-200 dark:bg-gray-600' : ''}`}
      onClick={handleClickMessage}  
      >
         <div  className='flex flex-col items-end'>
           <div className='shadow-lg rounded-full bg-green-300 text-white font-bold h-fit pl-3 pr-3 pt-2 pb-2 w-fit dark:bg-green-700'>
              {messages}
            </div>
             <div className='flex relative justify-end pr-2 gap-2 '>
               <div className={`p-1 dark:bg-dark-gray gap-2 duration-500 ${clickedMessage && !editingText && !isEdited ? 'scale-100' : 'scale-0'} bg-white w-fit h-fit shadow-xl rounded-2xl flex items-center justify-between`}>
                <div className='group/edit cursor-pointer'
                onClick={editMessage}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-5 h-5">
                      <path className="group-hover/edit:stroke-teal-400" strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </div>  
                  <div className='group/delete cursor-pointer' 
                  onClick={() => handleMessageDelete(true)}
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-5 h-5">
                        <path className="group-hover/delete:stroke-teal-400" strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                  </div>
              </div>
              {editingText ? <div className='flex items-center '>
                <div className='group/closeEdit cursor-pointer'
                onClick={closeEditMessage}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-5 h-5">
                      <path className="group-hover/closeEdit:stroke-teal-400" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div> 
                  <p>editing...</p> 
                  </div> 
                  : null}
              <p className='text-gray-400'>{sendTime}</p>
             </div>
         </div>
         <div className='lg:flex rounded-full h-14 w-14 min-h-[3.5rem] min-w-[3.5rem] border mt-5 flex justify-center items-center border-gray-400 hover:border-teal-300 duration-500'>
        <div className={`rounded-full h-10 min-h-[2.5rem] min-w-[2.5rem] w-10 bg-gray-400 relative cursor-pointer
                after:absolute after:top-0.5 after:left-0.5 ${online ? 'after:bg-green-300' : 'after:bg-gray-300'} after:h-2 after:w-2 after:rounded-full after:block
                before:absolute before:top-0 before:left-0 before:bg-white before:h-3 before:w-3 before:rounded-full before:block`}>
            {
            img ? <img src={props?.img} alt="" className='rounded-full w-full h-full'/>
            :
            <p className='text-2xl flex justify-center items-center pt-1 dark:text-white'>{user?.name?.charAt(0)?.toUpperCase()}</p>
            }
        </div>
    </div>
       </div>
      </>
  )
}

export default ChatWindowMessages