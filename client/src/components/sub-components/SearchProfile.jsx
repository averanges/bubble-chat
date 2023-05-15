import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFriend } from '../../services/userService'
import { loggedUser } from '../../slices/authSlice'

const SearchProfile = ({props}) => {
    const img = null
    const dispatch = useDispatch()
    const user = useSelector(loggedUser)
    const addNewFriend = {
        sender: user.id,
        requester: props._id
    }
  return (
    <div className='w-full p-5 flex flex-col justify-around'>
        <div className='flex items-center gap-3'>
            <div className='rounded-full h-10 w-10 bg-gray-400 relative flex justify-center items-center cursor-pointer
            after:absolute after:top-1 after:left-0 after:bg-green-300 after:h-2 after:w-2 after:rounded-full after:block
            before:absolute before:top-0.5 before:-left-0.5 before:bg-white before:h-3 before:w-3 before:rounded-full before:block'>
            {
            img ? <img src={img} alt="" className='rounded-full w-full h-full'/>
            :
            <p className='text-2xl'>{props.name?.charAt(0).toUpperCase()}</p>
            }
            </div>
            <div className='w-5/6'>
                <div className='flex justify-between'>
                    <h2 className='font-bold'>{props.name}</h2>
                    <div className='rounded-full w-8 h-8 cursor-pointer flex justify-center items-center'
                    onClick={() => dispatch(addFriend(addNewFriend))}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 6v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchProfile