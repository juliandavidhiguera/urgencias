/* ==================================================================
   SCALES — todas las escalas clínicas en formato declarativo
   items: {t:'chk',l,p} | {t:'sel',l,o:[[etiqueta,valor]]} | {t:'num',l,u,f(v)}
   agg: 'sum' (por defecto) | 'max'
   ================================================================== */
window.SCALES = [

// ── 8 escalas migradas (antes hand-coded) ──────────────────────────

{id:'qsofa', src:'Sepsis-3 · Singer 2016 · PMID 26903338', title:'qSOFA', sub:'Sepsis — ≥2 alto riesgo · SSC 2021: NO usar como cribado único', badge:'red', tag:'Sepsis', max:3, items:[
  {t:'chk', l:'FR ≥22 rpm', p:1},
  {t:'chk', l:'Alteración estado mental (GCS <15)', p:1},
  {t:'chk', l:'TAS ≤100 mmHg', p:1}],
  interp:function(s){return s===0?['low','Sin criterios','Riesgo bajo']:s===1?['mid','1 criterio','Vigilancia — reevaluar']:['high','≥2 criterios','ALTO RIESGO SEPSIS — activar protocolo']}},

{id:'curb65', src:'Lim 2003 · PMID 12728155', title:'CURB-65', sub:'Neumonía — gravedad e ingreso', badge:'amber', tag:'Neumonía', max:5, items:[
  {t:'chk', l:'C — Confusión (nueva, orientación alterada)', p:1},
  {t:'chk', l:'U — Urea >7 mmol/L (BUN >20 mg/dL)', p:1},
  {t:'chk', l:'R — FR ≥30 rpm', p:1},
  {t:'chk', l:'B — TAS <90 mmHg o TAD ≤60 mmHg', p:1},
  {t:'chk', l:'65 — Edad ≥65 años', p:1}],
  interp:function(s){return s<=1?['low','0–1 pts','Ambulatorio (mortalidad ~2%)']:s===2?['mid','2 pts','Ingreso planta (mortalidad ~9%)']:['high',s+' pts','Ingreso UCI valorar (mortalidad '+[,,9,17,57][s]+'%)']}},

{id:'wells', src:'Wells 2000 · PMID 10744147', title:'Wells — TEP', sub:'Probabilidad pre-test de tromboembolismo', badge:'red', tag:'TEP', max:12.5, items:[
  {t:'chk', l:'Signos/síntomas de TVP', p:3},
  {t:'chk', l:'TEP más probable que diagnóstico alternativo', p:3},
  {t:'chk', l:'FC >100 lpm', p:1.5},
  {t:'chk', l:'Inmovilización ≥3 días o cirugía en <4 semanas', p:1.5},
  {t:'chk', l:'TEP o TVP previos', p:1.5},
  {t:'chk', l:'Hemoptisis', p:1},
  {t:'chk', l:'Neoplasia activa (tratamiento en <6 meses)', p:1}],
  interp:function(s){return s<2?['low','Probabilidad baja','DD <500 descarta TEP']:s<=6?['mid','Probabilidad moderada','DD + AngioTC si DD+']:['high','Probabilidad alta','AngioTC directo sin DD previo']}},

{id:'chadsvasc', title:'CHA₂DS₂-VASc', sub:'FA — Riesgo tromboembólico · ACC/AHA 2023 (incluye sexo femenino)', badge:'blue', tag:'FA', max:9, items:[
  {t:'chk', l:'C — IC congestiva / FE deprimida', p:1},
  {t:'chk', l:'H — Hipertensión arterial', p:1},
  {t:'chk', l:'A₂ — Edad ≥75 años', p:2},
  {t:'chk', l:'D — Diabetes mellitus', p:1},
  {t:'chk', l:'S₂ — Ictus/AIT/tromboembolismo previo', p:2},
  {t:'chk', l:'V — Enfermedad vascular (IAM, EAP, placa aórtica)', p:1},
  {t:'chk', l:'A — Edad 65–74 años', p:1},
  {t:'chk', l:'Sc — Sexo femenino', p:1}],
  interp:function(s){return s===0?['low','Sin indicación','ACO no recomendado']:s===1?['mid','Riesgo bajo-mod.','ACO individualizar (hombre) · Considerar (mujer)']:['high','ACO indicado','Riesgo ~'+[0,1.3,2.2,3.2,4,6.7,9.8,9.6,12.5,15.2][Math.min(s,9)]+'%/año']},
  src:'ACC/AHA/ACCP/HRS 2023 · PMID 38043043'
},

{id:'chadsva', title:'CHA₂DS₂-VA', sub:'FA — Riesgo tromboembólico · ESC 2024 (sin sexo femenino)', badge:'blue', tag:'FA', max:8, items:[
  {t:'chk', l:'C — IC crónica (síntomas cualquier FEVI, o FEVI ≤40% asintomática)', p:1},
  {t:'chk', l:'H — Hipertensión (>140/90 en ≥2 ocasiones o en tratamiento)', p:1},
  {t:'chk', l:'A₂ — Edad ≥75 años', p:2},
  {t:'chk', l:'D — Diabetes mellitus (tipo 1 o 2, o en tratamiento)', p:1},
  {t:'chk', l:'S₂ — Ictus/AIT/tromboembolismo arterial previo', p:2},
  {t:'chk', l:'V — Enfermedad vascular (IAM, angina, revascularización, EAP)', p:1},
  {t:'chk', l:'A — Edad 65–74 años', p:1}],
  interp:function(s){return s===0?['low','0 pts','ACO no indicada a largo plazo']:s===1?['mid','1 pt','ACO debe considerarse — decisión compartida']:['high',s+' pts','ACO RECOMENDADA (preferentemente DOAC)']},
  src:'ESC 2024 · PMID 39210723'
},

{id:'heart', src:'Backus 2013, validacion prospectiva · PMID 23465250', title:'HEART Score', sub:'SCA — Estratificación dolor torácico', badge:'red', tag:'SCA', max:10, items:[
  {t:'sel', l:'H — Historia (muy sospechosa)', o:[['Poco sospechosa (0)',0],['Moderada (1)',1],['Muy sospechosa (2)',2]]},
  {t:'sel', l:'E — ECG', o:[['Normal (0)',0],['BRI/HVI/repolarización (1)',1],['Desviación ST nueva (2)',2]]},
  {t:'sel', l:'A — Edad', o:[['<45 años (0)',0],['45–65 años (1)',1],['>65 años (2)',2]]},
  {t:'sel', l:'R — Factores de riesgo CV', o:[['Sin FR conocidos (0)',0],['1–2 FR o historia aterosclerosis (1)',1],['≥3 FR o enfermedad aterosclerótica (2)',2]]},
  {t:'sel', l:'T — Troponina', o:[['≤LSN (0)',0],['1–3x LSN (1)',1],['>3x LSN (2)',2]]}],
  interp:function(s){return s<=3?['low','Riesgo bajo','Alta segura — MACE <2%']:s<=6?['mid','Riesgo moderado','Ingreso — MACE 12–17%']:['high','Riesgo alto','Revascularización urgente — MACE >50%']}},

{id:'gbs', src:'Blatchford 2000 · PMID 11073021', title:'Glasgow-Blatchford', sub:'HDA — Necesidad de intervención', badge:'amber', tag:'HDA', max:29, items:[
  {t:'sel', l:'Urea sérica (mmol/L)', o:[['<6.5 (0)',0],['6.5–7.9 (2)',2],['8.0–9.9 (3)',3],['10.0–24.9 (4)',4],['≥25 (6)',6]]},
  {t:'sel', l:'Hemoglobina — Hombre (g/dL)', o:[['≥13 (0)',0],['12–12.9 (1)',1],['10–11.9 (3)',3],['<10 (6)',6]]},
  {t:'sel', l:'Hemoglobina — Mujer (g/dL)', o:[['≥12 (0)',0],['10–11.9 (1)',1],['<10 (6)',6]]},
  {t:'sel', l:'TAS sistólica (mmHg)', o:[['≥110 (0)',0],['100–109 (1)',1],['90–99 (2)',2],['<90 (3)',3]]},
  {t:'chk', l:'FC ≥100 lpm', p:1},
  {t:'chk', l:'Presentación con melenas', p:1},
  {t:'chk', l:'Síncope', p:2},
  {t:'chk', l:'Hepatopatía conocida', p:2},
  {t:'chk', l:'IC congestiva', p:2}],
  interp:function(s){return s===0?['low','Riesgo muy bajo','Alta domiciliaria posible']:s<=5?['mid','Riesgo moderado','Ingreso — probable endoscopia']:['high','Riesgo alto','Endoscopia urgente — '+s+'pts']}},

{id:'bisap', src:'Wu 2008 · PMID 18519429', title:'BISAP', sub:'Pancreatitis aguda — mortalidad', badge:'amber', tag:'Pancreatitis', max:5, items:[
  {t:'chk', l:'B — BUN >25 mg/dL', p:1},
  {t:'chk', l:'I — Alteración estado mental (desorientación)', p:1},
  {t:'chk', l:'S — SIRS (≥2 criterios)', p:1},
  {t:'chk', l:'A — Edad >60 años', p:1},
  {t:'chk', l:'P — Derrame pleural en imagen', p:1}],
  interp:function(s){return s<=1?['low','Leve','Mortalidad <1%']:s===2?['mid','Moderado','Mortalidad ~2% — monitorizar']:['high','Grave','Mortalidad '+(s===3?'5':s===4?'13':'22')+'% — UCI valorar']}},

{id:'abcd2', src:'Johnston 2007 · PMID 17258668', title:'ABCD2', sub:'AIT — Riesgo de ictus a 2 días', badge:'red', tag:'AIT/Ictus', max:7, items:[
  {t:'chk', l:'A — Edad ≥60 años', p:1},
  {t:'chk', l:'B — TAS ≥140 o TAD ≥90 mmHg', p:1},
  {t:'sel', l:'C — Clínica: hemiparesia unilateral', o:[['Sin déficit motor (0)',0],['Alteración habla sin déficit motor (1)',1],['Hemiparesia unilateral (2)',2]]},
  {t:'sel', l:'D — Duración síntomas', o:[['<10 minutos (0)',0],['10–59 minutos (1)',1],['≥60 minutos (2)',2]]},
  {t:'chk', l:'D2 — Diabetes mellitus', p:1}],
  interp:function(s){return s<=3?['low','Riesgo bajo','Riesgo ictus 2d: ~1%']:s<=5?['mid','Riesgo moderado','Riesgo ictus 2d: ~4%']:['high','Riesgo alto','Riesgo ictus 2d: ~8% — hospitalizar']}},

// ── 11 escalas adicionales (previamente EXTRA_SCALES) ──────────────

{id:'hasbled', src:'Pisters 2010 · PMID 20299623', title:'HAS-BLED', sub:'FA — riesgo hemorrágico bajo anticoagulación', badge:'blue', tag:'FA', max:9, items:[
  {t:'chk', l:'H — HTA no controlada (TAS >160 mmHg)', p:1},
  {t:'chk', l:'A — Función renal alterada (diálisis, trasplante, Cr >2,26 mg/dL)', p:1},
  {t:'chk', l:'A — Función hepática alterada (cirrosis, Bil >2×, transaminasas >3×)', p:1},
  {t:'chk', l:'S — Ictus previo', p:1},
  {t:'chk', l:'B — Sangrado previo o predisposición (anemia)', p:1},
  {t:'chk', l:'L — INR lábil (TRT <60%)', p:1},
  {t:'chk', l:'E — Edad >65 años', p:1},
  {t:'chk', l:'D — Fármacos (AINE, antiagregantes)', p:1},
  {t:'chk', l:'D — Alcohol ≥8 UBE/semana', p:1}],
  interp:function(s){return s<=2?['low','Riesgo bajo','Sangrado mayor ~1%/año']:['high','Riesgo alto','≥3: corregir factores modificables — NO contraindica ACO']}},

{id:'spesi', src:'Jimenez 2010 · PMID 20696966', title:'sPESI', sub:'TEP — mortalidad a 30 días (simplificado)', badge:'red', tag:'TEP', max:6, items:[
  {t:'chk', l:'Edad >80 años', p:1},
  {t:'chk', l:'Cáncer activo', p:1},
  {t:'chk', l:'Insuficiencia cardiaca o enfermedad pulmonar crónica', p:1},
  {t:'chk', l:'FC ≥110 lpm', p:1},
  {t:'chk', l:'TAS <100 mmHg', p:1},
  {t:'chk', l:'SpO₂ <90%', p:1}],
  interp:function(s){return s===0?['low','Bajo riesgo','Mortalidad 30 d ~1% — valorar alta precoz (criterios Hestia)']:['high','Alto riesgo','Mortalidad 30 d ~10% — ingreso + troponina y función VD']}},

{id:'pesi', src:'Aujesky 2005 · PMID 16020800', title:'PESI original', sub:'TEP — clases I–V de mortalidad a 30 días', badge:'red', tag:'TEP', max:310, items:[
  {t:'num', l:'Edad (años) — suma su valor directo', u:'años', f:function(v){return v}},
  {t:'chk', l:'Sexo masculino', p:10},
  {t:'chk', l:'Cáncer', p:30},
  {t:'chk', l:'Insuficiencia cardiaca', p:10},
  {t:'chk', l:'Enfermedad pulmonar crónica', p:10},
  {t:'chk', l:'FC ≥110 lpm', p:20},
  {t:'chk', l:'TAS <100 mmHg', p:30},
  {t:'chk', l:'FR ≥30 rpm', p:20},
  {t:'chk', l:'Temperatura <36 °C', p:20},
  {t:'chk', l:'Alteración del estado mental', p:60},
  {t:'chk', l:'SpO₂ <90%', p:20}],
  interp:function(s){return s<=65?['low','Clase I','Muy bajo riesgo — mortalidad 0–1,6%']:s<=85?['low','Clase II','Bajo riesgo — 1,7–3,5%']:s<=105?['mid','Clase III','Riesgo intermedio — 3,2–7,1%']:s<=125?['high','Clase IV','Alto riesgo — 4,0–11,4%']:['high','Clase V','Muy alto riesgo — 10,0–24,5%']}},

{id:'geneva', src:'Ginebra revisado · Le Gal 2006 · PMID 16461960', title:'Ginebra revisado', sub:'TEP — probabilidad clínica pre-test', badge:'red', tag:'TEP', max:22, items:[
  {t:'chk', l:'Edad >65 años', p:1},
  {t:'chk', l:'TVP o TEP previos', p:3},
  {t:'chk', l:'Cirugía o fractura <1 mes', p:2},
  {t:'chk', l:'Neoplasia activa (sólida o hematológica)', p:2},
  {t:'chk', l:'Dolor unilateral en extremidad inferior', p:3},
  {t:'chk', l:'Hemoptisis', p:2},
  {t:'sel', l:'Frecuencia cardiaca', o:[['<75 lpm (0)',0],['75–94 lpm (3)',3],['≥95 lpm (5)',5]]},
  {t:'chk', l:'Dolor a la palpación venosa profunda + edema unilateral', p:4}],
  interp:function(s){return s<=3?['low','Probabilidad baja','DD de alta sensibilidad (ajustado a edad) descarta']:s<=10?['mid','Probabilidad intermedia','DD; si positivo → angioTC']:['high','Probabilidad alta','AngioTC directo — no excluir con DD']}},

{id:'nihss', src:'Brott 1989 · PMID 2749846', title:'NIHSS', sub:'Ictus — déficit neurológico (0–42)', badge:'red', tag:'Ictus', max:42, items:[
  {t:'sel', l:'1a — Nivel de conciencia', o:[['Alerta (0)',0],['Somnoliento, responde a estímulo menor (1)',1],['Estuporoso, requiere estímulo repetido (2)',2],['Coma (3)',3]]},
  {t:'sel', l:'1b — Preguntas (mes y edad)', o:[['Ambas correctas (0)',0],['Una correcta (1)',1],['Ninguna correcta (2)',2]]},
  {t:'sel', l:'1c — Órdenes (abrir/cerrar ojos, puño)', o:[['Ambas correctas (0)',0],['Una correcta (1)',1],['Ninguna (2)',2]]},
  {t:'sel', l:'2 — Mirada conjugada', o:[['Normal (0)',0],['Paresia parcial (1)',1],['Desviación forzada (2)',2]]},
  {t:'sel', l:'3 — Campos visuales', o:[['Normal (0)',0],['Hemianopsia parcial (1)',1],['Hemianopsia completa (2)',2],['Ceguera bilateral (3)',3]]},
  {t:'sel', l:'4 — Paresia facial', o:[['Normal (0)',0],['Asimetría leve (1)',1],['Parálisis parcial inferior (2)',2],['Parálisis completa (3)',3]]},
  {t:'sel', l:'5a — Motor brazo izquierdo', o:[['No claudica 10 s (0)',0],['Claudica <10 s (1)',1],['Vence gravedad parcialmente (2)',2],['No vence gravedad (3)',3],['Ningún movimiento (4)',4]]},
  {t:'sel', l:'5b — Motor brazo derecho', o:[['No claudica 10 s (0)',0],['Claudica <10 s (1)',1],['Vence gravedad parcialmente (2)',2],['No vence gravedad (3)',3],['Ningún movimiento (4)',4]]},
  {t:'sel', l:'6a — Motor pierna izquierda', o:[['No claudica 5 s (0)',0],['Claudica <5 s (1)',1],['Esfuerzo contra gravedad (2)',2],['No vence gravedad (3)',3],['Ningún movimiento (4)',4]]},
  {t:'sel', l:'6b — Motor pierna derecha', o:[['No claudica 5 s (0)',0],['Claudica <5 s (1)',1],['Esfuerzo contra gravedad (2)',2],['No vence gravedad (3)',3],['Ningún movimiento (4)',4]]},
  {t:'sel', l:'7 — Ataxia de miembros', o:[['Ausente (0)',0],['Presente en 1 extremidad (1)',1],['Presente en 2 extremidades (2)',2]]},
  {t:'sel', l:'8 — Sensibilidad', o:[['Normal (0)',0],['Hipoestesia leve-moderada (1)',1],['Anestesia grave o bilateral (2)',2]]},
  {t:'sel', l:'9 — Lenguaje', o:[['Normal (0)',0],['Afasia leve-moderada (1)',1],['Afasia grave (2)',2],['Mutismo / afasia global (3)',3]]},
  {t:'sel', l:'10 — Disartria', o:[['Normal (0)',0],['Leve-moderada (1)',1],['Grave / anartria (2)',2]]},
  {t:'sel', l:'11 — Extinción / inatención', o:[['Ausente (0)',0],['Una modalidad (1)',1],['≥2 modalidades (2)',2]]}],
  interp:function(s){return s===0?['low','Sin déficit','NIHSS 0']:s<=4?['low','Ictus leve','Valorar trombolisis individualizada si déficit incapacitante']:s<=15?['mid','Ictus moderado','Candidato a reperfusión si ventana y sin CI']:s<=20?['high','Moderado-grave','Activar código ictus · valorar trombectomía']:['high','Ictus grave','Alta probabilidad de oclusión de gran vaso — trombectomía']}},

{id:'sofa', src:'Vincent 1996 · PMID 8844239 · Sepsis-3 · PMID 26903338', title:'SOFA', sub:'Disfunción orgánica (0–24) · Δ≥2 = sepsis', badge:'red', tag:'Sepsis', max:24, items:[
  {t:'sel', l:'Respiratorio — PaO₂/FiO₂', o:[['≥400 (0)',0],['<400 (1)',1],['<300 (2)',2],['<200 con soporte ventilatorio (3)',3],['<100 con soporte ventilatorio (4)',4]]},
  {t:'sel', l:'Coagulación — plaquetas ×10³/µL', o:[['≥150 (0)',0],['<150 (1)',1],['<100 (2)',2],['<50 (3)',3],['<20 (4)',4]]},
  {t:'sel', l:'Hepático — bilirrubina mg/dL', o:[['<1,2 (0)',0],['1,2–1,9 (1)',1],['2,0–5,9 (2)',2],['6,0–11,9 (3)',3],['>12 (4)',4]]},
  {t:'sel', l:'Cardiovascular', o:[['PAM ≥70 mmHg (0)',0],['PAM <70 mmHg (1)',1],['Dopamina ≤5 o dobutamina cualquier dosis (2)',2],['Dopamina >5 o NA/ADR ≤0,1 µg/kg/min (3)',3],['Dopamina >15 o NA/ADR >0,1 µg/kg/min (4)',4]]},
  {t:'sel', l:'SNC — Glasgow', o:[['15 (0)',0],['13–14 (1)',1],['10–12 (2)',2],['6–9 (3)',3],['<6 (4)',4]]},
  {t:'sel', l:'Renal — creatinina mg/dL o diuresis', o:[['<1,2 (0)',0],['1,2–1,9 (1)',1],['2,0–3,4 (2)',2],['3,5–4,9 o <500 mL/d (3)',3],['>5,0 o <200 mL/d (4)',4]]}],
  interp:function(s){return s<=6?['low',s+' puntos','Mortalidad <10%']:s<=9?['mid',s+' puntos','Mortalidad 15–20%']:s<=12?['high',s+' puntos','Mortalidad 40–50%']:['high',s+' puntos','Mortalidad >50–80% — UCI']}},

{id:'gcs', src:'Teasdale y Jennett 1974 · PMID 4136544', title:'Glasgow (GCS)', sub:'Nivel de conciencia (3–15)', badge:'red', tag:'Neuro', max:15, items:[
  {t:'sel', l:'Apertura ocular', o:[['Espontánea (4)',4],['A la voz (3)',3],['Al dolor (2)',2],['Ausente (1)',1]]},
  {t:'sel', l:'Respuesta verbal', o:[['Orientada (5)',5],['Confusa (4)',4],['Palabras inapropiadas (3)',3],['Sonidos incomprensibles (2)',2],['Ausente (1)',1]]},
  {t:'sel', l:'Respuesta motora', o:[['Obedece órdenes (6)',6],['Localiza el dolor (5)',5],['Retirada al dolor (4)',4],['Flexión anómala / decorticación (3)',3],['Extensión / descerebración (2)',2],['Ausente (1)',1]]}],
  interp:function(s){return s>=14?['low',s+'/15','TCE leve']:s>=9?['mid',s+'/15','TCE moderado — TC craneal + observación']:['high',s+'/15','TCE grave — ≤8: aislamiento de vía aérea']}},

{id:'kdigo', src:'KDIGO 2012 AKI · resumen Kellum 2013 · PMID 23394211', title:'KDIGO — AKI', sub:'Fracaso renal agudo (estadio = criterio más alto)', badge:'amber', tag:'AKI', max:3, agg:'max', items:[
  {t:'sel', l:'Criterio creatinina', o:[['Sin criterio (0)',0],['×1,5–1,9 basal o ↑≥0,3 mg/dL en 48 h (1)',1],['×2,0–2,9 basal (2)',2],['×3 basal, Cr ≥4 mg/dL o inicio de TRS (3)',3]]},
  {t:'sel', l:'Criterio diuresis', o:[['Sin criterio (0)',0],['<0,5 mL/kg/h durante 6–12 h (1)',1],['<0,5 mL/kg/h ≥12 h (2)',2],['<0,3 mL/kg/h ≥24 h o anuria ≥12 h (3)',3]]}],
  interp:function(s){return s===0?['low','Sin AKI','No cumple criterios KDIGO']:s===1?['mid','Estadio 1','Retirar nefrotóxicos · optimizar volemia · control Cr/diuresis']:s===2?['high','Estadio 2','Revisar dosis por FG · descartar obstrucción (eco) · valorar nefrología']:['high','Estadio 3','Valorar TRS: hiperK refractaria, acidosis, sobrecarga, uremia']}},

{id:'decaf', src:'Steer 2012 · PMID 22895999', title:'DECAF', sub:'EPOC agudizado — mortalidad intrahospitalaria', badge:'amber', tag:'EPOC', max:6, items:[
  {t:'sel', l:'eMRCD — disnea basal estable', o:[['Grados 1–4 (0)',0],['5a: no sale de casa, autónomo para lavado/vestido (1)',1],['5b: no sale de casa, dependiente para lavado/vestido (2)',2]]},
  {t:'chk', l:'Eosinófilos <0,05 ×10⁹/L', p:1},
  {t:'chk', l:'Consolidación en radiografía de tórax', p:1},
  {t:'chk', l:'pH <7,30', p:1},
  {t:'chk', l:'Fibrilación auricular en ECG', p:1}],
  interp:function(s){return s<=1?['low',s+' puntos','Mortalidad 0–1,5% — valorar hospitalización a domicilio']:s===2?['mid','2 puntos','Mortalidad ~5% — ingreso convencional']:['high',s+' puntos','Mortalidad 15–50% — valorar UCI / adecuación de esfuerzo']}},

{id:'at4', src:'Bellelli 2014 · PMID 24590568', title:'4AT', sub:'Delirium — cribado rápido (≥4 = posible delirium)', badge:'amber', tag:'Delirium', max:12, items:[
  {t:'sel', l:'Alerta (somnolencia o agitación marcada)', o:[['Normal (0)',0],['Alterada (4)',4]]},
  {t:'sel', l:'AMT4 — edad, fecha nacimiento, lugar, año', o:[['Sin errores (0)',0],['1 error (1)',1],['≥2 errores o no evaluable (2)',2]]},
  {t:'sel', l:'Atención — meses del año en orden inverso', o:[['≥7 meses correctos (0)',0],['<7 o rechaza (1)',1],['No evaluable por enfermedad/somnolencia (2)',2]]},
  {t:'sel', l:'Cambio agudo o curso fluctuante (2 semanas)', o:[['No (0)',0],['Sí (4)',4]]}],
  interp:function(s){return s===0?['low','0 puntos','Delirium y deterioro cognitivo improbables']:s<=3?['mid',s+' puntos','Posible deterioro cognitivo — delirium no descartado']:['high',s+' puntos','Posible delirium ± deterioro cognitivo — buscar causa: ITU, retención, fecaloma, fármacos, hipoglucemia']}},

{id:'rockall', src:'Rockall 1996 · PMID 8675081', title:'Rockall pre-endoscópico', sub:'HDA — riesgo previo a endoscopia (0–7)', badge:'amber', tag:'HDA', max:7, items:[
  {t:'sel', l:'Edad', o:[['<60 años (0)',0],['60–79 años (1)',1],['≥80 años (2)',2]]},
  {t:'sel', l:'Shock', o:[['Sin shock: TAS ≥100, FC <100 (0)',0],['Taquicardia: TAS ≥100, FC ≥100 (1)',1],['Hipotensión: TAS <100 (2)',2]]},
  {t:'sel', l:'Comorbilidad', o:[['Ninguna mayor (0)',0],['Cardiopatía isquémica, IC u otra mayor (2)',2],['IRC, hepatopatía, neoplasia diseminada (3)',3]]}],
  interp:function(s){return s===0?['low','0 puntos','Riesgo muy bajo — valorar alta precoz']:s<=2?['mid',s+' puntos','Riesgo intermedio — endoscopia <24 h']:['high',s+' puntos','Alto riesgo — endoscopia urgente + ingreso']}},

{id:'aims65', src:'Saltzman 2011 · PMID 21907980', title:'AIMS65', sub:'HDA — mortalidad intrahospitalaria', badge:'amber', tag:'HDA', max:5, items:[
  {t:'chk', l:'A — Albúmina <3,0 g/dL', p:1},
  {t:'chk', l:'I — INR >1,5', p:1},
  {t:'chk', l:'M — Alteración del estado mental', p:1},
  {t:'chk', l:'S — TAS ≤90 mmHg', p:1},
  {t:'chk', l:'65 — Edad >65 años', p:1}],
  interp:function(s){return s<=1?['low',s+' puntos','Mortalidad 1–3%']:s===2?['mid','2 puntos','Mortalidad ~6%']:['high',s+' puntos','Mortalidad 15–25% — UCI valorar']}},

{id:'ranson', src:'Ranson 1974 · Surg Gynecol Obstet 139:69 · sin PMID indexado', title:'Ranson (no biliar)', sub:'Pancreatitis — ingreso + 48 h (≥3 = grave)', badge:'amber', tag:'Pancreatitis', max:11, items:[
  {t:'chk', l:'Ingreso — Edad >55 años', p:1},
  {t:'chk', l:'Ingreso — Leucocitos >16.000/µL', p:1},
  {t:'chk', l:'Ingreso — Glucosa >200 mg/dL', p:1},
  {t:'chk', l:'Ingreso — LDH >350 UI/L', p:1},
  {t:'chk', l:'Ingreso — AST >250 UI/L', p:1},
  {t:'chk', l:'48 h — Descenso del hematocrito >10%', p:1},
  {t:'chk', l:'48 h — Aumento del BUN >5 mg/dL', p:1},
  {t:'chk', l:'48 h — Calcio <8 mg/dL', p:1},
  {t:'chk', l:'48 h — PaO₂ <60 mmHg', p:1},
  {t:'chk', l:'48 h — Déficit de bases >4 mEq/L', p:1},
  {t:'chk', l:'48 h — Secuestro de líquidos >6 L', p:1}],
  interp:function(s){return s<=2?['low',s+' criterios','Mortalidad ~1% — pancreatitis leve']:s<=4?['mid',s+' criterios','Mortalidad ~15% — monitorización estrecha']:s<=6?['high',s+' criterios','Mortalidad ~40% — UCI']:['high',s+' criterios','Mortalidad ~100% — UCI']}},

{id:'barthel', src:'Mahoney y Barthel 1965 · PMID 14258950', title:'Barthel', sub:'Situación funcional basal (0–100)', badge:'blue', tag:'Geriatría', max:100, items:[
  {t:'sel', l:'Alimentación', o:[['Independiente (10)',10],['Necesita ayuda (5)',5],['Dependiente (0)',0]]},
  {t:'sel', l:'Baño / ducha', o:[['Independiente (5)',5],['Dependiente (0)',0]]},
  {t:'sel', l:'Vestido', o:[['Independiente (10)',10],['Necesita ayuda (5)',5],['Dependiente (0)',0]]},
  {t:'sel', l:'Aseo personal', o:[['Independiente (5)',5],['Dependiente (0)',0]]},
  {t:'sel', l:'Deposición', o:[['Continente (10)',10],['Incontinencia ocasional (5)',5],['Incontinente (0)',0]]},
  {t:'sel', l:'Micción', o:[['Continente (10)',10],['Incontinencia ocasional (5)',5],['Incontinente / sondado (0)',0]]},
  {t:'sel', l:'Uso del retrete', o:[['Independiente (10)',10],['Necesita ayuda (5)',5],['Dependiente (0)',0]]},
  {t:'sel', l:'Traslado sillón-cama', o:[['Independiente (15)',15],['Mínima ayuda (10)',10],['Gran ayuda (5)',5],['Dependiente (0)',0]]},
  {t:'sel', l:'Deambulación', o:[['Independiente 50 m (15)',15],['Necesita ayuda (10)',10],['Independiente en silla de ruedas (5)',5],['Dependiente (0)',0]]},
  {t:'sel', l:'Escaleras', o:[['Independiente (10)',10],['Necesita ayuda (5)',5],['Dependiente (0)',0]]}],
  interp:function(s){return s===100?['low','100','Independiente']:s>=60?['low',s+'/100','Dependencia leve']:s>=40?['mid',s+'/100','Dependencia moderada']:s>=20?['high',s+'/100','Dependencia grave']:['high',s+'/100','Dependencia total']}},

{id:'downton', src:'Downton 1993, Falls in the Elderly · libro, sin PMID', title:'Downton', sub:'Riesgo de caídas (≥3 = alto riesgo)', badge:'blue', tag:'Caídas', max:11, items:[
  {t:'chk', l:'Caídas previas', p:1},
  {t:'chk', l:'Tranquilizantes o sedantes', p:1},
  {t:'chk', l:'Diuréticos', p:1},
  {t:'chk', l:'Hipotensores no diuréticos', p:1},
  {t:'chk', l:'Antiparkinsonianos', p:1},
  {t:'chk', l:'Antidepresivos', p:1},
  {t:'chk', l:'Déficit visual', p:1},
  {t:'chk', l:'Déficit auditivo', p:1},
  {t:'chk', l:'Alteración de extremidades (ictus, artrosis, amputación)', p:1},
  {t:'chk', l:'Estado mental confuso', p:1},
  {t:'chk', l:'Deambulación insegura (con o sin ayuda)', p:1}],
  interp:function(s){return s<=2?['low',s+' puntos','Riesgo bajo']:['high',s+' puntos','Alto riesgo — medidas de prevención + revisión farmacológica (STOPP)']}},

{id:'morse', src:'Morse 1989 · Can J Aging 8:366 · no indexado en PubMed', title:'Morse', sub:'Riesgo de caídas intrahospitalario', badge:'blue', tag:'Caídas', max:125, items:[
  {t:'chk', l:'Antecedente de caída en los últimos 3 meses', p:25},
  {t:'chk', l:'Diagnóstico secundario (≥2 diagnósticos activos)', p:15},
  {t:'sel', l:'Ayuda para deambular', o:[['Ninguna / reposo / ayuda de enfermería (0)',0],['Muletas, bastón o andador (15)',15],['Se apoya en el mobiliario (30)',30]]},
  {t:'chk', l:'Terapia IV o catéter heparinizado', p:20},
  {t:'sel', l:'Marcha', o:[['Normal / reposo / inmóvil (0)',0],['Débil (10)',10],['Alterada (20)',20]]},
  {t:'sel', l:'Estado mental', o:[['Consciente de sus limitaciones (0)',0],['Olvida sus limitaciones (15)',15]]}],
  interp:function(s){return s<=24?['low',s+' puntos','Riesgo bajo — cuidados básicos']:s<=44?['mid',s+' puntos','Riesgo medio — protocolo de prevención estándar']:['high',s+' puntos','Riesgo alto — protocolo de alto riesgo de caídas']}},

{id:'anthonisen', src:'Anthonisen 1987 · PMID 3492164', title:'Anthonisen', sub:'EPOC agudizado — indicación de antibiótico', badge:'amber', tag:'EPOC', max:3, items:[
  {t:'chk', l:'Aumento de la disnea', p:1},
  {t:'chk', l:'Aumento del volumen del esputo', p:1},
  {t:'chk', l:'Aumento de la purulencia del esputo', p:1}],
  interp:function(s){return s===3?['high','Tipo I','Antibiótico indicado']:s===2?['mid','Tipo II','Antibiótico indicado si incluye purulencia']:s===1?['low','Tipo III','Antibiótico solo si criterio menor asociado (fiebre, infección VRS <5 d, ↑FC/FR >20%)']:['low','Sin criterios','Antibiótico no indicado']}},

{id:'ehra', src:'ESC 2024 fibrilacion auricular · PMID 39210723', title:'EHRA', sub:'FA — clase funcional sintomática', badge:'blue', tag:'FA', max:5, items:[
  {t:'sel', l:'Sintomatología atribuible a la FA', o:[['I — asintomático (1)',1],['IIa — síntomas leves, actividad normal (2)',2],['IIb — síntomas moderados, actividad normal pero molestos (3)',3],['III — síntomas graves, actividad limitada (4)',4],['IV — incapacitante, actividad interrumpida (5)',5]]}],
  interp:function(s){return s<=2?['low','EHRA '+['','I','IIa','IIb','III','IV'][s],'Control de frecuencia como estrategia inicial razonable']:s===3?['mid','EHRA IIb','Valorar control de ritmo']:['high','EHRA '+['','I','IIa','IIb','III','IV'][s],'Control de ritmo — valorar cardioversión / ablación']}},

{id:'bms', src:'Nigrovic 2002 · PMID 12359784', title:'Bacterial Meningitis Score', sub:'Pediátrico 29 días–19 años — solo si LCR pleocitosis', badge:'red', tag:'Meningitis', max:6, items:[
  {t:'chk', l:'Tinción de Gram del LCR positiva', p:2},
  {t:'chk', l:'Neutrófilos en sangre ≥10.000/µL', p:1},
  {t:'chk', l:'Proteínas en LCR ≥80 mg/dL', p:1},
  {t:'chk', l:'Neutrófilos en LCR ≥1.000/µL', p:1},
  {t:'chk', l:'Convulsión al inicio del cuadro', p:1}],
  interp:function(s){return s===0?['low','0 puntos','Riesgo muy bajo de meningitis bacteriana (VPN ~99,9%). NO aplicable si aspecto séptico, púrpura, ATB previo, inmunosupresión o neurocirugía']:['high',s+' puntos','No descarta meningitis bacteriana — antibioterapia empírica inmediata']}},

// ── 9 escalas nuevas ──────────────────────────────────────────────

{id:'news2', src:'Royal College of Physicians NEWS2 2017 · validacion Smith 2013 · PMID 23295778', title:'NEWS2', sub:'Alerta temprana — respuesta clínica (0–20)', badge:'red', tag:'Triaje', max:20, items:[
  {t:'sel', l:'Frecuencia respiratoria (rpm)', o:[['12–20 (0)',0],['9–11 (1)',1],['21–24 (2)',2],['≤8 (3)',3],['≥25 (3)',3]]},
  {t:'sel', l:'SpO₂ — Escala 1 (%)', o:[['≥96 (0)',0],['94–95 (1)',1],['92–93 (2)',2],['≤91 (3)',3]]},
  {t:'sel', l:'Aire o O₂ suplementario', o:[['Aire ambiente (0)',0],['O₂ suplementario (2)',2]]},
  {t:'sel', l:'TAS (mmHg)', o:[['111–219 (0)',0],['101–110 (1)',1],['91–100 (2)',2],['≤90 (3)',3],['≥220 (3)',3]]},
  {t:'sel', l:'Frecuencia cardiaca (lpm)', o:[['51–90 (0)',0],['41–50 (1)',1],['91–110 (1)',1],['111–130 (2)',2],['≤40 (3)',3],['≥131 (3)',3]]},
  {t:'sel', l:'Nivel de conciencia (ACVPU)', o:[['Alerta (0)',0],['Confusión nueva / Voz / Dolor / No responde (3)',3]]},
  {t:'sel', l:'Temperatura (°C)', o:[['36,1–38,0 (0)',0],['35,1–36,0 (1)',1],['38,1–39,0 (1)',1],['≥39,1 (2)',2],['≤35,0 (3)',3]]}],
  interp:function(s){return s<=4?['low',s+' puntos','Riesgo bajo — monitorización rutinaria']:s<=6?['mid',s+' puntos','Respuesta urgente — valoración clínica inmediata']:['high',s+' puntos','Respuesta emergencia — equipo de respuesta rápida']}},

{id:'apache2', src:'Knaus 1985 · PMID 3928249', title:'APACHE II', sub:'Gravedad en UCI — mortalidad estimada (0–71)', badge:'amber', tag:'UCI', max:71, items:[
  {t:'sel', l:'Temperatura rectal (°C)', o:[['36–38,4 (0)',0],['38,5–38,9 (1)',1],['34–35,9 (1)',1],['32–33,9 (2)',2],['39–40,9 (3)',3],['30–31,9 (3)',3],['≥41 (4)',4],['≤29,9 (4)',4]]},
  {t:'sel', l:'PAM — presión arterial media (mmHg)', o:[['70–109 (0)',0],['110–129 (2)',2],['50–69 (2)',2],['130–159 (3)',3],['≥160 (4)',4],['≤49 (4)',4]]},
  {t:'sel', l:'Frecuencia cardiaca (lpm)', o:[['70–109 (0)',0],['110–139 (2)',2],['55–69 (2)',2],['140–179 (3)',3],['40–54 (3)',3],['≥180 (4)',4],['≤39 (4)',4]]},
  {t:'sel', l:'Frecuencia respiratoria (rpm)', o:[['12–24 (0)',0],['25–34 (1)',1],['10–11 (1)',1],['6–9 (2)',2],['35–49 (3)',3],['≥50 (4)',4],['≤5 (4)',4]]},
  {t:'sel', l:'Oxigenación', o:[['Normal: PaO₂ >70 o A-aDO₂ <200 (0)',0],['PaO₂ 61–70 (1)',1],['A-aDO₂ 200–349 (2)',2],['PaO₂ 55–60 o A-aDO₂ 350–499 (3)',3],['PaO₂ <55 o A-aDO₂ ≥500 (4)',4]]},
  {t:'sel', l:'pH arterial', o:[['7,33–7,49 (0)',0],['7,50–7,59 (1)',1],['7,25–7,32 (2)',2],['7,60–7,69 (3)',3],['7,15–7,24 (3)',3],['≥7,70 (4)',4],['<7,15 (4)',4]]},
  {t:'sel', l:'Sodio sérico (mEq/L)', o:[['130–149 (0)',0],['150–154 (1)',1],['120–129 (2)',2],['155–159 (2)',2],['160–179 (3)',3],['111–119 (3)',3],['≥180 (4)',4],['≤110 (4)',4]]},
  {t:'sel', l:'Potasio sérico (mEq/L)', o:[['3,5–5,4 (0)',0],['5,5–5,9 (1)',1],['3,0–3,4 (1)',1],['2,5–2,9 (2)',2],['6,0–6,9 (3)',3],['≥7,0 (4)',4],['<2,5 (4)',4]]},
  {t:'sel', l:'Creatinina sérica (mg/dL)', o:[['0,6–1,4 (0)',0],['<0,6 (2)',2],['1,5–1,9 (2)',2],['2,0–3,4 (3)',3],['≥3,5 (4)',4],['≥3,5 + FRA (8)',8]]},
  {t:'sel', l:'Hematocrito (%)', o:[['30–45,9 (0)',0],['46–49,9 (1)',1],['50–59,9 (2)',2],['20–29,9 (2)',2],['≥60 (4)',4],['<20 (4)',4]]},
  {t:'sel', l:'Leucocitos (×10³/µL)', o:[['3–14,9 (0)',0],['15–19,9 (1)',1],['20–39,9 (2)',2],['1–2,9 (2)',2],['≥40 (4)',4],['<1 (4)',4]]},
  {t:'sel', l:'Glasgow (15 − GCS)', o:[['GCS 15 (0 pts)',0],['GCS 13–14 (2 pts)',2],['GCS 10–12 (5 pts)',5],['GCS 7–9 (8 pts)',8],['GCS 4–6 (11 pts)',11],['GCS 3 (12 pts)',12]]},
  {t:'sel', l:'Edad', o:[['<45 años (0)',0],['45–54 años (2)',2],['55–64 años (3)',3],['65–74 años (5)',5],['≥75 años (6)',6]]},
  {t:'sel', l:'Enfermedad crónica grave', o:[['No (0)',0],['Postquirúrgico electivo (2)',2],['Postquirúrgico urgente o ingreso médico (5)',5]]}],
  interp:function(s){return s<=4?['low',s+' puntos','Mortalidad estimada ~4%']:s<=9?['low',s+' puntos','Mortalidad estimada ~8%']:s<=14?['mid',s+' puntos','Mortalidad estimada ~15%']:s<=19?['mid',s+' puntos','Mortalidad estimada ~25%']:s<=24?['high',s+' puntos','Mortalidad estimada ~40%']:s<=29?['high',s+' puntos','Mortalidad estimada ~55%']:s<=34?['high',s+' puntos','Mortalidad estimada ~75%']:['high',s+' puntos','Mortalidad estimada >85%']}},

{id:'saps2', src:'Le Gall 1993 · PMID 8254858', title:'SAPS II', sub:'Gravedad en UCI — mortalidad estimada', badge:'amber', tag:'UCI', max:163, items:[
  {t:'sel', l:'Edad', o:[['<40 años (0)',0],['40–59 años (7)',7],['60–69 años (12)',12],['70–74 años (15)',15],['75–79 años (16)',16],['≥80 años (18)',18]]},
  {t:'sel', l:'Frecuencia cardiaca (lpm)', o:[['70–119 (0)',0],['40–69 (2)',2],['120–159 (4)',4],['≥160 (7)',7],['<40 (11)',11]]},
  {t:'sel', l:'TAS sistólica (mmHg)', o:[['100–199 (0)',0],['≥200 (2)',2],['70–99 (5)',5],['<70 (13)',13]]},
  {t:'sel', l:'Temperatura (°C)', o:[['<39 (0)',0],['≥39 (3)',3]]},
  {t:'sel', l:'Glasgow (menor valor)', o:[['14–15 (0)',0],['11–13 (5)',5],['9–10 (7)',7],['6–8 (13)',13],['3–5 (26)',26]]},
  {t:'sel', l:'PaO₂/FiO₂ (solo si VM o CPAP)', o:[['Sin VM/CPAP (0)',0],['≥200 (6)',6],['100–199 (9)',9],['<100 (11)',11]]},
  {t:'sel', l:'Diuresis (L/24 h)', o:[['≥1,0 (0)',0],['0,5–0,999 (4)',4],['<0,5 (11)',11]]},
  {t:'sel', l:'BUN (mg/dL)', o:[['<28 (0)',0],['28–83 (6)',6],['≥84 (10)',10]]},
  {t:'sel', l:'Sodio (mEq/L)', o:[['125–144 (0)',0],['≥145 (1)',1],['<125 (5)',5]]},
  {t:'sel', l:'Potasio (mEq/L)', o:[['3,0–4,9 (0)',0],['<3,0 (3)',3],['≥5,0 (3)',3]]},
  {t:'sel', l:'Bicarbonato (mEq/L)', o:[['≥20 (0)',0],['15–19 (3)',3],['<15 (6)',6]]},
  {t:'sel', l:'Bilirrubina (mg/dL)', o:[['<4,0 (0)',0],['4,0–5,9 (4)',4],['≥6,0 (9)',9]]},
  {t:'sel', l:'Leucocitos (×10³/µL)', o:[['1,0–19,9 (0)',0],['≥20 (3)',3],['<1,0 (12)',12]]},
  {t:'sel', l:'Enfermedad crónica', o:[['Ninguna (0)',0],['Neoplasia metastásica (9)',9],['Neoplasia hematológica (10)',10],['SIDA (17)',17]]},
  {t:'sel', l:'Tipo de ingreso', o:[['Quirúrgico programado (0)',0],['Médico (6)',6],['Quirúrgico urgente (8)',8]]}],
  interp:function(s){return s<29?['low',s+' puntos','Mortalidad estimada <10%']:s<40?['mid',s+' puntos','Mortalidad estimada ~10–25%']:s<52?['mid',s+' puntos','Mortalidad estimada ~25–50%']:s<64?['high',s+' puntos','Mortalidad estimada ~50–75%']:['high',s+' puntos','Mortalidad estimada >75%']}},

{id:'meld', src:'MELD Kamath 2001 · PMID 11172350 · MELD 3.0 Kim 2021 · PMID 34481845', title:'MELD', sub:'Hepatopatía terminal · MELD original · EE.UU. asigna con MELD 3.0 desde 2023', badge:'amber', tag:'Digestivo', max:40, agg:'custom', items:[
  {t:'num', l:'Bilirrubina total', u:'mg/dL', f:function(v){return 0}},
  {t:'num', l:'Creatinina sérica', u:'mg/dL', f:function(v){return 0}},
  {t:'num', l:'INR', u:'', f:function(v){return 0}}],
  calcCustom:function(vals){var bil=Math.max(1,vals[0]||1);var cr=Math.min(4,Math.max(1,vals[1]||1));var inr=Math.max(1,vals[2]||1);return Math.round(10*(0.957*Math.log(cr)+0.378*Math.log(bil)+1.12*Math.log(inr)+0.643))},
  interp:function(s){return s<10?['low',s+' puntos','Mortalidad 3 meses ~2% — seguimiento ambulatorio']:s<20?['mid',s+' puntos','Mortalidad 3 meses ~6% — seguimiento estrecho']:s<30?['high',s+' puntos','Mortalidad 3 meses ~20% — evaluar trasplante']:['high',s+' puntos','Mortalidad 3 meses ~50–70% — priorizar trasplante hepático']}},

{id:'childpugh', src:'Pugh 1973 · PMID 4541913', title:'Child-Pugh', sub:'Cirrosis — clasificación funcional (A–B–C)', badge:'amber', tag:'Digestivo', max:15, items:[
  {t:'sel', l:'Bilirrubina total (mg/dL)', o:[['<2 (1)',1],['2–3 (2)',2],['>3 (3)',3]]},
  {t:'sel', l:'Albúmina (g/dL)', o:[['>3,5 (1)',1],['2,8–3,5 (2)',2],['<2,8 (3)',3]]},
  {t:'sel', l:'INR / Tiempo de protrombina', o:[['<1,7 / TP >50% (1)',1],['1,7–2,3 / TP 30–50% (2)',2],['>2,3 / TP <30% (3)',3]]},
  {t:'sel', l:'Ascitis', o:[['Ausente (1)',1],['Leve / controlada con diuréticos (2)',2],['Moderada-grave / refractaria (3)',3]]},
  {t:'sel', l:'Encefalopatía hepática', o:[['Ausente (1)',1],['Grado I–II (2)',2],['Grado III–IV (3)',3]]}],
  interp:function(s){return s<=6?['low','Clase A ('+s+' pts)','Buen pronóstico — supervivencia 1 año ~100%']:s<=9?['mid','Clase B ('+s+' pts)','Pronóstico intermedio — supervivencia 1 año ~80%']:['high','Clase C ('+s+' pts)','Mal pronóstico — supervivencia 1 año ~45% — valorar trasplante']}},

{id:'camicu', src:'Ely 2001 · PMID 11730446', title:'CAM-ICU', sub:'Delirium en UCI — cribado diagnóstico', badge:'amber', tag:'UCI', max:1, agg:'custom', items:[
  {t:'sel', l:'1. Inicio agudo o curso fluctuante', o:[['No (0)',0],['Sí — cambio agudo del estado mental o fluctuación 24 h (1)',1]]},
  {t:'sel', l:'2. Inatención (RASS/letras)', o:[['No (0)',0],['Sí — dificultad para mantener la atención (1)',1]]},
  {t:'sel', l:'3. Nivel de conciencia alterado', o:[['RASS 0 — alerta y calmado (0)',0],['RASS ≠ 0 — alterado (1)',1]]},
  {t:'sel', l:'4. Pensamiento desorganizado', o:[['No (0)',0],['Sí — respuestas incoherentes o desordenadas (1)',1]]}],
  calcCustom:function(vals){return(vals[0]>0&&vals[1]>0&&(vals[2]>0||vals[3]>0))?1:0},
  interp:function(s){return s===0?['low','Negativo','Delirium no presente — reevaluar si cambio clínico']:['high','POSITIVO','Delirium presente — buscar causa: fármacos, infección, metabólico, retención, dolor']}},

{id:'psi', src:'Fine 1997 · PMID 8995086', title:'PSI/PORT', sub:'Neumonía — mortalidad y decisión de ingreso', badge:'amber', tag:'Respiratorio', max:395, items:[
  {t:'num', l:'Edad (años = puntos directos)', u:'años', f:function(v){return v}},
  {t:'sel', l:'Sexo', o:[['Hombre (0)',0],['Mujer (−10)',-10]]},
  {t:'chk', l:'Residencia de ancianos', p:10},
  {t:'chk', l:'Neoplasia', p:30},
  {t:'chk', l:'Hepatopatía', p:20},
  {t:'chk', l:'ICC', p:10},
  {t:'chk', l:'Enfermedad cerebrovascular', p:10},
  {t:'chk', l:'Enfermedad renal', p:10},
  {t:'chk', l:'Alteración del nivel de conciencia', p:20},
  {t:'chk', l:'FR ≥30 rpm', p:20},
  {t:'chk', l:'TAS <90 mmHg', p:20},
  {t:'chk', l:'Temperatura <35 °C o ≥40 °C', p:15},
  {t:'chk', l:'FC ≥125 lpm', p:10},
  {t:'chk', l:'pH <7,35', p:30},
  {t:'chk', l:'BUN ≥30 mg/dL (urea ≥11 mmol/L)', p:20},
  {t:'chk', l:'Na <130 mEq/L', p:20},
  {t:'chk', l:'Glucosa ≥250 mg/dL', p:10},
  {t:'chk', l:'Hematocrito <30%', p:10},
  {t:'chk', l:'PaO₂ <60 mmHg o SpO₂ <90%', p:10},
  {t:'chk', l:'Derrame pleural', p:10}],
  interp:function(s){return s<=50?['low','Clase I','Mortalidad 0,1–0,4% — tratamiento ambulatorio']:s<=70?['low','Clase II','Mortalidad 0,6–0,7% — tratamiento ambulatorio']:s<=90?['mid','Clase III','Mortalidad 0,9–2,8% — observación breve']:s<=130?['high','Clase IV','Mortalidad 8–9% — ingreso hospitalario']:['high','Clase V','Mortalidad 27–31% — ingreso / UCI']}},

{id:'rass', src:'Sessler 2002 · PMID 12421743', title:'RASS', sub:'Sedación y agitación en UCI (−5 a +4)', badge:'blue', tag:'UCI', max:4, items:[
  {t:'sel', l:'Nivel de sedación/agitación', o:[['0 Alerta y calmado',0],['-1 Somnoliento (apertura ocular >10 s al hablar)',-1],['-2 Sedación ligera (apertura ocular <10 s)',-2],['-3 Sedación moderada (movimiento sin apertura ocular)',-3],['-4 Sedación profunda (movimiento al estímulo físico)',-4],['-5 No despertable',-5],['+1 Inquieto (ansioso)',1],['+2 Agitado (movimientos sin propósito)',2],['+3 Muy agitado (tira de tubos/catéteres)',3],['+4 Combativo (peligro para el personal)',4]]}],
  interp:function(s){return s<=-3?['high','RASS '+s,'Sedación profunda — valorar reducción de sedantes / despertar diario']:s<=-1?['mid','RASS '+s,'Sedación ligera — objetivo habitual en VM']:s===0?['low','RASS 0','Alerta y calmado — estado óptimo']:s<=2?['mid','RASS +'+s,'Agitación — evaluar causa: dolor, delirium, ansiedad']:['high','RASS +'+s,'Agitación peligrosa — contención + sedación urgente']}},

{id:'mmrc', src:'Escala MRC · validacion Mahler 1988 · PMID 3342669', title:'mMRC', sub:'Disnea — grado funcional (0–4)', badge:'blue', tag:'Respiratorio', max:4, items:[
  {t:'sel', l:'Grado de disnea', o:[['0 — Solo con ejercicio intenso (0)',0],['1 — Al caminar deprisa o subir cuesta ligera (1)',1],['2 — Camina más lento que personas de su edad (2)',2],['3 — Para tras ~100 m o pocos min en llano (3)',3],['4 — Disnea al vestirse / no sale de casa (4)',4]]}],
  interp:function(s){return s<=1?['low','Grado '+s,'Limitación leve — actividad física normal']:s===2?['mid','Grado 2','Limitación moderada — valorar rehabilitación pulmonar']:['high','Grado '+s,'Limitación grave — rehabilitación + optimizar tratamiento broncodilatador']}}

];
