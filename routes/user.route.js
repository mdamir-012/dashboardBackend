const {Router} =require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
require("dotenv").config()


const userController=Router();


// for signup
userController.post("/signup" ,(req,res)=>{
    const {email,password,confirmPassword} = req.body;
    bcrypt.hash(password, 5, async(error,hash)=>{
        if(error){
            res.send("something went wrong,please try again")
        }
        const user =new userModel({
            email,
            password: hash,
            confirmPassword
            
        })
        try{
            await user.save()
            res.json({message:"signup succesfully"})
        }
        catch(err){
            console.log(err)
            res.json({message:"something went wrong,please try again"})
        }
    })
})

// for login
userController.post("/login", async(req,res)=>{
    const {email,password} =req.body;
    const user = await userModel.findOne({email})
    const hash = user.password;

    bcrypt.compare(password,hash, function(error,result){
        if(error){
            res.json({message:"something went wrong"})
        }if(result){

            const token = jwt.sign({userId : user._id},process.env.JWT_SECRET);
            res.json({message:"Login successful",token})
        }else{
            res.json({msg:"invalid credentials"})
        }
    })
})

module.exports = {userController}