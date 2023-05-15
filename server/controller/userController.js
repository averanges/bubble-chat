import { chatRoomModel } from "../model/chatRoomModel.js"
import { userFriendsModel } from "../model/userFriendsModel.js"
import { userModel } from "../model/userModel.js"
import userService from "../service/userService.js"

class userController {
    searchFriend = async (req, res) => {
        try {
            const {user, searchFriendValue} = req.query
            const {name, email} = searchFriendValue
            if (name === '' || email === '') {
                return res.json([])
            }
            if (name || email) {
                const regex = new RegExp(name || email, 'i')
                const users = await userModel.find({
                    $and: [
                        {
                          $or: [
                            { name: { $regex: regex } },
                            { email: { $regex: regex } },
                          ]
                        },
                        {
                          $or: [
                            { name: { $ne: user.name } },
                            { email: { $ne: user.email } },
                          ]
                        }
                      ]
                    })
            return res.json(users)
            }
        } catch (error) {
           res.json(error.message) 
        }
    }
    addFriend = async (req, res) => {
        try {
            const data = req.body
            const addedUser = await userService.addFriend(data)
            return res.json(addedUser)
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }
    getFriends = async (req, res) => {
        try {
            const {userId, name} = req.query
            const userFriendsList = await userFriendsModel.findOne({userId: userId})
            if (name === 'favoriteList') {
              const favoriteList = userFriendsList.friendsList.filter(el => el.favoriteFriend === true)
              return res.json(favoriteList)
            }
            if (name === 'blockedList') {
              const blockedList = userFriendsList.friendsList.filter(el => el.blockedFriend === true)
              return res.json(blockedList)
            }
            return res.json(userFriendsList.friendsList)
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }
    deleteFriend = async (req, res) => {
      try {
        const {senderId, receiverId} = req.body
        const senderFriends = await userFriendsModel.findOne({userId: senderId}).populate('friendsList','-psw')
        senderFriends.friendsList = senderFriends.friendsList.filter(el => !el._id.equals(receiverId))
        await senderFriends.save()
        return res.json(senderFriends.friendsList)
      } catch (error) {
        return res.status(400).json({error: error.message})
      }
    }
    addToFavoriteList = async (req, res) => {
      try {
        const {senderId, receiverId} = req.body
        const previousFriendsModel = await userFriendsModel.findOne({userId: senderId})
        const existFriend = previousFriendsModel?.friendsList?.find(el => el.id === receiverId)
        if (existFriend) {
          existFriend.favoriteFriend === true ? existFriend.favoriteFriend = false : existFriend.favoriteFriend = true
          await previousFriendsModel.save()
          return res.json(previousFriendsModel.friendsList)
        }
        else if (!existFriend) {
          throw new Error ('User has not found. Internal error. Please refresh page.')
        }
      } catch (error) {
        return res.status(400).json({error: error.message})
      }
    }
    addToBlockList = async (req, res) => {
        try {
          const {senderId, receiverId} = req.body
          const previousFriendsModel = await userFriendsModel.findOne({userId: senderId})
          const existFriend = previousFriendsModel?.friendsList?.find(el => el.id === receiverId)
          if (existFriend) {
            existFriend.blockedFriend === true ? existFriend.blockedFriend = false : existFriend.blockedFriend = true
            await previousFriendsModel.save()
            return res.json(previousFriendsModel.friendsList)
          }
          else if (!existFriend) {
            throw new Error ('User has not found. Internal error. Please refresh page.')
          }
        } catch (error) {
          return res.status(400).json({error: error.message})
        }
    }
    searchChat = async (req, res) => {
      try {
          const {user, search} = req.query
          const userChats = await chatRoomModel.find({ users: { $in: [ user.id ]  } })
          .populate('messages').populate('users', '-psw').populate('lastMessage')
          const chatRooms = userChats?.filter(el=> el.users.find(el=> el.name.includes(search)))
          return res.json(chatRooms)
      } catch (error) {
         res.json(error.message) 
      }
  }
  searchAddedFriends = async (req, res) => {
    try {
        const {user, search} = req.query
        const userFriends= await chatRoomModel.findOne({userId: user.id})
        .populate('messages').populate('users', '-psw').populate('lastMessage')
        console.log(userFriends)
        const userFriendsList = userFriends?.friendsList.filter(el=> el.name.includes(search))
        return res.json(userFriendsList)
    } catch (error) {
       res.json(error.message) 
    }
}
  }

export default new userController()