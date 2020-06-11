const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  expected: {
    type: String,
    required: true,
  },
  outcome: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Test = mongoose.model("test", TestSchema);
