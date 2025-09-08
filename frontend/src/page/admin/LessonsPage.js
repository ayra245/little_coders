import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import "./Lessons.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronRight, FiTrash2, FiXCircle } from "react-icons/fi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; 
function LessonsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [allLessons, setAllLessons] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState([]);


  useEffect(() => {
    const storedLessons = JSON.parse(localStorage.getItem("lessons")) || [];
    setAllLessons(storedLessons);
  }, [location.key]);

  const toggleExpand = (lessonId, type) => {
    setExpanded((prev) => ({
      ...prev,
      [`${lessonId}-${type}`]: !prev[`${lessonId}-${type}`],
    }));
  };

  const handleCheckboxChange = (lessonId) => {
    setSelectedToDelete((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const handleDelete = () => {
    const updatedLessons = allLessons.filter(
      (lesson) => !selectedToDelete.includes(lesson.id)
    );
    setAllLessons(updatedLessons);
    localStorage.setItem("lessons", JSON.stringify(updatedLessons));
    setSelectedToDelete([]);
    setDeleteMode(false);
  };

  
  const handleDragEnd = (result, lessonId, type) => {
    if (!result.destination) return;

    const updatedLessons = [...allLessons];
    const lessonIndex = updatedLessons.findIndex((l) => l.id === lessonId);
    if (lessonIndex === -1) return;

    const items = [...updatedLessons[lessonIndex][type]];
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    updatedLessons[lessonIndex][type] = items;

    setAllLessons(updatedLessons);
    localStorage.setItem("lessons", JSON.stringify(updatedLessons));
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="main-content" style={{ padding: "40px 32px" }}>
        <div className="page-header" style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "24px", marginBottom: "5px" }}>📚 Lessons Library</h1>
          <p style={{ color: "#666", marginBottom: "15px" }}>
            A complete list of all your <strong>Lessons</strong>,{" "}
            <strong>Activities</strong>, and <strong>Modules</strong>.
          </p>

          <hr
            style={{
              border: "0",
              borderTop: "1px solid #ddd",
              margin: "10px 0 20px",
            }}
          />

          <div>
            {!deleteMode ? (
              <button
                className="btn delete-btn"
                onClick={() => setDeleteMode(true)}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                  marginTop: "5px",
                }}
              >
                <FiTrash2 style={{ marginRight: "6px" }} /> Select Delete
              </button>
            ) : (
              <>
                <button
                  className="btn cancel-btn"
                  onClick={() => {
                    setDeleteMode(false);
                    setSelectedToDelete([]);
                  }}
                  style={{
                    backgroundColor: "#999",
                    color: "white",
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginRight: "10px",
                    marginTop: "5px",
                  }}
                >
                  <FiXCircle style={{ marginRight: "6px" }} /> Cancel Delete
                </button>
                <button
                  className="btn confirm-btn"
                  onClick={handleDelete}
                  disabled={selectedToDelete.length === 0}
                  style={{
                    backgroundColor:
                      selectedToDelete.length > 0 ? "#e63946" : "#f5a6ac",
                    color: "white",
                    padding: "8px 14px",
                    border: "none",
                    borderRadius: "8px",
                    cursor:
                      selectedToDelete.length > 0 ? "pointer" : "not-allowed",
                    boxShadow:
                      selectedToDelete.length > 0
                        ? "0 3px 6px rgba(0,0,0,0.2)"
                        : "none",
                    transition: "background 0.2s ease",
                    marginTop: "5px",
                  }}
                >
                  <FiTrash2 style={{ marginRight: "6px" }} /> Confirm Delete
                </button>
              </>
            )}
          </div>
        </div>

        
        {allLessons.length > 0 ? (
          allLessons.map((lesson) => (
            <div key={lesson.id} className="card" style={{ marginBottom: "20px" }}>
              {deleteMode && (
                <input
                  type="checkbox"
                  checked={selectedToDelete.includes(lesson.id)}
                  onChange={() => handleCheckboxChange(lesson.id)}
                  style={{
                    marginRight: "15px",
                    marginTop: "10px",
                    transform: "scale(1.3)",
                    cursor: "pointer",
                  }}
                />
              )}

              <div style={{ flex: 1 }}>
                <h2>{lesson.lessonName}</h2>
                <p>{lesson.description}</p>
                <p>
                  <strong>Objectives:</strong> {lesson.objectives}
                </p>

                
                <div className="section-card">
                  <div
                    className="section-header"
                    onClick={() => toggleExpand(lesson.id, "lessons")}
                    style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                  >
                    {expanded[`${lesson.id}-lessons`] ? <FiChevronDown /> : <FiChevronRight />}
                    <h3 style={{ marginLeft: "8px" }}>📘 Lessons</h3>
                  </div>
                  {expanded[`${lesson.id}-lessons`] && (
                    <DragDropContext
                      onDragEnd={(result) => handleDragEnd(result, lesson.id, "lessons")}
                    >
                      <Droppable droppableId={`lessons-${lesson.id}`}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            {lesson.lessons?.map((sub, i) => (
                              <Draggable key={sub.id} draggableId={String(sub.id)} index={i}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="sub-card clickable"
                                    onClick={() =>
                                      navigate(`/admin/lessons/${lesson.id}/sub/${sub.id}`, {
                                        state: { sub },
                                      })
                                    }
                                  >
                                    <strong>{sub.title}</strong>
                                    <p>{sub.instruction}</p>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}
                </div>

                
                <div className="section-card">
                  <div
                    className="section-header"
                    onClick={() => toggleExpand(lesson.id, "activities")}
                    style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                  >
                    {expanded[`${lesson.id}-activities`] ? <FiChevronDown /> : <FiChevronRight />}
                    <h3 style={{ marginLeft: "8px" }}>🎯 Activities</h3>
                  </div>
                  {expanded[`${lesson.id}-activities`] && (
                    <DragDropContext
                      onDragEnd={(result) => handleDragEnd(result, lesson.id, "activities")}
                    >
                      <Droppable droppableId={`activities-${lesson.id}`}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            {lesson.activities?.map((act, i) => (
                              <Draggable key={act.id} draggableId={String(act.id)} index={i}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="sub-card"
                                  >
                                    <strong>{act.title}</strong>
                                    <p>{act.instruction}</p>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}
                </div>

                
                <div className="section-card">
                  <div
                    className="section-header"
                    onClick={() => toggleExpand(lesson.id, "modules")}
                    style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                  >
                    {expanded[`${lesson.id}-modules`] ? <FiChevronDown /> : <FiChevronRight />}
                    <h3 style={{ marginLeft: "8px" }}>📂 Modules</h3>
                  </div>
                  {expanded[`${lesson.id}-modules`] && (
                    <DragDropContext
                      onDragEnd={(result) => handleDragEnd(result, lesson.id, "modules")}
                    >
                      <Droppable droppableId={`modules-${lesson.id}`}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            {lesson.modules?.map((mod, i) => (
                              <Draggable key={mod.id} draggableId={String(mod.id)} index={i}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="sub-card"
                                  >
                                    <strong>{mod.title}</strong>
                                    <p>{mod.instruction}</p>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No lessons available. Please create one.</p>
        )}
      </main>
    </div>
  );
}

export default LessonsPage;
