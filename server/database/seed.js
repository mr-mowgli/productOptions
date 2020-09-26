// destructuring models into the specific tables
const {Product, Stock, Store} = require('./models.js');

// asynchronous anonymous function to populate the database
(async function() {

  /*
    to wipe and replace all data:
    1) run in Mysql terminal:
    DROP DATABASE options;create DATABASE options;USE options;set FOREIGN_KEY_CHECKS=0;
    2) run:
    node database/seed.js
  */

  var stores = ['boulder', 'denver', 'superior', 'lafayatte', 'louisville'];
  for (var s = 0; s < stores.length; s++) {
    const newStore = await Store.create({
      location: stores[s]
    });

    var products = [
    `Men's Standard Fit Hoodie Sweatshirt - Goodfellow & Co™`,
    `Hanes Men's Ultimate Cotton Sweatshirt`,
    `Hanes Men's EcoSmart Fleece Pullover Hooded Sweatshirt`
    ];

     for (var p = 0; p < products.length; p++) {
       const newProduct = await Product.create({
         name: products[p],
         price: 15.3,
         reviews: 4.75,
         reviewCount: 28
       });

       var colors = ['red', 'blue', 'green', 'black', 'white'];
       var sizes = ['S', 'M', 'L', 'XL', 'XXL'];

       // loop over colors
       for (var i = 0; i < colors.length; i++) {
         // loop over sizes
         for (var j = 0; j < sizes.length; j++) {

           // add product with random quantity
           var quantity = Math.floor(Math.random() * 5)
           const newStock = await Stock.create({
             color: colors[i],
             size: sizes[j],
             qty: quantity
           });
           // set the relationships between stock/store and stock/product
           await newStock.setStore(newStore);
           await newStock.setProduct(newProduct);
          }
       }
     }
  }

})();

