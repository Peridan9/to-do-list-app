const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

// Protect all task routes
router.use(isAuthenticated)

router.get("/", async (req,res) => {
  const userId = req.session.user.id;

  try {
    const tasks = await Task.find({user_id: userId});
    res.status(200).json(tasks);
  } catch(err){
    res.status(500).json({message: err.message});
  }

});

router.post("/", async (req, res) => {
  const { title, description, status, due_date} = req.body;
  const user_id = req.session.user.id

  try {
    const newTask = new Task({ title, description, status, due_date, user_id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    Object.assign(task, req.body); // Dynamically update fields
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;