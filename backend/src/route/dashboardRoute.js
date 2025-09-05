const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Lesson = require("../model/Lesson");
const auth = require("../middleware/auth");
const verifyRole = require("../middleware/role");

// GET /api/admin/dashboard-stats
router.get("/dashboard-stats", auth, verifyRole(["admin"]), async (req, res) => {
  try {
    // Fetch all users and lessons
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    const lessons = await Lesson.find().sort({ createdAt: -1 });

    // Count total modules
    let totalModules = 0;
    lessons.forEach(lesson => {
      if (lesson.modules) totalModules += lesson.modules.length;
    });

    // Prepare recent activities (latest 5 users and lessons)
    const recentActivities = [];

    users.slice(0, 5).forEach(user => {
      recentActivities.push({
        type: "user",
        action: "registered",
        name: user.name,
        email: user.email,
        role: user.role,
        updatedAt: user.updatedAt,
      });
    });

    lessons.slice(0, 5).forEach(lesson => {
      recentActivities.push({
        type: "lesson",
        action: "created/updated",
        name: lesson.name,
        updatedAt: lesson.updatedAt,
      });
    });

    res.json({
      totalUsers: users.length,
      totalLessons: lessons.length,
      activeModules: totalModules,
      recentActivities,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
