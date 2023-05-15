import React from 'react'

const SelectAuth = ({setLoginChoice}) => {

  return (
    <div className='flex flex-col gap-1 h-full'>
        <button onClick={() => setLoginChoice(true)}  
        className='hover:bg-teal-300 transition duration-500 w-100 h-24 bg-white rounded-l-lg cursor-pointer shadow-lg flex justify-center items-center'>
            <h2 className='-rotate-90 font-bold'>Sign In</h2>
        </button>
        <button onClick={() => setLoginChoice(false)} 
        value='registration' 
        className='hover:bg-teal-300 transition duration-500 w-14 h-28 bg-white rounded-l-lg cursor-pointer shadow-lg flex justify-center items-center'>
            <h2 className='-rotate-90 font-bold'>Registration</h2>
        </button> 
    </div>
  )
}

export default SelectAuth