import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const dbUrl = process.env.DB_URL || 'http://localhost:5000';

export const getAllUsers = (req, res) => {
  axios
    .get(`${dbUrl}/users`)
    .then(dbRes => {
      const users = dbRes.data;

      if (users) {
        res.send(users);
      }
    })
    .catch(err => {
      res.send(err);
    });
};

export const getUser = (req, res) => {
  const userId = req.params.id;

  if (userId) {
    axios
      .get(`${dbUrl}/users/${userId}`)
      .then(dbRes => {
        const user = dbRes.data;

        if (user) {
          res.send(user);
        }
      })
      .catch(err => {
        res.send(err);
      });
  }
};

export const addUser = (req, res) => {
  const user = req.body;

  // Hash password
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;

      // Set password to hashed
      user.password = hash;
      // Save user
      axios
        .post(`${dbUrl}/users`, user)
        .then(() => {
          res.send('Added user');
        })
        .catch(err => {
          res.send(err);
        });
    })
  );
};

export const updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  axios
    .put(`${dbUrl}/users/${userId}`, updatedUser)
    .then(() => {
      res.send(`Updated user ${userId}`);
    })
    .catch(err => {
      res.send(err);
    });
};

export const deleteUser = (req, res) => {
  const userId = req.params.id;

  if (userId) {
    axios
      .delete(`${dbUrl}/users/${userId}`)
      .then(() => {
        res.send(`Deleted user ${userId}`);
      })
      .catch(err => {
        res.send(err);
      });
  }
};

// POST login
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  axios
    .get(`${dbUrl}/users?email=${email}`)
    .then(dbRes => {
      const user = dbRes.data[0];

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

          const secretOrKey = 'secret';
          jwt.sign(
            payload,
            secretOrKey,
            { expiresIn: 31556926 },
            (err, token) => {
              res.json({ success: true, token: `Bearer ${token}` });
            }
          );
        } else {
          return res
            .status(404)
            .json({ wrongPassword: 'Password is incorrect' });
        }
      });
    })
    .catch(err => {
      res.send(err);
    });
};
