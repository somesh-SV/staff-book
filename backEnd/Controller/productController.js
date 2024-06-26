const dao = require("../dao/productDoa");

module.exports.postProduct = (req, res) => {
  var requestData = req.body;
  dao.postProduct(requestData, function (err, result) {
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

module.exports.getProduct = (req, res) => {
  dao.getProduct(function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ error: false, data: result, message: null });
    }
  });
};

module.exports.getProductById = (req, res) => {
  let id = req.params.id;
  dao.getProductById(id, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ error: false, data: result, message: null });
    }
  });
};

module.exports.updateProduct = (req, res) => {
  let id = req.params.id;
  let requestData = req.body;
  dao.updateProduct(id, requestData, function (err, result) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res
        .status(200)
        .send({ error: false, data: result, message: "Updated Successfully" });
    }
  });
};

module.exports.deleteProduct = (req, res) => {
  let id = req.params.id;
  dao.deleteProduct(id, function (err, result) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res
        .status(200)
        .send({ error: false, data: result, message: "Deleted Successfully" });
    }
  });
};

module.exports.filterProduct = (req, res) => {
  const query = req.query.query;
  dao.filterProduct(query, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ error: false, data: result, message: null });
    }
  });
};

module.exports.clearProduct = (req, res) => {
  let requestData = req.body;
  dao.clearProduct(requestData, function (err, result) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      res.status(200).send({ error: false, data: result, message: null });
    }
  });
};
