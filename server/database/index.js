const {Sequelize, DataTypes} = require('sequelize');

const db = new Sequelize(
  'options', 'user', 'password', {
    host: 'localhost',
    // can try port number
    // port: 3306,
    dialect: 'mysql'
  });

try {
  db.authenticate();
  console.log('db connection successful!');
} catch (error) {
  console.error('Unable to connect to DB', error);
}


module.exports = db;