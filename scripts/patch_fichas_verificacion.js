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

/* 2026-11-01 (sesion 14): tenecteplasa en ictus (AHA/ASA 2026, ESO 2023), verificada
   con Vera + Perplexity. Idempotente. La presentacion pone «5 mg/ml» delante para que
   la calculadora de la ficha lea los mL; «0,4 mg por kilo» sin «mg/kg» para que el
   parser no lo tome como pauta. */
patch('Tenecteplasa', f => {
  f.presentacion = f.presentacion.replace('contiene 1.000 UI (5 mg)/ml.', 'contiene 5 mg/ml (1.000 UI por ml).');
  if (!/Ictus isquémico agudo/.test(f.indicaciones)) {
    f.indicaciones = f.indicaciones.trim() + ' Ictus isquémico agudo en las primeras 4,5 h, como alternativa a la alteplasa (AHA/ASA 2026; ESO 2023).';
  }
  if (!f.dosis.includes('ICTUS ISQUÉMICO')) {
    f.dosis = f.dosis.trim() + '\n• ICTUS ISQUÉMICO (dosis distinta, NO usar la tabla anterior): 0,25 mg/kg en bolo IV único en 5–10 s, máximo 25 mg (5.000 UI) = 0,05 ml/kg de la solución a 5 mg/ml, máximo 5 ml. Ejemplos: 60 kg → 15 mg (3 ml) · 70 kg → 17,5 mg (3,5 ml) · 80 kg → 20 mg (4 ml) · ≥100 kg → 25 mg (5 ml).\n   ◦ No usar la dosis alta de los ensayos antiguos (0,4 mg por kilo).\n   ◦ Si se usa el vial de 50 mg, desechar el sobrante: el error más grave es dar la dosis de SCACEST.\n   ◦ Sin antiagregantes ni anticoagulantes en las 24 h siguientes (hasta la TC de control). PA <180/105 mmHg durante y después.';
  }
  if (!f.contraindicaciones.startsWith('En el ictus')) {
    f.contraindicaciones = 'En el ictus se aplican los criterios de inclusión y exclusión de la trombólisis del Codi Ictus, no esta lista (que es la de SCACEST/TEP).\n' + f.contraindicaciones;
  }
});

/* 2026-11-01 (sesion 14): ficha propia de ALTEPLASA (no existe en la guia del SEM).
   Fuentes: ficha tecnica Actilyse (CIMA), ACC/AHA 2025 SCA (PMID 40013746),
   AHA/ASA 2026 ictus, ESC 2019 TEP (PMID 31504429), AHA/ACC 2026 TEP (PMID 41712677),
   ERC 2025 (PMID 41117569), OUH Medicines Information Leaflet ene 2026.
   Las dosis que no debe calcular la calculadora se escriben sin «mg/kg». Idempotente. */
if (!fichas.some(x => x.id === 'alteplasa')) {
  const ficha = {
    file: 'Alteplasa.md',
    nombre: 'Alteplasa',
    altoRiesgo: true,
    fuente: 'https://cima.aemps.es/cima/publico/home.html',
    subtitulo: 'Ficha propia (no está en la guía del SEM): ficha técnica de Actilyse® y guías citadas',
    alerta: 'Las dosis de IAM, ictus y TEP son distintas: no intercambiarlas.',
    presentacion: 'Actilyse®: vial de polvo de 10, 20 o 50 mg + disolvente. Una vez reconstituido, contiene 1 mg/ml.',
    propiedades: 'Fibrinolítico fibrinoespecífico (activador tisular del plasminógeno recombinante, rt-PA). Vida media de 4–5 min.',
    indicaciones: 'IAM con elevación del ST cuando la ICP primaria no es posible en plazo (en este escenario se prefiere la tenecteplasa en bolo). Ictus isquémico agudo en las primeras 4,5 h. TEP de alto riesgo con inestabilidad hemodinámica. Parada cardiaca por TEP sospechado o confirmado.',
    dosis: 'Reconstituir con el disolvente del envase (1 mg/ml) sin agitar. Las dosis por peso se calculan con el peso real.\n' +
      '• IAM con elevación del ST, bolo: 15 mg IV en 1–2 min.\n' +
      '• IAM con elevación del ST, 1.ª perfusión: 0,75 mg/kg IV en 30 min, máximo 50 mg.\n' +
      '• IAM con elevación del ST, 2.ª perfusión: 0,5 mg/kg IV en 60 min, máximo 35 mg. Dosis total máxima 100 mg (≥67 kg: 15 + 50 + 35 mg).\n' +
      '• Ictus isquémico (<4,5 h), dosis total: 0,9 mg/kg IV, máximo 90 mg. El 10 % en bolo en 1 min y el 90 % restante en perfusión de 60 min.\n' +
      '• TEP de alto riesgo (con pulso): 100 mg IV en 2 h, 10 mg en bolo en 1–2 min + 90 mg en perfusión. Con menos de 65 kg, la dosis total no debe superar 1,5 mg por kilo (ficha técnica).\n' +
      '• Parada cardiaca por TEP: 50 mg IV en bolo en 2 min; si no hay ROSC a los 15–30 min, segunda dosis de 50 mg (máximo total 100 mg). Mantener la RCP 60–90 min tras la lisis (ERC 2025; OUH 2026).',
    contraindicaciones: 'En el ictus se aplican los criterios de inclusión y exclusión de la trombólisis del Codi Ictus. En la parada cardiaca por TEP las contraindicaciones pueden no ser absolutas: decide quien lidera la reanimación.\n' +
      '• Absolutas (TEP, ESC 2019):\n   ◦ Ictus hemorrágico o de origen desconocido previo.\n   ◦ Ictus isquémico en los últimos 6 meses.\n   ◦ Neoplasia o malformación del SNC.\n   ◦ Traumatismo mayor, cirugía o TCE en las últimas 3 semanas.\n   ◦ Diátesis hemorrágica.\n   ◦ Sangrado activo.\n   ◦ Sospecha de disección aórtica.\n' +
      '• Relativas:\n   ◦ AIT en los últimos 6 meses.\n   ◦ Anticoagulación oral.\n   ◦ Embarazo o primera semana posparto.\n   ◦ Punción en un lugar no compresible.\n   ◦ RCP traumática.\n   ◦ PAS >180 mmHg refractaria.\n   ◦ Hepatopatía avanzada, endocarditis infecciosa, úlcera péptica activa.',
    efectosSecundarios: 'Hemorragia (incluida la intracraneal), angioedema orolingual (más frecuente con IECA), reacciones alérgicas, arritmias de reperfusión, embolia de colesterol.',
    observaciones: '• IAM: anticoagulación y doble antiagregación según el protocolo de SCACEST (Codi IAM).\n' +
      '• Ictus: sin antiagregantes ni anticoagulantes en las 24 h siguientes (hasta la TC de control). PA <180/105 mmHg durante y 24 h después. Alternativa: tenecteplasa en bolo (ver su ficha).\n' +
      '• TEP: seguir el protocolo local para la HNF durante la alteplasa (ESC 2019 permite mantenerla). Al terminar, TTPa cada 2–4 h y reiniciar sin bolo cuando el TTPa sea <2 × LSN.\n' +
      '• Parada por TEP: suspender la heparina durante la lisis; después, HNF sin bolo cuando el TTPa sea <2 × LSN.\n' +
      '• Vigilancia neurológica y de sangrado las primeras 24 h. Cefalea intensa, déficit neurológico o sangrado mayor → parar la alteplasa y la heparina y TC craneal urgente.',
    embarazo: 'Contraindicación relativa: valorar riesgo y beneficio según la gravedad.',
    lactancia: null,
    pediatria: null,
    id: 'alteplasa'
  };
  const i = fichas.findIndex(x => x.nombre === 'Amiodarona');
  fichas.splice(i === -1 ? fichas.length : i, 0, ficha);
  console.log('Añadida: Alteplasa');
}

const out = header + JSON.stringify(fichas, null, 2) + ';\n';
fs.writeFileSync(FICHAS_PATH, out, 'utf8');
console.log('data/fichas.js actualizado.');
