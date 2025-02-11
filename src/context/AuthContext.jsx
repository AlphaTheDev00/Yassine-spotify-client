import { createContext, useState, useEffect } from "react";
import { useContext } from "react";

import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get("http://localhost:3000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => setUser(response.data.user))
          .catch(() => localStorage.removeItem("token"));
      }
    }
  }, []);

  const login = async (identifier, password) => {
    const response = await axios.post("http://localhost:3000/api/auth/login", {
      identifier,
      password,
    });
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("token");
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
