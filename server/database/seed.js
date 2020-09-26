// destructuring models into the specific tables
const {Product, Stock, Store} = require('./models.js');

(async function() {
  const newProduct = await Product.create({
    name: `Men's Standard Fit Hoodie Sweatshirt - Goodfellow & Co™`,
    price: 15.3,
    reviews: 4.75,
    reviewCount: 28
  });

  const newStore = await Store.create({
    location: 'boulder'
  });

  const newStock = await Stock.create({
    color: 'red',
    size: 'S',
    qty: 4
  });

  debugger;
  await newStock.setProduct(newProduct);
  debugger;
  await newStock.setStore(newStore);

})();

