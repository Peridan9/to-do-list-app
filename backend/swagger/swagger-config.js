const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "To-Do List API",
      version: "1.0.0",
      description: "API documentation for the To-Do List app",
    },
    servers: [
      {
        url: "http://localhost:5000", // Your local server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
