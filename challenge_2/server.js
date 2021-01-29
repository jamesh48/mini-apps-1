const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const generateHTML = require('./generateHtml').generateHTML;
const port = 3000;
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.post('/', bodyParser.urlencoded({extended: true}), (req, res) => {
  var responseHTML = generateHTML(req);
  res.status(200).send(responseHTML);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

