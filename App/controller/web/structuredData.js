const dmodel = require("../../model");

let dataInsert = (req, res) => {
  let { myname, myemail, mygender, mynumber, mymessage } = req.body;
  let data = new dmodel({
    name: myname,
    number: mynumber,
    email: myemail,
    gender: mygender,
    message: mymessage,
  });
  data
    .save()
    .then(() => {
      res.send({ Status: 1, Message: "Data Saved Successfully" });
    })
    .catch((err) => {
      res.send({ Status: 0, Message: "Error in Data Saving ", err });
    });
};

let dataView = async (req, res) => {
  let dataList = await dmodel.find();
  res
    .status(200)
    .json({ status: 1, Message: "Data Fetched Successfully", Data: dataList });
};

let dataDelete = async (req, res) => {
  let nID = req.params.id;

  let deleteData = await dmodel.deleteOne({ _id: nID });
  let responseObj = {
    status: 1,
    msg: "Data deleted",
    deleteData,
  };

  res.send(responseObj);
};

let dataUpdate = async (req, res) => {
  let nID = req.params.id;
  let { myname, myemail, mygender, mynumber, mymessage } = req.body;
  let obje = {
    name: myname,
    email: myemail,
    gender: mygender,
    number: mynumber,
    message: mymessage,
  };
  let updatedId = await dmodel.updateOne({ _id: nID }, obje);

  res.send({ status: 1, message: "Data Updated Successfully", updatedId });
};
module.exports = { dataInsert, dataView, dataDelete, dataUpdate };
