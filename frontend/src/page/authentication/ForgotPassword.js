import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../service/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
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
  try {
    await forgotPassword(email);
    setMessage("Email sent! Check your inbox to reset your password.");
  } catch (err) {
    setMessage((err.response?.data?.message || "Something went wrong!"));
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
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">Send Reset Link</button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <div className="auth-footer">
          <p><Link to="/login">Back to Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
