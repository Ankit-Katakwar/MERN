let mongoose = require("mongoose");
let dataschema = mongoose.Schema({
  name: { type: String, require: true },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  gender: { type: String, require: true },
  number: { type: String, require: true },
  message: { type: String, require: true },
});
let dmodel = mongoose.model("collection1", dataschema);
module.exports = dmodel
