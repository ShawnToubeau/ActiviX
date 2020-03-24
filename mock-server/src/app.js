import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import expressStaticGzip from 'express-static-gzip';
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

app.use(expressStaticGzip(path.join(__dirname, '../../client/build')));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/build')));

// Routes
app.use(userRoute);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
