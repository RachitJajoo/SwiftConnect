const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/userRoutes.js")
const messageRoutes = require("./routes/messageRoutes.js");
const socket = require("socket.io");
require("dotenv").config();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://swift-connect-peach.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
    cors:"https://swift-connect-peach.vercel.app/",
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