import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar"; 
import "./Lessons.css"; 
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiPlus } from "react-icons/fi";

function ManageLesson() {
  const navigate = useNavigate();
  const location = useLocation();

  const [lessons, setLessons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLessons, setFilteredLessons] = useState([]);

  const loadFromStorage = () => {
    const localLessons = JSON.parse(localStorage.getItem("lessons")) || [];
    setLessons(localLessons);
    setFilteredLessons(localLessons);
  };

  useEffect(() => {
    loadFromStorage();
    const onFocus = () => loadFromStorage();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [location.key]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLessons(lessons);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = lessons.filter((lesson) => {
        const title = (lesson.lessonName || lesson.name || "").toLowerCase();
        const desc = (lesson.description || "").toLowerCase();
        return title.includes(term) || desc.includes(term);
      });
      setFilteredLessons(filtered);
    }
  }, [searchTerm, lessons]);

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="main-content" style={{ padding: "40px 32px" }}>
        
        
        <div
          style={{
            background: "linear-gradient(135deg, #6a5acd, #7b68ee, #9370db)",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "32px",
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "600",
            color: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          📚 Manage Lessons
        </div>

        
        <div style={{ display: "flex", alignItems: "center", marginBottom: "32px" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", position: "relative" }}>
            <FiSearch style={{ position: "absolute", left: "12px", color: "#888" }} />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                fontSize: "1rem",
                borderRadius: "12px",
                border: "1px solid #ccc",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            />
          </div>
          <button
            onClick={() => navigate("/admin/lessons/create")}
            style={{
              marginLeft: "12px",
              background: "linear-gradient(135deg, #ffb347, #ffcc33)",
              borderRadius: "12px",
              border: "none",
              padding: "12px 20px",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#333",
              cursor: "pointer",
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <FiPlus /> Add Lesson
          </button>
        </div>

        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson) => (
              <div
                key={lesson.id || lesson._id}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "20px",
                  minHeight: "180px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
                }}
              >
                <h3 style={{ marginBottom: "8px", color: "#6a5acd" }}>
                  {lesson.lessonName || lesson.name}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "12px" }}>
                  {lesson.description}
                </p>
                <button
                  onClick={() => navigate(`/admin/lessons/${lesson.id || lesson._id}/manage`)}
                  style={{
                    background: "#6a5acd",
                    color: "white",
                    padding: "10px 18px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                  }}
                >
                  Manage
                </button>
              </div>
            ))
          ) : (
            <p>No lessons found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default ManageLesson;
