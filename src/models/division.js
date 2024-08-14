const mongoose = require("mongoose");

const DivisionSchema = new mongoose.Schema(
  {
    id: { type: Number, require: true, unique: true },
    name: { type: String},
    bn_name: { type: String },
    url: { type: String },
  }
);

module.exports = mongoose.model("Division", DivisionSchema);
