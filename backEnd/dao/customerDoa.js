const customer = require("../Model/customer");

module.exports.postCustomer = async (requestData, callback) => {
  try {
    let data = new customer(requestData);
    let response = await data.save();
    callback(null, response);
  } catch (err) {
    callback(err);
  }
};

module.exports.getCustomer = async (callback) => {
  try {
    const response = await customer
      .find()
      .populate({ path: "linkedProducts.productId", model: "Product" });
    if (response) {
      callback(null, response);
    }
  } catch (err) {
    callback(err);
  }
};

module.exports.getCustomerById = async (id, callback) => {
  try {
    const response = await customer
      .find({ _id: id })
      .populate({ path: "linkedProducts.productId", model: "Product" });
    if (response) {
      callback(null, response);
    }
  } catch (err) {
    callback(err);
  }
};

module.exports.deleteCustomer = async (id, callback) => {
  try {
    const response = await customer.findByIdAndDelete(id);
    if (response) {
      callback(null, response);
    }
  } catch (err) {
    callback(err);
  }
};

module.exports.updateCustomer = async (id, requestData, callback) => {
  try {
    const response = await customer.findByIdAndUpdate(id, requestData, {
      new: true,
    });
    return callback(null, response);
  } catch (err) {
    return callback(err);
  }
};

module.exports.getLinkedProducts = async (id, requestData, callback) => {
  try {
    const linkProductId = requestData.linkProductId;
    const customerDetail = await customer
      .findById({ _id: id })
      .populate({ path: "linkedProducts.productId", model: "Product" });
    if (customerDetail) {
      const data = customerDetail.linkedProducts.filter(
        (product) => product._id.toString() === linkProductId
      );
      if (data) {
        return callback(null, data);
      }
    }
  } catch (err) {
    return callback(err);
  }
};

module.exports.updatedLinkedProducts = async (id, requestData, callback) => {
  try {
    const existingCustomer = await customer.findById(id);
    const productId = requestData.linkedProducts[0].productId;
    const existingProductIndex = existingCustomer.linkedProducts.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (existingProductIndex !== -1 && requestData.edit) {
      existingCustomer.linkedProducts[existingProductIndex] =
        requestData.linkedProducts[0];

      const response = await customer
        .findByIdAndUpdate(
          id,
          { $set: { linkedProducts: existingCustomer.linkedProducts } },
          { new: true }
        )
        .populate({ path: "linkedProducts.productId", model: "Product" });
      return callback(null, response);
    } else {
      if (existingProductIndex !== -1) {
        return callback(new Error("Already Updated"));
      } else {
        const updatedLinkedProducts = existingCustomer.linkedProducts.concat(
          requestData.linkedProducts
        );
        const response = await customer
          .findByIdAndUpdate(
            id,
            { $set: { linkedProducts: updatedLinkedProducts } },
            { new: true }
          )
          .populate({ path: "linkedProducts.productId", model: "Product" });
        return callback(null, response);
      }
    }
  } catch (err) {
    return callback(err);
  }
};

module.exports.deleteLinkedProduct = async (id, requestData, callback) => {
  try {
    const existingCustomer = await customer.findById(id);
    const productId = requestData.linkedProducts[0].productId;
    const existingProductIndex = existingCustomer.linkedProducts.findIndex(
      (product) => product._id.toString() === productId
    );
    if (existingProductIndex !== -1) {
      existingCustomer.linkedProducts.splice(existingProductIndex, 1);

      const response = await customer
        .findByIdAndUpdate(
          id,
          { linkedProducts: existingCustomer.linkedProducts },
          { new: true }
        )
        .populate({ path: "linkedProducts.productId", model: "Product" });

      return callback(null, response);
    }
  } catch (error) {
    return callback(error, null);
  }
};

module.exports.filterCustomer = async (query, callback) => {
  try {
    const searchResults = await customer.find({
      $or: [{ customerName: { $regex: query, $options: "i" } }],
    });
    if (searchResults) {
      callback(null, searchResults);
    }
  } catch (err) {
    callback(err);
  }
};
module.exports.filterLinkedProduct = async (id, query, callback) => {
  try {
    const searchResults = await customer
      .findOne({
        _id: id,
      })
      .populate({ path: "linkedProducts.productId", model: "Product" });

    if (searchResults) {
      const filteredProducts = searchResults.linkedProducts.filter(
        (linkedProduct) =>
          linkedProduct.productId.productName
            .toLowerCase()
            .includes(query.toLowerCase())
      );
      callback(null, filteredProducts);
    }
  } catch (err) {
    callback(err);
  }
};
