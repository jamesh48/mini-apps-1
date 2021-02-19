const path = require('path');
const db = require(path.resolve(__dirname + '/mongo_db.js'));
const Transaction = require(path.resolve(__dirname + '/models.js'));
const mongoose = require('mongoose');
mongoose.set(`useFindAndModify`, false);

const connection = mongoose.connection;

const access = {
  insert: async (userInfo) => {
    const { username, password, email } = userInfo;
    const test = await new Transaction({ username: username, password: password, email: email })
    test.save();
    return test;
  },
  updateAddress: async (userInfo) => {
    const { addressOne, addressTwo, addressCity, addressState, addressZip, addressPhone, updatingId } = userInfo;
    try {
      const enteredAddress = await Transaction.findOneAndUpdate({ _id: updatingId }, { addressOne: addressOne, addressTwo: addressTwo, addressCity: addressCity, addressState: addressState, addressZip: addressZip, addressPhone: addressPhone }, { new: true })
      return 'ok';
    } catch (err) {
      return err;
    }
  },

  updateBilling: async (paymentInfo) => {
    const { billingCC, billingCVV, billingZip, updatingId } = paymentInfo;
    try {
      const enteredPayment = await Transaction.findOneAndUpdate({
        _id: updatingId
      }, {
        billingCC: billingCC,
        billingCVV: billingCVV,
        billingZip: billingZip
      }, { new: true });
      return `ok`;
    } catch (err) {
      return err;
    }
  },

  completePurchase: async (purchased, updatingId) => {
    try {
      const result = await Transaction.findOneAndUpdate({ _id: updatingId }, { purchased: true }, { new: true });
      console.log(result);
      return `ok`;
    } catch(err) {
      return err;
    }
  },

  delete: async (cb) => {
    const test = await Transaction.find({});
    if (test.length !== 0) {
      let result = await connection.dropCollection('transactions');
      return result;
    } else {
      return 'No Collections to Drop!';
    }
  }
}

module.exports = access;