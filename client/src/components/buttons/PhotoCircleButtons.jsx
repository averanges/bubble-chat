import React from 'react'
import { loggedUser } from '../../slices/authSlice'
import { useSelector } from 'react-redux'

export const Avatar = () => {
  const user = useSelector(loggedUser)
  const online = user.online
  const img = null
    return (
      <div className='hidden lg:flex rounded-full h-14 w-14 min-h-[3.5rem] min-w-[3.5rem] border mt-5 flex justify-center items-center border-gray-400 hover:border-teal-300 duration-500'>
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
    )
}

export const ChatReceiverAvatar = ({online, name}) => {
  const user = useSelector(loggedUser)
  const img = null
  return (
    <div className={`rounded-full h-12 w-12 lg:h-14 lg:w-14 bg-gray-400 relative cursor-pointer
            after:absolute after:top-1.5 after:left-1.5 ${online ? 'after:bg-green-300' : 'after:bg-gray-300'} after:h-2 after:w-2 lg:after:h-3 lg:after:w-3 after:rounded-full after:block
            before:absolute before:top-1 before:left-1 before:bg-white before:h-3 before:w-3 lg:before:h-4 lg:before:w-4 before:rounded-full before:block z-10`}>
            {
            img ? <img src={props?.img} alt="" className='rounded-full w-full h-full'/>
            :
            <p className='text-3xl lg:text-4xl w-full h-full flex justify-center items-center'>{name?.charAt(0)?.toUpperCase()}</p>
            }
    </div>
  )
}
export const ProfileAvatar = () => {
  return (
      <div className='rounded-full h-28 w-28 bg-gray-400 relative
            after:absolute after:top-4 after:left-2   after:bg-green-300 after:h-4 after:w-4 after:rounded-full after:block
            before:absolute before:top-3 before:left-1 before:bg-white before:h-6 before:w-6 before:rounded-full before:block z-10'>
           <img src={ProfilePicture} alt="" className='w-fit h-fit rounded-full'/>
      </div>
  )
}
