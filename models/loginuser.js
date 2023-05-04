const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
    details : Array
})

const LoginModel = mongoose.model("loginuser",loginSchema);

module.exports={LoginModel};