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

const insert = async (burger) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO TryBurger.burgers (name) VALUES (?)',
    [burger.name],
  );
  return insertId;
};

const updateById = async (id, name) => {
  const result = await connection.execute(
    `UPDATE TryBurger.burgers SET name = ? WHERE id = ?;
    `,
    [name, id],
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  insert,
  updateById,
  
};
