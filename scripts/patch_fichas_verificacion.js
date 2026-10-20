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

/* 2026-10-20: dosis pediátrica de naloxona trasladada desde la fórmula f-naloxona
   (retirada a petición del usuario) para que la calcule la ficha. Pauta ERC PLS 2025
   (curso EPALS, decisión de la sesión 5). Vera señala que la AHA 2025 da 0,1 mg/kg:
   se deja escrito en Pediatría. Idempotente. */
patch('Naloxona', f => {
  const MARCA = '[Añadido: ERC PLS 2025';
  if (!f.dosis.includes(MARCA)) {
    const linea = '• Pediatría (ERC PLS 2025): 10 - 40 microgramos/kg IV, IO o IM, máx. 2 mg por dosis; dosis baja si sobredosis terapéutica (conservar la analgesia), alta si ingesta accidental. Repetir cada 2 - 3 min según respuesta. ' + MARCA + ', no presente en la ficha original]';
    const i = f.dosis.indexOf('Ajustar el ritmo de infusión');
    f.dosis = i === -1 ? f.dosis + '\n' + linea : f.dosis.slice(0, i) + linea + '\n' + f.dosis.slice(i);
  }
  f.pediatria = 'Bolo ERC PLS 2025: 10-40 microgramos/kg IV/IO/IM (máx. 2 mg por dosis), titulado a ventilación eficaz. AHA 2025 (Part 10, tabla 3) da otra pauta: 0,1 mg/kg como dosis inicial — discrepancia entre guías; la calculadora usa la del ERC. Intranasal: la dosis depende del dispositivo. Si hay resedación (opioide de acción prolongada): perfusión a 2/3 de la dosis eficaz de reversión por hora (AHA 2025); el curso EPALS 2025 da 10-160 microgramos/kg/h. [Añadido tras verificación clínica, no presente en la ficha original]';
});

const out = header + JSON.stringify(fichas, null, 2) + ';\n';
fs.writeFileSync(FICHAS_PATH, out, 'utf8');
console.log('data/fichas.js actualizado.');
