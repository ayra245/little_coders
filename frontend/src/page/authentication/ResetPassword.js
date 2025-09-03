import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../service/api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = process.env.PUBLIC_URL + "/assets/styles/authentication.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      await api.post(`/auth/reset-password/${token}`, { newPassword: password });
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Invalid or expired token.");
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
        <h2>RESET YOUR PASSWORD</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">Reset Password</button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <div className="auth-footer">
            <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
