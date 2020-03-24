import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
};

export const getUser = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
};

export const addUser = (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password
  });

  // Hash password
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;

      // Set password to hashed
      user.password = hash;
      // Save user
      user
        .save()
        .then(user => {
          res.send('Added user');
        })
        .catch(err => res.send(err));
    })
  );
};

export const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully updated user');
    }
  });
};

export const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully deleted user');
    }
  });
};

// POST login
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ userNotFound: 'The user is not found' });
    }

    // Match password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };

        const secretOrKey = process.env.JWT_SECRET;

        if (secretOrKey) {
          jwt.sign(
            payload,
            secretOrKey,
            { expiresIn: 31556926 },
            (err, token) => {
              res.json({ success: true, token: `Bearer ${token}` });
            }
          );
        } else {
          console.error('ERROR: Please provide a JWT secret');
        }
      } else {
        return res.status(404).json({ wrongPassword: 'Password is incorrect' });
      }
    });
  });
};
