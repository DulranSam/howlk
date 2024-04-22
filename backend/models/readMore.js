const mongoose = require("mongoose");
const readMore = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    min: 5,
    trim: true,
  },
  preDesc: {
    type: String,
    required: true,
    min: 5,
    trim: true,
  },
  miniDesc:{
    type:String,
    default:"",
    trim:true,
   },
  content: {
    type: Array,
    default: [String],
  },
  postDesc: {
    type: String,
    required: true,
    min: 5,
    trim: true,
  },
  category:{
    type: String,
    required: true,
    min: 5,
    trim: true,
    default:"main"
  },
  niche:{
    //we should allow for niche implementation but for now it's fine
  }
});

const readModel = mongoose.model("starters",readMore);
module.exports = readModel;