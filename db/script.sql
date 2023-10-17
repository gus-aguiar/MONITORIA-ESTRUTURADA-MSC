DROP DATABASE IF EXISTS StoreManager;
CREATE DATABASE StoreManager;
USE StoreManager;

CREATE TABLE products (
  id INT NOT NULL auto_increment,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO products (name) VALUES
  ("Burger SASSboroso"),
  ("PyBurger"),
  ("CheeseHook");