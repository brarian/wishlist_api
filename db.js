const pg = require('pg');

const config = {
  user: 'greedymock',
  database: 'mock_wishlist',
  password: 'greedy1mock',
  port: 5432
};

const pool = new pg.Pool(config);

console.log(pool);
pool.on('connect', () => {
  console.log('connected to the database');
});
create table wishlist_item ( item_name VARCHAR(1000), image VARCHAR(1000), url_to_item VARCHAR(1000), price INT, saved INT );
const createUsersTable = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS
    users (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(128) NOT NULL,
      username VARCHAR(128) NOT NULL UNIQUE,
      password VARCHAR(128) NOT NULL ,
      email VARCHAR(128) NOT NULL UNIQUE,
      expendableIncome INT NOT NULL
    )`;
  pool
    .query(usersTable)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(error => {
      console.log(error);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createUsersTable,
  pool
};

require('make-runnable');
