const CACHE_NAME = 'my-site-cache-v1';
const URLS = ['/', '/assets/', '/index.html']

this.addEventListener('install', async event => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(URLS);
      } catch (err) {
        console.log(err);
        throw err;
      }
    })()
  );
});

this.addEventListener('activate', async event => {
  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        console.log('activate');
      } catch (err) {
        console.log(err);
        throw err;
      }
    })()
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      try {
        const response = await caches.match(event.request);
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();
        const networkResponse = await fetch(fetchRequest);
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== 'basic'
        ) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, responseToCache);
        return networkResponse;
      } catch (err) {
        console.log(err);
        throw err;
      }
    })()
  );
});
