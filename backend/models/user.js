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
    mail:{
        type:String,
        trim:true,
        min:5,
        max:20,
    },
    signedUpFor:{
        type:[String],
        min:5,
        max:20,
    },
    pfp:{
        type:String,
        default:"https://i.pinimg.com/736x/a3/31/a8/a331a8d0a8ff50827c6cb3437f336a30.jpg"
    },
    admin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;