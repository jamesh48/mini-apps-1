const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  username: String,
  password: String,
  email: String,
  addressOne: String,
  addressTwo: String,
  addressCity: String,
  addressState: String,
  addressZip: String,
  addressPhone: String,
  billingCC: String,
  billingCVV: String,
  billingZip: String,
  purchased: Boolean
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;