const dao = require("../dao/staffDoa");

module.exports.postStaff = (req, res) => {
  var requestData = req.body;
  dao.postStaff(requestData, function (err, result) {
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

module.exports.getStaff = (req, res) => {
  dao.getStaff(function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ error: false, data: result, message: null });
    }
  });
};

module.exports.getStaffById = (req, res) => {
  let id = req.params.id;
  dao.getStaffById(id, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ error: false, data: result, message: null });
    }
  });
};

module.exports.updateStaff = (req, res) => {
  let id = req.params.id;
  let requestData = req.body;
  dao.updateStaff(id, requestData, function (err, result) {
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

module.exports.deleteStaff = (req, res) => {
  let id = req.params.id;
  dao.deleteStaff(id, function (err, result) {
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

module.exports.filterStaff = (req, res) => {
  const query = req.query.query;
  dao.filterStaff(query, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ error: false, data: result, message: null });
    }
  });
};
