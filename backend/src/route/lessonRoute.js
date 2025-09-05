const express = require("express");
const router = express.Router();
const Lesson = require("../model/Lesson");


router.get("/", async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new lesson
router.post("/", async (req, res) => {
  try {
    const lesson = new Lesson({
      name: req.body.name,
      description: req.body.description,
      modules: []
    });
    const savedLesson = await lesson.save();
    res.status(201).json(savedLesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedLesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ message: "Lesson deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
