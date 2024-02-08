import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    channel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true
    },
    media: [{
        media_type: {
            type: String,
            required: true
        },
        media_url: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            default: null
        }
    }],
    content: {
        type: String,
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Message = mongoose.model("Message", messageSchema)
export default Message 