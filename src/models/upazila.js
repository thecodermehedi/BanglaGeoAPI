const mongoose = require('mongoose');

const UpazilaSchema = new mongoose.Schema({

  id: { type: String, require: true, unique: true },
  district_id: { type: String, ref: 'District'},
  rdx_id: { type: String},
  name: { type: String},
  bn_name: { type: String },
  url: { type: String },
});

module.exports = mongoose.model('Upazila', UpazilaSchema);
