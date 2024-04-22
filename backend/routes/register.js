const express = require("express");
const Router = express.Router();
const userModel = require("../models/user");
const { Hashing } = require("../security/hashing");

Router.route("/").post(async (req, res) => {
  const { username, password } = req.body; // Removed optional chaining, it's unnecessary here
  if (!username || !password)
    return res.status(400).json({ Alert: "Username and password required" });

  try {
    // Check if username is already taken
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ Alert: "Username already taken" });
    } else {
      // Hash the password
      const hashedPassword = new Hashing(password);

      // Create the new user
      const newUser = await userModel.create({ username, password: hashedPassword });
      
      // Respond with success message
      return res.status(201).json({ Alert: `${newUser.username} Created` });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Alert: "Internal Server Error" });
  }
});

module.exports = Router;