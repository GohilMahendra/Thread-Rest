import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    members:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        unread_count:{
            type: mongoose.Schema.Types.Number,
            default:0
        }
    }]

},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

const Channel = mongoose.model("Channel",channelSchema)
export default Channel