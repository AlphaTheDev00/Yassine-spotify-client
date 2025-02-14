import { createContext, useContext, useState, useEffect } from "react";
import { getUserFromToken } from "../utils/auth"; // Helper function to get user from token

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromToken());

  useEffect(() => {
    setUser(getUserFromToken()); // Ensure user updates when the token changes
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
