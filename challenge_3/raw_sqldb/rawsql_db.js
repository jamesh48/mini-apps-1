var Promise = require("bluebird");
const connection = require('mysql2').createConnection({
  user: 'root',
  password: 'CloudlessSky82',
  database: 'Transactions'
});

const db = Promise.promisifyAll(connection)

module.exports = db;