const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
   
  },
  description: {
    type: String,
  
  },
  videoUrl: {
    type: String,
    trim:true,
  },
});

const Course = mongoose.model("courses", courseSchema);

module.exports = Course;
