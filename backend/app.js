const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Auth API with RBAC is running!");
});

const adminRoutes = require("./src/route/adminRoute");
app.use("/api/admin", adminRoutes);

const authRoutes = require("./src/route/authRoute");
app.use("/api/auth", authRoutes);

const dashboardRoutes = require("./src/route/dashboardRoute");
app.use("/api/admin", dashboardRoutes);


const dashboardRoutes = require("./src/route/dashboardRoute");
app.use("/api/admin/dashboard-stats", dashboardRoutes);

const lessonRoutes = require("./src/route/lessonRoute");
app.use("/api/lessons", lessonRoutes);

const userRoutes = require("./src/route/userRoute");
app.use("/api/admin/users", userRoutes);

const auth = require("./src/middleware/auth");
const verifyRole = require("./src/middleware/role");

app.get("/api/user/profile", auth, (req, res) => {
  res.json({ message: "This is your profile", user: req.user });
});

app.get("/api/admin/dashboard", auth, verifyRole(["admin"]), (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
