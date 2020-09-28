const express = require('express');
const app = express();
const port = 3000;

const db = require('./database');
const data = require('./data/testData.js');
const path = require('path');


app.use(express.static(path.join(__dirname, '../client/public/dist')))

// getting data from testData file
app.get('/products', (req, res) => {
  debugger;
  res.send(data);
})

// app.get('/products/:productID', (req, res) => {

// })
// app.get('/products/:productID', (req, res) => {

  // })

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