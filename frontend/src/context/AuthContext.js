import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {
      name: "SANCHEZ, JESSA MARIE",
      email: "admin@example.com",
      contact: "+639123456789",
      role: "Administrator",
      bio: "No biography has been added",
      links: "No links have been added",
      image: "/assets/images/profile.png", 
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [user, token]);

  const login = (userData, jwtToken) => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || {};
    const mergedUser = { ...userData, image: savedUser.image || userData.image };
    setUser(mergedUser);
    setToken(jwtToken);
  };

  const logout = () => {
    setToken(null); 
  };

  const updateProfile = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
