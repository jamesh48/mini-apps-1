const connection = require('mysql2')
const db = connection.connect({
  user: 'root',
  password: 'CloudlessSky82',
  database: 'Transactions'
});

module.exports = db;