import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";

import Register from "./page/authentication/Register";
import Login from "./page/authentication/Login";
import Try from "./page/authentication/Try";
import ForgotPassword from "./page/authentication/ForgotPassword"; // <-- Add this

import UserDashboard from "./page/user/Dashboard";
import AdminDashboard from "./page/admin/Dashboard";
import Profile from "./page/user/Profile";

import ProtectedRoute from "./components/ProtectedRoute"; // <-- check the name (it was cut off in your snippet)
import { AuthContext } from "./context/AuthContext"; // <-- Make sure you have this

function Navbar({ logout }) {
  const location = useLocation();

  if (location.pathname === "/register" || location.pathname === "/login" || location.pathname === "/forgot-password") {
    return null;
  }

  return (
    <nav style={{ padding: "10px" }}>
      <Link to="/register">Register</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/try">Try</Link> |{" "}
      <Link to="/user/dashboard">User Dashboard</Link> |{" "}
      <Link to="/admin/dashboard">Admin Dashboard</Link> |{" "}
      <Link to="/user/profile">Profile</Link>
      <button onClick={logout} style={{ marginLeft: "10px" }}>
        Logout
      </button>
    </nav>
  );
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
      </Routes>
    </Router>
  );
}

export default App;
