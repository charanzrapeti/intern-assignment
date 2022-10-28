const express = require("express");
const Product = require("../database/models/product");

const router  = new express.Router();


router.get("/product", async (req,res) => {
    try{
        const products = await Product.find({})
        res.send(products)
    }
    catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
})

router.get("/product/:id", async (req,res) => {
    const _id = req.params.id;
    try {
        const product = await Product.findOne({_id});
        if(!product) {
            return res.status(404).send({"message":"product not found"});
        }
        res.render('update',{
            product:product

        })
    }
    catch(e) {
         res.status(500).send({e});
    }
})

router.get("/product/delete/:id", async (req,res) => {
    const _id = req.params.id;
    try {
        const product = await Product.findOne({_id});
        if(!product) {
            return res.status(404).send({"message":"product not found"});
        }
        res.render('remove',{
            product:product

        })
    }
    catch(e) {
         res.status(500).send({e});
    }
})

router.post("/product", async (req,res) => {
    const product = req.body;
    const new_product = new Product(product);
    try {
        await new_product.save();
        // res.status(201).send({new_product})
        res.redirect("/");
    }
    catch(e) {
        res.status(400).send(e);
    }
})

router.patch("/product/:id", async (req,res) => {
    const _id = req.params.id;
    const updates_given = Object.keys(req.body);
    const allowed_updates = ["name","description","price","category"];
    const isValid = updates_given.every((update) => allowed_updates.includes(update));

    if(!isValid) {
        return res.status(400).send({error:"invalid updates"});
    }

    try {
        const product = await Product.findOne({_id})
        if(!product) {
            return res.status(404).send({"message":"product not found"});
        }

        updates_given.forEach((update) => {
            product[update] = req.body[update];
        })

        await product.save();
        res.send(product)
    }
    
    catch(e) {
        res.status(500).send(e);
    }
})

router.delete("/product/:id", async (req,res) => {
    try {
        const _id = req.params.id;
        const product = await Product.findOneAndDelete({_id});

        if(!product){
            return res.status(404).send({"message":"product not found"});

        }
        res.send(product);
        
    }
    catch (e) {
        res.status(500).send();
    }
})




module.exports = router;