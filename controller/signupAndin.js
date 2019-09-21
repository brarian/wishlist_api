const jwt = require('jwt-simple');
const config = require('../queries');
const { createNewUser } = require('./user');
const bcrypt = require('bcrypt');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp });
};

const signIn = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    res.status(422).send({ error: 'you must provide a password' });
  }

  bcrypt
    .hash(password, saltRounds)
    .then(hash => {
      return createNewUser(name, email, hash)
        .then(newuser => {
          res.json({ token: tokenForUser(newuser) });
        })
        .catch(error => {
          res.json({ error: 'error saving user to the databse' });
        });
    })
    .catch(error => {
      return next(error);
    });
};

module.exports = {
  signIn,
  signUp
};
