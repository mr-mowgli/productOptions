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

app.use(cors());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '../client/public/dist')))


// ------------------------------------------------------- //
// ------------- SDC ADDITIONS TO CODEBASE --------------- //
// ------------------------------------------------------- //

// to display content based on product ID in URL path e.g. localhost:3002/4
app.use('/:productId', express.static(path.join(__dirname, '../client/public/dist')))

// helper functions
const findProduct = async function(prodId) {
  const productData = await db.Product.findAll({
    where: {
      id: prodId
    },
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
  return productData
}

const updateProduct = function(prodId, prodInfo) {
  db.Product.update({
    name: prodInfo.name,
    price: prodInfo.price,
    reviews: prodInfo.reviews,
    reviewCount: prodInfo.reviewCount
  }, {
    where: {
      id: prodId
    }
  });
}

const deleteProduct = function(prodId) {
  db.Product.destroy({
    where: {
      id: prodId
    }
  });
}


// CREATE
app.post('/api/products', async (req, res) => {
  try {
    await db.Product.create({
      name: req.body.name,
      price: req.body.price,
      reviews: req.body.reviews,
      reviewCount: req.body.reviewCount
    });
    res.status(201).end()
  } catch (e) {
    console.error(e)
  }
})

app.post('/api/stock', async (req, res) => {
  try {
    await db.Stock.create({
      color: req.body.color,
      colorUrl: req.body.colorUrl,
      size: req.body.size,
      qty: req.body.qty,
      ProductId: req.body.ProductId,
      StoreId: req.body.StoreId
    });
    res.status(201).end();
  } catch (e) {
    console.error(e)
  }
})

// READ
app.get('/api/products/:prodId', async (req, res) => {
  try {
    const data = await findProduct(req.params.prodId);
    res.status(200).send(data);
  } catch (e) {
    console.error(e)
  }
})

// UPDATE
app.put('/api/products/:prodId', async (req, res) => {
  try {
    await updateProduct(req.params.prodId, req.body)
    res.status(201).end()
  } catch (e) {
    console.error(e)
  }
})

// DELETE
app.delete('/api/products/:prodId', async (req, res) => {
  try {
    await deleteProduct(req.params.prodId);
    res.status(200).end();
  } catch (e) {
    console.error(e)
  }
})


// ------------------- END OF SDC ADDITIONS ---------------------- //


// getting all products data from DB
app.get('/products', async (req, res) => {
    try {
      const data = await db.Product.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })
      res.send(data);
    } catch (e) {
    console.error(e)
    }
})


  // getting a specific product's data from the DB
app.get('/products/:productId', async (req, res) => {
  const data = await db.Product.findAll({
    where: {
      id: req.params.productId
    },
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    res.send(data[0]);
  })


// get all available stock using raw SQL query with inner joins
app.get('/stock', async (req, res) => {
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


  // get a specific product's stock using raw SQL query with inner joins
app.get('/stock/:productId', async (req, res) => {

  const stocks = await sequelize.query(`\
  SELECT Stocks.id, Products.name, Stores.location, Stocks.color, \
  Stocks.colorUrl, Stocks.size, Stocks.qty, Products.id as productId \
  FROM Stocks INNER JOIN Stores ON Stores.id = Stocks.storeId \
  INNER JOIN Products ON Stocks.productId = Products.id \
  WHERE Stocks.productId = ${[req.params.productId]}`,
  {type: QueryTypes.SELECT});

    await res.send(stocks);
  })

  // getting all Stores data from DB
app.get('/stores', async (req, res) => {
  const data = await db.Store.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    res.send(data);
  })

  // get a store's data
app.get('/stores/:storeId', async (req, res) => {
  const data = await db.Store.findAll({
    where: {
      id: req.params.storeId
    },
    attributes: {exclude: ['createdAt', 'updatedAt']}
  })
    res.send(data[0]);
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
