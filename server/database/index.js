const {Sequelize, DataTypes} = require('sequelize');

const db = new Sequelize(
  'options', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });

try {
  db.authenticate();
  console.log('db connection successful!');
} catch (error) {
  console.error('Unable to connect to DB', error);
}


module.exports = db;