const express = require('express');
const router = express.Router();
const pool = require('../database');
const productService = require('../services/productService');

//Get all products
router.get("/", async (req,res)=>{
    try{
        const products = await productService.getAllProducts();
        res.json(products);
    }
    catch (error){
        res.status(500).json({message: "This error is from routes product (getAllProducts) :  " + error.message})
    }
})

//GET a single product
router.get("/:id", async (req,res)=>{
   try{
        const product = await productService.getProductsById(req.params.id);
        res.json(product);
   }
   catch(error)
   {
    res.status(404).json({message: "This error is from routes product (getProductById) :  " + error.message})
   }
});

module.exports = router;