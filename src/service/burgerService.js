const burgerModel = require('../model/burgerModel');

const getAll = async () => {
  const burgers = await burgerModel.getAll();
  return burgers;
};

const getById = async (id) => {
  const burger = await burgerModel.getById(id);
  if (!burger) return { type: 404, message: 'Burger not found' };
  return { type: null, message: burger };
};

const insert = async (burger) => {
  if (!burger.name) return { type: 400, message: 'Name is Required' };
  if (burger.name.length < 3) return { type: 400, message: 'Name is too short' };
  if (burger.name.length > 30) return { type: 400, message: 'Name is too long' };
  const insertId = await burgerModel.insert(burger);
  return { type: null, message: { ...burger, id: insertId } };
};

module.exports = {
  getAll,
  getById,
  insert,
};
