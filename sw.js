// Estrategia NETWORK-FIRST: con conexion siempre se sirve la version publicada
// (revalidando la cache HTTP) y se actualiza la copia local; la cache solo se usa
// sin conexion. Ya no hace falta subir CACHE en cada cambio de data/*.js o
// index.html; subirla solo si cambia la lista ASSETS o este fichero.
const CACHE = 'urg-v64';
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
  '/data/pcr.js',
  '/data/fichas.js',
  '/data/bibliografia.js',
  '/manifest.json',
  '/icon.svg',
  '/registro-utstein.html',
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

let hadPrevious = false;

self.addEventListener('install', e => {
  hadPrevious = !!(self.registration && self.registration.active);
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
    .then(() => self.clients.claim())
    // Al relevar a un SW anterior, recargar las pestanas abiertas para que la
    // version nueva se vea sin esperar a la siguiente visita.
    .then(() => hadPrevious ? self.clients.matchAll({ type: 'window' }) : [])
    .then(list => list.forEach(c => c.navigate(c.url).catch(() => {})))
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req, { cache: 'no-cache' })
      .then(res => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true }).then(r =>
          r || (req.mode === 'navigate' ? caches.match('/index.html') : Response.error())
        )
      )
  );
});
