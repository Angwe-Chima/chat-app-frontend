/* --- contexts/AuthContext.jsx --- */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  const login = (userData) => {
    localStorage.setItem("chat-user", JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }
    setAuthUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("chat-user");
    localStorage.removeItem("token");
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
