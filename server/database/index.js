const {Sequelize, DataTypes} = require('sequelize');

const db = new Sequelize(
  'options', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
  });

const Product = db.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reviews: {
   type: DataTypes.INTEGER,
    defaultValue: 0
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})

const Stock = db.define('Stock', {
  color: {
    type: DataTypes.STRING
  },
  size: {
    type: DataTypes.STRING
  },
  qty: {
   type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

Product.hasMany(Stock);
// Stock.belongsTo(Product); need this one??

Product.sync();
Stock.sync();


try {
  db.authenticate();
  console.log('db connection successful!');
} catch (error) {
  console.error('Unable to connect to DB', error);
}

