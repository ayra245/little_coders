const express = require("express");
const router = express.Router();
const {
  register,
  login,
  simpleForgotPassword
} = require("../controller/authController");

// Default route
router.get("/", (req, res) => {
  res.send("👋 Welcome to Auth Route");
});

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", simpleForgotPassword);

module.exports = router;
