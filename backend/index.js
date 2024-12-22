const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerDocs } = require("./swagger");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Example route
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retrieve a list of tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Sample Task"
 *                   completed:
 *                     type: boolean
 *                     example: false
 */
app.get('/api/tasks', (req, res) => {
  res.json([{ id: 1, title: 'Sample Task', completed: false }]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
