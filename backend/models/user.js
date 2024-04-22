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
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Fdark-pfp--921549142481701997%2F&psig=AOvVaw0mjTDgsQFazIb6tAklWZH8&ust=1713847814428000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCP7OKC1YUDFQAAAAAdAAAAABAE"
    },
    admin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;