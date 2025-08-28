import React from "react";
import { Link } from "react-router-dom";

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Dashboard</h1>
      <p>Welcome, {user?.username || "User"}!</p>
      <p>Your role: {user?.role}</p>
      <hr />
      <h3>Quick Links</h3>
      <ul>
        <li>
          <Link to="/user/profile">View Profile</Link>
        </li>
        <li>
          <Link to="/try">Try Feature</Link>
        </li>
      </ul>
    </div>
  );
}

export default UserDashboard;
