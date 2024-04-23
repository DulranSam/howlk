const express = require("express");
const Router = express.Router();
const readMore = require("../models/readMore");

Router.route("/").get(async (req, res) => {
  try {
    const theData = await readMore.find({
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
    const theData = await readMore.find({
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
  const { heading, preDesc, content, postDesc, category,miniDesc } = req?.body;

  if (!heading || !preDesc || !content || !postDesc || !category || !miniDesc) {
    return res.status(400).json({ Alert: "MISSING REQUIRED DATA" });
  } else {
    try {
      //needs to fetch from mains model
      const conflictHeading = await readMore.findOne({ heading });
      if (!conflictHeading) {
        await readMore.create({
          heading,
          preDesc,
          content,
          postDesc,
          category,
          miniDesc
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

Router.route("/read").post(async (req, res) => {
  const { more } = req.body;
  console.log(more);
  if(!more) return res.status(400).json({Alert:"SEARCH FIELD REQUIRED"})
  try {
    const data = await readMore.findOne({ heading: more });
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ Alert: "No results found" });
    }
  } catch (err) {
    console.error(err);
  }
});



Router.route("/:search").post(async (req, res) => {
  const theSearch = req?.params?.search;
  if (!theSearch) return res.status(400).json({ Alert: "ID required" });

  try {
    const theRequest = await readMore.aggregate([
      { $match: theSearch }, // Replace fieldName with the actual field name you want to match against
    ]);
    if (theRequest.length > 0) {
      res.status(200).json(theRequest);
    } else {
      res.status(404).json({ Alert: "No data found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
});

module.exports = Router;
