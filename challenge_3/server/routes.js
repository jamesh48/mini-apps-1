const express = require('express');
const router = express.Router();

router.post('/form', (req, res, next) => {
  console.log('working')
  res.status(200).send('working');
})
module.exports = router;