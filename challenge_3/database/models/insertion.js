const newTransaction = async (username, email, password) => {
  const Transaction = require('./transaction');
  const transaction = await Transaction.create({
    username: username,
    email: email,
    password: password
  })
  console.log(transaction)
  return transaction.dataValues;
}

const updateTransaction = async (...args) => {
  const Transaction = require('./transaction');
  const transaction = await Transaction.findOne({ where: { id: args[6] } })
    .then((result) => {
      result.update({
        addressOne: args[0],
        addressTwo: args[1],
        addressCity: args[2],
        addressState: args[3],
        addressZip: args[4],
        addressPhone: args[5]
      })
        .then((results) => {
          console.log(results);
        })
        .catch((err) => {
          console.log(err);
        })

    })
    .catch((err) => {
      console.log(err);
    })
}

const updateBilling = async (billingCC, billingCVV, billingZip, updatingId) => {
  const Transaction = require('./transaction');
  const transaction = await Transaction.findOne({ where: { id: updatingId } })
    .then((result) => {
      result.update({
        billingCC: billingCC,
        billingCVV: billingCVV,
        billingZip: billingZip
      })
        .then((results) => {
          console.log(results);
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => {
      console.log(err);
    })
}

const completePurchase = async (purchased) => {
  const Transaction = require('./transaction');
  const transaction = Transaction.findOne({ where: { id: 1 } })
  .then((result) => {
    result.update({
      purchased: purchased
    })
    .then((results) => {
      console.log(results);
    })
    .catch((err) => {
      console.log(err);
    })
  })
}

module.exports.newTransaction = newTransaction;
module.exports.updateTransaction = updateTransaction;
module.exports.updateBilling = updateBilling;
module.exports.completePurchase = completePurchase;