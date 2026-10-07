import axios from "axios";

const ORDER_SERVICE_URL = import.meta.env.VITE_ORDER_SERVICE_URL;

export const createOrder = async (orderData) => {
  const response = await axios.post(
    `${ORDER_SERVICE_URL}/api/orders`,
    orderData
  );

  return response.data;
};

export const getOrdersByUser = async (userId) => {
  const response = await axios.get(
    `${ORDER_SERVICE_URL}/api/orders/user/${userId}`
  );

  return response.data;
};