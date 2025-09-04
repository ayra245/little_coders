import React from "react";
import "./Lessons.css"; 
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ManageLesson() {
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
     
      <aside className="sidebar">
        <div className="sidebar-header" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "32px" }}>
          <div className="avatar logo" style={{ width: 120, height: 120, marginBottom: "8px" }}>
            <img src="/assets/images/logo192.png" alt="Logo" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
          </div>
          <div className="brand" style={{ marginTop: "8px", fontSize: "1.2rem", color: "#fff", textAlign: "center" }}>Little Coders</div>
        </div>
        <hr style={{ border: "none", borderTop: "2px solid #444", margin: "24px 0 16px 0" }} />
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ margin: "24px 0", color: "#fff", fontSize: "1.1rem", textAlign: "center" }}>Dashboard</li>
            <li style={{ margin: "24px 0", color: "#fff", fontSize: "1.1rem", textAlign: "center" }}>Users</li>
            <li style={{ margin: "24px 0", textAlign: "center" }}>
              <button style={{
                width: "90%",
                padding: "8px 0",
                borderRadius: "8px",
                background: "#e0e0e0",
                color: "#222",
                border: "none",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer"
              }}>Lessons</button>
            </li>
          </ul>
        </nav>
        <hr style={{ border: "none", borderTop: "2px solid #444", margin: "24px 0 16px 0" }} />
        <div
          className="sidebar-footer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px", 
            padding: "0 13px 16px 13px",
            marginTop: "auto"
          }}
        >
          <div className="avatar small" style={{ width: 48, height: 48, minWidth: 48 }}>
            <img
              src="/assets/images/profile.png"
              alt="Profile"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: "110px" }}>
            <span style={{ fontWeight: "bold", fontSize: "1.15rem", lineHeight: "1.1", color: "#fff" }}>Admin Name</span>
            <span className="role" style={{ fontSize: "0.95rem", color: "#aaa", lineHeight: "1.1" }}>Admin</span>
          </div>
          <button
            className="logout-btn"
            title="Logout"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0",
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#e5e5e5",
              color: "#222",
              border: "none",
              cursor: "pointer"
            }}
            onClick={() => {
              
              alert("Logging out...");
            }}
          >
            <FiLogOut size={26} />
          </button>
        </div>
      </aside>

      
      <main className="main-content" style={{ padding: "40px 32px" }}>
        
        <div
          style={{
            background: "#ddd",
            borderRadius: "16px",
            padding: "32px 0",
            marginBottom: "24px",
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "500"
          }}
        >
          Manage Lessons
        </div>

       
        <div style={{ display: "flex", alignItems: "center", marginBottom: "32px" }}>
          <div
            style={{
              background: "#ddd",
              borderRadius: "8px",
              flex: 1,
              padding: "12px 0",
              textAlign: "center",
              fontSize: "1.2rem"
            }}
          >
            Search Bar
          </div>
          <button
            style={{
              marginLeft: "8px",
              background: "#ddd",
              borderRadius: "8px",
              border: "none",
              padding: "12px 24px",
              fontSize: "1.1rem",
              cursor: "pointer"
            }}
          >
            Search
          </button>
          <button
            onClick={() => navigate("/admin/lessons/create")}
            style={{
              marginLeft: "8px",
              background: "#ddd",
              borderRadius: "8px",
              border: "none",
              padding: "12px 24px",
              fontSize: "1.1rem",
              cursor: "pointer"
            }}
          >
            Add Lesson
          </button>
        </div>

        
        <div style={{ display: "flex", gap: "32px" }}>
          <div
            style={{
              background: "#ddd",
              borderRadius: "8px",
              width: "30%",
              height: "200px"
            }}
          ></div>
          <div
            style={{
              background: "#ddd",
              borderRadius: "8px",
              width: "30%",
              height: "200px"
            }}
          ></div>
          <div
            style={{
              background: "#ddd",
              borderRadius: "8px",
              width: "30%",
              height: "200px"
            }}
          ></div>
        </div>
      </main>
    </div>
  );
}

export default ManageLesson;