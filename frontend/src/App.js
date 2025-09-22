import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Register from "./page/authentication/Register";
import Login from "./page/authentication/Login";
import Try from "./page/authentication/Try";
import ForgotPassword from "./page/authentication/ForgotPassword";
import ResetPassword from "./page/authentication/ResetPassword";

import UserDashboard from "./page/user/Dashboard";
import ProfilePage from "./page/admin/ProfilePage";
import UserList from "./page/admin/UserList";
import AdminDashboard from "./page/admin/Dashboard";
import Profile from "./page/user/Program";
import ManageLesson from "./page/admin/ManageLesson";
import CreateLesson from "./page/admin/CreateLesson";
import ManageSingleLesson from "./page/admin/ManageSingleLesson";
import LessonsPage from "./page/admin/LessonsPage";
import Lessons from "./page/user/Lessons";   // ✅ Import Lessons

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

        {/* Auth routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/try" element={<Try />} />

        {/* User routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <UserDashboard />
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
        <Route
          path="/user/lessons"   // ✅ NEW ROUTE
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Lessons />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lessons"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageLesson />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lessons/page"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <LessonsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lessons/create"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateLesson />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lessons/:id/manage"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageSingleLesson />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
