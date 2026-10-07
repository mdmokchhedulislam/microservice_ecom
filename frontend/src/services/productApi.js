import axios from "axios";

const PRODUCT_SERVICE_URL = import.meta.env.VITE_PRODUCT_SERVICE_URL;

export const getProducts = async () => {
  const response = await axios.get(
    `${PRODUCT_SERVICE_URL}/api/products`
  );

  return response.data.products;
};

export const getProductById = async (id) => {
  const response = await axios.get(
    `${PRODUCT_SERVICE_URL}/api/products/${id}`
  );

  return response.data.product;
};