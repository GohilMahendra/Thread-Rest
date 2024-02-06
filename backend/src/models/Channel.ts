import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    lastMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]

},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

const Channel = mongoose.model("Channel",channelSchema)
export default Channel