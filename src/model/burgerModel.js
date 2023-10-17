const connection = require('./connection');
// commit test

const getAll = async () => {
  const [burgers] = await connection.execute(
    'SELECT * FROM TryBurger.burgers;',
  );
  return burgers;
};

const getById = async (id) => {
  const [[burger]] = await connection.execute(
    'SELECT * FROM TryBurger.burgers WHERE id = ?;',
    [id],
  );
  return burger;
};

const insert = async (burger) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO TryBurger.burgers (name) VALUES (?)',
    [burger.name],
  );
  return insertId;
};

const updateById = async (id, name) => {
  const [{ affectedRow }] = await connection.execute(
    `UPDATE TryBurger.burgers SET name = ? WHERE id = ?;
    `,
    [name, id],
  );
  return affectedRow;
};

const deleteById = async (id) => {
  const [{ affectedRow }] = await connection.execute(
    `DELETE FROM TryBurger.burgers WHERE id = ?;
    `,
    [id],
  );
  return affectedRow;
};

module.exports = {
  getAll,
  getById,
  insert,
  updateById,
  deleteById,
};
