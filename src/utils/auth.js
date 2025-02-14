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
    // Split the token and decode the payload (the middle part of JWT)
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Check if the token has expired by comparing the expiration timestamp with the current time
    if (payload.exp < Date.now() / 1000) {
      // If expired, remove the token and return null
      removeToken();
      return null;
    }

    // Return the user data stored in the token payload
    return payload.user;
  } catch (error) {
    console.error("Error decoding token:", error);
    removeToken();
    return null;
  }
};
