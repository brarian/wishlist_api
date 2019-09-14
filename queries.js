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
  let { id } = req.params;
  pool.query(
    `SELECT * FROM wishlist_item where id= ${id}`,
    (error, results) => {
      if (error) {
        res.send(error);
      }
      const variables = results.rows;
      res.send(variables);
    }
  );
};

const insertItemInWishlist = (req, res) => {
  const { item_name, image, url_to_item, price, id } = req.body;
  // let selectAll = `SELECT * FROM wishlist_item where id= ${id}`;
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
  const { id } = req.params;
  pool.query(
    `SELECT wishlist_item.item_name, wishlist_item.image, wishlist_item.url_to_item, 
	wishlist_item.price, wishlist_item.saved, wishlist_item.id, users.id, users.name, users.username
	from wishlist_item 
	INNER JOIN users on wishlist_item.id = users.id WHERE users.id = ${3}`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(results.rows);
        res.json(results);
      }
    }
  );
};

module.exports = {
  getItems,
  getItemsById,
  insertItemInWishlist,
  getUser
};
