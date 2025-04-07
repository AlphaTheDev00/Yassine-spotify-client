import api from "../utils/api.js";

// Signup API Service
export const signup = async (userData) => {
  try {
    // Remove confirmPassword and isArtist from the data
    const { confirmPassword, isArtist, ...cleanUserData } = userData;

    console.log("Sending registration data:", cleanUserData);
    const response = await api.post("/api/auth/register", cleanUserData);
    console.log("Registration response:", response.data);
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
    console.log("Sending login request to:", "/api/auth/login");
    console.log("With credentials:", credentials);

    const response = await api.post("/api/auth/login", credentials);

    console.log("Login response:", response.data);

    // Check if we have a valid response with user and token
    if (response.data && response.data.user && response.data.token) {
      return response.data;
    } else {
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
