'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    //You must return a promise
    return queryInterface.createTable("transactions", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(35),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(35),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      addressOne: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: false
      },
      addressTwo: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: false
      },
      addressCity: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      addressState: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      addressZip: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      addressPhone: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      billingCC: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      billingCVV: {
        type: Sequelize.STRING(6),
        allowNull: true
      },
      billingZip: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      purchased: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    //Return a promise that drops a table in case of (migration:undo)
    return queryInterface.dropTable("transactions");
  }
};
