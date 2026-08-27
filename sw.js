// SUBIR ESTA VERSION EN CADA CAMBIO DE data/*.js O index.html.
// El fetch es cache-first: sin bump, quien ya tenga la app instalada seguira
// viendo el contenido clinico antiguo indefinidamente.
const CACHE = 'urg-v46';
const ASSETS = [
  '/',
  '/index.html',
  '/data/cheatsheets.js',
  '/data/scales.js',
  '/data/formulas.js',
  '/data/protocols.js',
  '/data/drugs.js',
  '/data/infusions.js',
  '/data/intubacion.js',
  '/data/fichas.js',
  '/data/bibliografia.js',
  '/manifest.json',
  '/icon.svg',
  '/codigos/C01._Codi_infart_agut_de_miocardi_(IAM).pdf',
  '/codigos/C02._Codi_ictus.pdf',
  '/codigos/C03._Codi_persona_pacient_traumàtica_(PPT).pdf',
  '/codigos/C04._Codi_sèpsia.pdf',
  '/codigos/C05.Codi_risc_suïcidi.pdf',
  '/codigos/patrones iam nuevos/Ondas T hiperagudas.jpg',
  '/codigos/patrones iam nuevos/Patron de Winter.jpg',
  '/codigos/patrones iam nuevos/Patron Wellens.jpg',
  '/codigos/patrones iam nuevos/Patron Aslanger.jpg',
  '/codigos/patrones iam nuevos/Patron de remolino - swirl.jpg',
  '/codigos/patrones iam nuevos/OMI inferobasal - posterior.jpg',
  '/codigos/patrones iam nuevos/Northen OMI.jpg',
  '/codigos/patrones iam nuevos/Distorsion terminal QRS.jpg',
  '/codigos/patrones iam nuevos/Signo de la bandera de sudafrica.jpg',
  '/codigos/patrones iam nuevos/criterios Sgarbossa.jpg',
  '/codigos/patrones iam nuevos/nuevo bloqueo bifascicular.jpg'
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
