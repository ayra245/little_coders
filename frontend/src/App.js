import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./page/authentication/Register";
import Login from "./page/authentication/Login";
import  Try from "./page/authentication/Try"

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px" }}>
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link>
        <Link to="/try">Try</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/try" element={<Try />} />
      </Routes>
    </Router>
  );
}

export default App;
