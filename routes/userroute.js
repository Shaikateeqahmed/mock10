const express = require("express");
const {UserModel} = require("../models/usermodel.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const {LoginModel} = require("../models/loginuser.js");

const user = express.Router();


user.get("/",async(req,res)=>{
    res.send("user page");
})

user.post("/register",async(req,res)=>{
    let {Username, Email, Password} = req.body;
    if(!Username||!Email||!Password){
        res.json("Please Fill all the Fields!");
    }else{
        let user = await UserModel.find({Email});
        if(user.length>0){
            res.json("User with This Email Already Exists!");
        }else{
            bcrypt.hash(Password,5,async(err,hash)=>{
                if(err){
                    console.log(err);
                }else{
                    let newuser = new UserModel({Username,Email,Password:hash});
                    await newuser.save();
                    res.json("User Register Successfully!");

                //     const transporter = nodemailer.createTransport({
                //         host: 'smtp.ethereal.email',
                //         port: 587,
                //         service : "gmail",
                //         auth: {
                //             user: 'edwardo79@ethereal.email',
                //             pass: 'MBy2qGffCSygmfpJ2n'
                //         },
                //         tls : {
                //             rejectUnauthorized : false
                //         }
                //     });

                //     let info = await transporter.sendMail({
                //         to: `${Email}`,
                //         subject: "Verification mail",
                //         text:  `<a id="verificaion">${Email}</a>`,
                //       });
                 }
            })
        }
    }
})

user.post("/login",async(req,res)=>{
    let {Email,Password} = req.body;
    let user = await UserModel.find({Email});
    // let l = new LoginModel({details:[]});
    // await l.save();
    let loginuser = await LoginModel.find();
    
    
    if(user.length>0){
         bcrypt.compare(Password,user[0].Password,async(err,result)=>{
            if(err){
                res.json("Invalid Creadiantials!");
            }else{
                let token = jwt.sign({Username:user[0]._id},"masai");
                res.json(token);
                 let detail = loginuser[0].details;
                 detail.push(user[0])
                await LoginModel.findByIdAndUpdate({_id:loginuser[0]._id},{details:detail})
            }
         })
    }else{
        res.json("Please Signup First!");
    }
})

module.exports={user};