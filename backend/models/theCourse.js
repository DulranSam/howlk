const mongoose = require("mongoose");
const theCourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
    min:5,
  }, 
  videos:{
    type:[String],
    default:[],
  },
  rating:{
    type:[Number],
    default:[]
  }
});

const theCourse = mongoose.model("thecourses", theCourseSchema);

module.exports = theCourse;
