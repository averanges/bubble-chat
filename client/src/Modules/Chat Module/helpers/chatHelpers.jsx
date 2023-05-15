import { useSelector } from "react-redux"
import { loggedUser } from "../../../slices/authSlice"
import MessageChat from "../subComponents/MessageChat"

const useGetChats = () =>{
   const chatRoomData = useSelector(state => state.user.allChats)
   const user = useSelector(loggedUser)
   const contact = chatRoomData?.length && chatRoomData
  .map(el => {
    return { ...el,
      users: el.users.filter(el => el._id !== user.id)[0]
    }})

  const sortChatRoomData = contact?.length && contact?.map((el) => {
    return {
      ...el,
      lastUpdate: new Date(el.lastUpdate).getTime()
    }
  }).sort(((a,b) => b.lastUpdate - a.lastUpdate))
    .map((el) => {
    return {
      ...el,
      lastUpdate: new Date(el.lastUpdate).toISOString()
    }})
  const chats = sortChatRoomData?.length && sortChatRoomData?.map(el => 
    <MessageChat key={el._id} messages={el.messages} 
    receiver={el.users} lastMessage={el?.lastMessage?.content} 
    time={el.lastUpdate} chatRoomDataId={el._id} 
    lastVisited={el.lastVisitedByUser?.find(el => el.userId === user.id)?.lastOpen }/>)
    
    return chats
}

export default useGetChats