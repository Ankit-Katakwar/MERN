const datamodelss = require("../../models/server/datamodels");

let dataInsert = (req, res) => {
  let { name, email, number, message } = req.body;
  let data = new datamodelss({
    name,
    email,
    number,
    message,
  });
  data
    .save()
    .then(() => {
      res.send({ status: 1, Message: "Data saved Successfully" });
    })
    .catch((err) => {
      res.send({ status: 0, issue: err });
    });
};

let dataView = async (req, res) => {
  let view = await datamodelss.find();
  res.send({ status: 1, dataList: view });
};

let deleteData = async (req, res) => {
  let delId = req.params.id;
  let deletedData = await datamodelss.deleteOne({ _id: delId });
  res.send({ status: 1, deletedRow: deletedData });
};

let singleRow = async (req, res) => {
  let uID = req.params.id;
  let updateRow = await datamodelss.findOne({ _id: uID });
  res.send({ status: 1, updateRow });
};

let finalUpdate = async (req, res) => {
  let updateId = req.params.id;
  let { name, email, number, message } = req.body;
  let updateObj = {
    name,
    email ,
    number ,
    message, 
  };
  let updateComp = await datamodelss.updateOne({ _id: updateId }, updateObj);
  res.send({ status: 1, updateComp });
};

module.exports = { dataInsert, dataView, deleteData, singleRow, finalUpdate };
