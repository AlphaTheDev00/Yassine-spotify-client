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
    console.log("Decoded token payload:", payload);

    // Check if the token has expired by comparing the expiration timestamp with the current time
    if (payload.exp < Date.now() / 1000) {
      console.log("Token expired, removing token");
      // If expired, remove the token and return null
      removeToken();
      return null;
    }

    // Return the user data stored in the token payload
    if (payload.user) {
      console.log("User data found in token:", payload.user);
      return payload.user;
    } else {
      console.log("No user data in token, using payload as user:", payload);
      // Fallback for older token structure
      return {
        _id: payload.id,
        email: payload.email,
        username: payload.username,
        isArtist: payload.isArtist
      };
    }
  } catch (error) {
    console.error("Error decoding token:", error);
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

    // Convert base64 to plain text
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
