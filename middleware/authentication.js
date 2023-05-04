const jwt = require("jsonwebtoken");

const authentecate = (req,res,next)=>{
    let token = req.headers.authorization;
    if(token){
        jwt.verify(token,"masai",(err,decode)=>{
            if(err){
                res.json("Invalid Token");
            }else{
                let UserID = decode.UserID;
                req.body.UserID = UserID;
                next();
            }
        })
    }else{
        res.json("Please Login First!");
    }
    
}

module.exports={authentecate}