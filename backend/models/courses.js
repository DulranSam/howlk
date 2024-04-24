const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim:true,
    min:5,max:20
   
  },
  description: {
    type: String,
    trim:true, 
  },
  videoUrl: {
    type: String,
    trim:true,
  },
  videos:{
    type:[String],
    default:[],
  },
  rating:{
    type:[Number],
    min:1,
    max:10,
    default:[]
  }
});

const Course = mongoose.model("courses", courseSchema);

module.exports = Course;
