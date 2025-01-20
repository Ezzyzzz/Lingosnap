const cacheName = "lingosnap-cache-v1";
const assets = [
    "./",
    "./index.html",
    "./styles.css",
    "./app.js",
    "./sunset.png",
    "./icon-192.png",
    "./icon-512.png"
];

// Install the service worker and cache assets
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(assets);
        })
    );
});

// Fetch resources from the cache
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Activate the service worker and clear old caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
