# Routes Directory

## Purpose

The `routes` directory contains all the route handlers for the To-Do List web application. Each file in this directory defines the endpoints for specific features, such as user authentication and task management.

---

## Current Routes

### 1. Auth Routes (`auth.js`)

- **Purpose**: Handles user-related operations, such as registration and login.

#### Endpoints:

1. **POST `/users/register`**:

   - **Purpose**: Registers a new user.
   - **Request Body**:
     ```json
     {
       "username": "test_user",
       "email": "test@example.com",
       "password": "securepassword",
       "name": "Test User",
       "avatar": "http://example.com/avatar.jpg"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "User registered successfully",
       "user": {
         "username": "test_user",
         "email": "test@example.com",
         "password": "$2b$10$...",
         "name": "Test User",
         "avatar": "http://example.com/avatar.jpg",
         "_id": "64f1...",
         "__v": 0
       }
     }
     ```

2. **POST `/users/login`**:
   - **Purpose**: Authenticates a user by validating their email and password.
   - **Why POST?**:
     - Login involves submitting sensitive data (email and password). **POST** ensures that this data is sent in the request body, making it more secure than **GET**.
     - In contrast, using **GET** would expose the credentials in the URL and browser history, which is a security risk.
   - **Request Body**:
     ```json
     {
       "email": "test@example.com",
       "password": "securepassword"
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Login successful",
       "user": {
         "username": "test_user",
         "email": "test@example.com",
         "password": "$2b$10$...",
         "name": "Test User",
         "avatar": "http://example.com/avatar.jpg",
         "_id": "64f1...",
         "__v": 0
       }
     }
     ```

---

### 2. Task Routes (`tasks.js`)

- **Purpose**: Handles task-related operations, such as creating, reading, updating, and deleting tasks.

#### Endpoints:

1. **GET `/tasks`**:

   - **Purpose**: Fetches all tasks for a specific user.
   - **Query Parameter**:
     - `user_id` (required): The ID of the user whose tasks you want to fetch.
   - **Response**:
     ```json
     [
       {
         "_id": "64f2...",
         "title": "Task 1",
         "description": "Task 1 description",
         "status": false,
         "due_date": "2024-12-31T00:00:00.000Z",
         "user_id": "64f1..."
       }
     ]
     ```

2. **POST `/tasks`**:

   - **Purpose**: Creates a new task for a specific user.
   - **Request Body**:
     ```json
     {
       "title": "New Task",
       "description": "Task description",
       "status": false,
       "due_date": "2024-12-31",
       "user_id": "64f1..."
     }
     ```
   - **Response**:
     ```json
     {
       "_id": "64f2...",
       "title": "New Task",
       "description": "Task description",
       "status": false,
       "due_date": "2024-12-31T00:00:00.000Z",
       "user_id": "64f1..."
     }
     ```

3. **PUT `/tasks/:id`**:

   - **Purpose**: Updates an existing task by its ID.
   - **Request Body**:
     ```json
     {
       "title": "Updated Task Title",
       "status": true
     }
     ```
   - **Response**:
     ```json
     {
       "_id": "64f2...",
       "title": "Updated Task Title",
       "description": "Task description",
       "status": true,
       "due_date": "2024-12-31T00:00:00.000Z",
       "user_id": "64f1..."
     }
     ```

4. **DELETE `/tasks/:id`**:
   - **Purpose**: Deletes a task by its ID.
   - **Response**:
     ```json
     {
       "message": "Task deleted successfully"
     }
     ```

---

## How to Add a New Route

1. Create a new file in the `routes` directory (e.g., `newRoute.js`).
2. Define your endpoints using `express.Router()`:

   ```javascript
   const express = require("express");
   const router = express.Router();

   router.get("/", (req, res) => {
     res.send("New route working!");
   });

   module.exports = router;
   ```

3. Import and use the route in `index.js`:
   ```javascript
   const newRoute = require("./routes/newRoute");
   app.use("/newRoute", newRoute);
   ```

```

```
