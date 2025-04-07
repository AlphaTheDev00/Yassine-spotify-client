import axios from "axios";

// Determine the base URL based on the environment
const getBaseUrl = () => {
  const isProd = import.meta.env.PROD;
  
  if (isProd) {
    // In production, use the deployed API URL without the path
    return "https://musicfy-clone.netlify.app";
  } else {
    // In development, use relative URL (will be handled by Vite proxy)
    return "";
  }
};

// Log the base URL for debugging
console.log("API Base URL:", getBaseUrl());

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Enable sending cookies with requests
});

// Helper function to validate response format
const validateResponse = (response) => {
  if (!response || !response.data) {
    throw new Error("Invalid response format from API: No data received");
  }
  if (typeof response.data !== "object") {
    throw new Error(
      "Invalid response format from API: Response data is not an object"
    );
  }
  return response;
};

// Add request interceptor to attach auth token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Log request details for debugging
    console.log("API Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      baseURL: config.baseURL,
    });
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Validate response format
    try {
      validateResponse(response);
    } catch (error) {
      console.error("Response validation error:", error);
      return Promise.reject(error);
    }

    // Log successful responses for debugging
    console.log("API Response:", {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  (error) => {
    // Log detailed error information
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
      message: error.message,
    });

    // Handle 401 errors
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Only redirect to login if not already on login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
