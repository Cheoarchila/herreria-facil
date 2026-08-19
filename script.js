function saludar() {
  alert("¡Hola José! Tu app está conectada al Script.JS 🚀");
}

// Aquí registramos el service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker registrado'))
    .catch(error => console.log('Error al registrar el SW:', error));
}
