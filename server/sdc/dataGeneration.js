const faker = require('faker');
const fs = require('fs');

// 5 store locations
const stores = ['boulder', 'longmont', 'superior', 'westminister', 'aurora'];
const storeID = [900000001,900000002,900000003,900000004,900000005];

// 6 color choices and their image links
const colors = [
  ['{White', 'https://imgur.com/xvJ98fe.png}'],
  ['{Blue', 'https://imgur.com/zReIoca.png}'],
  ['{Green', 'https://imgur.com/SRGlFjx.png}'],
  ['{Peach', 'https://imgur.com/6dpqKHe.png}'],
  ['{Red', 'https://imgur.com/y81ZoDc.png}'],
  ['{Gold', 'https://imgur.com/L7cseNz.png}']
];

const colorsAlt = [
  ['{White', 'https://qtlyimages.s3-us-west-2.amazonaws.com/white_xvJ98fe.jpeg}'],
  ['{Blue', 'https://qtlyimages.s3-us-west-2.amazonaws.com/blue_zReIoca.jpeg}'],
  ['{Green', 'https://qtlyimages.s3-us-west-2.amazonaws.com/green_SRGlFjx.jpeg}'],
  ['{Peach', 'https://qtlyimages.s3-us-west-2.amazonaws.com/peach_6dpqKHe.jpeg}'],
  ['{Red', 'https://qtlyimages.s3-us-west-2.amazonaws.com/red_y81ZoDc.jpeg}'],
  ['{Gold', 'https://qtlyimages.s3-us-west-2.amazonaws.com/gold_L7cseNz.jpeg}']
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

// const generateStores = function() {

// };

// generate all data for DB
const generateProducts = async function(quantity) {
  var productFile = fs.createWriteStream('products.csv');
  var stockFile = fs.createWriteStream('stocks.csv');
  productFile.write('id|name|price|reviews|reviewCount\n');
  stockFile.write('productID|storeID|color|size|qty\n');
  // create all the products and 1 - 3 stock per product
  for (var p = 1; p <= quantity; p++) {
    let curProduct = `${p}|${faker.commerce.product()}|${faker.finance.amount()}|${reviewStat()}|${reviewCount()}\n`;
    if (!productFile.write(curProduct)) {
      await new Promise(resolve => productFile.once('drain', resolve))
    }

    let stockCount = random(3, 1);
    let si = quantity * 10;
    for (var k = 1; k <= stockCount; k++) {
      let storeid = random(storeID.length);
      let colorindex = random(colors.length);
      let sizeindex = random(sizes.length);
      let quantity = random(9, 1);
      let curStock = `${p}|${storeID[storeid]}|${colors[colorindex]}|${sizes[sizeindex]}|${quantity}\n`;
      if (!stockFile.write(curStock)) {
        await new Promise(resolve => stockFile.once('drain', resolve))
      }
    }
  }
  productFile.end();
  stockFile.end();
};
generateProducts(10000000);
