const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userId:{
       type:mongoose.Types.ObjectId,
       required:true,
    },
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default:false,

    },
    complexity:{
        type:String,
    },
     budget:{
        type:Number
    },
    tags:[String]


  },

  { versionKey: false }
);
const Problem = mongoose.model("Problem", userSchema);

module.exports = Problem;
