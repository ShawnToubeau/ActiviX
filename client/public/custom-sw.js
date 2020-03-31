self.addEventListener('push', event => {
  const data = JSON.parse(event.data.text());
  console.log('New notification', data);
  const options = {
    body: data.body
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
