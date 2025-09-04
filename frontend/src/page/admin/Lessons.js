import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Lessons.css"; 

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [lessonName, setLessonName] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState("");
  const [modules, setModules] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    fetch("http://localhost:5000/api/lessons")
      .then(res => res.json())
      .then(data => setLessons(data));
  }, []);

  
  const handleSave = async () => {
    setLoading(true);
    const lessonData = {
      name: lessonName,
      description,
      objectives,
      modules
    };
    try {
      let res, data;
      if (editingId) {
        res = await fetch(`http://localhost:5000/api/lessons/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lessonData)
        });
        data = await res.json();
        setLessons(lessons.map(l => l._id === editingId ? data : l));
      } else {
        res = await fetch("http://localhost:5000/api/lessons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lessonData)
        });
        data = await res.json();
        setLessons([...lessons, data]);
      }
      setLessonName("");
      setDescription("");
      setObjectives("");
      setModules([]);
      setEditingId(null);
    } catch (err) {
      alert("Error saving lesson");
    }
    setLoading(false);
  };

 
  const handleEdit = (lesson) => {
    setLessonName(lesson.name);
    setDescription(lesson.description);
    setObjectives(lesson.objectives);
    setModules(lesson.modules || []);
    setEditingId(lesson._id);
  };

 
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lesson?")) return;
    await fetch(`http://localhost:5000/api/lessons/${id}`, { method: "DELETE" });
    setLessons(lessons.filter(l => l._id !== id));
  };

 
  const handleAddModule = () => {
    setModules([...modules, { name: "", activities: [] }]);
  };

  
  const handleModuleNameChange = (idx, value) => {
    const newModules = [...modules];
    newModules[idx].name = value;
    setModules(newModules);
  };

  
  const handleAddActivity = (modIdx) => {
    const newModules = [...modules];
    newModules[modIdx].activities.push({ title: "", content: "" });
    setModules(newModules);
  };

  
  const handleActivityChange = (modIdx, actIdx, field, value) => {
    const newModules = [...modules];
    newModules[modIdx].activities[actIdx][field] = value;
    setModules(newModules);
  };

  
  const handleDeleteModule = (modIdx) => {
    const newModules = modules.filter((_, idx) => idx !== modIdx);
    setModules(newModules);
  };

  
  const handleDeleteActivity = (modIdx, actIdx) => {
    const newModules = [...modules];
    newModules[modIdx].activities = newModules[modIdx].activities.filter((_, idx) => idx !== actIdx);
    setModules(newModules);
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="avatar" />
          <div className="brand">Little Coders</div>
        </div>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Users</li>
            <li className="active">Lessons</li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="avatar small" />
          <div>
            <div>Admin Name</div>
            <div className="role">Admin</div>
          </div>
        </div>
      </aside>
      <main className="main-content">
        <div className="header">
          <h1>{editingId ? "Edit Lesson" : "Create Lesson"}</h1>
        </div>
        <div className="lesson-section">
          <input
            type="text"
            placeholder="Lesson Name"
            value={lessonName}
            onChange={e => setLessonName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <textarea
            placeholder="Objectives"
            value={objectives}
            onChange={e => setObjectives(e.target.value)}
          />
          <button className="btn" onClick={handleAddModule}>Add Module</button>
          {modules.map((mod, modIdx) => (
            <div key={modIdx} className="module-item">
              <input
                type="text"
                placeholder="Module Name"
                value={mod.name}
                onChange={e => handleModuleNameChange(modIdx, e.target.value)}
              />
              <button className="btn" onClick={() => handleAddActivity(modIdx)}>Add Activity</button>
              <button className="btn cancel" onClick={() => handleDeleteModule(modIdx)}>Delete Module</button>
              {mod.activities.map((act, actIdx) => (
                <div key={actIdx} className="activity-item">
                  <input
                    type="text"
                    placeholder="Activity Title"
                    value={act.title}
                    onChange={e => handleActivityChange(modIdx, actIdx, "title", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Activity Content"
                    value={act.content}
                    onChange={e => handleActivityChange(modIdx, actIdx, "content", e.target.value)}
                  />
                  <button className="btn cancel" onClick={() => handleDeleteActivity(modIdx, actIdx)}>Delete Activity</button>
                </div>
              ))}
            </div>
          ))}
          <div className="actions">
            <button className="btn cancel" onClick={() => {
              setLessonName(""); setDescription(""); setObjectives(""); setModules([]); setEditingId(null);
            }}>Cancel</button>
            <button className="btn save" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save and Manage"}
            </button>
          </div>
        </div>
        <div className="lesson-list">
          <h2>Manage Lessons</h2>
          {lessons.map(lesson => (
            <div key={lesson._id} className="lesson-card">
              <strong>{lesson.name}</strong>
              <div>{lesson.description}</div>
              <button className="btn" onClick={() => handleEdit(lesson)}>Edit</button>
              <button className="btn cancel" onClick={() => handleDelete(lesson._id)}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Navbar({ logout }) {
  return (
    <div className="navbar">
      <div className="logo">Little Coders</div>
      <div className="links">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/lessons">Lessons</Link>
      </div>
      <div className="user-info">
        <div className="avatar" />
        <div className="username">Admin Name</div>
        <button className="btn logout" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Lessons;



