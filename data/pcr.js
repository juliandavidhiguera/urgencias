/* ==================================================================
   PARO CARDIO-RESPIRATORIO (PCR) — algoritmo de soporte vital
   avanzado (ALS/ACLS) intrahospitalario, adulto.
   Fuente: ERC Guidelines 2021 Adult Advanced Life Support (Perkins,
   Resuscitation 2021, PMID 33773824) + actualizaciones vigentes:
   AHA 2020 (PMID 33081530), ILCOR/AHA/ERC-ESICM Post-Resuscitation
   Care 2025 (PMID 41122842, PMID 41117575) y AHA Focused Update 2023
   sobre control de temperatura post-ROSC — verificación cruzada
   Vera + Perplexity el 2026-09-03. La temperatura objetivo post-RCE
   se actualizó de "hipotermia 32-36°C obligatoria para todos" a
   "prevención activa de fiebre (≤37,5°C), manteniendo una temperatura
   constante entre 32-37,5°C" (cambio más reciente identificado,
   AHA 2023 vs AHA 2020).
   Nota clínica: durante el PCR la vía aérea avanzada se coloca SIN
   fármacos de secuencia de intubación rápida (sedación/parálisis) —
   el paciente está inconsciente y sin reflejos protectores.
   ================================================================== */

window.PCR_EVENTOS = [
  { id: 'reconocimiento', label: 'Reconocimiento — inconsciente, sin respiración normal / sin pulso' },
  { id: 'activacion', label: 'Activación del código / aviso al equipo de RCP' },
  { id: 'llegada_equipo', label: 'Llegada del equipo de RCP' },
  { id: 'inicio_rcp', label: 'Inicio de RCP (compresiones torácicas)' },
  { id: 'primera_desfibrilacion', label: 'Primera desfibrilación' },
  { id: 'via_aerea_avanzada', label: 'Primer manejo avanzado de vía aérea (sin fármacos de SIR)' },
  { id: 'primera_adrenalina', label: 'Primera dosis de adrenalina' },
  { id: 'rce', label: 'Retorno de circulación espontánea (RCE)' },
  { id: 'suspension', label: 'Suspensión de maniobras (éxitus)' }
];

/* Fármacos del paro — dosis fija de adulto (no se calculan por peso).
   La recomendación de "próxima dosis" se deriva del ritmo y del
   número de descargas (ver calcPcr() en index.html), igual que en el
   algoritmo ALS por ciclos de 2 min. */
window.PCR_FARMACOS = [
  { id: 'adrenalina', nombre: 'Adrenalina', dosis: '1 mg IV/IO', unit: 'mg',
    ritmos: ['no_desfibrilable', 'desfibrilable'],
    nota: 'No desfibrilable: lo antes posible y luego cada 4 min · Desfibrilable: tras la 3ª y tras la 5ª descarga (junto con la amiodarona) y luego cada 4 min (cada 2 ciclos). Protocolo local cada 4 min (ERC 2025: 3–5 min).' },
  { id: 'amiodarona', nombre: 'Amiodarona', dosis: '300 mg IV/IO (1ª dosis) · 150 mg IV/IO (2ª dosis)', unit: 'mg',
    ritmos: ['desfibrilable'],
    nota: 'Solo en FV/TV sin pulso refractaria: 300 mg tras la 3ª descarga, 150 mg adicionales tras la 5ª descarga.' },
  { id: 'lidocaina', nombre: 'Lidocaína (alternativa a amiodarona)', dosis: '100 mg IV/IO (1ª dosis) · 50 mg IV/IO (2ª dosis)', unit: 'mg',
    ritmos: ['desfibrilable'],
    nota: 'Alternativa si no hay amiodarona disponible: 100 mg tras la 3ª descarga, 50 mg adicionales tras la 5ª descarga.' }
];

window.PCR_ENERGIA_DESFIB =
  'Bifásica rectilínea/exponencial truncada: primer choque ≥150 J, escalando en choques posteriores si el equipo lo permite. ' +
  'Bifásica "pulsed": 120–150 J en el primer choque. Si se desconoce el ajuste recomendado del desfibrilador, usar la energía máxima. ' +
  'Estrategia habitual: choque único + reanudación inmediata de RCP (no series de choques apilados, salvo paro monitorizado y presenciado con desfibrilador inmediato, p. ej. hemodinamia/UCI). ' +
  'FV/TV sin pulso refractaria (≥3 choques sin éxito): verificar posición/contacto de los parches y considerar cambiar el vector (antero-lateral → antero-posterior) antes de escalar a medidas de rescate. ' +
  'Desfibrilación doble simultánea (dos desfibriladores descargando a la vez): técnica de rescate descrita para FV/TV refractaria, pero su utilidad NO está establecida de forma firme (ERC 2021, PMID 33773824; AHA 2020: sin recomendación a favor ni en contra) — no es conducta de primera línea, documentar si se utiliza.';

/* 4H/4T del adulto, cada una como mini-flujograma: s = sospechar, c = confirmar, t = tratar (HTML),
   r = resumen corto para la lista de comprobación. ERC Guidelines 2025: Adult ALS (Soar, PMID 41117572),
   Special Circumstances (Lott, PMID 41117569) y Executive Summary (Greif, PMID 41117573); Vera 2026-11-07.
   Ecografía (POCUS) solo por alguien experto y sin alargar las pausas de las compresiones. */
window.PCR_4H4T = [
  { n: 'Hipoxia', g: 'H', r: 'O₂ 100 % y ventilación eficaz',
    s: 'Parada asfíctica (ahogamiento, obstrucción de la vía aérea, asma/EPOC), tubo desplazado o esofágico, desconexión del ventilador.',
    c: 'Expansión torácica, auscultación y capnografía con onda; SpO₂ o gasometría previas.',
    t: 'Ventilar con <b>O₂ al 100 %</b>. Si la bolsa-mascarilla no ventila bien → <b>vía aérea avanzada</b>. Comprobar la posición del tubo con capnografía.' },
  { n: 'Hipovolemia', g: 'H', r: 'cristaloide 10 ml/kg; hemorragia: hemoderivados',
    s: 'Hemorragia o trauma, sepsis, diarrea o vómitos, anafilaxia.',
    c: 'Historia; ecografía: corazón pequeño e hiperdinámico, cava colapsada.',
    t: 'Solo si la parada es por hipovolemia: <b>bolo de cristaloide isotónico 10 ml/kg</b>. Hemorragia mayor: <b>hemoderivados</b> y control de la hemorragia (compresión, torniquete, hemostáticos, cinturón pélvico).' },
  { n: 'Hiperpotasemia', g: 'H', r: 'CaCl₂ 10 % 10 ml + bicarbonato 50 mmol; insulina 10 U + glucosa 25 g',
    s: 'Insuficiencia renal o diálisis, fármacos (IECA, ARA-II, espironolactona…), rabdomiólisis; ECG previo con T picudas o QRS ancho.',
    c: '<b>Gasometría con K⁺</b> (punto de atención).',
    t: '<b>Cloruro cálcico 10 % 10 ml IV</b> + <b>bicarbonato sódico 50 mmol IV</b> (por vías distintas o lavando entre ambos).<br><b>Insulina rápida 10 U + glucosa 25 g IV</b>; si la glucemia previa era &lt;7 mmol/l (126 mg/dl), seguir con glucosa 10 % 50 ml/h durante 5 h.<br>Refractaria: <b>diálisis</b>; valorar E-RCP.' },
  { n: 'Hipopotasemia', g: 'H', r: 'K⁺ 1 mmol/kg (máx. 30 mmol)',
    s: 'Diuréticos, pérdidas digestivas; ECG previo con ondas U o QT largo.',
    c: 'Gasometría con K⁺ &lt;2,5 mmol/l.',
    t: '<b>K⁺ 1 mmol/kg (máx. 30 mmol)</b>: 2 mmol/min durante 10 min y el resto en 5–10 min; repetir hasta K⁺ &gt;2,5 mmol/l. Valorar magnesio si hay hipomagnesemia.' },
  { n: 'Hipoglucemia', g: 'H', r: 'glucosa 0,2 g/kg (2 ml/kg de G10 %)',
    s: 'Insulina o antidiabéticos, sepsis, alcohol.',
    c: 'Glucemia capilar o en la gasometría.',
    t: '<b>Glucosa 0,2 g/kg IV</b> (2 ml/kg de glucosa 10 %); volver a medir a los 5–10 min.' },
  { n: 'Hipotermia', g: 'H', r: '<30 °C: 1 adrenalina y máx. 3 descargas; 30–35 °C: adrenalina cada 8 min',
    s: 'Exposición al frío, inmersión.',
    c: '<b>Temperatura central</b> (esofágica si hay vía aérea avanzada).',
    t: '<b>&lt;30 °C</b>: una sola dosis de adrenalina (salvo ECLS inmediato) y <b>máx. 3 descargas</b>; si no funcionan, esperar a &gt;30 °C.<br><b>30–35 °C</b>: adrenalina <b>cada 8 min</b> (6–10) y 2.ª amiodarona a los 8 min.<br><b>&gt;35 °C</b>: algoritmo normal. Recalentar; valorar ECLS / E-RCP.' },
  { n: 'Hipertermia', g: 'H', r: 'enfriamiento externo inmediato',
    s: 'Golpe de calor, tóxicos o estimulantes, hipertermia maligna.',
    c: 'Temperatura central.',
    t: '<b>Enfriamiento externo inmediato</b> (es la única indicación de enfriar durante la RCP). Si es por fármacos, tratamiento o antídoto específico.' },
  { n: 'Trombosis pulmonar (TEP)', g: 'T', r: 'alteplasa 50 mg en bolo y RCP 60–90 min',
    s: 'Disnea súbita, dolor pleurítico, hemoptisis, síncope o signos de TVP antes de la parada; AESP como ritmo inicial; EtCO₂ &lt;13 mmHg con RCP de calidad.',
    c: 'Ecografía: VD dilatado con VI poco lleno, signo de la D, trombo en cavidades (la dilatación del VD sola no basta).',
    t: '<b>Fibrinólisis si el TEP es sospechado o confirmado</b>: <b>alteplasa 50 mg IV en bolo</b>, con o sin otros 50 mg a los 30 min (o 0,6–1 mg/kg, máx. 100 mg). <b>Seguir la RCP al menos 60–90 min</b>. Alternativas: embolectomía o trombectomía; valorar E-RCP.' },
  { n: 'Trombosis coronaria', g: 'T', r: 'tras el RCE: ECG y coronariografía',
    s: 'Dolor torácico o SCA antes de la parada, FV/TV, ECG previo con isquemia.',
    c: 'Historia y ECG previo; tras el RCE, ECG de 12 derivaciones.',
    t: 'Sin tratamiento específico durante la RCP. Tras el RCE: ECG y coronariografía/ICP. Si no hay RCE, valorar con el centro de referencia RCP mecánica para ICP o E-RCP.' },
  { n: 'Neumotórax a tensión', g: 'T', r: 'toracostomía (aguja solo si no hay medios)',
    s: 'Trauma, ventilación con presión positiva, asma grave; hipoventilación de un lado, desviación traqueal, ingurgitación yugular.',
    c: 'Clínica; ecografía (sin deslizamiento pleural) sin retrasar la descompresión.',
    t: '<b>Toracostomía</b> en el 4.º espacio intercostal, línea axilar media (<b>bilateral</b> en la parada traumática). <b>Aguja</b> solo si no hay competencia o material para la toracostomía.' },
  { n: 'Taponamiento cardiaco', g: 'T', r: 'pericardiocentesis; trauma: toracotomía',
    s: 'Trauma penetrante, poscirugía cardiaca, pericarditis, disección aórtica.',
    c: 'Ecografía: derrame pericárdico con colapso de cavidades.',
    t: '<b>Pericardiocentesis</b> (ecoguiada si es posible). Trauma: <b>toracotomía de reanimación</b>, mejor en ≤15 min desde la pérdida de signos de vida.' },
  { n: 'Tóxicos', g: 'T', r: 'antídoto, eliminación, RCP prolongada, E-RCP',
    s: 'Historia, escena, toxíndrome previo, ECG (QRS ancho, QT largo).',
    c: 'Gasometría, iones y niveles cuando se pueda; protocolo de intoxicaciones.',
    t: 'Seguridad del equipo; <b>antídoto específico</b>, descontaminación y eliminación (diálisis); <b>RCP prolongada</b> y valorar <b>E-RCP</b>. Emulsión lipídica según protocolo local (anestésicos locales).' }
];

/* Lista de comprobación del adulto: nombre — resumen (la usan el informe y el Utstein). */
window.PCR_CAUSAS_REVERSIBLES = window.PCR_4H4T;

window.PCR_POST_ROSC = [
  'ECG de 12 derivaciones — descartar causa isquémica (SCA)',
  'Oxigenación: SpO₂ objetivo 94–98% (evitar hipoxemia e hiperoxia)',
  'Ventilación: normocapnia, PaCO₂ 35–45 mmHg',
  'Temperatura: prevenir fiebre (≤37,5 °C), mantener temperatura constante 32–37,5 °C',
  'Hemodinámica: PAM objetivo ≥60–65 mmHg — soporte vasoactivo si precisa',
  'Buscar y tratar causa desencadenante (4H/4T)',
  'Traslado a UCI / cuidados post-paro protocolizados'
];

window.PCR_CALIDAD_RCP =
  'Compresiones 100–120/min, profundidad 5–6 cm con reexpansión completa · relación 30:2 hasta vía aérea avanzada, luego compresiones continuas + ventilación 10/min sin pausar · minimizar interrupciones (<5–10 s) · cambiar reanimador cada 2 min · capnografía con onda para confirmar vía aérea y monitorizar calidad (no usar solo el ETCO₂ para decidir parar RCP).';

/* ==================================================================
   PCR PEDIÁTRICA — SVAP (EPALS) por peso.
   Fuente: ERC Guidelines 2025 Paediatric Life Support (curso EPALS
   2025 v1.0 ES, ERC). Mismos ids de fármaco que el adulto
   ('adrenalina', 'amiodarona', 'lidocaina') para no romper la
   sincronización con el checklist ni el traspaso a registro-utstein.
   Las dosis se calculan con PESO REAL; sin peso no se muestra dosis.
   Pendiente: verificación con Vera antes de primer uso clínico.
   ================================================================== */

/* Peso estimado ERC/EPALS: 3 kg al nacer, 6 kg a los 6 m, 10 kg al año;
   1–12 años (edad + 4) × 2. Solo si no hay báscula/cinta de Broselow. */
window.PCR_PED_PESO_ESTIMADO = function (edadAnios) {
  if (!(edadAnios >= 0) || edadAnios > 12) return null;
  if (edadAnios < 1) {
    const m = edadAnios * 12;
    return m <= 6 ? 3 + m * 0.5 : 6 + (m - 6) * (4 / 6);
  }
  return (edadAnios + 4) * 2;
};

/* dosisPed(peso) devuelve el texto de dosis ya calculado (con máximos). */
window.PCR_FARMACOS_PED = [
  { id: 'adrenalina', nombre: 'Adrenalina', ritmos: ['no_desfibrilable', 'desfibrilable'],
    dosisPed: function (p) {
      const mg = Math.min(p * 0.01, 1);
      return _pcrPedFmt(mg, 2) + ' mg IV/IO (10 mcg/kg, máx. 1 mg) = ' + _pcrPedFmt(Math.min(p * 0.1, 10), 1) + ' mL de 1:10.000 (0,1 mg/mL)';
    },
    nota: 'No desfibrilable: lo antes posible y luego cada 4 min (cada 2 ciclos) · Desfibrilable: tras la 3ª y tras la 5ª descarga (junto con la amiodarona) y luego cada 4 min. Lavar con 2–10 mL SF. Al cambiar de rama del algoritmo, mantener el intervalo de 4 min.' },
  { id: 'amiodarona', nombre: 'Amiodarona', ritmos: ['desfibrilable'],
    dosisPed: function (p) {
      return _pcrPedFmt(Math.min(p * 5, 300), 0) + ' mg IV/IO tras la 3ª descarga (5 mg/kg, máx. 300) · ' +
        _pcrPedFmt(Math.min(p * 5, 150), 0) + ' mg tras la 5ª (5 mg/kg, máx. 150)';
    },
    nota: 'Solo FV/TV sin pulso refractaria. En bolo durante la PCR (con pulso: 5 mg/kg en 20–30 min).' },
  { id: 'lidocaina', nombre: 'Lidocaína (alternativa a amiodarona)', ritmos: ['desfibrilable'],
    dosisPed: function (p) {
      return _pcrPedFmt(Math.min(p * 1, 100), 1) + ' mg IV/IO (1 mg/kg, máx. 100 mg)';
    },
    nota: 'Alternativa si no hay amiodarona o por protocolo local. Mantenimiento 20–50 mcg/kg/min.' }
];

window.PCR_ENERGIA_DESFIB_PED = function (p) {
  if (!(p > 0)) return 'Introduce el peso para calcular la energía. 4 J/kg (máx. 200 J iniciales) · refractaria (más de 5 descargas, desde la 6ª): 6 → 8 J/kg (máx. 360 J).';
  const j4 = Math.min(Math.ceil(p * 4), 200), j6 = Math.min(Math.round(p * 6), 360), j8 = Math.min(Math.round(p * 8), 360);
  return 'Descargas iniciales 4 J/kg ≈ ' + j4 + ' J (redondear al alza al nivel disponible; máx. 200 J). ' +
    'FV/TVSP refractaria (más de 5 descargas, desde la 6ª): escalar a 6 J/kg ≈ ' + j6 + ' J → 8 J/kg ≈ ' + j8 + ' J (máx. 360 J) y revisar/cambiar posición de parches. ' +
    'Parches autoadhesivos: antero-posteriores si <25 kg; AP o antero-lateral si >25 kg. Palas de lactante si <10 kg. Cargar comprimiendo, pausa <5 s, retirar O₂ libre. ' +
    'DEA: con atenuador si <25 kg (<8 años); si no hay, DEA de adulto. ' +
    'Paro monitorizado y presenciado con parches puestos (UCIP/quirófano/hemodinámica): hasta 3 descargas consecutivas antes de iniciar compresiones.';
};

window.PCR_CALIDAD_RCP_PED =
  '5 ventilaciones de rescate iniciales · 15:2 con bolsa-mascarilla y O₂ 100% (2 personas) · compresiones 100–120/min, ≥1/3 del diámetro AP (máx. 6 cm), dos pulgares en lactante, una o dos manos en niño · ' +
  'con TET/DSG: compresiones continuas y ventilar a 25 (lactante) · 20 (>1 a) · 15 (>8 a) · 10 (>12 a) rpm; si fuga o duda volver a 15:2 · ' +
  'comprimir también si FC <60 con mala perfusión pese a ventilación adecuada · cambiar compresor cada 2 min · capnografía · PA invasiva si existe: PAD ≥25 mmHg (lactante) / ≥30 mmHg (niño) · no titular FiO₂ durante la RCP · valorar E-RCP precoz.';

/* 4H/4T pediátricas (ERC Guidelines 2025 PLS, Djakow, PMID 41117571; Vera 2026-11-07).
   t(p) recibe el peso real (0 si no hay) y devuelve el tratamiento con la dosis calculada.
   ERC PLS 2025: en la PCR por hiperpotasemia NO usar calcio ni bicarbonato. */
function _h4d(p, k, max, dec, u) { return p ? ' <b>= ' + _pcrPedFmt(Math.min(p * k, max == null ? Infinity : max), dec) + ' ' + u + '</b>' + (max != null && p * k > max ? ' (máx.)' : '') : ''; }
window.PCR_CAUSAS_REVERSIBLES_PED = [
  { n: 'Hipoxia', g: 'H', r: 'O₂ 100 %, vía aérea avanzada si la ventilación con bolsa no es eficaz',
    s: 'Causa respiratoria o asfíctica (la más frecuente en niños), obstrucción de la vía aérea, tubo desplazado u obstruido.',
    c: 'Expansión torácica, auscultación, capnografía con onda.',
    t: () => '<b>O₂ al 100 %</b>; vía aérea avanzada si la bolsa-mascarilla no ventila. Revisar fugas, distensión gástrica y respiraciones apiladas.' },
  { n: 'Hipovolemia', g: 'H', r: 'bolo 10 ml/kg de cristaloide; hemoderivados si hemorragia',
    s: 'Gastroenteritis o deshidratación, hemorragia o trauma, sepsis, anafilaxia.',
    c: 'Historia; ecografía si alguien experto (corazón vacío, cava colapsada).',
    t: p => '<b>Bolo de cristaloide isotónico 10 ml/kg</b>' + _h4d(p, 10, null, 0, 'ml') + '; hemoderivados si hay hemorragia mayor.' },
  { n: 'Hiperpotasemia', g: 'H', r: 'insulina 0,1 U/kg + G10 % 5 ml/kg + salbutamol IV; NO calcio ni bicarbonato',
    s: 'Insuficiencia renal, rabdomiólisis, lisis tumoral, fármacos; K⁺ &gt;6,5–7 mmol/l.',
    c: '<b>Gasometría con K⁺</b>.',
    t: p => '<b>Insulina rápida 0,1 U/kg</b> (máx. 10 U)' + _h4d(p, 0.1, 10, 1, 'U') + ' + <b>glucosa 10 % 5 ml/kg</b> (máx. 250 ml)' + _h4d(p, 5, 250, 0, 'ml') + ' en bolo IV (por vía central: G20 % 2,5 ml/kg o G50 % 1 ml/kg) + <b>salbutamol IV</b> 5 µg/kg' + _h4d(p, 5, null, 0, 'µg') + '. <b>NO calcio ni bicarbonato.</b> Valorar depuración extracorpórea.' },
  { n: 'Hipopotasemia', g: 'H', r: 'K⁺ 1 mmol/kg (máx. 30 mmol); magnesio si hipomagnesemia',
    s: 'Pérdidas digestivas, diuréticos; K⁺ &lt;2,5 mmol/l.',
    c: 'Gasometría con K⁺.',
    t: p => '<b>K⁺ 1 mmol/kg</b> (máx. 30 mmol)' + _h4d(p, 1, 30, 1, 'mmol') + ' a 2 mmol/min durante 10 min y el resto en 5–10 min; repetir hasta K⁺ &gt;2,5. <b>Sulfato de magnesio 30–50 mg/kg</b> IV si hay hipomagnesemia' + (p ? ' <b>= ' + _pcrPedFmt(p * 30, 0) + '–' + _pcrPedFmt(p * 50, 0) + ' mg</b>' : '') + '.' },
  { n: 'Hipoglucemia', g: 'H', r: 'glucosa 0,2 g/kg = 2 ml/kg de G10 %',
    s: 'Lactantes, ayuno prolongado, metabolopatías, diabetes, tóxicos.',
    c: 'Glucemia capilar o en la gasometría.',
    t: p => '<b>Glucosa 0,2 g/kg</b> = 2 ml/kg de glucosa 10 %' + _h4d(p, 2, null, 0, 'ml') + ' en bolo IV/IO; volver a medir a los 5–10 min y repetir si hace falta.' },
  { n: 'Hipotermia', g: 'H', r: '<30 °C: 1 adrenalina y máx. 3 descargas; 30–35 °C: adrenalina cada 8 min',
    s: 'Ahogamiento, exposición al frío, neonatos y lactantes.',
    c: 'Temperatura central.',
    t: () => '<b>&lt;30 °C</b>: una sola adrenalina (salvo ECLS inmediato) y <b>máx. 3 descargas</b>; si no funcionan, esperar a &gt;30 °C.<br><b>30–35 °C</b>: adrenalina <b>cada 8 min</b> (6–10), 2.ª amiodarona a los 8 min, descargas cada 2 min.<br><b>&gt;35 °C</b>: algoritmo normal. Recalentar; valorar ECLS.' },
  { n: 'Hipertermia', g: 'H', r: 'enfriamiento externo inmediato',
    s: 'Golpe de calor, tóxicos.',
    c: 'Temperatura central.',
    t: () => '<b>Enfriamiento externo inmediato</b>; tratamiento específico si es por tóxicos.' },
  { n: 'Trombosis', g: 'T', r: 'valorar trombólisis',
    s: 'Catéter venoso central, cardiopatía, cáncer, síndrome nefrótico.',
    c: 'Ecografía si alguien experto.',
    t: () => '<b>Valorar trombólisis</b> (la ERC PLS 2025 no da dosis pediátrica: consultar con UCIP / protocolo local).' },
  { n: 'Neumotórax a tensión', g: 'T', r: 'toracocentesis con aguja / toracostomía (trauma)',
    s: 'Trauma, ventilación con presión positiva, asma grave; hipoventilación de un lado.',
    c: 'Clínica; ecografía sin retrasar la descompresión.',
    t: () => '<b>Toracocentesis con aguja</b> o <b>toracostomía</b> (de elección en el trauma).' },
  { n: 'Taponamiento cardiaco', g: 'T', r: 'pericardiocentesis; trauma: toracotomía',
    s: 'Trauma, poscirugía cardiaca.',
    c: 'Ecografía: derrame pericárdico.',
    t: () => '<b>Pericardiocentesis</b>; en el trauma, <b>toracotomía</b>.' },
  { n: 'Tóxicos', g: 'T', r: 'antídoto, descontaminación, eliminación; valorar E-RCP',
    s: 'Historia, escena, toxíndrome.',
    c: 'Gasometría, iones, niveles.',
    t: () => '<b>Antídoto específico</b>, descontaminación y eliminación; valorar <b>E-RCP</b>. Ver el algoritmo SEUP de exposición a tóxicos.' }
];

window.PCR_POST_ROSC_PED = [
  'SpO₂ 94–98% (FiO₂ alta hasta tener SpO₂ fiable; mantener FiO₂ alta en CO/cianuro/anemia grave)',
  'Normocapnia con PaCO₂ (no usar EtCO₂ como sustituto sin correlación)',
  'PA sistólica y PAM > percentil 10 para la edad (hipotensión <p5, aunque sea breve, empeora el pronóstico)',
  'Temperatura ≤37,5 °C; no recalentar activamente si >32 °C',
  'Normoglucemia (evitar <70 mg/dL e hiperglucemia, sin control estricto)',
  'ECG continuo · lactato seriado · inotrópicos/vasopresores si no se alcanzan objetivos con precarga optimizada',
  'Tratar convulsiones (sin profilaxis) · sedoanalgesia en perfusión si no despierta en 10 min',
  'Líquidos de mantenimiento al 70–90% de necesidades basales (SIADH) · sonda gástrica',
  'Transferencia estructurada (RSVP / SAVR) a UCIP · no extubar antes del traslado'
];

window.PCR_PED_RANGOS_NOTA =
  'Tubo con balón: edad/4 + 3,5 mm (preparar ±0,5) · profundidad oral 12 + edad/2 cm, nasal 15 + edad/2 cm · volemia ~80 mL/kg.';

function _pcrPedFmt(n, d) {
  const m = Math.pow(10, d);
  return (Math.round(n * m) / m).toLocaleString('es-ES');
}
