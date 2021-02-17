const express = require('express');
const router = express.Router();
const newTransaction = require('../database/models/insertion.js').newTransaction;
const updateTransaction = require('../database/models/insertion.js').updateTransaction;
const updateBilling = require('../database/models/insertion.js').updateBilling;
const completePurchase = require('../database/models/insertion.js').completePurchase;

const Config = require('../database/config.js').sequelize;


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
  await updateTransaction(addressOne, addressTwo, addressCity, addressState, addressZip, addressPhone, updatingId
  );
});

router.post('/updateBilling', async (req, res, next) => {
  const { billingCC, billingCVV, billingZip, updatingId } = req.body;
  await updateBilling(billingCC, billingCVV, billingZip, updatingId);
});

router.post('/completePurchase', async (req, res, next) => {
  const { purchased, updatingId } = req.body;
  var completed = await completePurchase(purchased);
})

module.exports = router;