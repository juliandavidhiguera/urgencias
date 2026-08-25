/* ==================================================================
   INTUBACIÓN — lista de verificación de secuencia de intubación rápida (SIR)
   Dosis calculadas sobre PESO REAL (peso ideal se usa solo para volumen
   tidal protector). Fuente: "SECUENCIA DE INTUBACION RAPIDA" (protocolo
   del usuario) + verificación clínica puntual con Vera Health:
   - Propofol: el documento original indicaba 2-5 mg/kg (dosis excesiva);
     corregido a 1-2,5 mg/kg estable / 0,5-1 mg/kg inestable, según
     BJA TIVA 2025 (PMID 41238462) y meta-análisis de inducción en
     críticos (PMID 42121165).
   - Ketamina en TCE: el documento original la contraindicaba en TCE
     grave-moderado; evidencia actual (Sciorilli 2026, PMID 41197253;
     guía de transferencia de paciente con daño cerebral, PMID 31788789)
     no la contraindica si se controla la ventilación e hipotensión —
     se mantiene como opción preferente en inestabilidad hemodinámica.
   ================================================================== */

window.INTUBACION_STEPS = [
  { id: 'preparacion', label: 'Preparación y equipo (SOAPME)' },
  { id: 'preoxigenacion', label: 'Preoxigenación FiO₂ 100% · 3–5 min' },
  { id: 'premedicacion', label: 'Premedicación administrada' },
  { id: 'induccion', label: 'Inducción (hipnótico)' },
  { id: 'paralisis', label: 'Parálisis (relajante muscular)' },
  { id: 'posicion', label: 'Posición + presión cricoidea (Sellick / BURP)' },
  { id: 'laringoscopia', label: 'Laringoscopia' },
  { id: 'paso_tet', label: 'Paso del tubo endotraqueal' },
  { id: 'confirmacion', label: 'Confirmación (capnografía / auscultación)' },
  { id: 'fijacion', label: 'Fijación del tubo' },
  { id: 'ventilador', label: 'Conexión a ventilador mecánico' },
  { id: 'postintubacion', label: 'Actuaciones postintubación' }
];

window.INTUBACION_FARMACOS = [
  { id: 'fentanilo', grupo: 'Premedicación', nombre: 'Fentanilo', doseMin: 1, doseMax: 3, unit: 'mcg/kg',
    nota: 'Analgesia. Vagotónico si se asocia a propofol (valorar atropina). Reduce dosis de inductor.' },
  { id: 'lidocaina', grupo: 'Premedicación', nombre: 'Lidocaína', doseMin: 1.5, doseMax: 1.5, unit: 'mg/kg',
    nota: 'TCE con hipertensión intracraneal · crisis asmática/broncoespasmo severo' },
  { id: 'atropina', grupo: 'Premedicación', nombre: 'Atropina', doseMin: 0.02, doseMax: 0.02, unit: 'mg/kg', doseMinAbs: 0.1,
    nota: 'Niños <1 año, o <5 años si reciben succinilcolina · dosis mínima 0,1 mg' },
  { id: 'esmolol', grupo: 'Premedicación', nombre: 'Esmolol', doseMin: 0.2, doseMax: 0.5, unit: 'mg/kg',
    nota: 'Disección vascular, cardiopatía isquémica — atenúa descarga simpática' },

  { id: 'etomidato', grupo: 'Inducción', nombre: 'Etomidato', doseMin: 0.2, doseMax: 0.3, unit: 'mg/kg',
    nota: 'Hemodinámicamente neutro — misma dosis en inestable. No en infusión continua (supresión corticoadrenal).' },
  { id: 'ketamina', grupo: 'Inducción', nombre: 'Ketamina', doseMin: 1, doseMax: 2, unit: 'mg/kg',
    doseInestable: '0,5 mg/kg si se coadministra con otro hipnótico',
    nota: 'Contraindicada en cardiopatía isquémica, HTA no controlada y psicosis mayor. Contraindicada en shock cardiogénico. Ya NO contraindicada en TCE si se controla ventilación e hipotensión [verificado].' },
  { id: 'propofol', grupo: 'Inducción', nombre: 'Propofol', doseMin: 1, doseMax: 2.5, unit: 'mg/kg',
    doseInestable: '0,5–1 mg/kg si inestable, o valorar otro agente',
    nota: 'Evitar o reducir dosis en shock no corregido — riesgo de hipotensión marcada.' },
  { id: 'midazolam', grupo: 'Inducción', nombre: 'Midazolam', doseMin: 0.2, doseMax: 0.3, unit: 'mg/kg',
    nota: 'Reducir en ancianos e hipovolemia — hipotensión relevante.' },

  { id: 'succinilcolina', grupo: 'Relajante muscular', nombre: 'Succinilcolina', doseMin: 1, doseMax: 1.5, unit: 'mg/kg',
    nota: 'Contraindicada: hiperpotasemia, enfermedad neuromuscular, grandes quemados/denervación (fase tardía >10 d), antecedente de hipertermia maligna.' },
  { id: 'rocuronio', grupo: 'Relajante muscular', nombre: 'Rocuronio', doseMin: 0.6, doseMax: 1.2, unit: 'mg/kg',
    nota: '0,6 mg/kg si se asocia a propofol · 0,9–1,2 mg/kg si se asocia a otro hipnótico (inicio ~60 s)' }
];

/* Recomendación de inductor por escenario clínico × estado hemodinámico
   (tabla proporcionada por el usuario). ids referencian INTUBACION_FARMACOS. */
window.INTUBACION_ESCENARIOS = [
  { id: 'tce_htic', label: 'TCE / hipertensión intracraneal',
    estable: ['midazolam', 'propofol'], notaEstable: 'Propofol a dosis bajas',
    inestable: ['etomidato', 'ketamina'] },
  { id: 'status_epileptico', label: 'Estatus epiléptico',
    estable: ['midazolam'],
    inestable: ['etomidato'] },
  { id: 'broncoespasmo', label: 'Broncoespasmo severo',
    estable: ['ketamina', 'propofol', 'midazolam', 'etomidato'],
    inestable: ['ketamina', 'etomidato'] },
  { id: 'cardiovascular', label: 'Enfermedad cardiovascular',
    estable: ['etomidato'],
    inestable: ['etomidato'] },
  { id: 'shock', label: 'Shock',
    estable: [], notaEstable: 'El shock se maneja como inestable',
    inestable: ['etomidato', 'ketamina'], notaInestable: 'Ketamina contraindicada en shock cardiogénico' }
];

window.INTUBACION_COMPLICACIONES = [
  'Hipotensión', 'Hipoxemia', 'Bradicardia', 'Intubación esofágica/selectiva',
  'Aspiración', 'Laringoespasmo/broncoespasmo', 'Trauma dental/vía aérea', 'Barotrauma/neumotórax'
];
