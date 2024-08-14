const mongoose = require('mongoose');

const UnionSchema = new mongoose.Schema({
  id: { type: Number, require: true, unique: true },
  upazila_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Upazila'},
  rdx_id: {type: Number},
  name: { type: String},
  bn_name: { type: String },
  url: { type: String },
});

module.exports = mongoose.model('Union', UnionSchema);
