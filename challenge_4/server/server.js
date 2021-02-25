const express = require('express');
const app = express();
const router = require('./routes.js');

app.use(express.static(__dirname + '/../client/dist'))

app.use(express.json())
app.use('/', router);

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})