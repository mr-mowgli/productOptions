const faker = require('faker');
const fs = require('fs');

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

const reviewStat = function() {
  return Math.random() * 5
};

const reviewCount = function() {
  return Math.floor(Math.random() * 90)
};

// generate all data for DB
const generateProducts = async function(quantity) {
  var dataOut = fs.createWriteStream('data.txt');
  // create all the products and 1 - 3 stock per product
  for (var p = 1; p <= quantity; p++) {
    let curProduct = {
      id: p,
      name: faker.commerce.product(),
      price: faker.finance.amount(),
      reviews: reviewStat(),
      reviewCount: reviewCount()
    };

    let stockCount = random(3, 1);
    for (var k = 1; k <= stockCount; k++) {
      let storeindex = random(stores.length);
      let colorindex = random(colors.length);
      let sizeindex = random(sizes.length);
      let quantity = random(9, 1);
      let curStock = {
        id: k,
        Product: curProduct,
        Store: storeindex,
        color: colors[colorindex],
        size: sizes[sizeindex],
        qty:quantity
      };
      let loadRecord = JSON.stringify(curStock)
      if (!dataOut.write(loadRecord)) {
        await new Promise(resolve => dataOut.once('drain', resolve))
      }
    }
  }
  dataOut.end()
};
generateProducts(10000000);