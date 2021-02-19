const Sequelize = require('sequelize');

module.exports = () => {
  const sequelize = new Sequelize('transactions', "root", "CloudlessSky82", {
    host: "localhost",
    dialect: "mysql",
  });

  sequelize.authenticate()
    .then(() => {
      console.log('success')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      sequelize.close();
    })
}