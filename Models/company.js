const mongoose = require("mongoose");
//mongoose.pluralize(null);

//companySchema
const companySchema = mongoose.Schema({
    company_id : String,
    name : String,
    product_ids : Array
});

const companyModel = mongoose.model("company", companySchema,"company");

module.exports = companyModel;
