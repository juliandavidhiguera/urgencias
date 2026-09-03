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
