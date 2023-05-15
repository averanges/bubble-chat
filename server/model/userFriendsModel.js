import mongoose from "mongoose";

const model = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    } ,
    friendsList: [{
        id: {
            type: String
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        online: {
            type: Boolean,
            default: false
        },
        lastVisited: {
            type: Date
        },
        favoriteFriend: {
            type: Boolean,
            default: false
        },
        blockedFriend: {
            type: Boolean,
            default: false
        }
    }
],
})

export const userFriendsModel = mongoose.model('UserFriends', model)