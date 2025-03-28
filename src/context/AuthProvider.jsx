import { createContext, useState, useEffect } from "react";
import { getToken, parseToken } from "../utils/auth";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getToken();
        if (token) {
          const userData = parseToken(token);
          console.log("User data from token:", userData);

          if (userData && userData.id) {
            // Fetch full user data from API
            try {
              const response = await api.get(`/auth/user/${userData.id}`);
              setUser(response.data);
            } catch (error) {
              console.error("Error fetching user data:", error);
              // Keep the basic user data from token if API request fails
              setUser(userData);
            }
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
