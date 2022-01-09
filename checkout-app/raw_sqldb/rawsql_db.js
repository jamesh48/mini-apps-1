var Promise = require("bluebird");
const connection = require('mysql2').createConnection({
  user: process.env.USERNAME,
  password: process.env.USERPASSWORD,
  database: process.env.DATABASE
});

const db = Promise.promisifyAll(connection)

module.exports = db;