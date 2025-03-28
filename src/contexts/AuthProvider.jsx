import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { getUserFromToken, removeToken } from "../utils/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to initialize or refresh user from token
  const refreshUser = () => {
    try {
      const userData = getUserFromToken();
      console.log("User data from token:", userData);
      setUser(userData);
    } catch (error) {
      console.error("Error refreshing user:", error);
      removeToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize user when component mounts
  useEffect(() => {
    refreshUser();

    // Listen for storage events (if token changes in another tab)
    const handleStorageChange = (e) => {
      if (e.key === "spotify_clone_token") {
        refreshUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Provide the context value
  const contextValue = {
    user,
    setUser,
    isLoading,
    refreshUser
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
