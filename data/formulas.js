/* ==================================================================
   FORMULAS — fórmulas clínicas de cálculo rápido (mismo motor que
   SCALES: items num/sel + calcCustom + interp). Consolidado y
   deduplicado a partir de dos fuentes del usuario (formulas.txt,
   formulas.xlsx) con verificación puntual en Vera Health donde las
   dos fuentes discrepaban o el original tenía un error:
   - Peso pediátrico estimado: la fuente tenía una fórmula única
     (edad+4)×2 y también una versión por bandas de edad. Se usa la
     versión por bandas (más precisa, PALS 2025 prioriza cinta de
     Broselow sobre cualquier fórmula) — PMID 41122862, PMID 28026862.
   - Anion gap corregido: la fuente usaba albúmina de referencia 4.0
     g/dL en un batch y 4.4 en otro. Se usa 4.0 g/dL (corrección de
     Figge clásica) — PMID 9824071.
   - Compensación ácido-base respiratoria: las fórmulas del Excel del
     usuario para acidosis/alcalosis respiratoria (PaCO2/10, PaCO2/2.5,
     etc.) daban valores absurdos (HCO3 ~4-16 con PaCO2 normal=40, en
     vez de ~24) — estaban rotas. Se reemplazan por las reglas de
     Boston verificadas (HCO3 esperado = 24 + pendiente×(PaCO2-40)) —
     PMID 34400023, PMID 9671365.
   ================================================================== */

window.FORMULAS = [

// ── Hemodinámica ────────────────────────────────────────────────
{id:'f-pam', src:'Fórmula clásica de presión arterial media', title:'Presión Arterial Media (PAM)', sub:'Objetivo en shock ≥ 65 mmHg', badge:'red', tag:'Hemodinámica', max:200, agg:'custom', items:[
  {t:'num', l:'PA sistólica (mmHg)', u:'mmHg', f:function(v){return 0}},
  {t:'num', l:'PA diastólica (mmHg)', u:'mmHg', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round(((v[0]+2*v[1])/3)*10)/10},
  interp:function(s){return s<65?['high',s+' mmHg','Por debajo del objetivo en shock (≥65 mmHg) — valorar soporte hemodinámico']:s<=100?['low',s+' mmHg','Rango normal (70–100 mmHg)']:['mid',s+' mmHg','Por encima del rango habitual']}},

{id:'f-shock-index', src:'Shock Index — revisión clásica de trauma/sepsis', title:'Índice de Shock', sub:'FC/PAS — predictor de hipoperfusión', badge:'red', tag:'Hemodinámica', max:3, agg:'custom', items:[
  {t:'num', l:'Frecuencia cardiaca (lpm)', u:'lpm', f:function(v){return 0}},
  {t:'num', l:'PA sistólica (mmHg)', u:'mmHg', f:function(v){return 0}}],
  calcCustom:function(v){return v[1] ? Math.round((v[0]/v[1])*100)/100 : 0},
  interp:function(s){return s<0.7?['low',s,'Normal (0,5–0,7)']:s<0.9?['mid',s,'Alerta — vigilar perfusión']:['high',s,'≥0,9 sugiere hipoperfusión inminente; ≥1,0 predictivo de shock y necesidad de transfusión/intervención']}},

{id:'f-pp', src:'Fisiología cardiovascular básica', title:'Presión de Pulso', sub:'PAS − PAD — orientativo de volumen de eyección', badge:'blue', tag:'Hemodinámica', max:100, agg:'custom', items:[
  {t:'num', l:'PA sistólica (mmHg)', u:'mmHg', f:function(v){return 0}},
  {t:'num', l:'PA diastólica (mmHg)', u:'mmHg', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round(v[0]-v[1])},
  interp:function(s){return s<25?['mid',s+' mmHg','Estrecha (<25) — sugiere bajo gasto/taponamiento']:s<=50?['low',s+' mmHg','Rango habitual (25–50 mmHg)']:['mid',s+' mmHg','Amplia (>50) — insuficiencia aórtica, rigidez arterial, sepsis']}},

{id:'f-ppc', src:'Brain Trauma Foundation — objetivo de PPC en TCE', title:'Presión de Perfusión Cerebral (PPC)', sub:'PAM − PIC — objetivo 60–70 mmHg en TCE', badge:'red', tag:'Hemodinámica', max:150, agg:'custom', items:[
  {t:'num', l:'PAM (mmHg)', u:'mmHg', f:function(v){return 0}},
  {t:'num', l:'Presión intracraneal, PIC (mmHg)', u:'mmHg', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round(v[0]-v[1])},
  interp:function(s){return s<50?['high',s+' mmHg','Riesgo de isquemia cerebral']:s<60?['mid',s+' mmHg','Subóptimo — objetivo 60–70 mmHg en TCE']:s<=70?['low',s+' mmHg','Dentro del objetivo (60–70 mmHg)']:['mid',s+' mmHg','Por encima del objetivo habitual']}},

// ── Electrolitos y ácido-base ───────────────────────────────────
{id:'f-anion-gap', src:'Fórmula estándar', title:'Anion Gap', sub:'Clasifica acidosis metabólicas', badge:'amber', tag:'Electrolitos', max:40, agg:'custom', items:[
  {t:'num', l:'Sodio (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Cloro (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Bicarbonato, HCO₃ (mEq/L)', u:'mEq/L', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round(v[0]-(v[1]+v[2]))},
  interp:function(s){return s>=8&&s<=12?['low',s+' mEq/L','Normal (8–12 mEq/L)']:s>12?['high',s+' mEq/L','Elevado — acidosis con gap aumentado (cetoacidosis, láctica, tóxicos, uremia)']:['mid',s+' mEq/L','Bajo — considerar hipoalbuminemia, paraproteinemia, bromuro/litio']}},

{id:'f-anion-gap-corr', src:'Figge 1998 · PMID 9824071', title:'Anion Gap corregido por albúmina', sub:'AG + 2,5 × (4,0 − albúmina g/dL) — crucial en hipoalbuminemia', badge:'amber', tag:'Electrolitos', max:40, agg:'custom', items:[
  {t:'num', l:'Sodio (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Cloro (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Bicarbonato, HCO₃ (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Albúmina (g/dL)', u:'g/dL', f:function(v){return 0}}],
  calcCustom:function(v){var ag=v[0]-(v[1]+v[2]); return Math.round((ag+2.5*(4.0-v[3]))*10)/10},
  interp:function(s){return s<=12?['low',s+' mEq/L','Corregido normal']:['high',s+' mEq/L','Gap real elevado — puede estar enmascarado en el AG crudo si hay hipoalbuminemia']}},

{id:'f-osm-calc', src:'Fórmula estándar', title:'Osmolaridad sérica calculada', sub:'Comparar con la osmolaridad medida (gap >10 anormal, >20 sugiere tóxicos)', badge:'amber', tag:'Electrolitos', max:400, agg:'custom', items:[
  {t:'num', l:'Sodio (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Glucosa (mg/dL)', u:'mg/dL', f:function(v){return 0}},
  {t:'num', l:'BUN / urea nitrogenada (mg/dL)', u:'mg/dL', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round((2*v[0]+v[1]/18+v[2]/2.8)*10)/10},
  interp:function(s){return ['low',s+' mOsm/kg','Réstale la osmolaridad medida en el laboratorio: gap >10 es anormal, >20 sugiere tóxicos (metanol, etilenglicol)']}},

{id:'f-na-corr', src:'Katz 1973 (factor 1,6)', title:'Sodio corregido por hiperglucemia', sub:'Na + 1,6 × [(glucosa−100)/100] — usar factor 2,4 si glucosa >400', badge:'amber', tag:'Electrolitos', max:200, agg:'custom', items:[
  {t:'num', l:'Sodio medido (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Glucosa (mg/dL)', u:'mg/dL', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round((v[0]+1.6*((v[1]-100)/100))*10)/10},
  interp:function(s){return ['low',s+' mEq/L','Sodio corregido (factor 1,6); si glucosa >400 mg/dL, algunos autores usan factor 2,4']}},

{id:'f-fena', src:'Fórmula estándar', title:'Fracción de Excreción de Sodio (FeNa)', sub:'No fiable si el paciente recibe diuréticos', badge:'amber', tag:'Electrolitos', max:20, agg:'custom', items:[
  {t:'num', l:'Sodio en orina (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Creatinina en sangre (mg/dL)', u:'mg/dL', f:function(v){return 0}},
  {t:'num', l:'Sodio en sangre (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Creatinina en orina (mg/dL)', u:'mg/dL', f:function(v){return 0}}],
  calcCustom:function(v){return v[2]&&v[3] ? Math.round(((v[0]*v[1])/(v[2]*v[3]))*10000)/100 : 0},
  interp:function(s){return s<1?['low',s+' %','<1% — causa prerenal']:s>2?['high',s+' %','>2% — necrosis tubular aguda / causa intrínseca']:['mid',s+' %','Zona intermedia']}},

{id:'f-water-deficit', src:'Fórmula estándar de déficit de agua libre', title:'Déficit de Agua Libre', sub:'En hipernatremia — ATC: peso × 0,6 (hombre) / 0,5 (mujer)', badge:'amber', tag:'Electrolitos', max:15, agg:'custom', items:[
  {t:'num', l:'Peso (kg)', u:'kg', f:function(v){return 0}},
  {t:'sel', l:'Sexo', o:[['Hombre (0,6)',0.6],['Mujer (0,5)',0.5]]},
  {t:'num', l:'Sodio actual (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Sodio deseado (mEq/L)', u:'mEq/L', f:function(v){return 0}}],
  calcCustom:function(v){var atc=v[0]*v[1]; return v[3] ? Math.round(atc*((v[2]/v[3])-1)*10)/10 : 0},
  interp:function(s){return ['low',s+' L','Déficit de agua libre estimado — reponer gradualmente, corregir Na <10–12 mEq/L en 24h']}},

// ── Gasometría y compensación ácido-base ─────────────────────────
{id:'f-aa-gradient', src:'Fórmula estándar', title:'Gradiente Alveolo-arterial de O₂', sub:'Normal esperado ≈ (edad/4) + 4', badge:'blue', tag:'Gasometría', max:100, agg:'custom', items:[
  {t:'num', l:'Edad (años)', u:'años', f:function(v){return 0}},
  {t:'num', l:'FiO₂ (%)', u:'%', f:function(v){return 0}},
  {t:'num', l:'PaCO₂ (mmHg)', u:'mmHg', f:function(v){return 0}},
  {t:'num', l:'PaO₂ (mmHg)', u:'mmHg', f:function(v){return 0}}],
  calcCustom:function(v){var pao2=((760-47)*(v[1]/100))-(v[2]/0.8); return Math.round((pao2-v[3])*10)/10},
  interp:function(s){return ['low',s+' mmHg','Compararlo con el esperado por edad ≈ (edad/4)+4 mmHg']}},

{id:'f-henderson', src:'Ecuación de Henderson-Hasselbalch', title:'pH esperado (Henderson-Hasselbalch)', sub:'A partir de HCO₃ y PaCO₂', badge:'blue', tag:'Gasometría', max:8, agg:'custom', items:[
  {t:'num', l:'Bicarbonato, HCO₃ (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'PaCO₂ (mmHg)', u:'mmHg', f:function(v){return 0}}],
  calcCustom:function(v){return v[1] ? Math.round((6.1+Math.log10(v[0]/(0.03*v[1])))*100)/100 : 0},
  interp:function(s){return ['low',s,'pH esperado — comparar con el pH medido en la gasometría']}},

{id:'f-winters', src:'Winters 1967, validado en AJKD 2021 · PMID 34400023', title:'Winters — Acidosis metabólica', sub:'PaCO₂ esperado = 1,5×HCO₃ + 8 (±2)', badge:'red', tag:'Gasometría', max:80, agg:'custom', items:[
  {t:'num', l:'Bicarbonato, HCO₃ (mEq/L)', u:'mEq/L', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round(1.5*v[0]+8)},
  interp:function(s){return ['low','PaCO₂ esp. '+s+' (±2) mmHg','Si la PaCO₂ medida está fuera de este rango, hay un trastorno respiratorio sobreañadido']}},

{id:'f-alc-metabolica', src:'Regla de compensación esperada · PMID 34400023', title:'Compensación — Alcalosis metabólica', sub:'PaCO₂ esperado = 0,7×HCO₃ + 20 (±5)', badge:'blue', tag:'Gasometría', max:80, agg:'custom', items:[
  {t:'num', l:'Bicarbonato, HCO₃ (mEq/L)', u:'mEq/L', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round(0.7*v[0]+20)},
  interp:function(s){return ['low','PaCO₂ esp. '+s+' (±5) mmHg','Si la PaCO₂ medida está fuera de este rango, hay un trastorno respiratorio sobreañadido']}},

{id:'f-acidosis-resp-aguda', src:'Regla de Boston · PMID 9671365', title:'Compensación — Acidosis respiratoria aguda', sub:'HCO₃ esperado = 24 + 0,1×(PaCO₂−40)', badge:'blue', tag:'Gasometría', max:40, agg:'custom', items:[
  {t:'num', l:'PaCO₂ (mmHg)', u:'mmHg', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round((24+0.1*(v[0]-40))*10)/10},
  interp:function(s){return ['low','HCO₃ esp. '+s+' mEq/L','Si el HCO₃ medido excede este valor, sospechar componente metabólico crónico/mixto']}},

{id:'f-acidosis-resp-cronica', src:'Regla de Boston · PMID 9671365', title:'Compensación — Acidosis respiratoria crónica', sub:'HCO₃ esperado = 24 + 0,35×(PaCO₂−40)', badge:'blue', tag:'Gasometría', max:40, agg:'custom', items:[
  {t:'num', l:'PaCO₂ (mmHg)', u:'mmHg', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round((24+0.35*(v[0]-40))*10)/10},
  interp:function(s){return ['low','HCO₃ esp. '+s+' mEq/L','Compensación renal completa (3–5 días de evolución)']}},

{id:'f-alcalosis-resp-aguda', src:'Regla de Boston · PMID 9671365', title:'Compensación — Alcalosis respiratoria aguda', sub:'HCO₃ esperado = 24 − 0,2×(40−PaCO₂)', badge:'blue', tag:'Gasometría', max:40, agg:'custom', items:[
  {t:'num', l:'PaCO₂ (mmHg)', u:'mmHg', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round((24-0.2*(40-v[0]))*10)/10},
  interp:function(s){return ['low','HCO₃ esp. '+s+' mEq/L','Compensación aguda (minutos-horas)']}},

{id:'f-alcalosis-resp-cronica', src:'Regla de Boston · PMID 9671365', title:'Compensación — Alcalosis respiratoria crónica', sub:'HCO₃ esperado = 24 − 0,5×(40−PaCO₂)', badge:'blue', tag:'Gasometría', max:40, agg:'custom', items:[
  {t:'num', l:'PaCO₂ (mmHg)', u:'mmHg', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round((24-0.5*(40-v[0]))*10)/10},
  interp:function(s){return ['low','HCO₃ esp. '+s+' mEq/L','Compensación renal completa (días)']}},

// ── Ventilación mecánica ──────────────────────────────────────
{id:'f-horowitz', src:'Criterios de Berlín para SDRA', title:'Índice de Horowitz (P/F)', sub:'PaO₂/FiO₂ — gravedad del SDRA', badge:'red', tag:'Ventilación', max:600, agg:'custom', items:[
  {t:'num', l:'PaO₂ (mmHg)', u:'mmHg', f:function(v){return 0}},
  {t:'num', l:'FiO₂ (%)', u:'%', f:function(v){return 0}}],
  calcCustom:function(v){return v[1] ? Math.round((v[0]/(v[1]/100))*10)/10 : 0},
  interp:function(s){return s<100?['high',s,'SDRA grave (<100)']:s<200?['high',s,'SDRA moderado (100–200)']:s<300?['mid',s,'SDRA leve (200–300)']:['low',s,'Sin criterio de SDRA (≥300)']}},

{id:'f-driving-pressure', src:'Amato 2015 — mortalidad en SDRA', title:'Driving Pressure (ΔP)', sub:'Objetivo <15 cmH₂O — mejor predictor de mortalidad en SDRA', badge:'red', tag:'Ventilación', max:40, agg:'custom', items:[
  {t:'num', l:'Presión meseta (cmH₂O)', u:'cmH₂O', f:function(v){return 0}},
  {t:'num', l:'PEEP total (cmH₂O)', u:'cmH₂O', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round(v[0]-v[1])},
  interp:function(s){return s<15?['low',s+' cmH₂O','Dentro de objetivo (<15)']:['high',s+' cmH₂O','≥15 — riesgo de lesión pulmonar inducida por ventilador (VILI)']}},

{id:'f-vm', src:'Fisiología respiratoria básica', title:'Ventilación Minuto', sub:'Volumen corriente × frecuencia respiratoria — normal 5–8 L/min', badge:'blue', tag:'Ventilación', max:20, agg:'custom', items:[
  {t:'num', l:'Volumen corriente (mL)', u:'mL', f:function(v){return 0}},
  {t:'num', l:'Frecuencia respiratoria (rpm)', u:'rpm', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round((v[0]*v[1]/1000)*100)/100},
  interp:function(s){return s>=5&&s<=8?['low',s+' L/min','Rango normal (5–8 L/min)']:['mid',s+' L/min','Fuera del rango habitual']}},

{id:'f-vt-protector', src:'ARDSnet — ventilación protectora', title:'Volumen Corriente Protector', sub:'6–8 mL/kg de peso ideal (Devine), no peso real', badge:'red', tag:'Ventilación', max:800, agg:'custom', items:[
  {t:'num', l:'Talla (cm)', u:'cm', f:function(v){return 0}},
  {t:'sel', l:'Sexo', o:[['Hombre',50],['Mujer',45.5]]}],
  calcCustom:function(v){var pbw=v[1]+0.9055*(v[0]-152.4); return Math.round(pbw*10)/10},
  interp:function(s){return ['low','PBW '+s+' kg','Volumen corriente objetivo: '+Math.round(s*6)+'–'+Math.round(s*8)+' mL (6–8 mL/kg de peso ideal)']}},

{id:'f-compliance-din', src:'Mecánica ventilatoria básica', title:'Compliance Dinámica', sub:'Vt/(P.pico − PEEP total)', badge:'blue', tag:'Ventilación', max:150, agg:'custom', items:[
  {t:'num', l:'Volumen corriente (mL)', u:'mL', f:function(v){return 0}},
  {t:'num', l:'Presión pico (cmH₂O)', u:'cmH₂O', f:function(v){return 0}},
  {t:'num', l:'PEEP total (cmH₂O)', u:'cmH₂O', f:function(v){return 0}}],
  calcCustom:function(v){var d=v[1]-v[2]; return d ? Math.round(v[0]/d) : 0},
  interp:function(s){return ['low',s+' mL/cmH₂O','Normal aproximado 50–80 mL/cmH₂O']}},

{id:'f-compliance-est', src:'Mecánica ventilatoria básica', title:'Compliance Estática', sub:'Vt/(P.meseta − PEEP total)', badge:'blue', tag:'Ventilación', max:150, agg:'custom', items:[
  {t:'num', l:'Volumen corriente (mL)', u:'mL', f:function(v){return 0}},
  {t:'num', l:'Presión meseta (cmH₂O)', u:'cmH₂O', f:function(v){return 0}},
  {t:'num', l:'PEEP total (cmH₂O)', u:'cmH₂O', f:function(v){return 0}}],
  calcCustom:function(v){var d=v[1]-v[2]; return d ? Math.round(v[0]/d) : 0},
  interp:function(s){return ['low',s+' mL/cmH₂O','Normal aproximado 60–100 mL/cmH₂O']}},

// ── Hemodinámica invasiva (UCI) ───────────────────────────────
{id:'f-indice-cardiaco', src:'Monitorización hemodinámica invasiva', title:'Índice Cardiaco', sub:'Gasto cardiaco / superficie corporal — normal 2,5–4 L/min/m²', badge:'amber', tag:'UCI', max:8, agg:'custom', items:[
  {t:'num', l:'Gasto cardiaco (L/min)', u:'L/min', f:function(v){return 0}},
  {t:'num', l:'Superficie corporal (m²)', u:'m²', f:function(v){return 0}}],
  calcCustom:function(v){return v[1] ? Math.round((v[0]/v[1])*100)/100 : 0},
  interp:function(s){return s>=2.5&&s<=4?['low',s+' L/min/m²','Normal (2,5–4)']:['high',s+' L/min/m²','Fuera del rango normal']}},

{id:'f-irvs', src:'Monitorización hemodinámica invasiva', title:'Índice de Resistencias Vasculares Sistémicas', sub:'((PAM−PVC)/IC)×80 — normal 1970–2390', badge:'amber', tag:'UCI', max:4000, agg:'custom', items:[
  {t:'num', l:'PAM (mmHg)', u:'mmHg', f:function(v){return 0}},
  {t:'num', l:'Presión venosa central, PVC (mmHg)', u:'mmHg', f:function(v){return 0}},
  {t:'num', l:'Índice cardiaco (L/min/m²)', u:'L/min/m²', f:function(v){return 0}}],
  calcCustom:function(v){return v[2] ? Math.round(((v[0]-v[1])/v[2])*80) : 0},
  interp:function(s){return s>=1970&&s<=2390?['low',s,'Normal (1970–2390 dyn·s/cm⁵/m²)']:s<1970?['high',s,'Bajo — vasoplejia/shock distributivo']:['high',s,'Alto — vasoconstricción/shock cardiogénico']}},

{id:'f-volumen-sistolico', src:'Monitorización hemodinámica invasiva', title:'Volumen Sistólico', sub:'Gasto cardiaco / frecuencia cardiaca', badge:'amber', tag:'UCI', max:150, agg:'custom', items:[
  {t:'num', l:'Gasto cardiaco (L/min)', u:'L/min', f:function(v){return 0}},
  {t:'num', l:'Frecuencia cardiaca (lpm)', u:'lpm', f:function(v){return 0}}],
  calcCustom:function(v){return v[1] ? Math.round((v[0]*1000/v[1])) : 0},
  interp:function(s){return ['low',s+' mL','Normal aproximado 60–90 mL/latido']}},

// ── Quemados y líquidos ────────────────────────────────────────
{id:'f-parkland', src:'ATLS 10ª/11ª ed.', title:'Fórmula de Parkland', sub:'Reposición en quemados — 50% en 8h, 50% en 16h siguientes', badge:'red', tag:'Líquidos', max:20000, agg:'custom', items:[
  {t:'sel', l:'Grupo etario', o:[['Adulto (2 mL/kg/%SCQ)',2],['Niño (3 mL/kg/%SCQ)',3]]},
  {t:'num', l:'Peso (kg)', u:'kg', f:function(v){return 0}},
  {t:'num', l:'% Superficie corporal quemada (SCQ)', u:'%', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round(v[0]*v[1]*v[2])},
  interp:function(s){return ['low',s+' mL/24h','Ringer lactato: '+Math.round(s/2)+' mL en las primeras 8h, '+Math.round(s/2)+' mL en las siguientes 16h (niños: sumar líquidos de mantenimiento basal)']}},

{id:'f-holliday-segar', src:'Regla de Holliday-Segar', title:'Líquidos de Mantenimiento (Holliday-Segar)', sub:'Necesidades basales de fluidos por peso', badge:'blue', tag:'Líquidos', max:5000, agg:'custom', items:[
  {t:'num', l:'Peso (kg)', u:'kg', f:function(v){return 0}}],
  calcCustom:function(v){var p=v[0]; var mld = p<=10 ? p*100 : p<=20 ? 1000+50*(p-10) : 1500+20*(p-20); return Math.round(mld)},
  interp:function(s){return ['low',s+' mL/día',(_fmt(s/24,1))+' mL/h de mantenimiento basal']}},

// ── Infusiones y dosis ─────────────────────────────────────────
{id:'f-goteo', src:'Cálculo estándar de goteo IV', title:'Cálculo de Goteo (gotas/min)', sub:'Macrogotero 20 gotas/mL · Microgotero 60 microgotas/mL', badge:'blue', tag:'Infusión', max:200, agg:'custom', items:[
  {t:'num', l:'Volumen total (mL)', u:'mL', f:function(v){return 0}},
  {t:'sel', l:'Factor de goteo', o:[['Macrogotero (20 gotas/mL)',20],['Microgotero (60 microgotas/mL)',60]]},
  {t:'num', l:'Tiempo (min)', u:'min', f:function(v){return 0}}],
  calcCustom:function(v){return v[2] ? Math.round((v[0]*v[1])/v[2]) : 0},
  interp:function(s){return ['low',s+' gotas/min','Regla práctica: con microgotero, microgotas/min = mL/hora']}},

{id:'f-regla-6', src:'Regla del 6 — Dopamina/Dobutamina', title:'Regla del 6', sub:'Facilita el ajuste rápido de aminas en emergencias', badge:'red', tag:'Infusión', max:1000, agg:'custom', items:[
  {t:'num', l:'Peso (kg)', u:'kg', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round(6*v[0])},
  interp:function(s){return ['low',s+' mg a diluir','Diluido en 50 mL: 1 mL/h = 1 mcg/kg/min · Diluido en 100 mL: 1 mL/h = 0,5 mcg/kg/min']}},

{id:'f-dosis-volumen', src:'Regla de tres para dilución de fármacos', title:'Volumen a Administrar (dosis estándar)', sub:'(Dosis prescrita × volumen disponible) / dosis disponible', badge:'blue', tag:'Infusión', max:100, agg:'custom', items:[
  {t:'num', l:'Dosis prescrita (mg o UI)', u:'', f:function(v){return 0}},
  {t:'num', l:'Volumen disponible del vial (mL)', u:'mL', f:function(v){return 0}},
  {t:'num', l:'Dosis disponible del vial (mg o UI)', u:'', f:function(v){return 0}}],
  calcCustom:function(v){return v[2] ? Math.round(((v[0]*v[1])/v[2])*100)/100 : 0},
  interp:function(s){return ['low',s+' mL','Volumen exacto a extraer/administrar']}},

// ── Pediatría ────────────────────────────────────────────────
{id:'f-peso-ped', src:'APLS por bandas de edad — PALS 2025 prioriza cinta de Broselow · PMID 41122862, PMID 28026862', title:'Peso Pediátrico Estimado', sub:'Solo si no hay cinta de Broselow/báscula disponible', badge:'amber', tag:'Pediatría', max:60, agg:'custom', items:[
  {t:'num', l:'Edad en meses (ej. 30 meses = 2,5 años)', u:'meses', f:function(v){return 0}}],
  calcCustom:function(v){var m=v[0], a=m/12, p;
    if (a<1) p = 0.5*m+4;
    else if (a<=5) p = 2*a+8;
    else p = 3*a+7;
    return Math.round(p*10)/10;
  },
  interp:function(s){return ['low',s+' kg','Estimación de referencia — preferir cinta de Broselow o báscula siempre que sea posible']}},

{id:'f-adrenalina-ped', src:'PALS — adrenalina en PCR pediátrica', title:'Adrenalina en PCR Pediátrica (IV/IO)', sub:'0,01 mg/kg — dosis máxima 1 mg', badge:'red', tag:'Pediatría', max:1, agg:'custom', items:[
  {t:'num', l:'Peso (kg)', u:'kg', f:function(v){return 0}}],
  calcCustom:function(v){return Math.min(Math.round(v[0]*0.01*100)/100, 1)},
  interp:function(s){return ['high',s+' mg','Equivale a '+_fmt(s*10,2)+' mL de la dilución 1:10.000 (0,1 mg/mL) · dosis máxima 1 mg (10 mL)']}},

{id:'f-tet-tamano', src:'Motoyama/Cole — tamaño de TET pediátrico', title:'Tamaño de Tubo Endotraqueal (TET)', sub:'Niños >1 año — diámetro interno en mm', badge:'red', tag:'Pediatría', max:10, agg:'custom', items:[
  {t:'num', l:'Edad (años, solo >1 año)', u:'años', f:function(v){return 0}},
  {t:'sel', l:'Tipo de tubo', o:[['Con manguito/balón (+3,5)',3.5],['Sin manguito/balón (+4)',4]]}],
  calcCustom:function(v){return Math.round((v[0]/4+v[1])*10)/10},
  interp:function(s){return ['low',s+' mm','Diámetro interno estimado. <1 año usar tallas estandarizadas: prematuro extremo 2,5 mm · prematuro 3,0 mm · a término–6 meses 3,5 mm · 6–12 meses 3,5–4,0 mm']}},

{id:'f-tet-profundidad', src:'Regla práctica de profundidad de TET', title:'Profundidad de Inserción del TET', sub:'Diámetro interno × 3 — desde la comisura labial', badge:'blue', tag:'Pediatría', max:30, agg:'custom', items:[
  {t:'num', l:'Diámetro interno del tubo (mm)', u:'mm', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round(v[0]*3*10)/10},
  interp:function(s){return ['low',s+' cm','Fijar a esta distancia en la comisura labial']}},

// ── Toxicología ────────────────────────────────────────────────
{id:'f-naloxona', src:'Dosis estándar de naloxona', title:'Naloxona (antídoto de opioides)', sub:'Adultos: dosis fija · niños: por peso', badge:'red', tag:'Tóxicos', max:2, agg:'custom', items:[
  {t:'num', l:'Peso (kg) — dejar en 0 si es adulto con dosis fija', u:'kg', f:function(v){return 0}}],
  calcCustom:function(v){return v[0]>0 ? Math.round(v[0]*0.01*100)/100 : 0},
  interp:function(s){return s>0?['high',s+' mg','Pediátrico: 0,01 mg/kg IV (hasta 0,1 mg/kg en parada), repetir cada 2–3 min']:['high','—','Adultos: 0,4–2 mg IV, repetir cada 2–3 min']}},

{id:'f-flumazenil', src:'Dosis estándar de flumazenil', title:'Flumazenil (antídoto de benzodiacepinas)', sub:'Precaución extrema en dependencia a BZD o epilepsia', badge:'red', tag:'Tóxicos', max:3, agg:'custom', items:[],
  calcCustom:function(){return 0},
  interp:function(){return ['high','0,2 mg IV en 15 s','Repetir 0,2 mg cada minuto hasta máximo 3 mg']}},

// ── Antropometría ────────────────────────────────────────────
{id:'f-peso-ideal', src:'Fórmula de Devine', title:'Peso Ideal (Devine)', sub:'Base para dosificación por peso ideal', badge:'blue', tag:'Antropometría', max:120, agg:'custom', items:[
  {t:'num', l:'Talla (cm)', u:'cm', f:function(v){return 0}},
  {t:'sel', l:'Sexo', o:[['Hombre',50],['Mujer',45.5]]}],
  calcCustom:function(v){return Math.round((v[1]+0.9055*(v[0]-152.4))*10)/10},
  interp:function(s){return ['low',s+' kg','Peso ideal estimado']}},

{id:'f-superficie-corporal', src:'Fórmula de Mosteller', title:'Superficie Corporal (Mosteller)', sub:'√[(peso × talla) / 3600]', badge:'blue', tag:'Antropometría', max:3, agg:'custom', items:[
  {t:'num', l:'Peso (kg)', u:'kg', f:function(v){return 0}},
  {t:'num', l:'Talla (cm)', u:'cm', f:function(v){return 0}}],
  calcCustom:function(v){return Math.round(Math.sqrt((v[0]*v[1])/3600)*100)/100},
  interp:function(s){return ['low',s+' m²','Superficie corporal estimada']}},

{id:'f-geb', src:'Ecuación de Harris-Benedict', title:'Gasto Energético Basal (Harris-Benedict)', sub:'Requerimiento calórico basal en reposo', badge:'blue', tag:'Antropometría', max:3000, agg:'custom', items:[
  {t:'num', l:'Peso (kg)', u:'kg', f:function(v){return 0}},
  {t:'num', l:'Talla (cm)', u:'cm', f:function(v){return 0}},
  {t:'num', l:'Edad (años)', u:'años', f:function(v){return 0}},
  {t:'sel', l:'Sexo', o:[['Hombre',1],['Mujer',0]]}],
  calcCustom:function(v){
    return v[3]===1
      ? Math.round(66.5+13.75*v[0]+5.003*v[1]-6.755*v[2])
      : Math.round(655.1+9.563*v[0]+1.850*v[1]-4.676*v[2]);
  },
  interp:function(s){return ['low',s+' kcal/día','Gasto energético basal — ajustar por factor de estrés/actividad clínica']}}

];
