import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = process.env.PUBLIC_URL + "/assets/styles/authentication.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Logged in successfully!");
        console.log("Logged in user role:", data.user.role);

        login(data.user, data.token);

        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      } else {
        setMessage((data.message || "Login failed!"));
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img
          src={process.env.PUBLIC_URL + "/assets/images/logo192.png"}
          alt="Logo"
          className="auth-logo"
        />
        <h2>LOGIN TO YOUR ACCOUNT</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-btn">Login</button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <div className="auth-footer">
          <p>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
