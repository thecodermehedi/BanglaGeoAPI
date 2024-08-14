const mongoose = require('mongoose');

const UpazilaSchema = new mongoose.Schema({
  id: { type: Number, require: true, unique: true },
  district_id: { type: mongoose.Schema.Types.ObjectId, ref: 'District'},
  rdx_id: { type: Number},
  name: { type: String},
  bn_name: { type: String },
  url: { type: String },
});

module.exports = mongoose.model('Upazila', UpazilaSchema);
