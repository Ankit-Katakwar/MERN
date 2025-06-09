let express = require("express");
let { dataInsert, dataView, dataDelete, dataUpdate } = require("../../controller/web/structuredData");

let dataRoutes = express.Router();


dataRoutes.post("/data-insert", dataInsert);
dataRoutes.get("/data-view", dataView);
dataRoutes.delete("/data-delete/:id", dataDelete);
dataRoutes.put("/data-update/:id", dataUpdate);

module.exports=dataRoutes ;
