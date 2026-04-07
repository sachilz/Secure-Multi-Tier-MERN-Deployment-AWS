const express = require('express');
const router = express.Router();
const Task = require('../models/task'); // use Task model now

// ✅ Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Add new task
router.post('/add', async (req, res) => {
  try {
    const { text, category } = req.body;
    const newTask = new Task({
      text,
      category: category || 'Personal'
    });
    await newTask.save();
    res.status(201).json({ message: 'Task added successfully', task: newTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Toggle task completion
router.patch("/toggle/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete task
router.delete("/delete/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;