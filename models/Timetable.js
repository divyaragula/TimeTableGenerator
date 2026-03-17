const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  workingDays: [String],   // Mon, Tue, Wed...

  periodsPerDay: Number,

  periodDuration: Number,

  startTime: String,
  endTime: String,

  lunchAfter: Number, // after 3 or 4

  subjects: [
    {
      name: String,
      teacher: String,
      isLab: Boolean,
      room: String
    }
  ],

  specialDay: String // optional training day

}, { timestamps: true });

module.exports = mongoose.model("Timetable", timetableSchema);
