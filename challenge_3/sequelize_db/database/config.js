const Sequelize = require('sequelize');

const sequelize = new Sequelize('transactions', "root", "CloudlessSky82", {
  host: "localhost",
  dialect: "mysql",
  // operatorsAliases: false
});

// sequelize.authenticate()
// .then(() => {
//   console.log('success')
// })
// .catch((err) => {
//   console.log(err)
// })
// .finally(() => {
//   sequelize.close();
// })

module.exports = sequelize;
