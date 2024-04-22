const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        min:5,
        max:20,
    },
    password:{
        type:String,
        trim:true,
        min:5,
        max:20,
    },
    pfp:{
        type:String,
        default:""
    },
    admin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;