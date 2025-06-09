let express = require("express");
let app = express();
const mongoose = require("mongoose");
const dataRoutes = require("./App/routes/web/structuredRoutes");

require("dotenv").config();
app.use(express.json());
app.use("/api", dataRoutes);

mongoose.connect(process.env.DBURL).then(() => console.log("Connected!"));
app.listen(process.env.PORT, () => {
  console.log("Chalu ho gya");
});
