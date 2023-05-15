import { userModel } from "../model/userModel.js"
import bcrypt from 'bcrypt'
import { userFriendsModel } from "../model/userFriendsModel.js"

class userService {
    signup = async ({name, email, psw}) => {
        try {
            const existUserByEmail = await userModel.findOne({email})
            if(existUserByEmail) {
                throw new Error ('User email has already exist')
            }
            const existUserByName = await userModel.findOne({name})
            if(existUserByName) {
                throw new Error ('User name has already exist')
            }
            const hashPsw = await bcrypt.hash(psw, 10)
            const newUser = await userModel.create({name, email, psw: hashPsw, online: true})
            const userWithoutPsw = {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                online: newUser.online
            }
            return userWithoutPsw   
        } catch (error) {
            throw new Error(error.message)
        }
    }
    login = async ({email,psw}) => {
        try {
            const existUser = await userModel.findOne({email})
        if (!existUser) {
            throw new Error ('Email has not found')
        }
        const validePsw = await bcrypt.compare(psw, existUser.psw)
        if (!validePsw) {
            throw new Error ('Password is not correct. Try again.')
        }
        existUser.online = true
        await existUser.save()
        
        const loggedUser = {
             id: existUser._id,
             name: existUser.name,
             email: existUser.email,
             online: existUser.online
        }
        return loggedUser
        } catch (error) {
            throw new Error(error.message)
        }
    }
    addFriend = async ({sender, requester}) => {
        try {
            const searchedToAddUser = await userModel.findById(requester)
            if (!searchedToAddUser) {
                throw new Error ('User has not found. Try again.')
            }
            const userWithoutPsw = {
                id: searchedToAddUser._id,
                name: searchedToAddUser.name,
                email: searchedToAddUser.email,
                online: searchedToAddUser.online,
                lastVisited: searchedToAddUser.lastVisited
              };
            const userFriendModel = await userFriendsModel.findOne({userId: sender})
            if (userFriendModel) {
                const existFriend = userFriendModel?.friendsList?.find(el => el.id === userWithoutPsw.id.toString())
                if (existFriend) {
                    throw new Error ('Friend has already been added.')
                }
                await userFriendModel.friendsList.push(userWithoutPsw)
                await userFriendModel.save()
                return userWithoutPsw
            }
            else {
                const newUserFriend = await userFriendsModel.create({userId: sender, friendsList: [userWithoutPsw]})
                const populated = await newUserFriend.populate('friendsList','-psw')
                return userWithoutPsw
            }
        } catch (error) {
            throw new Error (error.message)
        }
    }
}
export default new userService()