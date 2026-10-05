const axios = require("axios");

const getProductById = async (productId) => {
  try {
    const response = await axios.get(
      `${process.env.PRODUCT_SERVICE_URL}/api/products/${productId}`
    );

    return response.data.product;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }

    throw new Error("Product service unavailable");
  }
};

const reduceStock = async (productId, quantity) => {
  try {
    const response = await axios.put(
      `${process.env.PRODUCT_SERVICE_URL}/api/products/${productId}/stock`,
      {
        quantity,
      }
    );

    return response.data.product;
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error(
        error.response.data.message
      );
    }

    throw new Error("Product service unavailable");
  }
};

module.exports = {
  getProductById,
  reduceStock,
};