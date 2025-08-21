const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/authController");

// For browser GET test
router.get("/", (req, res) => {
  res.send("👋 Welcome to Auth Route");
});

// Register user (POST)
router.post("/register", register);

// Login user (POST)
router.post("/login", login);

module.exports = router;
