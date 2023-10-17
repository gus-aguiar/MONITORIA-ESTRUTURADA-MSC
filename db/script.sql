DROP DATABASE IF EXISTS TryBurger;
CREATE DATABASE TryBurger;
USE TryBurger;

CREATE TABLE burgers (
  id INT NOT NULL auto_increment,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO burgers (name) VALUES
  ("Burger SASSboroso"),
  ("PyBurger"),
  ("CheeseHook");