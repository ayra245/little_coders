import React from "react";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="auth-container">
      <div className="auth-box" style={{ width: "600px" }}>
        <h1 style={{ color: "#b57edc", fontSize: "16px", marginBottom: "20px" }}>
          👑 Admin Dashboard
        </h1>
        <p style={{ fontSize: "12px" }}>
          Welcome, <strong>{user?.username || "Admin"}</strong>!
        </p>
        <p style={{ fontSize: "12px", marginBottom: "20px" }}>
          Your role: <strong>{user?.role}</strong>
        </p>

        <hr style={{ border: "1px solid #b57edc", margin: "20px 0" }} />

        <h3 style={{ fontSize: "14px", color: "#2e7d32", marginBottom: "15px" }}>
          Admin Controls
        </h3>
        <ul style={{ textAlign: "left", fontSize: "12px", lineHeight: "1.8" }}>
          <li>Manage Users</li>
          <li>View Reports</li>
          <li>System Settings</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
