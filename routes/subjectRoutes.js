const express = require("express");
const Subject = require("../models/Subject");
const authMiddleWare = require("../middleware/authMiddleware");

const router = express.Router();


// ================= CREATE SUBJECT =================
router.post("/", authMiddleWare, async (req, res) => {
  try {
    const { name, teacher, type, periodsPerWeek, room } = req.body;

    const subject = new Subject({
      name,
      teacher,
      type,
      periodsPerWeek,
      room,
      user: req.user   // ✅ req.user IS the id
    });

    await subject.save();
    res.status(201).json(subject);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= GET SUBJECTS =================
router.get("/", authMiddleWare, async (req, res) => {
  try {
    const subjects = await Subject.find({ user: req.user }); // ✅ FIXED
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ================= DELETE SUBJECT =================
router.delete("/:id", auth, async (req, res) => {
  try {
    const subject = await Subject.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json({ message: "Subject deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting subject" });
  }
});

module.exports = router;
