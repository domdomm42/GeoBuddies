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

// // Creating one
// router.post("/", async (req, res) => {
//   const subscriber = new Subscriber({
//     name: req.body.name,
//     subscribedToChannel: req.body.subscribedToChannel,
//   });
//   try {
//     const newSubscriber = await subscriber.save();
//     res.status(201).json(newSubscriber);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Updating One
// router.patch("/:id", getSubscriber, async (req, res) => {
//   if (req.body.name != null) {
//     res.subscriber.name = req.body.name;
//   }
//   if (req.body.subscribedToChannel != null) {
//     res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
//   }
//   try {
//     const updatedSubscriber = await res.subscriber.save();
//     res.json(updatedSubscriber);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Deleting One
// router.delete("/:id", getSubscriber, async (req, res) => {
//   try {
//     await res.subscriber.remove();
//     res.json({ message: "Deleted Subscriber" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

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
