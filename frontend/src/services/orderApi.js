
import axios from "axios";

const ORDER_SERVICE_URL = "/api/orders";

export const createOrder = async (orderData) => {
  const response = await axios.post(
    ORDER_SERVICE_URL,
    orderData
  );

  return response.data;
};

export const getOrdersByUser = async (userId) => {
  const response = await axios.get(
    `${ORDER_SERVICE_URL}/user/${userId}`
  );

  return response.data;
};
