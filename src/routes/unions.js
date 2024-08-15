const express = require('express');
const router = express.Router();
const Union = require('../models/union');
const Upazila = require('../models/upazila'); 

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
router.get("/", async (req, res) => {
  try {
    const unions = await Union.find().populate("upazila");
    const upazilaIds =  [...new Set(unions.map(union => union.upazilla_id))];
    const upazilas = await Upazila.find({ id: { $in: upazilaIds } });
    const upazilaMap = upazilas.reduce((map, upazila) => {
      map[upazila.id] = upazila.name;
      return map;
    }, {});   
    
    // console.log(unions);
    // console.log(upazilaIds);
    // console.log(upazilas);
    // console.log(upazilaMap);
    

    const formattedUnions = unions.map(union => ({
      _id: union._id,
      id: union.id,
      name: union.name,
      bn_name: union.bn_name,
      rdx_id: union.rdx_id,
      upazila_id: union.upazilla_id,
      upazila_name: upazilaMap[union.upazilla_id] || null, 
      url: union.url
    }));
        
    res.status(200).json(formattedUnions);
  } catch (error) {
    console.error('Error fetching Unions:', error); // Log detailed error
    res.status(500).json({ error: error.message });
  }
});

// // Get all unions
// router.get('/', async (req, res) => {
//   try {
//     const unions = await Union.find().populate('upazila');
//     res.status(200).json(unions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

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
