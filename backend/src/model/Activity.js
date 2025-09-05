const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  targetUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  action: { type: String, required: true }, 
  details: { type: String }, 
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", activitySchema);
