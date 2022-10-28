const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxLength:100,
        minLength:10,
    },
    price: {
        type:Number,
        required:true,
        trim:true
    },
    imageurl:{
        type:String,
        required:true,
        trim:true,
    },
    created_at: {
        type:Date,
    }, 
    category:{
        type:String,
        
    }
})

const Product = mongoose.model('Product',productSchema)
module.exports = Product;

