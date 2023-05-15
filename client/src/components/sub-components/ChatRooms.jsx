import React from 'react'
import MessageChat from './MessageChat'
import Picture1 from '../../assets/sfztn_boy_avatar_36.jpg'
import Picture2 from '../../assets/ke1.jpeg'
import Picture3 from '../../assets/343.jpeg'

const ChatRooms = () => {
  return (
    <div className='h-4/5 flex flex-col gap-2 ml-5 mr-5 md:max-lg:mr-0 md:max-lg:ml-0'> 
        <MessageChat img={Picture1} name='Donald Stinsky' lastMessage='Today is a great wether...'/>
        <MessageChat img={Picture2} name='Mario Kristiano' lastMessage='I`d like to buy this bike...'/>
        <MessageChat img={Picture3} name='Murad Zashevski' lastMessage='My mom would be...'/>
    </div>
  )
}

export default ChatRooms