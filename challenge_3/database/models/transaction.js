const sequelize = require('../config.js');

var Transactions = sequelize.define("Transaction", {
  id: {
    type: 'INTEGER',
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: 'STRING',
    allowNull: false,
    unique: true
  },
  email: {
    type: 'STRING',
    allowNull: false,
    unique: true
  },
  password: {
    type: 'STRING',
    allowNull: false
  },
  addressOne: {
    type: 'STRING',
    allowNull: true
  },
  addressTwo: {
    type: 'STRING',
    allowNull: true
  },
  addressCity: {
    type: 'STRING',
    allowNull: true
  },
  addressState: {
    type: 'STRING',
    allowNull: true
  },
  addressZip: {
    type: 'STRING',
    allowNull: true
  },
  addressPhone: {
    type: 'STRING',
    allowNull: true
  },
  billingCC: {
    type: 'STRING',
    allowNull: true
  },
  billingCVV: {
    type: 'STRING',
    allowNull: true
  },
  billingZip: {
    type: 'STRING',
    allowNull: true
  },
  purchased: {
    type: 'BOOLEAN',
    allowNull: true,
    default: false
  }
});

module.exports = Transactions;
