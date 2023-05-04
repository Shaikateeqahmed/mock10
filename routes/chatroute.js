const express = require("express");
const chat = express.Router();
const http = require("http");
const {Server} = require("socket.io");

let httpserver = http.createServer(chat);
let io = new Server(httpserver);

chat.get("/",async(req,res)=>{
    res.send("chat page");
    // console.log(io);
    io.on("connection",(socket)=>{
        console.log("new user join");
        socket.on("chat",(msg)=>{
            io.emit
        })
    })
    
})

module.exports={chat};