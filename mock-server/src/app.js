import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
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

// Routes
app.use(userRoute);

app.get('/', (req, res) => {
  res.send('hello');
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
