const Order = require("../models/Order");

const { getUserById } = require("../services/userService");

const {
  getProductById,
  reduceStock,
} = require("../services/productService");

const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    // Validate input
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({
        message: "User ID and order items are required",
      });
    }

    // Check user
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    // Check every product
    for (const item of items) {
      const product = await getProductById(
        item.productId
      );

      if (!product) {
        return res.status(404).json({
          message: `Product ${item.productId} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const subtotal =
        product.price * item.quantity;

      orderItems.push({
        productId: product._id.toString(),
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal,
      });

      totalAmount += subtotal;
    }

    // Reduce stock
    for (const item of items) {
      await reduceStock(
        item.productId,
        item.quantity
      );
    }

    // Create order
    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrdersByUser,
};