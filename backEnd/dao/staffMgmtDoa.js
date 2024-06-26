const product = require("../Model/product");
const staff = require("../Model/staff");
const staffMgmt = require("../Model/staffMgmt");

module.exports.postStaffMgmt = async (requestData, callback) => {
  try {
    let data = new staffMgmt(requestData);
    await data.save();
    const response = await product.find();
    if (response) {
      const setStock = response.map((item) => {
        item.stock = 0;
        return item;
      });
      for (const productItem of setStock) {
        const staffData = await staffMgmt.find({
          productName: productItem.productName,
        });
        const totalQuantity = staffData.reduce(
          (acc, entry) => acc + entry.quantity,
          0
        );
        productItem.stock = totalQuantity;
        await product.updateOne(
          { _id: productItem._id },
          { $set: { stock: totalQuantity } }
        );
      }
    }
    callback(null, response);
  } catch (err) {
    callback(err);
  }
};

module.exports.getStaffMgmtById = async (id, callback) => {
  try {
    const response = await staffMgmt.find({
      $or: [{ staffId: id }, { _id: id }],
    });
    if (response.length === 0) {
      await staff.findOneAndUpdate(
        { _id: id },
        { $set: { balance: 0 } },
        { new: true }
      );
    }
    if (response) {
      callback(null, response);
    }
  } catch (err) {
    callback(err);
  }
};

module.exports.updateStaffMgmt = async (id, requestData, callback) => {
  try {
    const response = await staffMgmt.findByIdAndUpdate(id, requestData);
    if (response) {
      callback(null, response);
    }
  } catch (err) {
    callback(err);
  }
};

module.exports.updateBalance = async (id, requestData, callback) => {
  try {
    const response = await staff.findOneAndUpdate(
      { _id: id },
      { $set: requestData },
      { new: true }
    );
    //console.log(response);
    if (response) {
      callback(null, response);
    }
  } catch (err) {
    callback(err);
  }
};

module.exports.deleteStaffMgmt = async (id, callback) => {
  try {
    const res = await staffMgmt.findByIdAndDelete(id);
    const response = await product.find();
    if (response) {
      const setStock = response.map((item) => {
        item.stock = 0;
        return item;
      });
      for (const productItem of setStock) {
        const staffData = await staffMgmt.find({
          productName: productItem.productName,
        });
        const totalQuantity = staffData.reduce(
          (acc, entry) => acc + entry.quantity,
          0
        );
        productItem.stock = totalQuantity;
        await product.updateOne(
          { _id: productItem._id },
          { $set: { stock: totalQuantity } }
        );
      }
    }
    callback(null, res);
  } catch (err) {
    callback(err);
  }
};

module.exports.filterStaffMgmt = async (id, query, callback) => {
  try {
    const searchResults = await staffMgmt.find({
      staffId: id,
      $or: [
        { productName: { $regex: query, $options: "i" } },
        { date: { $regex: query, $options: "i" } },
      ],
    });
    if (searchResults) {
      callback(null, searchResults);
    }
  } catch (err) {
    callback(err);
  }
};
