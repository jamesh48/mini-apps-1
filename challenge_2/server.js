const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const generateCsvReport = require('./generateCsvReport').generateCSVReport;

const port = 3000;

// app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.post('/', bodyParser.urlencoded({extended: true}), (req, res) => {
  var json = JSON.parse(req.body['csv-text-area']);
  var response = generateCsvReport(json);
  response = response.split('\n').map((entry, index) => {
    return index === 0 ? `<h4>${entry}</h4>` : `<p>${entry}</p>`;
  }).join('');

  response += (
`<form method='POST' action ='http://localhost:3000'; id='submit-form'>
  <textarea id ="csv-text-area" name='csv-text-area'></textarea>
  <button type='submit'>Submit JSON</button>
</form>`);

  res.status(200).send(response);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

