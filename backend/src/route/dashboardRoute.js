// backend/src/route/dashboardRoute.js
const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Lesson = require("../model/Lesson");
const auth = require("../middleware/auth");
const verifyRole = require("../middleware/role");

// GET /api/admin/dashboard-stats
router.get("/dashboard-stats", auth, verifyRole(["admin"]), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalLessons = await Lesson.countDocuments();

    const totalModulesAgg = await Lesson.aggregate([
      { $unwind: "$modules" },
      { $count: "count" },
    ]);
    const totalModules = totalModulesAgg[0]?.count || 0;

    // Recent users and lessons (last 5)
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role updatedAt");
    const recentLessons = await Lesson.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name updatedAt");

    res.json({
      totalUsers,
      totalLessons,
      activeModules: totalModules,
      recentActivities: {
        users: recentUsers || [],
        lessons: recentLessons || [],
      },
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
});

module.exports = router;
