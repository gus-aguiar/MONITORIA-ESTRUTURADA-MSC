const burgerService = require('../service/burgerService');

const getAll = async (_req, res) => {
  const products = await burgerService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await burgerService.getById(id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const insert = async (req, res) => {
  const { type, message } = await burgerService.insert(req.body);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

module.exports = {
  getAll,
  getById,
  insert,
};
