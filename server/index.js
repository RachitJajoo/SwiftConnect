const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/userRoutes.js")
const messageRoutes = require("./routes/messageRoutes.js");
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());



app.use("/api/auth" , userRoutes);

app.use("/api/messages" , messageRoutes);

app.get("/" , (req,res,next)=> console.log("WOKRING"));

mongoose.connect(process.env.MONGO_URL)
.then(() =>{ 
    console.log('Connected!')
}).catch( (err)=>{
    console.log(err.message);
});

const server = app.listen(process.env.PORT,()=>{
    console.log(`App is listing to PORT ${process.env.PORT}`);
})


const io = socket(server,{
    cors:"http://localhost:5173",
    credentials : true,
})

global.onlineUsers = new Map();

io.on("connection" , (socket) =>{
    global.checkSocket = socket;
    socket.on("add-user" , (userId)=>{
        onlineUsers.set(userId , socket.id);
    });
    socket.on("send-msg" , (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve" , data.message);
        }
    })
})