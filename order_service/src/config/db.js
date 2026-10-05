const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Order MongoDB connected successfully");
  } catch (error) {
    console.error(
      "Order MongoDB connection failed:",
      error.message
    );

    process.exit(1);
  }
};

module.exports = connectDB;