const request = require("supertest");
const app = require("../index"); // Assuming your app is exported from index.js
const User = require("../models/User");

describe("Auth Routes", () => {
  beforeEach(async () => {
    // Clear the users collection before each test
    await User.deleteMany({});
  });

  test("POST /users/register - Register a new user", async () => {
    const res = await request(app)
      .post("/users/register")
      .send({
        username: "test_user",
        email: "test@example.com",
        password: "securepassword",
        name: "Test User",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
    expect(res.body.user).toHaveProperty("_id");
  });

  test("POST /users/login - Log in with valid credentials", async () => {
    // First, create a user
    const user = new User({
      username: "test_user",
      email: "test@example.com",
      password: "securepassword",
    });
    await user.save();

    const res = await request(app)
      .post("/users/login")
      .send({ email: "test@example.com", password: "securepassword" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful");
  });

  test("POST /users/login - Fail login with invalid password", async () => {
    const user = new User({
      username: "test_user",
      email: "test@example.com",
      password: "securepassword",
    });
    await user.save();

    const res = await request(app)
      .post("/users/login")
      .send({ email: "test@example.com", password: "wrongpassword" });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });
});
