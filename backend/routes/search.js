const express = require("express");
const Router = express.Router();
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminiKey = process.env.GEMINI_KEY;

Router.route("/").post(async (req, res) => {
  const { search } = req?.body;

  if (!search) {
    return res.status(400).json({ error: "Search parameter is missing" });
  }

  try {
    if (!geminiKey) {
      throw new Error("Gemini API key is missing");
    }

    const genAI = new GoogleGenerativeAI(geminiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(search);
    const response = await result?.response?.text(); // Check for response existence
    if (response) {
      res.status(200).json({ Output: response });
    } else {
      res.status(404).json({ Alert: "No data found!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = Router;
