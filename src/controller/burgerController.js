const burgerService = require('../service/burgerService');

const getAll = async (_req, res) => {
  const burgers = await burgerService.getAll();
  return res.status(200).json(burgers);
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

const updateById = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { type, message } = await burgerService.updateById(id, name);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await burgerService.deleteById(id);
  if (type) return res.status(type).json({ message });
  res.status(204).json('Burger deleted');
};

module.exports = {
  getAll,
  getById,
  insert,
  updateById,
  deleteById,
};
