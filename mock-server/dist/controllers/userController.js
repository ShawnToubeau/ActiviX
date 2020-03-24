'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = exports.deleteUser = exports.updateUser = exports.addUser = exports.getUser = exports.getAllUsers = undefined;

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllUsers = exports.getAllUsers = function getAllUsers(req, res) {
  _User2.default.find(function (err, users) {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
};

var getUser = exports.getUser = function getUser(req, res) {
  _User2.default.findById(req.params.id, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};

var addUser = exports.addUser = function addUser(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      password = _req$body.password;


  var user = new _User2.default({
    name: name,
    email: email,
    password: password
  });

  // Hash password
  _bcryptjs2.default.genSalt(10, function (err, salt) {
    return _bcryptjs2.default.hash(user.password, salt, function (err, hash) {
      if (err) throw err;

      // Set password to hashed
      user.password = hash;
      // Save user
      user.save().then(function (user) {
        res.send('Added user');
      }).catch(function (err) {
        return res.send(err);
      });
    });
  });
};

var updateUser = exports.updateUser = function updateUser(req, res) {
  _User2.default.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully updated user');
    }
  });
};

var deleteUser = exports.deleteUser = function deleteUser(req, res) {
  _User2.default.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully deleted user');
    }
  });
};

// POST login
var loginUser = exports.loginUser = function loginUser(req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;


  _User2.default.findOne({ email: email }).then(function (user) {
    if (!user) {
      return res.status(404).json({ userNotFound: 'The user is not found' });
    }

    // Match password
    _bcryptjs2.default.compare(password, user.password, function (err, isMatch) {
      if (err) throw err;

      if (isMatch) {
        var payload = {
          id: user.id,
          name: user.name
        };

        var secretOrKey = process.env.JWT_SECRET;

        if (secretOrKey) {
          _jsonwebtoken2.default.sign(payload, secretOrKey, { expiresIn: 31556926 }, function (err, token) {
            res.json({ success: true, token: 'Bearer ' + token });
          });
        } else {
          console.error('ERROR: Please provide a JWT secret');
        }
      } else {
        return res.status(404).json({ wrongPassword: 'Password is incorrect' });
      }
    });
  });
};