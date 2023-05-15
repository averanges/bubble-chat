import express from 'express'
import userController from '../controller/userController.js'

const userRouter = express.Router()

userRouter.get('/search-friends', userController.searchFriend)
userRouter.post('/add-friends', userController.addFriend)
userRouter.get('/get-friends', userController.getFriends)
userRouter.post('/delete-friend', userController.deleteFriend)
userRouter.post('/favorite-list', userController.addToFavoriteList)
userRouter.post('/block-list', userController.addToBlockList)
userRouter.get('/search-chat', userController.searchChat)
userRouter.get('/search-added-friends', userController.searchAddedFriends)

export default userRouter