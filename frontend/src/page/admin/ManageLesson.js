import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar"; 
import "./Lessons.css"; 
import { useNavigate, useLocation } from "react-router-dom";

function ManageLesson() {
  const navigate = useNavigate();
  const location = useLocation();

  const [lessons, setLessons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLessons, setFilteredLessons] = useState([]);

  
  useEffect(() => {
    if (location.state && location.state.lessons) {
      setLessons(location.state.lessons);
      setFilteredLessons(location.state.lessons);
    } else {
      const localLessons = JSON.parse(localStorage.getItem("lessons")) || [];
      if (localLessons.length > 0) {
        setLessons(localLessons);
        setFilteredLessons(localLessons);
      }
    }
  }, [location.state]);

  
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLessons(lessons);
    } else {
      const filtered = lessons.filter((lesson) =>
        lesson.lessonName
          ? lesson.lessonName.toLowerCase().includes(searchTerm.toLowerCase())
          : lesson.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLessons(filtered);
    }
  }, [searchTerm, lessons]);

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
          Manage Lessons
        </div>

        
        <div style={{ display: "flex", alignItems: "center", marginBottom: "32px" }}>
          <input
            type="text"
            placeholder="Search lesson..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              fontSize: "1.1rem",
              borderRadius: "8px",
              border: "1px solid #bbb",
            }}
          />
          <button
            style={{
              marginLeft: "8px",
              background: "#ddd",
              borderRadius: "8px",
              border: "none",
              padding: "12px 24px",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
            disabled
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
              cursor: "pointer",
            }}
          >
            Add Lesson
          </button>
        </div>

        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson) => (
              <div
                key={lesson.id || lesson._id}
                style={{
                  background: "#f5f5f5",
                  borderRadius: "8px",
                  padding: "16px",
                  width: "30%",
                  minHeight: "150px",
                }}
              >
                <h3>{lesson.lessonName || lesson.name}</h3>
                <p>{lesson.description}</p>
                <button
                  className="btn"
                  onClick={() =>
                    navigate(
                      `/admin/lessons/${lesson.id || lesson._id}/manage`,
                      { state: { lesson } }
                    )
                  }
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
