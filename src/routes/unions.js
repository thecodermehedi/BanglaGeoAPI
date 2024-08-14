const express = require('express');
const router = express.Router();
const Union = require('../models/union');

// Create a new union
router.post('/', async (req, res) => {
  try {
    const union = new Union(req.body);
    await union.save();
    res.status(201).json(union);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all unions
router.get('/', async (req, res) => {
  try {
    const unions = await Union.find().populate('upazila');
    res.status(200).json(unions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single union by ID
router.get('/:id', async (req, res) => {
  try {
    const union = await Union.findOne({id: req.params.id}).populate('upazila');
    if (!union) return res.status(404).json({ error: 'Union not found' });
    res.status(200).json(union);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a union
router.put('/:id', async (req, res) => {
  try {
    const union = await Union.findOneAndUpdate({id: req.params.id}, req.body, { new: true });
    if (!union) return res.status(404).json({ error: 'Union not found' });
    res.status(200).json(union);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a union
router.delete('/:id', async (req, res) => {
  try {
    const union = await Union.findOneAndDelete({ id: req.params.id });
    if (!union) return res.status(404).json({ error: 'Union not found' });
    res.status(200).json({ message: 'Union deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
