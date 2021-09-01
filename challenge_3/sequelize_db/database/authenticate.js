const Sequelize = require('sequelize');

module.exports = () => {
  const sequelize = new Sequelize('transactions', "root", process.env.USERPASS, {
    host: process.env.HOST,
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