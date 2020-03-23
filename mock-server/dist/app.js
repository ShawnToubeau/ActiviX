'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require('./config/passport');

var _userRoute = require('./routes/userRoute');

var _userRoute2 = _interopRequireDefault(_userRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Middlewares


// Import Routes
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_express2.default.json());
app.use((0, _cors2.default)());
app.use((0, _expressSession2.default)({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(_passport2.default.initialize());
(0, _passport3.passportConfig)(_passport2.default);

// Routes
app.use(_userRoute2.default);

app.get('/', function (req, res) {
  res.send('hello');
});

var PORT = 4000;
app.listen(PORT, function () {
  return console.log('Server is listening on ' + PORT);
});