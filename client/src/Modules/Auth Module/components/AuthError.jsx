import React from 'react'
import { useSelector } from 'react-redux'
import { errorMessage } from '../../../slices/authSlice'

const AuthError = () => {
    const userErrorText = useSelector(errorMessage)
    if(!userErrorText) {
        return null
    }
  return (
    <div className='bg-white w-fit h-fit rounded-md shadow-2xl text-red-500 p-2'>
        <h2>{userErrorText}</h2>
    </div>
  )
}

export default AuthError