import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loggedUser } from '../slices/authSlice'
import { openWelcomeUserPopup } from '../slices/popupSlice'

const   ChatWindow = () => {
  const enteredUser = useSelector(loggedUser)
  const dispatch = useDispatch()
  const img = null
  return (
      <div className='flex items-center h-full flex-col gap-6 dark:bg-side-dark dark:text-white'>
              <div className='rounded-full h-28 w-28 border mt-5 flex justify-center items-center border-gray-400 hover:border-teal-300 duration-500'>
                <div className='rounded-full h-24 w-24 bg-gray-400 relative cursor-pointer
                  after:absolute'>
                          {
            img ? <img src={props?.img} alt="" className='rounded-full w-full h-full'/>
            :
            <p className='text-7xl w-full h-full flex justify-center items-center'>{enteredUser?.name?.charAt(0)?.toUpperCase()}</p>
            }
              </div>
          </div>
          <h2 className='text-lg font-bold'>Welcome, {enteredUser.name}!</h2>
          <p>Please choose a Chat Room.</p>
          <span className="flex items-center justify-center before:block before:absolute before:-inset-1 before:-skew-y-3 before:opacity-50 before:bg-teal-500 relative w-8">
            <p className='relative text-white font-bold'>or</p>
          </span>
          <button onClick={() => dispatch(openWelcomeUserPopup(true))}
          className='p-3 shadow-lg border w-fit flex justify-center items-center hover:bg-teal-300 transition duration-500'>
              <p>Start conversation!</p>
            </button>
      </div>
  )
}

// border-2 border-black border-dashed
export default ChatWindow