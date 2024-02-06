import mongoose, { mongo } from "mongoose";
import { CustomRequest } from "../middlewares/jwtTokenAuth";
import Message from "../models/Message";
import { Response } from "express";
import { io  } from "../../index";
const sendMessage = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId
        const content = req.body.content
        const recieverId = req.params.recieverId
        const message = new Message({
            content: content,
            sender: new mongoose.Types.ObjectId(userId),
            reciever: new mongoose.Types.ObjectId(recieverId)
        })
        message.save()
        io.emit("newMessage",message)

        return res.status(201).json({
            message: "Message sent successFully"
        });
    }
    catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}

const getMessages = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.userId
        const otherUserId = req.params.otherUserId
        console.log("userId===>", userId, "Other user Id===>", otherUserId)
        const conversations = await Message.find({
            $or: [
                { sender: userId, reciever: otherUserId},
                { sender: otherUserId, receiver: userId }
            ]
        }).sort({ createdAt: 1 });
        console.log(conversations.length, "total messages found")
        return res.status(200).json({
            data: conversations
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err
        })
    }
}


export default {
    sendMessage,
    getMessages
}
