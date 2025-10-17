/* eslint-env serviceworker */
/* eslint-disable no-restricted-globals */
/*
  Basic service worker for offline support and installability.
  - Precaches app shell files
  - Cache-first for static assets (scripts, styles, images, fonts)
  - Network-first for navigations with offline fallback to cached index.html
*/

const CACHE_NAME = 'bible-app-cache-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/images/kakao-share-icon.png'
];

addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => {
        skipWaiting();
      })
  );
});

addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key.startsWith('bible-app-cache-') && key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return Promise.resolve();
        })
      )
    ).then(() => {
      clients.claim();
    })
  );
});

addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // For navigations, just let the network handle it to avoid refresh loops
  if (request.mode === 'navigate') return;

  // Cache-first for static assets
  const cacheFirstDestinations = new Set(['style', 'script', 'image', 'font']);
  if (cacheFirstDestinations.has(request.destination)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request)
          .then((response) => {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
            return response;
          })
          .catch(() => cached);
      })
    );
    return;
  }
});

// Allow page to trigger SW update immediately
addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting();
  }
});


