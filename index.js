const express = require('express');
const app = express();
const db = require('./queries');
const passport = require('passport');
const bodyParser = require('body-parser');
// const Authentication = require('./controller/signupAndin');
// const userController = require('./controller/user');
const cog = require('./mawsindex');
const wishlistController = require('./controller/wishlist');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.get('/home', (req, res) => {
  console.log('heomeme');
  res.send('home');
});
app.get('/register');
app.post('/register');

app.get('/signin', cog.registerUser);
app.post('/signin', cog.registerUser);
app.get('/items', db.getItems);
app.post('/items/:id', db.insertItemInWishlist);
app.get('/:userid', db.getUser);
app.get('/:userid/allItems', db.getItemsById);
app.delete('/:user/:price', db.deleteItem);
app.get('/');

app.listen(8000, (req, res) => {
  console.log(req);
  console.log('listening on 8000');
});
