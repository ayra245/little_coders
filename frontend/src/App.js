import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";


import Register from "./page/authentication/Register";
import Login from "./page/authentication/Login";
import Try from "./page/authentication/Try";
import ForgotPassword from "./page/authentication/ForgotPassword"; 
import ResetPassword from "./page/authentication/ResetPassword"; 

import UserDashboard from "./page/user/Dashboard";
import AdminDashboard from "./page/admin/Dashboard";
import Profile from "./page/user/Profile";
import ManageLesson from "./page/admin/ManageLesson";
import CreateLesson from "./page/admin/CreateLesson";
import ManageSingleLesson from "./page/admin/ManageSingleLesson";

import ProtectedRoute from "./components/ProtectedRoute"; 
import { AuthContext } from "./context/AuthContext"; 

function Navbar({ logout }) {
  const location = useLocation();

  if (
    location.pathname === "/register" || 
    location.pathname === "/login" || 
    location.pathname === "/forgot-password" ||
    location.pathname.startsWith("/reset-password") 
  ) {
    return null;
  }
}

function App() {
  const { logout } = useContext(AuthContext);

  return (
    <Router>
      <Navbar logout={logout} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> 
        <Route path="/try" element={<Try />} />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/lessons" element={<ManageLesson />} />
        <Route path="/admin/lessons/create" element={<CreateLesson />} />
        <Route path="/admin/lessons/:id/manage" element={<ManageSingleLesson />} />
      </Routes>
    </Router>
  );
}

export default App;
