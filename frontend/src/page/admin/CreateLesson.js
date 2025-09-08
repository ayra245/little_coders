import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import "./Lessons.css";
import { FiEdit2, FiBookOpen } from "react-icons/fi"; 
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
      lessons: [],
      activities: [],
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
      <main
        className="main-content"
        style={{
          padding: "40px 32px",
          background: "#f9f9fb",
          minHeight: "100vh",
        }}
      >
        
        <div
          style={{
            background: "linear-gradient(135deg, #6c63ff, #8d79ff)",
            borderRadius: "20px",
            padding: "28px",
            marginBottom: "28px",
            textAlign: "center",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <FiBookOpen size={36} />
          <span style={{ fontSize: "2rem", fontWeight: "600" }}>
            Create Lesson
          </span>
        </div>

       
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
            Lesson Name
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "20px",
              fontSize: "1.5rem",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #e0e0e0",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            {isEditing === "lessonName" ? (
              <input
                type="text"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
                style={{
                  flex: 1,
                  marginRight: "16px",
                  fontSize: "1.2rem",
                  border: "1px solid #aaa",
                  borderRadius: "8px",
                  padding: "8px",
                }}
              />
            ) : (
              <span>{lessonName}</span>
            )}
            <button
              style={{
                background: "#6c63ff",
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
                isEditing === "lessonName"
                  ? handleSaveEdit()
                  : handleEdit("lessonName")
              }
            >
              <FiEdit2 size={18} />
            </button>
          </div>
        </div>

        
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
            Description
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "20px",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #e0e0e0",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            {isEditing === "description" ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  flex: 1,
                  marginRight: "16px",
                  fontSize: "1rem",
                  border: "1px solid #aaa",
                  borderRadius: "8px",
                  padding: "8px",
                }}
              />
            ) : (
              <span>{description}</span>
            )}
            <button
              style={{
                background: "#6c63ff",
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
                isEditing === "description"
                  ? handleSaveEdit()
                  : handleEdit("description")
              }
            >
              <FiEdit2 size={18} />
            </button>
          </div>
        </div>

        {/* Objectives */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
            Objectives
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "20px",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #e0e0e0",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            {isEditing === "objectives" ? (
              <textarea
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                style={{
                  flex: 1,
                  marginRight: "16px",
                  fontSize: "1rem",
                  border: "1px solid #aaa",
                  borderRadius: "8px",
                  padding: "8px",
                }}
              />
            ) : (
              <span>{objectives}</span>
            )}
            <button
              style={{
                background: "#6c63ff",
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
                isEditing === "objectives"
                  ? handleSaveEdit()
                  : handleEdit("objectives")
              }
            >
              <FiEdit2 size={18} />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}>
          <button
            style={{
              background: "#f1f1f5",
              color: "#333",
              border: "none",
              borderRadius: "10px",
              padding: "12px 28px",
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            style={{
              background: "#6c63ff",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "12px 28px",
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
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
