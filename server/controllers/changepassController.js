const nodemailer = require("nodemailer");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const otpGenerate = async (userEmail) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const transporter = await nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "arshdeeprooprai@gmail.com",
        pass: "guzk pmxt pusy oloc",
      },
    });
    const mailOptions = {
      from: 
      {
        name:"uprep-team",
        address:"arshdeeprooprai@gmail.com"
      },
      to: userEmail,
      subject: "Verification Email OTP",
      text: `Your OTP for email verification is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);
    return otp;
  } catch (error) {
    return error.message;
  }
};
const changePass = async (req, res) => {
  try {
    const email = req.body.email;
    const findEmail = await userModel.findOne({ email: email });
    if (!findEmail) {
      return res.status(200).send({
        message: "User dont exist",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hassPassword;
    await userModel.findOneAndUpdate(
      { email: email },
      { password: req.body.password }
    );
    return res.status(200).send({
      message: "Change password succesfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const passChangeAfterLogin = async (req, res) => {
  try {
    // console.log(req.body)
    const email = req.body.email;
    const findEmail = await userModel.findOne({ email: email });
    if (!findEmail) {
      return res.status(200).send({
        message: "User dont exist",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hassPassword;
    await userModel.findOneAndUpdate(
      { email: email },
      { password: req.body.password }
    );
    return res.status(200).send({
      message: "Change password succesfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};
module.exports = { otpGenerate, changePass, passChangeAfterLogin };
