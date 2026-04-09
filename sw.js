const CACHE_NAME = 'bakery-regi-v7'; // 以前より新しい番号にする

const urlsToCache = [
  './',
  './index.html'
];

// インストール時にファイルを保存する
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ネットワークがない時は保存データから表示する
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
