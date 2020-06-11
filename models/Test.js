const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
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
    required: true,
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
