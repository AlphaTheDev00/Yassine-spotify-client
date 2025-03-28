import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL + '/api/auth';

// Signup API Service
export const signup = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/register`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
    // Return a standardized error object even if the server response is missing
    if (error.response && error.response.data) {
      throw error;
    } else {
      throw {
        response: {
          data: {
            message: "Registration failed",
            errors: {
              general: "An unexpected error occurred. Please try again."
            }
          }
        }
      };
    }
  }
};

// Signin API Service
export const signin = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
    // Return a standardized error object even if the server response is missing
    if (error.response && error.response.data) {
      throw error;
    } else {
      throw {
        response: {
          data: {
            message: "Login failed",
            errors: {
              general: "An unexpected error occurred. Please try again."
            }
          }
        }
      };
    }
  }
};
