const expModel = require("../models/expModel.js");

const getUsers = async (req, res) => {
  try {
    const exp = await expModel.find();
    return res.status(200).send({
      success: true,
      users: exp,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateApproved = async (req, res) => {
  try {
    const { id, isApproved } = req.body;
    const user = await expModel.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    );
    return res.status(200).send({
      message: "Done",
      success: true,
      data: user,
      isApproved: user.isApproved,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const updateField = async (req, res) => {
  try {
    const { id, selectedPost } = req.body;
    // console.log(id,selectedPost)
    const update = await expModel.findByIdAndUpdate(id, selectedPost, {
      new: true,
    });
    return res.status(200).send({
      message: "Data Updated Successfully",
      success: true,
      data: update,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { getUsers, updateApproved, updateField };
