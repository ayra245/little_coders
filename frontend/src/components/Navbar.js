import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}

      {user && user.role === "admin" && <Link to="/admin/dashboard">Admin</Link>}
      {user && user.role === "user" && <Link to="/user/profile">Profile</Link>}

      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
