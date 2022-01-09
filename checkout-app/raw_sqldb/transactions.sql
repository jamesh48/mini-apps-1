DROP DATABASE IF EXISTS transactions;
CREATE DATABASE transactions;

USE transactions

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `transactions` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` MEDIUMTEXT NOT NULL,
  `email` VARCHAR(100),
  `password` VARCHAR(100),
  `addressOne` VARCHAR(100),
  `addressTwo` VARCHAR(100),
  `addressCity` VARCHAR(50),
  `addressState` VARCHAR(15),
  `addressZip` VARCHAR(15),
  `addressPhone` VARCHAR(15),
  PRIMARY KEY (`id`)
);

-- mysql -u root -p < server/transactions.sql