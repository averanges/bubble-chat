import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { userFriendsModel } from './model/userFriendsModel.js'
import { messageModel } from './model/messageModel.js'
import { chatRoomModel } from './model/chatRoomModel.js'
import { userModel } from './model/userModel.js'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './router/authRouter.js'
import session from 'express-session'
import userRouter from './router/userRouter.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()

app.use(cors({
  credentials: true,
  origin: 'https://bubble-talks.vercel.app',
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    key: 'authSession',
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, 
      httpOnly: true
    },
}))
app.use('/auth', authRouter)
app.use('/user', userRouter)

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'https://bubble-talks.vercel.app',
    credentials: true
  }
})
export const connectedUsers = new Map()

const startServer = async () => {
    await mongoose.connect(process.env.MONGODB).then(() => console.log('Connect to db')).catch(err => console.log(err.message))
    io.on('connection', (socket) => {
      const socketUserId = socket.handshake.query.socketId ? socket.handshake.query.socketId : socket.id  
      socket.join(socketUserId)
        socket.on('setup', async (user) => {
          const userId = user.id
          connectedUsers.set(userId, socketUserId)
          const updateUserStatus = await userModel.findById(userId) 
          if(updateUserStatus && userId) {
            updateUserStatus.online = true
            await updateUserStatus.save()
          }
        })  
        socket.on('start-chat', async (data) => {
          const {senderId, receiverId} = data
          const chatRoom = await chatRoomModel.findOne ({
          users: {$all: [senderId, receiverId]}
          }).populate('messages').populate('users', '-psw')
          const userChatData = await userModel.findOne({_id:   receiverId})
          const receiver = {
            _id: userChatData._id,
            email: userChatData.email,
            name: userChatData.name,
            lastVisited: userChatData.lastVisited,
            online: userChatData.online
          }
          const receiverFriendsList = await userFriendsModel.findOne({userId: receiverId})
          const userWasBlocked = receiverFriendsList?.friendsList?.find(el => el.id === senderId)
          if (userWasBlocked?.blockedFriend === true) {
            const chatRoomData = ({receiver: {...receiver, blocked: true}})
            socket.emit('get-messages',chatRoomData)
            return 
          }
          let chatRoomData; 
          if (!chatRoom) {
          chatRoomData = ({receiver})
          }
          else {
          const updateLastVisitUser = chatRoom.lastVisitedByUser.find(el => el.userId === senderId)
          if (updateLastVisitUser) {
            updateLastVisitUser.lastOpen = Date.now()
            await chatRoom.save()
          }
          chatRoomData = ({receiver, chatRoom})
          }
          socket.emit('get-messages',chatRoomData)
          })
          socket.on('send-message', async (data) => {
            const {chatRoomId, sender, content, selectedReciever } = data
            const userId = sender.id
            const message = new messageModel({
              sender: sender.id,
              content
          })
            await message.save()
            if (chatRoomId) {
              socket.join(chatRoomId)
              const chatRoom = await chatRoomModel.findById(chatRoomId).populate('messages').populate('users', '-psw')
              await chatRoom.messages.push(message)
              chatRoom.lastMessage = message
              chatRoom.lastUpdate = Date.now()
              await chatRoom.save()
              io.to(chatRoomId).emit('get-messages', chatRoom)
              const chatRoomsReceiver = await chatRoomModel.find({ users: { $all: [ selectedReciever._id ]  } })
              .populate('messages').populate('users', '-psw').populate('lastMessage')
              const chatRoomsSender = await chatRoomModel.find({ users: { $all: [ userId ]  } })
              .populate('messages').populate('users', '-psw').populate('lastMessage')
              const senderSocketId = connectedUsers.get(userId)
              const requestSocketId = connectedUsers.get(selectedReciever._id)
              io.to(requestSocketId).emit('get-chats', chatRoomsReceiver)
              io.to(senderSocketId).emit('get-chats', chatRoomsSender)
            }
            else if (!chatRoomId) {
              const chatRoom = await chatRoomModel.create({users: [selectedReciever._id, sender.id], messages: [message._id]
              ,lastMessage: message._id, lastVisitedByUser: [{userId: sender.id}, {userId: selectedReciever._id}] })
              const populatedChatRoom = await chatRoomModel.findById(chatRoom._id).populate('messages').populate('users', '-psw')
              socket.join(chatRoom._id)
              io.to(chatRoom._id).emit('get-messages', populatedChatRoom)
            }
          })
          socket.on('requested-chats', async (userId) => {
            socket.join(socketUserId)
            const chatRooms = await chatRoomModel.find({ users: { $all: [ userId ]  } })
            .populate('messages').populate('users', '-psw').populate('lastMessage')
            const requestSocketId = connectedUsers.get(userId)
            const data = {requestSocketId, chatRooms}
            io.to(requestSocketId).emit('get-chats', data)
          })
          socket.on('edit-messages', async (data) => {
            const {messageId, content, chatRoomId} = data
            socket.join(chatRoomId)
            const userMessage = await messageModel.findOne({_id: messageId})
            userMessage.content = content
            await userMessage.save()
            const chatRoom = await chatRoomModel.findById(chatRoomId).populate('messages').populate('users', '-psw')
            io.to(chatRoomId).emit('get-messages', chatRoom)
            io.to(chatRoomId).emit('get-messageId', messageId)
          })
          socket.on('delete-message', async ({messageId, chatRoomId}) => {
            socket.join(chatRoomId)
            const userMessage = await messageModel.findOne({_id: messageId})
            userMessage.content = '{Message was deleted.}'
            userMessage.deletedMessage = true
            await userMessage.save()
            const chatRoom = await chatRoomModel.findById(chatRoomId).populate('messages').populate('users', '-psw')
            io.to(chatRoomId).emit('get-messages', chatRoom)
          })
           socket.on('logout', async (user) => {
            const userId = user?.id
            for (const [mapUserId, userSocketId] of connectedUsers.entries()) {
              if (mapUserId === userId){
                connectedUsers.delete(userId)
              }
            }
            const updateUserStatus = await userModel.findById(userId) 
            updateUserStatus.online = false
            updateUserStatus.lastVisited = Date.now()
            await updateUserStatus.save()
          })
    })
    server.listen(process.env.PORT, () => console.log('Server start'))
} 
startServer()