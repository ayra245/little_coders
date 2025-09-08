import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load user from localStorage, or default user if none
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {
      name: "SANCHEZ, JESSA MARIE",
      email: "admin@example.com",
      contact: "+639123456789",
      role: "Administrator",
      bio: "No biography has been added",
      links: "No links have been added",
      image: "/assets/images/profile.png", // default image
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  // Persist user and token whenever they change
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [user, token]);

  // Login function
  const login = (userData, jwtToken) => {
    // Merge with existing user data to keep profile image
    const savedUser = JSON.parse(localStorage.getItem("user")) || {};
    const mergedUser = { ...userData, image: savedUser.image || userData.image };
    setUser(mergedUser);
    setToken(jwtToken);
  };

  // Logout function
  const logout = () => {
    setToken(null); // remove token
    // Keep user data in localStorage for profile persistence
  };

  // Update profile helper
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
