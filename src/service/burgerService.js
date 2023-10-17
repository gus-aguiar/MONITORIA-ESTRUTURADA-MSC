const burgerModel = require('../model/burgerModel');

const getAll = async () => {
  const burgers = await burgerModel.getAll();
  return burgers;
};

module.exports = {
  getAll,
};
