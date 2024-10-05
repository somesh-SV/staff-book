const dao = require("../dao/invoiceDoa");

module.exports.postInvoice = (req, res) => {
  var requestData = req.body;
  dao.postInvoice(requestData, function (err, result) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res
        .status(200)
        .send({ error: false, data: result, message: "Saved Successfully" });
    }
  });
};

module.exports.getInvoiceById = (req, res) => {
  let id = req.params.id;
  dao.getInvoiceById(id, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ error: false, data: result, message: null });
    }
  });
};
