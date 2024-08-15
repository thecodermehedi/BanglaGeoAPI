const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("hey world");
});

// Routes
app.use("/api/divisions", require("./routes/divisions"));
app.use("/api/districts", require("./routes/districts"));
app.use("/api/upazilas", require("./routes/upazilas"));
app.use("/api/unions", require("./routes/unions"));

app.use("/api/test2s", require("./routes/test2s"));
app.use("/api/tests", require("./routes/tests"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
