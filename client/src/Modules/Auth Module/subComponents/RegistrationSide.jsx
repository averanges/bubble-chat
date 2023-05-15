import React from 'react'
import RegistrationForm from '../Forms/RegistrationForm'

const RegistrationSide = () => {
 
  return (
    <>
          <h2 className='relative font-bold text-2xl after:block after:w-7 after:h-1 after:bg-rose-300 after:absolute after:top-8 px-4
          before:block before:w-3 before:h-1 before:bg-rose-300 before:absolute before:top-8 before:left-12'>Sign Up Your Account</h2>
          <RegistrationForm/>
        </>
  )
}

export default RegistrationSide