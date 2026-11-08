/* ==================================================================
   SCALES — todas las escalas clínicas en formato declarativo
   items: {t:'chk',l,p} | {t:'sel',l,o:[[etiqueta,valor]]} | {t:'num',l,u,f(v)}
   agg: 'sum' (por defecto) | 'max'
   ================================================================== */
window.SCALES = [

// ── 8 escalas migradas (antes hand-coded) ──────────────────────────

{id:'qsofa', src:'Seymour 2016 · JAMA · PMID 26903335 · Sepsis-3: Singer 2016 · PMID 26903338 · guía: SSC 2021 · PMID 34599691', title:'qSOFA', sub:'Sepsis — ≥2 alto riesgo · SSC 2021: NO usar como cribado único', badge:'red', tag:'Sepsis', max:3, items:[
  {t:'chk', l:'FR ≥22 rpm', p:1},
  {t:'chk', l:'Alteración estado mental (GCS &lt;15)', p:1},
  {t:'chk', l:'TAS ≤100 mmHg', p:1}],
  interp:function(s){return s===0?['low','Sin criterios','Riesgo bajo']:s===1?['mid','1 criterio','Vigilancia — reevaluar']:['high','≥2 criterios','ALTO RIESGO — mortalidad hospitalaria 3–14 veces mayor que con &lt;2; buscar disfunción orgánica (SOFA) y activar protocolo sepsis']}},

{id:'curb65', src:'Lim 2003 · Thorax · PMID 12728155', title:'CURB-65', sub:'Neumonía — gravedad e ingreso', badge:'amber', tag:'Neumonía', max:5, items:[
  {t:'chk', l:'C — Confusión (nueva, orientación alterada)', p:1},
  {t:'chk', l:'U — Urea &gt;7 mmol/L (urea &gt;42 mg/dL · BUN &gt;19,6 mg/dL)', p:1},
  {t:'chk', l:'R — FR ≥30 rpm', p:1},
  {t:'chk', l:'B — TAS &lt;90 mmHg o TAD ≤60 mmHg', p:1},
  {t:'chk', l:'65 — Edad ≥65 años', p:1}],
  interp:function(s){var m=['0,7','3,2','13','17','41,5','57'][s];return s<=1?['low',s+' pts','Riesgo bajo — tratamiento ambulatorio posible (mortalidad 30 d '+m+'%)']:s===2?['mid','2 pts','Riesgo intermedio — ingreso o tratamiento supervisado en hospital (mortalidad 30 d '+m+'%)']:['high',s+' pts','Neumonía grave — ingreso; valorar UCI sobre todo con 4–5 (mortalidad 30 d '+m+'%)']}},

{id:'wells', src:'Wells 2000 · PMID 10744147', title:'Wells — TEP', sub:'Probabilidad pre-test de tromboembolismo', badge:'red', tag:'TEP', max:12.5, items:[
  {t:'chk', l:'Signos/síntomas de TVP', p:3},
  {t:'chk', l:'TEP más probable que diagnóstico alternativo', p:3},
  {t:'chk', l:'FC >100 lpm', p:1.5},
  {t:'chk', l:'Inmovilización ≥3 días o cirugía en <4 semanas', p:1.5},
  {t:'chk', l:'TEP o TVP previos', p:1.5},
  {t:'chk', l:'Hemoptisis', p:1},
  {t:'chk', l:'Neoplasia activa (tratamiento en <6 meses)', p:1}],
  interp:function(s){return s<2?['low','Probabilidad baja','DD <500 descarta TEP']:s<=6?['mid','Probabilidad moderada','DD + AngioTC si DD+']:['high','Probabilidad alta','AngioTC directo sin DD previo']}},

{id:'chadsvasc', src:'Lip 2010 · Chest · PMID 19762550 · guía: ACC/AHA/ACCP/HRS 2023 · PMID 38043043', title:'CHA₂DS₂-VASc', sub:'FA — Riesgo tromboembólico · ACC/AHA 2023 (incluye sexo femenino)', badge:'blue', tag:'FA', max:9, items:[
  {t:'chk', l:'C — IC congestiva / FE deprimida', p:1},
  {t:'chk', l:'H — Hipertensión arterial', p:1},
  {t:'chk', l:'A₂ — Edad ≥75 años', p:2},
  {t:'chk', l:'D — Diabetes mellitus', p:1},
  {t:'chk', l:'S₂ — Ictus/AIT/tromboembolismo previo', p:2},
  {t:'chk', l:'V — Enfermedad vascular (IAM, EAP, placa aórtica)', p:1},
  {t:'chk', l:'A — Edad 65–74 años', p:1},
  {t:'chk', l:'Sc — Sexo femenino', p:1}],
  interp:function(s){return s===0?['low','0 pts','Riesgo bajo — ACO no indicada; AAS sin beneficio']:s===1?['mid','1 pt','Hombre: riesgo intermedio (≈1–2%/año) — ACO razonable (IIa) · Mujer (solo el sexo): riesgo bajo — sin ACO']:s===2?['high','2 pts','Hombre: ACO RECOMENDADA (I) · Mujer: riesgo intermedio — ACO razonable (IIa)']:['high',s+' pts','ACO RECOMENDADA (riesgo ≥2%/año) — DOAC preferente sobre warfarina']}},

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

{id:'heart', src:'Six 2008 · Neth Heart J · PMID 18665203 · validación prospectiva: Backus 2013 · Int J Cardiol · PMID 23465250', title:'HEART Score', sub:'SCA — Estratificación dolor torácico', badge:'red', tag:'SCA', max:10, items:[
  {t:'sel', l:'H — Historia', o:[['Poco sospechosa (0)',0],['Moderadamente sospechosa (1)',1],['Muy sospechosa (2)',2]]},
  {t:'sel', l:'E — ECG', o:[['Normal (0)',0],['Repolarización inespecífica, BRI, HVI, digoxina (1)',1],['Desviación ST significativa no atribuible a BRI/HVI/digoxina (2)',2]]},
  {t:'sel', l:'A — Edad', o:[['&lt;45 años (0)',0],['45–64 años (1)',1],['≥65 años (2)',2]]},
  {t:'sel', l:'R — Factores de riesgo CV (DM, tabaquismo, HTA, dislipemia, AF de cardiopatía isquémica, obesidad)', o:[['Ninguno (0)',0],['1–2 FR (1)',1],['≥3 FR o aterosclerosis conocida: IAM, revascularización, ictus, EAP (2)',2]]},
  {t:'sel', l:'T — Troponina', o:[['≤LSN (0)',0],['1–3x LSN (1)',1],['&gt;3x LSN (2)',2]]}],
  interp:function(s){return s<=3?['low','Riesgo bajo','MACE 6 sem 1,7% — considerar alta precoz']:s<=6?['mid','Riesgo moderado','MACE 6 sem 16,6% — observación/ingreso y pruebas no invasivas']:['high','Riesgo alto','MACE 6 sem 50,1% — estrategia invasiva precoz']}},

{id:'gbs', src:'Blatchford 2000 · Lancet · PMID 11073021 · validación: Stanley 2017 · BMJ · PMID 28053181 · guía: ESGE 2021 · PMID 33567467', title:'Glasgow-Blatchford', sub:'HDA — Necesidad de intervención', badge:'amber', tag:'HDA', max:23, items:[
  {t:'sel', l:'Urea sérica — mmol/L (mg/dL)', o:[['&lt;6,5 (&lt;39) (0)',0],['6,5–7,9 (39–47) (2)',2],['8,0–9,9 (48–59) (3)',3],['10,0–24,9 (60–149) (4)',4],['≥25 (≥150) (6)',6]]},
  {t:'sel', l:'Hemoglobina (g/dL) — según sexo', o:[['Hombre ≥13 · Mujer ≥12 (0)',0],['Hombre 12–12,9 · Mujer 10–11,9 (1)',1],['Hombre 10–11,9 (3)',3],['&lt;10 en ambos sexos (6)',6]]},
  {t:'sel', l:'TAS sistólica (mmHg)', o:[['≥110 (0)',0],['100–109 (1)',1],['90–99 (2)',2],['&lt;90 (3)',3]]},
  {t:'chk', l:'FC ≥100 lpm', p:1},
  {t:'chk', l:'Presentación con melenas', p:1},
  {t:'chk', l:'Síncope', p:2},
  {t:'chk', l:'Hepatopatía conocida', p:2},
  {t:'chk', l:'IC congestiva', p:2}],
  interp:function(s){return s<=1?['low','Riesgo muy bajo','GBS ≤1: manejo ambulatorio con endoscopia diferida (ESGE 2021)']:s<=6?['mid','Riesgo no bajo','Ingreso — endoscopia precoz (≤24 h tras reanimación)']:['high','Riesgo alto','GBS ≥7: umbral óptimo para predecir necesidad de terapia endoscópica — endoscopia ≤24 h tras reanimación']}},

{id:'bisap', src:'Wu 2008 · Gut · PMID 18519429 · validación prospectiva: Singh 2009 · Am J Gastroenterol · PMID 19293787', title:'BISAP', sub:'Pancreatitis aguda — mortalidad (primeras 24 h)', badge:'amber', tag:'Pancreatitis', max:5, items:[
  {t:'chk', l:'B — BUN &gt;25 mg/dL (urea &gt;53 mg/dL)', p:1},
  {t:'chk', l:'I — Alteración estado mental (GCS &lt;15)', p:1},
  {t:'chk', l:'S — SIRS (≥2 criterios)', p:1},
  {t:'chk', l:'A — Edad &gt;60 años', p:1},
  {t:'chk', l:'P — Derrame pleural en imagen', p:1}],
  interp:function(s){return s<=1?['low','Leve','Mortalidad &lt;1%']:s===2?['mid','Moderado','Mortalidad ~2% — monitorizar']:['high','Grave','Mortalidad '+(s===3?'5':s===4?'13':'22')+'% — ≥3: mayor riesgo de fallo orgánico persistente y necrosis; UCI valorar']}},

{id:'abcd2', src:'Johnston 2007 · Lancet · PMID 17258668 · DAPT: CHANCE (Wang 2013 · PMID 23803136), POINT (Johnston 2018 · PMID 29766750)', title:'ABCD2', sub:'AIT — Riesgo de ictus a 2 días', badge:'red', tag:'AIT/Ictus', max:7, items:[
  {t:'chk', l:'A — Edad ≥60 años', p:1},
  {t:'chk', l:'B — TAS ≥140 o TAD ≥90 mmHg', p:1},
  {t:'sel', l:'C — Clínica', o:[['Sin déficit motor ni del habla (0)',0],['Alteración habla sin déficit motor (1)',1],['Debilidad unilateral (2)',2]]},
  {t:'sel', l:'D — Duración síntomas', o:[['&lt;10 minutos (0)',0],['10–59 minutos (1)',1],['≥60 minutos (2)',2]]},
  {t:'chk', l:'D2 — Diabetes mellitus', p:1}],
  interp:function(s){return s<=3?['low','Riesgo bajo','Riesgo ictus 2 d: 1,0% — AAS en monoterapia; estudio precoz']:s<=5?['mid','Riesgo moderado','Riesgo ictus 2 d: 4,1% — AIT de alto riesgo (≥4): DAPT (AAS+clopidogrel) 21 días (CHANCE/POINT)']:['high','Riesgo alto','Riesgo ictus 2 d: 8,1% — DAPT (AAS+clopidogrel) 21 días + unidad de ictus; estudio urgente de carótidas (CEA si estenosis sintomática 70–99%)']}},

// ── 11 escalas adicionales (previamente EXTRA_SCALES) ──────────────

{id:'hasbled', src:'Pisters 2010 · Chest · PMID 20299623 · guía: ACC/AHA/ACCP/HRS 2023 · PMID 38043043', title:'HAS-BLED', sub:'FA — riesgo hemorrágico bajo anticoagulación', badge:'blue', tag:'FA', max:9, items:[
  {t:'chk', l:'H — HTA no controlada (TAS &gt;160 mmHg)', p:1},
  {t:'chk', l:'A — Función renal alterada (diálisis, trasplante, Cr ≥200 µmol/L ≈ 2,26 mg/dL)', p:1},
  {t:'chk', l:'A — Función hepática alterada (cirrosis, o Bil &gt;2× LSN + AST/ALT/FA &gt;3× LSN)', p:1},
  {t:'chk', l:'S — Ictus previo', p:1},
  {t:'chk', l:'B — Sangrado previo o predisposición (anemia)', p:1},
  {t:'chk', l:'L — INR lábil (TRT &lt;60%)', p:1},
  {t:'chk', l:'E — Edad &gt;65 años', p:1},
  {t:'chk', l:'D — Fármacos (AINE, antiagregantes)', p:1},
  {t:'chk', l:'D — Alcohol ≥8 UBE/semana', p:1}],
  interp:function(s){var r=['1,13','1,02','1,88','3,74','8,70'][s];return s<=2?['low','Riesgo bajo','Sangrado mayor '+r+'/100 pacientes-año']:['high','Riesgo alto',(s<=4?'Sangrado mayor '+r+'/100 pacientes-año':'Sangrado mayor &gt;8,7/100 pacientes-año (pocos datos)')+' — corregir factores modificables; NO usar aislado para negar ACO']}},

{id:'spesi', src:'Jimenez 2010 · PMID 20696966', title:'sPESI', sub:'TEP — mortalidad a 30 días (simplificado)', badge:'red', tag:'TEP', max:6, items:[
  {t:'chk', l:'Edad >80 años', p:1},
  {t:'chk', l:'Cáncer activo', p:1},
  {t:'chk', l:'Insuficiencia cardiaca o enfermedad pulmonar crónica', p:1},
  {t:'chk', l:'FC ≥110 lpm', p:1},
  {t:'chk', l:'TAS <100 mmHg', p:1},
  {t:'chk', l:'SpO₂ <90%', p:1}],
  interp:function(s){return s===0?['low','Bajo riesgo','Mortalidad 30 d ~1% — valorar alta precoz (criterios Hestia)']:['high','Alto riesgo','Mortalidad 30 d ~10% — ingreso + troponina y función VD']}},

{id:'bova', src:'Bova C, Sanchez O, Prandoni P, et al. Eur Respir J 2014;44(3):694-703 · doi:10.1183/09031936.00006114 · Protocolo TEP Campdevànol v2.0, anexo A7', title:'Bova', sub:'TEP confirmado en normotensos — riesgo de complicación a 30 días', badge:'red', tag:'TEP', max:7, items:[
  {t:'chk', l:'PAS entre 90 y 100 mmHg', p:2},
  {t:'chk', l:'Troponina cardiaca elevada (&gt; p99 del ensayo del laboratorio)', p:2},
  {t:'chk', l:'Disfunción del VD por ecocardiografía o angio-TC (VD/VI ≥1,0)', p:2},
  {t:'chk', l:'FC ≥110 lpm', p:1}],
  info:'Solo en TEP confirmado con paciente normotenso. Complicaciones a 30 días = muerte por TEP, colapso hemodinámico o TEP recurrente. Estratifica el pronóstico; no indica por sí sola ingreso en UCI. Al incluir troponina y VD, usarla como escala de gravedad duplicaría esos indicadores: la gravedad la deciden PESI, sPESI y Hestia.',
  interp:function(s){return s<=2?['low','Estadio I · 4,2 % a 30 días','Categoría habitual: B o C1–C2. Conducta según la categoría']:s<=4?['mid','Estadio II · 10,8 % a 30 días','Con sPESI 0: B* (no alta precoz); con gravedad elevada: C2–C3. Planta con NEWS2 o monitor según subcategoría; evaluación por el PERT']:['high','Estadio III · 29,2 % a 30 días','Habitualmente C2–C3 (PAS 90–100 o FC ≥110 ya elevan el sPESI): monitor continuo en observación, evaluación PERT prioritaria, reevaluación seriada; reperfusión solo si deterioro (D–E)']}},

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

{id:'nihss', src:'Brott 1989 · Stroke · PMID 2749846 · versión NINDS actual: Lyden 1994 · Stroke · PMID 7974549', title:'NIHSS', sub:'Ictus — déficit neurológico (0–42)', badge:'red', tag:'Ictus', max:42, items:[
  {t:'sel', l:'1a — Nivel de conciencia', o:[['Alerta (0)',0],['Somnoliento, responde a estímulo menor (1)',1],['Estuporoso, requiere estímulo repetido (2)',2],['Coma (3)',3]]},
  {t:'sel', l:'1b — Preguntas (mes y edad)', o:[['Ambas correctas (0)',0],['Una correcta (1)',1],['Ninguna correcta (2)',2]]},
  {t:'sel', l:'1c — Órdenes (abrir/cerrar ojos, puño)', o:[['Ambas correctas (0)',0],['Una correcta (1)',1],['Ninguna (2)',2]]},
  {t:'sel', l:'2 — Mirada conjugada', o:[['Normal (0)',0],['Paresia parcial o de un par craneal III/IV/VI (1)',1],['Desviación forzada / paresia total (2)',2]]},
  {t:'sel', l:'3 — Campos visuales', o:[['Normal (0)',0],['Hemianopsia parcial (1)',1],['Hemianopsia completa (2)',2],['Ceguera bilateral (3)',3]]},
  {t:'sel', l:'4 — Paresia facial', o:[['Normal (0)',0],['Asimetría leve (1)',1],['Parálisis parcial inferior (2)',2],['Parálisis completa (3)',3]]},
  {t:'sel', l:'5a — Motor brazo izquierdo', o:[['No claudica 10 s (0)',0],['Claudica &lt;10 s (1)',1],['Vence gravedad parcialmente (2)',2],['No vence gravedad (3)',3],['Ningún movimiento (4)',4]]},
  {t:'sel', l:'5b — Motor brazo derecho', o:[['No claudica 10 s (0)',0],['Claudica &lt;10 s (1)',1],['Vence gravedad parcialmente (2)',2],['No vence gravedad (3)',3],['Ningún movimiento (4)',4]]},
  {t:'sel', l:'6a — Motor pierna izquierda', o:[['No claudica 5 s (0)',0],['Claudica &lt;5 s (1)',1],['Esfuerzo contra gravedad (2)',2],['No vence gravedad (3)',3],['Ningún movimiento (4)',4]]},
  {t:'sel', l:'6b — Motor pierna derecha', o:[['No claudica 5 s (0)',0],['Claudica &lt;5 s (1)',1],['Esfuerzo contra gravedad (2)',2],['No vence gravedad (3)',3],['Ningún movimiento (4)',4]]},
  {t:'sel', l:'7 — Ataxia de miembros', o:[['Ausente (0)',0],['Presente en 1 extremidad (1)',1],['Presente en 2 extremidades (2)',2]]},
  {t:'sel', l:'8 — Sensibilidad', o:[['Normal (0)',0],['Hipoestesia leve-moderada (1)',1],['Anestesia grave o bilateral (2)',2]]},
  {t:'sel', l:'9 — Lenguaje', o:[['Normal (0)',0],['Afasia leve-moderada (1)',1],['Afasia grave (2)',2],['Mutismo / afasia global (3)',3]]},
  {t:'sel', l:'10 — Disartria', o:[['Normal (0)',0],['Leve-moderada (1)',1],['Grave / anartria (2)',2]]},
  {t:'sel', l:'11 — Extinción / inatención', o:[['Ausente (0)',0],['Una modalidad (1)',1],['≥2 modalidades (2)',2]]}],
  interp:function(s){return s===0?['low','Sin déficit','NIHSS 0']:s<=4?['low','Ictus leve','Valorar trombolisis individualizada si déficit incapacitante']:s<=15?['mid','Ictus moderado','Candidato a reperfusión si ventana y sin CI']:s<=20?['high','Moderado-grave','Activar código ictus · valorar trombectomía']:['high','Ictus grave','Alta probabilidad de oclusión de gran vaso — trombectomía']}},

{id:'sofa', src:'Vincent 1996 · Intensive Care Med · PMID 8844239 · Sepsis-3: Singer 2016 · JAMA · PMID 26903338 · pronóstico: Ferreira 2001 · JAMA · PMID 11594901', title:'SOFA', sub:'Disfunción orgánica (0–24) · Δ≥2 = sepsis', badge:'red', tag:'Sepsis', max:24, items:[
  {t:'sel', l:'Respiratorio — PaO₂/FiO₂', o:[['≥400 (0)',0],['<400 (1)',1],['<300 (2)',2],['<200 con soporte ventilatorio (3)',3],['<100 con soporte ventilatorio (4)',4]]},
  {t:'sel', l:'Coagulación — plaquetas ×10³/µL', o:[['≥150 (0)',0],['<150 (1)',1],['<100 (2)',2],['<50 (3)',3],['<20 (4)',4]]},
  {t:'sel', l:'Hepático — bilirrubina mg/dL', o:[['<1,2 (0)',0],['1,2–1,9 (1)',1],['2,0–5,9 (2)',2],['6,0–11,9 (3)',3],['>12 (4)',4]]},
  {t:'sel', l:'Cardiovascular', o:[['PAM ≥70 mmHg (0)',0],['PAM <70 mmHg (1)',1],['Dopamina ≤5 o dobutamina cualquier dosis (2)',2],['Dopamina >5 o NA/ADR ≤0,1 µg/kg/min (3)',3],['Dopamina >15 o NA/ADR >0,1 µg/kg/min (4)',4]]},
  {t:'sel', l:'SNC — Glasgow', o:[['15 (0)',0],['13–14 (1)',1],['10–12 (2)',2],['6–9 (3)',3],['<6 (4)',4]]},
  {t:'sel', l:'Renal — creatinina mg/dL o diuresis', o:[['<1,2 (0)',0],['1,2–1,9 (1)',1],['2,0–3,4 (2)',2],['3,5–4,9 o <500 mL/d (3)',3],['>5,0 o <200 mL/d (4)',4]]}],
  interp:function(s){return s<2?['low',s+' puntos','Sin disfunción orgánica relevante (si el basal es 0)']:s<=11?['mid',s+' puntos','Con infección y aumento ≥2 sobre el basal = sepsis (mortalidad hospitalaria &gt;10%, Sepsis-3). Reevaluar a las 48 h: si el SOFA sube, mortalidad ≥50%; si baja, mucho menor (Ferreira 2001)']:['high',s+' puntos','SOFA inicial &gt;11: mortalidad &gt;80–90% (Ferreira 2001) — UCI / adecuación del esfuerzo']}},

{id:'gcs', src:'Teasdale y Jennett 1974 · Lancet · PMID 4136544 · escala de 15 puntos: Teasdale y Jennett 1976 · Acta Neurochir · PMID 961490 · revisión: Teasdale 2014 · Lancet Neurol · PMID 25030516', title:'Glasgow (GCS)', sub:'Nivel de conciencia (3–15)', badge:'red', tag:'Neuro', max:15, items:[
  {t:'sel', l:'Apertura ocular', o:[['Espontánea (4)',4],['A la voz (3)',3],['Al dolor / presión (2)',2],['Ausente (1)',1]]},
  {t:'sel', l:'Respuesta verbal', o:[['Orientada (5)',5],['Confusa (4)',4],['Palabras inapropiadas (3)',3],['Sonidos incomprensibles (2)',2],['Ausente (1)',1]]},
  {t:'sel', l:'Respuesta motora', o:[['Obedece órdenes (6)',6],['Localiza el dolor (5)',5],['Retirada al dolor (4)',4],['Flexión anómala / decorticación (3)',3],['Extensión / descerebración (2)',2],['Ausente (1)',1]]}],
  interp:function(s){return s>=14?['low',s+'/15','TCE leve']:s===13?['mid','13/15','TCE leve en la clasificación clásica (13–15), pero de mayor riesgo: ACEP 2023 (PMID 37085214) lo excluye del TCE leve y la guía escandinava (PMID 26888597) lo clasifica como moderado — TC craneal + observación']:s>=9?['mid',s+'/15','TCE moderado (9–12) — TC craneal + observación']:['high',s+'/15','TCE grave (≤8) — aislamiento de vía aérea']}},

{id:'kdigo', src:'KDIGO 2012 AKI · resumen Kellum 2013 · PMID 23394211', title:'KDIGO — AKI', sub:'Fracaso renal agudo (estadio = criterio más alto)', badge:'amber', tag:'AKI', max:3, agg:'max', items:[
  {t:'sel', l:'Criterio creatinina', o:[['Sin criterio (0)',0],['×1,5–1,9 basal o ↑≥0,3 mg/dL en 48 h (1)',1],['×2,0–2,9 basal (2)',2],['×3 basal, Cr ≥4 mg/dL o inicio de TRS (3)',3]]},
  {t:'sel', l:'Criterio diuresis', o:[['Sin criterio (0)',0],['<0,5 mL/kg/h durante 6–12 h (1)',1],['<0,5 mL/kg/h ≥12 h (2)',2],['<0,3 mL/kg/h ≥24 h o anuria ≥12 h (3)',3]]}],
  interp:function(s){return s===0?['low','Sin AKI','No cumple criterios KDIGO']:s===1?['mid','Estadio 1','Retirar nefrotóxicos · optimizar volemia · control Cr/diuresis']:s===2?['high','Estadio 2','Revisar dosis por FG · descartar obstrucción (eco) · valorar nefrología']:['high','Estadio 3','Valorar TRS: hiperK refractaria, acidosis, sobrecarga, uremia']}},

{id:'decaf', src:'Steer 2012 · Thorax · PMID 22895999 · validación: Echevarria 2016 · Thorax · PMID 26769015', title:'DECAF', sub:'EPOC agudizado — mortalidad intrahospitalaria', badge:'amber', tag:'EPOC', max:6, items:[
  {t:'sel', l:'eMRCD — disnea basal estable', o:[['Grados 1–4 (0)',0],['5a: no sale de casa sin ayuda, autónomo para lavado y/o vestido (1)',1],['5b: no sale de casa sin ayuda, necesita ayuda para lavado y vestido (2)',2]]},
  {t:'chk', l:'Eosinófilos <0,05 ×10⁹/L', p:1},
  {t:'chk', l:'Consolidación en radiografía de tórax', p:1},
  {t:'chk', l:'pH <7,30', p:1},
  {t:'chk', l:'Fibrilación auricular (en ECG o antecedente de FA paroxística)', p:1}],
  interp:function(s){return s<=1?['low',s+' puntos','Mortalidad 0–1,5% — candidato a hospitalización a domicilio o alta precoz con soporte']:s===2?['mid','2 puntos','Mortalidad ~5% — ingreso convencional']:['high',s+' puntos','Mortalidad 15–50% — planificar escalada (UCI/VMNI) o adecuación de esfuerzo precoz']}},

{id:'at4', src:'Bellelli 2014 · PMID 24590568', title:'4AT', sub:'Delirium — cribado rápido (≥4 = posible delirium)', badge:'amber', tag:'Delirium', max:12, items:[
  {t:'sel', l:'Alerta (somnolencia o agitación marcada)', o:[['Normal (0)',0],['Alterada (4)',4]]},
  {t:'sel', l:'AMT4 — edad, fecha nacimiento, lugar, año', o:[['Sin errores (0)',0],['1 error (1)',1],['≥2 errores o no evaluable (2)',2]]},
  {t:'sel', l:'Atención — meses del año en orden inverso', o:[['≥7 meses correctos (0)',0],['<7 o rechaza (1)',1],['No evaluable por enfermedad/somnolencia (2)',2]]},
  {t:'sel', l:'Cambio agudo o curso fluctuante (2 semanas)', o:[['No (0)',0],['Sí (4)',4]]}],
  interp:function(s){return s===0?['low','0 puntos','Delirium y deterioro cognitivo improbables']:s<=3?['mid',s+' puntos','Posible deterioro cognitivo — delirium no descartado']:['high',s+' puntos','Posible delirium ± deterioro cognitivo — buscar causa: ITU, retención, fecaloma, fármacos, hipoglucemia']}},

{id:'rockall', src:'Rockall 1996 · Gut · PMID 8675081 · guía: Gralnek 2021 (ESGE) · Endoscopy · PMID 33567467', title:'Rockall pre-endoscópico', sub:'HDA — riesgo previo a endoscopia (0–7)', badge:'amber', tag:'HDA', max:7, items:[
  {t:'sel', l:'Edad', o:[['<60 años (0)',0],['60–79 años (1)',1],['≥80 años (2)',2]]},
  {t:'sel', l:'Shock', o:[['Sin shock: TAS ≥100, FC <100 (0)',0],['Taquicardia: TAS ≥100, FC ≥100 (1)',1],['Hipotensión: TAS <100 (2)',2]]},
  {t:'sel', l:'Comorbilidad', o:[['Ninguna mayor (0)',0],['Insuficiencia cardiaca, cardiopatía isquémica u otra comorbilidad mayor (2)',2],['Insuficiencia renal, insuficiencia hepática o neoplasia diseminada (3)',3]]}],
  interp:function(s){return s===0?['low','0 puntos','Riesgo muy bajo (mortalidad ~0,2%). Para decidir alta ambulatoria la ESGE recomienda Glasgow-Blatchford ≤1, no Rockall']:s<=2?['mid',s+' puntos','Mortalidad creciente con la puntuación — ingreso y endoscopia en ≤24 h tras reanimación (ESGE 2021)']:['high',s+' puntos','Alto riesgo de muerte (hasta ~50% con 7 puntos) — reanimación, ingreso y endoscopia en ≤24 h; la endoscopia urgente ≤12 h no mejora el pronóstico (ESGE 2021)']}},

{id:'aims65', src:'Saltzman 2011 · Gastrointest Endosc · PMID 21907980', title:'AIMS65', sub:'HDA — mortalidad intrahospitalaria', badge:'amber', tag:'HDA', max:5, items:[
  {t:'chk', l:'A — Albúmina <3,0 g/dL', p:1},
  {t:'chk', l:'I — INR >1,5', p:1},
  {t:'chk', l:'M — Alteración del estado mental', p:1},
  {t:'chk', l:'S — TAS ≤90 mmHg', p:1},
  {t:'chk', l:'65 — Edad >65 años', p:1}],
  interp:function(s){var m=['0,3','1,2','5,3','10,3','16,5','24,5'][s];return s<=1?['low',s+' puntos','Mortalidad intrahospitalaria '+m+'% — bajo riesgo']:['high',s+' puntos','Mortalidad intrahospitalaria '+m+'% — alto riesgo (≥2 puntos)']}},

{id:'ranson', src:'Ranson 1974 · Surg Gynecol Obstet 139:69 · PMID 4834279', title:'Ranson (no biliar)', sub:'Pancreatitis — ingreso + 48 h (≥3 = grave)', badge:'amber', tag:'Pancreatitis', max:11, items:[
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

{id:'barthel', src:'Mahoney y Barthel 1965 · Md State Med J · PMID 14258950 · puntos de corte: Cid-Ruzafa 1997 · Rev Esp Salud Publica · PMID 9546856', title:'Barthel', sub:'Situación funcional basal (0–100)', badge:'blue', tag:'Geriatría', max:100, items:[
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

{id:'morse', src:'Morse 1989 · Soc Sci Med · PMID 2928815 · desarrollo: Morse 1989 · Can J Aging 8:366 · corte ≥51: Baek 2013 · J Clin Nurs · PMID 24112535', title:'Morse', sub:'Riesgo de caídas intrahospitalario', badge:'blue', tag:'Caídas', max:125, items:[
  {t:'chk', l:'Antecedente de caída en los últimos 3 meses', p:25},
  {t:'chk', l:'Diagnóstico secundario (≥2 diagnósticos activos)', p:15},
  {t:'sel', l:'Ayuda para deambular', o:[['Ninguna / reposo / ayuda de enfermería (0)',0],['Muletas, bastón o andador (15)',15],['Se apoya en el mobiliario (30)',30]]},
  {t:'chk', l:'Terapia IV o catéter heparinizado', p:20},
  {t:'sel', l:'Marcha', o:[['Normal / reposo / inmóvil (0)',0],['Débil (10)',10],['Alterada (20)',20]]},
  {t:'sel', l:'Estado mental', o:[['Consciente de sus limitaciones (0)',0],['Olvida sus limitaciones (15)',15]]}],
  interp:function(s){return s<=24?['low',s+' puntos','Riesgo bajo — cuidados básicos']:s<=44?['mid',s+' puntos','Riesgo medio — protocolo de prevención estándar']:['high',s+' puntos','Riesgo alto (≥45; algunos centros usan ≥51) — protocolo de alto riesgo de caídas']}},

{id:'anthonisen', src:'Anthonisen 1987 · Ann Intern Med · PMID 3492164 · guía: GOLD (Vogelmeier 2017) · Am J Respir Crit Care Med · PMID 28128970', title:'Anthonisen', sub:'EPOC agudizado — indicación de antibiótico', badge:'amber', tag:'EPOC', max:3, items:[
  {t:'sel', btn:true, l:'Aumento de la disnea', o:[['No',0],['Sí',1]]},
  {t:'sel', btn:true, l:'Aumento del volumen del esputo', o:[['No',0],['Sí',1]]},
  {t:'sel', btn:true, l:'Aumento de la purulencia del esputo', o:[['No',0],['Sí',1]]},
  {t:'sel', btn:true, l:'Criterio menor: infección de vías altas en 5 días, fiebre sin otra causa, ↑sibilancias, ↑tos o ↑FR/FC ≥20% sobre el basal', o:[['No',0],['Sí',1]]},
  {t:'sel', btn:true, l:'Precisa ventilación mecánica (VMNI o invasiva)', o:[['No',0],['Sí',1]]}],
  /* s = nº síntomas cardinales + purulencia ×10 + criterio menor ×100 + ventilación ×1000 */
  calcCustom:function(v){return v[0]+v[1]+v[2]+v[2]*10+v[3]*100+v[4]*1000},
  numTxt:function(s){var n=s%10;return n===3?'Tipo I':n===2?'Tipo II':(n===1&&Math.floor(s/100)%10)?'Tipo III':'—'},
  interp:function(s){
    var n=s%10, pur=Math.floor(s/10)%10===1, men=Math.floor(s/100)%10===1, vm=s>=1000;
    var t=n===3?'Tipo I':n===2?'Tipo II':(n===1&&men)?'Tipo III':'Sin criterios';
    if (vm) return ['high',t,'Ventilación mecánica: antibiótico indicado (GOLD) con independencia del tipo'];
    if (n===3) return ['high',t,'Antibiótico indicado — beneficio frente a placebo en Anthonisen 1987; GOLD: 3 síntomas cardinales'];
    if (n===2) return pur?['mid',t,'Antibiótico indicado: 2 síntomas cardinales y uno es la purulencia (GOLD)']:['low',t,'Sin purulencia: antibiótico no indicado de rutina (GOLD)'];
    if (n===1&&men) return ['low',t,'Antibiótico no indicado: sin beneficio frente a placebo en el tipo III (Anthonisen 1987)'];
    return ['low',t,'No cumple la definición de agudización de Anthonisen (1 síntoma cardinal requiere además un criterio menor)'];
  }},

{id:'ehra', src:'mEHRA: Wynn 2014 · Europace · PMID 24534264 · guía: ESC 2024 fibrilación auricular · Eur Heart J · PMID 39210723', title:'EHRA', sub:'FA — clase funcional sintomática (mEHRA)', badge:'blue', tag:'FA', max:5, items:[
  {t:'sel', l:'Sintomatología atribuible a la FA', o:[['1 — sin síntomas (1)',1],['2a — leves: actividad diaria normal, síntomas no molestos (2)',2],['2b — moderados: actividad diaria normal pero síntomas molestos (3)',3],['3 — graves: actividad diaria afectada (4)',4],['4 — incapacitantes: actividad diaria interrumpida (5)',5]]}],
  interp:function(s){var c=['','1','2a','2b','3','4'][s];return s===1?['low','mEHRA 1','Asintomático: el control del ritmo no se indica por síntomas; valorar control precoz del ritmo en pacientes seleccionados (ESC 2024, IIa). Registrar la mEHRA en cada visita']:s===2?['low','mEHRA 2a','Síntomas leves: decisión compartida; el control del ritmo está indicado si el objetivo es reducir síntomas y mejorar la calidad de vida (ESC 2024, I)']:['high','mEHRA '+c,'Síntomas que molestan o limitan: control del ritmo para reducir síntomas (ESC 2024, I); 2b es el umbral de tratamiento propuesto para la ablación (Wynn 2014)']}},

{id:'bms', src:'Nigrovic 2002 · Pediatrics · PMID 12359784 · validación: Nigrovic 2007 · JAMA · PMID 17200475', title:'Bacterial Meningitis Score', sub:'Pediátrico 29 días–19 años — solo si pleocitosis en LCR (≥10/µL)', badge:'red', tag:'Meningitis', max:6, items:[
  {t:'chk', l:'Tinción de Gram del LCR positiva', p:2},
  {t:'chk', l:'Neutrófilos en sangre ≥10.000/µL', p:1},
  {t:'chk', l:'Proteínas en LCR ≥80 mg/dL', p:1},
  {t:'chk', l:'Neutrófilos en LCR ≥1.000/µL', p:1},
  {t:'chk', l:'Convulsión antes o en el momento de la consulta', p:1}],
  interp:function(s){return s===0?['low','0 puntos','Riesgo muy bajo de meningitis bacteriana (VPN 99,9%; los 2 falsos negativos de la validación tenían &lt;2 meses). NO aplicable si aspecto séptico, púrpura, ATB antes de la PL, inmunosupresión o neurocirugía/derivación']:['high',s+' puntos','No descarta meningitis bacteriana — antibioterapia empírica inmediata']}},

// ── 9 escalas nuevas ──────────────────────────────────────────────

{id:'news2', src:'Royal College of Physicians. NEWS2 2017 (informe, sin PMID) · validación NEWS: Smith GB 2013 · Resuscitation · PMID 23295778 · respuesta RCP resumida en Holland 2023 · Intern Emerg Med · PMID 36602553', title:'NEWS2', sub:'Alerta temprana — respuesta clínica (0–20)', badge:'red', tag:'Triaje', max:20, items:[
  {t:'sel', l:'Frecuencia respiratoria (rpm)', o:[['12–20 (0)',0],['9–11 (1)',1],['21–24 (2)',2],['≤8 (3)',3],['≥25 (3)',3]]},
  {t:'sel', l:'SpO₂ — Escala 1 (%)', o:[['≥96 (0)',0],['94–95 (1)',1],['92–93 (2)',2],['≤91 (3)',3]]},
  {t:'sel', l:'Aire o O₂ suplementario', o:[['Aire ambiente (0)',0],['O₂ suplementario (2)',2]]},
  {t:'sel', l:'TAS (mmHg)', o:[['111–219 (0)',0],['101–110 (1)',1],['91–100 (2)',2],['≤90 (3)',3],['≥220 (3)',3]]},
  {t:'sel', l:'Frecuencia cardiaca (lpm)', o:[['51–90 (0)',0],['41–50 (1)',1],['91–110 (1)',1],['111–130 (2)',2],['≤40 (3)',3],['≥131 (3)',3]]},
  {t:'sel', l:'Nivel de conciencia (ACVPU)', o:[['Alerta (0)',0],['Confusión nueva / Voz / Dolor / No responde (3)',3]]},
  {t:'sel', l:'Temperatura (°C)', o:[['36,1–38,0 (0)',0],['35,1–36,0 (1)',1],['38,1–39,0 (1)',1],['≥39,1 (2)',2],['≤35,0 (3)',3]]}],
  info:'Un 3 en cualquier parámetro aislado («puntuación roja») obliga a valoración urgente por un clínico competente en paciente agudo y controles al menos horarios, aunque el total sea &lt;5. La Escala 1 de SpO₂ es la general; la Escala 2 (objetivo 88–92%) solo se usa en insuficiencia respiratoria hipercápnica confirmada y no está incluida aquí.',
  interp:function(s){return s===0?['low','0 puntos','Riesgo muy bajo — controles al menos cada 12 h']:s<=4?['low',s+' puntos','Riesgo bajo — controles cada 4–6 h; valoración por enfermería. Si algún parámetro puntúa 3: valoración urgente y controles horarios']:s<=6?['mid',s+' puntos','Riesgo medio — respuesta urgente: valoración por clínico competente en paciente agudo, controles al menos horarios, entorno monitorizado']:['high',s+' puntos','Riesgo alto — respuesta de emergencia: equipo con competencias de críticos (incluida vía aérea), monitorización continua, valorar traslado a UCI/semicríticos']}},

{id:'apache2', src:'Knaus WA 1985 · Crit Care Med · PMID 3928249 · mortalidad por tramos (no quirúrgicos) reproducida en de Vries 2018 · Br J Haematol · PMID 29468848', title:'APACHE II', sub:'Gravedad en UCI — mortalidad estimada (0–71)', badge:'amber', tag:'UCI', max:71, items:[
  {t:'sel', l:'Temperatura rectal (°C)', o:[['36–38,4 (0)',0],['38,5–38,9 (1)',1],['34–35,9 (1)',1],['32–33,9 (2)',2],['39–40,9 (3)',3],['30–31,9 (3)',3],['≥41 (4)',4],['≤29,9 (4)',4]]},
  {t:'sel', l:'PAM — presión arterial media (mmHg)', o:[['70–109 (0)',0],['110–129 (2)',2],['50–69 (2)',2],['130–159 (3)',3],['≥160 (4)',4],['≤49 (4)',4]]},
  {t:'sel', l:'Frecuencia cardiaca (lpm)', o:[['70–109 (0)',0],['110–139 (2)',2],['55–69 (2)',2],['140–179 (3)',3],['40–54 (3)',3],['≥180 (4)',4],['≤39 (4)',4]]},
  {t:'sel', l:'Frecuencia respiratoria (rpm)', o:[['12–24 (0)',0],['25–34 (1)',1],['10–11 (1)',1],['6–9 (2)',2],['35–49 (3)',3],['≥50 (4)',4],['≤5 (4)',4]]},
  {t:'sel', l:'Oxigenación (FiO₂ ≥0,5: A-aDO₂ · FiO₂ <0,5: PaO₂, mmHg)', o:[['FiO₂ <0,5 y PaO₂ >70, o FiO₂ ≥0,5 y A-aDO₂ <200 (0)',0],['FiO₂ <0,5: PaO₂ 61–70 (1)',1],['FiO₂ ≥0,5: A-aDO₂ 200–349 (2)',2],['FiO₂ <0,5: PaO₂ 55–60 · FiO₂ ≥0,5: A-aDO₂ 350–499 (3)',3],['FiO₂ <0,5: PaO₂ <55 · FiO₂ ≥0,5: A-aDO₂ ≥500 (4)',4]]},
  {t:'sel', l:'pH arterial', o:[['7,33–7,49 (0)',0],['7,50–7,59 (1)',1],['7,25–7,32 (2)',2],['7,60–7,69 (3)',3],['7,15–7,24 (3)',3],['≥7,70 (4)',4],['<7,15 (4)',4]]},
  {t:'sel', l:'Sodio sérico (mEq/L)', o:[['130–149 (0)',0],['150–154 (1)',1],['120–129 (2)',2],['155–159 (2)',2],['160–179 (3)',3],['111–119 (3)',3],['≥180 (4)',4],['≤110 (4)',4]]},
  {t:'sel', l:'Potasio sérico (mEq/L)', o:[['3,5–5,4 (0)',0],['5,5–5,9 (1)',1],['3,0–3,4 (1)',1],['2,5–2,9 (2)',2],['6,0–6,9 (3)',3],['≥7,0 (4)',4],['<2,5 (4)',4]]},
  {t:'sel', l:'Creatinina sérica (mg/dL) — puntos dobles si fracaso renal agudo', o:[['0,6–1,4 (0)',0],['<0,6 (2)',2],['1,5–1,9 (2)',2],['2,0–3,4 (3)',3],['≥3,5 (4)',4],['1,5–1,9 + FRA (4)',4],['2,0–3,4 + FRA (6)',6],['≥3,5 + FRA (8)',8]]},
  {t:'sel', l:'Hematocrito (%)', o:[['30–45,9 (0)',0],['46–49,9 (1)',1],['50–59,9 (2)',2],['20–29,9 (2)',2],['≥60 (4)',4],['<20 (4)',4]]},
  {t:'sel', l:'Leucocitos (×10³/µL)', o:[['3–14,9 (0)',0],['15–19,9 (1)',1],['20–39,9 (2)',2],['1–2,9 (2)',2],['≥40 (4)',4],['<1 (4)',4]]},
  {t:'sel', l:'Glasgow (puntos = 15 − GCS)', o:[['GCS 15 (0)',0],['GCS 14 (1)',1],['GCS 13 (2)',2],['GCS 12 (3)',3],['GCS 11 (4)',4],['GCS 10 (5)',5],['GCS 9 (6)',6],['GCS 8 (7)',7],['GCS 7 (8)',8],['GCS 6 (9)',9],['GCS 5 (10)',10],['GCS 4 (11)',11],['GCS 3 (12)',12]]},
  {t:'sel', l:'Edad', o:[['≤44 años (0)',0],['45–54 años (2)',2],['55–64 años (3)',3],['65–74 años (5)',5],['≥75 años (6)',6]]},
  {t:'sel', l:'Salud crónica (solo si insuficiencia orgánica grave previa o inmunodepresión)', o:[['No (0)',0],['Sí + postoperado programado (2)',2],['Sí + no quirúrgico o postoperado urgente (5)',5]]}],
  info:'Usar el peor valor de las primeras 24 h en UCI. Las mortalidades mostradas son las de pacientes no quirúrgicos; en postoperados son menores.',
  interp:function(s){return s<=4?['low',s+' puntos','Mortalidad hospitalaria estimada ~4% (no quirúrgicos)']:s<=9?['low',s+' puntos','Mortalidad estimada ~8% (no quirúrgicos)']:s<=14?['mid',s+' puntos','Mortalidad estimada ~15% (no quirúrgicos)']:s<=19?['mid',s+' puntos','Mortalidad estimada ~25% (no quirúrgicos)']:s<=24?['high',s+' puntos','Mortalidad estimada ~40% (no quirúrgicos)']:s<=29?['high',s+' puntos','Mortalidad estimada ~55% (no quirúrgicos; ~35% postoperados)']:s<=34?['high',s+' puntos','Mortalidad estimada ~75% (no quirúrgicos)']:['high',s+' puntos','Mortalidad estimada ~85% (no quirúrgicos; ~88% postoperados)']}},

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

{id:'meld', src:'Kamath PS 2001 · Hepatology · PMID 11172350 · mortalidad a 3 meses: Wiesner R 2003 · Gastroenterology · PMID 12512033 · MELD 3.0: Kim WR 2021 · Gastroenterology · PMID 34481845', title:'MELD', sub:'Hepatopatía terminal · MELD original · EE.UU. asigna con MELD 3.0 desde 2023', badge:'amber', tag:'Digestivo', max:40, agg:'custom', items:[
  {t:'num', l:'Bilirrubina total', u:'mg/dL', f:function(v){return 0}},
  {t:'num', l:'Creatinina sérica', u:'mg/dL', f:function(v){return 0}},
  {t:'num', l:'INR', u:'', f:function(v){return 0}}],
  calcCustom:function(vals){var bil=Math.max(1,vals[0]||1);var cr=Math.min(4,Math.max(1,vals[1]||1));var inr=Math.max(1,vals[2]||1);return Math.round(10*(0.957*Math.log(cr)+0.378*Math.log(bil)+1.12*Math.log(inr)+0.643))},
  interp:function(s){return s<10?['low',s+' puntos','Mortalidad a 3 meses ~1,9% (MELD ≤9) — seguimiento ambulatorio']:s<20?['mid',s+' puntos','Mortalidad a 3 meses ~6% — seguimiento estrecho']:s<30?['high',s+' puntos','Mortalidad a 3 meses ~20% — evaluar trasplante']:s<40?['high',s+' puntos','Mortalidad a 3 meses ~53% — priorizar trasplante hepático']:['high',s+' puntos','Mortalidad a 3 meses ~71% — priorizar trasplante hepático']}},

{id:'childpugh', src:'Pugh RN 1973 · Br J Surg · PMID 4541913 · supervivencia: Villeneuve JP 1986 · Hepatology · PMID 3758945', title:'Child-Pugh', sub:'Cirrosis — clasificación funcional (A–B–C)', badge:'amber', tag:'Digestivo', max:15, items:[
  {t:'sel', l:'Bilirrubina total (mg/dL)', o:[['<2 (1)',1],['2–3 (2)',2],['>3 (3)',3]]},
  {t:'sel', l:'Albúmina (g/dL)', o:[['>3,5 (1)',1],['2,8–3,5 (2)',2],['<2,8 (3)',3]]},
  {t:'sel', l:'INR / Tiempo de protrombina', o:[['<1,7 / TP >50% (1)',1],['1,7–2,3 / TP 30–50% (2)',2],['>2,3 / TP <30% (3)',3]]},
  {t:'sel', l:'Ascitis', o:[['Ausente (1)',1],['Leve / controlada con diuréticos (2)',2],['Moderada-grave / refractaria (3)',3]]},
  {t:'sel', l:'Encefalopatía hepática', o:[['Ausente (1)',1],['Grado I–II (2)',2],['Grado III–IV (3)',3]]}],
  interp:function(s){return s<=6?['low','Clase A ('+s+' pts)','Hepatopatía compensada — supervivencia a 2 años ~98%']:s<=9?['mid','Clase B ('+s+' pts)','Compromiso funcional significativo — supervivencia a 2 años ~66%']:['high','Clase C ('+s+' pts)','Hepatopatía descompensada — supervivencia a 2 años ~36% — valorar trasplante']}},

{id:'camicu', src:'Ely 2001 · PMID 11730446', title:'CAM-ICU', sub:'Delirium en UCI — cribado diagnóstico', badge:'amber', tag:'UCI', max:1, agg:'custom', items:[
  {t:'sel', l:'1. Inicio agudo o curso fluctuante', o:[['No (0)',0],['Sí — cambio agudo del estado mental o fluctuación 24 h (1)',1]]},
  {t:'sel', l:'2. Inatención (RASS/letras)', o:[['No (0)',0],['Sí — dificultad para mantener la atención (1)',1]]},
  {t:'sel', l:'3. Nivel de conciencia alterado', o:[['RASS 0 — alerta y calmado (0)',0],['RASS ≠ 0 — alterado (1)',1]]},
  {t:'sel', l:'4. Pensamiento desorganizado', o:[['No (0)',0],['Sí — respuestas incoherentes o desordenadas (1)',1]]}],
  calcCustom:function(vals){return(vals[0]>0&&vals[1]>0&&(vals[2]>0||vals[3]>0))?1:0},
  interp:function(s){return s===0?['low','Negativo','Delirium no presente — reevaluar si cambio clínico']:['high','POSITIVO','Delirium presente — buscar causa: fármacos, infección, metabólico, retención, dolor']}},

{id:'psi', src:'Fine MJ 1997 · N Engl J Med · PMID 8995086 · guía: ACEP 2021 · Ann Emerg Med · PMID 33349374', title:'PSI/PORT', sub:'Neumonía — mortalidad y decisión de ingreso', badge:'amber', tag:'Respiratorio', max:395, items:[
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
  info:'Clase I sin puntuar (paso 1): edad ≤50 años, sin neoplasia, hepatopatía, ICC, enfermedad cerebrovascular ni renal, y sin alteración de conciencia, FR ≥30, TAS &lt;90, Tª &lt;35 o ≥40 °C ni FC ≥125. Si no cumple todo, se puntúa (clases II–V).',
  interp:function(s){return s<=70?['low','Clase I–II','Clase I (paso 1) o II (≤70 pts) — mortalidad 0,1–0,7% — tratamiento ambulatorio']:s<=90?['mid','Clase III','71–90 pts — mortalidad 0,9–2,8% — ambulatorio u observación breve']:s<=130?['high','Clase IV','91–130 pts — mortalidad 8–9% — ingreso hospitalario']:['high','Clase V','>130 pts — mortalidad 27–31% — ingreso / valorar UCI']}},

{id:'rass', src:'Sessler CN 2002 · Am J Respir Crit Care Med · PMID 12421743 · guía PADIS: Devlin JW 2018 · Crit Care Med · PMID 30113379', title:'RASS', sub:'Sedación y agitación en UCI (−5 a +4)', badge:'blue', tag:'UCI', max:4, items:[
  {t:'sel', l:'Nivel de sedación/agitación', o:[['0 Alerta y calmado',0],['-1 Somnoliento: despertar sostenido a la voz, apertura ocular/contacto visual >10 s',-1],['-2 Sedación ligera: despierta brevemente a la voz, contacto visual <10 s',-2],['-3 Sedación moderada: movimiento o apertura ocular a la voz, sin contacto visual',-3],['-4 Sedación profunda: no responde a la voz; movimiento o apertura ocular al estímulo físico',-4],['-5 No despertable: sin respuesta a la voz ni al estímulo físico',-5],['+1 Inquieto: ansioso, movimientos no agresivos ni vigorosos',1],['+2 Agitado: movimientos frecuentes sin propósito, lucha con el respirador',2],['+3 Muy agitado: se arranca tubos o catéteres; agresivo',3],['+4 Combativo: violento, peligro inmediato para el personal',4]]}],
  interp:function(s){return s<=-4?['high','RASS '+s,'Sedación profunda — valorar reducción de sedantes / despertar diario; CAM-ICU no valorable']:s===-3?['mid','RASS −3','Sedación moderada — más profunda que el objetivo habitual (−2 a +1)']:s<=-1?['low','RASS '+s,'Sedación ligera — dentro del objetivo habitual en VM (PADIS: −2 a +1)']:s===0?['low','RASS 0','Alerta y calmado — estado óptimo']:s===1?['low','RASS +1','Inquieto — dentro del objetivo; evaluar dolor, ansiedad o delirium']:s===2?['mid','RASS +2','Agitación — evaluar causa: dolor, delirium, ansiedad, asincronía con el respirador']:['high','RASS +'+s,'Agitación peligrosa — seguridad del paciente y del personal, tratamiento urgente']}},

{id:'mmrc', src:'Escala MRC: Fletcher CM 1959 · Br Med J · PMID 13823475 · mMRC (0–4): Mahler DA 1988 · Chest · PMID 3342669 · umbral: informe GOLD (sin PMID)', title:'mMRC', sub:'Disnea — grado funcional (0–4)', badge:'blue', tag:'Respiratorio', max:4, items:[
  {t:'sel', l:'Grado de disnea', o:[['0 — Solo con ejercicio intenso (0)',0],['1 — Al caminar deprisa en llano o subir una cuesta ligera (1)',1],['2 — Camina en llano más lento que personas de su edad o tiene que pararse a su propio paso (2)',2],['3 — Se para a respirar tras ~100 m o pocos minutos en llano (3)',3],['4 — Demasiada disnea para salir de casa o al vestirse/desvestirse (4)',4]]}],
  interp:function(s){return s<=1?['low','Grado '+s,'Menos sintomático (GOLD: mMRC 0–1)']:s===2?['mid','Grado 2','Más sintomático (GOLD: mMRC ≥2) — valorar rehabilitación pulmonar y optimizar broncodilatación']:['high','Grado '+s,'Limitación grave (GOLD: mMRC ≥2) — rehabilitación + optimizar tratamiento broncodilatador']}},

// ── 16 escalas nuevas (Codis SEM, trauma, geriatría, pediatría) ────

{id:'killip', src:'Killip y Kimball 1967 · Am J Cardiol · PMID 6059183', title:'Killip-Kimball', sub:'IAM — insuficiencia cardiaca al ingreso (clase I–IV)', badge:'red', tag:'SCA', max:4, items:[
  {t:'sel', l:'Clase clínica', o:[['I — Sin signos de insuficiencia cardiaca (1)',1],['II — Estertores <50% campos, S3, ingurgitación yugular (2)',2],['III — Edema agudo de pulmón (3)',3],['IV — Shock cardiogénico (4)',4]]}],
  interp:function(s){var d={1:['low','Killip I','Sin insuficiencia cardiaca — mortalidad hospitalaria ~6%'],2:['mid','Killip II','IC leve-moderada — mortalidad ~17%'],3:['high','Killip III','Edema agudo de pulmón — mortalidad ~38%'],4:['high','Killip IV','Shock cardiogénico — mortalidad ~81%']};return d[s]}},

{id:'race', src:'Pérez de la Ossa N 2014 · Stroke · PMID 24281224 · descripción de ítems: ACEP 2023 · Ann Emerg Med · PMID 37479410', title:'RACE', sub:'Ictus prehospitalario — predicción de oclusión de gran vaso', badge:'red', tag:'Ictus', max:9, items:[
  {t:'sel', l:'Paresia facial (enseñar los dientes / sonreír)', o:[['Ausente (0)',0],['Leve (1)',1],['Moderada o grave (2)',2]]},
  {t:'sel', l:'Paresia braquial', o:[['Normal o leve: mantiene el brazo >10 s (0)',0],['Moderada: lo mantiene <10 s (1)',1],['Grave: no vence la gravedad (2)',2]]},
  {t:'sel', l:'Paresia crural', o:[['Normal o leve: mantiene la pierna >5 s (0)',0],['Moderada: la mantiene <5 s (1)',1],['Grave: no vence la gravedad (2)',2]]},
  {t:'chk', l:'Desviación oculocefálica', p:1},
  {t:'sel', l:'Hemiparesia derecha → afasia («cierre los ojos», «cierre el puño») · Hemiparesia izquierda → agnosia («¿de quién es este brazo?», «¿puede mover/aplaudir con ambos brazos?»)', o:[['Afasia: hace las 2 órdenes · Agnosia: reconoce su brazo y el déficit (0)',0],['Afasia: hace 1 orden · Agnosia: no reconoce su brazo o el déficit (1)',1],['Afasia: no hace ninguna · Agnosia: no reconoce ni su brazo ni el déficit (2)',2]]}],
  interp:function(s){return s>=5?['high',s+' pts','Alta probabilidad de oclusión de gran vaso (S 85%, E 68%, VPN 94%) — activar código ictus a centro con trombectomía']:['low',s+' pts','Baja probabilidad de oclusión de gran vaso — traslado según protocolo territorial']}},

{id:'mrs', src:'Rankin 1957 · PMID 13432835 · van Swieten 1988 · PMID 3363593', title:'Rankin modificada (mRS)', sub:'Ictus — situación funcional previa (basal) y pronóstico', badge:'red', tag:'Ictus', max:6, items:[
  {t:'sel', l:'Situación funcional (preguntar a familiares por la basal, previa al ictus actual)', o:[
    ['Asintomático (0)',0],
    ['Sin discapacidad significativa: síntomas, pero realiza sus actividades habituales (1)',1],
    ['Discapacidad leve: no realiza todas sus actividades previas, pero se vale por sí mismo sin ayuda (2)',2],
    ['Discapacidad moderada: necesita alguna ayuda, pero camina sin ayuda de otra persona (3)',3],
    ['Discapacidad moderada-grave: no camina sin ayuda ni atiende sus necesidades corporales sin ayuda (4)',4],
    ['Discapacidad grave: encamado, incontinente, requiere atención constante (5)',5],
    ['Muerte (6)',6]]}],
  info:'La mRS previa no es por sí sola un criterio de exclusión de reperfusión. Valorar por separado trombólisis (ESO 2021: considerar en pacientes seleccionados con discapacidad previa, recomendación débil) y trombectomía (ensayos pivotales con mRS 0–1)',
  interp:function(s){return s<=1?['low','mRS '+s,'Independiente — perfil predominante de los ensayos pivotales de trombectomía']:s===2?['low','mRS 2','Independiente con limitaciones — no excluye por sí sola trombólisis ni trombectomía; evaluar el resto de criterios']:s<=4?['mid','mRS '+s,'Dependiente — reperfusión individualizada (evidencia observacional): ¿puede volver a su situación previa aceptable?']:s===5?['high','mRS 5','Dependencia total — evidencia muy escasa; decisión individual según situación basal, pronóstico y preferencias']:['high','mRS 6','Muerte']}},

{id:'rts', src:'Champion HR 1989 · J Trauma · PMID 2657085', title:'Revised Trauma Score', sub:'Trauma — índice fisiológico pronóstico', badge:'red', tag:'Trauma', max:7.84, agg:'custom', items:[
  {t:'sel', l:'Escala de Glasgow (codificado)', o:[['13–15 (4)',4],['9–12 (3)',3],['6–8 (2)',2],['4–5 (1)',1],['3 (0)',0]]},
  {t:'sel', l:'Presión arterial sistólica (mmHg)', o:[['>89 (4)',4],['76–89 (3)',3],['50–75 (2)',2],['1–49 (1)',1],['0 — sin pulso (0)',0]]},
  {t:'sel', l:'Frecuencia respiratoria (rpm)', o:[['10–29 (4)',4],['>29 (3)',3],['6–9 (2)',2],['1–5 (1)',1],['0 — apnea (0)',0]]}],
  info:'RTS = 0,9368·GCS + 0,7326·TAS + 0,2908·FR (valores codificados). Para triaje se usa la suma simple de los códigos (T-RTS, 0–12): T-RTS ≤11 indica traslado a centro de trauma. A menor RTS, menor probabilidad de supervivencia.',
  calcCustom:function(vals){return Math.round((0.9368*vals[0]+0.7326*vals[1]+0.2908*vals[2])*100)/100},
  interp:function(s){return s>=7.84?['low',s+' pts','Máximo (7,84): las tres variables en rango normal (T-RTS 12)']:['high',s+' pts','Al menos una variable alterada (T-RTS ≤11) — criterio de traslado a centro de trauma; a menor RTS, menor supervivencia']}},

{id:'tash', src:'Yücel N 2006 · J Trauma · PMID 16766965 · probabilidad: Maegele M 2010 · World J Emerg Med · PMID 25214935', title:'TASH', sub:'Trauma — predicción de transfusión masiva', badge:'red', tag:'Trauma', max:28, items:[
  {t:'sel', l:'Hemoglobina (g/dL)', o:[['≥12 (0)',0],['11–11,9 (2)',2],['10–10,9 (3)',3],['9–9,9 (4)',4],['7–8,9 (6)',6],['<7 (8)',8]]},
  {t:'sel', l:'Presión arterial sistólica (mmHg)', o:[['≥120 (0)',0],['100–119 (1)',1],['<100 (4)',4]]},
  {t:'sel', l:'Exceso de bases (mmol/L)', o:[['≥−2 (0)',0],['−2 a −5,9 (1)',1],['−6 a −9,9 (3)',3],['<−10 (4)',4]]},
  {t:'chk', l:'Frecuencia cardiaca >120 lpm', p:2},
  {t:'chk', l:'Líquido libre intraabdominal (FAST/TC)', p:3},
  {t:'sel', l:'Fractura compleja de huesos largos y/o pelvis', o:[['Ausente (0)',0],['AIS 3–4 (3)',3],['AIS 5 (6)',6]]},
  {t:'chk', l:'Sexo masculino', p:1}],
  info:'Transfusión masiva definida como ≥10 concentrados de hematíes entre urgencias y el ingreso en UCI. La probabilidad aumenta de forma continua con cada punto; derivado en traumatismo cerrado (&gt;95%).',
  interp:function(s){return s>=18?['high',s+' pts','Probabilidad de transfusión masiva ≥50% (TASH 18 ≈ 50%) — activar protocolo de transfusión masiva']:['low',s+' pts','Probabilidad de transfusión masiva &lt;50%; aumenta con cada punto — reevaluar']}},

{id:'hestia', src:'Zondag W 2011 · J Thromb Haemost · PMID 21645235 · recogido en ACEP Clinical Policy 2018 · Ann Emerg Med · PMID 29681319', title:'Criterios de Hestia', sub:'TEP — elegibilidad para tratamiento ambulatorio (todo "No" = alta precoz)', badge:'blue', tag:'TEP', max:1, agg:'max', items:[
  {t:'chk', l:'Inestabilidad hemodinámica (PAS &lt;100 mmHg con FC &gt;100 lpm, o necesidad de UCI, a criterio clínico)', p:1},
  {t:'chk', l:'Necesidad de trombolisis o embolectomía', p:1},
  {t:'chk', l:'Sangrado activo o alto riesgo de sangrado', p:1},
  {t:'chk', l:'Necesidad de O₂ >24 h para SpO₂ >90%', p:1},
  {t:'chk', l:'TEP diagnosticado durante tratamiento anticoagulante', p:1},
  {t:'chk', l:'Dolor severo que requiere analgesia IV >24 h', p:1},
  {t:'chk', l:'Motivo médico o social para ingreso >24 h (infección, neoplasia, sin apoyo social)', p:1},
  {t:'chk', l:'Aclaramiento de creatinina <30 mL/min (Cockcroft-Gault)', p:1},
  {t:'chk', l:'Insuficiencia hepática grave', p:1},
  {t:'chk', l:'Embarazo', p:1},
  {t:'chk', l:'Antecedente documentado de trombocitopenia inducida por heparina', p:1}],
  interp:function(s){return s===0?['low','Negativo','Todos los criterios negativos — candidato a tratamiento ambulatorio (Hestia, n=297: recurrencia de ETV 2,0 %, hemorragia mayor 0,7 %, mortalidad 1,0 % a 3 meses)']:['high','Positivo','≥1 criterio positivo — requiere ingreso hospitalario']}},

{id:'wellstvp', src:'Wells PS 1997 · Lancet · PMID 9428249 · versión modificada (TVP previa, probable/improbable): Wells PS 2003 · N Engl J Med · PMID 14507948', title:'Wells — TVP', sub:'Probabilidad pre-test de trombosis venosa profunda', badge:'red', tag:'TVP', max:8, items:[
  {t:'chk', l:'Cáncer activo (tratamiento actual, en los 6 meses previos, o paliativo)', p:1},
  {t:'chk', l:'Parálisis, paresia o inmovilización con escayola de una extremidad inferior', p:1},
  {t:'chk', l:'Encamado >3 días o cirugía mayor en las últimas 4 semanas', p:1},
  {t:'chk', l:'Dolor localizado en el trayecto del sistema venoso profundo', p:1},
  {t:'chk', l:'Edema de toda la pierna', p:1},
  {t:'chk', l:'Edema de pantorrilla >3 cm respecto a la pierna asintomática (10 cm bajo tuberosidad tibial)', p:1},
  {t:'chk', l:'Edema con fóvea limitado a la pierna sintomática', p:1},
  {t:'chk', l:'Venas colaterales superficiales no varicosas', p:1},
  {t:'chk', l:'Diagnóstico alternativo al menos tan probable como TVP', p:-2}],
  info:'Versión original de 1997 (3 categorías). La versión modificada de 2003 añade «TVP previa documentada» (+1) y clasifica en TVP probable (≥2) o improbable (&lt;2).',
  interp:function(s){return s<=0?['low',s+' pts','Probabilidad baja (prevalencia de TVP 3 % en el original) — dímero-D; si negativo, descarta TVP']:s<=2?['mid',s+' pts','Probabilidad moderada (17 %) — dímero-D + ecografía si positivo']:['high',s+' pts','Probabilidad alta (75 %) — ecografía Doppler venosa directa']}},

{id:'tep-ped', src:'Dieckmann RA, Brownstein D, Gausche-Hill M. Pediatr Emerg Care 2010;26(4):312-5 (AAP) · Protocolos SEUP · Pediatría Integral (obstrucción respiratoria)', title:'Triángulo de Evaluación Pediátrica (TEP)', sub:'Impresión inicial visual y auditiva en 30–60 s, sin tocar al niño: dónde está el problema y cuán grave es', badge:'red', tag:'Pediatría', max:3, copyDatos:true,
  // Cada lado alterado suma un bit distinto (1/2/4): el código 0–7 identifica la combinación
  numTxt:function(s){return ((s&1)+(s>>1&1)+(s>>2&1))+'/3'},
  items:[
  {t:'sel', btn:true, l:'Apariencia — <b>TICLS</b>: Tono, Interacción, Consolabilidad, Mirada (Look), Lenguaje/llanto (Speech). Alterada: hipotonía, poco reactivo, inconsolable, mirada perdida, llanto débil o lenguaje incomprensible', o:[['Normal',0],['Alterada',1]]},
  {t:'sel', btn:true, l:'Respiración (trabajo respiratorio) — ruidos anormales (estridor, quejido, sibilancias, ronquido), tiraje, aleteo nasal, cabeceo, postura anómala (trípode, olfateo), taquipnea o bradipnea visibles', o:[['Normal',0],['Alterada',2]]},
  {t:'sel', btn:true, l:'Circulación cutánea — palidez, piel moteada (cutis marmorata), cianosis', o:[['Normal',0],['Alterada',4]]}],
  info:'Lados alterados → <b>paciente inestable</b>: actuar antes de completar el diagnóstico (ABCDE, O₂ al 100 %, monitorizar) y derivar a urgencias hospitalarias desde Atención Primaria. En obstrucción de la vía aérea, mientras llega el traslado: abrir la vía aérea, aspirar secreciones, ventilar con mascarilla y bolsa si es preciso, posición semiincorporada, O₂ al 100 % y tratamiento de la causa. El TEP no sustituye a la evaluación ABCDE ni a las constantes: las orienta.',
  interp:function(s){return [
    ['low','Estable','TEP normal — completar ABCDE, constantes e historia'],
    ['mid','Disfunción del Sistema Nervioso Central (SNC)','Solo apariencia: valorar hipoglucemia, intoxicación, postcrítico, infección del SNC, TCE; glucemia capilar'],
    ['mid','Dificultad respiratoria','Solo respiración: O₂ si precisa, posición cómoda, tratamiento según causa; reevaluar'],
    ['high','Fallo respiratorio','Apariencia + respiración: O₂ al 100 %, abrir y aspirar vía aérea, ventilar con bolsa y mascarilla si es preciso; traslado urgente'],
    ['mid','Shock compensado','Solo circulación: acceso vascular (IV/IO), monitorizar, valorar líquidos; reevaluar'],
    ['high','Shock descompensado','Apariencia + circulación: O₂ al 100 %, acceso IV/IO, bolo de líquidos, monitorizar; traslado urgente'],
    ['high','Fallo respiratorio (o compromiso cardiopulmonar grave en transición)','Respiración + circulación con apariencia normal: O₂ al 100 %, abrir y aspirar vía aérea, ventilar con bolsa y mascarilla si es preciso, acceso IV/IO y monitorizar; reevaluar a menudo (puede evolucionar a fallo cardiopulmonar); traslado urgente'],
    ['high','Fallo cardiopulmonar (riesgo inminente de paro)','Los tres lados: soporte vital inmediato (vía aérea, ventilación, acceso IV/IO); valorar PCR (ver pestaña PCR, EPALS)']
  ][s]}},

{id:'gcsped', src:'James HE 1986 · Pediatr Ann · PMID 3951884 · uso en menores de 2 años: Borgialli DA 2016 (PECARN) · Acad Emerg Med · PMID 27197686', title:'Glasgow pediátrico', sub:'Nivel de conciencia en lactantes y niños preverbales (3–15)', badge:'red', tag:'Neuro', max:15, items:[
  {t:'sel', l:'Apertura ocular', o:[['Espontánea (4)',4],['Al habla/sonido (3)',3],['Al dolor (2)',2],['Ausente (1)',1]]},
  {t:'sel', l:'Respuesta verbal', o:[['Arrulla, balbucea (5)',5],['Llanto irritable (4)',4],['Llora al dolor (3)',3],['Gime/quejido al dolor (2)',2],['Ausente (1)',1]]},
  {t:'sel', l:'Respuesta motora', o:[['Movimientos espontáneos y con propósito (6)',6],['Retirada al tacto (5)',5],['Retirada al dolor (4)',4],['Flexión anormal al dolor — decorticación (3)',3],['Extensión anormal al dolor — descerebración (2)',2],['Ausente (1)',1]]}],
  info:'Cortes de gravedad: aquí leve = 14–15 y moderado = 9–13 (criterio de guías pediátricas de TCE en urgencias, p. ej. SIMEUP 2018 · PMID 29334996); la clasificación clásica sitúa el 13 en leve (13–15 / 9–12 / ≤8).',
  interp:function(s){return s>=14?['low',s+'/15','TCE leve']:s>=9?['mid',s+'/15','TCE moderado — TC craneal + observación']:['high',s+'/15','TCE grave — asegurar vía aérea si ≤8']}},

{id:'cfs', src:'Rockwood K 2005 · CMAJ · PMID 16129869 (versión original de 7 niveles) · versión 2.0 de 9 niveles: Rockwood K, Theou O 2020 · Can Geriatr J · PMID 32904824', title:'Clinical Frailty Scale (Rockwood)', sub:'Fragilidad clínica global (1–9) — situación basal', badge:'blue', tag:'Geriatría', max:9, items:[
  {t:'sel', l:'Grado', o:[
    ['1 — Muy en forma: robusto, activo, enérgico y motivado; hace ejercicio con regularidad',1],
    ['2 — En forma: sin síntomas de enfermedad activa, pero menos en forma que el nivel 1; ejercicio o actividad intensa ocasional (p. ej., por temporadas)',2],
    ['3 — Se maneja bien: problemas médicos bien controlados, aunque con síntomas ocasionales; no hace actividad regular más allá de caminar',3],
    ['4 — Fragilidad muy leve (antes «vulnerable»): no depende de otros a diario, pero los síntomas limitan la actividad; «enlentecido» o cansado durante el día',4],
    ['5 — Fragilidad leve: enlentecimiento evidente; necesita ayuda en AIVD exigentes (finanzas, transporte, tareas domésticas pesadas)',5],
    ['6 — Fragilidad moderada: necesita ayuda en todas las actividades fuera de casa y en las tareas domésticas; problemas con escaleras, ayuda para el baño; puede necesitar mínima ayuda para vestirse',6],
    ['7 — Fragilidad grave: totalmente dependiente para el cuidado personal (por causa física o cognitiva), pero estable y sin alto riesgo de morir en ~6 meses',7],
    ['8 — Fragilidad muy grave: totalmente dependiente y acercándose al final de la vida; no suele recuperarse ni de una enfermedad menor',8],
    ['9 — Enfermedad terminal: esperanza de vida &lt;6 meses, sin otra evidencia de fragilidad grave',9]]}],
  info:'Puntúa la situación basal (≈2 semanas antes del proceso agudo), no la del momento de la urgencia, salvo el nivel 9. Poco validada en menores de 65 años y en discapacidades estables de un solo órgano (Rockwood 2020).',
  interp:function(s){return s<=3?['low','CFS '+s,'No frágil — pronóstico funcional favorable']:s===4?['mid','CFS 4','Fragilidad muy leve (antes «vulnerable») — vigilar cambios funcionales']:s<=6?['mid','CFS '+s,'Fragilidad leve-moderada — alto riesgo de delirium, caídas e ingreso prolongado; valorar VIG']:['high','CFS '+s,'Fragilidad grave o final de la vida — revisar objetivos terapéuticos']}},

{id:'fragilvig', src:'Amblàs-Novellas J 2018 · BMC Geriatr · PMID 29373968 (tabla 1: 22 preguntas, 25 déficits) · grados de fragilidad: Amblàs-Novellas J 2021 · BMJ Open · PMID 33883149', title:'Índex Fràgil-VIG', sub:'Fragilidad por acumulación de déficits (22 preguntas, 25 déficits) — situación basal', badge:'blue', tag:'Geriatría', max:1, agg:'custom', items:[
  {t:'sel', btn:true, l:'AIVD · Dinero: necesita ayuda para gestionar asuntos económicos (banco, tiendas, restaurantes)', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', btn:true, l:'AIVD · Teléfono: necesita ayuda para usar el teléfono', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', btn:true, l:'AIVD · Medicación: necesita ayuda para preparar o tomar la medicación', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', l:'ABVD · Índice de Barthel basal', o:[['≥95: sin dependencia (0)',0],['90–65: dependencia leve-moderada (1)',1],['60–25: dependencia moderada-grave (2)',2],['≤20: dependencia absoluta (3)',3]]},
  {t:'sel', btn:true, l:'Nutricional · Malnutrición: pérdida de peso ≥5 % en los últimos 6 meses', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', l:'Cognitivo · Grado de deterioro', o:[['Sin deterioro cognitivo (0)',0],['Leve-moderado, equivalente a GDS ≤5 (1)',1],['Grave-muy grave, equivalente a GDS ≥6 (2)',2]]},
  {t:'sel', btn:true, l:'Emocional · Síndrome depresivo: necesita antidepresivos', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', btn:true, l:'Emocional · Insomnio/ansiedad: necesita con frecuencia benzodiacepinas u otros psicofármacos sedantes', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', btn:true, l:'Social · Los profesionales perciben vulnerabilidad social', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', btn:true, l:'Síndrome geriátrico · Delirium y/o trastorno de conducta que ha necesitado antipsicóticos en los últimos 6 meses', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', btn:true, l:'Síndrome geriátrico · Caídas: ≥2 caídas o ingreso por caída en los últimos 6 meses', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', btn:true, l:'Síndrome geriátrico · Úlcera (por presión o vascular, cualquier grado)', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', btn:true, l:'Síndrome geriátrico · Polifarmacia: ≥5 fármacos', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', btn:true, l:'Síndrome geriátrico · Disfagia o infecciones respiratorias por aspiración en los últimos 6 meses', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', btn:true, l:'Síntoma grave · Dolor: necesita ≥2 analgésicos convencionales y/o opioides mayores', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', btn:true, l:'Síntoma grave · Disnea basal que impide salir de casa y/o opioides frecuentes', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', l:'Enfermedad · Cáncer activo', o:[['No (0)',0],['Sí (1)',1],['Sí, avanzada por criterios NECPAL (2)',2]]},
  {t:'sel', l:'Enfermedad · Respiratoria crónica (EPOC, restrictiva…)', o:[['No (0)',0],['Sí (1)',1],['Sí, avanzada por criterios NECPAL (2)',2]]},
  {t:'sel', l:'Enfermedad · Cardiaca crónica (insuficiencia cardiaca, cardiopatía isquémica, arritmia)', o:[['No (0)',0],['Sí (1)',1],['Sí, avanzada por criterios NECPAL (2)',2]]},
  {t:'sel', l:'Enfermedad · Neurodegenerativa (Parkinson, ELA…) o ictus previo', o:[['No (0)',0],['Sí (1)',1],['Sí, avanzada por criterios NECPAL (2)',2]]},
  {t:'sel', l:'Enfermedad · Digestiva crónica (hepatopatía, cirrosis, pancreatitis crónica, EII…)', o:[['No (0)',0],['Sí (1)',1],['Sí, avanzada por criterios NECPAL (2)',2]]},
  {t:'sel', l:'Enfermedad · Insuficiencia renal crónica (FG &lt;60)', o:[['No (0)',0],['Sí (1)',1],['Sí, avanzada por criterios NECPAL (2)',2]]}],
  info:'Puntúa la situación basal (≥1 mes antes del ingreso o del proceso agudo), por entrevista con el paciente o la familia y revisión de la historia. Índice = déficits / 25. Cada enfermedad suma 2 si cumple criterios de enfermedad crónica avanzada NECPAL; el artículo no aclara qué pasa si así se superan los 25 (aquí se limita a 1). La pestaña «Geriatría» lo calcula junto con el informe de situación basal.',
  numTxt:function(s){return s.toFixed(2).replace('.',',')},
  calcCustom:function(vals){return Math.min(1, Math.round(vals.reduce(function(a,b){return a+b},0)/25*100)/100)},
  interp:function(s){var t=s.toFixed(2).replace('.',',');return s<0.2?['low','Índice '+t,'&lt;0,20 — sin fragilidad']:s<=0.35?['mid','Índice '+t,'0,20–0,35 — fragilidad inicial']:s<=0.5?['high','Índice '+t,'0,36–0,50 — fragilidad moderada']:['high','Índice '+t,'&gt;0,50 — fragilidad avanzada']}},

{id:'nyha', src:'New York Heart Association · Nomenclature and Criteria for Diagnosis, 9.ª ed. 1994', title:'NYHA', sub:'Insuficiencia cardiaca — clase funcional (I–IV)', badge:'blue', tag:'IC', max:4, items:[
  {t:'sel', l:'Clase funcional', o:[['I — Sin limitación de la actividad física (1)',1],['II — Limitación leve; síntomas con actividad ordinaria (2)',2],['III — Limitación marcada; síntomas con actividad menor que la ordinaria (3)',3],['IV — Síntomas en reposo o con cualquier actividad (4)',4]]}],
  interp:function(s){var d={1:['low','NYHA I','Sin limitación de la actividad física'],2:['low','NYHA II','Limitación leve — síntomas con actividad ordinaria'],3:['mid','NYHA III','Limitación marcada — síntomas con actividad menor que la ordinaria'],4:['high','NYHA IV','Síntomas en reposo — optimizar tratamiento y valorar ingreso']};return d[s]}},

{id:'alvarado', src:'Alvarado A 1986 · Ann Emerg Med · PMID 3963537 · validación y estratos de riesgo: Ohle R 2011 · BMC Med · PMID 22204638', title:'Alvarado', sub:'Apendicitis aguda — probabilidad clínica', badge:'amber', tag:'Abdomen agudo', max:10, items:[
  {t:'chk', l:'Migración del dolor a fosa ilíaca derecha', p:1},
  {t:'chk', l:'Anorexia (o acetonuria)', p:1},
  {t:'chk', l:'Náuseas o vómitos', p:1},
  {t:'chk', l:'Dolor a la palpación en fosa ilíaca derecha', p:2},
  {t:'chk', l:'Signo de rebote (Blumberg)', p:1},
  {t:'chk', l:'Febrícula (≥37,3 °C)', p:1},
  {t:'chk', l:'Leucocitosis (>10.000/µL)', p:2},
  {t:'chk', l:'Desviación izquierda (neutrofilia >75%)', p:1}],
  info:'Ohle 2011 (42 estudios): un corte de 5 descarta bien (sensibilidad 99 %); el corte de 7 para indicar cirugía es poco específico (81 %). Sobreestima la probabilidad en mujeres y en niños.',
  interp:function(s){return s<=4?['low',s+' pts','Baja probabilidad — considerar otras causas']:s<=6?['mid',s+' pts','Probabilidad intermedia — observación y pruebas de imagen (eco/TC)']:['high',s+' pts','Alta probabilidad — valorar cirugía']}},

{id:'centor', src:'Centor RM 1981 · Med Decis Making · PMID 6763125 · modificación por edad: McIsaac WJ 1998 · CMAJ · PMID 9475915', title:'Centor (modificado)', sub:'Faringoamigdalitis — probabilidad de infección estreptocócica', badge:'blue', tag:'Infección', max:5, items:[
  {t:'chk', l:'Fiebre >38 °C', p:1},
  {t:'chk', l:'Ausencia de tos', p:1},
  {t:'chk', l:'Adenopatía cervical anterior dolorosa', p:1},
  {t:'chk', l:'Exudado o hipertrofia amigdalar', p:1},
  {t:'sel', l:'Edad', o:[['3–14 años (+1)',1],['15–44 años (0)',0],['≥45 años (−1)',-1]]}],
  interp:function(s){return s<=1?['low',s+' pts','Riesgo bajo (~1–10%) — no antibiótico ni cultivo']:s<=3?['mid',s+' pts','Riesgo intermedio (~11–35%) — test rápido de estreptococo; antibiótico si positivo']:['high',s+' pts','Riesgo alto (~51–53%) — considerar antibiótico empírico o test rápido']}},

{id:'apgar', src:'Apgar V 1953 · Curr Res Anesth Analg · PMID 13083014 · interpretación: AAP/ACOG 2015 «The Apgar Score» · Pediatrics · PMID 26416932', title:'APGAR', sub:'Neonato — adaptación a la vida extrauterina (1 y 5 min)', badge:'blue', tag:'Neonatología', max:10, items:[
  {t:'sel', l:'Frecuencia cardiaca', o:[['Ausente (0)',0],['<100 lpm (1)',1],['≥100 lpm (2)',2]]},
  {t:'sel', l:'Esfuerzo respiratorio', o:[['Ausente (0)',0],['Lento/irregular, llanto débil (1)',1],['Bueno, llanto vigoroso (2)',2]]},
  {t:'sel', l:'Tono muscular', o:[['Flácido (0)',0],['Alguna flexión de extremidades (1)',1],['Movimiento activo (2)',2]]},
  {t:'sel', l:'Irritabilidad refleja', o:[['Sin respuesta (0)',0],['Muecas (1)',1],['Tos, estornudo o llanto vigoroso (2)',2]]},
  {t:'sel', l:'Color', o:[['Cianosis o palidez central (0)',0],['Cuerpo rosado, extremidades cianóticas (1)',1],['Totalmente rosado (2)',2]]}],
  info:'El Apgar NO decide si iniciar la reanimación ni qué pasos dar: la reanimación empieza antes del minuto 1 (algoritmo de reanimación neonatal). Se registra a los 1 y 5 min; si a los 5 min es &lt;7, repetir cada 5 min hasta los 20 min. Aislado no diagnostica asfixia ni predice el pronóstico neurológico individual.',
  interp:function(s){return s>=7?['low',s+'/10','Tranquilizador (7–10)']:s>=4?['mid',s+'/10','Moderadamente anormal (4–6) — si es a los 5 min, repetir cada 5 min hasta los 20 min']:['high',s+'/10','Bajo (0–3) — si es a los 5 min, repetir cada 5 min hasta los 20 min; la reanimación se guía por FC y respiración, no por el Apgar']}},

{id:'flacc', src:'Merkel 1997 · Pediatr Nurs · PMID 9220806', title:'FLACC', sub:'Dolor pediátrico 2 meses–7 años (no verbal)', badge:'blue', tag:'Dolor pediátrico', max:10, items:[
  {t:'sel', l:'Cara', o:[['Sin expresión particular o sonrisa (0)',0],['Muecas o ceño fruncido ocasional, retraído (1)',1],['Temblor de mentón frecuente, mandíbula apretada (2)',2]]},
  {t:'sel', l:'Piernas', o:[['Posición normal o relajadas (0)',0],['Inquietas, tensas (1)',1],['Pataleo o piernas encogidas (2)',2]]},
  {t:'sel', l:'Actividad', o:[['Quieto, se mueve con normalidad (0)',0],['Se retuerce, cambia de posición (1)',1],['Arqueado, rígido o con sacudidas (2)',2]]},
  {t:'sel', l:'Llanto', o:[['Sin llanto (0)',0],['Quejidos o lloriqueos ocasionales (1)',1],['Llanto constante, gritos o sollozos (2)',2]]},
  {t:'sel', l:'Consolabilidad', o:[['Contento y relajado (0)',0],['Se tranquiliza con contacto o distracción (1)',1],['Difícil de consolar (2)',2]]}],
  interp:function(s){return s===0?['low','0/10','Sin dolor']:s<=3?['low',s+'/10','Dolor leve']:s<=6?['mid',s+'/10','Dolor moderado — analgesia']:['high',s+'/10','Dolor severo — analgesia urgente']}},

{id:'westley', src:'Westley CR 1978 · Am J Dis Child · PMID 347921 · cortes de gravedad variables entre ensayos (Cochrane: Gates A 2018 · PMID 30133690) · clasificación SEUP (algoritmo de laringitis aguda)', title:'Westley', sub:'Crup / laringotraqueítis — gravedad', badge:'amber', tag:'Pediatría', max:17, items:[
  {t:'sel', l:'Estridor', o:[['Ausente (0)',0],['Con agitación (1)',1],['En reposo (2)',2]]},
  {t:'sel', l:'Tiraje', o:[['Ausente (0)',0],['Leve (1)',1],['Moderado (2)',2],['Grave (3)',3]]},
  {t:'sel', l:'Entrada de aire', o:[['Normal (0)',0],['Disminuida (1)',1],['Muy disminuida (2)',2]]},
  {t:'sel', l:'Cianosis', o:[['Ausente (0)',0],['Con agitación (4)',4],['En reposo (5)',5]]},
  {t:'sel', l:'Nivel de conciencia', o:[['Normal (0)',0],['Desorientado / alterado (5)',5]]}],
  info:'Westley 1978 no define categorías de gravedad. En los ensayos, leve suele ser ≤2 y el umbral de «grave» varía (&gt;5, &gt;6 o ≥8); ≥12 se usa como fallo respiratorio inminente.',
  interp:function(s){var seup=' · SEUP: '+(s<=3?'leve (≤3)':s<=5?'moderada (4–5)':'grave (≥6)');return s<=2?['low',s+' pts','Leve — dexametasona oral, alta con normas'+seup]:s<=7?['mid',s+' pts','Moderado — dexametasona + observación estrecha'+seup]:s<=11?['high',s+' pts','Grave — adrenalina nebulizada + dexametasona, preparar vía aérea'+seup]:['high',s+' pts','Fallo respiratorio inminente — manejo avanzado de la vía aérea'+seup]}},

{id:'painad', src:'Warden V 2003 · J Am Med Dir Assoc · PMID 12807591', title:'PAINAD', sub:'Dolor en demencia avanzada (no verbal)', badge:'blue', tag:'Dolor geriátrico', max:10, items:[
  {t:'sel', l:'Respiración (independiente de la vocalización)', o:[['Normal (0)',0],['Respiración dificultosa ocasional / hiperventilación breve (1)',1],['Respiración ruidosa y dificultosa / hiperventilación prolongada / Cheyne-Stokes (2)',2]]},
  {t:'sel', l:'Vocalización negativa', o:[['Ninguna (0)',0],['Gemido o quejido ocasional; habla en tono bajo, negativo o de desaprobación (1)',1],['Llamadas angustiadas repetidas; gemidos o quejidos fuertes; llanto (2)',2]]},
  {t:'sel', l:'Expresión facial', o:[['Sonriente o inexpresivo (0)',0],['Triste, atemorizado, ceño fruncido (1)',1],['Muecas de dolor (2)',2]]},
  {t:'sel', l:'Lenguaje corporal', o:[['Relajado (0)',0],['Tenso, angustiado, deambula o se mueve inquieto (1)',1],['Rígido, puños cerrados, rodillas flexionadas, se aleja o empuja, golpea (2)',2]]},
  {t:'sel', l:'Consolabilidad', o:[['No necesita ser consolado (0)',0],['Se distrae o tranquiliza con la voz o el tacto (1)',1],['Imposible de consolar, distraer o tranquilizar (2)',2]]}],
  info:'Warden 2003 validó la escala 0–10 pero no definió categorías; los cortes 1–3 / 4–6 / 7–10 son de uso clínico habitual.',
  interp:function(s){return s===0?['low','0/10','Sin dolor evidente']:s<=3?['low',s+'/10','Dolor leve']:s<=6?['mid',s+'/10','Dolor moderado — analgesia']:['high',s+'/10','Dolor severo — analgesia urgente']}},

{id:'3dplus', src:'García-Pérez D 2023 · J Clin Med · PMID 37892606 (figuras 1 y 2) · original: García-Pérez D 2022 · Rev Esp Geriatr Gerontol · PMID 35781176', title:'3D / 3D+', sub:'Valoración geriátrica rápida en urgencias (≥75 años): fragilidad basal (3D) + impacto agudo (3D+) → destino al alta', badge:'blue', tag:'Geriatría', max:3, agg:'custom', items:[
  {t:'sel', l:'3D · Deambulación / ABVD hace 2 semanas', o:[['3D 0 — Hace ejercicio diario o semanal; no necesita ayuda en las ABVD',0],['3D 1 — No hace ejercicio, sale solo cada día; supervisión ocasional en alguna ABVD',1],['3D 2 — Sedentario; no puede salir solo a la calle; necesita ayuda en alguna ABVD',2],['3D 3 — Sillón o cama; totalmente dependiente para las ABVD',3]]},
  {t:'sel', l:'3D · Demencia / deterioro cognitivo hace 2 semanas', o:[['3D 0 — Sin problemas o solo olvidos que percibe él mismo (≈GDS 1–2)',0],['3D 1 — La familia nota errores ocasionales que él no percibe (≈GDS 3): leve',1],['3D 2 — Supervisión para vestirse; no se le puede dejar solo (≈GDS 4–5): moderado',2],['3D 3 — Necesita cuidador 24 h (≈GDS ≥6): grave-muy grave',3]]},
  {t:'sel', l:'3D · Domicilio: ¿con quién vive?', o:[['Vive solo en su domicilio',0],['Vive acompañado en su domicilio (familia/cuidador)',0],['Vive en residencia',0]]},
  {t:'sel', l:'3D+ · Declive: ¿ha necesitado más ayuda de lo habitual para las ABVD/AIVD en las últimas semanas?', o:[['No',0],['Sí, agudo (últimos 15 días)',1],['Sí, progresivo (semanas/meses)',2]]},
  {t:'sel', l:'3D+ · Delirium: ¿ha cambiado su estado cognitivo respecto al basal?', o:[['No',0],['Sí, hiperactivo',1],['Sí, hipoactivo',2]]},
  {t:'sel', btn:true, l:'3D+ · Domicilio: ¿sería arriesgado hacer el tratamiento en casa 24/7?', o:[['No',0],['Sí',1]]},
  {t:'sel', btn:true, l:'3D+ · Fármacos: ¿el inicio o la retirada de un fármaco puede haber desencadenado la consulta?', o:[['No',0],['Sí',1]]},
  {t:'sel', btn:true, l:'Destino · ¿Hay motivo clínico de ingreso?', o:[['No',0],['Sí',1]]},
  {t:'sel', btn:true, l:'Destino · ¿Diagnóstico completado en urgencias?', o:[['Sí',0],['No',1]]}],
  /* s = nivel 3D ×1000 + 3D+ alterado ×100 + ingreso ×10 + diagnóstico pendiente */
  calcCustom:function(v){return Math.max(v[0],v[1])*1000+((v[3]+v[4]+v[5]+v[6])>0?100:0)+v[7]*10+v[8]},
  numTxt:function(s){return '3D '+Math.floor(s/1000)+(Math.floor(s/100)%10?' · 3D+':'')},
  interp:function(s){
    var n=Math.floor(s/1000), alt=Math.floor(s/100)%10===1, ing=Math.floor(s/10)%10===1, pend=s%10===1;
    var fr=['sin fragilidad (respuesta al tratamiento como un adulto sano)','fragilidad leve (alta probabilidad de respuesta óptima)','fragilidad moderada (probable respuesta intermedia)','fragilidad avanzada (probable respuesta escasa o nula)'][n];
    var dest;
    if(!ing) dest=alt?'sin motivo de ingreso pero 3D+ alterado: <b>intervención específica</b> sobre la dimensión alterada (si no se resuelve en urgencias, Unidad de Transición) e informar a Atención Primaria':'<b>domicilio o residencia</b>';
    else if(pend) dest=n===3?'<b>hospital de atención intermedia</b>':'<b>hospital de agudos</b>';
    else dest=[alt?'Unidad de Transición':'Unidad de Transición u hospitalización a domicilio',alt?'hospital de agudos':'Unidad de Transición u hospitalización a domicilio',alt?'hospital de atención intermedia':'Unidad de Transición u hospitalización a domicilio',alt?'hospital de atención intermedia':'hospitalización a domicilio u hospital de atención intermedia'][n];
    if(ing&&!pend) dest='<b>'+dest+'</b>';
    return [n===0&&!alt?'low':n>=2||alt?'high':'mid','3D '+n+(alt?' · 3D+ alterado':' · 3D+ sin alteración'),'3D '+n+': '+fr+'. Destino orientativo (fig. 2): '+dest+'.'];
  },
  info:'<b>3D</b> (situación de hace 2 semanas, aún compensado): el nivel es el <b>más alto</b> entre deambulación/ABVD y deterioro cognitivo (3D 0 sin fragilidad · 1 leve · 2 moderada · 3 avanzada); el domicilio no cambia el nivel. <b>3D+</b> (situación actual): alterado si alguna de las 4 preguntas es «sí»; el «+» recuerda preguntar por fármacos. El destino es orientativo y no sustituye el juicio clínico.'},
{id:'paquetes-año', src:'Definición estándar de consumo acumulado de tabaco · umbral de cribado USPSTF 2021 (≥20 paq-año) · PMID 33687470', title:'Índice paquetes-año', sub:'Tabaquismo acumulado — riesgo de EPOC y cáncer de pulmón', badge:'amber', tag:'Respiratorio', max:100, agg:'custom', items:[
  {t:'num', l:'Cigarrillos fumados al día', u:'cig/día', f:function(v){return 0}},
  {t:'num', l:'Años fumando', u:'años', f:function(v){return 0}}],
  calcCustom:function(vals){return Math.round((vals[0]/20)*vals[1]*10)/10},
  interp:function(s){return s<10?['low',s+' paq-año','Riesgo bajo']:s<=20?['mid',s+' paq-año','Riesgo moderado']:['high',s+' paq-año','Riesgo alto — criterio habitual para iniciar cribado/revisión preventiva (EPOC, cáncer de pulmón)']}},

{id:'ube', src:'Rodríguez-Martos A 1999 · Med Clin (Barc) · PMID 10320957 (1 UBE ≈ 10 g en España) · límites de bajo riesgo: Sordo L 2020 · Rev Esp Salud Publica · PMID 33185196 — densidad del etanol 0,8 g/mL', title:'Unidades de Bebida Estándar (UBE)', sub:'Gramos de alcohol y UBEs a partir de volumen y graduación', badge:'blue', tag:'Tóxicos', max:10, agg:'custom', items:[
  {t:'num', l:'Volumen (mL)', u:'mL', f:function(v){return 0}},
  {t:'num', l:'Graduación (%)', u:'%', f:function(v){return 0}}],
  calcCustom:function(vals){return Math.round(((vals[0] * vals[1] * 0.8) / 100 / 10) * 100) / 100},
  interp:function(s){return ['low', s + ' UBE', _fmt(s * 10, 1) + ' g de alcohol']},
  info: '<strong>Tabla de equivalencias rápidas</strong> (1 UBE = 10 g)<table><tr><th>Bebida</th><th>Volumen</th><th>Graduación</th><th>UBEs</th><th>Gramos</th></tr>' +
    '<tr><td>Cerveza (caña/quinto)</td><td>200 mL</td><td>5%</td><td>≈1 (0,8)</td><td>8 g</td></tr>' +
    '<tr><td>Vino / cava (1 copa)</td><td>100 mL</td><td>12–13%</td><td>1</td><td>10 g</td></tr>' +
    '<tr><td>Chupito / carajillo</td><td>25 mL</td><td>40%</td><td>≈1 (0,8)</td><td>8 g</td></tr>' +
    '<tr><td>Cerveza (tercio/lata)</td><td>330 mL</td><td>5%</td><td>1,3</td><td>13,2 g</td></tr>' +
    '<tr><td>Combinado/cubata o copa de licor</td><td>50 mL</td><td>40%</td><td>1,6</td><td>16 g</td></tr>' +
    '<tr><td>Combinado servido en bar (mediana real)</td><td>≈60 mL</td><td>40%</td><td>≈2</td><td>≈20 g</td></tr></table>'},

// ── TEP: exclusión sin imagen (contrastado con Vera Health 2026-10) ─────
{id:'perc', src:'Kline 2004, J Thromb Haemost · PMID 15304025', title:'PERC', sub:'TEP — exclusión sin dímero D en probabilidad clínica baja', badge:'red', tag:'TEP', max:8, items:[
  {t:'chk', l:'Edad ≥50 años', p:1},
  {t:'chk', l:'FC ≥100 lpm', p:1},
  {t:'chk', l:'SatO₂ <95% respirando aire ambiente', p:1},
  {t:'chk', l:'Hemoptisis', p:1},
  {t:'chk', l:'Uso de estrógenos (anticonceptivos, THS)', p:1},
  {t:'chk', l:'TVP o TEP previa', p:1},
  {t:'chk', l:'Edema unilateral de pierna', p:1},
  {t:'chk', l:'Cirugía o traumatismo con ingreso en las 4 semanas previas', p:1}],
  info:'Aplicar SOLO si la probabilidad clínica es baja (gestalt <15%). No es una escala de riesgo: un criterio positivo no diagnostica TEP. No usar en embarazo ni en pediatría',
  interp:function(s){return s===0?['low','PERC negativo','Con probabilidad clínica baja: no pedir dímero D ni imagen']:['mid','PERC positivo ('+s+')','No permite excluir: seguir con probabilidad clínica + dímero D (YEARS o ajustado por edad)']}},

{id:'years', copyDatos:true, src:'van der Hulle 2017, Lancet (YEARS) · PMID 28549662', title:'YEARS', sub:'TEP — umbral de dímero D según criterios', badge:'red', tag:'TEP', max:3, agg:'custom', items:[
  {t:'sel', btn:true, l:'Signos clínicos de TVP', o:[['No',0],['Sí',1]]},
  {t:'sel', btn:true, l:'Hemoptisis', o:[['No',0],['Sí',1]]},
  {t:'sel', btn:true, l:'TEP es el diagnóstico más probable', o:[['No',0],['Sí',1]]},
  {t:'num', l:'Dímero D (ng/mL FEU) — opcional', u:'ng/mL', f:function(v){return 0}}],
  info:'Versión original: sin ajuste por edad. Dímero D en unidades FEU; un valor igual al umbral NO es negativo',
  calcCustom:function(v){var n=v[0]+v[1]+v[2]; this._y={thr: n===0?1000:500, dd:v[3]}; return n},
  interp:function(s){
    var y=this._y, base=s+' criterio'+(s===1?'':'s')+' → umbral <'+y.thr+' ng/mL FEU';
    if (!y.dd) return ['low',s+' criterio'+(s===1?'':'s'),'Dímero D <'+y.thr+' ng/mL FEU excluye TEP; si ≥'+y.thr+' → angio-TC'];
    return y.dd<y.thr ? ['low','TEP excluido',base+' · DD '+y.dd+' — no precisa angio-TC'] : ['high','Angio-TC',base+' · DD '+y.dd+' — no se puede excluir TEP'];
  }},

{id:'dd-edad', copyDatos:true, src:'Righini 2014, JAMA (ADJUST-PE) · PMID 24643601', title:'Dímero D ajustado por edad', sub:'TEP — umbral = edad × 10 ng/mL FEU en >50 años', badge:'red', tag:'TEP', max:1000, agg:'custom', items:[
  {t:'num', l:'Edad (años)', u:'años', f:function(v){return 0}},
  {t:'sel', btn:true, l:'Unidades del laboratorio', o:[['FEU',0],['DDU',1]]},
  {t:'num', l:'Dímero D medido (ng/mL) — opcional', u:'ng/mL', f:function(v){return 0}}],
  info:'Solo con probabilidad clínica NO alta (Wells ≤4 o Ginebra no alto). Con probabilidad alta, ir directamente a angio-TC. La adaptación a DDU (edad × 5) es una conversión de laboratorio, no procede de ADJUST-PE: confirmar con el laboratorio el tipo de ensayo',
  calcCustom:function(v){
    if (!v[0]) { this._dd=null; return 0; }
    var ddu=v[1]===1, thr=v[0]>50 ? v[0]*(ddu?5:10) : (ddu?250:500);
    this._dd={u:ddu?'DDU':'FEU', dd:v[2]}; return thr;
  },
  interp:function(s){
    var d=this._dd; if (!d) return ['low','—','Introducir la edad'];
    if (!d.dd) return ['low','Umbral <'+s+' ng/mL '+d.u,'Un dímero D por debajo de este valor excluye TEP si la probabilidad clínica no es alta'];
    return d.dd<s ? ['low','TEP excluido','DD '+d.dd+' < '+s+' ng/mL '+d.u+' — no precisa angio-TC'] : ['high','Angio-TC','DD '+d.dd+' ≥ '+s+' ng/mL '+d.u+' — no se puede excluir TEP'];
  }},

// ── Trauma: reglas de imagen ──────────────────────────────────────
{id:'cchr', src:'Stiell IG 2001 · Lancet · PMID 11356436 · limitaciones (antiagregación distinta de AAS): ACEP 2023, Valente · Ann Emerg Med · PMID 37085214', title:'Canadian CT Head Rule', sub:'TCE leve — ¿precisa TC craneal?', badge:'red', tag:'Trauma', max:52, items:[
  {t:'chk', l:'ALTO RIESGO — GCS <15 a las 2 h del traumatismo', p:10},
  {t:'chk', l:'ALTO RIESGO — Sospecha de fractura abierta o hundimiento craneal', p:10},
  {t:'chk', l:'ALTO RIESGO — Signos de fractura de base (hemotímpano, ojos de mapache, otorrea/rinorrea de LCR, signo de Battle)', p:10},
  {t:'chk', l:'ALTO RIESGO — ≥2 episodios de vómitos', p:10},
  {t:'chk', l:'ALTO RIESGO — Edad ≥65 años', p:10},
  {t:'chk', l:'RIESGO MEDIO — Amnesia de lo ocurrido antes del impacto >30 min', p:1},
  {t:'chk', l:'RIESGO MEDIO — Mecanismo peligroso: peatón atropellado, expulsado del vehículo o caída desde >3 pies (0,9 m) o 5 escalones', p:1}],
  info:'Aplicable solo a TCE cerrado en ≥16 años con GCS 13–15 y pérdida de conciencia, amnesia o desorientación presenciadas. Excluidos en el estudio original: &lt;16 años, sin historia clara de traumatismo como evento primario, fractura penetrante o hundimiento evidente, déficit focal agudo, constantes inestables, convulsión antes de la valoración, coagulopatía o anticoagulación oral, reconsulta por el mismo TCE, embarazo. ACEP 2023: no usar la regla para evitar la TC en antiagregados con fármacos distintos de AAS',
  interp:function(s){return s>=10?['high','Alto riesgo','Riesgo de intervención neuroquirúrgica → TC craneal']:s>=1?['mid','Riesgo medio','Riesgo de lesión cerebral en TC → TC craneal']:['low','Sin criterios','La regla no indica TC (solo si cumple inclusión y ninguna exclusión)']}},

{id:'ccspine', copyDatos:true, src:'Stiell 2001, JAMA · PMID 11597285', title:'Canadian C-Spine Rule', sub:'Trauma cervical — ¿precisa imagen? (paciente alerta y estable)', badge:'red', tag:'Trauma', max:1, agg:'custom', items:[
  {t:'sel', btn:true, l:'1. ¿Algún factor de ALTO riesgo? Edad ≥65 · mecanismo peligroso (caída ≥3 pies/5 escalones, carga axial, colisión a alta velocidad, vuelco o expulsión, vehículo recreativo motorizado, colisión en bicicleta) · parestesias en extremidades', o:[['No',0],['Sí',1]]},
  {t:'sel', btn:true, l:'2. ¿Algún factor de BAJO riesgo? Alcance trasero simple · sentado en urgencias · ha deambulado en algún momento · dolor cervical de inicio diferido · sin dolor en la línea media cervical', o:[['No',0],['Sí',1]]},
  {t:'sel', btn:true, l:'3. ¿Rota activamente el cuello 45° a izquierda Y derecha? (valorar solo si 1 = No y 2 = Sí)', o:[['No puede',0],['Sí',1]]}],
  info:'Solo para traumatismo cerrado con GCS 15 y paciente estable. No aplicable en exploración no fiable, déficit neurológico agudo o patología cervical previa relevante. "Alcance trasero simple" excluye empuje al tráfico, impacto por autobús/camión, vuelco o alta velocidad',
  calcCustom:function(v){this._cs=v[0]===1?'alto':v[1]!==1?'sinbajo':v[2]===1?'no':'rot'; return this._cs==='no'?0:1},
  interp:function(s){var c=this._cs; return c==='alto'?['high','Imagen','Factor de alto riesgo → imagen cervical (no explorar la movilidad)']:c==='sinbajo'?['high','Imagen','Sin factores de bajo riesgo → imagen cervical']:c==='rot'?['high','Imagen','No rota 45° a ambos lados → imagen cervical']:['low','Sin imagen','La regla permite no hacer imagen cervical']}},

// ── Digestivo ───────────────────────────────────────────────────
{id:'oakland', src:'Oakland K 2017 · Lancet Gastroenterol Hepatol · PMID 28651935 · guía: ESGE 2021, Triantafyllou · Endoscopy · PMID 34062566', title:'Oakland', sub:'Hemorragia digestiva baja — manejo ambulatorio seguro', badge:'amber', tag:'Digestivo', max:35, items:[
  {t:'sel', l:'Edad', o:[['<40 años (0)',0],['40–69 años (1)',1],['≥70 años (2)',2]]},
  {t:'sel', btn:true, l:'Sexo', o:[['Mujer (0)',0],['Hombre (1)',1]]},
  {t:'sel', btn:true, l:'Ingreso previo por HDB', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', btn:true, l:'Sangre en el tacto rectal', o:[['No (0)',0],['Sí (1)',1]]},
  {t:'sel', l:'Frecuencia cardíaca', o:[['<70 lpm (0)',0],['70–89 lpm (1)',1],['90–109 lpm (2)',2],['≥110 lpm (3)',3]]},
  {t:'sel', l:'PA sistólica', o:[['≥160 mmHg (0)',0],['130–159 mmHg (2)',2],['120–129 mmHg (3)',3],['90–119 mmHg (4)',4],['50–89 mmHg (5)',5]]},
  {t:'sel', l:'Hemoglobina', o:[['≥16,0 g/dL (0)',0],['13,0–15,9 g/dL (4)',4],['11,0–12,9 g/dL (8)',8],['9,0–10,9 g/dL (13)',13],['7,0–8,9 g/dL (17)',17],['3,6–6,9 g/dL (22)',22]]}],
  info:'No usar en sangrado persistente o inestabilidad. PAS <50 mmHg o Hb <3,6 g/dL quedan fuera de la escala. Alta segura = sin resangrado, transfusión, intervención terapéutica, reingreso a 28 días ni muerte',
  interp:function(s){return s<=8?['low',s+' pts','Riesgo bajo (≈95% de alta segura): considerar manejo ambulatorio si el sangrado se ha autolimitado, hay estabilidad clínica y no hay otros motivos de ingreso']:['mid',s+' pts','No cumple criterio de bajo riesgo — valorar ingreso']}},

// ── SCA ─────────────────────────────────────────────────────────
{id:'grace', src:'Granger CB 2003 · Arch Intern Med · PMID 14581255 (GRACE 1.0 intrahospitalario) · categorías ≤108/109–140/&gt;140: Hall 2018 · Eur Heart J · PMID 30202849 · invasiva &lt;24 h si &gt;140: ESC 2023, Byrne · Eur Heart J · PMID 37622654', title:'GRACE 1.0', sub:'SCASEST — mortalidad hospitalaria (no es GRACE 2.0 ni 3.0)', badge:'red', tag:'SCA', max:372, items:[
  {t:'sel', l:'Edad', o:[['<30 años (0)',0],['30–39 (8)',8],['40–49 (25)',25],['50–59 (41)',41],['60–69 (58)',58],['70–79 (75)',75],['80–89 (91)',91],['≥90 (100)',100]]},
  {t:'sel', l:'Frecuencia cardíaca', o:[['<50 lpm (0)',0],['50–69 (3)',3],['70–89 (9)',9],['90–109 (15)',15],['110–149 (24)',24],['150–199 (38)',38],['≥200 (46)',46]]},
  {t:'sel', l:'PA sistólica', o:[['≥200 mmHg (0)',0],['160–199 (10)',10],['140–159 (24)',24],['120–139 (34)',34],['100–119 (43)',43],['80–99 (53)',53],['<80 (58)',58]]},
  {t:'sel', l:'Creatinina', o:[['0–0,39 mg/dL (1)',1],['0,40–0,79 (4)',4],['0,80–1,19 (7)',7],['1,20–1,59 (10)',10],['1,60–1,99 (13)',13],['2,00–3,99 (21)',21],['≥4,0 (28)',28]]},
  {t:'sel', btn:true, l:'Killip', o:[['I (0)',0],['II (20)',20],['III (39)',39],['IV (59)',59]]},
  {t:'chk', l:'Parada cardíaca en la presentación inicial', p:39},
  {t:'chk', l:'Desviación del ST', p:28},
  {t:'chk', l:'Marcadores de necrosis miocárdica iniciales elevados', p:14}],
  info:'Cortes válidos para SCASEST. No mezclar con el modelo a 6 meses ni con GRACE 2.0/3.0 (modelos y desenlaces distintos)',
  interp:function(s){return s<=108?['low',s+' pts','Riesgo bajo (mortalidad hospitalaria <1%)']:s<=140?['mid',s+' pts','Riesgo intermedio (1–3%)']:['high',s+' pts','Riesgo alto (>3%) — ESC 2023: considerar estrategia invasiva precoz (<24 h) (clase IIa)']}},

// ── Síncope ─────────────────────────────────────────────────────
{id:'csrs', src:'Thiruganasambandamoorthy V 2016 · CMAJ · PMID 27378464 · validación y riesgos por categoría: Thiruganasambandamoorthy V 2020 · JAMA Intern Med · PMID 32202605', title:'Canadian Syncope Risk Score', sub:'Síncope — eventos graves a 30 días (tras la evaluación en urgencias)', badge:'red', tag:'Síncope', max:11, items:[
  {t:'sel', btn:true, l:'Predisposición vasovagal (calor, aglomeración, bipedestación prolongada, miedo, emoción, dolor)', o:[['No (0)',0],['Sí (−1)',-1]]},
  {t:'sel', btn:true, l:'Antecedente de cardiopatía', o:[['No (0)',0],['Sí (+1)',1]]},
  {t:'sel', btn:true, l:'Cualquier PAS <90 o >180 mmHg en urgencias', o:[['No (0)',0],['Sí (+2)',2]]},
  {t:'sel', btn:true, l:'Troponina > percentil 99', o:[['No (0)',0],['Sí (+2)',2]]},
  {t:'sel', btn:true, l:'Eje QRS anormal (<−30° o >100°)', o:[['No (0)',0],['Sí (+1)',1]]},
  {t:'sel', btn:true, l:'QRS >130 ms', o:[['No (0)',0],['Sí (+1)',1]]},
  {t:'sel', btn:true, l:'QTc >480 ms', o:[['No (0)',0],['Sí (+2)',2]]},
  {t:'sel', btn:true, l:'Diagnóstico en urgencias', o:[['Ninguno de los dos (0)',0],['Vasovagal (−2)',-2],['Cardíaco (+2)',2]]}],
  info:'Aplicar al final de la evaluación, cuando no se ha identificado ya una causa grave. Los valores iguales al umbral (QRS 130, QTc 480) no puntúan. Riesgo = eventos graves compuestos a 30 días (validación 2020), no mortalidad. Categorías: muy bajo −3 a −2 · bajo −1 a 0 · medio 1–3 · alto 4–5 · muy alto ≥6',
  interp:function(s){return s<=-2?['low',s+' pts','Riesgo muy bajo (0,3% a 30 días) — alta']:s<=0?['low',s+' pts','Riesgo bajo (0,7% a 30 días) — alta']:s<=3?['mid',s+' pts','Riesgo medio (8,0% a 30 días) — decisión compartida sobre el destino']:s<=5?['high',s+' pts','Riesgo alto (19,2% a 30 días) — considerar ingreso breve']:['high',s+' pts','Riesgo muy alto (51,3% a 30 días) — considerar ingreso breve']}},

// ── Backlog #9 (sesion 8, contrastado con Vera Health 2026-10) ──────────
{id:'addrs', copyDatos:true, src:'Rogers 2011, Circulation · PMID 21555704 · ADvISED: Nazerian 2018, Circulation · PMID 29030346', title:'ADD-RS + dímero D', sub:'Síndrome aórtico agudo — ¿angio-TC o dímero D?', badge:'red', tag:'Aorta', max:3, agg:'custom', items:[
  {t:'sel', btn:true, l:'Condición de alto riesgo: síndrome de Marfan, antecedente familiar de enfermedad aórtica, valvulopatía aórtica conocida, manipulación aórtica reciente, aneurisma de aorta torácica conocido', o:[['No',0],['Sí (+1)',1]]},
  {t:'sel', btn:true, l:'Dolor de alto riesgo (torácico, dorsal o abdominal): inicio brusco, intensidad grave o carácter desgarrante — basta uno', o:[['No',0],['Sí (+1)',1]]},
  {t:'sel', btn:true, l:'Exploración de alto riesgo: déficit de pulso o diferencia de PAS entre brazos, déficit neurológico focal con dolor, soplo nuevo de insuficiencia aórtica con dolor, hipotensión o shock', o:[['No',0],['Sí (+1)',1]]},
  {t:'num', l:'Dímero D (ng/mL FEU) — opcional', u:'ng/mL', f:function(v){return 0}}],
  info:'Un punto por CATEGORÍA positiva, no por hallazgo (0–3). Dímero D en FEU, sin ajuste por edad. La inestabilidad o una sospecha clínica alta mandan sobre un resultado bajo',
  calcCustom:function(v){var n=v[0]+v[1]+v[2]; this._ad={dd:v[3]}; return n},
  interp:function(s){
    var dd=this._ad.dd;
    if (s>=2) return ['high','ADD-RS '+s,'Imagen urgente (angio-TC) sin esperar al dímero D'];
    if (!dd) return ['mid','ADD-RS '+s,'Pedir dímero D: <500 ng/mL FEU permite considerar la exclusión sin imagen'];
    return dd<500 ? ['low','ADD-RS '+s+' + DD <500','Permite considerar la exclusión de síndrome aórtico agudo sin imagen en pacientes seleccionados (fallo 0,3% en ADvISED); no es certeza absoluta'] : ['high','Angio-TC','ADD-RS '+s+' con dímero D '+dd+' ≥500 ng/mL FEU — imagen'];
  }},

{id:'padua', src:'Barbar 2010, J Thromb Haemost · PMID 20738765', title:'Padua', sub:'Riesgo de ETV en el paciente médico ingresado', badge:'amber', tag:'TVP', max:20, items:[
  {t:'chk', l:'Cáncer activo (local o metastásico, o QT/RT en los 6 meses previos)', p:3},
  {t:'chk', l:'ETV previa (excluida la trombosis venosa superficial)', p:3},
  {t:'chk', l:'Movilidad reducida ≥3 días previstos (cama con permiso para ir al baño)', p:3},
  {t:'chk', l:'Trombofilia conocida', p:3},
  {t:'chk', l:'Traumatismo o cirugía en el último mes', p:2},
  {t:'chk', l:'Edad ≥70 años', p:1},
  {t:'chk', l:'Insuficiencia cardíaca o respiratoria', p:1},
  {t:'chk', l:'IAM o ictus isquémico agudo', p:1},
  {t:'chk', l:'Infección aguda o enfermedad reumatológica', p:1},
  {t:'chk', l:'Obesidad (IMC ≥30)', p:1},
  {t:'chk', l:'Tratamiento hormonal en curso', p:1}],
  info:'Para pacientes médicos ingresados, no para altas desde urgencias. Valorar a la vez el riesgo hemorrágico (IMPROVE Bleeding)',
  interp:function(s){return s>=4?['high',s+' pts','Alto riesgo de ETV — profilaxis si el riesgo hemorrágico lo permite']:['low',s+' pts','Bajo riesgo de ETV']}},

{id:'improve-vte', src:'Spyropoulos AC 2011 · Chest · PMID 21436241 (modelo asociativo de 7 variables) · umbral ≥2 y tasas: ASH 2018, Schünemann · Blood Adv · PMID 30482763', title:'IMPROVE VTE', sub:'Riesgo de ETV en el paciente médico ingresado', badge:'amber', tag:'TVP', max:12, items:[
  {t:'chk', l:'ETV previa', p:3},
  {t:'chk', l:'Trombofilia conocida', p:2},
  {t:'chk', l:'Parálisis actual de miembros inferiores', p:2},
  {t:'chk', l:'Cáncer actual', p:2},
  {t:'chk', l:'Inmovilización ≥7 días', p:1},
  {t:'chk', l:'Ingreso en UCI/UCC', p:1},
  {t:'chk', l:'Edad >60 años', p:1}],
  info:'No mezclar con IMPROVE modificado ni con IMPROVE-DD (incluye dímero D). La guía ASH 2018 considera riesgo aumentado desde ≥2',
  interp:function(s){return s>=4?['high',s+' pts','Riesgo alto de ETV (5,7% sintomática a 3 meses)']:s>=2?['mid',s+' pts','Riesgo moderado (1,5% a 3 meses) — aumentado según ASH 2018']:['low',s+' pts','Riesgo bajo (0,5% a 3 meses)']}},

{id:'improve-bleed', src:'Decousus H 2011 · Chest · PMID 20453069 · umbral ≥7 y tasas: ASH 2018, Schünemann · Blood Adv · PMID 30482763', title:'IMPROVE Bleeding', sub:'Riesgo hemorrágico en el paciente médico ingresado (14 días)', badge:'amber', tag:'TVP', max:30.5, items:[
  {t:'chk', l:'Úlcera gastroduodenal activa', p:4.5},
  {t:'chk', l:'Sangrado en los 3 meses previos al ingreso', p:4},
  {t:'chk', l:'Plaquetas <50.000/µL', p:4},
  {t:'sel', btn:true, l:'Edad', o:[['<40 (0)',0],['40–84 (1,5)',1.5],['≥85 (3,5)',3.5]]},
  {t:'chk', l:'Insuficiencia hepática (INR >1,5 no debido a anticoagulación)', p:2.5},
  {t:'sel', btn:true, l:'FG (mL/min/1,73 m²)', o:[['≥60 (0)',0],['30–59 (1)',1],['<30 (2,5)',2.5]]},
  {t:'chk', l:'Ingreso en UCI/UCC', p:2.5},
  {t:'chk', l:'Catéter venoso central', p:2},
  {t:'chk', l:'Enfermedad reumática', p:2},
  {t:'chk', l:'Cáncer activo', p:2},
  {t:'chk', l:'Varón', p:1}],
  info:'Escala de sangrado de pacientes médicos hospitalizados, no de cualquier indicación de anticoagulación',
  interp:function(s){return s>=7?['high',s+' pts','Alto riesgo hemorrágico (sangrado mayor 4,1%; cualquier sangrado relevante 7,9%) — preferir profilaxis mecánica y reevaluar']:['low',s+' pts','Riesgo hemorrágico no elevado (sangrado mayor 0,4%; cualquier sangrado relevante 1,5%)']}},

{id:'ottawa-sah', src:'Perry 2013, JAMA · PMID 24065011', title:'Ottawa SAH Rule', sub:'Cefalea aguda — ¿estudiar hemorragia subaracnoidea?', badge:'red', tag:'Neuro', max:6, items:[
  {t:'chk', l:'Edad ≥40 años', p:1},
  {t:'chk', l:'Dolor o rigidez de cuello', p:1},
  {t:'chk', l:'Pérdida de conciencia presenciada', p:1},
  {t:'chk', l:'Inicio durante el esfuerzo', p:1},
  {t:'chk', l:'Cefalea en trueno (máximo instantáneo)', p:1},
  {t:'chk', l:'Limitación de la flexión del cuello en la exploración', p:1}],
  info:'Inclusión: ≥16 años, alerta (GCS 15), cefalea nueva no traumática con máximo dentro de 1 h, consulta en ≤14 días. Exclusiones: traumatismo craneal reciente, papiledema o déficit focal nuevo, aneurisma, HSA, tumor cerebral o derivación ventricular previos, cefaleas recurrentes similares (≥3 episodios en >6 meses). Una regla negativa no descarta otras causas graves de cefalea',
  interp:function(s){return s===0?['low','Regla negativa','Si cumple la inclusión: no precisa estudio de HSA por esta regla']:['high','Estudiar HSA',s+' criterio'+(s===1?'':'s')+' — TC craneal ± punción lumbar o angio-TC']}},

{id:'ich', src:'Hemphill JC 2001 · Stroke · PMID 11283388 · advertencia: ESO/EANS 2025, Steiner · Eur Stroke J · PMID 40401775', title:'ICH score', sub:'Hemorragia intracerebral — gravedad (0–6)', badge:'red', tag:'Ictus', max:6, items:[
  {t:'sel', btn:true, l:'GCS', o:[['13–15 (0)',0],['5–12 (1)',1],['3–4 (2)',2]]},
  {t:'chk', l:'Volumen del hematoma ≥30 mL', p:1},
  {t:'chk', l:'Hemorragia intraventricular', p:1},
  {t:'chk', l:'Origen infratentorial', p:1},
  {t:'chk', l:'Edad ≥80 años', p:1}],
  info:'Mortalidad OBSERVADA a 30 días en la cohorte original (2001), no una probabilidad individual actual. No usar para decidir limitación del tratamiento: ESO/EANS 2025 recomienda no aplicar políticas generales de limitación del tratamiento en las primeras 24 h (riesgo de profecía autocumplida)',
  interp:function(s){var m=[0,13,26,72,97,100]; return s===6?['high','6 pts','Sin pacientes con 6 puntos en la cohorte original']:[s===0?'low':s<=2?'mid':'high',s+' pts','Mortalidad observada a 30 días en la cohorte original: '+m[s]+'%']}},

{id:'lrinec', src:'Wong CH 2004 · Crit Care Med · PMID 15241098 · sensibilidad: Fernando SM 2019 · Ann Surg · PMID 29672405', title:'LRINEC', sub:'Fascitis necrotizante — apoyo, NUNCA para descartar', badge:'red', tag:'Infección', max:13, items:[
  {t:'sel', btn:true, l:'PCR', o:[['<150 mg/L (0)',0],['≥150 mg/L (4)',4]]},
  {t:'sel', btn:true, l:'Leucocitos (×10⁹/L)', o:[['<15 (0)',0],['15–25 (1)',1],['>25 (2)',2]]},
  {t:'sel', btn:true, l:'Hemoglobina (g/dL)', o:[['>13,5 (0)',0],['11–13,5 (1)',1],['<11 (2)',2]]},
  {t:'sel', btn:true, l:'Sodio (mEq/L)', o:[['≥135 (0)',0],['<135 (2)',2]]},
  {t:'sel', btn:true, l:'Creatinina (mg/dL)', o:[['≤1,6 (0)',0],['>1,6 (2)',2]]},
  {t:'sel', btn:true, l:'Glucosa (mg/dL)', o:[['≤180 (0)',0],['>180 (1)',1]]}],
  info:'Sensibilidad del 68% con ≥6 y del 41% con ≥8 (metaanálisis de 23 estudios, n = 5982): una puntuación baja NO excluye la fascitis necrotizante. Ante sospecha clínica, valoración quirúrgica urgente sin esperar a la analítica ni a la imagen',
  interp:function(s){return s>=8?['high',s+' pts','Categoría alta — no es un diagnóstico: valoración quirúrgica urgente']:s>=6?['mid',s+' pts','Categoría intermedia — valoración quirúrgica si hay sospecha clínica']:['mid',s+' pts','Puntuación baja — NO excluye: si hay sospecha clínica, valoración quirúrgica igualmente']}},

{id:'ciwa', src:'Sullivan 1989, Br J Addict · PMID 2597811 · cortes: guía ASAM 2020 · PMID 32511109', title:'CIWA-Ar', sub:'Abstinencia alcohólica — gravedad (0–67)', badge:'amber', tag:'Tóxicos', max:67, items:[
  {t:'sel', l:'Náuseas y vómitos', o:[['0 — sin náuseas ni vómitos',0],['1 — náuseas leves sin vómitos',1],['2',2],['3',3],['4 — náuseas intermitentes con arcadas',4],['5',5],['6',6],['7 — náuseas constantes, arcadas y vómitos frecuentes',7]]},
  {t:'sel', l:'Temblor (brazos extendidos, dedos separados)', o:[['0 — sin temblor',0],['1 — no visible, se palpa en la punta de los dedos',1],['2',2],['3',3],['4 — moderado con los brazos extendidos',4],['5',5],['6',6],['7 — intenso incluso sin extender los brazos',7]]},
  {t:'sel', l:'Sudoración paroxística', o:[['0 — no visible',0],['1 — palmas apenas húmedas',1],['2',2],['3',3],['4 — gotas de sudor en la frente',4],['5',5],['6',6],['7 — sudoración profusa',7]]},
  {t:'sel', l:'Ansiedad', o:[['0 — tranquilo',0],['1 — ligeramente ansioso',1],['2',2],['3',3],['4 — moderadamente ansioso o en guardia',4],['5',5],['6',6],['7 — equivalente a crisis de pánico',7]]},
  {t:'sel', l:'Agitación', o:[['0 — actividad normal',0],['1 — algo más activo de lo normal',1],['2',2],['3',3],['4 — moderadamente inquieto',4],['5',5],['6',6],['7 — se mueve continuamente',7]]},
  {t:'sel', l:'Alteraciones táctiles (picor, hormigueo, quemazón, insectos)', o:[['0 — ninguna',0],['1 — muy leves',1],['2 — leves',2],['3 — moderadas',3],['4 — alucinaciones moderadamente intensas',4],['5 — alucinaciones intensas',5],['6 — alucinaciones muy intensas',6],['7 — alucinaciones continuas',7]]},
  {t:'sel', l:'Alteraciones auditivas', o:[['0 — ninguna',0],['1 — muy leves (sonidos ásperos o que asustan)',1],['2 — leves',2],['3 — moderadas',3],['4 — alucinaciones moderadamente intensas',4],['5 — alucinaciones intensas',5],['6 — alucinaciones muy intensas',6],['7 — alucinaciones continuas',7]]},
  {t:'sel', l:'Alteraciones visuales', o:[['0 — ninguna',0],['1 — sensibilidad a la luz muy leve',1],['2 — leve',2],['3 — moderada',3],['4 — alucinaciones moderadamente intensas',4],['5 — alucinaciones intensas',5],['6 — alucinaciones muy intensas',6],['7 — alucinaciones continuas',7]]},
  {t:'sel', l:'Cefalea o sensación de cabeza llena', o:[['0 — no',0],['1 — muy leve',1],['2 — leve',2],['3 — moderada',3],['4 — moderadamente intensa',4],['5 — intensa',5],['6 — muy intensa',6],['7 — extremadamente intensa',7]]},
  {t:'sel', l:'Orientación', o:[['0 — orientado, puede sumar en serie',0],['1 — no puede sumar en serie o duda de la fecha',1],['2 — desorientado en la fecha ≤2 días',2],['3 — desorientado en la fecha >2 días',3],['4 — desorientado en lugar o persona',4]]}],
  info:'Requiere un paciente que se comunique de forma fiable: no usar en delirio, intubación o enfermedad que confunda los ítems. Convulsiones o delirium tremens = abstinencia complicada (grave) con cualquier puntuación. Los cortes son la clasificación habitual de ASAM 2020, no de la publicación original',
  interp:function(s){return s>=19?['high',s+' pts','Abstinencia grave — tratamiento farmacológico y valorar nivel de cuidados']:s>=10?['mid',s+' pts','Abstinencia moderada — tratamiento farmacológico guiado por síntomas']:['low',s+' pts','Abstinencia leve — reevaluar periódicamente']}},

// ── Escalas pediátricas usadas por los algoritmos SEUP (sesión 20) ──────────

{id:'pulmonary-score', src:'Smith SR 2002 · Acad Emerg Med · PMID 11825832 · ítems y cortes de FR del algoritmo SEUP de crisis asmática · clasificación 0–3 / 4–6 / 7–9 (Iramain 2026 · PMID 41837861)', title:'Pulmonary Score', sub:'Crisis asmática pediátrica — gravedad', badge:'amber', tag:'Pediatría', max:9, items:[
  {t:'sel', l:'Frecuencia respiratoria (&lt;6 años · ≥6 años)', o:[['&lt;6 a: ≤30 · ≥6 a: ≤20 (0)',0],['&lt;6 a: 31–45 · ≥6 a: 21–35 (1)',1],['&lt;6 a: 46–60 · ≥6 a: 36–50 (2)',2],['&lt;6 a: &gt;60 · ≥6 a: &gt;50 (3)',3]]},
  {t:'sel', l:'Sibilancias (sin sibilancias y con ECM aumentado: puntuar 3)', o:[['No (0)',0],['Final de la espiración (1)',1],['Toda la espiración (2)',2],['Inspiración y espiración sin fonendo (3)',3]]},
  {t:'sel', l:'Uso del esternocleidomastoideo (ECM)', o:[['No (0)',0],['Leve (1)',1],['Moderado (2)',2],['Máximo (3)',3]]}],
  info:'Valorar junto a la SatO₂: el algoritmo SEUP pide OAF si tras el tratamiento inicial persiste PS &gt;6 o SatO₂ &lt;94 % con reservorio. El PDF de la SEUP escribe «leve &lt;3»; aquí se usa la clasificación publicada del score (leve 0–3). Criterio de alta SEUP: PS ≤2.',
  interp:function(s){return s<=3?['low',s+'/9','Crisis leve — salbutamol inhalado con cámara']:s<=6?['mid',s+'/9','Crisis moderada — O₂ si SatO₂ &lt;92 %, salbutamol + ipratropio, corticoide oral']:['high',s+'/9','Crisis grave — O₂, salbutamol + ipratropio nebulizados, corticoide; valorar magnesio IV y OAF']}},

{id:'tal-mod', src:'Escala de Tal modificada (Golan-Tripto 2018 · Pediatr Pulmonol · PMID 29655288) · ítems y cortes del algoritmo SEUP de bronquiolitis (mayo 2024)', title:'Tal modificada', sub:'Bronquiolitis — gravedad', badge:'amber', tag:'Pediatría', max:12, items:[
  {t:'sel', l:'Frecuencia respiratoria (&lt;6 meses · ≥6 meses)', o:[['&lt;6 m: ≤40 · ≥6 m: ≤30 (0)',0],['&lt;6 m: 41–55 · ≥6 m: 31–45 (1)',1],['&lt;6 m: 56–70 · ≥6 m: 46–60 (2)',2],['&lt;6 m: &gt;70 · ≥6 m: &gt;60 (3)',3]]},
  {t:'sel', l:'Sibilancias / crepitantes', o:[['No (0)',0],['Solo espiratorias (1)',1],['Inspiratorias y espiratorias, audibles con fonendo (2)',2],['Audibles sin fonendo (3)',3]]},
  {t:'sel', l:'Retracciones', o:[['No (0)',0],['Leves: subcostal, intercostal (1)',1],['Moderadas: intercostales (2)',2],['Intensas: intercostales y supraesternal, cabeceo (3)',3]]},
  {t:'sel', l:'SatO₂ (aire ambiente)', o:[['≥95 % (0)',0],['92–94 % (1)',1],['90–91 % (2)',2],['≤89 % (3)',3]]}],
  info:'Puntuar tras aspirar las secreciones. Cortes SEUP: leve &lt;5 · moderada 6–8 · grave &gt;8. <b>El PDF de la SEUP no clasifica la puntuación 5</b>: decidir con la SpO₂, los factores de riesgo y la evolución.',
  interp:function(s){return s<5?['low',s+'/12','Leve (SEUP) — si SpO₂ &gt;94 % y sin factores de riesgo: alta con medidas generales']:s===5?['mid','5/12','Límite: la SEUP no clasifica el 5 (leve &lt;5, moderada 6–8) — decidir con SpO₂, factores de riesgo y evolución']:s<=8?['mid',s+'/12','Moderada (SEUP) — alta con control en 24 h si no hay factores de riesgo ni criterios de observación']:['high',s+'/12','Grave (SEUP) — O₂ con reservorio; valorar adrenalina nebulizada y OAF']}},

{id:'pecarn-menor2', src:'Kuppermann N 2009 · Lancet · PMID 19758692 · riesgos de LCCI por grupo: PREDICT (Bressan 2021 · Acad Emerg Med · PMID 34236116)', title:'PECARN TCE (<2 años)', sub:'Traumatismo craneal leve (GCS 14–15) — ¿TAC?', badge:'amber', tag:'Pediatría', max:24, items:[
  {t:'chk', l:'<b>Alto riesgo</b>: GCS 14 u otros signos de alteración del estado mental', p:10},
  {t:'chk', l:'<b>Alto riesgo</b>: fractura craneal palpable', p:10},
  {t:'chk', l:'Hematoma de cuero cabelludo no frontal (occipital, parietal o temporal)', p:1},
  {t:'chk', l:'Pérdida de conciencia (≥5 s)', p:1},
  {t:'chk', l:'Mecanismo grave (ver abajo)', p:1},
  {t:'chk', l:'No actúa con normalidad según los padres', p:1}],
  info:'<b>Mecanismo grave</b>: accidente de tráfico con eyección, muerte de otro pasajero o vuelco; peatón o ciclista sin casco atropellado por un vehículo a motor; caída &gt;0,9 m; impacto en la cabeza con un objeto de alta energía.<br>La regla solo se aplica a TCE leve con GCS 14–15. Con GCS ≤13 → TAC.',
  interp:function(s){return s>=10?['high','Alto riesgo','TAC recomendado (LCCI 8,5 % en PREDICT)']:s>=1?['mid','Riesgo intermedio','Observación frente a TAC según experiencia, número de hallazgos, empeoramiento, edad &lt;3 meses y preferencia de los padres (LCCI 0,2 %)']:['low','Muy bajo riesgo','TAC no recomendado (LCCI 0 % en PREDICT)']}},

{id:'pecarn-mayor2', src:'Kuppermann N 2009 · Lancet · PMID 19758692 · riesgos de LCCI por grupo: PREDICT (Bressan 2021 · Acad Emerg Med · PMID 34236116)', title:'PECARN TCE (≥2 años)', sub:'Traumatismo craneal leve (GCS 14–15) — ¿TAC?', badge:'amber', tag:'Pediatría', max:24, items:[
  {t:'chk', l:'<b>Alto riesgo</b>: GCS 14 u otros signos de alteración del estado mental', p:10},
  {t:'chk', l:'<b>Alto riesgo</b>: signos de fractura de la base del cráneo', p:10},
  {t:'chk', l:'Pérdida de conciencia', p:1},
  {t:'chk', l:'Vómitos', p:1},
  {t:'chk', l:'Mecanismo grave (ver abajo)', p:1},
  {t:'chk', l:'Cefalea intensa', p:1}],
  info:'<b>Mecanismo grave</b>: accidente de tráfico con eyección, muerte de otro pasajero o vuelco; peatón o ciclista sin casco atropellado por un vehículo a motor; caída &gt;1,5 m; impacto en la cabeza con un objeto de alta energía.<br>La regla solo se aplica a TCE leve con GCS 14–15. Con GCS ≤13 → TAC.',
  interp:function(s){return s>=10?['high','Alto riesgo','TAC recomendado (LCCI 5,7 % en PREDICT)']:s>=1?['mid','Riesgo intermedio','Observación frente a TAC según experiencia, número de hallazgos, empeoramiento y preferencia de los padres (LCCI 0,7 %)']:['low','Muy bajo riesgo','TAC no recomendado (LCCI 0 % en PREDICT)']}},

{id:'psofa', src:'Matics TJ, Sanchez-Pinto LN · JAMA Pediatr 2017 · PMID 28783810 (tabla 1)', title:'pSOFA', sub:'Disfunción orgánica pediátrica — sepsis', badge:'red', tag:'Pediatría', max:24, items:[
  {t:'sel', l:'Respiratorio — PaO₂/FiO₂ (o SpO₂/FiO₂ con SpO₂ ≤97 %)', o:[['≥400 (SF ≥292) (0)',0],['300–399 (SF 264–291) (1)',1],['200–299 (SF 221–264) (2)',2],['100–199 (SF 148–220) con soporte respiratorio (3)',3],['&lt;100 (SF &lt;148) con soporte respiratorio (4)',4]]},
  {t:'sel', l:'Coagulación — plaquetas (×10³/µl)', o:[['≥150 (0)',0],['100–149 (1)',1],['50–99 (2)',2],['20–49 (3)',3],['&lt;20 (4)',4]]},
  {t:'sel', l:'Hígado — bilirrubina (mg/dl)', o:[['&lt;1,2 (0)',0],['1,2–1,9 (1)',1],['2,0–5,9 (2)',2],['6,0–11,9 (3)',3],['≥12 (4)',4]]},
  {t:'sel', l:'Cardiovascular — PAM por edad o vasoactivos (µg/kg/min, ≥1 h)', o:[['PAM ≥ umbral de su edad (0)',0],['PAM &lt; umbral de su edad (1)',1],['Dopamina ≤5 o dobutamina (cualquiera) (2)',2],['Dopamina &gt;5, adrenalina ≤0,1 o noradrenalina ≤0,1 (3)',3],['Dopamina &gt;15, adrenalina &gt;0,1 o noradrenalina &gt;0,1 (4)',4]]},
  {t:'sel', l:'Neurológico — Glasgow pediátrico', o:[['15 (0)',0],['13–14 (1)',1],['10–12 (2)',2],['6–9 (3)',3],['&lt;6 (4)',4]]},
  {t:'sel', l:'Renal — creatinina según la edad (tabla de abajo)', o:[['Columna 0 (0)',0],['Columna 1 (1)',1],['Columna 2 (2)',2],['Columna 3 (3)',3],['Columna 4 (4)',4]]}],
  info:'<strong>Umbrales por edad</strong><table><tr><th>Edad</th><th>PAM (mmHg) 0 / 1</th><th>Creatinina (mg/dl) 0 · 1 · 2 · 3 · 4</th></tr>' +
    '<tr><td>&lt;1 mes</td><td>≥46 / &lt;46</td><td>&lt;0,8 · 0,8–0,9 · 1,0–1,1 · 1,2–1,5 · ≥1,6</td></tr>' +
    '<tr><td>1–11 meses</td><td>≥55 / &lt;55</td><td>&lt;0,3 · 0,3–0,4 · 0,5–0,7 · 0,8–1,1 · ≥1,2</td></tr>' +
    '<tr><td>12–23 meses</td><td>≥60 / &lt;60</td><td>&lt;0,4 · 0,4–0,5 · 0,6–1,0 · 1,1–1,4 · ≥1,5</td></tr>' +
    '<tr><td>24–59 meses</td><td>≥62 / &lt;62</td><td>&lt;0,6 · 0,6–0,8 · 0,9–1,5 · 1,6–2,2 · ≥2,3</td></tr>' +
    '<tr><td>60–143 meses</td><td>≥65 / &lt;65</td><td>&lt;0,7 · 0,7–1,0 · 1,1–1,7 · 1,8–2,5 · ≥2,6</td></tr>' +
    '<tr><td>144–216 meses</td><td>≥67 / &lt;67</td><td>&lt;1,0 · 1,0–1,6 · 1,7–2,8 · 2,9–4,1 · ≥4,2</td></tr>' +
    '<tr><td>&gt;216 meses</td><td>≥70 / &lt;70</td><td>&lt;1,2 · 1,2–1,9 · 2,0–3,4 · 3,5–4,9 · ≥5</td></tr></table>' +
    '<p style="margin-top:8px">Peor valor de cada periodo de 24 h; un dato no medido cuenta 0. Bilirrubina ×17,1 = µmol/l; creatinina ×88,4 = µmol/l. El algoritmo SEUP de sepsis define la sepsis como pSOFA ≥2 por infección, no evaluable a la llegada: no retrasar el tratamiento por calcularlo.</p>',
  interp:function(s){return s<2?['low',s+'/24','pSOFA &lt;2 — sin disfunción orgánica por este criterio; reevaluar']:['high',s+'/24','pSOFA ≥2 — con infección, sepsis (disfunción orgánica)']}},

{id:'dolor-eva', src:'Algoritmo SEUP de dolor (escalas de autoinforme: numérica verbal, EVA, caras FPS-R y Wong-Baker)', title:'Intensidad del dolor (autoinforme)', sub:'Escala numérica, EVA o caras — niño colaborador', badge:'blue', tag:'Dolor pediátrico', max:10, items:[
  {t:'sel', l:'Puntuación que da el niño (numérica 0–10, EVA en cm o cara elegida)', o:[['0 — no duele (0)',0],['1 (1)',1],['2 — duele un poco (2)',2],['3 (3)',3],['4 — duele algo más (4)',4],['5 (5)',5],['6 — duele todavía más (6)',6],['7 (7)',7],['8 — duele mucho (8)',8],['9 (9)',9],['10 — duele el máximo (10)',10]]}],
  info:'Numérica verbal: «0 es nada de dolor y 10 el peor dolor imaginable». EVA: línea de 10 cm, se mide la marca. Caras FPS-R/Wong-Baker: 6 caras puntuadas 0, 2, 4, 6, 8, 10; no usar palabras como «contento» o «triste». Son de autoinforme: un tercero no puede puntuarlas por el niño (usar FLACC).',
  interp:function(s){return s===0?['low','0/10','Sin dolor']:s<=3?['low',s+'/10','Dolor leve']:s<=6?['mid',s+'/10','Dolor moderado']:['high',s+'/10','Dolor intenso']}},

{id:'llanto', src:'Reinoso-Barbero F 2011 · An Pediatr · escala española · tabla 21-2 del algoritmo SEUP de dolor', title:'LLANTO', sub:'Dolor agudo post-procedimiento o posquirúrgico — preverbal o no colaborador', badge:'blue', tag:'Dolor pediátrico', max:10, items:[
  {t:'sel', l:'Llanto', o:[['No llora (0)',0],['Consolable o intermitente (1)',1],['Inconsolable o continuo (2)',2]]},
  {t:'sel', l:'Actitud psicológica', o:[['Tranquilo o dormido (0)',0],['Expectante o intranquilo (1)',1],['Agitado o histérico (2)',2]]},
  {t:'sel', l:'Normorrespiración', o:[['Regular o pausada (0)',0],['Taquipneico (1)',1],['Irregular (2)',2]]},
  {t:'sel', l:'Tono postural', o:[['Relajado (0)',0],['Indiferente (1)',1],['Contraído (2)',2]]},
  {t:'sel', l:'Observación facial', o:[['Contento o dormido (0)',0],['Serio (1)',1],['Triste (2)',2]]}],
  interp:function(s){return s===0?['low','0/10','Sin dolor']:s<=3?['low',s+'/10','Dolor leve']:s<=6?['mid',s+'/10','Dolor moderado']:['high',s+'/10','Dolor intenso']}},

{id:'rflacc', src:'Malviya S 2006 · Paediatr Anaesth · PMID 16490089 · tabla 21-3 del algoritmo SEUP de dolor', title:'FLACC revisada (r-FLACC)', sub:'Dolor en niños con discapacidad cognitiva', badge:'blue', tag:'Dolor pediátrico', max:10, items:[
  {t:'sel', l:'Cara', o:[['Sin expresión particular o sonríe (0)',0],['Muecas o ceño ocasional; retraído, desinteresado, triste o intranquilo (1)',1],['Muecas o ceño continuo; temblor de barbilla, mandíbula encajada; angustia, susto o pánico (2)',2]]},
  {t:'sel', l:'Piernas', o:[['Posición normal o relajada; tono y movimiento habituales (0)',0],['Incómodo, intranquilo, tenso; temblores ocasionales (1)',1],['Patadas o piernas levantadas; marcado aumento de espasticidad, temblores constantes o sacudidas (2)',2]]},
  {t:'sel', l:'Actividad', o:[['Tranquilo, posición normal, se mueve fácilmente, respiración regular (0)',0],['Se retuerce, se mueve de un lado a otro, movimientos tensos; ligeramente agitado; suspiros intermitentes (1)',1],['Arqueado, rígido o con sacudidas; agitación intensa; se golpea la cabeza; respiración agitada o a boqueadas (2)',2]]},
  {t:'sel', l:'Llanto', o:[['No llora ni verbaliza (0)',0],['Gritos o gemidos; queja ocasional; exabruptos verbales o gruñidos ocasionales (1)',1],['Llanto, gritos o sollozos constantes; quejas frecuentes; explosiones repetidas (2)',2]]},
  {t:'sel', l:'Consuelo', o:[['Contento, relajado (0)',0],['Se tranquiliza si se le toca, abraza o habla; distraíble (1)',1],['Difícil de consolar; aleja al cuidador, rechaza los cuidados (2)',2]]}],
  info:'Antes de puntuar, revisar con los padres o cuidadores los comportamientos propios del niño cuando tiene dolor (p. ej., labios fruncidos, rechinar de dientes, clonus, se agarra la zona, «pupa», contiene la respiración) y contarlos en el ítem que corresponda (0–2, como el resto).',
  interp:function(s){return s===0?['low','0/10','Sin dolor']:s<=3?['low',s+'/10','Dolor leve']:s<=6?['mid',s+'/10','Dolor moderado']:['high',s+'/10','Dolor intenso']}},

{id:'cds', src:'Friedman JN 2004 · J Pediatr · PMID 15289767 · validación externa: Bailey B 2010 · Acad Emerg Med · PMID 20624137', title:'Deshidratación clínica (CDS)', sub:'Gastroenteritis, 1–36 meses — grado de deshidratación', badge:'amber', tag:'Pediatría', max:8, items:[
  {t:'sel', l:'Aspecto general', o:[['Normal (0)',0],['Sediento, inquieto o letárgico pero irritable al tocarlo (1)',1],['Somnoliento, flácido, frío o sudoroso; comatoso (2)',2]]},
  {t:'sel', l:'Ojos', o:[['Normales (0)',0],['Ligeramente hundidos (1)',1],['Muy hundidos (2)',2]]},
  {t:'sel', l:'Mucosas (lengua)', o:[['Húmedas (0)',0],['Pegajosas (1)',1],['Secas (2)',2]]},
  {t:'sel', l:'Lágrimas', o:[['Presentes (0)',0],['Disminuidas (1)',1],['Ausentes (2)',2]]}],
  info:'Validada en niños de 1 a 36 meses con gastroenteritis. El algoritmo SEUP valora la gravedad con la tabla NICE y la pérdida aguda de peso; la CDS es un apoyo.',
  interp:function(s){return s===0?['low','0/8','Sin deshidratación']:s<=4?['mid',s+'/8','Algo de deshidratación (1–4)']:['high',s+'/8','Deshidratación moderada-grave (5–8)']}},

{id:'gorelick', src:'Gorelick MH 1997 · Pediatrics · PMID 9113963', title:'Gorelick (10 signos)', sub:'Deshidratación 1 mes–5 años — ¿déficit ≥5 %?', badge:'amber', tag:'Pediatría', max:10, items:[
  {t:'chk', l:'Mal aspecto general', p:1},
  {t:'chk', l:'Relleno capilar &gt;2 s', p:1},
  {t:'chk', l:'Lágrimas ausentes', p:1},
  {t:'chk', l:'Mucosas secas', p:1},
  {t:'chk', l:'Ojos hundidos', p:1},
  {t:'chk', l:'Pulso radial anormal (débil)', p:1},
  {t:'chk', l:'Respiración anormal', p:1},
  {t:'chk', l:'Turgencia cutánea disminuida', p:1},
  {t:'chk', l:'Taquicardia', p:1},
  {t:'chk', l:'Diuresis disminuida (referida por los padres)', p:1}],
  info:'≥3 signos: sensibilidad 87 % y especificidad 82 % para un déficit ≥5 %. Versión de 4 signos (relleno capilar &gt;2 s, lágrimas ausentes, mucosas secas, mal aspecto): ≥2 indica ≥5 %. El estudio no da un corte validado para ≥10 %. Excluía desnutrición e hipo/hipernatremia.',
  interp:function(s){return s<3?['low',s+' signos','&lt;3 signos — déficit &lt;5 % probable']:['high',s+' signos','≥3 signos — deshidratación ≥5 % probable']}},

];
