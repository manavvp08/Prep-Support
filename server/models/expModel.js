const mongoose = require("mongoose");

const expSchema = mongoose.Schema({
  date: {
    type: Array,
  },
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  gotOffer: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rounds: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  universityID: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  cgpa: {
    type: String,
  },
  question: {
    type: String,
  },
  eligibility: {
    type: String,
  },
  preparationTips: {
    type: String,
  },
  mistakes: {
    type: String,
  },
  techQuestions: {
    type: Array,
  },
  interviewPrep: {
    type: String,
  },
  othercompany: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  expyr: {
    type: Number,
    required: true,
    default: 0,
  },
  hrQuestions: {
    type: Array,
  },
  ipSubjects: {
    type: Array,
  },
  groupDiscussion: {
    type: Array,
  },
  image: {
    type: String,
    default:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
  },
});

const expModel = new mongoose.model("expModel", expSchema);
module.exports = expModel;
