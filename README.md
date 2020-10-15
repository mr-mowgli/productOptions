# Product Options CRUD API

## Create New
POST`/api/products`

Request Parameters (JSON)
_all required_
`name` : string
`price` : float
`reviews`: float
`reviewCount`: integer

## Read Existing
GET`/api/products/<product ID>`

Data will be returned in the following format:

```json
[
  {
    "id":INTEGER,
    "name":STRING,
    "price":FLOAT,
    "reviews":FLOAT,
    "reviewCount":INTEGER
  }
]
```
## Update
PUT`/api/products/<product ID>`
_all required_
Request parameters (JSON)
`name` : string
`price` : float
`reviews`: float
`reviewCount`: integer

## Delete
DELETE`/api/products/<product ID>`



# Product Options Dev Setup

 Module to select quantity, color or size before adding an item to the registry.

#### Demo: (http://g.recordit.co/bhIaDImKTE.gif)

------

### Installation

#### Server:

Go into server folder

run  `npm install` to install dependencies

Make sure to have MySQL installed then run `MySQL` then run the following in a MySQL terminal:

`CREATE DATABASE options;USE options;`

run `npm run seed`

if getting any errors: 


`USE options;SET FOREIGN_KEY_CHECKS = 0;TRUNCATE TABLE Stocks;TRUNCATE TABLE Products;TRUNCATE TABLE Stores;`

run `npm run seed` again


#### Client:

Go into client folder

run  `npm install` to install dependencies
run `npm run build` to build the webpack

You should be all set!
