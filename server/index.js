const express = require('express');
const app = express();
const port = 3002;

const db = require('./database/models');
const data = require('./data/testData.js');
const path = require('path');
const { QueryTypes } = require('sequelize');
const sequelize = require('./database/index.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('newrelic');

const pool = new Pool({
  user: 'tarjay',
  database: 'tarjaydb',
  password: 'tarjaypw'
})
app.use(cors());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '../client/public/dist')))


// ------------------------------------------------------- //
// ------------- SDC ADDITIONS TO CODEBASE --------------- //
// ------------------------------------------------------- //

// to display content based on product ID in URL path e.g. localhost:3002/4
app.use('/:productId', express.static(path.join(__dirname, '../client/public/dist')))

// // helper functions
// const findProduct = async function(prodId) {
//   const productData = await db.Product.findAll({
//     where: {
//       id: prodId
//     },
//     attributes: {exclude: ['createdAt', 'updatedAt']}
//   })
//   return productData
// }

// const updateProduct = function(prodId, prodInfo) {
//   db.Product.update({
//     name: prodInfo.name,
//     price: prodInfo.price,
//     reviews: prodInfo.reviews,
//     reviewCount: prodInfo.reviewCount
//   }, {
//     where: {
//       id: prodId
//     }
//   });
// }

// const deleteProduct = function(prodId) {
//   db.Product.destroy({
//     where: {
//       id: prodId
//     }
//   });
// }


// // CREATE
app.post('/api/products', async (req, res) => {
  try {
    const addProduct = `INSERT INTO products(id, name, price, reviews, reviewcount) VALUES($1, $2, $3, $4, $5) RETURNING *`
    const maxID = await pool.query('SELECT MAX(id) FROM products')
    const newID = maxID.rows[0].max + 1;
    const values = await {
      name: req.body.name,
      price: req.body.price,
      reviews: req.body.reviews,
      reviewcount: req.body.reviewCount
    }
    const reqValues = [newID, values.name, values.price, values.reviews, values.reviewcount]
    const ins = await pool.query(addProduct, reqValues)
    console.log(ins.rows[0])
    res.end()
  } catch (e) {
    console.error(e)
  }
})

app.post('/api/stock', async (req, res) => {
  try {
    const addStock = `INSERT INTO stocks(productid, storeid, color, size, qty) VALUES($1, $2, ARRAY[$3, $4], $5, $6) RETURNING *`
    const values = await {
      productid: req.body.productid,
      storeid: req.body.storeid,
      colorname: req.body.colorname,
      colorurl: req.body.colorurl,
      size: req.body.size,
      qty: req.body.qty
    }
    const reqValues = [values.productid, values.storeid, values.colorname, values.colorurl, values.size, values.qty]
    const ins = await pool.query(addStock, reqValues)
    res.status(201).end();
  } catch (e) {
    console.error(e)
  }
})

// // READ
// app.get('/api/products/:prodId', async (req, res) => {
//   try {
//     const data = await findProduct(req.params.prodId);
//     res.status(200).send(data);
//   } catch (e) {
//     console.error(e)
//   }
// })

// // UPDATE
// app.put('/api/products/:prodId', async (req, res) => {
//   try {
//     await updateProduct(req.params.prodId, req.body)
//     res.status(201).end()
//   } catch (e) {
//     console.error(e)
//   }
// })

// // DELETE
// app.delete('/api/products/:prodId', async (req, res) => {
//   try {
//     await deleteProduct(req.params.prodId);
//     res.status(200).end();
//   } catch (e) {
//     console.error(e)
//   }
// })


// ------------------- END OF SDC ADDITIONS ---------------------- //


// getting all products data from DB
app.get('/old/products', async (req, res) => {
    try {
      const data = await db.Product.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })
      res.send(data);
    } catch (e) {
    console.error(e)
    }
})

app.get('/products', (req, res) => {
  let getAllProducts = 'SELECT products.id, products.name, products.price, products.reviews, products.reviewcount FROM products LIMIT 100';
  pool.query(getAllProducts, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results.rows)
    }
  })
})


  // getting a specific product's data from the DB
app.get('/old/products/:productId', async (req, res) => {
  const data = await db.Product.findAll({
    where: {
      id: req.params.productId
    },
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    res.send(data[0]);
  })

app.get('/products/:productId', (req, res) => {
  let getProduct = `SELECT products.id, products.name, products.price, products.reviews, products.reviewcount FROM products WHERE products.id = ${req.params.productId}`;
  pool.query(getProduct, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results.rows[0])
    }
  })
})

// get all available stock using raw SQL query with inner joins
app.get('/old/stock', async (req, res) => {
  try {

  const stocks = await sequelize.query("\
  SELECT Stocks.id, Products.name, Stores.location, Stocks.color, \
  Stocks.size, Stocks.qty, Products.id as productId \
  FROM Stocks INNER JOIN Stores ON Stores.id = Stocks.storeId \
  INNER JOIN Products ON Stocks.productId = Products.id",
  {type: QueryTypes.SELECT});

    await res.send(stocks);
  } catch (e) {
    console.log(e);
  }

  })
app.get('/stock', async (req, res) => {
  let stockQueryAll = '\
  SELECT stocks.id, products.name, stores.location, stocks.color[1], \
  stocks.size, stocks.qty, products.id as productID \
  FROM stocks INNER JOIN stores ON stores.id = stocks.storeID \
  INNER JOIN products ON stocks.productID = products.id';

  pool.query(stockQueryAll, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      res.send(results.rows)
    }
  })
})


  // get a specific product's stock using raw SQL query with inner joins
app.get('/old/stock/:productId', async (req, res) => {

  const stocks = await sequelize.query(`\
  SELECT Stocks.id, Products.name, Stores.location, Stocks.color, \
  Stocks.colorUrl, Stocks.size, Stocks.qty, Products.id as productId \
  FROM Stocks INNER JOIN Stores ON Stores.id = Stocks.storeId \
  INNER JOIN Products ON Stocks.productId = Products.id \
  WHERE Stocks.productId = ${[req.params.productId]}`,
  {type: QueryTypes.SELECT});

    await res.send(stocks);
})

app.get('/stock/:productId', async (req, res) => {
  let stockQuery = `\
  SELECT stocks.id, products.name, stores.location, stocks.color[1], \
  stocks.color[2] AS "colorUrl", stocks.size, stocks.qty, products.id as "productId" \
  FROM stocks INNER JOIN stores ON stores.id = stocks.storeid \
  INNER JOIN products ON stocks.productid = products.id \
  WHERE stocks.productid = ${[req.params.productId]}`;

  pool.query(stockQuery, (err, results) => {
    if (err) {
      console.error(err)
    } else {
      res.send(results.rows)
    }
  })
})

  // getting all Stores data from DB
app.get('/old/stores', async (req, res) => {
  const data = await db.Store.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    res.send(data);
})

app.get('/list/stores', async (req, res) => {
  let storeQuery = `SELECT * FROM stores`;
  pool.query(storeQuery, (err, results) => {
    if (err) {
      console.error(err)
    } else {
      res.send(results.rows)
    }
  })
})

  // get a store's data
app.get('/old/stores/:storeId', async (req, res) => {
  const data = await db.Store.findAll({
    where: {
      id: req.params.storeId
    },
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    res.send(data[0]);
  })
app.get('/stores/:storeId', async (req, res) => {
  let storeInfo = `SELECT * from stores WHERE stores.id = ${req.params.storeId}`;
  pool.query(storeInfo, (err, results) => {
    if (err) {
      console.error(err)
    } else {
      res.send(results.rows[0])
    }
  })
})


  // ------------------ getting stock data using sequelize methods ----------------
  // app.get('/stock', async (req, res) => {
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
    console.log(`app listening at http://localhost:${port}`)
  });
