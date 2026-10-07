const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();
const cors = require("cors");

app.use(express.json());

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
    service: "order-service",
    status: "healthy",
  });
});

// Routes
app.use("/api/orders", orderRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(
    `Order service running on port ${PORT}`
  );
});