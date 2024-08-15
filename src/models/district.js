const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({

  id: { type: String, require: true, unique: true },
  division_id: { type: Number, ref: 'Division'},
  name: { type: String},
  bn_name: { type: String },
  lat: { type: String },
  lon: { type: String },
  url: { type: String },
});

module.exports = mongoose.model('District', DistrictSchema);
