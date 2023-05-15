// import React, {useState} from 'react'
// import Picture2 from '../assets/5645.jpeg'
// import Picture3 from '../assets/123.jpg'
// import Picture4 from '../assets/123456.jpeg'
// import { ProfileAvatar } from './buttons/PhotoCircleButtons'
// import { FacebookButton, InstaButton, TwitterButton } from './buttons/Buttons'

// const Profile = () => {
//   const [isOpen , setIsOpen] = useState()
//   if (!isOpen) {
//       return null
//   }
//   return (
//     <div className='w-3/12 h-full bg-gray-100 flex flex-col shadow-inner'>
//       <div className='h-3/6 w-full border-b-2 border-slate-200 border-solid flex flex-col items-center gap-4 mt-7'>
//           <ProfileAvatar/>
//           <div className='flex flex-col justify-center items-center'>
//           <h2 className='font-bold'>Steve Williams</h2>
//           <p className='text-gray-400'>Paris, France</p>
//           </div>
//           <div className='flex flex-col justify-center items-center w-10/12'>
//           <p>Help people to build websites and apps + grow awareness in social media</p>
//           </div>
//           <div className='flex justify-center items-center gap-5'>
//             <FacebookButton/>
//             <TwitterButton/>
//             <InstaButton/>
//           </div>
//       </div>
//       <div className='h-1/4 border-b-2 border-slate-200 border-solid flex flex-col justify-center ml-6 gap-3'>
//         <div className='flex gap-1'>
//           <h2 className='text-gray-400'>Phone:</h2>
//           <p>+(33) 12345678</p>
//         </div>
//         <div className='flex gap-1'>
//           <h2 className='text-gray-400'>Email:</h2>
//           <p>kiaro3@yandex.ru</p>
//         </div>
//       </div>
//       <div className='h-2/6 w-full flex items-center flex-col gap-4'>
//         <div className='flex justify-between w-full pl-6 pr-10 mt-5'>
//           <h2 className='text-gray-400'>Media (30)</h2>
//           <h2 className='relative text-green-500 cursor-pointer after:block after:w-3 after:h-px after:bg-green-300 after:absolute after:left-12 after:bottom-3.5 after:rotate-[30deg]
//           before:block before:w-3 before:h-px before:bg-green-300 before:absolute before:left-12 before:top-3.5 before:rotate-[-30deg]'>See all</h2>
//         </div>
//         <div className='w-10/12 bg-gray-400 h-2/5 flex gap-px cursor-pointer'>
//           <div className='h-full w-2/6'>
//             <img src={Picture2} alt="" className='h-full w-full'/>
//           </div>
//           <div className='h-full w-2/6'>
//             <img src={Picture3} alt="" className='h-full w-full'/>
//           </div>
//           <div className='h-full w-2/6'>
//             <img src={Picture4} alt="" className='h-full w-full'/>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile