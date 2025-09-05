import React, { useEffect } from "react";

function Dashboard() {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.boxSizing = "border-box";
    document.body.style.width = "100%";
    document.body.style.minHeight = "100vh";
    document.body.style.overflowX = "hidden";
    document.body.style.backgroundColor = "#fdfdcb";
  }, []);

  const styles = {
    container: {
      fontFamily: "'Press Start 2P', system-ui, sans-serif",
      backgroundColor: "#fdfdcb",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    navbar: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      backgroundColor: "#fdfdcb",
      borderBottom: "2px solid #b57edc",
      boxSizing: "border-box",
      position: "sticky",
      top: "0",
      zIndex: "10",
    },
    navLeft: { fontWeight: "bold" },
    navCenter: {
      display: "flex",
      gap: "30px",
      justifyContent: "center",
      flexGrow: 1,
    },
    navRight: { fontWeight: "bold" },
    heroSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "60px",
      maxWidth: "1200px",
      width: "100%",
      height: "100vh", // <-- full screen height
      boxSizing: "border-box",
    },
    textSection: { maxWidth: "600px" },
    bigTitle: {
      fontSize: "36px",
      fontWeight: "bold",
      lineHeight: "1.5",
      marginBottom: "40px",
    },
    buttonGroup: { display: "flex", gap: "20px" },
    button: {
      padding: "15px 25px",
      borderRadius: "8px",
      border: "2px solid #4caf50",
      backgroundColor: "#4caf50",
      color: "#000",
      cursor: "pointer",
      fontFamily: "'Press Start 2P', system-ui, sans-serif",
      fontSize: "12px",
    },
    buttonOutline: {
      padding: "15px 25px",
      borderRadius: "8px",
      border: "2px solid #4caf50",
      backgroundColor: "transparent",
      color: "#000",
      cursor: "pointer",
      fontFamily: "'Press Start 2P', system-ui, sans-serif",
      fontSize: "12px",
    },
    images: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: "200px",
      height: "200px",
      borderRadius: "12px",
      backgroundColor: "#b0e57c",
    },
    lessonsSection: {
      width: "100%",
      maxWidth: "1200px",
      padding: "40px 60px",
      boxSizing: "border-box",
      minHeight: "100vh", // <-- each section also tall
    },
    lessonsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    lessonsTitle: {
      fontSize: "28px",
      fontWeight: "bold",
    },
    viewAll: {
      fontSize: "12px",
      cursor: "pointer",
    },
    lessonsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
    },
    lessonCard: {
      backgroundColor: "#4caf50",
      borderRadius: "12px",
      padding: "20px",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "180px",
    },
    lessonName: {
      fontSize: "14px",
      marginBottom: "auto",
    },
    startButton: {
      padding: "8px 16px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#fff",
      color: "#000",
      cursor: "pointer",
      fontFamily: "'Press Start 2P', system-ui, sans-serif",
      fontSize: "10px",
      alignSelf: "flex-end",
    },
    lessonFooter: {
      fontSize: "10px",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.navLeft}>Little Coders</div>
        <div style={styles.navCenter}>
          <span>Home</span>
          <span>Lessons</span>
          <span>Program Now</span>
        </div>
        <div style={styles.navRight}>Profile</div>
      </div>

      {/* Hero Section 1 */}
      <div style={styles.heroSection}>
        <div style={styles.textSection}>
          <div style={styles.bigTitle}>
            Easy Python Programming <br />
            for Kids? Try Little Coders!
          </div>
          <div style={styles.buttonGroup}>
            <button style={styles.button}>PROGRAM NOW</button>
            <button style={styles.buttonOutline}>VIEW LESSONS</button>
          </div>
        </div>
        <div style={styles.images}>
          <div style={styles.image}></div>
          <div style={styles.image}></div>
        </div>
      </div>

      {/* Lessons Section */}
      <div style={styles.lessonsSection}>
        <div style={styles.lessonsHeader}>
          <div style={styles.lessonsTitle}>Lessons Just for You!</div>
          <div style={styles.viewAll}>View All →</div>
        </div>
        <div style={styles.lessonsGrid}>
          {[1, 2, 3].map(n => (
            <div key={n} style={styles.lessonCard}>
              <div style={styles.lessonName}>Lesson Name</div>
              <button style={styles.startButton}>Start →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
