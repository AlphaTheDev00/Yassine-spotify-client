import axios from "axios";
import { getToken, removeToken } from "./auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

console.log(`API client initialized with baseURL: ${API_URL}`);

// Test the API connection on initialization
api
  .get("/test")
  .then((response) => {
    console.log("API connection test successful:", response.data);
  })
  .catch((error) => {
    console.error("API connection test failed:", error.message);
    console.log("Check if your API server is running at:", API_URL);
  });

// Add a request interceptor to automatically add the auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Debug: Log the token being sent (first 20 chars only for security)
      console.log(
        `Request to ${config.url} with token: ${token.substring(0, 20)}...`
      );
    } else {
      console.log(`Request to ${config.url} without token`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url} successful`);
    return response;
  },
  (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response && error.response.status === 401) {
      console.error(
        `Authentication error for ${error.config.url}:`,
        error.response.data
      );

      // Don't redirect if already on login or register page
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/register") {
        console.log("Redirecting to login page due to auth error");

        // Clear the invalid token
        removeToken();

        // Store the current URL to redirect back after login
        sessionStorage.setItem("redirectAfterLogin", currentPath);

        // Use window.location.replace instead of href to prevent adding to browser history
        // This helps prevent redirect loops
        window.location.replace("/login");

        // Return a new promise that never resolves to stop further error handling
        return new Promise(() => {});
      }
    } else if (error.response) {
      console.error(
        `Error ${error.response.status} for ${error.config.url}:`,
        error.response.data
      );
      // Display user-friendly error message based on status code
      if (error.response.status === 404) {
        // Handle not found errors
        console.log("Resource not found");
      } else if (error.response.status >= 500) {
        // Handle server errors
        console.log("Server error occurred. Please try again later.");
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      console.log("Network issue - please check your connection");
    } else {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
