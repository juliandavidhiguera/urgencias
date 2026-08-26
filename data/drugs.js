/* ==================================================================
   DRUGS — fármacos de urgencias con calculadora de dosis por peso
   Referencia: guías SEM Gencat / protocolos estándar de urgencias
   Formato: { group, badge, tag, drugs: [{ name, dilution, doseRange,
             doseCalc(peso) -> {min,max,unit}, extra(peso) -> string,
             alerts[], ficha }] }
   ficha: nombre del archivo en medicamentos/ con la ficha oficial del
   fármaco (campo "file" en data/fichas.js) — omitido si no existe ficha.
   infusionRef: nombre exacto en window.INFUSIONS (data/infusions.js) —
   muestra un botón que abre la calculadora de Perfusión IV con ese
   fármaco ya seleccionado. Omitido si el fármaco no se da en perfusión
   o no tiene una entrada equivalente en INFUSIONS.
   ================================================================== */
window.DRUGS = [

{group: 'Drogas vasoactivas', badge: 'red', tag: 'UCI', drugs: [
  {
    name: 'Noradrenalina',
    dilution: '4 mg (4 amp) en 250 mL SG5% = 16 µg/mL',
    doseRange: '0.05–1 µg/kg/min',
    doseCalc: function(peso) {
      return {
        min: (0.05 * peso * 60 / 16).toFixed(1),
        max: (1 * peso * 60 / 16).toFixed(1),
        unit: 'mL/h'
      };
    },
    alerts: ['Vía central de elección', 'Si se usa periférica de forma temporal: vena gruesa y proximal, comprobar reflujo y vigilar el punto de punción', 'Extravasación: riesgo de necrosis. Infiltrar fentolamina 5–10 mg en 10–15 mL de SSF cuanto antes', 'Monitorizar TA, preferiblemente invasiva'], src: 'ASHP Drug Compendium (Norepinephrine)',
    ficha: 'Noradrenalina.md', infusionRef: 'Noradrenalina'
  },
  {
    name: 'Dopamina',
    dilution: '200 mg en 250 mL SG5% = 800 µg/mL',
    doseRange: '2–20 µg/kg/min', alerts: ['Extravasación: riesgo de necrosis. Infiltrar fentolamina cuanto antes', 'Taquiarritmias, más frecuentes que con noradrenalina'],
    doseCalc: function(peso) {
      return {
        min: (2 * peso * 60 / 800).toFixed(1),
        max: (20 * peso * 60 / 800).toFixed(1),
        unit: 'mL/h'
      };
    },
    infusionRef: 'Dopamina'
  },
  {
    name: 'Dobutamina',
    dilution: '250 mg en 250 mL SG5% = 1000 µg/mL',
    doseRange: '2.5–20 µg/kg/min', alerts: ['Puede bajar la TA por vasodilatación: no usar como vasopresor', 'Taquicardia y arritmias'],
    doseCalc: function(peso) {
      return {
        min: (2.5 * peso * 60 / 1000).toFixed(1),
        max: (20 * peso * 60 / 1000).toFixed(1),
        unit: 'mL/h'
      };
    },
    ficha: 'Dobutamina.md', infusionRef: 'Dobutamina'
  }
]},

{group: 'Sedación / Analgesia', badge: 'amber', tag: 'Urgente', drugs: [
  {
    name: 'Midazolam',
    dilution: '15 mg en 50 mL SSF = 0.3 mg/mL',
    doseRange: 'Bolo 0.02–0.1 mg/kg · Perfusión 0.02–0.1 mg/kg/h', alerts: ['Depresión respiratoria, potenciada al combinarse con opioides', 'Acumulación en ancianos, insuficiencia hepática y perfusiones prolongadas'],
    doseCalc: function(peso) {
      return {
        min: (0.02 * peso).toFixed(1),
        max: (0.1 * peso).toFixed(1),
        unit: 'mg (bolo)'
      };
    },
    extra: function(peso) {
      var min = (0.02 * peso / 0.3).toFixed(1);
      var max = (0.1 * peso / 0.3).toFixed(1);
      return 'Perfusión: ' + min + '–' + max + ' mL/h (dilución 0,3 mg/mL)';
    },
    ficha: 'Midazolam.md', infusionRef: 'Midazolam'
  },
  {
    name: 'Fentanilo',
    dilution: '0.5 mg en 50 mL SSF = 10 µg/mL',
    doseRange: 'Bolo 1–2 µg/kg · Perfusión 0.5–3 µg/kg/h', alerts: ['Depresión respiratoria', 'Rigidez torácica con bolos rápidos o dosis altas: puede impedir la ventilación'],
    doseCalc: function(peso) {
      return {
        min: (1 * peso).toFixed(1),
        max: (2 * peso).toFixed(1),
        unit: 'µg (bolo)'
      };
    },
    extra: function(peso) {
      var min = (0.5 * peso / 10).toFixed(1);
      var max = (3 * peso / 10).toFixed(1);
      return 'Perfusión: ' + min + '–' + max + ' mL/h (dilución 10 µg/mL)';
    },
    ficha: 'Fentanil.md', infusionRef: 'Fentanilo'
  },
  {
    name: 'Ketamina',
    dilution: 'Sin diluir o diluida según vía',
    doseRange: 'Disociativa 1–2 mg/kg IV · Analgésica subdisociativa 0.1–0.3 mg/kg IV', alerts: ['Aumenta secreciones y puede provocar laringoespasmo', 'Reacciones de emergencia al despertar', 'Precaución en cardiopatía isquémica y en HTA mal controlada'],
    doseCalc: function(peso) {
      return {
        min: (1 * peso).toFixed(1),
        max: (2 * peso).toFixed(1),
        unit: 'mg (dosis disociativa)'
      };
    },
    ficha: 'Ketamina.md'
  },
  {
    name: 'Propofol',
    dilution: '1% = 10 mg/mL',
    doseRange: 'Inducción 1.5–2.5 mg/kg · Mantenimiento 4–12 mg/kg/h', alerts: ['Hipotensión y apnea, sobre todo en bolo rápido, ancianos y ASA III-IV', 'Preparar manejo inmediato de vía aérea antes de administrarlo', 'Perfusión prolongada o a dosis altas: síndrome por infusión de propofol (acidosis, rabdomiólisis, arritmias)', 'No tiene antídoto: el manejo es de soporte'], src: 'ASHP Drug Compendium (Propofol)',
    doseCalc: function(peso) {
      return {
        min: (1.5 * peso).toFixed(1),
        max: (2.5 * peso).toFixed(1),
        unit: 'mg (inducción)'
      };
    },
    extra: function(peso) {
      var min = (4 * peso / 10).toFixed(1);
      var max = (12 * peso / 10).toFixed(1);
      return 'Mantenimiento: ' + min + '–' + max + ' mL/h (dilución 10 mg/mL)';
    },
    ficha: 'Propofol.md', infusionRef: 'Propofol'
  }
]},

{group: 'Antiarrítmicos', badge: 'amber', tag: 'Urgente', drugs: [
  {
    name: 'Amiodarona',
    dilution: 'Carga: 300 mg en 100 mL SG5% en 20–60 min',
    doseRange: 'Carga 300 mg · Mantenimiento 900 mg/24h',
    alerts: ['Hipotensión en bolo rápido', 'NO diluir en suero salino: usar glucosado al 5%', 'Flebitis frecuente: preferir vía central; evitar perfusión periférica >24 h', 'Evitar en FA preexcitada / WPW'], src: 'ESC 2024 FA · PMID 39210723 · AHA ALS 2025 · PMID 41122884',
    ficha: 'Amiodarona.md', infusionRef: 'Amiodarona (mantenimiento)'
  },
  {
    name: 'Adenosina',
    dilution: 'IV rápido en bolo, seguido de flush de SSF',
    doseRange: '6 mg → 12 mg → 12 mg (dosis fija, sin ajuste por peso)', alerts: ['CONTRAINDICADA en asma o broncoespasmo grave', 'Produce pausa sinusal o asistolia transitoria: monitorización ECG y desfibrilador a mano', 'Por vía central el efecto es mucho mayor: empezar por 1–3 mg', 'El dipiridamol potencia su efecto; las metilxantinas lo antagonizan'], src: 'AHA ALS 2025 · PMID 41122884 · EHRA 2025 · PMID 40165484',
    ficha: 'Adenosina.md'
  },
  {
    name: 'Verapamilo',
    dilution: 'IV directo o diluido',
    doseRange: '2.5–5 mg IV en 2 min, repetir 5–10 mg a los 15 min si es necesario', alerts: ['CONTRAINDICADO en FA preexcitada / WPW: acelera la vía accesoria y puede precipitar FV', 'Contraindicado si FEVI ≤40% o IC sintomática', 'No administrar próximo a betabloqueante IV: bradicardia grave, bloqueo AV e hipotensión'], src: 'ESC 2024 FA · PMID 39210723 · AHA ALS 2025 · PMID 41122884',
    ficha: 'Verapamil.md'
  },
  {
    name: 'Flecainida',
    dilution: 'IV en 10 min',
    doseRange: '2 mg/kg IV (máx 150 mg)', alerts: ['CONTRAINDICADA en cardiopatía isquémica o estructural: aumento de mortalidad (CAST)', 'Puede convertir la FA en flutter con conducción 1:1. No usar para cardiovertir un flutter', 'Suspender la infusión si el QRS se ensancha >25% o aparece bloqueo de rama'], src: 'ESC 2024 FA · PMID 39210723 · EHRA 2025 antiarritmicos · PMID 40159403 · ACC/AHA 2023 · PMID 38033089',
    doseCalc: function(peso) {
      var d = Math.min(2 * peso, 150).toFixed(1);
      return { min: d, max: d, unit: 'mg' };
    },
    ficha: 'Flecaïnida.md'
  }
]},

{group: 'Urgencias', badge: 'red', tag: 'Crítico', drugs: [
  {
    name: 'Adrenalina',
    dilution: '1 mg/1 mL (1:1000) ampolla estándar',
    doseRange: 'PCR: 1 mg IV cada 3–5 min · Anafilaxia: 0.01 mg/kg IM (máx 0.5 mg) · Perfusión: 0.01–0.5 µg/kg/min', alerts: ['DOS AMPOLLAS DISTINTAS: 1 mg/mL (1:1000) es la de uso IM; 0,1 mg/mL (1:10.000) la de uso IV/IO', 'No dar bolo IV fuera de la parada: más sobredosis y más eventos cardiovasculares que por vía IM', 'En anafilaxia refractaria, perfusión IV titulada (0,1 µg/kg/min), no bolo'], src: 'ERC 2025 Special Circumstances · PMID 41117569 · Dodd 2021 · PMID 33895231',
    doseCalc: function(peso) {
      var d = Math.min(0.01 * peso, 0.5).toFixed(2);
      return { min: d, max: d, unit: 'mg IM (anafilaxia)' };
    },
    ficha: 'Adrenalina.md', infusionRef: 'Adrenalina (perfusión)'
  },
  {
    name: 'Atropina',
    dilution: 'IV directo',
    doseRange: 'Bradicardia: 0.5 mg IV cada 3–5 min (máx 3 mg) · Organofosforados: 1–2 mg IV doblando cada 5 min hasta secar secreciones (sin techo de dosis)', alerts: ['Dosis <0,5 mg pueden producir bradicardia paradójica', 'En bloqueo AV de alto grado o infranodal suele ser ineficaz: preparar marcapasos', 'En organofosforados NO hay techo de dosis: objetivo clínico (pecho seco), no una cifra fija'], src: 'AHA 2025 Special Circumstances · PMID 41122889 · J Med Toxicol 2012 · PMID 22351300',
    ficha: 'Atropina.md'
  },
  {
    name: 'Bicarbonato sódico 1M',
    dilution: '1M = 1 mEq/mL',
    doseRange: '1 mEq/kg IV', alerts: ['PRECIPITA con el calcio: no administrar por la misma línea ni en Y', 'Extravasación: riesgo de necrosis tisular'],
    doseCalc: function(peso) {
      var d = (peso * 1).toFixed(1);
      return { min: d, max: d, unit: 'mL' };
    },
    ficha: 'Bicarbonat sòdic.md'
  },
  {
    name: 'Gluconato cálcico 10%',
    dilution: '10% = 100 mg/mL · ~9 mg (0,46 mEq) Ca²⁺ elemental/mL',
    doseRange: 'Hiperkalemia con cambios ECG: 30 mL IV en 5–10 min · Hipocalcemia: 10–20 mL',
    alerts: ['Sal de elección si solo hay VÍA PERIFÉRICA: menos flebotóxico que el cloruro',
             '30 mL de gluconato equivalen en calcio elemental a 10 mL de cloruro: NO son intercambiables mL a mL',
             'PRECIPITA con el bicarbonato: líneas separadas o lavado abundante entre ambos',
             'Repetir a los 5 min si persisten los cambios en el ECG'],
    src: 'ERC 2025 Executive Summary · PMID 41117573 · Bianchi 2019 · PMID 31119681',
    ficha: 'Gluconat de calci.md'
  },
  {
    name: 'Cloruro cálcico 10%',
    dilution: '10% = 100 mg/mL · ~27 mg (1,36 mEq) Ca²⁺ elemental/mL',
    doseRange: 'Hiperkalemia con cambios ECG: 10 mL IV en 2–5 min',
    alerts: ['Preferible con VÍA CENTRAL o en parada: aporta 3 veces más Ca²⁺ por mL que el gluconato',
             'VESICANTE: causa necrosis si extravasa. Evitar por vía periférica si hay alternativa',
             'PRECIPITA con el bicarbonato: líneas separadas o lavado abundante entre ambos',
             'El 10% no aporta el mismo calcio elemental en todos los países y fabricantes: ante la duda, prescribir en mmol o mEq'],
    src: 'ERC 2021 · PMID 33773824 · Bianchi 2019 · PMID 31119681 · Putowski 2022 · PMID 36403822'
  }
]},

{group: 'Anticoagulación', badge: 'blue', tag: 'Hematología', drugs: [
  {
    name: 'Heparina sódica',
    dilution: '25000 UI en 250 mL SSF = 100 UI/mL',
    doseRange: 'Bolo 80 UI/kg · Perfusión 18 UI/kg/h', alerts: ['Control de TTPa a las 6 h del inicio y tras cada cambio de ritmo', 'Vigilar trombopenia inducida por heparina'],
    doseCalc: function(peso) {
      var d = (80 * peso).toFixed(0);
      return { min: d, max: d, unit: 'UI (bolo)' };
    },
    extra: function(peso) {
      var mlh = (18 * peso / 100).toFixed(1);
      return 'Perfusión: ' + mlh + ' mL/h (18 UI/kg/h, conc. 100 UI/mL)';
    },
    ficha: 'Heparina sòdica.md'
  },
  {
    name: 'Enoxaparina',
    dilution: 'SC',
    doseRange: 'Profilaxis 40 mg SC/24h · Terapéutica 1 mg/kg/12h SC', alerts: ['Ajustar en insuficiencia renal: si ClCr <30 mL/min, la dosis terapéutica pasa a 1 mg/kg cada 24 h', 'No se monitoriza con TTPa; si se precisa, anti-Xa'],
    doseCalc: function(peso) {
      var d = (1 * peso).toFixed(1);
      return { min: d, max: d, unit: 'mg/12h (terapéutica)' };
    },
    ficha: 'Enoxaparina.md'
  }
]},

{group: 'Fibrinolíticos', badge: 'red', tag: 'IAM/Ictus', drugs: [
  {
    name: 'Alteplasa (rtPA)',
    dilution: 'Reconstituir según ficha técnica',
    doseRange: 'IAM: 15 mg bolo + 0.75 mg/kg (máx 50) en 30 min + 0.5 mg/kg (máx 35) en 60 min · Ictus: 0.9 mg/kg (máx 90 mg), 10% bolo, resto en 60 min',
    doseCalc: function(peso) {
      var d = Math.min(0.9 * peso, 90).toFixed(1);
      return { min: d, max: d, unit: 'mg (dosis total, ictus)' };
    },
    extra: function(peso) {
      var f1 = Math.min(0.75 * peso, 50).toFixed(1);
      var f2 = Math.min(0.5 * peso, 35).toFixed(1);
      return 'IAM: 15 mg bolo + ' + f1 + ' mg (30 min) + ' + f2 + ' mg (60 min)';
    },
    alerts: ['Confirmar ausencia de contraindicaciones antes de administrar', 'Las dosis de IAM y de ictus son distintas: no intercambiarlas']
  }
]},

{group: 'Antídotos — Opioides y benzodiazepinas', badge: 'blue', tag: 'Antídotos', drugs: [
  {
    name: 'Flumazenilo',
    dilution: 'IV directo',
    doseRange: '0.2 mg IV, repetir hasta 0.3–0.5 mg/min si no responde (máx 3 mg acumulados) · Resedación: perfusión 0.1–0.5 mg/h', alerts: ['NO usar de rutina en coma o intoxicación no filiada', 'CONTRAINDICADO si hay sospecha de coingesta de antidepresivos tricíclicos u otro proconvulsivante', 'En consumidores crónicos de benzodiacepinas puede precipitar abstinencia aguda y convulsiones', 'Vida media más corta que muchas benzodiacepinas: vigilar resedación', 'El techo de 1 mg es para reversión de sedación consciente/anestesia, no para sobredosis (aquí hasta 3 mg)'], src: 'AHA 2025 Special Circumstances · PMID 41122889 · Penninga 2015, metaanalisis · PMID 26096314',
    ficha: 'Flumazenil.md'
  },
  {
    name: 'Naloxona',
    dilution: 'IV directo o IM/SC/intranasal',
    doseRange: 'Titulación 0.04 mg IV doblando cada 2–3 min (evita abstinencia) · Apnea/near-arrest: 0.2–2 mg IV', alerts: ['Titular a la dosis mínima que revierta la depresión respiratoria, no buscar despertar completo', 'Puede precipitar abstinencia aguda en dependientes de opioides', 'Vida media más corta que muchos opioides: vigilar resedación y valorar perfusión si precisa bolos repetidos'], src: 'AHA 2025 Special Circumstances · PMID 41122889 · J Emerg Med 2023 · PMID 37652808',
    ficha: 'Naloxona.md'
  }
]},

{group: 'Antídotos — Paracetamol', badge: 'blue', tag: 'Antídotos', drugs: [
  {
    name: 'N-acetilcisteína',
    dilution: 'Diluir en SG5%',
    doseRange: 'Fase 1: 150 mg/kg en 200 mL en 1h · Fase 2: 50 mg/kg en 500 mL en 4h · Fase 3: 100 mg/kg en 1000 mL en 16h', alerts: ['Reacciones anafilactoides durante la infusión, más frecuentes en la primera fase y en asmáticos', 'Ante rash, broncoespasmo o hipotensión: parar o enlentecer la infusión y tratar; reanudar más lento'],
    doseCalc: function(peso) {
      var d = (150 * peso).toFixed(0);
      return { min: d, max: d, unit: 'mg (fase 1, 200 mL en 1h)' };
    },
    extra: function(peso) {
      var f2 = (50 * peso).toFixed(0);
      var f3 = (100 * peso).toFixed(0);
      return 'Fase 2: ' + f2 + ' mg (4h) · Fase 3: ' + f3 + ' mg (16h)';
    }
  }
]},

{group: 'Antídotos — Cianuro y humo de incendio', badge: 'blue', tag: 'Antídotos', drugs: [
  {
    name: 'Hidroxocobalamina',
    dilution: 'Reconstituir 5 g en 200 mL de SF 0,9%',
    doseRange: '5 g IV en 15 min (70 mg/kg); repetible una 2ª dosis de 5 g si persiste la inestabilidad',
    doseCalc: function(peso) {
      var d = (70 * peso / 1000).toFixed(1);
      return { min: d, max: d, unit: 'g (70 mg/kg)' };
    },
    alerts: ['Antídoto de elección en inhalación de humo de incendio con hollín en boca o nariz, alteración de consciencia o lactato ≥ 8 mmol/L: no esperar a confirmar el cianuro', 'Tiñe de rojo piel, mucosas y orina durante días', 'Interfiere con las determinaciones colorimétricas (co-oximetría, creatinina, bilirrubina) y con la detección de fugas en hemodiálisis: extraer analítica ANTES de administrarla'],
    ficha: 'Hidroxocobalamina.md'
  }
]},

{group: 'Antídotos — Alcoholes tóxicos', badge: 'blue', tag: 'Antídotos', drugs: [
  {
    name: 'Fomepizol',
    dilution: 'Diluir en 100 mL de SF 0,9%, pasar en 30 min',
    doseRange: 'Carga 15 mg/kg IV · después 10 mg/kg/12 h (4 dosis) · después 15 mg/kg/12 h · durante hemodiálisis, cada 4 h',
    doseCalc: function(peso) {
      var d = (15 * peso).toFixed(0);
      return { min: d, max: d, unit: 'mg (dosis de carga)' };
    },
    alerts: ['Indicado en intoxicación por metanol y etilenglicol: bloquea la alcohol-deshidrogenasa', 'No sustituye a la hemodiálisis si hay acidosis grave, alteración visual, coma o fracaso renal', 'Alternativa si no se dispone: etanol IV con control estricto de la alcoholemia']
  }
]},

{group: 'Antídotos — Betabloqueantes y calcioantagonistas', badge: 'blue', tag: 'Antídotos', drugs: [
  {
    name: 'Glucagón (intoxicación por betabloqueantes)',
    dilution: 'Reconstituir con su disolvente; perfusión en SG5%',
    doseRange: 'Bolo 2–10 mg IV (50–150 microgramos/kg) en 1–2 min, repetible · perfusión hasta 15 mg/h si responde',
    doseCalc: function(peso) {
      var min = (0.05 * peso).toFixed(1);
      var max = (0.15 * peso).toFixed(1);
      return { min: min, max: max, unit: 'mg (bolo, 50–150 mcg/kg)' };
    },
    alerts: ['Vómitos casi constantes: proteger la vía aérea antes del bolo', 'Hiperglucemia e hipopotasemia frecuentes', 'Si no responde, escalar a insulina a dosis altas euglucémica'],
    src: 'AHA 2025 Special Circumstances · PMID 41122889',
    ficha: 'Glucagó.md'
  },
  {
    name: 'Insulina a dosis altas euglucémica (HIE)',
    dilution: 'Insulina rápida en SF 0,9% (1 UI/mL) + glucosa concentrada en vía aparte',
    doseRange: 'Bolo 1 UI/kg IV + perfusión 1 UI/kg/h, escalable cada 10–15 min hasta 10 UI/kg/h según respuesta hemodinámica',
    doseCalc: function(peso) {
      var d = (1 * peso).toFixed(0);
      return { min: d, max: d, unit: 'UI (bolo) y UI/h (inicio)' };
    },
    extra: function(peso) {
      var mx = (10 * peso).toFixed(0);
      return 'Techo de escalada: ' + mx + ' UI/h (10 UI/kg/h)';
    },
    alerts: ['Indicación: intoxicación por calcioantagonistas y betabloqueantes con shock refractario', 'Añadir glucosa 25 g IV si glucemia < 250 mg/dL y perfusión de glucosa continua', 'Controlar glucemia cada 30 min y potasio cada hora (hipopotasemia por redistribución)', 'El efecto inotrópico tarda 15–45 min: no suspender de forma precoz por falta de respuesta inmediata'],
    src: 'Krenz 2018, revision de HIE en calcioantagonistas y betabloqueantes · PMID 30141827',
    ficha: 'Insulina.md'
  }
]},

{group: 'Antídotos — Metahemoglobinemia', badge: 'blue', tag: 'Antídotos', drugs: [
  {
    name: 'Azul de metileno',
    dilution: 'IV lento en 5 min, diluido en SG5%',
    doseRange: '1–2 mg/kg IV en 5 min, repetible a los 30–60 min (máx acumulado 7 mg/kg)',
    doseCalc: function(peso) {
      var min = (1 * peso).toFixed(0);
      var max = (2 * peso).toFixed(0);
      return { min: min, max: max, unit: 'mg' };
    },
    alerts: ['Indicación: metahemoglobinemia sintomática o metaHb > 20–30%', 'La pulsioximetría convencional no detecta la metahemoglobinemia: usar co-oximetría', 'Contraindicado o ineficaz en déficit de G6PD (riesgo de hemólisis): valorar azul de toluidina, vitamina C o exanguinotransfusión', 'Riesgo de síndrome serotoninérgico si el paciente toma ISRS o IMAO']
  }
]},

{group: 'Antídotos — Isoniazida', badge: 'blue', tag: 'Antídotos', drugs: [
  {
    name: 'Piridoxina (vitamina B6)',
    dilution: 'Diluir en 100 mL de SF 0,9%',
    doseRange: '1 g IV por cada gramo de isoniazida ingerido · si la dosis es desconocida: 5 g IV empíricos',
    alerts: ['Indicación: convulsiones por isoniazida o por setas del género Gyromitra que no ceden con benzodiazepinas', 'Administrar junto a la benzodiazepina, no en su lugar', 'Repetible si persisten las convulsiones']
  }
]},

{group: 'Antídotos — Anestésicos locales', badge: 'blue', tag: 'Antídotos', drugs: [
  {
    name: 'Emulsión lipídica 20%',
    dilution: 'Vía IV exclusiva, sin mezclar con otros fármacos',
    doseRange: 'Bolo 1,5 mL/kg en 2–3 min + perfusión 0,25 mL/kg/min durante 20 min · repetir el bolo hasta 2 veces si persiste la parada',
    doseCalc: function(peso) {
      var d = (1.5 * peso).toFixed(0);
      return { min: d, max: d, unit: 'mL (bolo de emulsión al 20%)' };
    },
    extra: function(peso) {
      var perf = (0.25 * peso).toFixed(1);
      return 'Perfusión: ' + perf + ' mL/min (0,25 mL/kg/min)';
    },
    alerts: ['Indicación principal: toxicidad sistémica por anestésicos locales (bupivacaína); rescate en otros tóxicos muy lipófilos con parada o shock refractario', 'Interfiere con muchas determinaciones analíticas por lipemia', 'Máximo recomendado 12 mL/kg acumulados']
  }
]},

{group: 'Antídotos — Digoxina', badge: 'blue', tag: 'Antídotos', drugs: [
  {
    name: 'Anticuerpos Fab antidigoxina',
    dilution: 'Reconstituir y diluir en SF 0,9%, pasar en 30 min',
    doseRange: 'Intoxicación aguda con parada o arritmia grave: 10–20 viales empíricos · intoxicación crónica: 1–2 viales · por digoxinemia: nº viales = (digoxinemia ng/mL × peso kg) / 100',
    doseCalc: function(peso) {
      var v = (2 * peso / 100).toFixed(1);
      return { min: v, max: v, unit: 'viales por cada 2 ng/mL de digoxinemia' };
    },
    alerts: ['Indicaciones: arritmia ventricular, bradiarritmia refractaria a atropina, K⁺ > 5 mEq/L en intoxicación aguda', 'Tras administrarlos, la digoxinemia total deja de ser interpretable', 'Vigilar hipopotasemia y descompensación de la insuficiencia cardíaca de base']
  }
]},

{group: 'Antídotos — Organofosforados', badge: 'blue', tag: 'Antídotos', drugs: [
  {
    name: 'Pralidoxima',
    dilution: 'Diluir en 100 mL de SF 0,9%',
    doseRange: 'Carga 30 mg/kg IV en 30 min · después perfusión 8 mg/kg/h',
    doseCalc: function(peso) {
      var d = (30 * peso).toFixed(0);
      return { min: d, max: d, unit: 'mg (dosis de carga)' };
    },
    extra: function(peso) {
      var p = (8 * peso).toFixed(0);
      return 'Perfusión: ' + p + ' mg/h (8 mg/kg/h)';
    },
    alerts: ['Solo en organofosforados, NO en carbamatos', 'Reactiva la acetilcolinesterasa: eficaz sobre todo en las primeras 24–48 h, antes del envejecimiento de la enzima', 'NUNCA sustituye a la atropina: es complementaria, y la atropina es la que salva la vida']
  }
]}

];
