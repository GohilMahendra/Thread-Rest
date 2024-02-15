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
export const usersMap = new Map<string, UserSocket>();
export const activeConversations = new Map<String,ActiveConversations>()
io.on('connection', async (socket) => {

  const decodedToken = verifyToken(socket.handshake.auth.token)
  const userId = decodedToken.userId

  if (userId && !usersMap.has(userId)) {
    usersMap.set(userId, {
      userId: userId,
      socketId: socket.id
    })
  }

  socket.on("userConversation",(recieverId:string)=>{
    if(userId)
    {
      activeConversations.set(userId,{
        recieverId: recieverId,
        userId: userId
      })
    }
   
  })

  socket.on("leaveActiveConversation",()=>{
    if(userId)
    activeConversations.delete(userId)
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
