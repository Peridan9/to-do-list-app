const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const tasksRoutes = require("./routes/tasks");

// Require db.js (conditionally for non-test environments)
if (process.env.NODE_ENV !== "test") {
  require("./db");
}

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/users", authRoutes);
app.use("/tasks", tasksRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
