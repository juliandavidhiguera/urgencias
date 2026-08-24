/* Parche puntual tras verificación clínica con Vera+Perplexity (2026-08-25).
   Añade SOLO contraindicaciones ausentes en la ficha original, verificadas
   con cita, sin tocar ninguna dosis existente. Ver conversación para fuentes. */
const fs = require('fs');
const path = require('path');
const FICHAS_PATH = path.join(__dirname, '..', 'data', 'fichas.js');

const raw = fs.readFileSync(FICHAS_PATH, 'utf8');
const jsonStart = raw.indexOf('[');
const header = raw.slice(0, jsonStart);
const jsonText = raw.slice(jsonStart, raw.lastIndexOf(']') + 1);
const fichas = JSON.parse(jsonText);

function patch(nombre, fn) {
  const f = fichas.find(x => x.nombre === nombre);
  if (!f) { console.error('NO ENCONTRADO:', nombre); process.exit(1); }
  fn(f);
  console.log('Parcheado:', nombre);
}

patch('Nitroglicerina', f => {
  f.contraindicaciones = 'Hipotensión sintomática o hipovolemia no corregida. Uso de inhibidores de la fosfodiesterasa-5 (sildenafilo, tadalafilo, vardenafilo) en las últimas 24h, o riociguat (riesgo de hipotensión grave). [Añadido tras verificación clínica, no presente en la ficha original]';
});

patch('Nitroprusiato sódico', f => {
  f.contraindicaciones = 'Uso concomitante con inhibidores de la fosfodiesterasa-5 o riociguat (riesgo de hipotensión grave). [Añadido tras verificación clínica, no presente en la ficha original]';
});

patch('Dobutamina', f => {
  f.contraindicaciones = 'Miocardiopatía hipertrófica obstructiva / estenosis subaórtica hipertrófica idiopática. [Añadido tras verificación clínica, no presente en la ficha original]';
});

patch('Labetalol', f => {
  if (!/asma|broncoespasmo/i.test(f.contraindicaciones || '')) {
    f.contraindicaciones = (f.contraindicaciones || '').trim() + ', asma o broncoespasmo activo';
  }
});

const out = header + JSON.stringify(fichas, null, 2) + ';\n';
fs.writeFileSync(FICHAS_PATH, out, 'utf8');
console.log('data/fichas.js actualizado.');
