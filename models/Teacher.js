const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  subjects: [String],
  availability: [String], // Mon-1, Tue-3 etc
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Teacher", teacherSchema);
