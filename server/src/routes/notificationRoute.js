import { Router } from 'express';
import * as notificationController from '../controllers/notificationController';

const router = Router();

// POST: subscribe a user to notifications
router.post(
  '/notification/subscribe/:id',
  notificationController.subscribeUser
);

// POST: send a notification
router.post('/notification/send/:id', notificationController.sendNotification);

export default router;
