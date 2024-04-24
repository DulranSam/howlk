const express = require("express");
const Router = express.Router();
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const geminiKey = process.env.GEMINI_KEY;
// const mainModel = require("../models/readMore")
const mongoose = require("mongoose");

Router.route("/:search").post(async (req, res) => {
  const { search } = req?.params;

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
    const response = result?.response?.text(); // Check for response existence
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

Router.route("/").post(async (req, res) => {
  const { within } = req.body;
  console.log(within);

  // Check if 'within' field is provided in the request body
  if (!within) {
    return res.status(400).json({ Alert: "Query required" });
  }

  try {
    const db = mongoose.connection.db;

    // Get a list of all collections in the database
    const collections = await db.collections();

    // Array to store aggregation results from each collection
    const aggregatedResults = [];

    // Iterate over each collection
    for (let i = 0; i < collections.length; i++) {
      const collection = collections[i];
      // Perform MongoDB aggregation with the provided 'within' query for each collection
      const response = await collection.aggregate([
        { $match: { within } } // Replace 'within' with the actual query
      ]).toArray(); // Convert cursor to array
      // Push the aggregation results to the array
      aggregatedResults.push(...response);
    }

    // Check if there are results
    if (aggregatedResults.length > 0) {
      return res.status(200).json(aggregatedResults);
    } else {
      return res.status(404).json({ Alert: "No results found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Alert: "Internal Server Error" });
  }
});



module.exports = Router;
