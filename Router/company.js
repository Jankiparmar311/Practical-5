const express = require("express");
const router = express.Router();
router.use(express.json());
const companyModel = require("../models/company.js");
router.get("/", (req, res) => res.send("Product Management APIs"));

// Add Company
router.post("/addCompany", (req, res) => {
    const { newCompany } = req.body;
    const addCompany = companyModel.create(newCompany);
    return res.json({ data: "Company Added Successfully" });
});

// Delete Company
router.delete("/deleteCompany/:company_id", async (req, res) => {
    const deleteCompany = await companyModel.findOneAndDelete({ company_id: req.params.company_id });
    if (deleteCompany == null) {
        return res.json({ data: "Company not Found..." });
    }
    else {
        return res.json({ data: "Company Deleted Successfully" });
    }
});

//Update Company
router.put("/updateCompany/:id", async (req, res) => {
    const c_id = req.params.id;
    const product_id = req.body.product_id;
    const updateCompany = await companyModel.findOneAndUpdate(
        { company_id: c_id },
        { product_id: product_id },
        { new: true }
    );
    if (updateCompany == null) {
        return res.json({ data: "Company not Found..." });
    }
    else {
        return res.json({ data: "Company Updated Successfully" });
    }

});


//Display Company information form product name
router.get("/product_name/:p_name", async (req, res) => {
    const product_name = req.params.p_name;
    const product_data = require("../models/product.js");
    var display_data = [];
    const product = await product_data.findOne({ title: product_name });
    try {

        const c_id = product.company_id;
        if (c_id.length > 0) {

            display_data = await company_data.find({ company_id: c_id });
        }
        else {
            display_data = "No Product name found!!";
        }
        res.json({ data: "Company Detail Based On Product Name", data1: display_data });
    }
    catch (e) {
        res.json({ data: "Company Detail Based On Product Name", data1: "No Product name found!!" });
    }
});

//Fetch All Product of Company
router.get("/fetch_product/:c_id", async (req, res) => {
    const c_id = req.params.c_id;
    const product_data = require("../models/product.js");
    var display_data = [];
    const product = await product_data.find({ company_id: c_id });
    if (product.length > 0) {
        res.json({ data: "Product Detail Based On Company Id", data1: product });
    }
    else {
        res.json({ data: "No Product Found" });

    }


});
module.exports = router;
