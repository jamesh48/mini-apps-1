const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const generateHTML = require('./generateHtml').generateHTML;
const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

app.get('/downloadFile/', (req, res) => {
  const file ='text.txt';
  res.download(file, file, (err) => {
    if (err) {
      res.status(500).send({
        message: 'Could not download the file. ' + err
      })
    }
  });
})

app.post('/', (req, res, next) => {
  var responseHTML = generateHTML(req, (err, result) => {
    if (err) {
      console.log('error' + err);
      res.end();
    }
    console.log(result);
  });
  res.status(200).json(responseHTML);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
