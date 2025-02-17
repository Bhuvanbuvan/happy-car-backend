const User = require("../models/User");

exports.sendOTP = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  try {
    let otp = Math.floor(100000 + Math.random() * 900000).toString();
    let otpExpires = new Date();
    otpExpires.setMinutes(otpExpires.getMinutes() + 5);

    let user = await User.findOne({ mobile });

    if (!user) {
      user = new User({ mobile, otp, otpExpires });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
    }

    await user.save();

    res.status(200).json({ message: "OTP generated", otp });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ message: "Error generating OTP" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    let user = await User.findOne({ mobile });

    if (!user || user.otp !== otp || new Date() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};
