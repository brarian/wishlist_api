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
      res.json(results.rows);
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

module.exports = {
  getItems,
  getItemsById,
  insertItemInWishlist
};
