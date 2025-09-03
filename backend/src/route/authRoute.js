const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");

router.get("/", (req, res) => {
  res.send("Welcome to Auth Route");
});

router.post("/register", register);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);  
router.post("/reset-password/:token", resetPassword); 

module.exports = router;
