const express = require("express");
const router = express.Router();
const Setup = require("../models/Setup");
const auth = require("../middleware/authMiddleware");


// ================= SAVE SETUP =================
router.post("/", auth, async (req, res) => {
  try {
    const setup = new Setup({
      ...req.body,
      user: req.user
    });

    await setup.save();
    res.json(setup);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving setup" });
  }
});


// ================= GET SAVED SETUP =================
router.get("/", auth, async (req, res) => {
  try {
    const setup = await Setup.findOne({ user: req.user });

    if (!setup) {
      return res.status(404).json({ message: "Setup not found" });
    }

    res.json(setup);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching setup" });
  }
});

// ================= UPDATE SETUP =================
router.put("/", auth, async (req, res) => {
  try {
    const updatedSetup = await Setup.findOneAndUpdate(
      { user: req.user },   // find setup of logged in user
      req.body,
      { new: true }         // return updated document
    );

    if (!updatedSetup) {
      return res.status(404).json({ message: "Setup not found" });
    }

    res.json(updatedSetup);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating setup" });
  }
});


module.exports = router;
