import express from 'express'
import cors from "cors"
import mongoose from "mongoose"
import bodyparser from "body-parser"
import UserRoutes from "./src/routes/UserRoutes"
import PostRoutes from "./src/routes/PostRoutes"
import FollowRoutes from "./src/routes/FollowRoutes"
import MessageRoutes from "./src/routes/MessageRoutes"
import dotenv from 'dotenv';
import { Server } from "socket.io";
import { createClient } from "redis";
import http from "http";
import { verifyToken } from './src/middlewares/jwtTokenAuth'
import Channel from './src/models/Channel'
import { TypingMessage } from './src/types/Message'
import { SocketEmitEvent, SocketSubscribeEvent } from './src/utilities/Constants'
dotenv.config()
const app = express()
const port = 3000

app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

mongoose.connect(process.env.MONGO_URL || "")
  .then(() => {
    console.log("connected mongo db")
  })
  .catch((err) => {
    console.log("error with connecttion", err)
  })

const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


type UserSocket =
  {
    socketId: string,
    userId: string,
  }
type ActiveConversations =
  {
    userId: string,
    recieverId: string
  }

type UserCallSocket =
  {
    receiverId: string,
    senderImage: string,
    senderId: string,
    senderName: string,
  }

export const usersMap = new Map<string, UserSocket>();
export const activeConversations = new Map<String, ActiveConversations>()
export const activeCalls = new Map<string,UserCallSocket>()
io.on('connection', async (socket) => {

  const decodedToken = verifyToken(socket.handshake.auth.token)
  const userId = decodedToken.userId

  if (userId && !usersMap.has(userId)) {
    usersMap.set(userId, {
      userId: userId,
      socketId: socket.id
    })
  }

  socket.on(SocketSubscribeEvent.USER_CONVERSATION, (recieverId: string) => {
    if (userId) {
      activeConversations.set(userId, {
        recieverId: recieverId,
        userId: userId
      })
    }

  })

  socket.on(SocketSubscribeEvent.LEAVE_ACTIVE_CONVERSATION, () => {
    if (userId)
      activeConversations.delete(userId)
  })

  socket.on(SocketSubscribeEvent.TYPE_EVENT, (Typing: TypingMessage) => {
    if (userId && activeConversations.has(userId)) {
      const currentActiveConversation = activeConversations.get(userId)
      if (!currentActiveConversation)
        return
      const recieverId = currentActiveConversation.recieverId
      const currentActiveReciever = usersMap.get(recieverId)
      if (!currentActiveReciever)
        return
      socket.to(currentActiveReciever.socketId).emit(SocketEmitEvent.ON_TYPE_EVENT, {
        userId: userId,
        typing: Typing
      });
    }
  })

  socket.on("send-call",(obj)=>{

    console.log(obj,"from sender")
    const receiverId = obj.userId
    const senderName = obj.senderName   
    const senderImage = obj.senderImage 

    if(!userId || !usersMap.has(receiverId) || activeCalls.has(userId) || activeCalls.has(receiverId))
    return

    const receiverSocket = usersMap.get(receiverId)!.socketId
    activeCalls.set(userId,{
      receiverId: receiverId,
      senderId: userId,
      senderName: senderName,
      senderImage: senderImage
    })

    activeCalls.set(receiverId,{
      receiverId: receiverId,
      senderId: userId,
      senderName: senderName,
      senderImage: senderImage
    })

    socket.to(receiverSocket).emit("call-offer",{
      senderId: userId,
      senderName: senderName,
      senderImage: senderImage
    })

  })

  socket.on("hang-up",()=>{
    if(!userId || !usersMap.has(userId))
    return

    const callRoom = activeCalls.get(userId)
    if(!callRoom)
    return

    if(activeCalls.has(callRoom.receiverId))
    activeCalls.delete(callRoom.receiverId)

    if(activeCalls.has(callRoom.senderId))
    activeCalls.delete(callRoom.senderId)

    const userSocket = usersMap.get(callRoom.senderId)!.socketId
    const receiverSocket = usersMap.get(callRoom.receiverId)!.socketId

    socket.to(userSocket).emit("call-ended")
    socket.to(receiverSocket).emit("call-ended")

    console.log(activeCalls,"scene after call hangsup")
  })

  socket.on('connect', async () => {
    console.log("connected wuth socket", socket.id)
  });


  socket.on('disconnect', () => {
    if (userId && usersMap.has(userId)) {
      usersMap.delete(userId);
      activeConversations.delete(userId)
    }
  })

});

server.listen(port, () => {
  console.log("server is running on", port)
})

app.use("/", UserRoutes)
app.use("/posts", PostRoutes)
app.use("/followers", FollowRoutes)
app.use("/messages", MessageRoutes)
