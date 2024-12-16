const currentCache = "current-cache-v1";

const files = [
  "/",
  "/index.html",
  "/images/image.png",

  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js",
  "https://unpkg.com/sweetalert/dist/sweetalert.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pouchdb/7.0.0/pouchdb.min.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(currentCache).then((cache) => {
      return cache.addAll(files);
    })
  );
  console.log("Service Worker Installed and Cache Files");
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== currentCache;
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  console.log("Service Worker Activated and Cache Files deleted");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
