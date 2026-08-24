/* Merges scripts/fichas_es_batch1..5.json into data/fichas.js (window.FICHAS). */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const parsed = require('./fichas_parsed.json');

let merged = [];
for (let i = 1; i <= 5; i++) {
  const p = path.join(__dirname, `fichas_es_batch${i}.json`);
  if (!fs.existsSync(p)) { console.error('MISSING', p); process.exit(1); }
  const batch = JSON.parse(fs.readFileSync(p, 'utf8'));
  merged = merged.concat(batch);
}

console.log('Total merged entries:', merged.length);
if (merged.length !== 75) console.error('WARNING: expected 75, got', merged.length);

// cross-check order/names against source
const problems = [];
merged.forEach((e, i) => {
  const src = parsed[i];
  if (!src) { problems.push(`index ${i}: no source entry`); return; }
  if (e.file !== src.file) problems.push(`index ${i}: file mismatch — got "${e.file}", expected "${src.file}"`);
});
if (problems.length) {
  console.error('PROBLEMS FOUND:');
  problems.forEach(p => console.error(' -', p));
  process.exit(1);
}
console.log('Order/file check: OK');

function slugify(name) {
  return name.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const seen = new Set();
merged.forEach(e => {
  e.id = slugify(e.nombre);
  let id = e.id, n = 2;
  while (seen.has(id)) { id = e.id + '-' + n++; }
  e.id = id;
  seen.add(id);
});

const header = `/* ==================================================================
   FICHAS — fichas técnicas de medicamentos (castellano)
   Fuente: Guies Clíniques SEM Catalunya (medicamentos/*.md), traducidas
   y limpiadas de artefactos de extracción PDF. Ver "fuente" por fármaco.
   Formato: { file, id, nombre, altoRiesgo, fuente, subtitulo, alerta,
             presentacion, propiedades, indicaciones, dosis,
             contraindicaciones, efectosSecundarios, observaciones,
             embarazo, lactancia, pediatria } — campos ausentes = null
   ================================================================== */
window.FICHAS = `;

const out = header + JSON.stringify(merged, null, 2) + ';\n';
fs.writeFileSync(path.join(ROOT, 'data', 'fichas.js'), out, 'utf8');
console.log('Written to data/fichas.js');
