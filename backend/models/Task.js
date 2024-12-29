const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Task title
  description: String,                     // Optional description
  status: { type: Boolean, default: false }, // Completed or not
  due_date: Date,                           // Optional due date
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
