import { createContext, useState, useEffect } from "react";
import { getToken, getUserFromToken, removeToken } from "../utils/auth";
import { UserContext } from "../contexts/UserContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to refresh user data from token
  const refreshUser = () => {
    try {
      const userFromToken = getUserFromToken();
      console.log("Refreshed user data from token:", userFromToken);
      setUser(userFromToken);
    } catch (error) {
      console.error("Error refreshing user data:", error);
      removeToken(); // Remove invalid token
      setUser(null);
    }
  };

  // Initialize auth state from token on mount
  useEffect(() => {
    console.log("AuthProvider: Initializing auth state");
    refreshUser();
    setLoading(false);

    // Listen for storage events to sync auth state across tabs
    const handleStorageChange = (e) => {
      if (e.key === "spotify_clone_token") {
        console.log("Token changed in another tab, refreshing user");
        refreshUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const contextValue = {
    user,
    setUser,
    loading,
    refreshUser,
    isAuthenticated: !!user,
    logout: () => {
      removeToken();
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
