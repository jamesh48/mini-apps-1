const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const generateCsvReport = require('./generateCsvReport').generateCSVReport;
const port = 3000;
// const stringifiedHTML = require('./dist/stringifiedhtml.js').test;

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.post('/', bodyParser.urlencoded({extended: true}), (req, res) => {
  var json = JSON.parse(req.body['csv-text-area']);
  var response = generateCsvReport(json);
  response = response.split('\n').map((entry, index) => {
    return index === 0 ? `<h4>${entry}</h4>` : `<p>${entry}</p>`;
  }).join('');
  response += (req.body['stringifiedHTML']);
  res.status(200).send(response);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

