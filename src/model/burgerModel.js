const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM TryBurger.burgers;',
  );
  return products;
};

const getById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM TryBurger.burgers WHERE id = ?;',
    [id],
  );
  return product;
};

module.exports = {
  getAll,
  getById,
  
};
