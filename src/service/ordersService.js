const ordersModel = require('../model/ordersModel');

const insert = async (orders) => {
  const id = await ordersModel.insert();
  const burgersSold = await Promise.all(orders.map(({ burgerId, quantity }) => {
    ordersModel.insertBurgersOrders(id, burgerId, quantity);
    return { burgerId, quantity };
  }));

  if (!burgersSold.every((result) => result.affectedRows === 1)) {
    return { type: 500, message: 'Houve problema para efetuar o pedido' };
  }

  return { type: null, message: { id, burgersSold } };
};

module.exports = {
  insert,
};
