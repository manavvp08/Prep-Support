const expModel = require("../models/expModel.js");
const expData = async (req, res) => {
  try {
    const expData = await new expModel(req.body);
    await expData.save();
    return res.status(200).send({
      message: "Data saved succesfully",
      success: true,
    });
  } catch (error) {
    return res.status(501).send({
      message: error.message,
      success: false,
    });
  }
};
const getExp = async (req, res) => {
  try {
    const exp = await expModel.find();
    return res.status(200).send({
      success: true,
      exp: exp,
    });
  } catch (error) {
    console.log(error);
  }
};

const getQues = async (req, res) => {
  try {
    const id = req.query.id;
    const getQues = await expModel.findById(id);

    if (!getQues) {
      return res
        .status(404)
        .send({ message: "Question not found", success: false });
    }

    res.send({
      message: "Question sent",
      data: getQues,
      techques: getQues.techQuestions,
      hrques: getQues.hrQuestions,
      grpques: getQues.groupDiscussion,
    });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};

module.exports = { expData, getExp, getQues };
