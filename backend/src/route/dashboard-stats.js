const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Lesson = require("../model/Lesson");
const Activity = require("../model/Activity");
const auth = require("../middleware/auth");
const verifyRole = require("../middleware/role");


router.get("/dashboard-stats", auth, verifyRole(["admin"]), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalLessons = await Lesson.countDocuments();
    const totalModules = await Lesson.aggregate([
      { $unwind: "$modules" },
      { $count: "count" },
    ]);
    const recentActivities = await Activity.find()
      .sort({ date: -1 })
      .limit(10)
      .populate("user", "name role")
      .populate("targetUser", "name email role");

    res.json({
      totalUsers,
      totalLessons,
      activeModules: totalModules[0]?.count || 0,
      recentActivities,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
});

module.exports = router;
