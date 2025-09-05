import React, { useEffect, useState } from "react";
import "./Lessons.css"; 
import { FiLogOut, FiUsers, FiBook, FiBarChart2 } from "react-icons/fi";
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
        const res = await fetch("http://localhost:5000/api/admin/dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStats(data);
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
      
      <aside className="sidebar">
        <div className="sidebar-header" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "32px" }}>
          <div className="avatar logo" style={{ width: 120, height: 120, marginBottom: "8px" }}>
            <img src="/assets/images/logo192.png" alt="Logo" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
          </div>
          <div className="brand" style={{ marginTop: "8px", fontSize: "1.2rem", color: "#fff", textAlign: "center" }}>Little Coders</div>
        </div>
        <hr style={{ border: "none", borderTop: "2px solid #444", margin: "24px 0 16px 0" }} />
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ margin: "24px 0", textAlign: "center" }}>
              <button style={{ width: "90%", padding: "8px 0", borderRadius: "8px", background: "#e0e0e0", color: "#222", border: "none", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer" }}>
                Dashboard
              </button>
            </li>
            <li style={{ margin: "24px 0", color: "#fff", fontSize: "1.1rem", textAlign: "center", cursor: "pointer" }} onClick={() => navigate("/admin/users")}>
              Users
            </li>
            <li style={{ margin: "24px 0", color: "#fff", fontSize: "1.1rem", textAlign: "center", cursor: "pointer" }} onClick={() => navigate("/admin/lessons")}>
              Lessons
            </li>
          </ul>
        </nav>
        <hr style={{ border: "none", borderTop: "2px solid #444", margin: "24px 0 16px 0" }} />
        <div className="sidebar-footer" style={{ display: "flex", alignItems: "center", gap: "5px", padding: "0 13px 16px 13px", marginTop: "auto" }}>
          <div className="avatar small" style={{ width: 48, height: 48, minWidth: 48 }}>
            <img src="/assets/images/profile.png" alt="Profile" style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: "110px" }}>
            <span style={{ fontWeight: "bold", fontSize: "1.15rem", lineHeight: "1.1", color: "#fff" }}>Admin Name</span>
            <span className="role" style={{ fontSize: "0.95rem", color: "#aaa", lineHeight: "1.1" }}>Admin</span>
          </div>
          <button className="logout-btn" title="Logout" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0", width: "40px", height: "40px", borderRadius: "12px", background: "#e5e5e5", color: "#222", border: "none", cursor: "pointer" }} onClick={() => alert("Logging out...")}>
            <FiLogOut size={26} />
          </button>
        </div>
      </aside>

      
      <main className="main-content" style={{ padding: "40px 32px" }}>
        <div style={{ background: "#ddd", borderRadius: "16px", padding: "32px 0", marginBottom: "32px", textAlign: "center", fontSize: "2.5rem", fontWeight: "500" }}>
          Admin Dashboard
        </div>

       
        <div style={{ display: "flex", gap: "32px", marginBottom: "40px" }}>
          <div style={{ flex: 1, background: "#f5f5f5", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
            <FiUsers size={40} style={{ marginBottom: "16px" }} />
            <h3>Total Users</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{stats.totalUsers}</p>
          </div>
          <div style={{ flex: 1, background: "#f5f5f5", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
            <FiBook size={40} style={{ marginBottom: "16px" }} />
            <h3>Total Lessons</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{stats.totalLessons}</p>
          </div>
          <div style={{ flex: 1, background: "#f5f5f5", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
            <FiBarChart2 size={40} style={{ marginBottom: "16px" }} />
            <h3>Active Modules</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{stats.activeModules}</p>
          </div>
        </div>

        
        <div style={{ background: "#eee", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ marginBottom: "16px" }}>Recent Activities</h2>
          {stats.recentActivities.length === 0 ? (
            <p>No recent activities</p>
          ) : (
            <ul>
              {stats.recentActivities.map((act, i) => (
                <li key={i}>
                  {act.type === "user"
                    ? `👤 User "${act.name}" registered`
                    : `📘 Lesson "${act.name}" created/updated`}
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
