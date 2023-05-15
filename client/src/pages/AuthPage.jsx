import React, { useState } from 'react'
import SelectAuth from '../Modules/Auth Module/components/SelectAuth'
import ChosenAuth from '../Modules/Auth Module/components/ChosenAuth'
import AuthError from '../Modules/Auth Module/components/AuthError'
import { isLoggedIn } from '../slices/authSlice'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import loginpic from '../assets/loginpic.jpg'
import logo from '../assets/logo.png'

const AuthPage = () => {
  const [loginChoice, setLoginChoice] = useState(true)
  const isUserLoggedIn = useSelector(isLoggedIn)
  if (isUserLoggedIn) {
    return <Navigate to='/chat'/>
  }
  return (
    <div className='w-screen h-screen bg-gradient-to-r from-rose-300 to-rose-500 flex flex-col justify-center items-center gap-2'>
      <AuthError/>
      <div className='flex rounded-2xl max-h-[50%]'>
        <div className='flex-1 h-full shadow-white shadow-md relative flex justify-center items-center'>
        <div className="bg-white bg-opacity-25 backdrop-filter backdrop-blur-md border border-white border-opacity-25 rounded-lg shadow-lg p-6 absolute w-4/6 h-4/6 flex flex-col justify-around">
          <h1 className='text-3xl uppercase tracking-widest font-semibold bg-gradient-to-r from-rose-300 to-white text-transparent bg-clip-text'>bubble chat</h1>
           {loginChoice ? 
            <div className='flex flex-col gap-2 text-white'>
              <p className='text-sm'>Don't have an account yet?</p>
              <span onClick={() => setLoginChoice(false)}
              className='font-semibold cursor-pointer hover:text-rose-200 duration-500'>Sign up</span>
            </div>
          :
            <div className='flex flex-col gap-2 text-white'>
              <p className='text-sm'>Already have an account?</p>
              <span onClick={() => setLoginChoice(true)}
              className='font-semibold cursor-pointer hover:text-rose-200 duration-500'>Sign in</span>
            </div>
          }
          {/* <img src={logo} alt="" /> */}
        </div>
          <img src='https://i.pinimg.com/564x/23/c4/ec/23c4ec04558cebe06fa98509931c8650.jpg' alt="" className='w-full rounded-l-xl h-full'/>
        </div>
       {/* <SelectAuth setLoginChoice={setLoginChoice}/>  */}
        <ChosenAuth loginChoice={loginChoice}/>
      </div>
    </div>
  )
}

export default AuthPage