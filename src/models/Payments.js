const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    
  },

  { versionKey: false }
);
const Payment = mongoose.model("Payment", userSchema);

module.exports = Payment;
