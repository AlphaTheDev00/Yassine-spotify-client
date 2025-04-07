import api from "../utils/api.js";

// Signup API Service
export const signup = async (userData) => {
  try {
    // Remove confirmPassword and isArtist from the data
    const { confirmPassword, isArtist, ...cleanUserData } = userData;

    console.log("Sending registration data:", cleanUserData);
    
    // For development environment, use the mock API endpoint
    const isProd = import.meta.env.PROD;
    const endpoint = isProd 
      ? "/.netlify/functions/api/auth/register"
      : "/auth/register";
      
    console.log(`Using ${isProd ? 'production' : 'development'} endpoint: ${endpoint}`);
    
    const response = await api.post(endpoint, cleanUserData);
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
    // For development environment, use the mock API endpoint
    const isProd = import.meta.env.PROD;
    const endpoint = isProd 
      ? "/.netlify/functions/api/auth/login"
      : "/auth/login";
      
    console.log(`Using ${isProd ? 'production' : 'development'} endpoint: ${endpoint}`);
    console.log("With credentials:", credentials);

    const response = await api.post(endpoint, credentials);

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
