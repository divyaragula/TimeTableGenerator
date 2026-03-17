const mongoose = require("mongoose");

const setupSchema = new mongoose.Schema({
  workingDays: [String],
  periodsPerDay: Number,
  startTime: String,
  periodDuration: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Setup", setupSchema);
