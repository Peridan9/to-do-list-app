const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Endpoints for managing tasks
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Fetch all tasks for the logged-in user
 *     tags: [Tasks]
 *     description: Retrieves all tasks associated with the currently logged-in user.
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64f2..."
 *                   title:
 *                     type: string
 *                     example: "Test Task"
 *                   description:
 *                     type: string
 *                     example: "This is a test task"
 *                   status:
 *                     type: boolean
 *                     example: false
 *                   due_date:
 *                     type: string
 *                     format: date
 *                     example: "2024-12-31T00:00:00.000Z"
 *                   user_id:
 *                     type: string
 *                     example: "64f1..."
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  const userId = req.session.user.id;

  try {
    const tasks = await Task.find({ user_id: userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     description: Adds a new task for the logged-in user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Task"
 *               description:
 *                 type: string
 *                 example: "Description for the new task"
 *               status:
 *                 type: boolean
 *                 example: false
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", async (req, res) => {
  const { title, description, status, due_date } = req.body;
  const user_id = req.session.user.id;

  try {
    const newTask = new Task({ title, description, status, due_date, user_id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     description: Updates the details of a specific task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Task Title"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               status:
 *                 type: boolean
 *                 example: true
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Task not found
 */
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

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     description: Removes a task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
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
