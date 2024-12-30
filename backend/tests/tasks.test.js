const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const Task = require("../models/Task");
const User = require("../models/User");

let sessionCookie;
let userId;

beforeEach(async () => {
  // Clear collections
  await Task.deleteMany({});
  await User.deleteMany({});

  // Create and log in a user
  const user = new User({
    username: "test_user",
    email: "test@example.com",
    password: "securepassword",
  });
  await user.save();

  userId = user._id; // Store the user's ObjectId

  const loginRes = await request(app)
    .post("/users/login")
    .send({ email: "test@example.com", password: "securepassword" });

  sessionCookie = loginRes.headers["set-cookie"][0]; // Extract session cookie
});

describe("Task Routes", () => {
  test("POST /tasks - Create a new task", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Cookie", sessionCookie) // Attach the session cookie
      .send({
        title: "Test Task",
        description: "This is a test task",
        status: false,
        due_date: "2024-12-31",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe("Test Task");
  });

  test("GET /tasks - Fetch tasks for a user", async () => {
    const task = new Task({
      title: "Test Task",
      description: "This is a test task",
      status: false,
      due_date: "2024-12-31",
      user_id: userId, // Use the valid ObjectId for user_id
    });
    await task.save();

    const res = await request(app)
      .get("/tasks")
      .set("Cookie", sessionCookie); // Attach the session cookie

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Test Task");
  });
});
