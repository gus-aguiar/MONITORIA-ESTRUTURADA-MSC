const ordersService = require('../service/ordersService');

const insert = async (req, res) => {
  const orders = req.body;

  const { type, message } = await ordersService.insert(orders);

  if (type) return res.status(type).json({ message });
  
  return res.status(201).json(message);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await ordersService.getOrderById(Number(id));

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const getAllOrders = async (req, res) => {
  const orders = await ordersService.getAllOrders();
  return res.status(200).json(orders);
};

module.exports = {
  insert,
  getOrderById,
  getAllOrders,
};
