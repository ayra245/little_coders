import React from "react";
import "./Lessons.css";
import { FiLogOut, FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function CreateLesson() {
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
          Create Lesson
        </div>
        <hr style={{ margin: "32px 0 24px 0", border: "none", borderTop: "2px solid #aaa" }} />

        
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Lesson Header</div>
          <div style={{
            background: "#ddd",
            borderRadius: "12px",
            padding: "32px 0",
            fontSize: "2.2rem",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span style={{ marginLeft: "24px" }}>Lesson Name</span>
            <button style={{
              marginRight: "24px",
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}>
              <FiEdit2 size={20} />
            </button>
          </div>
        </div>

        
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Description</div>
          <div style={{
            background: "#ddd",
            borderRadius: "12px",
            padding: "32px 0",
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span style={{ marginLeft: "24px" }}></span>
            <button style={{
              marginRight: "24px",
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}>
              <FiEdit2 size={20} />
            </button>
          </div>
        </div>

       
        <div style={{ marginBottom: "40px" }}>
          <div style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Objectives</div>
          <div style={{
            background: "#ddd",
            borderRadius: "12px",
            padding: "32px 0",
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span style={{ marginLeft: "24px" }}></span>
            <button style={{
              marginRight: "24px",
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}>
              <FiEdit2 size={20} />
            </button>
          </div>
        </div>

       
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}>
          <button
            className="btn cancel"
            style={{
              background: "#ddd",
              color: "#222",
              border: "none",
              borderRadius: "8px",
              padding: "12px 32px",
              fontSize: "1.1rem",
              cursor: "pointer"
            }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="btn save"
            style={{
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 32px",
              fontSize: "1.1rem",
              cursor: "pointer"
            }}
            onClick={() => alert("Saved!")}
          >
            Save and Manage
          </button>
        </div>
      </main>
    </div>
  );
}

export default CreateLesson;