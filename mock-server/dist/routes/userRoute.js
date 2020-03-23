'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _userController = require('../controllers/userController');

var userController = _interopRequireWildcard(_userController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = (0, _express.Router)();

// GET: all users
router.get('/users', userController.getAllUsers);

// GET: single user
router.get('/users/:id', userController.getUser);

// POST: add user
router.post('/users', userController.addUser);

// PUT: update user
router.put('/users/:id', userController.updateUser);

// DELETE: remove user
router.delete('/users/:id', userController.deleteUser);

// POST Login
router.post('/login', userController.loginUser);

exports.default = router;