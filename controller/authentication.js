const pool = require('../index');
const userController = require('./user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//create token
const createToken = user => {
  const startTime = new Date().getTime();
  return jwt.encode({ subject: user.id, iat: startTime }, pool.sc);
};

//send token
const signIn = (req, res) => {
  res.send({ token: createToken(req.user) });
};

module.exports = {
  createToken,
  signIn
};
