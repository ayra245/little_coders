import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import "./Lessons.css";
import { useNavigate } from "react-router-dom";

function LessonsPage() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);

  // Load saved lessons
  useEffect(() => {
    const savedLessons = JSON.parse(localStorage.getItem("lessons")) || [];
    setLessons(savedLessons);
  }, []);

  // Modal states
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showEditLessonModal, setShowEditLessonModal] = useState(false);
  const [showSubItemModal, setShowSubItemModal] = useState(false);

  // Current lesson/module being edited
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [activeModuleId, setActiveModuleId] = useState(null);

  // Form states
  const [moduleForm, setModuleForm] = useState({
    moduleName: "",
    type: "text",
    moduleContent: "",
    moduleFile: null,
  });

  const [editLessonForm, setEditLessonForm] = useState({
    lessonName: "",
    description: "",
    objectives: "",
  });

  const [subItemForm, setSubItemForm] = useState({
    type: "lesson", // "lesson" | "activity"
    title: "",
    inputType: "text", // text | file
    content: "",
    file: null,
  });

  // Save Module
  const handleModuleSave = () => {
    if (!moduleForm.moduleName) {
      alert("Please enter a module title.");
      return;
    }

    const newModule = {
      id: Date.now(),
      name: moduleForm.moduleName,
      type: moduleForm.type,
      content: moduleForm.type === "text" ? moduleForm.moduleContent : null,
      file: moduleForm.type === "file" ? moduleForm.moduleFile : null,
      lessons: [],
      activities: [],
    };

    const updatedLessons = lessons.map((l) =>
      l.id === activeLessonId
        ? { ...l, modules: [...(l.modules || []), newModule] }
        : l
    );

    setLessons(updatedLessons);
    localStorage.setItem("lessons", JSON.stringify(updatedLessons));

    setModuleForm({
      moduleName: "",
      type: "text",
      moduleContent: "",
      moduleFile: null,
    });
    setShowModuleModal(false);
  };

  // Save Edited Lesson
  const handleLessonEditSave = () => {
    const updatedLessons = lessons.map((l) =>
      l.id === activeLessonId ? { ...l, ...editLessonForm } : l
    );
    setLessons(updatedLessons);
    setShowEditLessonModal(false);
    localStorage.setItem("lessons", JSON.stringify(updatedLessons));
  };

  // Save SubItem
  const handleSubItemSave = () => {
    const newSubItem = {
      type: subItemForm.type,
      title: subItemForm.title,
      inputType: subItemForm.inputType,
      content: subItemForm.inputType === "text" ? subItemForm.content : null,
      file: subItemForm.inputType === "file" ? subItemForm.file : null,
    };

    const updatedLessons = lessons.map((l) =>
      l.id === activeLessonId
        ? {
            ...l,
            modules: l.modules.map((m) =>
              m.id === activeModuleId
                ? {
                    ...m,
                    lessons:
                      subItemForm.type === "lesson"
                        ? [...(m.lessons || []), newSubItem]
                        : m.lessons,
                    activities:
                      subItemForm.type === "activity"
                        ? [...(m.activities || []), newSubItem]
                        : m.activities,
                  }
                : m
            ),
          }
        : l
    );

    setLessons(updatedLessons);
    setSubItemForm({
      type: "lesson",
      title: "",
      inputType: "text",
      content: "",
      file: null,
    });
    setShowSubItemModal(false);
    localStorage.setItem("lessons", JSON.stringify(updatedLessons));
  };

  // Cancel
  const handleCancel = () => {
  if (window.confirm("Are you sure you want to cancel? Unsaved changes will be lost.")) {
    navigate(-1); // Goes back to the previous page in history
  }
};


  // Save & Manage
  const handleSaveAndManage = () => {
  // Save all lessons to localStorage
  localStorage.setItem("lessons", JSON.stringify(lessons));

  // Navigate to ManageLesson page
  navigate("/admin/lessons", { state: { lessons } });
};


  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="main-content" style={{ padding: "40px 32px" }}>
        <div
          style={{
            background: "#e5e5e5",
            borderRadius: "12px",
            padding: "20px",
            textAlign: "center",
            fontSize: "1.8rem",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          Manage Lesson
        </div>

        <hr style={{ marginBottom: "20px" }} />

        {lessons.length === 0 && (
          <p style={{ textAlign: "center", color: "#666" }}>No lessons created yet.</p>
        )}

        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            style={{
              background: "#f0f0f0",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            {/* Add Module + Delete Lesson */}
            <div style={{ textAlign: "right", marginBottom: "10px" }}>
              <button
                style={{
                  background: "#222",
                  color: "#fff",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginRight: "8px",
                }}
                onClick={() => {
                  setActiveLessonId(lesson.id);
                  setShowModuleModal(true);
                }}
              >
                Add Module
              </button>

              <button
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this lesson?")) {
                    const updatedLessons = lessons.filter((l) => l.id !== lesson.id);
                    setLessons(updatedLessons);
                    localStorage.setItem("lessons", JSON.stringify(updatedLessons));
                  }
                }}
              >
                🗑️
              </button>
            </div>

            {/* Lesson Info */}
            <div
              style={{
                background: "#d9d9d9",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "16px",
                position: "relative",
              }}
            >
              <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
                {lesson.lessonName}
              </h2>
              <p style={{ textAlign: "center" }}>{lesson.description}</p>
              <p style={{ textAlign: "center" }}>
                <strong>Objectives:</strong> {lesson.objectives}
              </p>

              {/* Edit Button */}
              <button
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  padding: "4px 10px",
                  fontSize: "0.8rem",
                  background: "#222",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setActiveLessonId(lesson.id);
                  setEditLessonForm({
                    lessonName: lesson.lessonName,
                    description: lesson.description,
                    objectives: lesson.objectives,
                  });
                  setShowEditLessonModal(true);
                }}
              >
                Edit
              </button>
            </div>

            {/* Modules */}
            {lesson.modules && lesson.modules.length > 0 ? (
              lesson.modules.map((mod) => (
                <div
                  key={mod.id}
                  style={{
                    background: "#e5e5e5",
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <strong>{mod.name}</strong>
                    <div>
                      {/* Delete Module */}
                      <button
                        style={{
                          background: "red",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          marginRight: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (window.confirm("Delete this module?")) {
                            const updatedLessons = lessons.map((l) =>
                              l.id === lesson.id
                                ? {
                                    ...l,
                                    modules: l.modules.filter((m) => m.id !== mod.id),
                                  }
                                : l
                            );
                            setLessons(updatedLessons);
                            localStorage.setItem(
                              "lessons",
                              JSON.stringify(updatedLessons)
                            );
                          }
                        }}
                      >
                        🗑️
                      </button>

                      <button
                        style={{
                          background: "#000",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          marginRight: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setActiveLessonId(lesson.id);
                          setActiveModuleId(mod.id);
                          setSubItemForm({
                            type: "lesson",
                            title: "",
                            inputType: "text",
                            content: "",
                            file: null,
                          });
                          setShowSubItemModal(true);
                        }}
                      >
                        Add Lesson
                      </button>
                      <button
                        style={{
                          background: "#000",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setActiveLessonId(lesson.id);
                          setActiveModuleId(mod.id);
                          setSubItemForm({
                            type: "activity",
                            title: "",
                            inputType: "text",
                            content: "",
                            file: null,
                          });
                          setShowSubItemModal(true);
                        }}
                      >
                        Add Activity
                      </button>
                    </div>
                  </div>

                  {/* Subitems */}
                  {mod.lessons?.map((s, i) => (
                    <p key={i}>
                      📘 Lesson: {s.title}{" "}
                      {s.inputType === "file" && s.file && <span>📎 {s.file.name}</span>}
                      {s.inputType === "text" && s.content && <span> — {s.content}</span>}
                      <button
                        style={{
                          background: "red",
                          color: "#fff",
                          border: "none",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (window.confirm("Delete this lesson?")) {
                            const updatedLessons = lessons.map((l) =>
                              l.id === lesson.id
                                ? {
                                    ...l,
                                    modules: l.modules.map((m) =>
                                      m.id === mod.id
                                        ? {
                                            ...m,
                                            lessons: m.lessons.filter(
                                              (_, idx) => idx !== i
                                            ),
                                          }
                                        : m
                                    ),
                                  }
                                : l
                            );
                            setLessons(updatedLessons);
                            localStorage.setItem(
                              "lessons",
                              JSON.stringify(updatedLessons)
                            );
                          }
                        }}
                      >
                        🗑️
                      </button>
                    </p>
                  ))}
                  {mod.activities?.map((s, i) => (
                    <p key={i}>
                      📝 Activity: {s.title}{" "}
                      {s.inputType === "file" && s.file && <span>📎 {s.file.name}</span>}
                      {s.inputType === "text" && s.content && <span> — {s.content}</span>}
                      <button
                        style={{
                          background: "red",
                          color: "#fff",
                          border: "none",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (window.confirm("Delete this activity?")) {
                            const updatedLessons = lessons.map((l) =>
                              l.id === lesson.id
                                ? {
                                    ...l,
                                    modules: l.modules.map((m) =>
                                      m.id === mod.id
                                        ? {
                                            ...m,
                                            activities: m.activities.filter(
                                              (_, idx) => idx !== i
                                            ),
                                          }
                                        : m
                                    ),
                                  }
                                : l
                            );
                            setLessons(updatedLessons);
                            localStorage.setItem(
                              "lessons",
                              JSON.stringify(updatedLessons)
                            );
                          }
                        }}
                      >
                        🗑️
                      </button>
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  color: "#666",
                }}
              >
                No modules added yet.
              </p>
            )}
          </div>
        ))}

        {/* Action Buttons */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            style={{
              background: "gray",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              marginRight: "12px",
              cursor: "pointer",
            }}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            style={{
              background: "green",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={handleSaveAndManage} // just call without argument
          >
            Save and Manage
          </button>
        </div>

        {/* ======= Modals ======= */}
        {showModuleModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add Module</h2>
              <input
                type="text"
                placeholder="Module Title"
                value={moduleForm.moduleName}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, moduleName: e.target.value })
                }
              />
              <label>Choose Input Type:</label>
              <select
                value={moduleForm.type}
                onChange={(e) =>
                  setModuleForm({
                    ...moduleForm,
                    type: e.target.value,
                    moduleContent: "",
                    moduleFile: null,
                  })
                }
              >
                <option value="text">Write Content</option>
                <option value="file">Upload File</option>
              </select>
              {moduleForm.type === "file" ? (
                <input
                  type="file"
                  onChange={(e) =>
                    setModuleForm({ ...moduleForm, moduleFile: e.target.files[0] })
                  }
                />
              ) : (
                <textarea
                  placeholder="Write module content here..."
                  value={moduleForm.moduleContent}
                  onChange={(e) =>
                    setModuleForm({ ...moduleForm, moduleContent: e.target.value })
                  }
                />
              )}
              <div className="modal-actions">
                <button onClick={() => setShowModuleModal(false)}>Cancel</button>
                <button onClick={handleModuleSave}>Save</button>
              </div>
            </div>
          </div>
        )}

        {showEditLessonModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Edit Lesson</h2>
              <label>Lesson Name</label>
              <input
                type="text"
                value={editLessonForm.lessonName}
                onChange={(e) =>
                  setEditLessonForm({ ...editLessonForm, lessonName: e.target.value })
                }
              />
              <label>Description</label>
              <textarea
                value={editLessonForm.description}
                onChange={(e) =>
                  setEditLessonForm({ ...editLessonForm, description: e.target.value })
                }
              />
              <label>Objectives</label>
              <textarea
                value={editLessonForm.objectives}
                onChange={(e) =>
                  setEditLessonForm({ ...editLessonForm, objectives: e.target.value })
                }
              />
              <div className="modal-actions">
                <button onClick={() => setShowEditLessonModal(false)}>Cancel</button>
                <button onClick={handleLessonEditSave}>Save</button>
              </div>
            </div>
          </div>
        )}

        {showSubItemModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add {subItemForm.type === "lesson" ? "Lesson" : "Activity"}</h2>
              <input
                type="text"
                placeholder="Title"
                value={subItemForm.title}
                onChange={(e) =>
                  setSubItemForm({ ...subItemForm, title: e.target.value })
                }
              />

              <label>Choose Input Type:</label>
              <select
                value={subItemForm.inputType}
                onChange={(e) =>
                  setSubItemForm({
                    ...subItemForm,
                    inputType: e.target.value,
                    content: "",
                    file: null,
                  })
                }
              >
                <option value="text">Write Content</option>
                <option value="file">Upload File</option>
              </select>

              {subItemForm.inputType === "file" ? (
                <input
                  type="file"
                  onChange={(e) =>
                    setSubItemForm({ ...subItemForm, file: e.target.files[0] })
                  }
                />
              ) : (
                <textarea
                  placeholder="Write content here..."
                  value={subItemForm.content}
                  onChange={(e) =>
                    setSubItemForm({ ...subItemForm, content: e.target.value })
                  }
                />
              )}

              <div className="modal-actions">
                <button onClick={() => setShowSubItemModal(false)}>Cancel</button>
                <button onClick={handleSubItemSave}>Save</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default LessonsPage;
