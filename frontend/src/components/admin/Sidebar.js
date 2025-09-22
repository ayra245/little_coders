import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiLogOut, FiHome, FiUsers, FiBook } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import "../../page/admin/Lessons.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="avatar logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Logo"
          />
        </div>
        <div className="brand">Little Coders</div>
      </div>

      <hr className="divider" />

      <nav>
        <ul>
          <li>
            <button
              className={`nav-btn ${isActive("/admin/dashboard") ? "active" : ""}`}
              onClick={() => navigate("/admin/dashboard")}
            >
              <FiHome className="icon" /> Dashboard
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${isActive("/admin/users") ? "active" : ""}`}
              onClick={() => navigate("/admin/users")}
            >
              <FiUsers className="icon" /> Users
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${isActive("/admin/lessons") ? "active" : ""}`}
              onClick={() => navigate("/admin/lessons")}
            >
              <FiBook className="icon" /> Lessons
            </button>
          </li>
        </ul>
      </nav>

      <hr className="divider" />

      <div
        className="sidebar-footer"
        onClick={() => navigate("/admin/profile")}
        style={{ cursor: "pointer" }}
      >
        <div className="avatar small">
          <img src={user?.image || "/assets/images/profile.png"} alt="Profile" />
        </div>
        <div className="user-info">
          <span className="username">{user?.name || "Admin"}</span>
          <span className="role">{user?.role || "Administrator"}</span>
        </div>
        <button
          className="logout-btn"
          title="Logout"
          onClick={(e) => {
            e.stopPropagation();
            alert("Logging out...");
            navigate("/login");
          }}
        >
          <FiLogOut size={24} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
