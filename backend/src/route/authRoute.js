const express = require("express");
const router = express.Router();
const {
  register,
  login,
  simpleForgotPassword
} = require("../controller/authController");

router.get("/", (req, res) => {
  res.send("Welcome to Auth Route");
});

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", simpleForgotPassword);

module.exports = router;
