const express = require("express");
const Router = express.Router();
const userModel = require("../models/user");
const { Authenticate } = require("../security/hashing");

Router.route("/").post(async (req, res) => {
  const { username, password } = req?.body;
  if (!username || !password)
    return res.status(400).json({ Alert: "Username and password required" });

  try {
    const userExists = await userModel.aggregate([{ $match: { username } }]);
    if (userExists) {
      const userValid = await Authenticate(password, userExists.password);
      if (userValid) {
        return res.status(200).json({ Alert: `${username} has logged in!` });
      } else {
        return res.status(401).json({ Alert: `${username} Unauthorized!` });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Alert: err.message });
  }
});

module.exports = Router;
