const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Database
connectDB();
// app.use(
//   cors({
//     origin: process.env.CORS_URL,
//   })
// );

app.use(cors({
  origin: "*"
}));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    service: "user-service",
    status: "healthy",
  });
});

// Routes
app.use("/api/users", userRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});