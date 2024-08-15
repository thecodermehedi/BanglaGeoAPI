const express = require("express");
const router = express.Router();
const District = require("../models/district");
const Division = require('../models/division'); 
// Create a new district
router.post("/", async (req, res) => {
  try {
    const district = new District(req.body);
    await district.save();
    res.status(201).json(district);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all districts
router.get("/", async (req, res) => {
  try {
    const districts = await District.find().populate("division");
    const divisionIds = [...new Set(districts.map(district => district.division_id))];
    const divisions = await Division.find({ id: { $in: divisionIds } });
    const divisionMap = divisions.reduce((map, division) => {
      map[division.id] = division.name;
      return map;
    }, {});    

    const formattedDistricts = districts.map(district => ({
      _id: district._id,
      id: district.id,
      name: district.name,
      bn_name: district.bn_name,
      division_id: district.division_id,
      division_name: divisionMap[district.division_id] || null, // Use the map to get the division name
      lat: district.lat,
      lon: district.lon,
      url: district.url
    }));
        
    res.status(200).json(formattedDistricts);
  } catch (error) {
    console.error('Error fetching districts:', error); // Log detailed error
    res.status(500).json({ error: error.message });
  }
});

// Get a single district by ID
router.get("/:id", async (req, res) => {
  try {
    const district = await District.findOne({id: req.params.id}).populate(
      "division"
    );
    if (!district) return res.status(404).json({ error: "District not found" });
    res.status(200).json(district);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a district
router.put("/:id", async (req, res) => {
  try {
    const district = await District.findOneAndUpdate({id: req.params.id}, req.body, {
      new: true,
    });
    if (!district) return res.status(404).json({ error: "District not found" });
    res.status(200).json(district);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a district
router.delete("/:id", async (req, res) => {
  try {
    const district = await District.findOneAndDelete({ id: req.params.id });
    if (!district) return res.status(404).json({ error: "District not found" });
    res.status(200).json({ message: "District deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
