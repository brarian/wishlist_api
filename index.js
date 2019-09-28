const express = require('express');
const app = express();
const db = require('./queries');
const passport = require('passport');
var bodyParser = require('body-parser');
// const Authentication = require('./controller/signupAndin');
// const userController = require('./controller/user');
const auth = require('./awsindex');

const wishlistController = require('./controller/wishlist');
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
app.get('/register');
app.post('/register', auth.registerUser);
app.get('/login');
app.post('/login', auth.signIn);
app.get('/items', db.getItems);
app.post('/items/:id', db.insertItemInWishlist);
app.get('/:userid', db.getUser);
app.get('/:userid/allItems', db.getItemsById);
app.delete('/:user/:price', db.deleteItem);
app.delete('/signout', auth.signOut);

app.listen(8000, (req, res) => {
  console.log('listening on 8000');
});
