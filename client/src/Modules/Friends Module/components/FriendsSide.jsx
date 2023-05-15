import React, { useEffect } from 'react'
import { addedFriends, clean, openAddFriendPopup } from '../../../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { loggedUser } from '../../../slices/authSlice'
import useHandleList from '../hooks/useHandleList'
import { SearchButton } from '../../../components/buttons/Buttons'
import { getFriends } from '../../../services/userService'
import ContactsProfile from '../../../components/sub-components/ContactsProfile'

const FriendsSide = () => {
    const mobileChat = useSelector(state => state.user.mobileChat)
    const dispatch = useDispatch()
    const user = useSelector(loggedUser)
    const userId = user.id
    const friendsList = useSelector(addedFriends)
    const {activeListChoice, handleList, friendsLengthText} = useHandleList()
    const organizedFriendsList = friendsList?.length ? friendsList?.map(el => 
        <ContactsProfile key={el.id} props={el}/>) : []

    useEffect(() => {
        dispatch(getFriends({userId, name: 'friendsList'}))
        return () => {
          dispatch(clean())
        }
      },[dispatch])
  return (
    <div className={`${!mobileChat ? 'block min-w-full' : 'hidden'} w-full lg:min-w-[32%] max-w-[32%] h-screen
    pt-2 md:flex bg-gray-50 h-full justify-center shadow-inner dark:bg-chat-dark dark:text-white `}>
        <div className='w-full pt-5 overflow-y-auto overflow-x-hidden h-full'>
        <div className='flex flex-col gap-7 border-b pl-5 dark:border-dark-gray'>
            <div className='flex items-center w-full justify-between'>
            <div>
                <h1 className='text-2xl font-semibold'>Contacts</h1>
                <p>{friendsList.length ? `You have ${friendsList.length} ${friendsLengthText} contacts` : ' No added contacts'}</p>
                </div>
                <button id='newOneMessage' className='duration-300 shadow-2xl mr-10 rounded-full bg-teal-500 opacity-70 h-8 w-8 hover:bg-white hover:before:bg-black hover:after:bg-black
                after:block after:w-3 after:h-0.5 after:bg-white after:translate-x-2.5 after:-translate-y-1/2
                before:block before:w-3 before:h-0.5 before:bg-white before:translate-x-2.5 before:rotate-90 before:translate-y-1/2'
                onClick={() => dispatch(openAddFriendPopup(true))}
                />

            </div>
            <div className='flex gap-4'>
                <p className={`dark:text-white relative ${activeListChoice.friendsList ? 'text-teal-300 dark:text-teal-500' : 'text-black'} ${activeListChoice.friendsList ? 'after:h-0.5 after:absolute after:block after:w-full after:bg-teal-300 dark:after:bg-teal-600' : 'text-black'} hover:text-teal-300 hover:dark:text-teal-600 duration-300 hover:after:absolute first-letter:hover:after:block hover:after:w-full hover:after:h-0.5 hover:after:bg-teal-300 hover:dark:after:bg-teal-600 cursor-pointer`}
                data-list='friendsList' data-text='friend' onClick={(e) => handleList(e)}
                >All</p>
                <p className={`dark:text-white relative ${activeListChoice.favoriteList ? 'text-teal-300 dark:text-teal-500' : 'text-black'} ${activeListChoice.favoriteList ? 'after:h-0.5 after:absolute after:block after:w-full after:bg-teal-300 dark:after:bg-teal-600' : 'text-black'} hover:text-teal-300 hover:dark:text-teal-600  duration-300 hover:after:absolute first-letter:hover:after:block hover:after:w-full hover:after:h-0.5 hover:after:bg-teal-300 hover:dark:after:bg-teal-600 cursor-pointer`}
                data-list='favoriteList'data-text='favorite' onClick={(e) => handleList(e)}
                >Favorites</p>
                <p className={`dark:text-white relative ${activeListChoice.blockedList ? 'text-teal-300 dark:text-teal-500' : 'text-black'} ${activeListChoice.blockedList ? 'after:h-0.5 after:absolute after:block after:w-full after:bg-teal-300 dark:after:bg-teal-600' : 'text-black'} hover:text-teal-300 hover:dark:text-teal-600 duration-300 hover:after:absolute first-letter:hover:after:block hover:after:w-full hover:after:h-0.5 hover:after:bg-teal-300 hover:dark:after:bg-teal-600 cursor-pointer`}
                data-list='blockedList' data-text='blocked' onClick={(e) => handleList(e)}
                >Blocked</p>
            </div>
            </div>
            <div className='relative h-10 w-full ml-5 mt-5 min-h-[2.5rem]'>
                <SearchButton/>
                <input type="search" placeholder='Search...' 
                className='h-full rounded-full bg-gray-200 w-10/12 pl-10 focus:outline-teal-300  dark:bg-dark-gray'/>
            </div>
            <div className='flex flex-col gap-2 mt-5 pl-5 pr-3 pb-14 md:max-lg:pl-0 md:max-lg:pr-0 bg-gray-50 dark:bg-chat-dark dark:text-white'>
            {organizedFriendsList}
            </div>
        </div>
    </div>
  )
}

export default FriendsSide