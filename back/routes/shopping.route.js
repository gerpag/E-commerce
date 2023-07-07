const Product_cart=require("../models/Product_cart");
const Shopping_cart=require("../models/Shopping_cart");
const express=require("express");
const shoppingRouter=express.Router();
const ShoppingControllers=require("../controllers/shopping.controller");





shoppingRouter.post("/",ShoppingControllers.shoppingOrder)

module.exports=shoppingRouter;