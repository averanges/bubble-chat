import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFriend } from '../../services/userService'
import { loggedUser } from '../../slices/authSlice'
import { openDeletePopup } from '../../slices/popupSlice'

const ConfirmDeletePopup = () => {
    const dispatch = useDispatch()
    const sender = useSelector(loggedUser)
    const confirmDeleteUser = useSelector(state=> state.popup.deleteFriendPopup)
    const senderId = sender.id
    const receiverId = confirmDeleteUser.receiver._id
    const capitalizeLetter = confirmDeleteUser.receiver.name.charAt(0).toUpperCase()
    const restNamePart = confirmDeleteUser.receiver.name.split('').slice(1).join('')
    const blurDiv = useRef()
    const popupCloseButton = useRef()
    const popupCloseRef = useRef()
    const backRef = useRef()
    const handleClosePopup = (e) => {
        if(blurDiv.current === e.target)
        dispatch(openDeletePopup({open: false, receiver: null}))
        if(e.target === popupCloseButton.current){
            dispatch(openDeletePopup({open: false, receiver: null}))
            }
            if(e.target === popupCloseRef.current){
                dispatch(openDeletePopup({open: false, receiver: null}))
              }
              if(e.target === backRef.current){
                dispatch(openDeletePopup({open: false, receiver: null}))
              }
    }
   const handleDeleteUser = () => {
    dispatch(deleteFriend({senderId, receiverId}))
    dispatch(openDeletePopup({open: false, receiver: null}))
   }
  return (
        <div className='w-screen h-screen bg-[rgba(0,0,0,0.7)] absolute flex justify-center items-center z-10'
        onClick={(e) => handleClosePopup(e)}
        ref={blurDiv}
        >
        <div className='w-80 h-24 bg-white relative pt-2 flex flex-col items-center dark:bg-side-dark dark:text-white'>
            <div className='shadow-2xl border-2 border-[rgba(0,0,0,0.7)] rounded-full w-10 h-10 bg-white absolute -top-6 -right-6 flex justify-center items-center cursor-pointer dark:bg-side-dark'
            >
                <svg ref={popupCloseRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
           </div>
        <p className='flex'>Do you want to <span className="flex justify-center ml-2 mr-2 items-center before:block before:absolute before:-inset-1 before:-skew-y-3 before:opacity-50 before:bg-red-600 relative w-fit">
        <span className="relative text-white font-bold">delete </span>
        </span>user {capitalizeLetter + restNamePart}</p>
               <span>from your friends list?</span>
                <div className='flex gap-7 mt-2'>
                    <span onClick={handleDeleteUser}
                    className='cursor-pointer duration-300 border-b border-black hover:border-b hover:border-teal-400 hover:text-teal-500'>Confirm</span>
                    <span ref={backRef} 
                    className='cursor-pointer duration-300 border-b border-black  hover:border-b hover:border-teal-400 hover:text-teal-400'>Back</span>
                </div>
            </div>
        </div>
  )
}

export default ConfirmDeletePopup