const Sequelize = require('sequelize');

const sequelize = new Sequelize('transactions', "root", process.env.USERPASS, {
  host: process.env.HOST,
  dialect: "mysql",
  // operatorsAliases: false
});



module.exports = sequelize;
