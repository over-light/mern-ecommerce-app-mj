const passport = require('passport');
const mongoose = require('mongoose');

const {ExtractJwt} = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

const User = mongoose.model('User');
const keys = require('./keys');

const {secret} = keys.jwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.use(
  new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch(err => done(err, false));
  })
);

module.exports = async app => {
  app.use(passport.initialize());

};