const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { otpGenerate } = require("./changepassController.js");
let generateOtp = 0;
const fs = require("fs");

const expModel = require("../models/expModel.js");

const Func = (req, res) => {
  res.send("hii");
};
const generateOtpFunc = async (req, res) => {
  const userExist = await userModel.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(200).send({
      message: "User already exist",
      success: false,
    });
  } else {
    generateOtp = await otpGenerate(req.body.email);
    return res.status(200).send({
      success: true,
    });
  }
};
const signup = async (req, res) => {
  try {
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(200).send({
        message: "User already exist",
        success: false,
      });
    }

    if (req.body.otp == generateOtp) {
      const salt = await bcrypt.genSalt(10);
      const hassPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hassPassword;
      const newUser = await new userModel(req.body);
      const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });
      await newUser.save();
      return res.status(200).send({
        message: "Register successfully",
        success: true,
        token: token,
      });
    } else {
      return res.status(200).send({
        message: "Invalid otp",
        success: false,
      });
    }
  } catch (error) {
    return res.status(200).send({
      message: error.message,
      success: false,
    });
  }
};
const login = async (req, res) => {
  try {
    const userExit = await userModel.findOne({ email: req.body.email });
    if (!userExit) {
      return res.status(400).send({
        message: "User not exit",
        success: false,
      });
    }

    const userPass = req.body.password;
    const dbPass = userExit.password;
    const passMatch = await bcrypt.compare(userPass, dbPass);
    if (passMatch) {
      // console.log(userExit.isAdmin);
      const token = jwt.sign(
        { userId: userExit._id, isAdmin: userExit.isAdmin },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).send({
        message: "Login successfully",
        success: true,
        data: userExit,
        token: token,
      });
    } else {
      return res.status(200).send({
        message: "Invalid crediantials",
        success: false,
      });
    }
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};
const adminlogin = async (req, res) => {
  try {
    const userExit = await userModel.findOne({ email: req.body.email });

    const userPass = req.body.password;
    const dbPass = userExit.password;
    const passMatch = await bcrypt.compare(userPass, dbPass);
    const token = jwt.sign({ userId: userExit._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    if (userExit.isAdmin == false || passMatch == false) {
      return res.status(401).send({
        message: "Invalid credentials",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Login successfully",
        success: true,
        token: token,
        isAdmin: true,
      });
    }
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};
const getUserDetails = async (req, res) => {
  try {
    const userExit = await userModel.findOne({ email: req.body.body.email });
    if (!userExit) {
      return res.status(200).send({
        message: "User not exit",
        success: false,
      });
    }
    return res.status(200).send({
      message: "User Details",
      success: true,
      data: userExit,
    });
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};
const checkUserExists = async (req, res) => {
  try {
    const userExist = await userModel.findOne({
      email: req.body.email,
    });
    if (userExist) {
      generateOtp = await otpGenerate(req.body.email);
      return res.status(200).send({
        message: "User found",
        success: true,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: "User not found",
      success: false,
    });
  }
};
const compareotp = async (req, res) => {
  try {
    if (req.body.otp == generateOtp) {
      return res.status(200).send({
        message: "Otp matched",
        success: true,
      });
    } else {
      return res.status(200).send({
        message: "Otp not matched",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
};
const addadmin = async (req, res) => {
  try {
    const userExist = await userModel.findOneAndUpdate(
      { email: req.body.email },
      { isAdmin: true }
    );
    if (userExist) {
      return res.status(200).send({
        message: "Updated succesfully",
        success: true,
      });
    } else {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};
const checkEmail = async (req, res) => {
  try {
    const userExist = await userModel.findOne({
      email: req.body.email,
    });
    if (userExist) {
      return res.status(200).send({
        message: "User found",
        success: true,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: "User not found",
      success: false,
    });
  }
};
const changeName = async (req, res) => {
  try {
    const data = await userModel.findOne({ email: req.body.sessionEmail });
    if (data) {
      await userModel.findOneAndUpdate(
        { email: req.body.sessionEmail },
        { name: req.body.editname }
      );
      return res.status(200).send({
        message: "Updated succesfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};
const profileImage = async (req, res) => {
  // optimise this function
  // console.log(req.body, req.files);
  try {
    const user = await userModel.find({
      email: req.body.email,
    });
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      // console.log(user);
      user[0].image = req.files[0].path;
      await user[0].save();
      // console.log(user);
      return res.status(200).send({
        message: "Image uploaded successfully",
        imagePath: req.files[0].path,
        success: true,
      });
    }
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};
const sendProfileImage = async (req, res) => {
  try {
    const imageFile = fs.readFileSync(
      `./profileUploads/${req.params.imgName}`,
      "base64"
    );
    // console.log(imageFile);

    if (!imageFile) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Image Found",
        imagePath: imageFile,
        success: true,
      });
    }
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};
const getExp = async (req, res) => {
  try {
    // console.log(req.body);
    const data = await expModel.find({ email: req.body.email });
    // console.log(data);
    if (data) {
      return res.status(201).send({
        message: "Data fetch succesfully",
        success: true,
        data: data,
      });
    }
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};
const editExpUser = async (req, res) => {
  try {
    // console.log(req.query.id);
    // console.log(req.body.selectedPost);
    const id = req.query.id;
    const data = await expModel.findByIdAndUpdate(id, req.body.selectedPost, {
      new: true,
    });
    return res.status(200).send({
      message: "Updated succesfully",
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  login,
  signup,
  Func,
  adminlogin,
  generateOtpFunc,
  getUserDetails,
  checkUserExists,
  compareotp,
  addadmin,
  checkEmail,
  changeName,
  profileImage,
  sendProfileImage,
  getExp,
  editExpUser,
};
