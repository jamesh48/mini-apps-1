const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

// Pick your poison :) (must change app.jsx to receive correct updating id as well);
// Sequelize
const router = require(`../sequelize_db/routes.js`);
// Raw Sql
// const router = require('../raw_sqldb/sqlroutes.js');
// Mongo/Mongoose
// const router = require('../mongo_db/mongo_routes.js');


const port = 3000;
app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/../client/dist'));

app.use('/', (req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
})

app.use('/', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})