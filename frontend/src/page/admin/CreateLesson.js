import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import "./Lessons.css";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function CreateLesson() {
  const navigate = useNavigate();

  const [lessonName, setLessonName] = useState("Lesson Name");
  const [description, setDescription] = useState("Description");
  const [objectives, setObjectives] = useState("Objectives");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (field) => setIsEditing(field);
  const handleSaveEdit = () => setIsEditing(false);

  const handleSave = () => {
    const newLessonId = Date.now(); 
    const newLesson = {
      id: newLessonId,
      lessonName,
      description,
      objectives,
      modules: [],
    };

    
    const savedLessons = JSON.parse(localStorage.getItem("lessons")) || [];
    savedLessons.push(newLesson);
    localStorage.setItem("lessons", JSON.stringify(savedLessons));

    
    navigate(`/admin/lessons/${newLessonId}/manage`, {
      state: { lesson: newLesson, from: "/admin/lessons/page" },
    });
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="main-content" style={{ padding: "40px 32px" }}>
        <div
          style={{
            background: "#ddd",
            borderRadius: "16px",
            padding: "32px 0",
            marginBottom: "24px",
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "500",
          }}
        >
          Create Lesson
        </div>

        <hr style={{ margin: "32px 0 24px 0", border: "none", borderTop: "2px solid #aaa" }} />

        
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Lesson Name</div>
          <div
            style={{
              background: "#ddd",
              borderRadius: "12px",
              padding: "32px 0",
              fontSize: "2.2rem",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {isEditing === "lessonName" ? (
              <input
                type="text"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
                style={{
                  marginLeft: "24px",
                  fontSize: "1.5rem",
                  border: "1px solid #aaa",
                  borderRadius: "8px",
                  padding: "8px",
                }}
              />
            ) : (
              <span style={{ marginLeft: "24px" }}>{lessonName}</span>
            )}
            <button
              style={{
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
                cursor: "pointer",
              }}
              onClick={() =>
                isEditing === "lessonName" ? handleSaveEdit() : handleEdit("lessonName")
              }
            >
              <FiEdit2 size={20} />
            </button>
          </div>
        </div>

        
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Description</div>
          <div
            style={{
              background: "#ddd",
              borderRadius: "12px",
              padding: "32px 0",
              fontSize: "1.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {isEditing === "description" ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  marginLeft: "24px",
                  fontSize: "1.2rem",
                  border: "1px solid #aaa",
                  borderRadius: "8px",
                  padding: "8px",
                  width: "80%",
                }}
              />
            ) : (
              <span style={{ marginLeft: "24px" }}>{description}</span>
            )}
            <button
              style={{
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
                cursor: "pointer",
              }}
              onClick={() =>
                isEditing === "description" ? handleSaveEdit() : handleEdit("description")
              }
            >
              <FiEdit2 size={20} />
            </button>
          </div>
        </div>

        
        <div style={{ marginBottom: "40px" }}>
          <div style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Objectives</div>
          <div
            style={{
              background: "#ddd",
              borderRadius: "12px",
              padding: "32px 0",
              fontSize: "1.3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {isEditing === "objectives" ? (
              <textarea
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                style={{
                  marginLeft: "24px",
                  fontSize: "1.2rem",
                  border: "1px solid #aaa",
                  borderRadius: "8px",
                  padding: "8px",
                  width: "80%",
                }}
              />
            ) : (
              <span style={{ marginLeft: "24px" }}>{objectives}</span>
            )}
            <button
              style={{
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
                cursor: "pointer",
              }}
              onClick={() =>
                isEditing === "objectives" ? handleSaveEdit() : handleEdit("objectives")
              }
            >
              <FiEdit2 size={20} />
            </button>
          </div>
        </div>

      
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}>
          <button
            style={{
              background: "#ddd",
              color: "#222",
              border: "none",
              borderRadius: "8px",
              padding: "12px 32px",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            style={{
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 32px",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
            onClick={handleSave}
          >
            Save and Manage
          </button>
        </div>
      </main>
    </div>
  );
}

export default CreateLesson;
