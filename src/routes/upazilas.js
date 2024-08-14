
const express = require('express');
const router = express.Router();
const Upazila = require('../models/upazila');

// Create a new upazila
router.post('/', async (req, res) => {
  try {
    const upazila = new Upazila(req.body);
    await upazila.save();
    res.status(201).json(upazila);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all upazilas
router.get('/', async (req, res) => {
  try {
    const upazilas = await Upazila.find().populate('district');
    res.status(200).json(upazilas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single upazila by ID
router.get('/:id', async (req, res) => {
  try {
    const upazila = await Upazila.findOne({id: req.params.id}).populate('district');
    if (!upazila) return res.status(404).json({ error: 'Upazila not found' });
    res.status(200).json(upazila);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an upazila
router.put('/:id', async (req, res) => {
  try {
    const upazila = await Upazila.findOneAndUpdate({id: req.params.id}, req.body, { new: true });
    if (!upazila) return res.status(404).json({ error: 'Upazila not found' });
    res.status(200).json(upazila);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an upazila
router.delete('/:id', async (req, res) => {
  try {
    const upazila = await Upazila.findOneAndDelete({ id: req.params.id });;
    if (!upazila) return res.status(404).json({ error: 'Upazila not found' });
    res.status(200).json({ message: 'Upazila deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
