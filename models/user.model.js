const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {type:String,required:true},
    password: {type:String,required:true},
    confirmPassword: {type:String,required:true}
})

const userModel = mongoose.model("myuser",userSchema);

module.exports= {userModel};