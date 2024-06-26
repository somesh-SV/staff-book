const mongoose = require("mongoose");
const moment = require("moment");

const StaffMgmtSchema = new mongoose.Schema({
  staffId: String,
  date: {
    type: String,
    default: moment().format("DD-MM-YYYY"),
  },
  productName: String,
  wages: Number,
  quantity: Number,
  total: Number,
  cashPaid: Number,
});

StaffMgmtSchema.pre("save", function (next) {
  this.date = moment(this.date, "DD-MM-YYYY").format("DD-MM-YYYY");
  next();
});

module.exports = mongoose.model("StaffMgmt", StaffMgmtSchema);
