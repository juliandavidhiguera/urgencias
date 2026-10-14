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
    nota: 'No desfibrilable: lo antes posible y luego cada 3–5 min · Desfibrilable: tras la 3ª descarga y luego cada 3–5 min (≈ cada 2 ciclos).' },
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

window.PCR_CAUSAS_REVERSIBLES = [
  'Hipoxia', 'Hipovolemia', 'Hipo/hiperpotasemia y trastornos metabólicos', 'Hipotermia',
  'Trombosis coronaria o pulmonar (considerar trombólisis si TEP y prolongar RCP 60–90 min)',
  'Neumotórax a tensión', 'Taponamiento cardiaco', 'Tóxicos'
];

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
    nota: 'No desfibrilable: lo antes posible y luego cada 4 min (cada 2 ciclos) · Desfibrilable: tras la 3ª descarga y luego cada 4 min. Lavar con 2–10 mL SF. Al cambiar de rama del algoritmo, mantener el intervalo de 4 min.' },
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
  if (!(p > 0)) return 'Introduce el peso para calcular la energía. 4 J/kg (máx. 200 J iniciales) · refractaria desde la 5ª descarga: 6 → 8 J/kg (máx. 360 J).';
  const j4 = Math.min(Math.ceil(p * 4), 200), j6 = Math.min(Math.round(p * 6), 360), j8 = Math.min(Math.round(p * 8), 360);
  return 'Descargas iniciales 4 J/kg ≈ ' + j4 + ' J (redondear al alza al nivel disponible; máx. 200 J). ' +
    'FV/TVSP refractaria (desde la 5ª descarga): escalar a 6 J/kg ≈ ' + j6 + ' J → 8 J/kg ≈ ' + j8 + ' J (máx. 360 J) y revisar/cambiar posición de parches. ' +
    'Parches autoadhesivos: antero-posteriores si <25 kg; AP o antero-lateral si >25 kg. Palas de lactante si <10 kg. Cargar comprimiendo, pausa <5 s, retirar O₂ libre. ' +
    'DEA: con atenuador si <25 kg (<8 años); si no hay, DEA de adulto. ' +
    'Paro monitorizado y presenciado con parches puestos (UCIP/quirófano/hemodinámica): hasta 3 descargas consecutivas antes de iniciar compresiones.';
};

window.PCR_CALIDAD_RCP_PED =
  '5 ventilaciones de rescate iniciales · 15:2 con bolsa-mascarilla y O₂ 100% (2 personas) · compresiones 100–120/min, ≥1/3 del diámetro AP (máx. 6 cm), dos pulgares en lactante, una o dos manos en niño · ' +
  'con TET/DSG: compresiones continuas y ventilar a 25 (lactante) · 20 (>1 a) · 15 (>8 a) · 10 (>12 a) rpm; si fuga o duda volver a 15:2 · ' +
  'comprimir también si FC <60 con mala perfusión pese a ventilación adecuada · cambiar compresor cada 2 min · capnografía · PA invasiva si existe: PAD ≥25 mmHg (lactante) / ≥30 mmHg (niño) · no titular FiO₂ durante la RCP · valorar E-RCP precoz.';

window.PCR_CAUSAS_REVERSIBLES_PED = [
  'Hipoxia — O₂ 100%, vía aérea avanzada si VBM inadecuada; revisar fugas, distensión, respiraciones apiladas',
  'Hipovolemia — bolo 10 mL/kg cristaloide o hemoderivados si hemorragia',
  'Hiperpotasemia >6,5–7 — insulina rápida 0,1 U/kg (máx. 10) + G10% 5 mL/kg (máx. 250) en bolo + salbutamol IV 5 mcg/kg; NO calcio ni bicarbonato en PCR',
  'Hipopotasemia <2,5 — KCl 1 mmol/kg (máx. 30) a 2 mmol/min 10 min, resto en 5–10 min; valorar Mg',
  'Hipoglucemia — 0,2 g/kg = 2 mL/kg G10%, recontrolar a 5–10 min',
  'Hipotermia — <30 °C: 1 sola adrenalina y máx. 3 descargas · 30–35 °C: adrenalina cada 8 min, 2ª amiodarona a los 8 min · >35 °C: algoritmo normal · recalentar / ECMO',
  'Neumotórax a tensión — toracocentesis con aguja / toracostomía (trauma)',
  'Taponamiento cardiaco — pericardiocentesis / toracotomía (trauma)',
  'Trombosis — valorar trombólisis (catéter central, cardiopatía, cáncer, nefrótico)',
  'Tóxicos — antídoto, descontaminación, eliminación; considerar E-RCP'
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
