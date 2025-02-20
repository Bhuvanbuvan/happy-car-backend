const express = require("express");
const { sendOTP, verifyOTP,putUserDetails  } = require("../controllers/authController"); 

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post('/update-profile',putUserDetails);


module.exports = router;
