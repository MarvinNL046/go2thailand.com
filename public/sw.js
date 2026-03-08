// Service Worker for Web Push Notifications — Go2Thailand.com
// Minimal: push events only, no PWA caching

self.addEventListener('push', function(event) {
  if (!event.data) return;

  const data = event.data.json();

  const options = {
    body: data.body || '',
    icon: '/go2thailand-faviocon.webp',
    badge: '/go2thailand-faviocon.webp',
    data: {
      url: data.url || 'https://go2-thailand.com/blog/'
    },
    tag: 'go2thailand-digest',
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Go2Thailand', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  const url = event.notification.data?.url || 'https://go2-thailand.com/blog/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
