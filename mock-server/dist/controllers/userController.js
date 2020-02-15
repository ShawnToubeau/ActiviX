'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = exports.deleteUser = exports.updateUser = exports.addUser = exports.getUser = exports.getAllUsers = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbUrl = 'http://localhost:5000';

var getAllUsers = exports.getAllUsers = function getAllUsers(req, res) {
  _axios2.default.get(dbUrl + '/users').then(function (dbRes) {
    var users = dbRes.data;

    if (users) {
      res.send(users);
    }
  }).catch(function (err) {
    res.send(err);
  });
};

var getUser = exports.getUser = function getUser(req, res) {
  var userId = req.params.id;

  if (userId) {
    _axios2.default.get(dbUrl + '/users/' + userId).then(function (dbRes) {
      var user = dbRes.data;

      if (user) {
        res.send(user);
      }
    }).catch(function (err) {
      res.send(err);
    });
  }
};

var addUser = exports.addUser = function addUser(req, res) {
  var user = req.body;

  // Hash password
  _bcryptjs2.default.genSalt(10, function (err, salt) {
    return _bcryptjs2.default.hash(user.password, salt, function (err, hash) {
      if (err) throw err;

      // Set password to hashed
      user.password = hash;
      // Save user
      _axios2.default.post(dbUrl + '/users', user).then(function () {
        res.send('Added user');
      }).catch(function (err) {
        res.send(err);
      });
    });
  });
};

var updateUser = exports.updateUser = function updateUser(req, res) {
  var userId = req.params.id;
  var updatedUser = req.body;

  _axios2.default.put(dbUrl + '/users/' + userId, updatedUser).then(function () {
    res.send('Updated user ' + userId);
  }).catch(function (err) {
    res.send(err);
  });
};

var deleteUser = exports.deleteUser = function deleteUser(req, res) {
  var userId = req.params.id;

  if (userId) {
    _axios2.default.delete(dbUrl + '/users/' + userId).then(function () {
      res.send('Deleted user ' + userId);
    }).catch(function (err) {
      res.send(err);
    });
  }
};

// POST login
var loginUser = exports.loginUser = function loginUser(req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;


  _axios2.default.get(dbUrl + '/users?email=' + email).then(function (dbRes) {
    var user = dbRes.data[0];

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

        var secretOrKey = 'secret';
        _jsonwebtoken2.default.sign(payload, secretOrKey, { expiresIn: 31556926 }, function (err, token) {
          res.json({ success: true, token: 'Bearer ' + token });
        });
      } else {
        return res.status(404).json({ wrongPassword: 'Password is incorrect' });
      }
    });
  }).catch(function (err) {
    res.send(err);
  });
};