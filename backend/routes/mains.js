const express = require("express");
const Router = express.Router();
const startersModel = require("../models/starters");

Router.route("/").get(async (req, res) => {
  try {
    //needs to fetch from mains model

    const theData = await startersModel.find({
      category: "main",
    });
    if (theData && theData.length) {
      res.status(200).json(theData);
    } else {
      res.status(404).json({ Alert: "No results found!" });
    }
  } catch (err) {
    console.error(err);
  }
});

Router.route("/sides").get(async (req, res) => {
  try {
    //needs to fetch from mains model

    const theData = await startersModel.find({
      category: "side",
    });
    if (theData && theData.length) {
      res.status(200).json(theData);
    } else {
      res.status(404).json({ Alert: "No results found!" });
    }
  } catch (err) {
    console.error(err);
  }
});

Router.route("/adds").post(async (req, res) => {
  const { heading, preDesc, content, postDesc, category } = req?.body;

  if (!heading || !preDesc || !content || !postDesc || !category) {
    return res.status(400).json({ Alert: "MISSING REQUIRED DATA" });
  } else {
    try {
      //needs to fetch from mains model
      const conflictHeading = await startersModel.findOne({ heading });
      if (!conflictHeading) {
        await startersModel.create({
          heading,
          preDesc,
          content,
          postDesc,
          category,
        });
        return res.status(201).json({ Alert: `${heading} Added!` });
      } else {
        return res.status(500).json({ Alert: "Erorr while adding!" });
      }
    } catch (err) {
      console.error(err);
    }
  }
});

Router.route("/:id").post(async (req, res) => {
  const theSearch = req?.params?.search;
  if (!theSearch) return res.status(400).json({ Alert: "ID required" });

  try {
    const theRequest = await startersModel.find({ $match: search });
    if (theRequest) {
      res.status(200).json(theRequest);
    } else {
      res.status(404).json({ Alert: "No data found" });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = Router;
