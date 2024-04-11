const mongoose = require("mongoose");
const mainSchema = new mongoose.Schema({
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

const mainModel = mongoose.model("mains",mainSchema);
module.exports = mainModel;