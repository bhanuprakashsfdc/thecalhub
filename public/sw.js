const CACHE_VERSION = 'v2';
const STATIC_CACHE = `thecalhub-static-${CACHE_VERSION}`;
const PAGE_CACHE = `thecalhub-pages-${CACHE_VERSION}`;
const KEEP_CACHES = [STATIC_CACHE, PAGE_CACHE];
const OFFLINE_URLS = ['/', '/index.html'];
const NEVER_CACHE_HOSTS = [
  'googletagmanager.com',
  'google-analytics.com',
  'adservice.google.com',
  'doubleclick.net',
  'googlesyndication.com',
  'pagead2.googlesyndication.com',
  'adsbygoogle.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      Promise.allSettled(OFFLINE_URLS.map((url) => cache.add(url)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name.startsWith('thecalhub-') && !KEEP_CACHES.includes(name))
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

function shouldNeverCache(url) {
  return NEVER_CACHE_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`) || url.pathname.endsWith(host));
}

function isHashedAsset(url) {
  return url.origin === self.location.origin && url.pathname.startsWith('/assets/');
}

function cachePut(request, response) {
  if (!response || response.status !== 200 || response.type === 'opaque') return;
  const copy = response.clone();
  caches.open(isHashedAsset(new URL(request.url)) ? STATIC_CACHE : PAGE_CACHE)
    .then((cache) => cache.put(request, copy));
}

function networkFirst(event) {
  const { request } = event;
  event.respondWith(
    fetch(request)
      .then((response) => {
        cachePut(request, response);
        return response;
      })
      .catch(() =>
        caches.match(request).then((cached) => {
          if (cached) return cached;
          return caches.match('/index.html').then((page) => page || caches.match('/'));
        })
      )
  );
}

function cacheFirst(event) {
  const { request } = event;
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        cachePut(request, response);
        return response;
      });
    })
  );
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (shouldNeverCache(url)) return;
  if (url.origin !== self.location.origin) return;
  if (url.pathname === '/sw.js') return;

  if (request.mode === 'navigate' || request.destination === 'document') {
    networkFirst(event);
    return;
  }

  if (isHashedAsset(url)) {
    cacheFirst(event);
    return;
  }

  networkFirst(event);
});
