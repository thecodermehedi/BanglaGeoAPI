const mongoose = require('mongoose');

const UnionSchema = new mongoose.Schema({

  id: { type: String, require: true, unique: true },
  upazilla_id: { type: String, ref: 'Upazila'},
  rdx_id: {type: String},
  name: { type: String},
  bn_name: { type: String },
  url: { type: String },
});

module.exports = mongoose.model('Union', UnionSchema);
