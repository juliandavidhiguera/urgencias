/* ==================================================================
   DRUGS — fármacos de urgencias con calculadora de dosis por peso
   Referencia: guías SEM Gencat / protocolos estándar de urgencias
   Formato: { group, badge, tag, drugs: [{ name, dilution, doseRange,
             doseCalc(peso) -> {min,max,unit}, extra(peso) -> string, alerts[] }] }
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
    alerts: ['Vía central obligatoria', 'Monitorizar TA invasiva']
  },
  {
    name: 'Dopamina',
    dilution: '200 mg en 250 mL SG5% = 800 µg/mL',
    doseRange: '2–20 µg/kg/min',
    doseCalc: function(peso) {
      return {
        min: (2 * peso * 60 / 800).toFixed(1),
        max: (20 * peso * 60 / 800).toFixed(1),
        unit: 'mL/h'
      };
    }
  },
  {
    name: 'Dobutamina',
    dilution: '250 mg en 250 mL SG5% = 1000 µg/mL',
    doseRange: '2.5–20 µg/kg/min',
    doseCalc: function(peso) {
      return {
        min: (2.5 * peso * 60 / 1000).toFixed(1),
        max: (20 * peso * 60 / 1000).toFixed(1),
        unit: 'mL/h'
      };
    }
  }
]},

{group: 'Sedación / Analgesia', badge: 'amber', tag: 'Urgente', drugs: [
  {
    name: 'Midazolam',
    dilution: '15 mg en 50 mL SSF = 0.3 mg/mL',
    doseRange: 'Bolo 0.02–0.1 mg/kg · Perfusión 0.02–0.1 mg/kg/h',
    doseCalc: function(peso) {
      return {
        min: (0.02 * peso).toFixed(1),
        max: (0.1 * peso).toFixed(1),
        unit: 'mg (bolo)'
      };
    }
  },
  {
    name: 'Fentanilo',
    dilution: '0.5 mg en 50 mL SSF = 10 µg/mL',
    doseRange: 'Bolo 1–2 µg/kg · Perfusión 0.5–3 µg/kg/h',
    doseCalc: function(peso) {
      return {
        min: (1 * peso).toFixed(1),
        max: (2 * peso).toFixed(1),
        unit: 'µg (bolo)'
      };
    }
  },
  {
    name: 'Ketamina',
    dilution: 'Sin diluir o diluida según vía',
    doseRange: 'Disociativa 1–2 mg/kg IV · Analgésica subdisociativa 0.1–0.3 mg/kg IV',
    doseCalc: function(peso) {
      return {
        min: (1 * peso).toFixed(1),
        max: (2 * peso).toFixed(1),
        unit: 'mg (dosis disociativa)'
      };
    }
  },
  {
    name: 'Propofol',
    dilution: '1% = 10 mg/mL',
    doseRange: 'Inducción 1.5–2.5 mg/kg · Mantenimiento 4–12 mg/kg/h',
    doseCalc: function(peso) {
      return {
        min: (1.5 * peso).toFixed(1),
        max: (2.5 * peso).toFixed(1),
        unit: 'mg (inducción)'
      };
    }
  }
]},

{group: 'Antiarrítmicos', badge: 'amber', tag: 'Urgente', drugs: [
  {
    name: 'Amiodarona',
    dilution: 'Carga: 300 mg en 100 mL SG5% en 20–60 min',
    doseRange: 'Carga 300 mg · Mantenimiento 900 mg/24h',
    alerts: ['Hipotensión en bolo rápido']
  },
  {
    name: 'Adenosina',
    dilution: 'IV rápido en bolo, seguido de flush de SSF',
    doseRange: '6 mg → 12 mg → 12 mg (dosis fija, sin ajuste por peso)'
  },
  {
    name: 'Verapamilo',
    dilution: 'IV directo o diluido',
    doseRange: '2.5–5 mg IV en 2 min, repetir 5–10 mg a los 15 min si es necesario'
  },
  {
    name: 'Flecainida',
    dilution: 'IV en 10 min',
    doseRange: '2 mg/kg IV (máx 150 mg)',
    doseCalc: function(peso) {
      var d = Math.min(2 * peso, 150).toFixed(1);
      return { min: d, max: d, unit: 'mg' };
    }
  }
]},

{group: 'Urgencias', badge: 'red', tag: 'Crítico', drugs: [
  {
    name: 'Adrenalina',
    dilution: '1 mg/1 mL (1:1000) ampolla estándar',
    doseRange: 'PCR: 1 mg IV cada 3–5 min · Anafilaxia: 0.01 mg/kg IM (máx 0.5 mg) · Perfusión: 0.01–0.5 µg/kg/min',
    doseCalc: function(peso) {
      var d = Math.min(0.01 * peso, 0.5).toFixed(2);
      return { min: d, max: d, unit: 'mg IM (anafilaxia)' };
    }
  },
  {
    name: 'Atropina',
    dilution: 'IV directo',
    doseRange: 'Bradicardia: 0.5 mg IV cada 3–5 min (máx 3 mg) · Organofosforados: 2–4 mg IV'
  },
  {
    name: 'Bicarbonato sódico 1M',
    dilution: '1M = 1 mEq/mL',
    doseRange: '1 mEq/kg IV',
    doseCalc: function(peso) {
      var d = (peso * 1).toFixed(1);
      return { min: d, max: d, unit: 'mL' };
    }
  },
  {
    name: 'Gluconato cálcico 10%',
    dilution: '10% = 100 mg/mL (9 mg Ca²⁺ elemental/mL)',
    doseRange: 'Hiperkalemia: 10 mL IV en 2–3 min · Hipocalcemia: 10–20 mL'
  }
]},

{group: 'Anticoagulación', badge: 'blue', tag: 'Hematología', drugs: [
  {
    name: 'Heparina sódica',
    dilution: '25000 UI en 250 mL SSF = 100 UI/mL',
    doseRange: 'Bolo 80 UI/kg · Perfusión 18 UI/kg/h',
    doseCalc: function(peso) {
      var d = (80 * peso).toFixed(0);
      return { min: d, max: d, unit: 'UI (bolo)' };
    },
    extra: function(peso) {
      var mlh = (18 * peso / 100).toFixed(1);
      return 'Perfusión: ' + mlh + ' mL/h (18 UI/kg/h, conc. 100 UI/mL)';
    }
  },
  {
    name: 'Enoxaparina',
    dilution: 'SC',
    doseRange: 'Profilaxis 40 mg SC/24h · Terapéutica 1 mg/kg/12h SC',
    doseCalc: function(peso) {
      var d = (1 * peso).toFixed(1);
      return { min: d, max: d, unit: 'mg/12h (terapéutica)' };
    }
  }
]},

{group: 'Otros', badge: 'blue', tag: 'Antídotos', drugs: [
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
    alerts: ['Confirmar ausencia de contraindicaciones antes de administrar']
  },
  {
    name: 'Flumazenilo',
    dilution: 'IV directo',
    doseRange: '0.2 mg IV, repetir 0.1 mg cada 60 s (máx 1 mg)'
  },
  {
    name: 'Naloxona',
    dilution: 'IV directo o IM/SC/intranasal',
    doseRange: '0.4–2 mg IV, repetir cada 2–3 min'
  },
  {
    name: 'N-acetilcisteína',
    dilution: 'Diluir en SG5%',
    doseRange: 'Fase 1: 150 mg/kg en 200 mL en 1h · Fase 2: 50 mg/kg en 500 mL en 4h · Fase 3: 100 mg/kg en 1000 mL en 16h',
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
]}

];
