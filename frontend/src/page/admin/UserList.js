import React, { useEffect, useState } from "react";
import "./Lessons.css"; 
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";  


function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); 
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
      
      <Sidebar />   

      
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
