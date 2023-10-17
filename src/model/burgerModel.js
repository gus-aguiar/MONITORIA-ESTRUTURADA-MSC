const connection = require('./connection');
// commit test

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

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO TryBurger.burgers (name) VALUES (?)',
    [product.name],
  );
  return insertId;
};

module.exports = {
  getAll,
  getById,
  insert,
  
};
