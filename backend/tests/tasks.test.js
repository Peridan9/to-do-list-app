const request = require("supertest");
const app = require("../index");
const Task = require("../models/Task");
const User = require("../models/User");

describe("Task Routes", () => {
  let user;

  beforeEach(async () => {
    // Clear collections
    await Task.deleteMany({});
    await User.deleteMany({});

    // Create a user for testing
    user = new User({
      username: "test_user",
      email: "test@example.com",
      password: "securepassword",
    });
    await user.save();
  });

  test("POST /tasks - Create a new task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
        description: "This is a test task",
        status: false,
        due_date: "2024-12-31",
        user_id: user._id,
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
      user_id: user._id,
    });
    await task.save();

    const res = await request(app)
      .get(`/tasks?user_id=${user._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe("Test Task");
  });

  test("PUT /tasks/:id - Update a task", async () => {
    const task = new Task({
      title: "Old Task",
      description: "This is a test task",
      status: false,
      user_id: user._id,
    });
    await task.save();

    const res = await request(app)
      .put(`/tasks/${task._id}`)
      .send({ title: "Updated Task" });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Task");
  });

  test("DELETE /tasks/:id - Delete a task", async () => {
    const task = new Task({
      title: "Test Task",
      description: "This is a test task",
      status: false,
      user_id: user._id,
    });
    await task.save();

    const res = await request(app)
      .delete(`/tasks/${task._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task deleted successfully");
  });
});
