import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    email: null,
  });

  const login = (email, token) => {
    setAuth({
      isAuthenticated: true,
      token,
      email,
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      email: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
