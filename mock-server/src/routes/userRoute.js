import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

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

export default router;
