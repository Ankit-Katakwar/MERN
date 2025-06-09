let express = require("express");
const {
  dataInsert,
  dataView,
  deleteData,
  singleRow,
  finalUpdate,
} = require("../../controller/server/controlled");
let serverRouter = express.Router();

serverRouter.post("/data-insert", dataInsert);

serverRouter.get("/data-view", dataView);

serverRouter.delete("/data-delete/:id", deleteData);

serverRouter.get("/data-row/:id", singleRow);

serverRouter.put("/data-update/:id", finalUpdate);


module.exports = serverRouter;
