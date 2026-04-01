const CACHE_NAME = "bakery-regi-v1";
const urlsToCache = ["./", "./index.html"];

// インストール時にファイルをキャッシュ（保存）する
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

// ネットワークがない時はキャッシュから表示する
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
