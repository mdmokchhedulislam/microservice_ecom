
import axios from "axios";

const PRODUCT_SERVICE_URL = "/api/products";

export const getProducts = async () => {
  const response = await axios.get(PRODUCT_SERVICE_URL);

  return response.data.products;
};

export const getProductById = async (id) => {
  const response = await axios.get(
    `${PRODUCT_SERVICE_URL}/${id}`
  );

  return response.data.product;
};