const express = require("express");
const router = express.Router();
const User = require("../model/User");
const auth = require("../middleware/auth");
const verifyRole = require("../middleware/role");


router.get("/", auth, verifyRole(["admin"]), async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
