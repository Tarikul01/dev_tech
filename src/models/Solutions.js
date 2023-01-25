const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
     userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
     },
     problemId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Problem",
     },
     solutionDuration:{
        type:Number,
     },
     status:{
        type:Boolean,
        defult:false,
     }
  },

  { versionKey: false }
);
const Solution = mongoose.model("Solution", userSchema);

module.exports = Solution;
