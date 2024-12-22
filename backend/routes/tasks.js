const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 */
router.get('/api/tasks', (req, res) => {
    res.json([{ id: 1, title: 'Sample Task', completed: false }]);
  });
  
  module.exports = router;