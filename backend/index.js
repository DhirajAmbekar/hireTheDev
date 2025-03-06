const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const { log_start } = require("./utils/logger");
const { ServerApiVersion } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Middleware
app.use(express.json()); // Enable JSON parsing
app.use(cors()); // Enable CORS for frontend communication

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { 
    serverApi: ServerApiVersion.v1,
  })
  .then(() => log_start("✅ DB Connected Successfully"))
  .catch((err) => log_start(`❌ DB Connection Error: ${err.message}`));

// Routes
// app.use("/api/users", require("./routes/user_routes"));
// app.use("/api/admin", require("./routes/admin_routes")); 

// Start Server
app.listen(PORT, () => {
  log_start(`🚀 Server is running on http://localhost:${PORT}`);
});
