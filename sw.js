// Se ejecuta cuando el service worker se instala
self.addEventListener('install', event => {
  console.log('Service Worker instalado');
});

// Se ejecuta en cada petición de la página
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
