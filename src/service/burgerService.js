const burgerModel = require('../model/burgerModel');

const getAll = async () => {
  const burgers = await burgerModel.getAll();
  return burgers;
};

const getById = async (id) => {
  const burger = await burgerModel.getById(id);
  if (!burger) return { type: 404, message: 'burger not found' };
  return { type: null, message: burger };
};

module.exports = {
  getAll,
  getById,
};
