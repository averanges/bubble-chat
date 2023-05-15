import mongoose from "mongoose";

const model = mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            select: '-psw',
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            select: '-roomId'
        }
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        select: '-roomId'
    },
    lastUpdate: {
        type: Date,
        default: Date.now()
    },
    lastVisitedByUser: [
        {
        userId: {
            type: String,
        },
        lastOpen: {
            type: Date,
            default: Date.now()
        }
    }
]
})

export const chatRoomModel = mongoose.model('ChatRoom', model)