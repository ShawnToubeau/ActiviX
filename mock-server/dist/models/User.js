'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var userSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

var User = (0, _mongoose.model)('User', userSchema);

exports.default = User;