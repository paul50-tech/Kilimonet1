// Kilimonet High-Performance Service Worker v6
const CACHE_NAME = 'kilimonet-cache-v6';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/services',
  '/services.html',
  '/technology',
  '/technology.html',
  '/about',
  '/about.html',
  '/contact',
  '/contact.html',
  '/partnerships',
  '/partnerships.html',
  '/labour',
  '/labour.html',
  '/smart-assist',
  '/smart-assist.html',
  '/intake',
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
  '/manifest.webmanifest',
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

  // HTML navigation requests: Network First with comprehensive Cache and Clean-Route Fallback
  // Guarantees page reloads ALWAYS fetch latest updates and never fail with empty responses
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // If offline or network fetch fails on reload, search cache intelligently
          const exactMatch = await caches.match(request, { ignoreSearch: true });
          if (exactMatch) return exactMatch;

          const pathname = url.pathname.replace(/\/$/, '') || '/';
          const withHtml = pathname.endsWith('.html') ? pathname : `${pathname}.html`;
          const withoutHtml = pathname.replace(/\.html$/, '') || '/';

          const matchHtml = await caches.match(withHtml, { ignoreSearch: true });
          if (matchHtml) return matchHtml;

          const matchClean = await caches.match(withoutHtml, { ignoreSearch: true });
          if (matchClean) return matchClean;

          const rootFallback = (await caches.match('/index.html')) || (await caches.match('/'));
          if (rootFallback) return rootFallback;

          return new Response(
            '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Kilimonet Agrisystems</title><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="/styles.css"></head><body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f4fbf4; color: #1b5e20;"><div style="text-align: center; max-width: 480px; padding: 2rem; background: #fff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);"><h2>Kilimonet Integrated Agrisystems</h2><p>This page is currently loading or you are offline. Please reload or return to the home page.</p><p><a href="/" style="display: inline-block; padding: 0.6rem 1.25rem; background: #2d6a4f; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600;">Go to Home</a> <button onclick="window.location.reload()" style="display: inline-block; padding: 0.6rem 1.25rem; background: #e8f5e9; color: #1b5e20; border: 1px solid #81c784; border-radius: 6px; font-weight: 600; cursor: pointer; margin-left: 0.5rem;">Reload</button></p></div></body></html>',
            {
              status: 200,
              headers: { 'Content-Type': 'text/html; charset=UTF-8' }
            }
          );
        })
    );
    return;
  }

  // Static Assets (CSS, JS, WebP, SVG, Fonts): Cache First, fallback to network
  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback to searching without subpath if asset was requested with subpath
          const fileName = url.pathname.split('/').pop();
          if (fileName) {
            return caches.match(`/${fileName}`, { ignoreSearch: true }).then((subMatch) => {
              if (subMatch) return subMatch;
              return new Response('', { status: 404, statusText: 'Not Found' });
            });
          }
          return new Response('', { status: 404, statusText: 'Not Found' });
        });
    })
  );
});
