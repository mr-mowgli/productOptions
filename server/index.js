const express = require('express');
const app = express();
const port = 3000;

const db = require('./database/models');
const data = require('./data/testData.js');
const path = require('path');
const { QueryTypes } = require('sequelize');
const sequelize = require('./database/index.js');
const cors = require('cors');

app.use(cors());

app.use(express.static(path.join(__dirname, '../client/public/dist')))


// getting all products data from DB
app.get('/products', async (req, res) => {
  const data = await db.Product.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    res.send(data);
  })

  // getting a specific product's data from the DB
app.get('/products/:productId', async (req, res) => {
  debugger;
  const data = await db.Product.findAll({
    where: {
      id: req.params.productId
    },
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    res.send(data);
  })


// get all available stock using raw SQL query with inner joins
app.get('/stock', async (req, res) => {

  const stocks = await sequelize.query("SELECT stocks.id, products.name, \
  stores.location, stocks.color, stocks.size, stocks.qty, products.id as \
  productId FROM stocks INNER JOIN stores ON stores.id = stocks.storeId \
  INNER JOIN products ON stocks.productId = products.id",
  {type: QueryTypes.SELECT});

    await res.send(stocks);
  })


  // get a specific product's stock using raw SQL query with inner joins
app.get('/stock/:productId', async (req, res) => {

  const stocks = await sequelize.query(`SELECT stocks.id, products.name, \
  stores.location, stocks.color, stocks.size, stocks.qty, products.id as \
  productId FROM stocks INNER JOIN stores ON stores.id = stocks.storeId \
  INNER JOIN products ON stocks.productId = products.id \
  WHERE stocks.productId = ${[req.params.productId]}`,
  {type: QueryTypes.SELECT});

    await res.send(stocks);
  })


  // ------------------ getting stock data using sequelize methods ----------------
  // app.get('/stock', async (req, res) => {
  //   // debugger;
  //     const data = await db.Stock.findAll({
  //   attributes: {exclude: ['createdAt', 'updatedAt']},
  //   include: [{
  //     model: db.Store,
  //     attributes: {exclude: ['createdAt', 'updatedAt']},
  //     required: false,
  //   }, {
  //         model: db.Product,
  //         attributes: {exclude: ['createdAt', 'updatedAt']},
  //         require: false
  //       }]
  // })
  //     await res.send(data);
  //   })


  app.listen(port, () => {
    console.log(`app listening at http:localhost:${port}`)
  });


  // ------------------ Notes from app & service plan ------------------

  // Notes: Starting with one store for simplicity since it is tied to the users.
  // Some products may not have any options like color or size.

  // GET request for general product information on page load /product/:productID
  // Retrieves price, colors options (with a set default color), sizes and reviews:
  // {price: 13.5,  colors: [foo, bar, ...], sizes: [S, M, L, …], reviews: 4.5, reviewCount: 18 }
  // The sizes db is queried for the default set color to render the available sizes.
  // {S: 2, M: 0, L: 4, …}

  // GET request on selecting a color, to find find sizes in stock /product/:colorID
  // Retrieves sizes that are in stock for the current store. (One color is set by default)
  // {S: 2, M: 0, L: 4, …}

  // GET request on selecting size /product/:sizeID
  // shows the stock for the current store near add to cart (3 left)
  // Queries the stock table based on: product, color, size and store
  // {stock: 2}

  // ------------------------------------------------------------------