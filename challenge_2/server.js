const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const generateCsvReport = require('./generateCsvReport').generateCSVReport;
const port = 3000;
// app.use('/styles.css', express.static('css'))
app.use(express.static('public'));
// const stringifiedHTML = require('./dist/stringifiedhtml.js').test;

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.post('/', bodyParser.urlencoded({extended: true}), (req, res) => {
  var json = JSON.parse(req.body['csv-text-area']);
  var response = `<link rel="stylesheet" type="text/css" href="css/styles.css" />`
  response += `<div id =json-report>`
    response += generateCsvReport(json).split('\n').map((entry, index) => {
      entry = entry.split(',').map((item, index) => {
        return `<p class=item-entries>${item}</p>`
      }).join('');
      return index === 0 ? `<h4 class='entry'>${entry}</h4>` : `<div class='entry'>${entry}</div>`;
    }).join('');
  response += `</div>`
  var originalForm = req.body['original-form'];
  response += originalForm;

  res.status(200).send(response);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

