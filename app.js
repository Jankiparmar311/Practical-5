require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOURL)
.then(()=> console.log("MongoDB Connected"));

app.get("/",(req,res) => res.send("Hello Janki"));
app.listen(port, () => console.log(`server running on port 5000`));

const Product_router=require("./Router/product.js");
app.use("/product",Product_router);

const Seller_router=require("./Router/seller.js");
app.use("/Seller",Seller_router);

const Company_router=require("./Router/company.js");
app.use("/Company",Company_router);