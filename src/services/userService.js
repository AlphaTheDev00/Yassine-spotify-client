import api from "../utils/api.js";

// Signup API Service
export const signup = async (userData) => {
  try {
    // Remove confirmPassword and isArtist from the data
    const { confirmPassword, isArtist, ...cleanUserData } = userData;

    console.log("Sending registration data:", cleanUserData);
    const response = await api.post("/auth/register", cleanUserData);
    console.log("Registration response:", response.data);
    // Return the full response data structure
    return response.data;
  } catch (error) {
    console.error(
      "Signup error details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Signin API Service
export const signin = async (credentials) => {
  try {
    console.log("Sending login request to:", "/auth/login");
    console.log("With credentials:", credentials);

    const response = await api.post("/auth/login", credentials);

    console.log("Login response:", response.data);

    // Check if we have a valid response with token
    if (response.data && response.data.token) {
      return response.data;
    } else {
      console.error("Invalid response structure:", response.data);
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error(
      "Login error details:",
      error.response?.data || error.message
    );
    throw error;
  }
};
