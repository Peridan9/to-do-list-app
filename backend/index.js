const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const { swaggerUi, swaggerDocs } = require("./swagger/swagger-config");

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
app.use(
  session({
    secret: 'myStrongSecretKey123!',
    resave: false, // Prevent session resaving if unmodified
    saveUninitialized: false, // Prevent saving uninitialized session
    cookie: {
      httpOnly: true, // prevent client-side JavaScript access
      secure: false, // Set to ture if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiry (1 day)
    },
  })
);

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/users", authRoutes);
app.use("/tasks", tasksRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
