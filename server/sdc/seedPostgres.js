const { Client } = require('pg');
const client = new Client();

(async () => {
  await client.connect()

  const res = await client.query('SELECT $1::text as message', ['Hello there!'])
  console.log(res.rows[0].message)
  await client.end()
})

// PSQL CREATE TABLES
  // STORES
CREATE TABLE stores (id integer PRIMARY KEY NOT NULL, location text);
  //PRODUCTS
CREATE TABLE products (id integer PRIMARY KEY NOT NULL, name text NOT NULL, price decimal, reviews decimal, reviewCount integer);
  // STOCKS
CREATE TABLE stocks (id bigserial PRIMARY KEY NOT NULL, productID integer REFERENCES products (id), storeID integer REFERENCES stores (id), color text[], size text, qty integer);