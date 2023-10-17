const mysql = require('mysql2/promise');
const fs = require('node:fs').promises;
const { join } = require('node:path');
require('dotenv').config();

const mysqldb = async () => mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true,
});

const scriptSql = async () => {
  const file = await fs.readFile(join(__dirname, './script.sql'), {
    encoding: 'utf-8',
  });
  
  const db = await mysqldb();
  await db.query(file);
  await db.end();
};

scriptSql()
  .then(() => console.log('Funcionou!'))
  .catch((error) => console.log(error));