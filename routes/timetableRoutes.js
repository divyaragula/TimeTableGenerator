const express = require("express");
const Subject = require("../models/Subject");
const Setup = require("../models/Setup");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    // ✅ GET DATA
    const subjects = await Subject.find({ user: req.user });
    const setup = await Setup.findOne({ user: req.user });

    if (!setup) return res.status(400).json({ message: "No setup found" });

    const { workingDays, periodsPerDay } = setup;

    // ======================
    // 🧠 CREATE EMPTY TIMETABLE
    // ======================

    let timetable = {};

    workingDays.forEach(day => {
      timetable[day] = new Array(periodsPerDay).fill(null);
    });

    // ======================
    // 🎯 SEPARATE SUBJECTS
    // ======================

    const labs = subjects.filter(s => s.type === "lab");
    const theory = subjects.filter(s => s.type === "theory");

    // ======================
    // 🔬 ALLOCATE LABS FIRST
    // ======================

    labs.forEach(lab => {
      let sessions = Math.floor(lab.periodsPerWeek / 3);

      for (let day of workingDays) {
        for (let i = 0; i <= periodsPerDay - 3 && sessions > 0; i++) {

          if (
            timetable[day][i] === null &&
            timetable[day][i + 1] === null &&
            timetable[day][i + 2] === null
          ) {
            timetable[day][i] = lab.name;
            timetable[day][i + 1] = lab.name;
            timetable[day][i + 2] = lab.name;

            sessions--;
            break;
          }
        }
      }
    });

    // ======================
    // 📘 ALLOCATE THEORY
    // ======================

    theory.forEach(sub => {
      let remaining = sub.periodsPerWeek;

      for (let day of workingDays) {
        for (let i = 0; i < periodsPerDay && remaining > 0; i++) {

          if (timetable[day][i] === null) {
            timetable[day][i] = sub.name;
            remaining--;
          }
        }
      }
    });

    // ======================
    // SEND FINAL TIMETABLE
    // ======================

    res.json(timetable);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
