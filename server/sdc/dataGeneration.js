const faker = require('faker');
const {Product, Stock, Store} = require('./models.js');

// 5 store locations
const stores = ['boulder', 'longmont', 'superior', 'westminister', 'aurora'];

// 6 color choices and their image links
const colors = [
  ['White', 'https://imgur.com/xvJ98fe.png'],
  ['Blue', 'https://imgur.com/zReIoca.png'],
  ['Green', 'https://imgur.com/SRGlFjx.png'],
  ['Peach', 'https://imgur.com/6dpqKHe.png'],
  ['Red', 'https://imgur.com/y81ZoDc.png'],
  ['Gold', 'https://imgur.com/L7cseNz.png']
];

// 6 possible clothing sizes
const sizes = ['S', 'M', 'L', 'XL', 'XXL', '2XL'];

// helper function to generate random integers in script
const random = function(max, min) {
  min = min === undefined ? 0 : min;
  return Math.floor(Math.random() * (max - min) + min)
};

// generate all data for DB
let generateProducts = function(quantity) {
  // first create the 5 store locations with ids 1 through 5
  for (var s = 1; s <= stores.length; s++) {
    let curStore = {
      id: s,
      location: stores[s]
    }
    Store.create(curStore)
  }
  // create all the products and 1 - 3 stock per product
  for (var p = 1; p <= quantity; p++) {
    let curProduct = {
      id: p,
      name: faker.commerce.product(),
      price: faker.finance.amount(),
      reviews: faker.something(),
      reviewCount: faker.something()
    };

    Product.create(curProduct);

    let stockCount = random(3, 1);
    for (var k = 0; k <= stockCount; k++) {
      let storeid = random(stores.length, 1);
      let colorindex = random(colors.length);
      let sizeindex = random(sizes.length);
      let quantity = random(9, 1);
      let curStock = {
        id: k,
        ProductId: p,
        StoreId: storeid,
        color: colors[colorindex],
        size: sizes[sizeindex],
        qty:quantity
      };
      Stock.create(curStock)
    }

  }
}