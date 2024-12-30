# Backend for To-Do List Application

This folder contains all the backend logic for the To-Do List application, including API routes, database connectivity, and configuration. Below is a detailed explanation of each file and its purpose.

---

## **Files and Their Purpose**

### **1. `db.js`**

- **Purpose**: Manages the connection to the MongoDB database.
- **What It Does**:
  - Connects to a MongoDB instance using `mongoose`.
  - Logs success or error messages based on the connection status.
- **Key Points**:
  - Ensures a persistent connection to the database.
  - Centralizes database logic, making it easier to modify or replace the database in the future.

---

### **2. `index.js`**

- **Purpose**: The main entry point for the backend server.
- **What It Does**:
  - Sets up the Express server.
  - Configures middleware like CORS, body parsing, and session management.
  - Defines and integrates routes for the application.
  - Exports the app for use in testing or other modules.

#### **Detailed Breakdown**

##### **What is `app`?**

- `app` is an instance of an Express application created by calling `express()`:
  ```javascript
  const express = require("express");
  const app = express();
  ```
- It serves as the central object for configuring and handling HTTP requests.

##### **What is `app.use`?**

- `app.use` is a method in Express used to apply middleware or mount routes.
- Middleware functions are executed in the order they are defined and can:
  - Modify the request or response objects.
  - End the request-response cycle.
  - Pass control to the next middleware.

##### **Structure of `index.js`**

Here’s a sample structure explained:

1. **Imports**:

   - Required modules are imported at the top:
     ```javascript
     const express = require("express");
     const cors = require("cors");
     const bodyParser = require("body-parser");
     const session = require("express-session");
     const { swaggerUi, swaggerDocs } = require("./swagger/swagger-config");
     ```
   - These modules handle server creation, middleware, and API documentation.

2. **App Instance**:

   - Creates an instance of the Express application:
     ```javascript
     const app = express();
     ```

3. **Middleware**:

   - Global middleware is applied to handle common tasks:
     ```javascript
     app.use(cors());
     app.use(bodyParser.json());
     app.use(
       session({
         secret: "myStrongSecretKey123!",
         resave: false,
         saveUninitialized: false,
         cookie: {
           httpOnly: true,
           secure: false,
           maxAge: 24 * 60 * 60 * 1000,
         },
       })
     );
     ```
     - **CORS**: Enables cross-origin requests.
     - **Body Parser**: Parses JSON in incoming requests.
     - **Session**: Manages user sessions.

4. **Swagger Integration**:

   - Provides interactive API documentation:
     ```javascript
     app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
     ```

5. **Routes**:

   - Mounts routes for handling user and task-related requests:
     ```javascript
     app.use("/users", authRoutes);
     app.use("/tasks", tasksRoutes);
     ```

6. **Server Start**:

   - Starts the server only when not in a testing environment:
     ```javascript
     if (process.env.NODE_ENV !== "test") {
       app.listen(PORT, () => {
         console.log(`Server is running on http://localhost:${PORT}`);
         console.log(
           `Swagger docs available at http://localhost:${PORT}/api-docs`
         );
       });
     }
     ```

7. **Exporting `app`**:
   - Exports the `app` instance for testing or other modules:
     ```javascript
     module.exports = app;
     ```

---

### **3. `package.json`**

- **Purpose**: Defines the metadata and dependencies for the backend project.
- **What It Does**:
  - Lists all installed packages (`dependencies` and `devDependencies`).
  - Specifies scripts for running or testing the project.
- **Key Fields**:
  - **`dependencies`**: Required libraries for the project to run.
  - **`devDependencies`**: Libraries used during development or testing.
  - **`scripts`**:
    - `start`: Runs the server.
    - `test`: Executes the test suite using Jest.

---

### **4. `package-lock.json`**

- **Purpose**: Automatically generated file that locks the dependency versions.
- **What It Does**:
  - Ensures consistent dependency versions across different environments.
  - Tracks the exact versions of all installed dependencies and sub-dependencies.

---

## **Educational Takeaways**

1. **Separation of Concerns**:

   - Each file focuses on a specific task:
     - `db.js`: Database logic.
     - `index.js`: Server setup.
     - `routes/`: API logic.

2. **Modularity**:

   - Components like middleware, routes, and configurations are kept modular for easy maintenance.

3. **Exporting and Reusability**:

   - Exporting `app` allows reuse in testing or other scenarios.

4. **Swagger for Documentation**:
   - Interactive API docs provide a clear interface for developers to understand and test endpoints.

---

## **How to Run the Backend**

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. Access the API documentation at:
   ```
   http://localhost:5000/api-docs
   ```
