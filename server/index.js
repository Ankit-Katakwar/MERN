let express = require("express");
let app = express();
let mongoose = require("mongoose");
const serverRouter = require("./App/router/server/router");
app.use(express.json());
require("dotenv").config();
var cors = require('cors')

app.use(cors())
app.use(express.json())
app.use("/server/api/data",serverRouter)

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected to Mongo Server");
    app.listen(process.env.PORTT || 8000, () => {
      console.log("Server is running on port", process.env.PORTT);
    });
  })
  .catch((err) => {
    console.log("Error connection to the serverr", err);
  });
