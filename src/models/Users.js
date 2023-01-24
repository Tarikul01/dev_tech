const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
     name:{
      type:String,

     },
     email:{
      type:String,
      required:true,
     },
     password:{
      type:String,
      required:true,
     },
     country:{
      type:String,

     },
     designation:{
      type:String,

     },
     rating:{
      type:Number,
      default:0,
     },
     stack:{
      type:Array,
     },
     address:{
      type:String,
     },
     univeristy:{
      type:String,
     }


  },

  { versionKey: false }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
