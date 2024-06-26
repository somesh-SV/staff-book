const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: String,
  productId: String,
  modelNo: String,
  wages: Number,
  stock: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
