const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        lowercase:true,
        enum:['fruit','dairy','veggies']
    }
})

// now need to compile the model

const Product = mongoose.model('Product', productSchema);

// now export it from here
module.exports = Product;