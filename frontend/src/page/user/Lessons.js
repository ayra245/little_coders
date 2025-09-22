import React from "react";

const Lessons = () => {
  const images = [
    process.env.PUBLIC_URL + "/desert1.jpg",   // first
    process.env.PUBLIC_URL + "/ocean3.jpg",    // second
    process.env.PUBLIC_URL + "/volcanic1.jpg", // third
    process.env.PUBLIC_URL + "/icy1.jpg",      // fourth
    process.env.PUBLIC_URL + "/desert1.jpg",   // last
  ];

  return (
    <div style={styles.container}>
      {images.map((src, index) => {
        let stripStyle = {};

        if (index === 0) {
          stripStyle = styles.firstStrip;
        } else if (index === 1) {
          stripStyle = styles.secondStrip;
        } else if (index === 2) {
          stripStyle = styles.thirdStrip;
        } else if (index === 3) {
          stripStyle = styles.fourthStrip;
        } else if (index === images.length - 1) {
          stripStyle = styles.lastStrip;
        }

        return (
          <div
            key={index}
            style={{
              ...styles.strip,
              ...stripStyle,
              backgroundImage: `url(${src})`,
            }}
          />
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    overflow: "hidden",
    margin: "-10px",
    padding: 0,
    boxSizing: "border-box",
  },
  strip: {
    flex: 1,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  // First strip: left flush, right skew
  firstStrip: {
    clipPath: "polygon(0% 0%, 0% 100%, 82.5% 100%, 100% 0%)",
    flex: 3,
    overflow: "visible",
    margin: "0 -60px 0 0",
  },

  // Second, Third, Fourth strips (same skew style for now)
  secondStrip: {
    transform: "skewX(-10deg)",
  },
  thirdStrip: {
    transform: "skewX(-10deg)",
  },
  fourthStrip: {
    transform: "skewX(-10deg)",
  },

  // Last strip: right flush, left skew
  lastStrip: {
    clipPath: "polygon(100% 0%, 100% 100%, 16.3% 100%, 53.3% 0%)",
    margin: "0 0 0 -110px",
  },
};

export default Lessons;
