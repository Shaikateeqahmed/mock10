const mongoose = require("mongoose");

const msgSchema = mongoose.Schema({
    msg : String,
    sender : Object,
    recepient : Array,
    time : String
})

const MsgModel = mongoose.model("msg",msgSchema);

module.exports={MsgModel};