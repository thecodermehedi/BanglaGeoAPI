const express = require("express");
const router = express.Router();
const Division = require("../models/division");

// Create a new division
router.post("/", async (req, res) => {
  try {
    const division = new Division(req.body);
    await division.save();
    res.status(201).json(division);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all divisions
router.get("/", async (req, res) => {
  try {
    const divisions = await Division.find();
    res.status(200).json(divisions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single division by ID
router.get("/:id", async (req, res) => {
  try {
    const division = await Division.findOne({id: req.params.id});
    if (!division) return res.status(404).json({ error: "Division not found" });
    res.status(200).json(division);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a division
router.put("/:id", async (req, res) => {
  try {

    const division = await Division.findOneAndUpdate({id: req.params.id}, req.body, {
      new: true,
    });
    if (!division) return res.status(404).json({ error: "Division not found" });
    res.status(200).json(division);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a division
router.delete("/:id", async (req, res) => {
  try {
    const division = await Division.findOneAndDelete({ id: req.params.id });
    if (!division) return res.status(404).json({ error: "Division not found" });
    res.status(200).json({ message: "Division deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
