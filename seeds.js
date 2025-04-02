const Product = require('./models/product')
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopApp').then(()=>{
    console.log('connected to database');
}).catch((data) =>{
    console.log('error connecting to database',data);
})


// const p = new Product ({
//     name: 'apple',
//     price: 23,
//     category:'fruit'
// })
// p.save().then((p) =>{
//     console.log('product created',p);
// }).catch((e)=>{
//     console.log('error creating product',e);
// })

const samples = [
    { name: 'Carrot', price: 15, category: 'veggies' },
    { name: 'Broccoli', price: 30, category: 'veggies' },
    { name: 'Milk', price: 50, category: 'dairy' },
    { name: 'Cheese', price: 120, category: 'dairy' },
    { name: 'Spinach', price: 25, category: 'veggies' },
    { name: 'Yogurt', price: 40, category: 'dairy' }
];

 Product.insertMany(samples).then((data)=>{
     console.log('products inserted',data);
 }).catch((err)=>{
     console.log('error inserting products',err);
})