const jwt = require("jsonwebtoken");
require("dotenv").config()


const authentication = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.json({msg:"please login first"})
    }
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, function(error,decoded){
        if(error){
            res.json({msg:"Please login"})
        }else{
            req.body.userId = decoded.userId
            next()
        }
    })
}

module.exports = {authentication}