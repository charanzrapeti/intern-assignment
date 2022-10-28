const path = require("path")
require('dotenv').config()
require('../database/DBconnect')
const productRouter = require("../router/productRouter")
const Product = require("../database/models/product");
const express = require('express')
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const directoryPath = path.join(__dirname, '../public')

const app = express();
app.use(express.static(directoryPath))
app.set('view engine','hbs')
app.set('views','./src/templates/views')
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(productRouter)

app.get('', async (req,res) => {
    try{
        const products = await Product.find({})
        res.render('index',{
            products:products,
        })
    }
    catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
})


app.get("/postPage",(req,res) => {
    try {
        res.render('post');
    }
    catch(e) {
        console.log(e);
    }
})

app.get("/removePage",(req,res) => {
    try {
        res.render('remove')
    }
    catch(e) {
        console.log(e);
    }
})

app.get('*',(req,res) => {
    res.render('404')
})


app.listen(port,() => {
    console.log(`server listening on port ${port}`)
})