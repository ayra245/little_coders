// src/page/user/Dashboard.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  useEffect(() => {
    // global reset to remove white gaps and horizontal scroll
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root");

    [html, body].forEach((el) => {
      el.style.margin = "0";
      el.style.padding = "0";
      el.style.boxSizing = "border-box";
      el.style.width = "100%";
      el.style.height = "100%";
      el.style.overflowX = "hidden"; // prevent sideways scroll
      // if you want a background color under the image, set it here:
      el.style.backgroundColor = "#0000"; // transparent
    });

    if (root) {
      root.style.margin = "0";
      root.style.padding = "0";
      root.style.boxSizing = "border-box";
      root.style.width = "100%";
      root.style.minHeight = "100%";
      root.style.overflowX = "hidden";
    }

    // cleanup not strictly necessary for these root changes, but leaving blank:
    return () => {};
  }, []);

  const styles = {
    container: {
      width: "100%",               // do NOT use 100vw here
      minHeight: "100vh",
      height: "100%",
      margin: 0,
      padding: 0,
      position: "relative",
      fontFamily: "'Press Start 2P', system-ui, sans-serif",
      // background image from public folder:
      backgroundImage: `url(${process.env.PUBLIC_URL + "/dashboard5.png"})`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
    },

    /* This overlay centers items inside the whiteboard area.
       Tweak the `top` value if the whiteboard sits higher/lower in your image. */
    whiteboardContent: {
      position: "absolute",
      left: "50%",
      top: "36%",                 // adjust until perfectly inside your board
      transform: "translate(-50%, -36%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: "18px",
      padding: "0 8px",
      pointerEvents: "auto",
    },

    logo: {
      width: "110px",
      height: "110px",
      borderRadius: "50%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      // if you want to use an image element instead, replace this style usage
    },

    title: {
      fontSize: "34px",
      color: "#000",              // black on the whiteboard
      textShadow: "0 2px 0 rgba(0,0,0,0.08)",
      lineHeight: 1,
    },

    lessonButton: {
      display: "inline-block",
      backgroundColor: "#27ae60",
      color: "#fff",
      padding: "14px 52px",
      borderRadius: "30px",
      textDecoration: "none",
      fontSize: "16px",
      boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
      border: "none",
      cursor: "pointer",
    },

    bottomLeft: {
      position: "absolute",
      left: "20px",
      bottom: "18px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "#fff",
      gap: "6px",
    },

    settingsIcon: {
      width: "46px",
      height: "46px",
      borderRadius: "50%",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },

    bottomRight: {
      position: "absolute",
      right: "20px",
      bottom: "18px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "#fff",
      gap: "6px",
    },

    tutorialButton: {
      width: "52px",
      height: "52px",
      borderRadius: "50%",
      backgroundColor: "#27ae60",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: "22px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Whiteboard-centered logo / title / button */}
      <div style={styles.whiteboardContent}>
        {/* Use an <img> for the logo for better control (from public/logo.png) */}
        <img
          src={process.env.PUBLIC_URL + "/logo192.png"}
          alt="logo"
          style={{ width: styles.logo.width, height: styles.logo.height, borderRadius: "50%" }}
        />

        <div style={styles.title}>LITTLE CODERS</div>

        <Link to="/lessons" style={styles.lessonButton} aria-label="Lessons">
          LESSONS
        </Link>
      </div>

      {/* Bottom-left settings */}
      <div style={styles.bottomLeft}>
        <img
          src={process.env.PUBLIC_URL + "/obania.jpg"}
          alt="settings"
          style={styles.settingsIcon}
        />
        <div style={{ fontSize: "12px", letterSpacing: "1px", color: "#fff" }}>SETTINGS</div>
      </div>

      {/* Bottom-right tutorial */}
      <div style={styles.bottomRight}>
        <div style={styles.tutorialButton}>›</div>
        <div style={{ fontSize: "12px", letterSpacing: "1px", color: "#fff" }}>TUTORIAL</div>
      </div>
    </div>
  );
}

export default Dashboard;
