const express = require('express');
const app = express();

const userController = require('./controller/user');
const wishlistController = require('./controller/wishlist');

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('home');
});
