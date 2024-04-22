const express = require("express");
const Router = express.Router();
const userModel = require("../models/user");
const { ComparePasswords } = require("../security/hashing");
const bcrypt = require("bcrypt")

Router.route("/").post(async (req, res) => {
  const { username, password } = req.body; // Removed optional chaining, not needed here
  if (!username || !password)
    return res.status(400).json({ Alert: "Username and password required" });

  try {
    // Find the user by username
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ Alert: "Unauthorized" });
    }

    // Compare the provided password with the stored hashed password
    // const passwordMatch = await ComparePasswords(password, user.password);
    const passwordMatch = bcrypt.compareSync(password,user.password)
    if (passwordMatch) {
      return res.status(200).json({ user });
    } else {
      return res.status(401).json({ Alert: "Unauthorized" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Alert: "Internal Server Error" });
  }
});

module.exports = Router;
