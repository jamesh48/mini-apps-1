const express = require('express');
const router = express.Router();
const util = require("util")
const { promisify } = require('util');
const connection = require('mysql2')
const access = require('./controllers/index.js');


router.post('/new', (req, res, next) => {
  const userInfo = req.body;
  access.insert(req.body, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const id = results;
      res.status(200).json(results);
    }
  });
});

router.post('/updateAddress', (req, res, next) => {
  access.updateTransaction(req.body, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(results);
      res.status(200).json(results);
    }
  });
});

router.post('/updateBilling', (req, res, next) => {
  access.updatePayment(req.body, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(results);
      res.status(200).json(results)
    }
  })
})

router.post('/completePurchase', (req, res, next) => {

  access.finalizePurchase(req.body, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      res.status(200).json(results);
    }
  })
})

router.post('/delete', (req, res, next) => {
  access.delete((err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(results)
      res.status(200).send(results);
    }
  })
})

router.get('/', () => {
  console.log('working')
})

module.exports = router;



