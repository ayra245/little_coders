// src/components/admin/Sidebar.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import '../../page/admin/Lessons.css';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="avatar logo">
          <img src="/assets/images/logo192.png" alt="Logo" />
        </div>
        <div className="brand">Little Coders</div>
      </div>

      <hr className="divider" />

      {/* Navigation */}
      <nav>
        <ul>
          <li>
            <button
              className={`nav-btn ${isActive("/admin/dashboard") ? "active" : ""}`}
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${isActive("/admin/users") ? "active" : ""}`}
              onClick={() => navigate("/admin/users")}
            >
              Users
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${isActive("/admin/lessons") ? "active" : ""}`}
              onClick={() => navigate("/admin/lessons")}
            >
              Lessons
            </button>
          </li>
        </ul>
      </nav>

      <hr className="divider" />

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="avatar small">
          <img src="/assets/images/profile.png" alt="Profile" />
        </div>
        <div className="user-info">
          <span className="username">Admin Name</span>
          <span className="role">Admin</span>
        </div>
        <button
          className="logout-btn"
          title="Logout"
          onClick={() => alert("Logging out...")}
        >
          <FiLogOut size={26} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
