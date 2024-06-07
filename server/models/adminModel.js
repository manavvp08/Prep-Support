const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  company: {
    type: String,
  },
  role: {
    type: String,
  },
  gotOffer: {
    type: String,
  },
  location: {
    type: String,
  },
  rounds: {
    type: String,
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
    type: [],
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
    default: 0,
  },
  hrQuestions: {
    type: [],
  },
});

const adminModel = mongoose.model("admin", adminSchema);

module.exports = { adminModel };
