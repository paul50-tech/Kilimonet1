// Kilimonet High-Performance Service Worker v5
const CACHE_NAME = 'kilimonet-cache-v5';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/services.html',
  '/technology.html',
  '/about.html',
  '/contact.html',
  '/partnerships.html',
  '/labour.html',
  '/smart-assist.html',
  '/intake.html',
  '/critical.css',
  '/styles.css',
  '/services-page.css',
  '/technology-page.css',
  '/about-page.css',
  '/contact-page.css',
  '/partnerships-page.css',
  '/labour-page.css',
  '/smart-assist-page.css',
  '/intake-page.css',
  '/script.js',
  '/contact.js',
  '/intake.js',
  '/smart-assist.js',
  '/kilimonet-brand-logo.svg',
  '/kilimonet-brand-logo.png',
  '/kilimonet.icon.png',
  '/kilimonet-icon.svg',
  '/photo-hero-greenhouse.jpg',
  '/photo-hero-greenhouse.webp',
  '/photo-hero-greenhouse-800.webp',
  '/photo-hero-greenhouse-1200.webp',
  '/photo-service-greenhouse-irrigation.webp',
  '/photo-service-consultancy.webp',
  '/photo-service-design-construction.webp',
  '/photo-service-seedlings.webp',
  '/photo-service-training.webp',
  '/photo-about-farm.webp'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-caching partial failure', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests from the same origin or Google Fonts
  if (request.method !== 'GET') return;
  if (!url.origin.includes(self.location.origin) && !url.origin.includes('fonts.googleapis.com') && !url.origin.includes('fonts.gstatic.com')) {
    return;
  }

  // HTML documents: Stale-While-Revalidate for instant loading with background update
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Static Assets (CSS, JS, WebP, SVG, Fonts): Cache First, fallback to network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      });
    })
  );
});
