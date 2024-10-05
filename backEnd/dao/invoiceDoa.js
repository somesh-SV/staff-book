const invoice = require("../Model/invoice");

module.exports.postInvoice = async (requestData, callback) => {
  try {
    let data = new invoice(requestData);
    let response = await data.save();
    callback(null, response);
  } catch (err) {
    callback(err);
  }
};

module.exports.getInvoiceById = async (id, callback) => {
  try {
    const response = await invoice
      .find({ _id: id })
      .populate({ path: "customerId", model: "Customer" });
    if (response) {
      callback(null, response);
    }
  } catch (err) {
    callback(err);
  }
};
