const mongoose = require('mongoose');

const UserSchema=new mongoose.Schema({
    email :{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,                
    },
    otp:{
        type:String,
    },
    otpExpires:{
        type:Date
    },
    name :{
        type:String,        
    },
    
},);

module.exports=mongoose.model("User",UserSchema);