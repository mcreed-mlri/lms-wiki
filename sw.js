// GitHub Actions replaces __BUILD_VERSION__ with the commit SHA during deploy.
// Local/file previews keep the fallback value.
const BUILD_VERSION = '__BUILD_VERSION__';
const CACHE_VERSION = `lace-wiki-${BUILD_VERSION}`;

const PRECACHE_URLS = [
  './',
  './index.html',
  './team-wiki.html',
  './june-2026-priority-tasks.html',
  './marlana.html',
  './brightspace-interactive-guide.html',
  './brightspace-map.html',
  './user-attributes.html',
  './mlri-architecture.html',
  './team/',
  './team/index.html',
  './styles.css',
  `./sidebar.js?v=${BUILD_VERSION}`,
  './favicon.svg',
  './icon.svg',
  './icon-maskable.svg',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML / navigations: stale-while-revalidate so updates land on the next visit.
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(
      caches.open(CACHE_VERSION).then(async (cache) => {
        const cached = await cache.match(req, { ignoreSearch: true });
        const networkFetch = fetch(req).then((res) => {
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        }).catch(() => cached);
        return cached || networkFetch;
      })
    );
    return;
  }

  // Same-origin static assets: cache-first.
  event.respondWith(
    caches.match(req, { ignoreSearch: false }).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
        }
        return res;
      });
    })
  );
});
