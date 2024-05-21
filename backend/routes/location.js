const express = require("express");
const router = express.Router();
const Location = require("../models/location");

// Get one random location
router.get("/", async (req, res) => {
  try {
    const randomLocation = await Location.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomLocation[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Getting One
router.get("/:id", getLocation, (req, res) => {
  res.json(res.location);
});


async function getLocation(req, res, next) {
  let location;
  try {
    location = await Location.findById(req.params.id);
    if (location == null) {
      return res.status(404).json({ message: "Cannot find Location" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.location = location;
  next();
}

module.exports = router;
