const mongoose = require("mongoose");

const linkedProductsSchema = new mongoose.Schema({
  productId: { type: mongoose.SchemaTypes.ObjectId, ref: "Product" },
  price: Number,
});

const CustomerSchema = new mongoose.Schema({
  customerName: String,
  customerMobileNo: Number,
  customerAddress: String,
  gst: String,
  linkedProducts: [linkedProductsSchema],
});

module.exports = mongoose.model("Customer", CustomerSchema);
