import mongoose from "mongoose";

const model = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    psw: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false
    },
    lastVisited: {
        type: Date
    }
})

export const userModel = mongoose.model('User', model)