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
import { createClient  } from "redis";
import http from "http";
dotenv.config()
const app = express()
const port  = 3000

app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

mongoose.connect(process.env.MONGO_URL || "")
.then(()=>{
    console.log("connected mongo db")
})
.catch((err)=>{
    console.log("error with connecttion",err)
})

const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});



io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    // Handle socket events here
    socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
      });
  

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

    socket.on("joinChannel",(channelId)=>{
      console.log("jpined in this convessatio channel")
      socket.join(channelId);
    })
  });

server.listen(port,()=>{
    console.log("server is running on",port)
})

app.use("/",UserRoutes)
app.use("/posts",PostRoutes)
app.use("/followers",FollowRoutes)
app.use("/messages",MessageRoutes)
