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
export const users: UserSocket[] = []

io.on('connection', async (socket) => {

  const decodedToken = verifyToken(socket.handshake.auth.token)
  const userId = decodedToken.userId
  console.log(socket.id,userId)
  if (userId && users.findIndex(user => user.userId == userId) == -1)
  {
    console.log(userId,"is connectiting with socet")
    users.push({
      socketId: socket.id,
      userId: userId
    })
  }
  // Handle socket events here
  socket.on('connect', async () => {
    console.log("connected wuth socjet",socket.id)
    if (userId && users.findIndex(user => user.userId == userId) == -1)
      {
        console.log(userId,"is connectiting with socet")
        users.push({
          socketId: socket.id,
          userId: userId
        })
      }
  });


  socket.on('disconnect', () => {
    const index = users.findIndex(user => user.userId == userId)
    if (index != -1)
      users.splice(index, 1)
  });

});

server.listen(port, () => {
  console.log("server is running on", port)
})

app.use("/", UserRoutes)
app.use("/posts", PostRoutes)
app.use("/followers", FollowRoutes)
app.use("/messages", MessageRoutes)
