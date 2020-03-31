import axios from 'axios';

const publicVapidKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;
let convertedVapidKey: Uint8Array;

if (publicVapidKey) {
  convertedVapidKey = urlBase64ToUint8Array(publicVapidKey);
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line
  const base64 = (base64String + padding) // eslint-disable-next-line
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function sendSubscription(subscription: PushSubscription, userId: string) {
  console.log(subscription);
  return axios
    .post(`/notification/subscribe/${userId}`, subscription)
    .then(res => {
      console.log('Subscribed', res);
    })
    .catch(err => {
      console.log('Error subscribing', err);
    });
}

export function subscribeUser(userId: string) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(function(registration) {
        if (!registration.pushManager) {
          console.log('Push manager unavailable.');
          return;
        }

        registration.pushManager
          .getSubscription()
          .then(function(existedSubscription) {
            if (existedSubscription === null) {
              console.log('No subscription detected, make a request.');
              registration.pushManager
                .subscribe({
                  applicationServerKey: convertedVapidKey,
                  userVisibleOnly: true
                })
                .then(function(newSubscription) {
                  console.log('New subscription added.');
                  sendSubscription(newSubscription, userId);
                })
                .catch(function(e) {
                  if (Notification.permission !== 'granted') {
                    console.log('Permission was not granted.');
                  } else {
                    console.error(
                      'An error ocurred during the subscription process.',
                      e
                    );
                  }
                });
            } else {
              console.log('Existed subscription detected.');
              sendSubscription(existedSubscription, userId);
            }
          });
      })
      .catch(function(e) {
        console.error(
          'An error ocurred during Service Worker registration.',
          e
        );
      });
  }
}
