const CACHE_NAME = "bakery-regi-v10"; // 番号を一気に飛ばしてv10にします

const urlsToCache = ["./", "./index.html"];

// インストール時
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
  self.skipWaiting(); // 新しいSWをすぐに有効化させる
});

// ★ここが重要：古いキャッシュを削除する
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("古いキャッシュを削除しました:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

// 読み込み時
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
