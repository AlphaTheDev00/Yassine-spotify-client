import api from "../utils/api.js";

// Signup API Service
export const signup = async (userData) => {
  try {
    // Remove confirmPassword and isArtist from the data
    const { confirmPassword, isArtist, ...cleanUserData } = userData;

    console.log("Sending registration data:", cleanUserData);
    
    // Use the Netlify function path for authentication
    const endpoint = "/.netlify/functions/api/auth/register";
      
    console.log(`Using authentication endpoint: ${endpoint}`);
    
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
    // Use the Netlify function path for authentication
    const endpoint = "/.netlify/functions/api/auth/login";
      
    console.log(`Using authentication endpoint: ${endpoint}`);
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
