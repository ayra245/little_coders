import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import "./Lessons.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function ManageSingleLesson() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const prevPage = location.state?.from || "/admin/lessons/page";

  // Load lesson from localStorage if page refreshed
  const getLessonFromStorage = () => {
    const savedLessons = JSON.parse(localStorage.getItem("lessons")) || [];
    return (
      savedLessons.find((l) => l.id.toString() === id) ||
      location.state?.lesson || {
        id: Date.now(),
        lessonName: "Loading...",
        description: "Loading...",
        objectives: "Loading...",
        modules: [],
      }
    );
  };

  const [lesson, setLesson] = useState(getLessonFromStorage());
  const [modules, setModules] = useState(lesson.modules || []);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showEditLessonModal, setShowEditLessonModal] = useState(false);

  const [moduleForm, setModuleForm] = useState({
    moduleName: "",
    type: "text",
    moduleContent: "",
    moduleFile: null,
  });

  const [editLessonForm, setEditLessonForm] = useState({
    lessonName: lesson.lessonName,
    description: lesson.description,
    objectives: lesson.objectives,
  });

  // Save Module
  const handleModuleSave = () => {
    if (!moduleForm.moduleName) return alert("Enter module title.");

    const newModule = {
      id: Date.now(),
      name: moduleForm.moduleName,
      type: moduleForm.type,
      content: moduleForm.type === "text" ? moduleForm.moduleContent : null,
      file: moduleForm.type === "file" ? moduleForm.moduleFile : null,
    };

    const updatedModules = [...modules, newModule];
    setModules(updatedModules);
    setModuleForm({ moduleName: "", type: "text", moduleContent: "", moduleFile: null });
    setShowModuleModal(false);
  };

  // Save Edited Lesson
  const handleLessonEditSave = () => {
    setLesson({
      ...lesson,
      lessonName: editLessonForm.lessonName,
      description: editLessonForm.description,
      objectives: editLessonForm.objectives,
    });
    setShowEditLessonModal(false);
  };

  // Save all changes to localStorage
  const handleSaveAndManage = () => {
    try {
      const savedLessons = JSON.parse(localStorage.getItem("lessons")) || [];
      const updatedLesson = {
        ...lesson,
        lessonName: editLessonForm.lessonName,
        description: editLessonForm.description,
        objectives: editLessonForm.objectives,
        modules,
      };

      const index = savedLessons.findIndex((l) => l.id === lesson.id);
      if (index !== -1) savedLessons[index] = updatedLesson;
      else savedLessons.push(updatedLesson);

      localStorage.setItem("lessons", JSON.stringify(savedLessons));
      navigate(prevPage);
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    }
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
          Manage Lesson
        </div>

        {/* Add Module */}
        <div style={{ textAlign: "right", marginBottom: "24px" }}>
          <button
            style={{
              background: "#222",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              padding: "12px 24px",
              cursor: "pointer",
            }}
            onClick={() => setShowModuleModal(true)}
          >
            Add Module
          </button>
        </div>

        {/* Lesson Details */}
        <div
          style={{
            background: "#f5f5f5",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3>{lesson.lessonName}</h3>
            <p>{lesson.description}</p>
            <p>
              <strong>Objectives:</strong> {lesson.objectives}
            </p>
          </div>
          <button
            style={{
              background: "#222",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
            }}
            onClick={() => setShowEditLessonModal(true)}
          >
            Edit
          </button>
        </div>

        {/* Modules List */}
        {modules.length > 0 ? (
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "24px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ marginBottom: "16px" }}>Modules</h3>
            {modules.map((mod) => (
              <div
                key={mod.id}
                style={{
                  background: "#f5f5f5",
                  borderRadius: "8px",
                  padding: "12px",
                  marginBottom: "12px",
                }}
              >
                <strong>{mod.name}</strong>
                <div style={{ marginTop: "6px" }}>
                  {mod.type === "text" && <p>{mod.content}</p>}
                  {mod.type === "file" && <p>📎 {mod.file ? mod.file.name : "No file uploaded"}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", fontStyle: "italic", color: "#666" }}>No modules added yet.</p>
        )}

        {/* Footer Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
          <button
            style={{ background: "#bbb", borderRadius: "8px", border: "none", padding: "12px 24px", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            style={{ background: "#222", color: "#fff", borderRadius: "8px", border: "none", padding: "12px 24px", cursor: "pointer" }}
            onClick={handleSaveAndManage}
          >
            Save and Manage
          </button>
        </div>

        {/* Module Modal */}
        {showModuleModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add Module</h2>
              <input
                type="text"
                placeholder="Module Title"
                value={moduleForm.moduleName}
                onChange={(e) => setModuleForm({ ...moduleForm, moduleName: e.target.value })}
              />
              <label style={{ fontWeight: "bold" }}>Choose Input Type:</label>
              <select
                value={moduleForm.type}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, type: e.target.value, moduleContent: "", moduleFile: null })
                }
              >
                <option value="text">Write Content</option>
                <option value="file">Upload File</option>
              </select>
              {moduleForm.type === "file" ? (
                <input type="file" onChange={(e) => setModuleForm({ ...moduleForm, moduleFile: e.target.files[0] })} />
              ) : (
                <textarea
                  placeholder="Write module content here..."
                  value={moduleForm.moduleContent}
                  onChange={(e) => setModuleForm({ ...moduleForm, moduleContent: e.target.value })}
                />
              )}
              <div className="modal-actions">
                <button onClick={() => setShowModuleModal(false)}>Cancel</button>
                <button onClick={handleModuleSave}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Lesson Modal */}
        {showEditLessonModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Edit Lesson</h2>
              <label>Lesson Name</label>
              <input
                type="text"
                value={editLessonForm.lessonName}
                onChange={(e) => setEditLessonForm({ ...editLessonForm, lessonName: e.target.value })}
              />
              <label>Description</label>
              <textarea
                value={editLessonForm.description}
                onChange={(e) => setEditLessonForm({ ...editLessonForm, description: e.target.value })}
              />
              <label>Objectives</label>
              <textarea
                value={editLessonForm.objectives}
                onChange={(e) => setEditLessonForm({ ...editLessonForm, objectives: e.target.value })}
              />
              <div className="modal-actions">
                <button onClick={() => setShowEditLessonModal(false)}>Cancel</button>
                <button onClick={handleLessonEditSave}>Save</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ManageSingleLesson;
