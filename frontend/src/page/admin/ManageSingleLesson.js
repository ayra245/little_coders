import React from "react";
import "./Lessons.css";
import { FiLogOut, FiEdit2 } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";

function ManageSingleLesson() {
  const { id } = useParams();
  const navigate = useNavigate();

  
  const lesson = {
    name: "Lesson Name",
    description: "Description",
  };

  return (
    <div className="admin-layout">
      

      
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
          Manage Lesson
        </div>
        <hr style={{ margin: "32px 0 24px 0", border: "none", borderTop: "2px solid #aaa" }} />

       
        <div style={{ marginBottom: "24px", display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 32px",
              fontSize: "1.1rem",
              cursor: "pointer"
            }}
            onClick={() => alert("Add Module clicked!")}
          >
            Add Module
          </button>
        </div>

        
        <div style={{
          background: "#ddd",
          borderRadius: "12px",
          padding: "32px",
          fontSize: "1.3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ fontWeight: "bold", marginBottom: "8px" }}>Description</div>
            <div>{lesson.description}</div>
          </div>
          <div>
            <div style={{ fontWeight: "bold", marginBottom: "8px" }}>Lesson Name</div>
            <div>{lesson.name}</div>
          </div>
          <button style={{
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
      </main>
    </div>
  );
}

export default ManageSingleLesson;