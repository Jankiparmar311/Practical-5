const express = require("express");
const router = express.Router();
router.use(express.json());
const productModel = require("../models/product.js");
router.get("/", (req, res) => res.send("Product Management APIs"));

//add Product
router.post("/addProduct", (req, res) => {
    const { newProduct } = req.body;
    const addProduct = productModel.create(newProduct);
    return res.json({ data: "Product added Successfully" });
});

//delete Product
router.delete("/deleteProduct/:product_id", async (req, res) => {
    const deleteProduct = await productModel.findOneAndDelete({ product_id: req.params.product_id });
    if (deleteProduct == null) {
        return res.json({ data: "Product Not Found" });
    }
    else {
        return res.json({ data: "Product deleted Successfully" });
    }
});

//Update Product
router.put("/updateProduct/:product_id", async (req, res) => {
    const p_id = req.params.product_id;
    const company_id = req.body.company_id;
    const updateProduct = await productModel.findOneAndUpdate(
        { product_id: p_id },
        { company_id: company_id },
        { new: true }
    );
    return res.json({ data: "Product Update Successfully" });
});

module.exports = router;