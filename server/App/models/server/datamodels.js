let mongoose = require("mongoose");
let ServerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    number:{
        type:String,
        required: false
    },
    message: {
        type: String,
        default: "No message"
    }
})
let datamodelss = module.exports = mongoose.model("ServerSite", ServerSchema);
module.exports = datamodelss;
