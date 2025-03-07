const User = require("../models/userModel");
const OTP = require("../models/otpModel");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const { log_success } = require("../utils/logger");
// Login & Send OTP
const login = async (req, res) => {
  const { email, phone } = req.body;
  if (!email || !phone)
    return res.status(400).json({ message: "Email & Phone required" });

  const otp = generateOTP();
  await OTP.create({ email, otp, expiresAt: Date.now() + 5 * 60 * 1000 });

  //   sendEmail(email, otp);
  log_success(`OTP:${otp}`);
  res.status(200).json({ message: "OTP Sent" });
};

// Verify OTP & Choose Role
const verifyOTP = async (req, res) => {
  const { email, otp, role } = req.body;
  const otpRecord = await OTP.findOne({ email, otp });

  if (!otpRecord || otpRecord.expiresAt < Date.now()) {
    return res.status(400).json({ message: "Invalid or Expired OTP" });
  }

  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email, phone: req.body.phone, role });

  res.status(200).json({ message: "OTP Verified", user });
};

module.exports = { login, verifyOTP };
