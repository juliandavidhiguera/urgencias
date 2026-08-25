// SUBIR ESTA VERSION EN CADA CAMBIO DE data/*.js O index.html.
// El fetch es cache-first: sin bump, quien ya tenga la app instalada seguira
// viendo el contenido clinico antiguo indefinidamente.
const CACHE = 'urg-v25';
const ASSETS = [
  '/',
  '/index.html',
  '/data/cheatsheets.js',
  '/data/scales.js',
  '/data/protocols.js',
  '/data/drugs.js',
  '/data/infusions.js',
  '/data/intubacion.js',
  '/data/fichas.js',
  '/data/bibliografia.js',
  '/manifest.json',
  '/icon.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
