const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // admin who did the action
  targetUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional affected user
  action: { type: String, required: true }, // e.g., "Created User", "Updated Role"
  details: { type: String }, // optional, e.g., "Role changed to admin"
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", activitySchema);
