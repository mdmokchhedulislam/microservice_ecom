import axios from "axios";

const USER_SERVICE_URL = import.meta.env.VITE_USER_SERVICE_URL;

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${USER_SERVICE_URL}/api/users/register`,
    userData
  );

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${USER_SERVICE_URL}/api/users/login`,
    userData
  );

  return response.data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${USER_SERVICE_URL}/api/users/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};