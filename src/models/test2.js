const mongoose = require('mongoose');

const Test2Schema = new mongoose.Schema({


  id: { type: Number, require: true, unique: true, index: true },
  division_id: { type: String, ref: 'Test'},
  name: { type: String},
  bn_name: { type: String },
  lat: { type: Number },
  lon: { type: Number },
  url: { type: String },
},
{
    _id: false,
});

module.exports = mongoose.model('Test2', Test2Schema);
