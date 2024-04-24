const express = require("express");
const Router = express.Router();
const coursesModel = require("../models/courses");


Router.route("/").get(async (req, res) => {
  try {
    const data = await coursesModel.find();
    if (data && data.length) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ Alert: "No data found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
});

Router.route("/theCourse").post(async (req, res) => {
  const {theID} = req?.body;
  if (!theID) return res.status(400).json({ Alert: "ID Required" });

  try {
    const data = await coursesModel.aggregate([{$match:{title:theID}}]);
    if (data && data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ Alert: "Data not found" });
      console.log(`No data found`)
    }

    // You can add your logic here
  } catch (err) {
    console.error(err);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
});

Router.route("/add").post(async (req, res) => {
  const { title, description, videoUrl, videos } = req.body;
  if (!title || !description || !videoUrl || !videos )
    return res.status(400).json({ Alert: "Title, description Required!" });

  try {
    const conflict = await coursesModel.findOne({ title });
    if (conflict) {
      return res.status(409).json({ Alert: "Resource already exists" });
    } else {
      const resourceAdd = await coursesModel.create({
        title,
        courses,
        videoUrl,
      });
      res.status(201).json(resourceAdd);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ Alert: "Internal Server Error" });
  }
});

module.exports = Router;
