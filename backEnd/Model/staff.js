const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  staffName: String,
  staffMobileNo: Number,
  staffAddress: String,
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Staff", StaffSchema);
