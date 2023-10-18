const ordersModel = require('../model/ordersModel');

const insert = async (orders) => {
  const id = await ordersModel.insert();
  const burgersSold = await Promise.all(orders.map(({ burgerId, quantity }) => {
    ordersModel.insertBurgersOrders(id, burgerId, quantity);
    return { burgerId, quantity };
  }));

  return { type: null, message: { id, burgersSold } };
};

const getOrderById = async (orderId) => {
  const order = await ordersModel.getOrderById(orderId);

  if (order.length === 0) return { type: 404, message: 'Pedido não encontrado' };

  return { type: null, message: order };
};

const getAllOrders = async () => {
  const orders = await ordersModel.getAllOrders();

  return { type: null, message: orders };
};

module.exports = {
  insert,
  getOrderById,
  getAllOrders,
};
