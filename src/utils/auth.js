const tokenName = "spotify_clone_token";

// Set the token to localStorage
export const setToken = (token) => {
  localStorage.setItem(tokenName, token);
};

// Get the token from localStorage
export const getToken = () => {
  return localStorage.getItem(tokenName);
};

// Remove the token from localStorage
export const removeToken = () => {
  localStorage.removeItem(tokenName);
};

// Decode the JWT token and retrieve user information
export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    // For development token, try to get user data from localStorage
    if (token === "test_token_for_development") {
      console.log("Using development token, checking for user data");
      // Try to get user data from localStorage
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          console.log("Found user data in localStorage:", parsedUserData);
          return parsedUserData;
        } catch (e) {
          console.error("Error parsing user data from localStorage:", e);
        }
      }
      
      // Fallback to default user if no data found
      return {
        id: "user123",
        username: "testuser",
        email: "test@example.com"
      };
    }

    // For real JWT tokens
    try {
      // Split the token and decode the payload (the middle part of JWT)
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Check if the token has expired by comparing the expiration timestamp with the current time
      if (payload.exp && payload.exp < Date.now() / 1000) {
        // If expired, remove the token and return null
        removeToken();
        return null;
      }

      // Return the user data stored in the token payload
      return payload.user || payload;
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      removeToken();
      return null;
    }
  } catch (error) {
    console.error("Error processing token:", error);
    removeToken();
    return null;
  }
};

export const parseToken = (token) => {
  try {
    if (!token) return null;

    // Split the token and get the payload part
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    // Convert base64Url to base64 and decode
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
};

// Custom hook for authentication
export const useAuth = () => {
  const user = getUserFromToken();
  const isAuthenticated = !!user;

  return {
    isAuthenticated,
    user,
  };
};
