import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("__AUTH_KEY__");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("__AUTH_KEY__", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("__AUTH_KEY__");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
