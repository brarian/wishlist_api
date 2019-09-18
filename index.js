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
app.get('/register');
app.post('/register', userController.createNewUser);
app.get('/signin');
app.post('/signin', userController.signIn);
app.get('/items', db.getItems);
app.post('/items/:id', db.insertItemInWishlist);
app.get('/:userid', db.getUser);
app.get('/:userid/allItems', db.getItemsById);
app.delete('/:user/:price', db.deleteItem);

app.listen(3000, () => {
  console.log('listening on 3000');
});
