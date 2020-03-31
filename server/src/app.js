import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import compression from 'compression';
import morgan from 'morgan';
import passport from 'passport';
import { passportConfig } from './config/passport';
import webpush from 'web-push';

require('dotenv').config();

// Import Routes
import userRoute from './routes/userRoute';
import notificationRoute from './routes/notificationRoute';

// Setup MongoDB
const uri = process.env.MONGO_URI;

if (uri) {
  mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
} else {
  console.error('ERROR: Please provide a MongoDB URI');
}

// Configures push notifications
const webPushContact = 'mailto: contact@my-site.com';
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

if (webPushContact && publicVapidKey && privateVapidKey) {
  webpush.setVapidDetails(webPushContact, publicVapidKey, privateVapidKey);
} else {
  console.error('ERROR: Unable to setup vapid details');
}

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const sessionSecret = process.env.SESSION_SECRET;

if (sessionSecret) {
  app.use(
    session({
      secret: sessionSecret,
      resave: true,
      saveUninitialized: true
    })
  );
} else {
  console.error('ERROR: Please provide a session secret');
}

// Passport config
app.use(passport.initialize());
passportConfig(passport);

if (process.env.NODE_ENV === 'production') {
  console.log('APP.js PROD');
  app.use(compression());
  app.use(morgan('common'));

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  });
} else {
  app.use(morgan('dev'));
}

// Routes
app.use(userRoute);
app.use(notificationRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
