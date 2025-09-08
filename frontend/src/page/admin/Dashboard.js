import React, { useEffect, useState } from "react";
import "./Lessons.css";
import { FiUsers, FiBook, FiBarChart2 } from "react-icons/fi";
import Sidebar from "../../components/admin/Sidebar"; 
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    activeModules: 0,
    recentActivities: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch users
        const usersRes = await fetch("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const usersData = await usersRes.json();

        const lessonsRes = await fetch("http://localhost:5000/api/lessons");
        const lessonsData = await lessonsRes.json();

        let modulesCount = 0;
        lessonsData.forEach((lesson) => {
          if (lesson.modules) modulesCount += lesson.modules.length;
        });

        const activities = [];
        usersData.slice(-5).reverse().forEach((user) => {
          activities.push({ type: "user", action: "registered", user });
        });
        lessonsData.slice(-5).reverse().forEach((lesson) => {
          activities.push({
            type: "lesson",
            action: "created/updated",
            user: lesson.creator || null,
            targetLesson: lesson,
          });
        });

        setStats({
          totalUsers: usersData.length,
          totalLessons: lessonsData.length,
          activeModules: modulesCount,
          recentActivities: activities,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="admin-layout">
      
      <Sidebar />

      
      <main className="main-content" style={{ padding: "40px 32px" }}>
        <div
          style={{
            background: "#ddd",
            borderRadius: "16px",
            padding: "32px 0",
            marginBottom: "32px",
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "500",
          }}
        >
          Admin Dashboard
        </div>

        
        <div style={{ display: "flex", gap: "32px", marginBottom: "40px" }}>
          <div
            style={{
              flex: 1,
              background: "#f5f5f5",
              borderRadius: "12px",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <FiUsers size={40} style={{ marginBottom: "16px" }} />
            <h3>Total Users</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
              {stats.totalUsers}
            </p>
          </div>
          <div
            style={{
              flex: 1,
              background: "#f5f5f5",
              borderRadius: "12px",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <FiBook size={40} style={{ marginBottom: "16px" }} />
            <h3>Total Lessons</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
              {stats.totalLessons}
            </p>
          </div>
          <div
            style={{
              flex: 1,
              background: "#f5f5f5",
              borderRadius: "12px",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <FiBarChart2 size={40} style={{ marginBottom: "16px" }} />
            <h3>Active Modules</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
              {stats.activeModules}
            </p>
          </div>
        </div>

       
        <div
          style={{
            background: "#eee",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <h2 style={{ marginBottom: "16px" }}>Recent Activities</h2>
          {stats.recentActivities.length === 0 ? (
            <p>No recent activities</p>
          ) : (
            <ul>
              {stats.recentActivities.map((act, i) => (
                <li key={i}>
                  {act.type === "user"
                    ? `👤 User "${act.user.name}" registered`
                    : `📘 Lesson "${act.targetLesson.name}" created/updated`}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
