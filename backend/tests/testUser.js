const mongoose = require("mongoose");
const User = require("../models/User.js");

mongoose
  .connect("mongodb://127.0.0.1:27017/todoDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async() => {
    console.log("Connected to MongoDB");

    // Create a new user
    const newUser = new User({
        username: "test_user",
        email: "test@example.com",
        password: "securepassword", // Raw password
        name: "Test User",
        avatar: "http://example.com/avatar.jpg",
    });

    // Save the user
    await newUser.save();
    console.log("User saved:", newUser);

    //Test password comparison
    const isMatch = await newUser.comparePassword("securepassword");
    console.log("Password match:",isMatch);

    // Disconnect after testing
    console.log("Test Completed, Now disconnecting from mongoDB");
    mongoose.disconnect();

  })
  .catch((err) => {
    console.error("Error:",err);
    mongoose.disconnect();
  });
