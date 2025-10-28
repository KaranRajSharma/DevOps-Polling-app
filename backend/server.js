require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const pollRoutes = require("./routes/pollRoutes");

const connectDB = require("./config/db");

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

app.use(express.json());

connectDB()

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/poll", pollRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.get("/api/health", async (req, res) => {
  try {
    const dbState = require('mongoose').connection.readyState;
    if (dbState === 1) {
      res.status(200).send('Healthy: Connected to MongoDB');
    } else {
      res.status(500).send('Unhealthy: No DB connection');
    }
  } catch (err) {
    res.status(500).send('Unhealthy: Error checking DB');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));