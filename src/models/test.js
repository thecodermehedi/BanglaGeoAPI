const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema(
  {
    id: { type: String, require: true, unique: true, index: true },
    name: { type: String },
    bn_name: { type: String },
    url: { type: String },
  },
  { _id: false }
);

module.exports = mongoose.model("Test", TestSchema);
