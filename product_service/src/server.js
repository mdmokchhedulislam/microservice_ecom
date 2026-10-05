const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    service: "product-service",
    status: "healthy",
  });
});

// Product routes
app.use("/api/products", productRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});