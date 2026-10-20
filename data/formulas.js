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

{id:'f-na-correccion', copyDatos:true, src:'Spasovski 2014, guía europea · PMID 24569125 · alto riesgo: Verbalis 2013 · PMID 24074529', title:'Monitor de corrección de hiponatremia', sub:'Límite: 10 mEq/L las primeras 24 h y 8 cada 24 h siguientes · alto riesgo ≤8 en cualquier 24 h', badge:'red', tag:'Electrolitos', max:30, agg:'custom', items:[
  {t:'num', l:'Sodio inicial (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Sodio actual (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Horas desde la determinación inicial', u:'h', f:function(v){return 0}},
  {t:'sel', btn:true, l:'Alto riesgo de desmielinización osmótica (Na ≤105, alcoholismo, desnutrición, hepatopatía o hipopotasemia)', o:[['No',0],['Sí',1]]}],
  info:'Los límites cuentan también el ascenso espontáneo (aquaresis al corregir la causa) y el debido a reponer potasio. Objetivo habitual: 4–6 mEq/L al día. Pasadas 24 h, comprobar también cada ventana de 24 h por separado (el límite acumulado no basta). No sustituye las determinaciones seriadas',
  calcCustom:function(v){
    if (!v[0] || !v[1] || !v[2]) { this._na=null; return 0; }
    var h=v[2], d=v[1]-v[0];
    this._na={h:h, d:d, lim: v[3] ? 8*Math.max(h,24)/24 : (h<=24 ? 10 : 10+8*(h-24)/24), r24: d*24/h};
    return Math.round(d*10)/10;
  },
  interp:function(s){
    var n=this._na; if (!n) return ['low','—','Introducir sodio inicial, sodio actual y horas transcurridas'];
    var lim=Math.round(n.lim*10)/10, txt='Δ '+s+' mEq/L en '+n.h+' h (ritmo ≈ '+Math.round(n.r24*10)/10+' mEq/L/24 h) · límite para ese tiempo: '+lim+' mEq/L';
    if (n.d<0) return ['mid','Na descendiendo',txt+' — reevaluar causa y tratamiento'];
    if (n.d>n.lim) return ['high','Sobrecorrección',txt+' — detener el tratamiento activo y consultar; valorar volver a bajar el Na con agua libre (SG 5%) ± desmopresina'];
    if (n.d>n.lim-2) return ['mid','Cerca del límite',txt+' — frenar la corrección y repetir Na en 2–4 h'];
    if (n.h<24 && n.r24>n.lim*24/Math.max(n.h,24)) return ['mid','Ritmo excesivo',txt+' — a este ritmo se superará el límite antes de 24 h: frenar la corrección y repetir Na en 2–4 h'];
    return ['low','Dentro del límite',txt];
  }},

// ── Función renal ───────────────────────────────────────────────
{id:'f-ckd-epi', copyDatos:true, src:'CKD-EPI 2021 sin raza · Inker 2021, NEJM · PMID 34554658 · estadios KDIGO', title:'Filtrado glomerular (CKD-EPI 2021)', sub:'FGe indexado por 1,73 m² — estadificación de ERC', badge:'blue', tag:'Renal', max:150, agg:'custom', items:[
  {t:'num', l:'Creatinina sérica (mg/dL)', u:'mg/dL', f:function(v){return 0}},
  {t:'num', l:'Edad (años)', u:'años', f:function(v){return 0}},
  {t:'sel', btn:true, l:'Sexo', o:[['Hombre',0],['Mujer',1]]}],
  info:'No es fiable con creatinina inestable (fracaso renal agudo), sarcopenia marcada o extremos de peso. Para ajustar dosis, usar la estimación que exija la ficha técnica del fármaco: muchas (ACOD, enoxaparina) usan Cockcroft-Gault',
  calcCustom:function(v){
    if (!v[0] || !v[1]) return 0;
    var f=v[2]===1, k=f?0.7:0.9, a=f?-0.241:-0.302;
    return Math.round(142*Math.pow(Math.min(v[0]/k,1),a)*Math.pow(Math.max(v[0]/k,1),-1.2)*Math.pow(0.9938,v[1])*(f?1.012:1));
  },
  interp:function(s){return s===0?['low','—','Introducir creatinina y edad']:s>=90?['low',s+' mL/min/1,73 m²','G1 — normal o alto']:s>=60?['low',s+' mL/min/1,73 m²','G2 — levemente disminuido']:s>=45?['mid',s+' mL/min/1,73 m²','G3a — leve-moderadamente disminuido']:s>=30?['mid',s+' mL/min/1,73 m²','G3b — moderada-gravemente disminuido']:s>=15?['high',s+' mL/min/1,73 m²','G4 — gravemente disminuido']:['high',s+' mL/min/1,73 m²','G5 — fallo renal']}},

{id:'f-cockcroft', copyDatos:true, src:'Cockcroft y Gault 1976 · PMID 1244564', title:'Aclaramiento de creatinina (Cockcroft-Gault)', sub:'Ajuste de dosis según ficha técnica — peso real', badge:'blue', tag:'Renal', max:200, agg:'custom', items:[
  {t:'num', l:'Edad (años)', u:'años', f:function(v){return 0}},
  {t:'num', l:'Peso real (kg)', u:'kg', f:function(v){return 0}},
  {t:'num', l:'Creatinina sérica (mg/dL)', u:'mg/dL', f:function(v){return 0}},
  {t:'sel', btn:true, l:'Sexo', o:[['Hombre',0],['Mujer',1]]}],
  info:'(140 − edad) × peso / (72 × creatinina), × 0,85 en mujeres. No es fiable con creatinina inestable. No es intercambiable con el FGe de CKD-EPI: usar el umbral de la ficha técnica de cada fármaco',
  calcCustom:function(v){return v[0] && v[1] && v[2] ? Math.round((140-v[0])*v[1]/(72*v[2])*(v[3]===1?0.85:1)) : 0},
  interp:function(s){return s===0?['low','—','Introducir edad, peso y creatinina']:s>=80?['low',s+' mL/min','Sin ajuste renal habitual']:s>=50?['low',s+' mL/min','Leve — revisar ficha técnica']:s>=30?['mid',s+' mL/min','Moderado — ajuste frecuente (p. ej., ACOD, enoxaparina)']:s>=15?['high',s+' mL/min','Grave — muchos fármacos contraindicados o con ajuste importante']:['high',s+' mL/min','<15 — la mayoría de ACOD contraindicados']}},

// ── ECG ─────────────────────────────────────────────────────────
{id:'f-qtc', copyDatos:true, src:'Vandenberk 2016, JAHA · PMID 27317349 · umbrales AHA/ACCF/HRS 2009 · PMID 19281931', title:'QT corregido (Fridericia y Bazett)', sub:'Riesgo de torsade de pointes por fármacos — Fridericia preferente', badge:'red', tag:'ECG', max:700, agg:'custom', items:[
  {t:'num', l:'QT medido (ms)', u:'ms', f:function(v){return 0}},
  {t:'num', l:'Frecuencia cardíaca (lpm)', u:'lpm', f:function(v){return 0}},
  {t:'sel', btn:true, l:'Sexo', o:[['Hombre',0],['Mujer',1]]}],
  info:'Bazett sobreestima el QTc en taquicardia y lo subestima en bradicardia. Medir a mano y no fiarse de la fórmula si hay FA, ritmo de marcapasos o QRS ancho. Un aumento >60 ms respecto al basal también es señal de riesgo',
  calcCustom:function(v){
    if (!v[0] || !v[1]) { this._qt=null; return 0; }
    var rr=60/v[1]; this._qt={b:Math.round(v[0]/Math.sqrt(rr)), lim:v[2]===1?460:450};
    return Math.round(v[0]/Math.cbrt(rr));
  },
  interp:function(s){
    var q=this._qt; if (!q) return ['low','—','Introducir QT y frecuencia cardíaca'];
    var txt='Fridericia '+s+' ms · Bazett '+q.b+' ms (prolongado ≥'+q.lim+' ms en '+(q.lim===460?'mujeres':'hombres')+')';
    return s>=500?['high','QTc ≥500 ms',txt+' — alto riesgo de torsade: retirar fármacos que alargan el QT, corregir K y Mg, monitorizar']:s>=q.lim?['mid','QTc prolongado',txt+' — evitar añadir fármacos que alarguen el QT; corregir K y Mg']:['low','QTc normal',txt];
  }},

// ── Gasometría y compensación ácido-base ─────────────────────────
// Interpretación completa: calcCustom guarda el análisis en this._gas y interp lo lee
// (ambos se llaman como métodos del objeto). Campos vacíos = 0 = no aportado.
{id:'f-gasometria', copyDatos:true, src:'Berend 2014, NEJM · PMID 25295502 · AG y delta ratio: Fenves 2021 · PMID 34400023 · Reglas de Boston · PMID 9671365 · contrastado con Vera Health 2026-10', title:'Interpretación de gasometría arterial', sub:'Trastorno primario, compensación, AG, delta ratio, oxigenación y posibles causas', badge:'red', tag:'Gasometría', max:8, agg:'custom', items:[
  {t:'num', l:'pH', u:'pH', f:function(v){return 0}},
  {t:'num', l:'PaCO₂ (mmHg)', u:'mmHg', f:function(v){return 0}},
  {t:'num', l:'Bicarbonato, HCO₃ (mEq/L)', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'PaO₂ (mmHg) — opcional', u:'mmHg', f:function(v){return 0}},
  {t:'num', l:'FiO₂ (%) — opcional, 21 si se deja vacío', u:'%', f:function(v){return 0}},
  {t:'num', l:'Edad (años) — opcional, para el gradiente A-a', u:'años', f:function(v){return 0}},
  {t:'num', l:'Sodio (mEq/L) — opcional, para el AG', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Cloro (mEq/L) — opcional, para el AG', u:'mEq/L', f:function(v){return 0}},
  {t:'num', l:'Albúmina (g/dL) — opcional, corrige el AG', u:'g/dL', f:function(v){return 0}}],
  // Lector de informe pegado: busca cada etiqueta seguida de su número (acepta coma decimal,
  // subíndices y kPa). Devuelve {índice de item: valor} para rellenar los campos de arriba.
  paste:{l:'Pegar el informe del laboratorio (opcional: rellena los campos de abajo)', ph:'pH 7,25 · pCO2 30 · HCO3 14 · pO2 65 · FiO2 21 · Na 140 · Cl 104 · Alb 3,2',
    parse:function(txt){
      var t=txt.replace(/₂/g,'2').replace(/₃/g,'3').replace(/[⁻⁺]/g,''), out={}, m;
      var num='[^0-9\\n]{0,20}?(\\d+(?:[.,]\\d+)?)';
      var pats=[[0,'\\bpH\\b'],[1,'\\b(?:pa?CO2)\\b'],[3,'\\b(?:pa?O2)\\b'],[4,'\\bFiO2\\b'],[5,'\\bedad\\b'],
        [6,'\\bc?(?:Na|sodio)\\b'],[7,'\\bc?(?:Cl|cloro|cloruro)\\b'],[8,'\\balb(?:úmina|umina)?\\b']];
      pats.forEach(function(p){ m=t.match(new RegExp(p[1]+num,'i')); if (m) out[p[0]]=parseFloat(m[1].replace(',','.')); });
      // HCO3 real (actual), no el estándar: se descarta la coincidencia si va seguida de "st"/"std"/"est"
      var re=/(?:c?HCO3|bicarbonato)([^0-9\n]{0,20}?)(\d+(?:[.,]\d+)?)/gi;
      while ((m=re.exec(t))) { if (!/st|est/i.test(m[1])) { out[2]=parseFloat(m[2].replace(',','.')); break; } }
      if (out[2]==null && (m=t.match(/(?:c?HCO3|bicarbonato)[^0-9\n]{0,20}?(\d+(?:[.,]\d+)?)/i))) out[2]=parseFloat(m[1].replace(',','.'));
      if (/kPa/i.test(t)) [1,3].forEach(function(i){ if (out[i]!=null) out[i]=Math.round(out[i]*7.50062*10)/10; });
      if (out[8]!=null && out[8]>10) out[8]=Math.round(out[8])/10;
      if (out[0]!=null && (out[0]<6.5 || out[0]>8)) delete out[0];
      return out;
    }},
  causas:{
    agAlto:'<b>Acidosis metabólica con AG elevado:</b> cetoacidosis (diabética, alcohólica, ayuno) · acidosis láctica (shock, sepsis, hipoxia tisular, isquemia mesentérica, metformina, convulsiones) · insuficiencia renal · tóxicos: metanol, etilenglicol, salicilatos, propilenglicol, oxoprolina (paracetamol crónico) · D-lactato (intestino corto). Pedir lactato, cetonemia, creatinina y osmolalidad (gap osmolar >10 → alcoholes tóxicos)',
    agNormal:'<b>Acidosis metabólica con AG normal (hiperclorémica):</b> pérdidas digestivas de HCO₃ (diarrea, fístulas, derivaciones urinarias) · acidosis tubular renal (tipos I, II y IV/hipoaldosteronismo) · sueroterapia masiva con SF 0,9% · acetazolamida · ERC inicial. AG urinario (Na + K − Cl): negativo → digestiva; positivo → renal',
    metAlk:'<b>Alcalosis metabólica:</b> Cl⁻ urinario &lt;20 (cloro-sensible): vómitos, SNG, diuréticos previos, poshipercapnia, adenoma velloso · Cl⁻ urinario >20 (cloro-resistente): diuréticos actuales, hiperaldosteronismo, Cushing, hipopotasemia grave, Bartter/Gitelman, regaliz · aporte de álcalis (bicarbonato, citrato en transfusión masiva)',
    respAc:'<b>Acidosis respiratoria:</b> depresión del centro respiratorio (opioides, benzodiacepinas, sedantes, alcohol, lesión de tronco) · neuromuscular (Guillain-Barré, miastenia, ELA, hipopotasemia o hipofosfatemia grave) · pared torácica (obesidad-hipoventilación, cifoescoliosis, volet costal) · vía aérea y pulmón (EPOC agudizada, asma grave, obstrucción de vía aérea superior, EAP o neumonía extensa con fatiga) · VM con ventilación minuto insuficiente',
    respAlk:'<b>Alcalosis respiratoria:</b> hipoxemia (TEP, neumonía, asma, EAP, altitud) · dolor, ansiedad, fiebre · sepsis precoz · salicilatos (fase inicial) · insuficiencia hepática · embarazo · lesión del SNC · VM con ventilación minuto excesiva',
    hipoxNormal:'<b>Hipoxemia con gradiente A-a normal:</b> hipoventilación (ver causas de acidosis respiratoria) o FiO₂ inspirada baja (altitud)',
    hipoxAlto:'<b>Hipoxemia con gradiente A-a elevado:</b> alteración V/Q (EPOC, asma, TEP, neumonía), shunt (SDRA, atelectasia, EAP, shunt intracardiaco: no corrige con O₂) o trastorno de la difusión (EPID)'
  },
  analizar:function(v){
    var pH=v[0], pco2=v[1], hco3=v[2], pao2=v[3], fio2=v[4], edad=v[5], na=v[6], cl=v[7], alb=v[8];
    if (!pH || !pco2 || !hco3) return null;
    var r1=function(x){return Math.round(x*10)/10}, r2=function(x){return Math.round(x*100)/100};
    var C=this.causas, trast=[], lin=[], causas=[], grave=false;
    var add=function(k){if(causas.indexOf(C[k])===-1) causas.push(C[k])};

    var hh=6.1+Math.log10(hco3/(0.03*pco2));
    if (Math.abs(hh-pH)>0.05) lin.push('⚠ pH calculado por Henderson-Hasselbalch '+r2(hh)+' difiere >0,05 del medido: revisar transcripción o si la muestra es venosa');

    var ag=null, agc=null;
    if (na && cl) {
      ag=na-cl-hco3; agc=alb ? ag+2.5*(4-alb) : ag;
      lin.push('AG '+r1(ag)+(alb ? ' · corregido por albúmina '+r1(agc) : '')+' mEq/L (normal 8–12)');
    }
    var agAlto=agc!=null && agc>12;

    // Subtipo de acidosis metabólica por AG y delta ratio
    var acMet=function(){
      if (agc==null) { trast.push('Acidosis metabólica (AG no calculado: falta Na/Cl)'); add('agAlto'); add('agNormal'); return; }
      if (!agAlto) { trast.push('Acidosis metabólica con AG normal (hiperclorémica)'); add('agNormal'); lin.push('Un AG normal no excluye hiperlactatemia ni cetosis: medir lactato y β-hidroxibutirato si la clínica lo sugiere'); return; }
      trast.push('Acidosis metabólica con AG elevado'); add('agAlto');
      if (hco3<24) {
        var dr=(agc-12)/(24-hco3);
        lin.push('Delta ratio (ΔAG/ΔHCO₃) '+r2(dr)+' (1–2: sin otro componente evidente por este método; orientativo, gran variabilidad individual)');
        if (dr<1) { trast.push('+ sugiere acidosis metabólica con AG normal asociada'); add('agNormal'); }
        else if (dr>2) { trast.push('+ sugiere alcalosis metabólica asociada (o acidosis respiratoria crónica previa)'); add('metAlk'); }
      }
    };

    var acid=pH<7.35, alk=pH>7.45, hLow=hco3<22, hHigh=hco3>26, cHigh=pco2>45, cLow=pco2<35, exp, ag2, cr;
    // pH normal con PaCO₂ y HCO₃ alterados en el mismo sentido: el lado del pH respecto a 7,40
    // decide el trastorno primario y las reglas de compensación detectan el componente mixto
    if (!acid && !alk && ((cHigh && hHigh) || (cLow && hLow))) {
      lin.push('pH en rango normal con PaCO₂ y HCO₃ alterados: trastorno compensado o mixto');
      if (cHigh) { if (pH<=7.40) { acid=true; hHigh=false; } else { alk=true; cHigh=false; } }
      else { if (pH>=7.40) { alk=true; hLow=false; } else { acid=true; cLow=false; } }
    }
    if (acid && hLow && !cHigh) {
      acMet();
      exp=1.5*hco3+8;
      lin.push('Winters: PaCO₂ esperada '+r1(exp)+' ±2 mmHg (medida '+pco2+')');
      if (pco2>exp+2) { trast.push('+ acidosis respiratoria asociada (compensación insuficiente)'); add('respAc'); }
      else if (pco2<exp-2) { trast.push('+ alcalosis respiratoria asociada'); add('respAlk'); }
      else lin.push('Compensación respiratoria adecuada');
    } else if (acid && cHigh && !hLow) {
      ag2=24+0.1*(pco2-40); cr=24+0.35*(pco2-40);
      lin.push('HCO₃ esperado (estimación, reglas de Boston; pueden sobreestimar la compensación en hipercapnia): agudo '+r1(ag2)+' · crónico '+r1(cr)+' (factor 0,35–0,40) mEq/L (medido '+hco3+')');
      if (hco3<ag2-2) { trast.push('Acidosis respiratoria'); add('respAc'); acMet(); }
      else if (hco3>cr+2) { trast.push('Acidosis respiratoria + alcalosis metabólica asociada'); add('respAc'); add('metAlk'); }
      else if (hco3<=ag2+2) { trast.push('Acidosis respiratoria aguda'); add('respAc'); }
      else if (hco3>=cr-2) { trast.push('Acidosis respiratoria crónica compensada'); add('respAc'); }
      else { trast.push('Acidosis respiratoria crónica reagudizada'); add('respAc'); }
    } else if (acid && hLow && cHigh) {
      trast.push('Acidosis mixta: respiratoria'); add('respAc'); acMet();
    } else if (alk && hHigh && !cLow) {
      trast.push('Alcalosis metabólica'); add('metAlk');
      exp=0.7*hco3+20;
      lin.push('PaCO₂ esperada '+r1(exp)+' ±5 mmHg (medida '+pco2+')');
      if (pco2>exp+5) { trast.push('+ acidosis respiratoria asociada'); add('respAc'); }
      else if (pco2<exp-5) { trast.push('+ alcalosis respiratoria asociada'); add('respAlk'); }
      else lin.push('Compensación respiratoria adecuada');
      if (agAlto) { trast.push('+ acidosis metabólica con AG elevado oculta'); add('agAlto'); }
    } else if (alk && cLow && !hHigh) {
      ag2=24-0.2*(40-pco2); cr=24-0.5*(40-pco2);
      lin.push('HCO₃ esperado (estimación, reglas de Boston): agudo '+r1(ag2)+' · crónico '+r1(cr)+' mEq/L (medido '+hco3+')');
      if (hco3>ag2+2) { trast.push('Alcalosis respiratoria + alcalosis metabólica asociada'); add('respAlk'); add('metAlk'); }
      else if (hco3<cr-2) { trast.push('Alcalosis respiratoria'); add('respAlk'); acMet(); }
      else if (hco3>=ag2-2) { trast.push('Alcalosis respiratoria aguda'); add('respAlk'); }
      else { trast.push('Alcalosis respiratoria crónica'); add('respAlk'); }
      if (agAlto && trast.join().indexOf('AG elevado')===-1) { trast.push('+ acidosis metabólica con AG elevado asociada'); add('agAlto'); }
    } else if (alk && hHigh && cLow) {
      trast.push('Alcalosis mixta: metabólica + respiratoria'); add('metAlk'); add('respAlk');
    } else if (!acid && !alk && agAlto) {
      trast.push('pH normal con AG elevado: acidosis metabólica con AG elevado + alcalosis metabólica'); add('agAlto'); add('metAlk');
    } else if (!acid && !alk && !cHigh && !cLow && !hLow && !hHigh) {
      trast.push('Equilibrio ácido-base normal');
    } else {
      trast.push('Patrón no concordante: revisar los valores introducidos');
    }
    var tl=trast.join(' ').toLowerCase();
    if (tl.indexOf('alcalosis respiratoria')!==-1 && tl.indexOf('ag elevado')!==-1)
      lin.push('Perla: acidosis con AG elevado + alcalosis respiratoria → pensar en salicilatos o sepsis');

    if (pao2) {
      var f=fio2 ? (fio2<=1 ? fio2*100 : fio2) : 21;
      var pf=pao2/(f/100), grad=(713*f/100)-pco2/0.8-pao2, gEsp=edad ? edad/4+4 : null;
      lin.push('PaO₂/FiO₂ '+Math.round(pf)+(fio2 ? '' : ' (asumiendo FiO₂ 21%)')+(pf<=300 ? ' — ≤300: si SDRA (Berlín, PEEP ≥5): leve 200–300 · moderado 100–200 · grave ≤100' : ''));
      lin.push('Gradiente A-a '+r1(grad)+' mmHg'+(gEsp ? ' (esperado ≈ '+r1(gEsp)+')' : ' (introducir edad para el esperado)')+(f>21 ? ' — menos fiable con FiO₂ >21%' : ''));
      if (pao2<60) {
        grave=true;
        trast.push('Insuficiencia respiratoria '+(pco2>45 ? 'tipo 2 (hipercápnica)' : 'tipo 1 (hipoxémica)'));
        if (gEsp) add(grad>gEsp ? 'hipoxAlto' : 'hipoxNormal');
      }
    }
    if (pH<7.2 || pH>7.55) grave=true;
    var normal=trast.length===1 && trast[0]==='Equilibrio ácido-base normal';
    return {
      cls: grave ? 'high' : normal ? 'low' : 'mid',
      risk: trast.join(' · '),
      det: '<div style="text-align:left">'+lin.map(function(l){return '<div>'+l+'</div>'}).join('\n')+
        (causas.length ? '\n<div style="margin-top:6px"><b>Posibles causas</b></div>\n'+causas.map(function(c){return '<div>• '+c+'</div>'}).join('\n') : '')+'</div>'
    };
  },
  calcCustom:function(v){this._gas=this.analizar(v); return this._gas ? Math.round(v[0]*100)/100 : 0},
  interp:function(s){return this._gas ? [this._gas.cls, this._gas.risk, this._gas.det] : ['low','—','Introducir al menos pH, PaCO₂ y HCO₃']}},

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
{id:'f-rox', copyDatos:true, src:'Roca 2019, Am J Respir Crit Care Med · PMID 30576221', title:'Índice ROX', sub:'Alto flujo nasal en neumonía — predicción de fracaso', badge:'red', tag:'Ventilación', max:30, agg:'custom', items:[
  {t:'num', l:'SpO₂ (%)', u:'%', f:function(v){return 0}},
  {t:'num', l:'FiO₂ (% o fracción)', u:'%', f:function(v){return 0}},
  {t:'num', l:'Frecuencia respiratoria (rpm)', u:'rpm', f:function(v){return 0}},
  {t:'sel', btn:true, l:'Tiempo desde el inicio del alto flujo', o:[['2 h',2],['6 h',6],['12 h',12]]}],
  info:'ROX = (SpO₂/FiO₂)/FR. Validado en neumonía con insuficiencia respiratoria hipoxémica en alto flujo. Es una asociación pronóstica: no ordena intubar ni autoriza a retrasar la intubación',
  calcCustom:function(v){
    if (!v[0] || !v[1] || !v[2]) { this._rox=null; return 0; }
    var f=v[1]>1 ? v[1]/100 : v[1]; this._rox={h:v[3]};
    return Math.round((v[0]/f)/v[2]*100)/100;
  },
  interp:function(s){
    if (!this._rox) return ['low','—','Introducir SpO₂, FiO₂ y frecuencia respiratoria'];
    var h=this._rox.h, lim={2:2.85,6:3.47,12:3.85}[h];
    return s>=4.88?['low','ROX '+s,'≥4,88 a las '+h+' h: menor riesgo de fracaso del alto flujo']:s<lim?['high','ROX '+s,'<'+lim+' a las '+h+' h: alto riesgo de fracaso — valorar intubación']:['mid','ROX '+s,'Zona indeterminada a las '+h+' h — reevaluar en 1–2 h'];
  }},

{id:'f-horowitz',src:'Criterios de Berlín para SDRA', title:'Índice de Horowitz (P/F)', sub:'PaO₂/FiO₂ — gravedad del SDRA', badge:'red', tag:'Ventilación', max:600, agg:'custom', items:[
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
{id:'f-regla9', copyDatos:true, src:'Regla de los 9 de Wallace (Lancet 1951) · recogida en la guía de quemaduras de Yoshino 2016, J Dermatol', title:'Superficie corporal quemada (regla de los 9)', sub:'Adulto — % SCQ para la fórmula de Parkland', badge:'red', tag:'Líquidos', max:100, agg:'custom', items:[
  {t:'num', l:'Cabeza y cuello (9%) — % de la región quemada', u:'%', f:function(v){return 0}},
  {t:'num', l:'Miembro superior derecho, con mano (9%) — % quemado', u:'%', f:function(v){return 0}},
  {t:'num', l:'Miembro superior izquierdo, con mano (9%) — % quemado', u:'%', f:function(v){return 0}},
  {t:'num', l:'Tronco anterior (18%) — % quemado', u:'%', f:function(v){return 0}},
  {t:'num', l:'Tronco posterior (18%) — % quemado', u:'%', f:function(v){return 0}},
  {t:'num', l:'Miembro inferior derecho, con pie (18%) — % quemado', u:'%', f:function(v){return 0}},
  {t:'num', l:'Miembro inferior izquierdo, con pie (18%) — % quemado', u:'%', f:function(v){return 0}},
  {t:'num', l:'Periné (1%) — % quemado', u:'%', f:function(v){return 0}}],
  info:'Indicar qué porcentaje de cada región está quemado (100 = región completa). Incluir quemaduras de espesor parcial y total; excluir el eritema epidérmico aislado. Estimación rápida para adultos: en niños usar Lund-Browder',
  calcCustom:function(v){var w=[9,9,9,18,18,18,18,1], s=0; for (var i=0;i<8;i++) s+=w[i]*Math.min(Math.max(v[i],0),100)/100; return Math.round(s*10)/10},
  interp:function(s){return s===0?['low','—','Introducir el % quemado de cada región afectada']:s>=20?['high',s+'% SCQ','Usar este % en la fórmula de Parkland; reposición formal habitual a partir del 20% en adultos']:['mid',s+'% SCQ','Usar este % en la fórmula de Parkland si se indica reposición']}},

{id:'f-parkland',src:'ATLS 10ª/11ª ed.', title:'Fórmula de Parkland', sub:'Reposición en quemados — 50% en 8h, 50% en 16h siguientes', badge:'red', tag:'Líquidos', max:20000, agg:'custom', items:[
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
{id:'f-peso-ped', src:'APLS por bandas de edad · ERC/EPALS 2025: (edad+4)×2 · PALS 2025 prioriza cinta de Broselow · PMID 41122862, PMID 28026862', title:'Peso Pediátrico Estimado', sub:'Solo si no hay cinta de Broselow/báscula disponible', badge:'amber', tag:'Pediatría', max:60, agg:'custom', items:[
  {t:'num', l:'Edad en meses (ej. 30 meses = 2,5 años)', u:'meses', f:function(v){return 0}},
  {t:'sel', l:'Método', o:[['APLS por bandas',0],['ERC/EPALS 2025: 3-6-10 kg (0-6-12 m) · (edad+4)×2 de 1 a 12 años',1]]}],
  calcCustom:function(v){var m=v[0], a=m/12, p;
    if (v[1]===1) {
      if (a<1) p = m<=6 ? 3+0.5*m : 6+(m-6)*(4/6);
      else p = (a+4)*2;
    } else {
      if (a<1) p = 0.5*m+4;
      else if (a<=5) p = 2*a+8;
      else p = 3*a+7;
    }
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
  interp:function(s){return ['low',s+' cm','Fijar a esta distancia en la comisura labial · alternativa ERC/EPALS 2025 por edad en la fórmula siguiente']}},

{id:'f-tet-prof-edad', src:'ERC Paediatric Life Support 2025 (curso EPALS 2025)', title:'Profundidad del TET por edad (ERC)', sub:'Oral 12 + edad/2 · nasal 15 + edad/2 (niños >1 año)', badge:'blue', tag:'Pediatría', max:30, agg:'custom', items:[
  {t:'num', l:'Edad (años)', u:'años', f:function(v){return 0}},
  {t:'sel', l:'Vía', o:[['Oral (12 + edad/2)',12],['Nasal (15 + edad/2)',15]]}],
  calcCustom:function(v){return Math.round((v[1]+v[0]/2)*10)/10},
  interp:function(s){return ['low',s+' cm','Longitud más allá de labios/narina. No sustituye la confirmación clínica, capnográfica y radiológica']}},

// ── Toxicología ────────────────────────────────────────────────
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
