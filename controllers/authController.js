const User = require("../models/User");
const mongoose = require('mongoose');
const sendOtpMail = require("../utils/sendOtp");

//send otp to user email
exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({status : false , message: "email_Id is required" });
  }else{
    console.log("enter succes")
  }

  try {
    let otp = Math.floor(100000 + Math.random() * 900000).toString();
    let otpExpires = new Date();
    otpExpires.setMinutes(otpExpires.getMinutes() + 5);

    let user = await User.findOne({ email });
    const response = await sendOtpMail(email,otp);

   if(response.success){
    if (!user) {      
      user = new User({ email, otp, otpExpires });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
    }
    await user.save();

    res.status(200).json({ status : true , message: "OTP send successfully" , "expiry":user.otpExpires });
   }else {
    res.status(500).json({status : false , message: "Failed to send OTP" });
   }
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({status : false , message: "Error generating OTP" });
  }
};


//verify otp from user
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user || user.otp !== otp || new Date() > user.otpExpires) {
      return res.status(400).json({status : false , message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpires=null;
    await user.save();
    console.log("OTP verified successfully ");
    res.status(200).json({status : true , message: "OTP verified successfully" ,"auth_token":user['_id']});
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({status : false , message: "Error verifying OTP" });
  }
};

//update user details like name and email
exports.putUserDetails = async (req,res) => {
  try {
    const {userId,name,mobile} = req.body;
    if(!mongoose.Types.ObjectId.isValid(userId)){
      return res.status(404).json({status : false , message: "in-valid user ID"});
    }
    const user= await User.findOne({_id:new mongoose.Types.ObjectId(userId)});
    if(!user){
      return res.status(404).json({status : false , message: "User Not Found"});
    }
    user.name=name;
    user.mobile=mobile;
    await user.save();
    return res.status(200).json({status :true ,message: "User Updated Successfully", user});
  } catch (error) {
    return res.status(500).json({status : false , message:"Unexpected "});
  }
};

