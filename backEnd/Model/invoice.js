const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  tableRows: [],
  currentDate: String,
  invoiceNumber: String,
  customerId: { type: mongoose.SchemaTypes.ObjectId, ref: "Customer" },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
