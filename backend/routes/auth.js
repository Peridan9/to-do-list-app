const express = require("express");
const router = express.Router();
const User = require("../models/User");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user authentication
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     description: Creates a new user with a unique username and email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "test_user"
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *               name:
 *                 type: string
 *                 example: "Test User"
 *               avatar:
 *                 type: string
 *                 example: "http://example.com/avatar.jpg"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email or Username already exists
 */
router.post("/register", async (req, res) => {
  const { username, email, password, name, avatar } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or Username already exists" });
    }
    const newUser = new User({ username, email, password, name, avatar });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     description: Authenticates a user with email and password and starts a session.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(200).json({ message: "Login successful", user: req.session.user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Authentication]
 *     description: Logs out the current user and destroys the session.
 *     responses:
 *       200:
 *         description: Logout successful
 *       500:
 *         description: Logout failed
 */
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout Failed" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.status(200).json({ message: "Logout Successful" });
  });
});

module.exports = router;
