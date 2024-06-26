const product = require("../Model/product");
const customer = require("../Model/customer");
const { ObjectId } = require("mongodb");

module.exports.postProduct = async (requestData, callback) => {
  try {
    let data = new product(requestData);
    let response = await data.save();
    callback(null, response);
  } catch (error) {
    callback(error);
  }
};

module.exports.getProduct = async (callback) => {
  try {
    const response = await product.find();
    callback(null, response);
  } catch (err) {
    callback(err);
  }
};

module.exports.getProductById = async (id, callback) => {
  try {
    const response = await product.find({ _id: id });
    if (response) {
      callback(null, response);
    }
  } catch (err) {
    callback(err);
  }
};

module.exports.deleteProduct = async (id, callback) => {
  try {
    const customers = await customer.find();
    for (let i = 0; i < customers.length; i++) {
      const customerData = customers[i];
      const indexToDelete = customerData.linkedProducts.findIndex(
        (linkedProduct) => {
          return new ObjectId(linkedProduct.productId).equals(id);
        }
      );
      if (indexToDelete !== -1) {
        customerData.linkedProducts.splice(indexToDelete, 1);
        await customer.findByIdAndUpdate(
          customerData._id,
          { linkedProducts: customerData.linkedProducts },
          { new: true }
        );
      }
    }
    const response = await product.findByIdAndDelete(id);
    if (response) {
      callback(null, response);
    }
  } catch (err) {
    callback(err);
  }
};

module.exports.updateProduct = async (id, requestData, callback) => {
  try {
    const response = await product.findByIdAndUpdate(id, requestData);
    if (response) {
      callback(null, response);
    }
  } catch (err) {
    callback(err);
  }
};

module.exports.filterProduct = async (query, callback) => {
  try {
    const searchResults = await product.find({
      $or: [
        { productName: { $regex: query, $options: "i" } },
        { productId: { $regex: query, $options: "i" } },
        { modelNo: { $regex: query, $options: "i" } },
      ],
    });
    if (searchResults) {
      callback(null, searchResults);
    }
  } catch (err) {
    callback(err);
  }
};

module.exports.clearProduct = async (requestData, callback) => {
  try {
    const res = await Promise.all(
      requestData.map(async (productData) => {
        const { ProductName, Quantity } = productData;
        const singleProduct = await product.findOne({
          productName: ProductName,
        });
        singleProduct.stock -= parseInt(Quantity, 10);
        await singleProduct.save();
      })
    );
    if (res) {
      callback(null, res);
    }
  } catch (err) {
    callback(err);
  }
};
