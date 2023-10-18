const ordersService = require('../service/ordersService');

const insert = async (req, res) => {
  const orders = req.body;

  const { type, message } = await ordersService.insert(orders);

  if (type) return res.status(type).json({ message });
};

module.exports = {
  insert,
};
