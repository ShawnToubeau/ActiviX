'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportConfig = undefined;

var _passportJwt = require('passport-jwt');

var dbUrl = 'http://localhost:5000';

var opts = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
};

var passportConfig = exports.passportConfig = function passportConfig(passport) {
  passport.use(new _passportJwt.Strategy(opts, function (jwt_payload, done) {
    axios.get(dbUrl + '/users/' + jwt_payload.id).then(function (user) {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    }).catch(function (err) {
      return console.log(err);
    });
  }));
};