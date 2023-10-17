const burgerService = require('../service/burgerService');

const getAll = async (_req, res) => {
  const products = await burgerService.getAll();
  return res.status(200).json(products);
};

module.exports = {
  getAll,
};
