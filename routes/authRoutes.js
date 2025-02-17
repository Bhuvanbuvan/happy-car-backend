const express = require("express");
const { sendOTP, verifyOTP } = require("../controllers/authController"); // Ensure this is correct

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get('/get',(req,res)=>{
    res.send("hello this is bhuvanesh first node.js project run on 3000 ports");})

module.exports = router;
