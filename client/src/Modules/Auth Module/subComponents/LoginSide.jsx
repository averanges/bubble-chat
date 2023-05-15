import React from 'react'
import LoginForm from '../Forms/LoginForm'


const LoginSide = () => {
  return (
    <>
          <h2 className='relative font-bold text-2xl after:block after:w-7 after:h-1 after:bg-rose-300 after:absolute after:top-8 
          before:block before:w-3 before:h-1 before:bg-rose-300 before:absolute before:top-8 before:left-8'>Sign Into Your Account</h2>
          <LoginForm/>
        </>
  )
}

export default LoginSide