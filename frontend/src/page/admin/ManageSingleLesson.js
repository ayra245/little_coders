import React, { useState } from "react"; 
import Sidebar from "../../components/admin/Sidebar";
import "./Lessons.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiBook,
  FiTarget,
  FiFileText,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ManageSingleLesson() {
  const navigate = useNavigate();
  const { id } = useParams();

  const getLessonFromStorage = () => {
    const savedLessons = JSON.parse(localStorage.getItem("lessons")) || [];
    return (
      savedLessons.find((l) => l.id.toString() === id) || {
        id: id,
        lessonName: "Loading...",
        description: "Loading...",
        objectives: "Loading...",
        lessons: [],
        activities: [],
        modules: [],
      }
    );
  };

  const [lesson, setLesson] = useState(getLessonFromStorage());
  const [modules, setModules] = useState(lesson.modules || []);
  const [lessons, setLessons] = useState(lesson.lessons || []);
  const [activities, setActivities] = useState(lesson.activities || []);

  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const [editMode, setEditMode] = useState({
    lesson: false,
    activity: null,
    module: null,
  });

  const [editLessonInfo, setEditLessonInfo] = useState(false);

  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState({
    lessons: [],
    activities: [],
    modules: [],
  });

  const [showLessons, setShowLessons] = useState(true);
  const [showActivities, setShowActivities] = useState(true);
  const [showModules, setShowModules] = useState(true);

  // -------------------------------
  // Delete Logic
  // -------------------------------
  const toggleSelect = (type, id) => {
    setSelectedToDelete((prev) => {
      const current = prev[type];
      return {
        ...prev,
        [type]: current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id],
      };
    });
  };

  const handleDeleteSelected = () => {
    if (
      selectedToDelete.lessons.length === 0 &&
      selectedToDelete.activities.length === 0 &&
      selectedToDelete.modules.length === 0
    ) {
      alert("No items selected to delete.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete selected items?"))
      return;

    const nextLessons = lessons.filter(
      (l) => !selectedToDelete.lessons.includes(l.id)
    );
    const nextActivities = activities.filter(
      (a) => !selectedToDelete.activities.includes(a.id)
    );
    const nextModules = modules.filter(
      (m) => !selectedToDelete.modules.includes(m.id)
    );

    setLessons(nextLessons);
    setActivities(nextActivities);
    setModules(nextModules);

    setSelectedToDelete({ lessons: [], activities: [], modules: [] });
    setDeleteMode(false);
    saveToStorage(nextLessons, nextActivities, nextModules);
  };

  // -------------------------------
  // Save to LocalStorage
  // -------------------------------
  
const saveToStorage = (nextLessons, nextActivities, nextModules) => {
  const allLessons = JSON.parse(localStorage.getItem("lessons")) || [];
  const updatedAllLessons = allLessons.map((l) =>
    l.id.toString() === lesson.id.toString()
      ? {
          ...l,
          lessonName: lesson.lessonName,
          description: lesson.description,
          objectives: lesson.objectives,
          lessons: nextLessons,
          activities: nextActivities,
          modules: nextModules,
        }
      : l
  );
  localStorage.setItem("lessons", JSON.stringify(updatedAllLessons));
};

  // -------------------------------
  // Add / Update Items
  // -------------------------------
  const handleAddItem = (type, data) => {
    const newItem = { ...data, id: Date.now() };
    if (type === "lesson") {
      const next = [...lessons, newItem];
      setLessons(next);
      saveToStorage(next, activities, modules);
    } else if (type === "activity") {
      const next = [...activities, newItem];
      setActivities(next);
      saveToStorage(lessons, next, modules);
    } else if (type === "module") {
      const next = [...modules, newItem];
      setModules(next);
      saveToStorage(lessons, activities, next);
    }
  };

  const handleUpdateItem = (type, id, data) => {
    if (type === "lesson") {
      const next = lessons.map((l) => (l.id === id ? { ...l, ...data } : l));
      setLessons(next);
      saveToStorage(next, activities, modules);
      setEditMode({ ...editMode, lesson: false });
    } else if (type === "activity") {
      const next = activities.map((a) => (a.id === id ? { ...a, ...data } : a));
      setActivities(next);
      saveToStorage(lessons, next, modules);
      setEditMode({ ...editMode, activity: null });
    } else if (type === "module") {
      const next = modules.map((m) => (m.id === id ? { ...m, ...data } : m));
      setModules(next);
      saveToStorage(lessons, activities, next);
      setEditMode({ ...editMode, module: null });
    }
  };

  const handleSaveAndManage = () => {
    navigate("/admin/lessons/page");
  };

  // -------------------------------
  // Drag and Drop
  // -------------------------------
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, type } = result;

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    if (type === "lesson") {
      const reordered = reorder(lessons, source.index, destination.index);
      setLessons(reordered);
      saveToStorage(reordered, activities, modules);
    } else if (type === "activity") {
      const reordered = reorder(activities, source.index, destination.index);
      setActivities(reordered);
      saveToStorage(lessons, reordered, modules);
    } else if (type === "module") {
      const reordered = reorder(modules, source.index, destination.index);
      setModules(reordered);
      saveToStorage(lessons, activities, reordered);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="main-content" style={{ padding: "40px 32px" }}>
        <div className="page-header">📚 Manage Lesson</div>

  <div
    className="page-header"
    style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      {/* Button to navigate to LessonsPage */}
      <button
        className="btn add"
        onClick={() => navigate("/admin/lessons/page")}
      >
        📚 List of All Lessons
      </button>

      {/* Page Title */}
      
    </div>
  </div>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <button
            className="btn-primary"
            onClick={() => setShowLessonModal(true)}
          >
            <FiBook /> Add Lesson
          </button>
          <button
            className="btn-primary"
            onClick={() => setShowActivityModal(true)}
          >
            <FiTarget /> Add Activity
          </button>
          <button
            className="btn-primary"
            onClick={() => setShowModuleModal(true)}
          >
            <FiFileText /> Add Module
          </button>
          <button
            className="btn-danger"
            onClick={() => setDeleteMode((prev) => !prev)}
            style={{ background: deleteMode ? "darkred" : "" }}
          >
            <FiTrash2 /> {deleteMode ? "Cancel Delete" : "Select Delete"}
          </button>
        </div>

        {/* MAIN LESSON NAME Card */}
        <div className="card">
          <div>
            <h3>{lesson.lessonName}</h3>
            <p>{lesson.description}</p>
            <p>
              <strong>Objectives:</strong> {lesson.objectives}
            </p>
          </div>
          <button
            className="btn-dark"
            onClick={() => setEditLessonInfo(true)}
          >
            <FiEdit2 /> Edit
          </button>
        </div>

        {/* Drag and Drop Sections */}
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Lessons */}
          <Droppable droppableId="lessons" type="lesson">
            {(provided) => (
              <div
                className="section-card"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div
                  className="section-header"
                  onClick={() => setShowLessons((prev) => !prev)}
                  style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                >
                  {showLessons ? <FiChevronDown /> : <FiChevronRight />}
                  <h3 style={{ marginLeft: "8px" }}>📘 Lessons</h3>
                </div>
                {showLessons &&
                  (lessons.length > 0 ? (
                    lessons.map((lsn, index) => (
                      <Draggable
                        key={lsn.id}
                        draggableId={`lesson-${lsn.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="sub-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {deleteMode && (
                              <input
                                type="checkbox"
                                checked={selectedToDelete.lessons.includes(lsn.id)}
                                onChange={() => toggleSelect("lessons", lsn.id)}
                              />
                            )}
                            <strong>{lsn.title}</strong>
                            <p>{lsn.instruction}</p>
                            <button
                              className="btn-edit-small"
                              onClick={() =>
                                setEditMode({ ...editMode, lesson: lsn.id })
                              }
                            >
                              <FiEdit2 /> Edit
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p className="empty-text">No lessons added yet.</p>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Activities */}
          <Droppable droppableId="activities" type="activity">
            {(provided) => (
              <div
                className="section-card"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div
                  className="section-header"
                  onClick={() => setShowActivities((prev) => !prev)}
                  style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                >
                  {showActivities ? <FiChevronDown /> : <FiChevronRight />}
                  <h3 style={{ marginLeft: "8px" }}>🎯 Activities</h3>
                </div>
                {showActivities &&
                  (activities.length > 0 ? (
                    activities.map((act, index) => (
                      <Draggable
                        key={act.id}
                        draggableId={`activity-${act.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="sub-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {deleteMode && (
                              <input
                                type="checkbox"
                                checked={selectedToDelete.activities.includes(act.id)}
                                onChange={() => toggleSelect("activities", act.id)}
                              />
                            )}
                            <strong>{act.title}</strong>
                            <p>{act.instruction}</p>
                            <button
                              className="btn-edit-small"
                              onClick={() =>
                                setEditMode({ ...editMode, activity: act.id })
                              }
                            >
                              <FiEdit2 /> Edit
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p className="empty-text">No activities added yet.</p>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Modules */}
          <Droppable droppableId="modules" type="module">
            {(provided) => (
              <div
                className="section-card"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div
                  className="section-header"
                  onClick={() => setShowModules((prev) => !prev)}
                  style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                >
                  {showModules ? <FiChevronDown /> : <FiChevronRight />}
                  <h3 style={{ marginLeft: "8px" }}>📂 Modules</h3>
                </div>
                {showModules &&
                  (modules.length > 0 ? (
                    modules.map((mod, index) => (
                      <Draggable
                        key={mod.id}
                        draggableId={`module-${mod.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="sub-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {deleteMode && (
                              <input
                                type="checkbox"
                                checked={selectedToDelete.modules.includes(mod.id)}
                                onChange={() => toggleSelect("modules", mod.id)}
                              />
                            )}
                            <strong>{mod.title}</strong>
                            <p>{mod.instruction}</p>
                            <button
                              className="btn-edit-small"
                              onClick={() =>
                                setEditMode({ ...editMode, module: mod.id })
                              }
                            >
                              <FiEdit2 /> Edit
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p className="empty-text">No modules added yet.</p>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

      {/* Delete Selected Button */}
{deleteMode && (
  <div className="delete-selected-container">
    <button className="btn-danger" onClick={handleDeleteSelected}>
      <FiTrash2 /> Delete Selected
    </button>
  </div>
)}
       
      </main>

      {/* Add/Edit Lesson Modal */}
      {(showLessonModal || editMode.lesson) && (
        <Modal
          title={editMode.lesson ? "Edit Lesson" : "Add Lesson"}
          onClose={() => {
            setShowLessonModal(false);
            setEditMode({ ...editMode, lesson: false });
          }}
          onSave={(data) => {
            if (editMode.lesson) handleUpdateItem("lesson", editMode.lesson || lesson.id, data);
            else handleAddItem("lesson", data);
            setShowLessonModal(false);
          }}
          initialData={
            editMode.lesson && lessons.find((l) => l.id === editMode.lesson)
          }
        />
      )}

      {/* Add/Edit Activity Modal */}
      {(showActivityModal || editMode.activity) && (
        <Modal
          title={editMode.activity ? "Edit Activity" : "Add Activity"}
          onClose={() => {
            setShowActivityModal(false);
            setEditMode({ ...editMode, activity: null });
          }}
          onSave={(data) => {
            if (editMode.activity)
              handleUpdateItem("activity", editMode.activity, data);
            else handleAddItem("activity", data);
            setShowActivityModal(false);
          }}
          initialData={
            editMode.activity &&
            activities.find((a) => a.id === editMode.activity)
          }
        />
      )}

      {/* Add/Edit Module Modal */}
      {(showModuleModal || editMode.module) && (
        <Modal
          title={editMode.module ? "Edit Module" : "Add Module"}
          onClose={() => {
            setShowModuleModal(false);
            setEditMode({ ...editMode, module: null });
          }}
          onSave={(data) => {
            if (editMode.module) handleUpdateItem("module", editMode.module, data);
            else handleAddItem("module", data);
            setShowModuleModal(false);
          }}
          initialData={
            editMode.module && modules.find((m) => m.id === editMode.module)
          }
        />
      )}

      {/* -------------------------------
          MAIN LESSON INFO EDIT MODAL
      ------------------------------- */}
      {editLessonInfo && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Lesson Info</h2>

            <input
              type="text"
              placeholder="Lesson Name"
              value={lesson.lessonName}
              onChange={(e) =>
                setLesson((prev) => ({ ...prev, lessonName: e.target.value }))
              }
            />

            <textarea
              placeholder="Description"
              value={lesson.description}
              onChange={(e) =>
                setLesson((prev) => ({ ...prev, description: e.target.value }))
              }
            />

            <textarea
              placeholder="Objectives"
              value={lesson.objectives}
              onChange={(e) =>
                setLesson((prev) => ({ ...prev, objectives: e.target.value }))
              }
            />

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setEditLessonInfo(false)}>
                Cancel
              </button>
              <button
                className="btn-dark"
                onClick={() => {
                  const allLessons = JSON.parse(localStorage.getItem("lessons")) || [];
                  const updatedAllLessons = allLessons.map((l) =>
                    l.id.toString() === lesson.id.toString() ? { ...l, ...lesson } : l
                  );
                  localStorage.setItem("lessons", JSON.stringify(updatedAllLessons));
                  setEditLessonInfo(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------
// Modal Component with File Upload
// -------------------------------
const Modal = ({ title, onClose, onSave, initialData }) => {
  const [form, setForm] = useState(
    initialData || { title: "", instruction: "", content: "", files: [] }
  );

  // Handle file upload
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, files: [...prev.files, ...uploadedFiles] }));
  };

  // Remove a file
  const removeFile = (index) => {
    setForm((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  // Trigger file input click
  const addAnotherFile = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <div className="modal-overlay">
      <div className="modal cute-modal">
  <h2 style={{ textAlign: "center", color: "#FF6BB5" }}>{title}</h2>

  <div className="modal-content">
    <input
      type="text"
      placeholder="Title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
      className="cute-input"
    />

    <textarea
      placeholder="Instruction / Description"
      value={form.instruction}
      onChange={(e) => setForm({ ...form, instruction: e.target.value })}
      className="cute-textarea"
    />

    <textarea
      placeholder="Write content here..."
      value={form.content}
      onChange={(e) => setForm({ ...form, content: e.target.value })}
      className="cute-textarea cute-content-box"
    />

    {/* File Upload Section */}
    <div className="file-upload-section">
      <div
        className="drop-zone cute-dropzone"
        onClick={addAnotherFile}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const droppedFiles = Array.from(e.dataTransfer.files);
          setForm((prev) => ({ ...prev, files: [...prev.files, ...droppedFiles] }));
        }}
      >
        <img
          src="/assets/rocket-upload.png"
          alt="Upload"
          style={{ width: "60px", marginBottom: "6px" }}
        />
        <p>
          Drag & drop a file here, or <span style={{ color: "#FF6BB5" }}>click to upload</span>
        </p>
        <input
          id="file-upload"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </div>

      {form.files.length > 0 && (
        <>
          <ul className="uploaded-files cute-file-list">
            {form.files.map((file, idx) => {
              let icon = "📄";
              if (file.type) {
                if (file.type.startsWith("image/")) icon = "🖼️";
                else if (file.type.startsWith("video/")) icon = "🎬";
                else if (file.type.startsWith("audio/")) icon = "🎵";
                else if (file.type === "application/pdf") icon = "📕";
              }
              return (
                <li key={idx}>
                  <span>{icon} {file.name}</span>
                  <span
                    className="remove-file-btn"
                    onClick={() => removeFile(idx)}
                  >
                    ✕
                  </span>
                </li>
              );
            })}
          </ul>

          <button
            className="btn-link"
            onClick={() => document.getElementById("file-upload").click()}
          >
            + Add Another File
          </button>
        </>
      )}
    </div>
  </div>

  <div className="modal-actions">
    <button className="btn-secondary" onClick={onClose}>
      Cancel
    </button>
    <button className="btn-dark" onClick={() => onSave(form)}>
      Save
    </button>
  </div>
</div>

    </div>
  );
};

export default ManageSingleLesson;




