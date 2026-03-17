const mongoose = require("mongoose");

const timetableConfigSchema = new mongoose.Schema({
  workingDays: [String], // Mon-Sat

  periodsPerDay: Number,
  periodDuration: Number,

  startTime: String,
  endTime: String,

  lunchAfterPeriod: Number,

  labDuration: Number, // 3 periods
  oneLabPerDay: Boolean,

  specialDay: String, // e.g. Friday training

  subjects: [
    {
      name: String,
      teacher: String,
      type: String, // theory or lab
      room: String
    }
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("TimetableConfig", timetableConfigSchema);
