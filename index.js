const express = require('express');
const app = express();
const db = require('./queries');
const bodyParser = require('body-parser');
const userController = require('./controller/user');
const wishlistController = require('./controller/wishlist');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.get('/', (req, res) => {
  res.send('home');
});

app.get('/items', db.getItems);
app.get('/items/:id', db.getItemsById);
app.post('/items/:id', db.insertItemInWishlist);
app.listen(3000, () => {
  console.log('listening on 3000');
});
