const db = require('../../sql_database/database.js');

const access = {
  insert: async (userInfo, cb) => {
    const username = userInfo.username;
    const password = userInfo.password;
    const email = userInfo.email;
    try {
      const result = await db.queryAsync(`INSERT INTO Transactions (username, email, password) VALUES ("${username}", "${email}", "${password}");`)
      cb(null, result);
    } catch (err) {
      cb(err)
    }
  },
  updateTransaction: async (userAddressInfo, cb) => {
    const { addressOne, addressTwo, addressCity, addressState, addressZip, addressPhone, updatingId } = userAddressInfo;

    try {
      const result = await db.queryAsync(
        `UPDATE transactions SET addressOne = "${addressOne}", addressTwo = "${addressTwo}", addressCity="${addressCity}", addressState="${addressState}", addressZip="${addressZip}", addressPhone="${addressPhone}" WHERE id = ${updatingId};`)
      cb(null, result);
    } catch (err) {
      cb(err)
    }
  },
  updatePayment: async (userPaymentInfo, cb) => {
    const { billingCC, billingCVV, billingZip, updatingId } = userPaymentInfo;

    try {
      let results = await db.queryAsync(
        `UPDATE transactions SET billingCC="${billingCC}", billingCVV="${billingCVV}", billingZip=${billingZip} WHERE id = ${updatingId}`)
      cb(null, results);
    } catch (err) {
      cb(err)
    }
  },
  finalizePurchase: async (purchaseInfo, cb) => {
    const { purchased, updatingId } = purchaseInfo;
    try {
      const results = await db.queryAsync(`UPDATE transactions SET purchased = ${purchased} WHERE id = "${updatingId}"`);
      cb(null, results);
    } catch (err) {
      cb(err)
    }
  },
  delete: async (cb) => {
    try {
      await db.queryAsync(`DROP DATABASE IF EXISTS transactions`)
      await db.queryAsync(`CREATE DATABASE transactions;`)
      await db.queryAsync(`USE transactions`)
      await db.queryAsync(
        `CREATE TABLE transactions (
          id INTEGER NOT NULL AUTO_INCREMENT,
          username MEDIUMTEXT NOT NULL,
          email VARCHAR(100),
          password VARCHAR(100),
          addressOne VARCHAR(100),
          addressTwo VARCHAR(100),
          addressCity VARCHAR(100),
          addressState VARCHAR(100),
          addressZip VARCHAR(100),
          addressPhone VARCHAR(100),
          billingCC VARCHAR(100),
          billingCVV VARCHAR(100),
          billingZip VARCHAR(100),
          purchased BOOLEAN,
          PRIMARY KEY (id)
          );`
      )
      cb(null, 'database reset');
    } catch (err) {
      cb(err);
    }
  }
}

module.exports = access;