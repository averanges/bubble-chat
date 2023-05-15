import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedIn, loggedUser } from '../slices/authSlice'
import { fetchMessages, selectedToChat, switchPage } from '../slices/userSlice'
import socket from '../socket'
import { ChatReceiverAvatar } from '../components/buttons/PhotoCircleButtons'
import ChatWindowMessages from '../components/sub-components/ChatWindowMessages'
import { onlyHourMinutes } from '../helpers/dateCount'
import { Link } from 'react-router-dom'

const SingleChat = () => {
  const isAuthenticated = useSelector(isLoggedIn)
  const mobileChat = useSelector(state => state.user.mobileChat)
  const dispatch = useDispatch()
  const [newMessage, setNewMessage] = useState('')
  const chatRoomData = useSelector(state => state.user.chatRoom)
  const [isEdited, setIsEdited] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteMessageData, setDeleteMessageData] = useState(null)
  const enteredUser = useSelector(loggedUser)
  const selectedReciever = useSelector(selectedToChat)
  const scrollContainer = useRef()
  const [messageId, setMessageId] = useState(null)
  const chatRoomId = chatRoomData?._id
  const toScrollDiv = useRef()
  const scrollToBottom = () => {
    toScrollDiv.current?.scrollIntoView()
  }
  useLayoutEffect(() => {
    scrollToBottom()
  }, [chatRoomData]);
  const data = {chatRoomId, content: newMessage,
     selectedReciever: selectedReciever, sender: enteredUser}
  const handleSendMessage = (e) => {
    e.preventDefault()
    if(selectedReciever?.blocked) {
      return
    }
    if(data.content === ''){ 
      return
    }
    if(isEdited) {
      socket.emit('edit-messages', {messageId, content: newMessage, chatRoomId})
      setNewMessage('')
      setIsEdited(false)
      setMessageId(null)
      return
    }
    socket.emit('send-message', data)
    setNewMessage('')
  }
  const deleteMessage = () => {
    socket.emit('delete-message', deleteMessageData)
    setIsDeleting(false)
  }
  const date = onlyHourMinutes(selectedReciever?.lastVisited)
  
  useEffect(() => {
    socket.on('get-messages', (chatRoom) => {
      dispatch(fetchMessages(chatRoom))
      });
    return () => {
      socket.off('get-messages');
    };
  }, [dispatch]);


       const messages = chatRoomData?.messages?.map(el => <ChatWindowMessages  messageId={el._id} setIsEdited={setIsEdited} 
        setMessageId={setMessageId} chatRoomId={chatRoomId} messageHasDeleted={el.deletedMessage && el.deletedMessage} receiverName = {selectedReciever.name}
        setNewMessage={setNewMessage} isEdited={isEdited} setIsDeleting={setIsDeleting} isDeleting={isDeleting} deleteMessage={deleteMessage}
        key={el._id ? el._id : 1} messages={el.content} online={selectedReciever.online} time={el.timestamp} sender={el.sender} setDeleteMessageData={setDeleteMessageData}/>)
    
       if(!isAuthenticated || !enteredUser){
        return <Navigate to='/login'/>
      }
  return (
    <>  
          <div className='py-2 lg:h-[12%] w-full bg-white pl-2 pr-2 md:pl-10 z-[1] md:pr-10 fixed shadow-sm items-center border-b-2 border-slate-200 border-solid dark:bg-side-dark dark:text-white dark:border-dark-gray'>
          <div className='w-full h-full flex bg-white opacity-100 gap-4 dark:bg-side-dark'>
          <div className={`block lg:hidden cursor-pointer`} 
          onClick={() => dispatch(switchPage())}
          >
            <Link to='/chat'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>
          </div>
          <div className='flex items-center gap-3'>
                <ChatReceiverAvatar online={selectedReciever?.online} name={selectedReciever?.name}/>
              <div>
                <h2 className='font-bold'>{selectedReciever?.name}</h2>
              <div className='flex w-full gap-6'>
                
               {selectedReciever?.blocked ? <p className='text-red-500'>You were blocked.</p> 
               : selectedReciever?.online ? <p className='text-gray-400 font-cursive'>Online</p>
                : 
                <p className='text-gray-400'>{`Last seen at ${date}`}</p>}
              </div>
              </div>
          </div>
          { isDeleting ? 
     <div className=' gap-2 flex w-fit h-fit'>
        <span className="flex justify-center ml-2 mr-2 items-center before:block before:absolute before:-inset-1 before:-skew-y-3 before:opacity-50 before:bg-red-700 relative w-fit">
          <span className="relative text-white font-bold text-sm">Message delete </span>
        </span>
          <span className='text-red-700 font-semibold text-sm underline cursor-pointer'
          onClick={deleteMessage}
          >Confirm</span>
          <span className='text-red-700 font-semibold text-sm underline cursor-pointer'
          onClick={() => setIsDeleting(false)}
          >Cancel</span>
        </div>
        :
        null }
        </div>
      </div>
        <div ref={scrollContainer} className='w-full h-screen lg:h-[86%] pb-12 pt-20 flex flex-col gap-6 lg:pt-5 pr-2 
        pl-2 md:pl-7 md:pr-7 lg:pl-14 lg:pr-14 overflow-y-auto scrollbar-thumb-black dark:border-dark-gray scrollbar-hidden'>
          {messages}
         <div className='scale-0' ref={toScrollDiv}></div>
        </div>
        <div className='min-h-[3rem] h-fit z-10 w-full bg-white bottom-0 border-t-2 border-slate-200 border-solid
        left-0 shadow-xl  fixed lg:static justify-center dark:bg-side-dark dark:text-white py-2 dark:border-dark-gray'>
          <form className='w-full md:4/6 h-full lg:mt-0 lg:h-3/5 relative flex justify-center items-center'
          >
          <input type="text" className=' min-h-[2.5rem] lg:h-5/6 w-4/6 rounded-full bg-gray-200 pl-4 focus:outline-teal-300 dark:bg-dark-gray' 
          placeholder='Type a message here...'
          onChange={(e) =>  setNewMessage(e.target.value)}
          value={newMessage}/>
         <button className='rounded-full min-h-[3rem] min-w-[3rem] lg:min-h-[4rem] lg:min-w-[4rem] bg-green-400 ml-5 cursor-pointer flex justify-center items-center hover:bg-green-700 dark:bg-green-700 hover:dark:opacity-70'
          onClick={(e) => handleSendMessage(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="rgba(255,252,252,1)"/></svg>
          </button>
          </form>
        </div>
        </>
  )
}

export default SingleChat