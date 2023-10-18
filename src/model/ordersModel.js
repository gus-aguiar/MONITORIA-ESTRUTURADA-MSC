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
  console.log(result);

  return result;
};

module.exports = {
  insert,
  insertBurgersOrders,
};