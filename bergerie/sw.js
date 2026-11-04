/* Ancienne adresse : ce service worker vide les anciens caches de la bergerie (v1 à v8) et se désinstalle.
   Le stockage est partagé par toutes les applis de vincentvaysset.github.io : ne jamais effacer les autres. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return /^bergerie-v[1-8]$/.test(k); }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.registration.unregister(); }));
});
