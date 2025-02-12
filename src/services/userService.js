import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL + '/auth';

// Signup API Service
export const signup = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/register`, formData);
    console.log(res)
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Signin API Service
export const signin = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
