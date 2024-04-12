const express = require("express");
const Router = express.Router();
require("dotenv").config();
const geminiKey = process.env.GEMINI_KEY

Router.route("/").post(async (req, res) => {
  const { search } = req?.body;

  try {
    const genAI = new GoogleGenerativeAI(geminiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(search);
    const response = await result.response;
    const text = response.text();
    if (text) {
      res.status(200).json({ Output: text });
    } else {
      res.status(404).json({ Alert: "NO data found!" });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = Router;