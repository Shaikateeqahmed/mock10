const express = require("express");
const {connection} = require("./config/connection.js");
const {user} = require("./routes/userroute.js");
const {authentecate} = require("./middleware/authentication.js");
const {chat} = require("./routes/chatroute.js");
const cors = require("cors");
const http = require("http");
const {Server} = require("socket.io");
const { LoginModel } = require("./models/loginuser.js");
const { MsgModel } = require("./models/msgmodel.js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user",user);
app.use(authentecate);
//app.use("/chat",chat);
let httpserver = http.createServer(app);
let io = new Server(httpserver);
io.on("connection",async(socket)=>{
let loginusers = await LoginModel.find();
    console.log("new user join");
    socket.on("chat", async(msg)=>{
        let newmsg = new MsgModel({ msg : msg,
            sender : loginusers[0],
            recepient : loginusers,
            time : Date.now()})
            await newmsg.save();
        io.emit("massege",msg);
    })
})

httpserver.listen(process.env.port,async()=>{
    await connection;
    console.log(`server is running on port 3000`);
})