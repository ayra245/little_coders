// src/page/admin/UserList.js
import React, { useEffect, useState } from "react";
import "./Lessons.css"; 
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch real users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // your JWT token
        const response = await fetch("http://localhost:5000/api/admin/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Unable to load users. Please try again.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div
          className="sidebar-header"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "32px",
          }}
        >
          <div
            className="avatar logo"
            style={{ width: 120, height: 120, marginBottom: "8px" }}
          >
            <img
              src="/assets/images/logo192.png"
              alt="Logo"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
          <div
            className="brand"
            style={{ marginTop: "8px", fontSize: "1.2rem", color: "#fff", textAlign: "center" }}
          >
            Little Coders
          </div>
        </div>
        <hr style={{ border: "none", borderTop: "2px solid #444", margin: "24px 0 16px 0" }} />
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ margin: "24px 0", textAlign: "center" }}>
              <button className="nav-btn" onClick={() => navigate("/admin/dashboard")}>
                Dashboard
              </button>
            </li>
            <li className="nav-btn active" onClick={() => navigate("/admin/users")}>
              Users
            </li>
            <li className="nav-btn" onClick={() => navigate("/admin/lessons")}>
              Lessons
            </li>
          </ul>
        </nav>
        <hr style={{ border: "none", borderTop: "2px solid #444", margin: "24px 0 16px 0" }} />
        <div className="sidebar-footer">
          <div className="avatar small">
            <img src="/assets/images/profile.png" alt="Profile" />
          </div>
          <div className="user-info">
            <span className="username">Admin Name</span>
            <span className="role">Admin</span>
          </div>
          <button className="logout-btn" onClick={() => alert("Logging out...")}>
            <FiLogOut size={26} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="header">
          <h1>User Management</h1>
        </div>

        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div className="lesson-section">
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#f5f5f5",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <thead style={{ background: "#ddd" }}>
                <tr>
                  <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id || index} style={{ borderBottom: "1px solid #ccc" }}>
                      <td style={{ padding: "12px" }}>{index + 1}</td>
                      <td style={{ padding: "12px" }}>{user.name}</td>
                      <td style={{ padding: "12px" }}>{user.email}</td>
                      <td style={{ padding: "12px" }}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ padding: "12px", textAlign: "center" }}>
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default UserList;
