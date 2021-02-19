const db = require('../../sql_database/database.js');

const access = {
  insert: (userInfo, cb) => {
    const username = userInfo.username;
    const password = userInfo.password;
    const email = userInfo.email;
    db.query(`INSERT INTO Transactions (username, email, password) VALUES ("${username}", "${email}", "${password}");`, (err, results, fields) => {
      if (err) {
        cb(err);
      } else {
        cb(null, results);
      }
    })
  },
  updateTransaction: (userAddressInfo, cb) => {
    const { addressOne, addressTwo, addressCity, addressState, addressZip, addressPhone, updatingId } = userAddressInfo;
    console.log(addressTwo);
    db.query(
      `UPDATE transactions SET addressOne = "${addressOne}", addressTwo = "${addressTwo}", addressCity="${addressCity}", addressState="${addressState}", addressZip="${addressZip}", addressPhone="${addressPhone}" WHERE id = ${updatingId};`,
      (err, results, fields) => {
        if (err) {
          cb(err)
        } else {
          cb(null, results);
        }
      });
  },
  updatePayment: (userPaymentInfo, cb) => {
    const { billingCC, billingCVV, billingZip, updatingId } = userPaymentInfo;
    db.query(
      `UPDATE transactions SET billingCC="${billingCC}", billingCVV="${billingCVV}", billingZip=${billingZip} WHERE id = ${updatingId}`, (err, results, fields) => {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          cb(null, results);
        }
      })
  },
  finalizePurchase: (purchaseInfo, cb) => {
    const { purchased, updatingId } = purchaseInfo;
    db.query(`UPDATE transactions SET purchased = ${purchased} WHERE id = "${updatingId}"`, (err, results, fields) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(null, results);
      }
    })
  },
  delete: (cb) => {
    db.query(`DROP DATABASE IF EXISTS transactions`, (err, results) => {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        db.query(`CREATE DATABASE transactions;`, (err, results) => {
          if (err) {
            console.log(err);
            cb(err);
          } else {
            db.query(`USE transactions`, (err, results) => {
              if (err) {
                console.log(err)
                cb(err);
              } else {
                db.query(
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
                  );`, (err, results) => {
                  if (err) {
                    cb(err);
                  } else {
                    cb(null, 'reset');
                  }
                })
              }
            })
          }
        })
      }
    })
  }
}

module.exports = access;