const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({
  id: { type: Number, require: true, unique: true },
  division_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Division'},
  name: { type: String},
  bn_name: { type: String },
  lat: { type: Number },
  lon: { type: Number },
  url: { type: String },
});

module.exports = mongoose.model('District', DistrictSchema);
