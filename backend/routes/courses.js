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
  }
});

Router.route("/:courses").post(async (req,res)=>{

  const theID = req.params.courses;
  if(!theID) return res.status(400).json({Alert:"ID Required"})
  
  try{
    

  }catch(err){
    console.error(err);
  }
})

Router.route("/add").post(async (req, res) => {
  const { title, courses, videoUrl } = req?.body;
  if (!title || !courses)
    return res.status(400).json({ Alert: "Title Courses and URL Required!" });
  //!video
  //cloudinary logic for video saving
  //403 bad request
  try {
    const conflict = await coursesModel.find(title);
    if (!conflict) {
      const resourceAdd = await coursesModel.create({
        title,
        courses,
        videoUrl,
      });
      if (resourceAdd) {
        res.status(201).json(conflict);
      } else {
        res.status(400).json({ Alert: "Error while adding resource!" });
      }
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = Router;
