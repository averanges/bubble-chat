import React from 'react'
import LoginSide from '../subComponents/LoginSide'
import RegistrationSide from '../subComponents/RegistrationSide'

const ChosenAuth = ({loginChoice}) => {
  return (
    <div className='h-full w-3/6 shadow-2xl p-10 bg-white rounded-r-2xl  flex flex-col gap-2 justify-around'>
        {loginChoice ? 
            <LoginSide/>
            :
            <RegistrationSide/>
        }
  </div>
  )
}

export default ChosenAuth