const dao = require("../dao/staffMgmtDoa");

module.exports.postStaffMgmt = (req, res) => {
  var requestData = req.body;
  dao.postStaffMgmt(requestData, function (err, result) {
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

module.exports.getStaffMgmtById = (req, res) => {
  let id = req.params.id;
  dao.getStaffMgmtById(id, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ error: false, data: result, message: null });
    }
  });
};

module.exports.updateStaffMgmt = (req, res) => {
  let id = req.params.id;
  let requestData = req.body;
  dao.updateStaffMgmt(id, requestData, function (err, result) {
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

module.exports.updateBalance = (req, res) => {
  let id = req.params.id;
  let requestData = req.body;
  dao.updateBalance(id, requestData, function (err, result) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    } else {
      const alteredResulted = { staffId: id, balance: result.balance };
      //console.log(alteredResulted);
      res.status(200).send({
        error: false,
        data: alteredResulted,
        message: "Updated Successfully",
      });
    }
  });
};

module.exports.deleteStaffMgmt = (req, res) => {
  let id = req.params.id;
  dao.deleteStaffMgmt(id, function (err, result) {
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
module.exports.filterStaffMgmt = (req, res) => {
  const id = req.query.id;
  const query = req.query.query;
  dao.filterStaffMgmt(id, query, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send({ error: false, data: result, message: null });
    }
  });
};
