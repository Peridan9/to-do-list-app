# Tests Directory

## Purpose

The `tests` directory contains all the test files for the To-Do List application. Testing ensures that the routes and core functionality of the application work as expected and helps catch errors early.

---

## Initial Test (`testUser.js`)

Before setting up Jest, we created a simple test script called `testUser.js` to manually test the `User` model. This script:

- Connected to the database.
- Created a sample user.
- Verified that the password was hashed correctly.
- Compared the raw password with the hashed password using the `comparePassword` method.

**Usage**:

```bash
node tests/testUser.js
```

While this approach worked, it was manual and lacked automation for testing multiple scenarios, which is why we moved to Jest for structured and automated testing.

---

## Moving to Jest

We integrated **Jest**, a powerful JavaScript testing framework, to automate and streamline our testing process.

### **What is Jest?**

Jest is a testing framework for JavaScript that provides:

- **Test Suites and Test Cases**: Organized and structured tests.
- **Mocks**: Simulate functionality or data.
- **Snapshots**: Capture component output for testing changes over time.

### **Why Jest?**

- Easy to use and configure.
- Works seamlessly with Supertest for HTTP route testing.
- Provides clear and readable test results.

---

## Test Structure

### 1. Test Files

We wrote two main test files:

- **`auth.test.js`**: Tests the authentication routes (`/users/register` and `/users/login`).
- **`tasks.test.js`**: Tests the task routes (`/tasks` endpoints).

### 2. Database Mocking

To avoid using the live database during tests, we set up **MongoMemoryServer**:

- Creates an in-memory MongoDB instance for isolated and clean testing environments.
- Automatically starts and stops with each test suite.

---

## Changes to Support Jest

### 1. `index.js` Updates

To ensure Jest works without conflicts, we modified `index.js`:

- Prevented the server from starting during tests.
- Exported the Express app for Supertest.

**Changes**:

```javascript
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
```

### 2. Adding `setup.js`

We added a `setup.js` file in the `tests` directory to configure the in-memory database:

```javascript
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
```

---

## How to Run Tests

1. Install the necessary dependencies:

   ```bash
   npm install
   ```

2. Run all tests:

   ```bash
   npm test
   ```

3. Jest will automatically find and execute test files ending with `.test.js` in the `tests` directory.

---

## Example Test

Here’s an example of a test case for registering a user:

```javascript
test("POST /users/register - Register a new user", async () => {
  const res = await request(app).post("/users/register").send({
    username: "test_user",
    email: "test@example.com",
    password: "securepassword",
    name: "Test User",
  });

  expect(res.statusCode).toBe(201);
  expect(res.body.message).toBe("User registered successfully");
});
```

---

## Benefits of Using Jest

1. **Automation**: No need for manual execution of scripts like `testUser.js`.
2. **Isolated Testing**: Each test runs in a clean environment with its own in-memory database.
3. **Clear Output**: Jest provides detailed information about passed and failed tests.

---

## How to Add a New Test

1. Create a new test file in the `tests` directory (e.g., `newFeature.test.js`).
2. Write your tests using Jest and Supertest:
   ```javascript
   describe("New Feature Tests", () => {
     test("Test description", async () => {
       const res = await request(app).get("/newFeature");
       expect(res.statusCode).toBe(200);
     });
   });
   ```
3. Run the test suite:
   ```bash
   npm test
   ```
