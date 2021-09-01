
module.exports = {
  "development": {
    "username": process.env.USERNAME,
    "password": process.env.USERPASS,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.USERNAME,
    "password": process.env.USERPASSWORD,
    "database": "Transactions",
    "host": process.env.HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USERNAME,
    "password": process.env.USERPASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "mysql"
  }
}
