const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerDocs } = require("./swagger/swagger-config");
const tasksRoutes = require('./routes/tasks');
require("./db")

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/tasks", tasksRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the To-Do List API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
