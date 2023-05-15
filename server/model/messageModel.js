import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    chatRoomId: {
        type: String,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        selected: '-psw',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    deletedMessage: {
        type: Boolean,
        default: false
    }
});

export const messageModel = mongoose.model('Message', messageSchema);
