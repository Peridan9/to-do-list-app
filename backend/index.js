const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerDocs } = require("./swagger");
const tasksRoutes = require('./routes/tasks');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(tasksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
