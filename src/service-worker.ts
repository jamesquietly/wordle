/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: string[];
};

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

// Clean up old caches
cleanupOutdatedCaches();

// Precaching all static assets
const assetsToCache = [
  ...build, // the built files and assets
  ...files, // everything in `static`
].map((asset) => ({
  url: asset,
  revision: null
}));

precacheAndRoute(assetsToCache);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    void self.skipWaiting();
  }
});

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(assetsToCache.map((asset) => asset.url));
    })
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  // Skip cross-origin requests, like those to Google Analytics
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(event.request);
        
        // Only cache GET requests and successful responses
        if (event.request.method === 'GET' && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          const cache = await caches.open(CACHE);
          await cache.put(event.request, responseToCache);
        }
        
        return networkResponse;
      } catch (error) {
        console.error('Fetch failed; returning offline page instead.', error);
        // You could return a custom offline page here
        return new Response('Network error', { status: 408, statusText: 'Network error' });
      }
    })()
  );
});
