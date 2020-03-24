'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require('./config/passport');

var _userRoute = require('./routes/userRoute');

var _userRoute2 = _interopRequireDefault(_userRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

// Import Routes


var uri = process.env.MONGO_URI;

if (uri) {
  _mongoose2.default.connect(uri, { useNewUrlParser: true }).then(function () {
    return console.log('MongoDB connected');
  }).catch(function (err) {
    return console.error(err);
  });
} else {
  console.error('ERROR: Please provide a MongoDB URI');
}

var app = (0, _express2.default)();

// Middlewares
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_express2.default.json());
app.use((0, _cors2.default)());

var sessionSecret = process.env.SESSION_SECRET;

if (sessionSecret) {
  app.use((0, _expressSession2.default)({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true
  }));
} else {
  console.error('ERROR: Please provide a session secret');
}

// Passport config
app.use(_passport2.default.initialize());
(0, _passport3.passportConfig)(_passport2.default);

var dev = app.get('env') !== 'production';

if (!dev) {
  app.use((0, _compression2.default)());
  app.use((0, _morgan2.default)('common'));

  // Serve static files from the React app
  app.use(_express2.default.static(_path2.default.join(__dirname, '../../client/build')));

  app.get('*', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../client/build/index.html'));
  });
} else {
  app.use((0, _morgan2.default)('dev'));
}

// Routes
app.use(_userRoute2.default);

var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  return console.log('Server is listening on ' + PORT);
});