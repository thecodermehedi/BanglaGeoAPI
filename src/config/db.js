// config/db.js
const mongoose = require("mongoose");
mongoose.set("strictPopulate", false);


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bangla-geo-api");
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
