// Service Worker for caching static assets
const CACHE_NAME = 'bharose-pe-v1';
const CACHE_ASSETS = [
  '/',
  '/assets/index-CuAUctTt.css',
  '/assets/index-BEEI2MMv.js',
  '/lovable-uploads/b8ebf85b-234b-486e-8e92-de8e40c69483.png'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(CACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;

  // Cache strategy for static assets
  if (event.request.url.includes('/assets/') || 
      event.request.url.includes('/lovable-uploads/') ||
      event.request.url.endsWith('.js') ||
      event.request.url.endsWith('.css') ||
      event.request.url.endsWith('.png') ||
      event.request.url.endsWith('.jpg') ||
      event.request.url.endsWith('.svg')) {
    
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Return cached version or fetch from network
          return response || fetch(event.request).then((fetchResponse) => {
            // Cache the fetched response for future use
            const responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return fetchResponse;
          });
        })
        .catch(() => {
          // Fallback for critical resources
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
        })
    );
  }
});