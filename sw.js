self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './script.js',
        './manifest.json',
        './icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return new Response("Recurso no disponible offline");
      });
    })
  );
});
