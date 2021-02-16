const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const router = require('./routes.js');
const port = 3000;

app.use(cors())
app.use(express.static(__dirname + '/../client/dist'));

app.use('/', (req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
})
app.use('/', router);

app.listen(port, () => {
console.log(`Listening on port ${port}`)
})