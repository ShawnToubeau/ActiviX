import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import compression from 'compression';
import morgan from 'morgan';
import passport from 'passport';
import { passportConfig } from './config/passport';

// Import Routes
import userRoute from './routes/userRoute';

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
passportConfig(passport);

const dev = app.get('env') !== 'production';

if (!dev) {
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
