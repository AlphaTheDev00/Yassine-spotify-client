import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const register = (userData) =>
  axios.post(`${API_URL}/register`, userData);
export const login = (identifier, password) =>
  axios.post(`${API_URL}/login`, { identifier, password });
