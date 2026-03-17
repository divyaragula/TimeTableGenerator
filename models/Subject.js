const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teacher: { type: String, required: true },
  type: { type: String, enum: ["theory", "lab"], required: true },
  periodsPerWeek: { type: Number, required: true },
  room: { type: String, required: true },
  day: { type: String },
time: { type: String },


  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);
