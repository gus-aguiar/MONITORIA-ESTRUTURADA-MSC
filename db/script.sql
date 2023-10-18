DROP DATABASE IF EXISTS TryBurger;
CREATE DATABASE TryBurger;
USE TryBurger;

CREATE TABLE burgers (
  id INT NOT NULL auto_increment,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE orders (
  id INT NOT NULL auto_increment,
  date DATETIME NOT NULL,
  PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE orders_burgers (
  order_id INT NOT NULL,
  burger_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
  FOREIGN KEY (burger_id) REFERENCES burgers (id) ON DELETE CASCADE
) ENGINE=INNODB

INSERT INTO orders (date) VALUES
    (NOW()),
    (NOW());

INSERT INTO orders_burgers (order_id, burger_id, quantity) VALUES
    (1, 1, 2),
    (1, 2, 3),
    (2, 3, 1);

SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO burgers (name) VALUES
  ("Burger SASSboroso"),
  ("PyBurger"),
  ("CheeseHook");