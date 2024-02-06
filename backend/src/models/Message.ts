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
    reciever:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

const Message = mongoose.model("Message",messageSchema)
export default Message 