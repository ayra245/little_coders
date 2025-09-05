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

const authRoutes = require("./src/route/authRoute");
app.use("/api/auth", authRoutes);

const lessonRoutes = require("./src/route/lessonRoute");
app.use("/api/lessons", lessonRoutes);

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
