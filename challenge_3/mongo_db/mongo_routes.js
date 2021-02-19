const express = require('express');
const router = express.Router();
const path = require('path');
const access = require(path.resolve(__dirname + "/mongo_controllers.js"))



router.post('/new', async (req, res, next) => {
  let uniqueId = await access.insert(req.body);
  uniqueId = uniqueId._id;
  res.status(200).json(uniqueId);
});

router.post('/updateAddress', async (req, res, next) => {
  try {
    await access.updateAddress(req.body);
    res.status(200).send('updated Address')
  } catch (err) {
    res.status(500).send(err);
  }
})

router.post('/updateBilling', async (req, res, next) => {
  try {
    await access.updateBilling(req.body)
    res.status(200).send(`Updated Billing`);
  } catch (err) {
    res.status(500).send(err);
  }
})

router.post('/completePurchase', async (req, res, next) => {
  const { updatingId } = req.body;
  try {
    await access.completePurchase(true, updatingId);
    res.status(200).send(`Completed Purchase`);
  } catch (err) {
    res.status(500).send(err);
  }
})

router.post('/delete', async (req, res, next) => {
  try {
    let test = await access.delete();
    if (test === true) {
      res.status(200).send(`Dropped Transactions!`);
    } else if (test === 'No Collections to Drop!') {
      res.status(200).send('No Collections to Drop!');
    } else {
      res.status(500).send('error dropping collections')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('err');
  }
})

module.exports = router;