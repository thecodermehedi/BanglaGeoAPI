const express = require("express");
const router = express.Router();
const Test2 = require("../models/test2");
const Test = require('../models/test'); 

// Create a new district
router.post("/", async (req, res) => {
  try {
    const test2 = new Test2(req.body);
    await test2.save();
    res.status(201).json(test2);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all districts
router.get("/", async (req, res) => {
    try {
      const test2s = await Test2.find();
      res.status(200).json(test2s);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get a single district by ID
router.get("/:id", async (req, res) => {
  try {
    const test2 = await Test2.findOne({id: req.params.id}).populate(
      "division"
    );
    if (!test2) return res.status(404).json({ error: "District not found" });
    res.status(200).json(test2);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // Update a district
// router.put("/:id", async (req, res) => {
//   try {
//     const district = await District.findOneAndUpdate({id: req.params.id}, req.body, {
//       new: true,
//     });
//     if (!district) return res.status(404).json({ error: "District not found" });
//     res.status(200).json(district);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Delete a district
// router.delete("/:id", async (req, res) => {
//   try {
//     const district = await District.findOneAndDelete({ id: req.params.id });
//     if (!district) return res.status(404).json({ error: "District not found" });
//     res.status(200).json({ message: "District deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
