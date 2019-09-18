const dotenv = require('dotenv');
dotenv.config();

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'brariannamonywa',
  host: 'localhost',
  database: 'mock_wishlist',
  password: 'greedy1mock',
  port: 5432
});

const getItems = (req, res) => {
  pool.query(
    'SELECT * FROM wishlist_item ORDER BY id ASC',
    (error, results) => {
      if (error) {
        res.send(error);
      }
      res.json(results.rows);
    }
  );
};

const getItemsById = (req, res) => {
  let { userid } = req.params;
  pool.query(
    `SELECT * FROM wishlist_item where id= ${userid}`,
    (error, results) => {
      if (error) {
        res.send(error);
      }
      console.log(results);
      res.send(results.rows);
    }
  );
};

const insertItemInWishlist = (req, res) => {
  const { item_name, image, url_to_item, price, id } = req.body;
  pool.query(
    `insert into wishlist_item (item_name, image, url_to_item, price, id) values 
      ($1, $2, $3, $4, $5)`,
    [item_name, image, url_to_item, price, id],
    (error, results) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(results);
        res.json(results);
      }
    }
  );
};

const getUser = (req, res) => {
  const { userid } = req.params;
  pool.query(
    `SELECT name, username, email, exp_income FROM users WHERE id = ${userid}`,
    //   `SELECT wishlist_item.item_name, wishlist_item.image, wishlist_item.url_to_item,
    // wishlist_item.price, wishlist_item.saved, wishlist_item.id, users.id, users.name, users.username
    // from wishlist_item
    // INNER JOIN users on wishlist_item.id = users.id WHERE users.id = ${userid}`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.json(results.rows);
      }
    }
  );
};

const deleteItem = (req, res) => {
  const { user, price } = req.params;
  console.log(user, price);
  pool.query(
    `DELETE FROM wishlist_item WHERE price = ${price} AND id =${user}`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.redirect(`/${user}/allItems`);
      }
    }
  );
};
module.exports = {
  pool,
  getItems,
  getItemsById,
  insertItemInWishlist,
  getUser,
  deleteItem
};
