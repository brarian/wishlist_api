const express = require('express');

const app = express();

const userController = require('./controller/user');
const wishlistController = require('./controller/wishlist');

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`home`);
});

app.listen(3000, () => {
  console.log('listening');
});
