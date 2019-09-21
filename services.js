const passport = require('passport');
const config = require('./queries').pool;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { findUserById, verifyUser } = require('./controller/user');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const localOption = { username: 'email' };

const localLogin = new LocalStrategy(localOption, (email, password, done) => {
  return verifyUser(email).then(validUser => {
    bcrypt
      .compare(password, validUser.password)
      .then(validPassword => {
        if (validPassword) {
          return done(null, validUser);
        }
        return done(null, false);
      })
      .catch(error => done(error, false));
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secret: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  return findUserById(payload.sub)
    .then(foundUser => {
      if (foundUser) {
        return done(null, foundUser);
      }
      return done(null, false);
    })
    .catch(error => (done, false));
});

passport.use(jwtLogin);
passport.use(localLogin);
