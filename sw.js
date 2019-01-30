const cacheName = 'index-page';
const filesToCache = ['/', '/index.html', '/manifest.json'];

// Install event
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] installing');

  // Await to cache the pages
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] caching app shell');
      return cache.addAll(filesToCache);
    })
    .then(function() { return self.skipWaiting() })
  );
});

// Activate event
self.addEventListener('activate', function(event) {
  console.log('[ServiceWorker] activating');
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache:', key);
            return caches.delete(key);
          }
        }),
      );
    }),
  );

  return self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(function(response) {
      return response || fetch(event.request);
    }),
  );
});
