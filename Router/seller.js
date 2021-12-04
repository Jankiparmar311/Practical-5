const express = require("express");
const router = express.Router();
router.use(express.json());
const sellerModel= require("../models/seller.js");
router.get("/", (req, res) => res.send("Product Management APIs"));

//add Seller
router.post("/addSeller", (req, res) => {
    const { newSeller } = req.body;
    const addSeller = seller_data.create(newSeller);
    return res.json({ data: "Seller Added Successfully" });
});

//Delete Seller
router.delete("/deleteSeller/:seller_id", async (req, res) => {
    const deleteSeller = await seller_data.findOneAndDelete({ seller_id: req.params.seller_id });
    if (deleteSeller == null) {
        return res.json({ data: "Seller not Found..." });
    }
    else {
        return res.json({ data: "Seller Deleted Successfully" });
    }
});

//Update Seller
router.put("/UpdateSeller/:seller_id", async (req, res) => {
    const s_id = req.params.seller_id;
    const product_id = req.body.product_id;
    const updateSeller = await seller_data.findOneAndUpdate(
        { seller_id: s_id },
        { Product_id: product_id },
        { new: true }
    );
    if (updateSeller == null) {
        return res.json({ data: "Seller not Found..." });
    }
    else {
        return res.json({ data: "Seller Products updated successfully", data2: updateSeller });
    }
});

//Display Seller information form product name
router.get("/product_name/:title", async (req, res) => {
    const title = req.params.title;
    const productModel = require("../models/product.js");
    var display_data = [];
    const product = await productModel.findOne({ title: title });
    try {
        const seller_id = product.seller_id;
        if (seller_id.length > 0) {

            display_data = await sellerModel.findOne({ seller_id: seller_id });
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

//Fetch All Product of Seller
router.get("/fetch_product/:seller_id", async (req, res) => {
    const s_id = req.params.seller_id;
    const productModel = require("../models/product.js");
    const product = await productModel.find({ seller_id: s_id });
    if (product.length > 0) {
        res.json({ data: "Product Detail Based On Seller Id", data1: product });
    }
    else {
        res.json({ data: "No Seller Found" });

    }
});
module.exports = router;