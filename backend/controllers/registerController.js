const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users.model.js");

// Register a new user
const register = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ username, password });
    //check if username exists in the database

    await user.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);

    console.log("pass1", password);
    console.log("pass2", user.password);
    console.log("matchpass", passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      "ebcd4f797ae5b85d829fc048e15c438d5baea28071e0199f9f829333918f6e67",
      {
        expiresIn: "1 hour",
      }
    );
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
