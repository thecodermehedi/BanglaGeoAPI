
const express = require('express');
const router = express.Router();
const Upazila = require('../models/upazila');
const District = require('../models/district');

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


router.get("/", async (req, res) => {
  try {
    const upazilas = await Upazila.find().populate("district");
    const districtIds = [...new Set(upazilas.map(upazila => upazila.district_id))];
    const districts = await District.find({ id: { $in: districtIds } });
    const districtMap = districts.reduce((map, district) => {
      map[district.id] = district.name;
      return map;
    }, {});    

    // console.log(upazilas);
    // console.log(districtIds);
    // console.log(districts);
    // console.log(districtMap);
    
    const formattedUpazilas = upazilas.map(upazila => ({
      _id: upazila._id,
      id: upazila.id,
      name: upazila.name,
      bn_name: upazila.bn_name,
      rdx_id: upazila.rdx_id, 
      district_id: upazila.district_id,
      district_name: districtMap[upazila.district_id] || null,
      url: upazila.url
    }));
        
    res.status(200).json(formattedUpazilas);
  } catch (error) {
    console.error('Error fetching Upazila:', error); // Log detailed error
    res.status(500).json({ error: error.message });
  }
});




// // Get all upazilas
// router.get('/', async (req, res) => {
//   try {
//     const upazilas = await Upazila.find().populate('district');
//     res.status(200).json(upazilas);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

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
