const express = require('express');
const app = express();
const path = require('path');
const Product = require('./models/product')
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Optional, but useful
const methodOverride= require('method-override');


app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json()); // Enables JSON data parsing
app.use(methodOverride('_method')) // Enables PUT and DELETE requests


// app.get('/dog',(res,req) => {
//     req.send('dog is here');
// })

// app.get('/',(res,req) => {
//     req.send('this is home page !');
// })


// app.get('/products', async (req,res) => {
//     const products = await Product.find({})
//     console.log(products)
//     res.render('products/index');
// })

//route 1
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log(products);
        res.render('products/index', { products }); // Pass the products to the template
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
    }
});

//route 2
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        console.log(Product); // Correct variable name
        res.render('products/show', { product });
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).send("Internal Server Error");
    }
});


//route 3
app.get('/new',(req,res)=>{
    res.render('products/new')
})

//posting from form in new
app.post('/products',async(req,res) =>{
    const newProduct = new Product(req.body)
    await newProduct.save();
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`)
})

//route 4 edit
app.get('/products/:id/edit',async(req,res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{ product })
})

app.put('/products/:id', async (req,res)=>{
    const {id} = req.params; //getting the id
    const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true , new:true})
    res.redirect(`/products/${product._id}`)
})

app.listen(3000,() =>{
    console.log('Server is running on port 3000');
})

mongoose.connect('mongodb://127.0.0.1:27017/shopApp').then(()=>{
    console.log('connected to database');
}).catch((data) =>{
    console.log('error connecting to database',data);
})
