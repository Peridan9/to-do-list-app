
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

#### Password Security

The `password` field in the `User` model is hashed before being saved to the database to ensure security. This is achieved using the `bcrypt` library:

- **Hashing Passwords**:
  - Before saving a user document, the `pre("save")` middleware automatically hashes the raw password using `bcrypt.hash(password, 10)`.
  - This ensures raw passwords are never stored in the database.

- **Comparing Passwords**:
  - The `comparePassword` method is used to validate a user’s password during login.
  - It compares the candidate password (entered by the user) with the hashed password stored in the database using `bcrypt.compare()`.

#### Example Code
```javascript
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Skip hashing if the password is not modified
  }
  try {
    this.password = await bcrypt.hash(this.password, 10); // Hash password
    next();
  } catch (err) {
    next(err); // Pass errors to the next middleware
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
```

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
3. Add any additional methods or middleware as needed.

