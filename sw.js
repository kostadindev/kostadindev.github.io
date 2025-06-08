const CACHE_NAME = 'kostadin-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/projects.html',
  '/publications.html',
  '/certificates.html',
  '/static/assets/css/main.css',
  '/static/assets/css/fontawesome-all.min.css',
  '/static/assets/js/jquery.min.js',
  '/static/assets/js/main.js',
  '/static/images/headshot.jpg',
  '/static/images/gonext-cover-chat.webp',
  '/static/images/bg.webp',
  '/static/favicon.ico'
];

// Install event - cache resources
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(function (error) {
        console.log('Cache install failed:', error);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }

        return fetch(event.request).then(function (response) {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function (cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(function () {
        // Return offline page for navigation requests
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 