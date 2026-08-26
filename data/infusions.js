/* ==================================================================
   INFUSIONS — perfusiones IV: dilución + dosis/peso -> mL/h
   Formato: { name, group, badge, mg, vol, unit, doseMin, doseMax,
             diluyente, notas, unitLabel, ficha }
   unit: 'mcg/kg/min' | 'mcg/kg/h' | 'mg/kg/h' | 'mg/kg/min' | 'UI/kg/h' |
         'UI/min' | 'mg/h' | 'mg/min' | 'mcg/min' (los cuatro últimos no dependen del peso)
   unitLabel: unidad de la cantidad diluida ('mg' por defecto, 'UI' en fármacos
   dosificados en unidades internacionales como insulina, heparina o vasopresina)
   ficha: nombre del archivo en medicamentos/ con la ficha oficial del fármaco
   (omitido si no existe una ficha correspondiente en esa carpeta)
   mg/vol son los valores por defecto de la dilución de referencia
   (p.ej. 5 mg en 50 mL); el usuario puede editarlos en la calculadora.
   ================================================================== */
window.INFUSIONS = [

{name: 'Midazolam', group: 'Sedación / Analgesia', badge: 'amber',
  mg: 50, vol: 50, unit: 'mg/kg/h', doseMin: 0.02, doseMax: 0.1,
  diluyente: 'SF 0,9% / SG 5%', notas: 'Acumulación en perfusión prolongada, hipotensión',
  ficha: 'Midazolam.md'},

{name: 'Propofol', group: 'Sedación / Analgesia', badge: 'amber',
  mg: 500, vol: 50, unit: 'mg/kg/h', doseMin: 0.3, doseMax: 4.0,
  diluyente: 'No se diluye', notas: 'Hipotensión; no administrar en bolo',
  ficha: 'Propofol.md'},

{name: 'Dexmedetomidina', group: 'Sedación / Analgesia', badge: 'amber',
  mg: 0.2, vol: 50, unit: 'mcg/kg/h', doseMin: 0.2, doseMax: 1.4,
  diluyente: 'SF 0,9% / SG 5%', notas: 'Bradicardia'},

{name: 'Fentanilo', group: 'Sedación / Analgesia', badge: 'amber',
  mg: 0.5, vol: 50, unit: 'mcg/kg/h', doseMin: 0.5, doseMax: 2.0,
  diluyente: 'SF 0,9% / SG 5%', notas: 'Rigidez torácica con dosis altas',
  ficha: 'Fentanil.md'},

{name: 'Morfina', group: 'Sedación / Analgesia', badge: 'amber',
  mg: 50, vol: 50, unit: 'mg/kg/h', doseMin: 0.01, doseMax: 0.05,
  diluyente: 'SF 0,9% / SG 5%', notas: 'Hipotensión, liberación de histamina',
  ficha: 'Clorur mòrfic.md'},

{name: 'Noradrenalina', group: 'Vasoactivos', badge: 'red',
  mg: 5, vol: 50, unit: 'mcg/kg/min', doseMin: 0.05, doseMax: 1.0,
  diluyente: 'SG 5% / SF 0,9%', notas: 'Preferible vía central. Vigilar extravasación',
  ficha: 'Noradrenalina.md'},

{name: 'Adrenalina (perfusión)', group: 'Vasoactivos', badge: 'red',
  mg: 4, vol: 50, unit: 'mcg/kg/min', doseMin: 0.05, doseMax: 0.5,
  diluyente: 'SG 5% / SF 0,9%', notas: 'Aumenta el riesgo de taquiarritmias',
  ficha: 'Adrenalina.md'},

{name: 'Dobutamina', group: 'Vasoactivos', badge: 'red',
  mg: 250, vol: 50, unit: 'mcg/kg/min', doseMin: 2.5, doseMax: 20,
  diluyente: 'SG 5% / SF 0,9%', notas: 'Puede producir hipotensión (vasodilatador); no usar como vasopresor',
  ficha: 'Dobutamina.md'},

{name: 'Dopamina', group: 'Vasoactivos', badge: 'red',
  mg: 200, vol: 50, unit: 'mcg/kg/min', doseMin: 5, doseMax: 20,
  diluyente: 'SG 5%', notas: 'Uso limitado; más taquiarritmias que noradrenalina'},

{name: 'Vasopresina', group: 'Vasoactivos', badge: 'red',
  mg: 20, vol: 50, unit: 'UI/min', doseMin: 0.03, doseMax: null, unitLabel: 'UI',
  diluyente: 'SF 0,9%', notas: 'Dosis fija: NO se titula por peso'},

{name: 'Nitroglicerina', group: 'Vasoactivos', badge: 'red',
  mg: 50, vol: 50, unit: 'mcg/kg/min', doseMin: 0.05, doseMax: 2.2,
  diluyente: 'SG 5% / SF 0,9%', notas: 'No usar equipo de PVC estándar (adsorción del fármaco, pérdida de hasta 40-80% de la dosis): usar set de polietileno/vidrio. Cefalea, taquifilaxia >24-48h. Evitar si IAM de VD, hipovolemia o uso reciente de inhibidores de la PDE5',
  ficha: 'Nitroglicerina.md'},

{name: 'Nitroprusiato sódico', group: 'Vasoactivos', badge: 'red',
  mg: 50, vol: 50, unit: 'mcg/kg/min', doseMin: 0.3, doseMax: 10,
  diluyente: 'SG 5%', notas: 'Fotosensible: proteger de la luz (bolsa/línea opaca). Riesgo de toxicidad por cianuro/tiocianato si dosis >2 mcg/kg/min mantenida >24-48h o insuficiencia renal/hepática: monitorizar lactato/acidosis metabólica. Evitar en hemorragia subaracnoidea',
  ficha: 'Nitroprussiat.md'},

{name: 'Isoprenalina', group: 'Vasoactivos', badge: 'red',
  mg: 0.4, vol: 50, unit: 'mcg/min', doseMin: 2, doseMax: 10,
  diluyente: 'SG 5%', notas: 'Bradiarritmias refractarias a atropina, sobredosis de betabloqueantes o shock cardiogénico por bradicardia. Puede producir taquiarritmias e isquemia miocárdica',
  ficha: 'Isoprenalina.md'},

{name: 'Fenilefrina', group: 'Vasoactivos', badge: 'red',
  mg: 10, vol: 500, unit: 'mcg/min', doseMin: 30, doseMax: 180,
  diluyente: 'SF 0,9% / SG 5%', notas: 'Vasopresor alfa puro: puede empeorar la insuficiencia cardíaca por aumento de la poscarga. Vigilar extravasación (riesgo de necrosis tisular)',
  ficha: 'Hidroclorur de fenilefrina.md'},

{name: 'Labetalol', group: 'Antihipertensivos', badge: 'amber',
  mg: 50, vol: 50, unit: 'mg/min', doseMin: 0.5, doseMax: 2,
  diluyente: 'SF 0,9%', notas: 'Precedido de bolos de 10-20 mg IV lento (máx. 300 mg/día). Dilución alternativa equivalente: 100 mg en 80 mL SF. Proteger de la luz solar. Contraindicado en insuficiencia cardíaca, bradicardia y asma',
  ficha: 'Labetalol.md'},

{name: 'Amiodarona (mantenimiento)', group: 'Antiarrítmicos', badge: 'amber',
  mg: 150, vol: 50, unit: 'mg/h', doseMin: 37.5, doseMax: null,
  diluyente: 'SG 5% (NO usar SF)', notas: 'Perfusión de mantenimiento tras la carga (300 mg + 150 mg en descargas de PCR o 300 mg en 20-30 min en taquiarritmias): dosis total 900 mg/24h. Hipotensión si infusión rápida',
  ficha: 'Amiodarona.md'},

{name: 'Insulina rápida', group: 'Metabólico', badge: 'blue',
  mg: 50, vol: 50, unit: 'UI/kg/h', doseMin: 0.05, doseMax: 0.1, unitLabel: 'UI',
  diluyente: 'SF 0,9%', notas: 'Fase inicial 0,1 UI/kg/h en CAD (o EHH con criterios mixtos de cetosis/acidosis); 0,05 UI/kg/h si EHH puro sin cetosis significativa. Reducir a 0,05 UI/kg/h y añadir dextrosa 5-10% cuando la glucemia sea <250 mg/dl. Vigilar hipoglucemia y potasio seriados',
  ficha: 'Insulina.md'},

{name: 'Somatostatina', group: 'Otros', badge: 'blue',
  mg: 3, vol: 50, unit: 'mcg/kg/h', doseMin: 1.75, doseMax: 3.5,
  diluyente: 'SF 0,9% (NO diluir en SG 5%)', notas: 'Dosis de carga 250 mcg IV lenta en 3 min antes de la perfusión. Reducir la dosis si alteración de la función renal. Mantener 48-72h tras controlar la hemorragia digestiva (máx. 5 días). Requiere nevera',
  ficha: 'Somatostatina.md'},

{name: 'Pantoprazol', group: 'Otros', badge: 'blue',
  mg: 200, vol: 200, unit: 'mg/h', doseMin: 8, doseMax: null,
  diluyente: 'SF 0,9% o SG 5%', notas: 'Precedido de bolo IV de 80 mg. Mantener 72h tras la hemostasia endoscópica en hemorragia digestiva alta de alto riesgo; alternativa intermitente: 40 mg IV/12h. Diluir el vial de 40 mg con 10 mL SF antes de añadirlo a la dilución de perfusión',
  ficha: 'Pantoprazol.md'},

{name: 'Rocuronio (mantenimiento)', group: 'Relajantes musculares', badge: 'blue',
  mg: 50, vol: 50, unit: 'mg/kg/h', doseMin: 0.3, doseMax: 0.6,
  diluyente: 'SF 0,9%', notas: 'Mantenimiento de la relajación neuromuscular en paciente sedado y con vía aérea asegurada. Antagonizable con sugammadex',
  ficha: 'Rocuroni.md'}

];
