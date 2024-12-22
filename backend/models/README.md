# Models Directory

## Purpose

The `models` directory contains all the Mongoose models for this project. Each model represents a collection in the MongoDB database and defines the structure of the documents within that collection.

## What is a Model?

A **model** in Mongoose is a JavaScript class that interacts with a specific MongoDB collection. It uses a **schema** to define the structure of documents, including their fields, data types, and optional constraints.

## Current Models

### 1. Task Model

- **File**: `Task.js`
- **Description**: Represents tasks in the to-do list application.
- **Fields**:
  - `title` (String, required): The title of the task.
  - `description` (String): Additional details about the task.
  - `status` (Boolean, default: `false`): Whether the task is completed.
  - `due_date` (Date): The deadline for the task.
  - `user_id` (ObjectId, required): References the User model.

### 2. User Model

- **File**: `User.js`
- **Description**: Represents users in the application.
- **Fields**:
  - `username` (String, required, unique): The user’s unique username.
  - `email` (String, required, unique): The user’s email address.
  - `password` (String, required): The hashed password for authentication.
  - `name` (String): The user’s full name.
  - `avatar` (String): URL of the user’s profile picture.

## How to Add a New Model

1. Create a new file in the `models` directory (e.g., `MyModel.js`).
2. Define the schema using Mongoose:

   ```javascript
   const mongoose = require("mongoose");

   const myModelSchema = new mongoose.Schema({
     fieldName: { type: DataType, required: true },
   });

   const MyModel = mongoose.model("MyModel", myModelSchema);

   module.exports = MyModel;
   ```
