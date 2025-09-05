const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    modules: [
      {
        title: { type: String, required: true },
        content: { type: String }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);
