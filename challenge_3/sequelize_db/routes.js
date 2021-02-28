const express = require('express');
const router = express.Router();
const newTransaction = require('./database/models/insertion.js').newTransaction;
const updateTransaction = require('./database/models/insertion.js').updateTransaction;
const updateBilling = require('./database/models/insertion.js').updateBilling;
const completePurchase = require('./database/models/insertion.js').completePurchase;
const resetDB = require('./migrations/create_transactions_table.js');

const Config = require('./database/config.js').sequelize;


router.post('/form', (req, res, next) => {
  res.status(200).send('working');
});

router.post('/new', async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  let test = await newTransaction(username, email, password);
  console.log(test);
  res.status(200).json(test)
})

router.post('/updateAddress', async (req, res, next) => {
  const { addressOne, addressTwo, addressCity, addressState, addressZip, addressPhone, updatingId } = req.body;
  // console.log(updatingId);
  await updateTransaction(addressOne, addressTwo, addressCity, addressState, addressZip, addressPhone, updatingId
  );
  res.status(200).send('ok');
});

router.post('/updateBilling', async (req, res, next) => {
  const { billingCC, billingCVV, billingZip, updatingId } = req.body;
  await updateBilling(billingCC, billingCVV, billingZip, updatingId);
  res.status(200).send('ok');
});

router.post('/completePurchase', async (req, res, next) => {
  const { purchased, updatingId } = req.body;
  var completed = await completePurchase(purchased);
  res.status(200).send('ok');
})

router.post('/delete', async (req, res, next) => {
  await resetDB.down();
  res.status(200).send('ok');
})

module.exports = router;