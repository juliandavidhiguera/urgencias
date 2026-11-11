/* Dosis que propone cada protocolo para los fármacos de su flujograma.
   El panel lateral del fármaco las muestra arriba («Dosis de este protocolo») y su calculadora de bolo
   las pone como primera opción, preseleccionada («Protocolo · …»). Sacadas del texto del propio protocolo.
   «Fármaco@nodo» manda sobre «Fármaco» en ese nodo ('' = sin pauta allí).
   Cada línea lleva al final el nodo y la cita literal del protocolo de donde sale.
   Formato: una línea por pauta («• Situación (vía): N mg/kg (máx. M mg)»), un solo «/kg» por línea. */
window.PAUTAS_PROTOCOLO = {
'fa-rapida': {
  'Metoprolol': '• Control de frecuencia, FEVI >40 % (IV): 2,5–5 mg en 2 min; repetir hasta 15 mg\n• Control de frecuencia, FEVI ≤40 % sin IC descompensada ni hipotensión (IV): 2,5–5 mg', // nodo frec: «Metoprolol 2,5–5 mg IV en 2 min; repetir hasta 15 mg» · nodo frec_ic: «metoprolol 2,5–5 mg IV»
  'Esmolol': '• Control de frecuencia, bolo (IV): 500 mcg/kg en 1 min', // nodo frec: «Esmolol 500 µg/kg IV en 1 min ..., después 50–300 µg/kg/min»
  'Diltiazem': '• Control de frecuencia, bolo (IV): 0,25 mg/kg en 5 min', // nodo frec: «Diltiazem (no comercializado IV en España) 0,25 mg/kg IV en 5 min ..., después 5–15 mg/h»
  'Verapamilo': '• Control de frecuencia, FEVI >40 % (IV): 2,5–10 mg en 5 min', // nodo frec: «Verapamilo 2,5–10 mg IV en 5 min»
  'Digoxina': '• Control de frecuencia (IV): 0,5 mg; hasta 0,75–1,5 mg en 24 h en dosis divididas (reducir en insuficiencia renal y ancianos)', // nodos frec y frec_ic: «Digoxina 0,5 mg IV ... (hasta 0,75–1,5 mg en 24 h en dosis divididas ...)»
  'Amiodarona': '• Control de frecuencia con FEVI ≤40 % o cardioversión con cardiopatía estructural (IV): 300 mg en 30–60 min y después 900–1.200 mg en 24 h', // nodos frec_ic y amio_cv: «amiodarona 300 mg IV en 30–60 min y 900–1.200 mg en 24 h»
  'Flecainida': '• Cardioversión sin cardiopatía estructural (IV): 1–2 mg/kg en 10 min (máx. 150 mg)\n• Cardioversión sin cardiopatía estructural (VO): 200–300 mg en dosis única', // nodo flec: «Flecainida 1–2 mg/kg IV en 10 min ... (máximo 150 mg) o 200–300 mg VO en dosis única»
  'Vernakalant': '• Cardioversión, 1.ª dosis (IV): 3 mg/kg en 10 min (máx. 339 mg)\n• Cardioversión, 2.ª dosis si no revierte en 15 min (IV): 2 mg/kg en 10 min (máx. 226 mg)', // nodo flec: «Vernakalant 3 mg/kg IV en 10 min (máx. 339 mg); si no revierte ..., 2 mg/kg en 10 min (máx. 226 mg)»
  'Propofol': '• Sedación para cardioversión (IV): 0,5–1 mg/kg lento, después 10–20 mg cada 1–2 min\n• Sedación en ancianos, ASA III o PA límite (IV): 0,25–0,5 mg/kg', // extra «Sedación para la cardioversión»: «Propofol 0,5–1 mg/kg IV lento ..., después 10–20 mg cada 1–2 min. Ancianos, ASA III o PA límite: 0,25–0,5 mg/kg»
  'Etomidato': '• Sedación para cardioversión (IV): 0,1–0,2 mg/kg (de elección si hipotensión o shock)', // extra sedación: «Etomidato 0,1–0,2 mg/kg IV ...: de elección si hay hipotensión o shock»
  'Midazolam': '• Sedación para cardioversión (IV): 1 mg y después 0,5–1 mg cada 2–3 min', // extra sedación: «Midazolam 1 mg IV y después 0,5–1 mg cada 2–3 min»
  'Fentanilo': '• Analgesia para cardioversión, con midazolam (IV): 25–50 mcg', // extra sedación: «con fentanilo 25–50 µg IV»
  'Ketamina': '• Sedación para cardioversión si broncoespasmo (IV): 0,5–1 mg/kg en ≥60 s', // extra sedación: «Ketamina 0,5–1 mg/kg IV en ≥60 s ... si hay broncoespasmo»
  'Flumazenilo': '• Reversión de benzodiacepina (IV): 0,2 mg cada 1 min (máx. 1 mg)', // extra sedación: «flumazenilo 0,2 mg cada 1 min (máx. 1 mg)»
  'Naloxona': '• Reversión de opioide (IV): 0,04–0,2 mg cada 2–3 min', // extra sedación: «naloxona 0,04–0,2 mg cada 2–3 min»
  'Atropina': '• Bradicardia tras cardioversión (IV): 0,5 mg', // extra sedación: «Bradicardia: atropina 0,5 mg IV»
},
'hiperkalemia': {
  'Gluconato de calcio': '• Hiperpotasemia grave, estabilización de membrana (IV): 30 ml de gluconato cálcico 10 % en 5–10 min; repetir a los 5 min si persisten los cambios del ECG', // nodo calcio: «Gluconato cálcico 10 % 30 mL IV en 5–10 min ... Repetir a los 5 min»
  'Bicarbonato sódico': '• Parada por hiperpotasemia (IV): 50 mmol (por otra vía que el calcio o lavando entre ambos)\n• Fuera de la parada: solo si hay acidosis metabólica, no de rutina', // nodo pcr: «bicarbonato sódico 50 mmol IV, por vías distintas o lavando entre ambos» · nodo shift: «Bicarbonato sódico solo si hay acidosis metabólica; no de rutina»
  'Insulina': '• Redistribución y parada por hiperpotasemia (IV): 10 UI de insulina rápida + glucosa 25 g\n• Alto riesgo de hipoglucemia (IV): 5 UI (algunos protocolos; evidencia limitada)', // nodos pcr/shift: «Insulina rápida 10 U IV + glucosa 25 g IV» · nodo shift: «en ellos algunos protocolos usan 5 U (evidencia limitada)»
  'Glucosa': '• Con la insulina (IV): 25 g (glucosa 10 % 250 ml en 15–30 min, o glucosa 50 % 50 ml)', // nodo shift: «glucosa 25 g IV (glucosa 10 % 250 mL en 15–30 min, o glucosa 50 % 50 mL)»
  'Salbutamol': '• Redistribución, complemento (nebulizado): 10–20 mg', // nodo shift: «Salbutamol 10–20 mg nebulizado como complemento, nunca solo»
},
'dolor-toracico': {
  'Ácido acetilsalicílico': '• SCASEST, carga (VO): 150–300 mg\n• Mantenimiento (VO): 75–100 mg cada 24 h', // AAS solo VO; la vía IV es el acetilsalicilato de lisina (indicación del servicio, 2026-11-08). extra «Antiagregación y anticoagulación»: «AAS: carga de 150–300 mg VO (o 75–250 mg IV) y después 75–100 mg/24 h»
  'Acetilsalicilato de lisina': '• SCASEST, si no puede tomar VO (IV): dosis equivalente a 75–250 mg de AAS (450 mg de acetilsalicilato de lisina ≈ 250 mg de AAS)', // extra «Antiagregación y anticoagulación»: «(o 75–250 mg IV)»; el AAS es oral y la forma parenteral es el acetilsalicilato de lisina (servicio, 2026-11-08)
  'Enoxaparina': '• SCASEST (SC): 1 mg/kg cada 12 h, con peso real\n• SCASEST con ClCr 15–30 ml/min (SC): 1 mg/kg cada 24 h', // extra «Antiagregación y anticoagulación»: «Enoxaparina: 1 mg/kg/12 h SC con el peso real; con ClCr 15–30 ml/min, 1 mg/kg/24 h»
},
'codi-iam': {
  'Ácido acetilsalicílico': '• Activación Codi IAM y fibrinólisis (VO): 150–300 mg masticada', // nodo activar: «AAS 150–300 mg VO masticada» · nodo fib: «AAS 150–300 mg VO»
  'Acetilsalicilato de lisina': '• Si no puede tomar VO (IV): 450 mg', // nodo activar: «(450 mg IV de acetilsalicilato de lisina si no puede VO)»
  'Fentanilo': '• Analgesia (IV): 50–75 mcg cada 5–10 min', // nodo activar: «fentanilo 50–75 µg IV cada 5–10 min»
  'Cloruro mórfico': '• Analgesia (IV): 4–8 mg, después 2 mg cada 5–15 min (máx. 15–20 mg)', // nodo activar: «cloruro mórfico 4–8 mg IV (+2 mg cada 5–15 min, máx. 15–20 mg)»
  'Nitroglicerina': '• Dolor isquémico (SL): 0,4 mg', // nodo activar: «Nitroglicerina (SL 0,4 mg o IV)» — la IV es perfusión (5–10 µg/min; steps: 10–60 mcg/kg/h), omitida
  'Heparina sódica': '• Angioplastia primaria, bolo (IV): 70 UI/kg\n• Con fibrinólisis, bolo (IV): 60 UI/kg (máx. 4000 UI), después perfusión según TTPa', // nodo icp: «HEPARINA SÓDICA 70 UI/kg IV en bolo» · nodo fib (hnf): «60 UI/kg IV (máx. 4.000 UI) + 12 UI/kg/h (máx. 1.000 UI/h) según TTPa»
  'Heparina sódica@fib': '• Con fibrinólisis, bolo (IV): 60 UI/kg (máx. 4000 UI), después perfusión según TTPa',
  'Clopidogrel': '• Angioplastia primaria, sin información o alto riesgo hemorrágico (VO): 600 mg\n• Con fibrinólisis, <75 años (VO): 300 mg\n• Con fibrinólisis, ≥75 años (VO): 75 mg sin dosis de carga', // nodo sa_clopi: «Clopidogrel 600 mg VO.» · nodo fib (clopi): «clopidogrel 300 mg VO con <75 años o 75 mg sin carga con ≥75 años»
  'Ticagrelor': '• Angioplastia primaria con ictus/AIT previo, ≥75 años o <60 kg (VO): 180 mg', // nodo sa_tica: «Ticagrelor 180 mg VO.»
  'Prasugrel': '• Angioplastia primaria, resto de pacientes (VO): 60 mg', // nodo sa_pras: «Prasugrel 60 mg VO.»
  'Tenecteplasa': '• Fibrinólisis del IAM, bolo único en 5–10 s (IV): <60 kg 30 mg · 60–69 kg 35 mg · 70–79 kg 40 mg · 80–89 kg 45 mg · ≥90 kg 50 mg\n• Fibrinólisis del IAM con ≥75 años (IV): media dosis (15 · 17,5 · 20 · 22,5 · 25 mg)', // nodo fib (tnk): «Tabla por peso: <60 kg 30 mg (6 ml) · ... · ≥90 kg 50 mg (10 ml); con ≥75 años, media dosis»
  'Enoxaparina': '• Con fibrinólisis, <75 años, bolo (IV): 30 mg\n• Con fibrinólisis, <75 años, a los 15 min (SC): 1 mg/kg cada 12 h (máx. 100 mg en las 2 primeras dosis)\n• Con fibrinólisis, ≥75 años, sin bolo (SC): 0,75 mg/kg cada 12 h (máx. 75 mg en las 2 primeras dosis)\n• Con fibrinólisis, ClCr <30 (SC): 1 mg/kg cada 24 h', // nodo fib (enox): «<75 años 30 mg IV en bolo y a los 15 min 1 mg/kg SC cada 12 h (máx. 100 mg en las 2 primeras dosis) · ≥75 años sin bolo, 0,75 mg/kg SC cada 12 h (máx. 75 mg en las 2 primeras) · ClCr <30: 1 mg/kg SC cada 24 h»
  'Metoprolol': '• Hipertensión sin IC, hipotensión, bradicardia ni BAV (IV): 5 mg cada 2 min (máx. 15 mg)', // extra «Hipertensión arterial»: «Metoprolol IV 5 mg cada 2 min (máx. 15 mg)»
  'Atropina': '• Bradicardia o BAV sintomático (IV): 0,5 mg cada 3–5 min (máx. 3 mg); la AHA da 1 mg', // extra «Bradicardia o bloqueo AV»: «Atropina ... 0,5 mg IV (ERC; la AHA da 1 mg) cada 3–5 min, máx. 3 mg»
},
'codi-ictus': {
  'Alteplasa': '• Ictus isquémico, dosis total (IV): 0,9 mg/kg (máx. 90 mg): 10 % en bolo en 1 min y 90 % con bomba en 60 min', // nodo dosis: «Alteplasa 0,9 mg/kg, máx. 90 mg: 10 % en bolo IV en 1 min y 90 % con bomba en 60 min»
  'Tenecteplasa': '• Ictus isquémico <4,5 h, bolo único en 5–10 s (IV): <60 kg 15 mg · 60–69 kg 17,5 mg · 70–79 kg 20 mg · 80–89 kg 22,5 mg · ≥90 kg 25 mg', // nodo dosis: «bolo único por peso, <60 kg 15 mg · ... · ≥90 kg 25 mg» · steps: «AHA/ASA 2026 y ESO 2023: 0,25 mg/kg, máx. 25 mg»
  'Labetalol': '• TA ≥185/110 antes de trombolisar, o HTA en no candidato (IV): 10 mg en 1–2 min, repetible (máx. 150 mg)', // nodo tactl: «Labetalol IV 10 mg en 1–2 min, repetible (máx. 150 mg)» · extra «Tensión arterial»
  'Ácido tranexámico': '• Hemorragia tras trombólisis sin crioprecipitado (IV): 1 g en 10 min', // extra «Hemorragia tras la trombólisis»: «ácido tranexámico 1 g IV en 10 min»
  'Metilprednisolona': '• Angioedema orolingual (IV): 125 mg', // extra «Angioedema orolingual»: «Metilprednisolona 125 mg IV»
  'Dexclorfeniramina': '• Angioedema orolingual (IV): 5 mg', // extra «Angioedema orolingual»: «en España, dexclorfeniramina 5 mg IV»
  'Adrenalina': '• Angioedema orolingual que progresa (SC): 0,3 mg\n• Angioedema orolingual que progresa (nebulizada): 0,5 mg', // extra «Angioedema orolingual»: «adrenalina 0,3 mg SC o 0,5 mg nebulizada»
  'Haloperidol': '• Agitación (IV): 2,5–5 mg', // extra «Agitación, coma o crisis comicial»: «haloperidol 2,5–5 mg IV»
  'Paracetamol': '• Hipertermia >37,5 °C (IV): 1 g', // extra «Glucemia o fiebre»: «paracetamol 1 g IV»
},
'codi-sepsia': {
  'Fentanilo': '• Analgesia si EVA ≥5/10 o dolor intenso (IV): 50 mcg', // nodo activar: «si EVA ≥5/10 o dolor intenso, fentanilo 50 µg + paracetamol 1 g IV»
  'Paracetamol': '• Analgesia si EVA ≥5/10 o dolor intenso (IV): 1 g', // nodo activar: «fentanilo 50 µg + paracetamol 1 g IV»
  'Insulina': '• Hiperglucemia (SC): 10 UI de insulina rápida; mantener cerca de 180 mg/dl', // nodo activar: «Insulina rápida 10 UI SC si hiperglucemia; mantener cerca de 180 mg/dl»
  'Plasmalyte': '• Hipoperfusión o shock (IV): bolos de 500 ml, reevaluando la tolerancia tras cada uno\n• Volumen orientativo (IV): 20–30 ml/kg\n• Niños, bolo de cristaloide (IV): 10 ml/kg, reevaluando tras cada uno', // nodo fluidos: «en bolos de <b>500 ml</b>» · «Volumen orientativo: <b>20–30 ml/kg</b>» · extra Niños: «bolos de cristaloide de <b>10 ml/kg</b>»
  'Hidrocortisona': '• Necesidad persistente de vasopresor (IV): 200 mg/día (50 mg cada 6 h)', // nodo nora: «<b>hidrocortisona 200 mg/día</b> IV (50 mg cada 6 h)»
},
'epoc-agudizado': {
  'Salbutamol': '• Nebulizado con aire (NEB): 2,5–5 mg cada hora × 2–3, después cada 2–4 h\n• Alternativa MDI con cámara (inh): 400–600 mcg (4–6 pulsaciones), misma pauta', // nodo trat: «salbutamol 2,5–5 mg + ipratropio 0,5 mg nebulizados con AIRE» · «MDI con cámara, salbutamol 400–600 µg (4–6 pulsaciones)»
  'Bromuro de ipratropio': '• Nebulizado con aire (NEB): 0,5 mg cada hora × 2–3, después cada 2–4 h\n• Alternativa MDI con cámara (inh): 80–120 mcg, misma pauta', // nodo trat: «ipratropio 0,5 mg nebulizados con AIRE» · «ipratropio 80–120 µg con la misma pauta»
  'Metilprednisolona': '• Si no tolera la vía oral (IV): 40 mg', // nodo trat: «metilprednisolona 40 mg IV si no tolera la vía oral»
  'Sulfato de magnesio': '• Sin respuesta al tratamiento inicial (IV en 20 min): 2 g, dosis única; evitar si FG <30', // protocolo SAE v3.0, tabla 3 · nodo trat
  'Enoxaparina': '• Profilaxis si ingresa (SC): 40 mg cada 24 h\n• FG <30 (SC): 20 mg cada 24 h', // protocolo SAE v3.0 · nodos trat y planta
},
'asma-crisis': {
  'Adrenalina': '• Anafilaxia (IM): 0,5 mg (1 mg/ml) en el vasto lateral, repetible cada 5–15 min', // nodo anafil: «<b>Adrenalina 0,5 mg IM</b> (1 mg/mL) en el vasto lateral, repetible cada 5–15 min»
  'Salbutamol': '• Crisis no grave (inh, MDI + cámara): 4–10 inh (100 mcg/inh) cada 20 min en la 1.ª hora\n• Crisis grave (inh, MDI + cámara): 4–10 inh cada 10–15 min en la 1.ª hora\n• Crisis grave (NEB): 2,5–5 mg cada 20 min\n• Crisis vital (NEB continua): 10–15 mg/h\n• Rescate en crisis refractaria, con acuerdo de UCI (IV): 200 mcg en 30 min, después perfusión', // nodo noGrave: «MDI + cámara 4–10 inh (100 µg/inh) cada 20 min» · nodo grave: «4–10 inh de salbutamol … cada 10–15 min … o NEB cada 20 min: salbutamol 2,5–5 mg» · nodo muyGrave: «NEB continua: salbutamol 10–15 mg/h» · nodo respC: «200 µg en 30 min → 0,1–0,2 µg/kg/min»
  'Bromuro de ipratropio': '• Crisis grave (inh, MDI + cámara): 4–8 inh (20 mcg/inh) cada 10–15 min en la 1.ª hora\n• Crisis grave (NEB): 0,5 mg cada 20 min\n• Crisis vital (NEB): 0,5 mg con la NEB continua de salbutamol', // nodo grave: «4–8 inh de ipratropio (20 µg/inh) cada 10–15 min … NEB cada 20 min: … ipratropio 0,5 mg» · nodo muyGrave: «salbutamol 10–15 mg/h + ipratropio 0,5 mg»
  'Budesonida': '• Crisis grave, 1.ª hora (NEB): 0,5 mg cada 20 min\n• Crisis grave, 1.ª hora (inh, MDI + cámara): 4 inh × 200 mcg cada 10–15 min', // nodo grave: «budesonida NEB 0,5 mg cada 20 min, o … budesonida 4 inh × 200 µg MDI + cámara cada 10–15 min»
  'Hidrocortisona': '• Crisis vital (IV): 250 mg', // nodo muyGrave: «<b>Hidrocortisona 250 mg IV</b> (SEMES)»
  'Metilprednisolona': '• Crisis grave si no tolera la VO (IV): 40 mg\n• Ingreso en planta (IV): 20–40 mg cada 8–12 h', // protocolo v3.2, tabla 4 · nodos grave y planta
  'Ketamina': '• Inducción de la IOT (IV): 1–2 mg/kg', // protocolo v3.2, 6.3 · nodo iot
  'Rocuronio': '• Inducción de la IOT (IV): 1–1,2 mg/kg', // protocolo v3.2, 6.3 · nodo iot
  'Sulfato de magnesio': '• Crisis vital, ya (IV en 20 min): 2 g en 50–100 ml de SSF, dosis única\n• Crisis grave sin mejoría en 1 h o respuesta B/C (IV en 20 min): 2 g, dosis única', // nodo muyGrave: «sulfato de magnesio 2 g IV</b> en 50–100 mL de SSF en 20 min, dosis única» · nodo grave/respB: «sulfato de magnesio 2 g IV en 20 min»
},
'tep-agudo': {
  'Heparina sódica': '• Bolo inicial (IV): 80 UI/kg', // nodo inestable: «<b>HNF bolo 80 U/kg</b> en cuanto se sospecha» · nodo catE: «HNF 80 U/kg» (la perfusión 18 U/kg/h del evaluador no se incluye)
  'Enoxaparina': '• Tratamiento, ClCr ≥30 (SC): 1 mg/kg cada 12 h\n• ClCr 15–30 (SC): 1 mg/kg cada 24 h', // nodo catC12/catC3: «<b>Enoxaparina 1 mg/kg SC cada 12 h</b> (ClCr 15–30 → cada 24 h; &lt;15 → HNF)»
  'Alteplasa': '• De elección, pendiente de stock en Urgencias\n• Estándar (IV): 100 mg en 2 h: 10 mg en bolo + 90 mg en 2 h\n• Peso <65 kg (IV): total máximo 1,5 mg por kg, bolo de 10 mg incluido\n• PCR, ERC 2025 (IV): 50 mg en bolo, con o sin otros 50 mg a los 30 min (máx. 100 mg); RCP ≥60–90 min tras la lisis\n• PCR, por peso, ERC 2025 (IV): 0,6–1 mg/kg (máx. 100 mg)\n• Dosis reducida, IIb (IV): 25–50 mg, p. ej. 10 mg en bolo + 40 mg en 2 h\n• Acelerada, solo inestabilidad extrema, fuera de ficha (IV en 15 min): 0,6 mg/kg (máx. 50 mg)', // protocolo v2.0 (08/11/2026), nodos lisis/lisisPCR · v1.1: nodo lisis: «<b>Alteplasa 100 mg IV en 2 h:</b> 10 mg en bolo + 90 mg en 2 h (&lt;65 kg: máx. 1,5 mg/kg total)» · «En PCR: 50 mg IV en bolo en 2 min … por peso, ERC 2025: 0,6–1,0 mg/kg, máx. 100 mg» · eval.calc: «Acelerada solo en inestabilidad extrema (fuera de ficha): 0,6 mg/kg … en 15 min, máx. 50 mg»
  'Tenecteplasa': '• TEP de alto riesgo y PCR, disponible actualmente, fuera de ficha (bolo IV único en 5–10 s, peso real): <60 kg 30 mg · 60–69 kg 35 mg · 70–79 kg 40 mg · 80–89 kg 45 mg · ≥90 kg 50 mg', // protocolo v3.0 clínica, apartado 4.1 y flujograma 4 · nodos lisis/lisisPCR
},
'epals': {
  'Adrenalina': '• PCR, ritmo no desfibrilable o desfibrilable (IV/IO): 0,01 mg/kg (máx. 1 mg), cada 4 min\n• Anafilaxia (IM): 0,01 mg/kg (máx. 0,5 mg), repetir a los 5 min si no mejora\n• Bradicardia con mala perfusión y FC <60 (IV): 1–2 mcg/kg', // nodo nodesf: «<b>Adrenalina 10 µg/kg IV/IO</b> … máx. 1 mg … cada 4 min» · nodo desf: «adrenalina 10 µg/kg» · nodo anaf: «<b>Adrenalina IM 10 µg/kg</b> (0,01 ml/kg de 1 mg/ml) … (máx. 0,5 mg) … repetir a los 5 min» · nodo bradi: «<b>adrenalina 1–2 µg/kg IV</b>»
  'Adrenalina@shock': '',
  'Adrenalina@anaf': '• Anafilaxia (IM): 0,01 mg/kg (máx. 0,5 mg), repetir a los 5 min si no mejora',
  'Adrenalina@bradi': '• Bradicardia con mala perfusión y FC <60 (IV): 1–2 mcg/kg',
  'Hidrocortisona@anaf': '',
  'Midazolam@convul': '• Estatus, 5 min (IM): 0,2 mg/kg (máx. 10 mg)\n• Estatus, 5 min (intranasal o bucal): 0,3 mg/kg (máx. 10 mg)\n• Estatus, 5 min (IV): 0,15 mg/kg (máx. 10 mg)',
  'Amiodarona': '• FV/TV sin pulso, tras la 3.ª descarga (IV/IO): 5 mg/kg (máx. 300 mg)\n• FV/TV sin pulso, tras la 5.ª descarga (IV/IO): 5 mg/kg (máx. 150 mg)\n• TV monomorfa estable (IV en 20–30 min): 5 mg/kg (máx. 300 mg)', // nodo desf: «<b>amiodarona 5 mg/kg</b> … (máx. 300) … <b>amiodarona 5 mg/kg tras la 5.ª</b> … (máx. 150)» · nodo tv: «<b>amiodarona 5 mg/kg en 20–30 min</b>» (d(5, 300))
  'Lidocaína': '• FV/TV sin pulso, alternativa a la amiodarona (IV/IO): 1 mg/kg (máx. 100 mg)\n• TV monomorfa estable (IV): 1 mg/kg (máx. 100 mg)', // nodo desf: «Alternativa a la amiodarona: <b>lidocaína 1 mg/kg</b> … (máx. 100)» · nodo tv: «<b>lidocaína 1 mg/kg</b>» (d(1, 100))
  'Ketamina': '• Secuencia rápida de intubación (IV): 2 mg/kg', // nodo resp: «SRI con <b>ketamina 2 mg/kg</b>»
  'Midazolam': '• Secuencia rápida de intubación (IV): 0,1 mg/kg\n• Estatus, 5 min (IM): 0,2 mg/kg (máx. 10 mg)\n• Estatus, 5 min (intranasal o bucal): 0,3 mg/kg (máx. 10 mg)\n• Estatus, 5 min (IV): 0,15 mg/kg (máx. 10 mg)', // nodo resp: «<b>midazolam 0,1 mg/kg</b>» · nodo convul: «midazolam IM 0,2 mg/kg · intranasal o bucal 0,3 mg/kg · IV 0,15 mg/kg (máx. 10 mg)»
  'Rocuronio': '• Secuencia rápida de intubación (IV): 1 mg/kg', // nodo resp: «<b>rocuronio 1 mg/kg</b>»
  'Hidrocortisona': '• Shock séptico refractario (IV): 1–2 mg/kg', // nodo shock: «Hidrocortisona 1–2 mg/kg si es refractario»
  'Atropina': '• Bradicardia vagal o bloqueo AV primario (IV): 0,02 mg/kg (máx. 0,5 mg)', // nodo bradi: «<b>atropina 20 µg/kg</b> … (máx. 0,5 mg)»
  'Adenosina': '• TSV, 1.ª dosis (IV en bolo rápido + 10 ml de SF): 0,1–0,2 mg/kg (máx. 6 mg)\n• TSV, 2.ª dosis (IV en bolo rápido): 0,3 mg/kg (máx. 12 mg)', // nodo tsv: «<b>Adenosina 0,1–0,2 mg/kg</b> … (máx. 6 mg) en bolo rápido + 10 ml de SF … → <b>0,3 mg/kg</b> … (máx. 12–18 mg) → aumentos de 0,05–0,1 hasta 0,5 mg/kg»
  'Sulfato de magnesio': '• TV polimórfica o torsades (IV en 10–20 min): 50 mg/kg (máx. 2 g)', // nodo tv: «<b>sulfato de magnesio 50 mg/kg</b> … (máx. 2 g) en 10–20 min»
  'Levetiracetam': '• Estatus, 2.ª línea ≤20 min (IV en 5 min): 40–60 mg/kg (máx. 4,5 g)', // nodo convul: «<b>levetiracetam 40–60 mg/kg</b> … en 5 min (máx. 4,5 g)»
  'Valproato sódico': '• Estatus, alternativa de 2.ª línea (IV): 40 mg/kg (máx. 3 g); no en hepatopatía ni metabolopatía', // nodo convul: «valproico 40 mg/kg (máx. 3 g; no en hepatopatía ni metabolopatía)»
},
'seup-fiebre-sin-foco': {
  'Cloruro sódico 0,9%': '• Paciente inestable, bolo de cristaloide (IV/IO): 10–20 ml/kg lo antes posible', // nodo inestable: «bolos de cristaloide 10-20 ml/kg lo antes posible»
  'Ceftriaxona@ceftri': '• 2-24 meses, reactantes elevados sin leucocituria (IM): 50 mg/kg (máx. 2 g)',
  'Ceftriaxona': '• 22-60 días con PCR >20 mg/L o neutrófilos >10.000 (IV): 50 mg/kg\n• 2-24 meses, reactantes elevados sin leucocituria (IM): 50 mg/kg (máx. 2 g)', // nodo pcralta: «Ceftriaxona 50 mg/kg IV»; nodo ceftri: «Ceftriaxona IM 50 mg/kg (máx. 2 g)»
},
'seup-bronquiolitis': {
  'Adrenalina': '• Rescate en bronquiolitis moderada-grave que no responde (nebulizada, con SSF y O₂ a 6–8 l/min): 0,5 mg/kg (máx. 3 mg)', // nodos grave y obs: «Adrenalina nebulizada 0,5 mg/kg (máx. 3 mg)», «con SSF y flujo de O₂ de 6–8 l/min»
  'Salbutamol': '• >12 meses con atopia o asma, fuera de la epidemia de VRS (MDI con cámara): 5 pulsaciones\n• Ídem con distrés grave (nebulizado, O₂ a 6–8 l/min): 2,5 mg', // nodo obs: «MDI 5 pulsaciones con cámara, o nebulizado 2,5 mg con O₂ a 6–8 l/min si distrés grave»
},
'seup-asma': {
  'Salbutamol': '• Crisis leve o moderada-grave (MDI con cámara): peso/3 pulsaciones de 100 mcg (mín. 5, máx. 10 pulsaciones); 3 dosis en la 1.ª hora (cada 20 min), después a demanda\n• Crisis grave o fallo respiratorio (nebulizado, O₂ a 6–8 l/min): 0,15 mg/kg (mín. 2,5 mg, máx. 5 mg)\n• Alta a domicilio (MDI con cámara): 5 pulsaciones a demanda', // nodos leve/modgrave: «peso/3 pulsaciones de 100 µg, mín. 5 y máx. 10»; modgrave/estab: «0,15 mg/kg, mín. 2,5 y máx. 5 mg»; nodo alta: «Salbutamol MDI a demanda con cámara (5 pulsaciones)»
  'Salbutamol@leve': '• Crisis leve o moderada-grave (MDI con cámara): peso/3 pulsaciones de 100 mcg (mín. 5, máx. 10 pulsaciones); 3 dosis en la 1.ª hora (cada 20 min), después a demanda',
  'Salbutamol@alta': '• Alta a domicilio (MDI con cámara): 5 pulsaciones a demanda',
  'Metilprednisolona@obs': '• Para completar la pauta (IV): 1–2 mg/kg/día',
  'Bromuro de ipratropio': '• Crisis moderada-grave (MDI): 4 pulsaciones (80 mcg), 2–3 dosis junto a las tandas iniciales de salbutamol\n• Crisis grave o fallo respiratorio (nebulizado): 250 mcg si <20 kg; 500 mcg si >20 kg, 2–3 dosis', // nodo modgrave: «MDI 4 pulsaciones (80 µg), 2–3 dosis»; nodos modgrave/estab: «250 µg si <20 kg, 500 µg si >20 kg»
  'Metilprednisolona': '• Fallo respiratorio, corticoide IV (IV): 1–2 mg/kg\n• Después o para completar la pauta (IV): 1–2 mg/kg/día', // nodo estab: «metilprednisolona 1–2 mg/kg, después 1–2 mg/kg/día»; nodo obs: «metilprednisolona IV 1–2 mg/kg/día»
  'Sulfato de magnesio': '• Crisis grave o hipoxemia persistente pese al rescate (IV en perfusión lenta de 20 min, dosis única): 40 mg/kg (máx. 2 g)', // nodo estab: «sulfato de magnesio IV 40 mg/kg (máx. 2 g) en perfusión lenta de 20 min, dosis única»
},
'seup-laringitis': {
  'Budesonida': '• Laringitis leve con intolerancia oral (nebulizada): 2 mg, sea cual sea el peso o la edad', // nodo leve: «budesonida nebulizada 2 mg (sea cual sea el peso o la edad)»
  'Adrenalina': '• Laringitis moderada o grave (nebulizada): 0,5 mg/kg (máx. 5 mg por nebulización)\n• Sin mejoría (nebulizada): repetir 0,5 mg/kg hasta 3 dosis cada 30 min (máx. 5 mg por nebulización)', // nodos moderada/grave: «Adrenalina nebulizada 0,5 mg/kg (máx. 5 mg por nebulización)»; nodo repetir: «hasta 3 dosis en intervalos de 30 min: 0,5 mg/kg»
},
'seup-deshidratacion': {
  'Cloruro sódico 0,9%': '• Shock hipovolémico, bolo (IV): 10 ml/kg, repetir si es preciso', // nodo shock: «SSF o solución balanceada 10 ml/kg en bolo, repetir si es preciso»
  'Plasmalyte': '• Shock hipovolémico, bolo de solución balanceada (IV): 10 ml/kg, repetir si es preciso', // nodo shock: «SSF o solución balanceada 10 ml/kg en bolo» (Plasmalyte = «solución balanceada»)
},
'seup-dolor': {
  'Paracetamol': '• Dolor leve, >10 días–10 años (VO): 15 mg/kg cada 4–6 h (tope diario: 75 mg por kg)\n• <10 días (VO): 10–15 mg/kg cada 6 h (tope diario: 60 mg por kg)\n• >10 años (VO): 0,5–1 g cada 4–6 h (tope diario: 4 g)\n• <10 kg (IV): 7,5 mg/kg (tope diario: 30 mg por kg)\n• 10–50 kg (IV): 15 mg/kg cada 4–6 h (tope diario: 60 mg por kg; 2 g si 10–33 kg, 3 g si 33–50 kg)\n• >50 kg (IV): 1 g cada 4–6 h (tope diario: 4 g)', // nodo leveNoInf: «>10 días–10 años 15 mg/kg cada 4–6 h (máx. 75 mg/kg/día) · >10 años 0,5–1 g … · <10 días 10–15 mg/kg cada 6 h (máx. 60 mg/kg/día)»; «Paracetamol IV: <10 kg 7,5 mg/kg … 10–50 kg 15 mg/kg … >50 kg 1 g»
  'Dexketoprofeno': '• Dolor moderado inflamatorio, <14 años off-label (VO): 12,5 mg cada 4–6 h o 25 mg cada 8 h (tope diario: 75 mg)\n• Dolor moderado inflamatorio (IV/IM): 50 mg cada 8–12 h (tope diario: 150 mg; <2 días)', // nodo modInf: «Dexketoprofeno oral <14 años (off-label) 12,5 mg cada 4–6 h o 25 mg cada 8 h (máx. 75 mg/día) · IV/IM 50 mg cada 8–12 h (máx. 150 mg/día, <2 días)»
  'Metamizol': '• Dolor moderado no inflamatorio, ≥12 meses (VO/IV/IM): 10–15 mg/kg/dosis cada 6 h (máx. 2 g; tope diario: 6 g)\n• 3–12 meses (VO/IV/IM), mitad de dosis: 5–7,5 mg/kg/dosis cada 6 h\n• Dosis puntual (IV/IM): 40 mg/kg (máx. 2 g)\n• Rectal: 1–3 años 250 mg; 3–11 años 500 mg; adolescentes 1 g, cada 6–8 h', // pauta del servicio (2026-11-08): 10–15 mg/kg/dosis; <12 meses, la mitad. Texto previo del nodo modNoInf: «oral (>3 meses o >5 kg): 12,5–20 mg/kg cada 6 h (máx. 2 g/8 h y 6 g/día). IV/IM (>3 meses): 12,5–20 mg/kg (el PDF lo expresa «/día»); dosis puntual de 40 mg/kg; máx. 2 g/8 h. Rectal: 1–3 años 250 mg · 3–11 años 500 mg · adolescentes 1 g»
  'Tramadol': '• Dolor moderado no inflamatorio, >12 años (vía no indicada): 50–100 mg cada 4–6 h (tope diario: 400 mg)\n• <12 años, off-label, dosis única (vía no indicada): 1–2 mg/kg', // nodo modNoInf: «Tramadol >12 años 50–100 mg cada 4–6 h (máx. 400 mg/día) · <12 años (off-label) 1–2 mg/kg en dosis única»
  'Fentanilo': '• Dolor intenso, 2–12 años (IV/IM): 1–2 mcg/kg cada 30–60 min (máx. 50 mcg)\n• >12 años (IV/IM): 25–50 mcg cada 1–2 h (tope: 500 mcg en 4 h)\n• >10 kg (intranasal): 1–2 mcg/kg (máx. 100 mcg)\n• Repetición (intranasal): 0,3–0,5 mcg/kg cada 3–5 min (máx. 100 mcg; tope acumulado 3 mcg por kg)\n• Nebulizado: 3 mcg/kg (máx. 200 mcg)', // nodo intenso: «Fentanilo IV/IM 2–12 años … 1–2 µg/kg cada 30–60 min (máx. 50 µg/dosis) · >12 años 25–50 µg cada 1–2 h (máx. 500 µg/4 h)»; «intranasal (>10 kg): 1–2 µg/kg, repetir 0,3–0,5 µg/kg cada 3–5 min (máx. 100 µg/dosis o 3 µg/kg). Nebulizado 3 µg/kg (máx. 200 µg)»
  'Cloruro mórfico': '• Dolor intenso (IV en 5 min): 0,05–0,1 mg/kg cada 2–4 h (tope diario: 15 mg)\n• Dolor intenso (IM/SC): 0,1–0,2 mg/kg cada 4 h (tope diario: 15 mg)\n• 2–12 años (VO): 0,2–0,5 mg/kg cada 4–6 h\n• >12 años (VO): 15–20 mg cada 4–6 h', // nodo intenso: «Morfina (cloruro mórfico) IV: 0,05–0,1 mg/kg cada 2–4 h, en 5 min (máx. 15 mg/día) · IM/SC 0,1–0,2 mg/kg cada 4 h (máx. 15 mg/día) … Oral: 2–12 años 0,2–0,5 mg/kg cada 4–6 h · >12 años 15–20 mg cada 4–6 h»
  'Ketamina': '• Dolor intenso (IV): 0,5–2 mg/kg (máx. 50 mg)\n• Dolor intenso (IM): 4–5 mg/kg (máx. 100 mg)\n• Off-label (IN): 0,5–4 mg/kg\n• Off-label (VO): 6–10 mg/kg', // nodo intenso: «Ketamina (tabla de dolor intenso) IV 0,5–2 mg/kg (máx. 50 mg) · IM 4–5 mg/kg (máx. 100 mg) · IN off-label 0,5–4 mg/kg … oral off-label 6–10 mg/kg»
  'Diazepam': '• Espasmo muscular agudo, ≥6 meses y <12 años (VO): 0,12–0,8 mg/kg/día repartido cada 8 h\n• Espasmo muscular agudo, ≥12 años (VO): 2–10 mg 2–4 veces al día (máx. 10 mg)', // extras Coadyuvantes: «diazepam oral 0,12–0,8 mg/kg/día cada 8 h (≥6 meses y <12 años); ≥12 años 2–10 mg 2–4 veces al día (máx. 10 mg/dosis)»
},
'seup-anafilaxia': {
  'Adrenalina': '• Anafilaxia, 1.ª línea (IM, cara anterolateral del muslo): 0,01 mg/kg (máx. 0,5 mg); repetir cada 5–15 min si no responde\n• Estridor (nebulizada, diluida en SSF hasta 3–5 ml): 0,5 mg/kg (máx. 5 mg)', // nodos estable/inestable: «Adrenalina IM 0,01 mg/kg (máx. 0,5 mg)»; nodo segunda: «Repetir adrenalina IM (se puede repetir cada 5–15 min)»; nodo inestable: «adrenalina nebulizada 0,5 mg/kg (máx. 5 mg), diluida en SSF hasta 3–5 ml»
  'Cloruro sódico 0,9%': '• Fallo cardiovascular / shock descompensado (IV/IO): 20 ml/kg; repetir si no responde', // nodo inestable: «expansión con SSF 20 ml/kg»; nodo segunda: «Repetir la expansión de líquidos IV (SSF 20 ml/kg)»
  'Salbutamol': '• Broncoespasmo (inhalado): 5–10 puff\n• Broncoespasmo (nebulizado, en SSF hasta 2,5 ml, O₂ a 6–8 l/min): 2,5 mg si <20 kg; 5 mg si >20 kg', // nodo inestable: «salbutamol inhalado 5–10 puff o nebulizado (<20 kg 2,5 mg; >20 kg 5 mg)»
  'Dexclorfeniramina': '• Síntomas cutáneos, 2.ª línea (IV sin diluir, en bolo lento): 0,15 mg/kg cada 6–8 h (máx. 5 mg)', // nodo segunda: «Dexclorfeniramina IV 0,15 mg/kg cada 6–8 h (máx. 5 mg/dosis), sin diluir, en bolo lento»
  'Metilprednisolona': '• Asma mal controlada o refractaria a 2 dosis de adrenalina (IV en bolo): 1–2 mg/kg\n• Después (IV): 0,5–2 mg/kg/día en 3 dosis (tope diario: 120 mg)', // nodo segunda: «Metilprednisolona IV 1–2 mg/kg, después 0,5–2 mg/kg/día en 3 dosis (máx. 120 mg/día)»
  'Adrenalina@tercera': '',
  'Glucagón': '• Anafilaxia refractaria, sobre todo si toma betabloqueantes (IV): 20–30 mcg/kg (máx. 1 mg); después perfusión a 5–15 mcg/min', // nodo tercera: «Glucagón IV … 20–30 µg/kg/dosis (máx. 1 mg), después perfusión a 5–15 µg/min»
},
'seup-estatus': {
  'Midazolam': '• EE precoz sin vía IV (IM): 0,2 mg/kg (máx. 10 mg)\n• EE precoz sin vía IV (bucal o intranasal): 0,3 mg/kg (máx. 10 mg)\n• Minuto 5 o 10, con vía, <6 años (IV/IO en 2 min): 0,1–0,2 mg/kg (máx. 5 mg)\n• Minuto 5 o 10, con vía, ≥6 años (IV/IO en 2 min): 0,1–0,2 mg/kg (máx. 10 mg)\n• EE refractario en UCIP, bolo (IV): 0,2 mg/kg (después perfusión)', // nodo bzdNoIV: «Midazolam IM 0,2 mg/kg (máx. 10 mg) o midazolam bucal o intranasal 0,3 mg/kg (máx. 10 mg)»; nodos bzdIV/bzd2: «midazolam IV 0,1–0,2 mg/kg (máx. 5 mg <6 años, 10 mg ≥6 años), en 2 min»; nodo refractario: «Midazolam 0,2 mg/kg en bolo → 0,05–0,4 mg/kg/h»
  'Diazepam': '• EE precoz sin vía IV (rectal): 0,5 mg/kg (máx. 10 mg)\n• Minuto 5 o 10, con vía, <5 años (IV/IO en 2 min): 0,1–0,2 mg/kg (máx. 5 mg)\n• Minuto 5 o 10, con vía, >5 años (IV/IO en 2 min): 0,1–0,2 mg/kg (máx. 10 mg)', // nodo bzdNoIV: «diazepam rectal 0,5 mg/kg (máx. 10 mg)»; nodos bzdIV/bzd2: «Diazepam IV 0,1–0,2 mg/kg (máx. 5 mg <5 años, 10 mg >5 años), en 2 min»
  'Midazolam@bzdIV': '• Minuto 5 o 10, con vía, <6 años (IV/IO en 2 min): 0,1–0,2 mg/kg (máx. 5 mg)\n• Minuto 5 o 10, con vía, ≥6 años (IV/IO en 2 min): 0,1–0,2 mg/kg (máx. 10 mg)',
  'Midazolam@bzd2': '• Minuto 5 o 10, con vía, <6 años (IV/IO en 2 min): 0,1–0,2 mg/kg (máx. 5 mg)\n• Minuto 5 o 10, con vía, ≥6 años (IV/IO en 2 min): 0,1–0,2 mg/kg (máx. 10 mg)',
  'Midazolam@refractario': '• EE refractario en UCIP, bolo (IV): 0,2 mg/kg (después perfusión)',
  'Diazepam@bzdIV': '• Minuto 5 o 10, con vía, <5 años (IV/IO en 2 min): 0,1–0,2 mg/kg (máx. 5 mg)\n• Minuto 5 o 10, con vía, >5 años (IV/IO en 2 min): 0,1–0,2 mg/kg (máx. 10 mg)',
  'Diazepam@bzd2': '• Minuto 5 o 10, con vía, <5 años (IV/IO en 2 min): 0,1–0,2 mg/kg (máx. 5 mg)\n• Minuto 5 o 10, con vía, >5 años (IV/IO en 2 min): 0,1–0,2 mg/kg (máx. 10 mg)',
  'Levetiracetam': '• EE establecido, 2.ª línea (IV en 5 min): 40–60 mg/kg (máx. 4500 mg)\n• Mantenimiento si cede (IV): 25–30 mg/kg cada 12 h', // nodos linea2a/linea2b: «Levetiracetam IV 40–60 mg/kg en 5 min (máx. 4.500 mg). Si cede: 25–30 mg/kg cada 12 h IV»
  'Valproato sódico': '• EE establecido, 2.ª línea, no en <2 años (IV en 5 min): 40 mg/kg (máx. 3000 mg)', // nodos linea2a/linea2b: «Valproato sódico IV 40 mg/kg en 5 min (máx. 3.000 mg)», «No en <2 años»
  'Propofol': '• EE refractario en UCIP, bolo (IV): 3–5 mg/kg (después perfusión)', // nodo refractario: «Propofol 3–5 mg/kg en bolo → 5–10 mg/kg/h»
},
'seup-sepsis': {
  'Plasmalyte': '• Bolo de cristaloide balanceado, 1.ª opción (IV/IO): 10–20 ml/kg; repetir hasta 40–60 ml por kg en la 1.ª hora (40 sin UCIP accesible), vigilando sobrecarga', // nodo bolos: «Bolo de cristaloide 10-20 ml/kg. Primera opción: cristaloide balanceado»; «Repetir bolos de 10-20 ml/kg si precisa, hasta 40-60 ml/kg en la 1.ª hora»
  'Cloruro sódico 0,9%': '• Bolo de cristaloide, alternativa aceptable al balanceado (IV/IO): 10–20 ml/kg; repetir hasta 40–60 ml por kg en la 1.ª hora (40 sin UCIP accesible), vigilando sobrecarga', // nodo bolos: «Bolo de cristaloide 10-20 ml/kg … el SSF es alternativa aceptable»
  'Gluconato de calcio': '• Hipocalcemia, calcio iónico <1,1 mmol/L, gluconato cálcico 10 % (IV): 0,5 ml/kg (máx. 20 ml)\n• Hipocalcemia, la misma dosis en mg (IV): 50 mg/kg (máx. 2 g)', // nodos atb1/atb2 (CORREGIR): «gluconato cálcico 10 % 50 mg/kg (0,5 ml/kg) (máx. 2 g = 20 ml)»
  'Glucosa': '• Hipoglucemia, dextrosa 10 % (IV a 2–3 ml/min): 2 ml/kg\n• Hipoglucemia, la misma dosis en gramos (IV): 0,2 g/kg', // nodos atb1/atb2 (CORREGIR): «dextrosa 10 % 0,2 g/kg (2 ml/kg) a 2-3 ml/min» (decisión del servicio, ERC 2025)
},
'seup-shock': {
  'Cloruro sódico 0,9%': '• Fluidos a ritmo rápido (IV/IO, jeringa o manguito de presión): 10 ml/kg; repetir hasta 40–60 ml por kg si no hay sobrecarga', // nodo fluidos: «Fluidos 10 ml/kg a ritmo rápido … SSF 0,9 % … Puede necesitar hasta 40-60 ml/kg si no hay sobrecarga»
  'Adrenalina@inotropicos': '',
  'Adrenalina@caliente': '',
  'Adrenalina': '• Shock anafiláctico (IM, adrenalina 1:1.000): 0,01 mg/kg (máx. 0,3 mg)', // nodo fluidos: «adrenalina 1:1.000 IM 0,01 mg/kg (máx. 0,3 mg = 0,01 ml/kg, máx. 0,3 ml)»
},
'seup-toxicos': {
  'Carbón activado': '• Descontaminación digestiva, mejor en la 1.ª hora (VO): 1 g/kg (máx. 50 g)\n• Dosis repetidas tras la inicial (VO): 0,25–0,5 g/kg cada 3–6 h hasta 24 h (máx. 25 g)', // nodo carbon: «1 g/kg por vía oral (máx. 50 g), mejor en la 1.ª hora»; nodo elimSi: «0,25–0,5 g/kg (máx. 25 g) cada 3–6 h hasta 24 h»
},
};
