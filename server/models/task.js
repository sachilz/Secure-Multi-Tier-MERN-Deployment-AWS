const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },       // task description
  category: {
    type: String,
    enum: ['Personal', 'Professional'],
    default: 'Personal'
  },
  completed: { type: Boolean, default: false }, // is task done?
  createdAt: { type: Date, default: Date.now }  // timestamp
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;