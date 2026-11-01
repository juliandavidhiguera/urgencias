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
  /* Ictus: tabla por peso de la ficha técnica de Metalyse 25 mg (CIMA FT_1000169007),
     que equivale a ≈0,25 mg/kg. Se reescribe siempre el bloque (idempotente). */
  const iIct = f.dosis.indexOf('\n• ICTUS ISQUÉMICO');
  if (iIct !== -1) f.dosis = f.dosis.slice(0, iIct);
  f.dosis = f.dosis.trim() + '\n• ICTUS ISQUÉMICO (dosis distinta, NO usar la tabla anterior): bolo IV único en 5–10 s según el peso (ficha técnica de Metalyse 25 mg; ≈0,25 mg por kilo, máximo 25 mg):\n   ◦ < 60 kg: 3.000 UI (15 mg, 3 ml).\n   ◦ De 60 a < 70 kg: 3.500 UI (17,5 mg, 3,5 ml).\n   ◦ De 70 a < 80 kg: 4.000 UI (20 mg, 4 ml).\n   ◦ De 80 a < 90 kg: 4.500 UI (22,5 mg, 4,5 ml).\n   ◦ ≥ 90 kg: 5.000 UI (25 mg, 5 ml).\n   ◦ Es la mitad de la dosis de SCACEST: si se usa el vial de 50 mg, desechar el sobrante antes de administrar. No usar la dosis alta de los ensayos antiguos (0,4 mg por kilo).\n   ◦ Más de 80 años: con precaución (más riesgo de hemorragia), sin ajuste de dosis.\n   ◦ Sin antiagregantes ni heparina IV en las 24 h siguientes (hasta la TC de control); si la heparina es imprescindible, máximo 10.000 UI/día SC. PA <180/105 mmHg durante y después.';
  /* Preparación y vía (ficha técnica 6.2, 6.3 y 6.6) */
  const PREP = 'Reconstituir el preparado con el disolvente de la jeringa y no agitarlo.';
  if (!f.dosis.includes('INCOMPATIBLE CON GLUCOSA')) {
    f.dosis = f.dosis.replace(PREP, 'Preparación: reconstituir SOLO con el agua para preparaciones inyectables de la jeringa del envase (10 ml en el vial de 50 mg; 5 ml en el de 25 mg), empujando el émbolo despacio para evitar espuma y girando suavemente, sin agitar: queda a 5 mg/ml. No diluir más.\n• INCOMPATIBLE CON GLUCOSA: usar una vía que solo haya llevado SF 0,9 % (si ha llevado glucosa, lavarla con SF 0,9 % o usar otra). No añadir otros fármacos a la jeringa ni a la vía.\n• Usar de inmediato (estable 8 h a 30 °C o 24 h a 2–8 °C). Desechar la solución sobrante.');
  }
  if (!f.presentacion.includes('25 mg')) {
    f.presentacion = f.presentacion.trim() + ' Vial de 5.000 UI (25 mg) con 5 ml de disolvente: solo autorizado para el ictus isquémico.';
  }
  /* SCACEST en ≥75 años: media dosis (STREAM-2, PMID 37439219; ACC/AHA 2025).
     TEP: fuera de ficha técnica (ESC 2019, AHA/ACC 2026); de elección, alteplasa. */
  const SCA = 'En SCACEST: idealmente en los primeros 10 min desde el ECG, junto con la doble antiagregación y la anticoagulación.';
  if (!f.dosis.includes('MEDIA DOSIS')) {
    f.dosis = f.dosis.replace(SCA, SCA + '\n• SCACEST en ≥75 años: MEDIA DOSIS del tramo de peso (STREAM-2): <60 kg 15 mg (3 ml) · 60–69 kg 17,5 mg (3,5 ml) · 70–79 kg 20 mg (4 ml) · 80–89 kg 22,5 mg (4,5 ml) · ≥90 kg 25 mg (5 ml).');
  }
  if (!f.dosis.includes('fuera de ficha técnica')) {
    f.dosis = f.dosis.replace('En TEP: en paciente inestable', 'En TEP: uso fuera de ficha técnica (ESC 2019, AHA/ACC 2026); el fibrinolítico de elección es la alteplasa, reservar la tenecteplasa si no la hay. Solo en paciente inestable');
    f.indicaciones = f.indicaciones.replace('o PCR por sospecha de TEP.', 'o PCR por sospecha de TEP (fuera de ficha técnica: de elección, alteplasa).');
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
{
  const prev = fichas.findIndex(x => x.id === 'alteplasa');
  if (prev !== -1) fichas.splice(prev, 1);
  const ficha = {
    file: 'Alteplasa.md',
    nombre: 'Alteplasa',
    altoRiesgo: true,
    fuente: 'https://cima.aemps.es/cima/publico/home.html',
    subtitulo: 'Ficha propia (no está en la guía del SEM): ficha técnica de Actilyse® y guías citadas',
    alerta: 'Las dosis de IAM, ictus y TEP son distintas: no intercambiarlas.',
    presentacion: 'Actilyse®: vial de polvo de 10, 20 o 50 mg + vial de agua para preparaciones inyectables (10, 20 o 50 ml). Reconstituido con todo el disolvente contiene 1 mg/ml (con la mitad del disolvente, 2 mg/ml).',
    propiedades: 'Fibrinolítico fibrinoespecífico (activador tisular del plasminógeno recombinante, rt-PA). Vida media de 4–5 min.',
    indicaciones: 'IAM con elevación del ST cuando la ICP primaria no es posible en plazo (en este escenario se prefiere la tenecteplasa en bolo). Ictus isquémico agudo en las primeras 4,5 h. TEP de alto riesgo con inestabilidad hemodinámica. Parada cardiaca por TEP sospechado o confirmado.',
    dosis: 'Preparación (ficha técnica 6.2, 6.3 y 6.6):\n' +
      '• Disolvente: SOLO el agua para preparaciones inyectables del envase, todo el volumen (queda a 1 mg/ml, 1 ml = 1 mg). Con la cánula de transferencia en los viales de 20 y 50 mg.\n' +
      '• Girar suavemente, NO agitar (hace espuma; si la hay, dejar reposar unos minutos).\n' +
      '• Si hace falta diluir más: SOLO con SF 0,9 %, hasta un mínimo de 0,2 mg/ml. NUNCA con glucosa ni con más agua (enturbia la solución).\n' +
      '• Vía exclusiva: no mezclar con ningún otro fármaco, tampoco heparina, ni en el frasco ni en el mismo catéter.\n' +
      '• Usar de inmediato (estable 8 h a 25 °C o 24 h a 2–8 °C). Desechar el sobrante.\n' +
      'Dosis y forma de administración (las dosis por peso se calculan con el peso real):\n' +
      '• IAM con elevación del ST, bolo: 15 mg IV directo en 1–2 min.\n' +
      '• IAM con elevación del ST, 1.ª perfusión: 0,75 mg/kg IV con bomba en 30 min, máximo 50 mg.\n' +
      '• IAM con elevación del ST, 2.ª perfusión: 0,5 mg/kg IV con bomba en 60 min, máximo 35 mg. Dosis total máxima 100 mg (≥67 kg: 15 + 50 + 35 mg).\n' +
      '• Ictus isquémico (<4,5 h), dosis total: 0,9 mg/kg IV, máximo 90 mg. Antes de empezar, retirar del vial y desechar lo que sobre por encima de la dosis calculada. El 10 % en bolo IV directo en 1 min y el 90 % restante con bomba en 60 min.\n' +
      '• TEP de alto riesgo (con pulso): 10 mg en bolo IV en 1–2 min + 90 mg con bomba en 2 h (100 mg en total). Con menos de 65 kg, la dosis total no debe superar 1,5 mg por kilo (ficha técnica).\n' +
      '• Parada cardiaca por TEP: 50 mg en bolo IV directo en 2 min; si no hay ROSC a los 15–30 min, segunda dosis de 50 mg (máximo total 100 mg). Mantener la RCP 60–90 min tras la lisis (ERC 2025; OUH 2026).\n' +
      '• Al terminar cualquier perfusión, pasar SF 0,9 % por la misma vía y al mismo ritmo para administrar el fármaco que queda en el sistema, sin darlo en bolo.',
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

/* 2026-11-01: adrenalina. Bradicardia: la ficha del SEM decía "2 - 10 microgramos/kg/min"
   (14-70 veces la dosis con 70 kg); ERC 2025, AHA 2025 y ACC/AHA/HRS (PMID 30586772) dan
   2-10 microgramos/min. Anafilaxia: repetición cada 5 min sin máximo y sin bolo IV fuera de la
   parada (ERC 2025, PMID 41117569). Se evita escribir "mg/kg" o "µg/kg/min" para que la
   calculadora de la ficha no ofrezca opciones falsas. Idempotente: reescribe los bloques. */
patch('Adrenalina', f => {
  const lineas = f.dosis.split('\n');
  const iBradi = lineas.findIndex(l => /^• Bradicardias/.test(l));
  if (iBradi < 0) { console.error('Adrenalina: no se encuentra el bloque de bradicardias'); process.exit(1); }
  const ADRENALINA_BRADI = [
    '• Bradicardias (sin respuesta a la atropina, como puente al marcapasos):',
    '   ◦ Perfusión continua 2 - 10 microgramos/min IV (dosis total por minuto, NO por kilo), ajustada a la respuesta (ERC 2025; AHA 2025; ACC/AHA/HRS).',
    '   ◦ Preparación: diluya 1 mg en 100 ml SF = 10 microgramos/ml (1/100.000). 2 - 10 microgramos/min = 12 - 60 ml/h.',
    '   ◦ Pediatría (ERC 2025): en la bradicardia con mala perfusión que requiere RCP, 10 microgramos por kilo IV/IO en bolo (máximo 1 mg), repetir cada 3 - 5 min.',
    '• Shock anafiláctico:',
    '   ◦ Vía intramuscular de elección: 0,5 mg i.m. (preferiblemente en cuádriceps, cuadrante externo). Repetir cada 5 min si no hay respuesta, sin número máximo de dosis (ERC 2025).',
    '   ◦ Refractaria (sin respuesta tras 2 dosis i.m. y sueroterapia): perfusión i.v. desde 0,1 microgramos por kilo y minuto, ajustada a la respuesta, con monitorización continua y personal experimentado (ver protocolo de Anafilaxia).',
    '   ◦ Bolo i.v.: el ERC 2025 no lo recomienda fuera de la parada (más sobredosis y eventos cardiovasculares que la vía i.m.). Solo en hipotensión extrema inminente a la parada (TAS <50 mmHg), personal experto puede dar bolos de 50 - 100 microgramos i.v.',
    '   ◦ Parada cardiaca por anafilaxia: SVA estándar, 1 mg i.v./i.o. cada 3 - 5 min.'
  ];
  f.dosis = lineas.slice(0, iBradi).concat(ADRENALINA_BRADI).join('\n');
});

const out = header + JSON.stringify(fichas, null, 2) + ';\n';
fs.writeFileSync(FICHAS_PATH, out, 'utf8');
console.log('data/fichas.js actualizado.');
