import webpush from 'web-push';
import User from '../models/User';

export const subscribeUser = (req, res) => {
  const subscription = req.body;

  const payload = JSON.stringify({
    title: 'ActiviX',
    body: 'You are now subscribed to receive notifications.'
  });

  webpush
    .sendNotification(subscription, payload)
    .then(result => {
      // Adds the subscription to the user's data
      // model for future notifications
      User.update(
        { _id: req.params.id },
        { subscription: JSON.stringify(subscription) },
        (err, affected, res) => {
          if (err) throw err;
        }
      );
    })
    .catch(e => console.error(e));

  res.status(200).json({ success: true });
};

export const sendNotification = (req, res) => {
  const { title, body } = req.body;

  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      const subscription = JSON.parse(user.subscription);
      const payload = JSON.stringify({
        title,
        body
      });

      webpush
        .sendNotification(subscription, payload)
        .then(result => {})
        .catch(e => console.error(e));

      res.status(200).json({ success: true });
    }
  });
};
