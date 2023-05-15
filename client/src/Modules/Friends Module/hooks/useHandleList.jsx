import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFriends } from "../../../services/userService"
import { loggedUser } from "../../../slices/authSlice"

const useHandleList = (e) => {
    const dispatch = useDispatch()
    const user = useSelector(loggedUser)
    const userId = user.id
    const [friendsLengthText,setFriendsLengthText] = useState('friends')

    const [activeListChoice, setActiveListChoice] = useState({
        friendsList: true,
        favoriteList: false,
        blockedList: false
      })
      const handleList = (e) => {
        const name = e.target.dataset.list
        setFriendsLengthText(e.target.dataset.text)
        setActiveListChoice(prevChoice => {
          const newObject = {}
         for (const [key, value] of Object.entries(prevChoice)){
            newObject[key] = key === name
         }
         return newObject
        })
        dispatch(getFriends({userId, name}))
      }
      return {activeListChoice, handleList, friendsLengthText}
}

export default useHandleList