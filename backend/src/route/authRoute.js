const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/authController");
const auth = require("../middleware/auth");
const verifyRole = require("../middleware/role");

// Simple test route
router.get("/", (req, res) => {
  res.send("👋 Welcome to Auth Route");
});

// Register user (POST)
router.post("/register", register);

// Login user (POST)
router.post("/login", login);

// Example: Protected route (only logged in users)
router.get("/profile", auth, (req, res) => {
  res.json({ message: "Your profile info", user: req.user });
});

// Example: Admin-only route
router.get("/admin", auth, verifyRole(["admin"]), (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

module.exports = router;
