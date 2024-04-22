const express = require("express");
const Router = express.Router();
const userModel = require("../models/user");
const { Hashing } = require("../security/hashing");

Router.route("/").post(async (req, res) => {
  const { username, password } = req?.body;
  if (!username || !password)
    return res.status(400).json({ Alert: "Username and password required" });

  try {
    const usernameTaken = await userModel.aggregate([{ $match: { username } }]);
    if (!usernameTaken) {
      await userModel
        .create({ username, password: await Hashing(password) })
        .then(() => {
          return res.status(201).json({ Alert: `${username} Created` });
        })
        .catch((err) => {
          return res.status(500).json(err.message);
        });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = Router;
