const axios = require("axios");

const getUserById = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.USER_SERVICE_URL}/api/users/${userId}`
    );

    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }

    throw new Error("User service unavailable");
  }
};

module.exports = {
  getUserById,
};