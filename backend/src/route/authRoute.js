const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/authController");
const auth = require("../middleware/auth");
const verifyRole = require("../middleware/role");

router.get("/", (req, res) => {
  res.send("👋 Welcome to Auth Route");
});

router.post("/register", register);

router.post("/login", login);

router.get("/profile", auth, (req, res) => {
  res.json({ message: "Your profile info", user: req.user });
});

router.get("/admin", auth, verifyRole(["admin"]), (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

module.exports = router;
