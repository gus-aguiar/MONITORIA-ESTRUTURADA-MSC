const connection = require('./connection');

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO TryBurger.orders (date) VALUES (NOW())',
  );

  return insertId;
};

const insertBurgersOrders = async (orderId, burgerId, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO TryBurger.orders_burgers (order_id, burger_id, quantity) VALUES (?, ?, ?)',
    [orderId, burgerId, quantity],
  );

  return result;
};

const getOrderById = async (orderId) => {
  const [result] = await connection.execute(
    `SELECT t1.date, t2.order_id, quantity
    FROM TryBurger.orders AS t1
    INNER JOIN TryBurger.orders_burgers AS t2 ON t1.id = t2.order_id
    WHERE t2.order_id = ?`,
    [orderId],
  );

  return result;
};

const getAllOrders = async () => {
  const [result] = await connection.execute(
    `SELECT t1.date, t2.order_id, quantity
    FROM TryBurger.orders AS t1
    INNER JOIN TryBurger.orders_burgers AS t2 ON t1.id = t2.order_id`,
  );

  return result;
};

module.exports = {
  insert,
  insertBurgersOrders,
  getOrderById,
  getAllOrders,
};