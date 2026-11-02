/* ==================================================================
   PROTOCOLS — algoritmos de actuación paso a paso
   steps: {type:'action'|'decision'|'info', text, yes, no, branch:'yes'|'no'}
   Referencias: guías ERC/AHA, DAS (vía aérea difícil), SEM Gencat
   ================================================================== */
/* Patrones ECG de oclusión coronaria (OMI): galería del Codi IAM y desplegable de su flujograma. */
const PATRONES_OMI = [
      {file:'Ondas T hiperagudas.jpg', label:'Ondas T hiperagudas',
        criterios:'Ondas T altas, de base ancha, simétricas y desproporcionadas respecto al QRS precedente, en ≥2 derivaciones contiguas. Suelen preceder a la elevación del ST. Excluir hiperpotasemia, HVI y repolarización precoz.',
        arteria:'Según distribución: V1–V4 → DA · II/III/aVF → CD o Cx · I/aVL/V5–V6 → Cx o diagonal',
        significado:'Sin criterios STEMI, hasta 84% tienen lesión culpable de IAM (especificidad 98%) — angiografía urgente.',
        fuente:'Meyers 2025, JACC Adv · PMID 40892623'},
      {file:'Patron de Winter.jpg', label:'Patrón de Winter',
        criterios:'Depresión del ST ≥1 mm ascendente en el punto J en V1–V6 con ondas T altas y simétricas, sin elevación del ST precordial · ST elevado 1–3 mm en aVR',
        arteria:'DA proximal, habitualmente proximal a la primera perforante septal',
        significado:'Equivalente OMI formalmente reconocido — indicación de angiografía inmediata.',
        fuente:'Kontos 2022, ACC Expert Consensus · PMID 36241466'},
      {file:'Patron Wellens.jpg', label:'Patrón de Wellens',
        criterios:'Tipo A: T bifásica en V2–V3. Tipo B: T invertida profunda y simétrica (≥2 mm) en V2–V3. Progresión de onda R conservada, registrado en fase asintomática (post-reperfusión).',
        arteria:'DA proximal — estenosis crítica (sin oclusión total en el momento del registro)',
        significado:'Patrón de preinfarto: >75% de IAM anterior en días–semanas sin revascularización. NO realizar ergometría — riesgo de oclusión completa.',
        fuente:'Kontos 2022, ACC Expert Consensus · PMID 36241466'},
      {file:'Patron Aslanger.jpg', label:'Patrón de Aslanger',
        criterios:'Elevación del ST aislada en III (≥1 mm) sin cumplir criterios STEMI inferior (no ≥1 mm en ≥2 de II/III/aVF) + depresión del ST en V4–V6 que enmascara la elevación inferior',
        arteria:'CD, con enfermedad concomitante de la DA (multivaso)',
        significado:'Muy específico de OMI inferior en enfermedad multivaso; frecuentemente mal clasificado como NSTEMI con manejo diferido — mortalidad hospitalaria elevada.',
        fuente:'Aslanger 2020, J Electrocardiol; serie de casos 2025 · PMID 41445864'},
      {file:'Patron de remolino - swirl.jpg', label:'Patrón de remolino (swirl sign)',
        criterios:'Elevación del ST y/o T hiperagudas en V1–V2 con depresión recíproca del ST y/o inversión de T en V5–V6 (rotación horaria del vector ST en el precordio)',
        arteria:'DA proximal, habitualmente proximal a la primera perforante septal',
        significado:'Alta especificidad para OMI por oclusión de DA proximal.',
        fuente:'Verificado con Perplexity 2025 · PMID 40319770 — Vera Health expresó incertidumbre sobre la definición exacta; se prioriza esta fuente'},
      {file:'OMI inferobasal - posterior.jpg', label:'OMI inferobasal-posterior',
        criterios:'Depresión del ST máxima en V1–V4 (STDmaxV1–4) de cualquier magnitud, no explicada por causa no isquémica · confirmar con derivaciones posteriores V7–V9 (STE ≥0,5 mm)',
        arteria:'CD (más frecuente), Cx, ramas obtusas marginales o descendente posterior',
        significado:'Más de la mitad de los IAM posteriores son "STEMI-negativos" — se pierden si no se buscan activamente. Solicitar V7–V9 si hay STD en V1–V3.',
        fuente:'Meyers 2021, JAHA · PMID 34775811'},
      {file:'Northen OMI.jpg', label:'Patrón «Northern OMI» (North sign)',
        criterios:'Elevación del ST en aVR y aVL con onda T negativa + depresión del ST en derivaciones inferiores y laterales (II, III, aVF, V4–V6) con onda T positiva o bifásica',
        arteria:'Oclusión de la bifurcación de la primera diagonal de la DA (también en enfermedad multivaso)',
        significado:'Patrón OMI anterior alto/proximal — terminología reciente de expertos OMI, aún fuera de guías mayores clásicas.',
        fuente:'Verificado con Perplexity 2025 — terminología reciente, fuera de guías formales'},
      {file:'Distorsion terminal QRS.jpg', label:'Distorsión terminal del QRS',
        criterios:'Ausencia simultánea de onda S y de muesca en el punto J, en V5 o V6',
        arteria:'DA proximal o media',
        significado:'Marcador de isquemia transmural grave y completa; distingue oclusión verdadera de repolarización precoz benigna en STEMI límite.',
        fuente:'Birnbaum 1993, Circulation; validado por Meyers 2021 · PMID 34775811'},
      {file:'Signo de la bandera de sudafrica.jpg', label:'Signo de la bandera de Sudáfrica',
        criterios:'Elevación del ST en I, aVL y V2 con depresión recíproca en III (a menudo también aVF)',
        arteria:'Oclusión de la primera diagonal (D1) de la DA — IAM lateral alto/anterolateral',
        significado:'Discrepancia detectada: Vera Health describió inicialmente otra definición (aVR + depresión difusa, propia del patrón de tronco común/triple vaso). Perplexity y la imagen original confirman que el signo real es I/aVL/V2 + III → D1. No confundir ambos patrones.',
        fuente:'Verificado con Perplexity 2025 · PMC10413884, PMC12040377'},
      {file:'criterios Sgarbossa.jpg', label:'Criterios de Sgarbossa modificados (Smith)',
        criterios:'1) Concordancia STE ≥1 mm en derivación con QRS positivo · 2) Concordancia STD ≥1 mm en V1–V3 · 3) Discordancia excesiva: STE ≥1 mm y cociente ST/S ≤ −0,25 (sustituye el umbral fijo ≥5 mm del Sgarbossa original) — basta 1 criterio positivo',
        arteria:'Variable — indica oclusión coronaria aguda en presencia de BRIHH o ritmo de marcapasos',
        significado:'Sensibilidad 91% vs. 52% del Sgarbossa original; validado también en ritmo de marcapasos ventricular. Tratar como equivalente STEMI.',
        fuente:'Smith 2012 · PMID 22939607; Meyers 2015 · PMID 26678648; Dodd 2021 · PMID 34172301'},
      {file:'nuevo bloqueo bifascicular.jpg', label:'Bloqueo bifascicular de nueva aparición',
        criterios:'BRIHH + hemibloqueo anterior (o posterior) izquierdo de nueva aparición en el contexto de SCA',
        arteria:'DA proximal (las perforantes septales irrigan la rama derecha y el fascículo anterior)',
        significado:'Riesgo de progresión a bloqueo AV completo (~20–40%) — preparar marcapasos transcutáneo. Predictor independiente de mortalidad. Angiografía urgente + monitorización con capacidad de estimulación.',
        fuente:'2025 ACC/AHA/ACEP/NAEMSP/SCAI ACS Guideline · PMID 40013746'}
];

window.PROTOCOLS = [

{id:'anafilaxia', title:'Anafilaxia', sub:'Adrenalina IM inmediata — ERC 2025', badge:'red', tag:'Crítico', rank:8, steps:[
  {type:'action', text:'Retirar el desencadenante si es posible (fármaco IV, picadura). NO retrasar la adrenalina por esto'},
  {type:'action', text:'ADRENALINA IM 0,5 mg (0,5 mL de solución 1 mg/mL = 1:1000) en cara anterolateral del muslo (vasto lateral), lo antes posible.\nAlternativa ponderal equivalente: 0,01 mg/kg IM, máximo 0,5 mg.\nNiños por edad (ERC 2025): 1–5 años 0,15 mg · 6–12 años 0,3 mg · >12 años 0,5 mg (o 0,01 mg/kg, máx. 0,5 mg)'},
  {type:'info', text:'IM en muslo, NO subcutánea ni en deltoides. Autoinyector en adultos: 0,5 mg (ERC First Aid 2025)'},
  {type:'info', text:'CUIDADO CON LA AMPOLLA: 1 mg/mL (1:1000) es la de uso IM. 0,1 mg/mL (1:10.000) es la de uso IV/IO. Administrar por vía IV la ampolla de 1 mg/mL es una causa clásica de sobredosis grave'},
  {type:'action', text:'Posición: decúbito supino con piernas elevadas. Si disnea, semiincorporado. Si embarazo, decúbito lateral izquierdo.\nNO sentar ni levantar bruscamente'},
  {type:'action', text:'Oxígeno a alto flujo + acceso IV de grueso calibre + monitorización continua'},
  {type:'decision', text:'¿Persisten los síntomas a los 5 minutos?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'REPETIR adrenalina IM 0,5 mg. Se puede repetir cada 5 min según respuesta'},
  {type:'action', branch:'yes', text:'Fluidoterapia: cristaloide 500–1000 mL IV rápido si hipotensión; repetir según respuesta'},
  {type:'action', branch:'yes', text:'Refractaria tras ≥2 dosis IM, con monitorización completa y personal experto: PERFUSIÓN IV de adrenalina 0,1 µg/kg/min, titulando a efecto (ERC 2025).\nPreparación práctica: 1 mg en 250 mL de SSF o SG5% = 4 µg/mL.\nNO dar bolo IV fuera de la parada: se asocia a más sobredosis y más eventos cardiovasculares que la vía IM'},
  {type:'action', branch:'no', text:'Mantener monitorización: riesgo de reacción bifásica'},
  {type:'action', text:'PARADA CARDIACA POR ANAFILAXIA: SVA estándar (protocolo RCP / SVA). Adrenalina 1 mg IV/IO cada 3–5 min (niños 10 µg/kg, máx. 1 mg). Fluidos IV en bolo rápido (ERC 2025)'},
  {type:'info', text:'Broncoespasmo asociado: salbutamol nebulizado como adyuvante, nunca en sustitución de la adrenalina'},
  {type:'info', text:'Corticoide y antihistamínico son de segunda línea: no salvan la vida ni sustituyen a la adrenalina'},
  {type:'info', text:'Observación antes del alta según gravedad y respuesta. Alta con autoinyector, plan escrito y derivación a alergología'}],
  src:'ERC 2025 Special Circumstances · PMID 41117569 · ERC 2025 First Aid · PMID 41117568 · Actualizacion de evidencia en anafilaxia: Dodd 2021 · PMID 33895231 · Preparacion de la perfusion IV: LoVerde 2017 · PMID 28800865'},

{id:'fa-rapida', title:'FA con respuesta ventricular rápida', sub:'Control de frecuencia vs cardioversión — ESC 2024', badge:'amber', tag:'Urgente', rank:13, steps:[
  {type:'action', text:'ECG de 12 derivaciones. Descartar preexcitación (QRS ancho, delta): contraindica frenar el nodo AV'},
  {type:'decision', text:'¿Inestabilidad hemodinámica ATRIBUIBLE a la FA? (shock, hipotensión mantenida, edema agudo de pulmón, isquemia en curso)', yes:'Inestable', no:'Estable'},
  {type:'action', branch:'yes', text:'CARDIOVERSIÓN ELÉCTRICA SINCRONIZADA inmediata. No retrasar por la duración de la FA ni por completar anticoagulación'},
  {type:'action', branch:'yes', text:'Anticoagular en cuanto sea factible, tras la cardioversión'},
  {type:'action', branch:'no', text:'CONTROL DE FRECUENCIA + buscar y tratar desencadenante (sepsis, anemia, hipoxemia, iones, TEP, hipertiroidismo, alcohol)'},
  {type:'info', text:'Estrategia "wait-and-see": en FA <36 h estable, la cardioversión diferida fue NO INFERIOR a la precoz para ritmo sinusal a 4 semanas (91% vs 94%). El 69% revirtió solo en ≤48 h — RACE 7 ACWAS'},
  {type:'action', branch:'no', text:'FEVI conservada (>40%): betabloqueante o diltiazem/verapamilo IV, titulado'},
  {type:'action', branch:'no', text:'Hipotensión límite o IC descompensada: EVITAR diltiazem/verapamilo. Usar amiodarona IV o digoxina IV (ajustar digoxina por función renal)'},
  {type:'info', text:'Objetivo inicial: aliviar síntomas. El control leniente (FC <110 lpm en reposo) es aceptable de entrada'},
  {type:'info', text:'VENTANA DE SEGURIDAD ESC 2024: bajó de 48 h a 24 h. Con FA >24 h o de inicio incierto SIN anticoagulación previa eficaz, NO cardiovertir a ciegas: ETE o 3 semanas de anticoagulación antes'},
  {type:'action', text:'Anticoagulación a largo plazo por CHA₂DS₂-VA (ESC 2024): ≥2 recomendada, =1 considerar. Mantener ≥4 semanas tras cardioversión en todos'},
  {type:'info', text:'La duración referida por el paciente puede ser falsa si hubo FA asintomática previa. Prudencia en ancianos y cardiopatía estructural'}],
  src:'ESC 2024 · PMID 39210723 · RACE 7 ACWAS NEJM 2019 · PMID 30883054 · AHA ALS 2025 · PMID 41122884'},

{id:'rcp', title:'RCP / SVA', sub:'Soporte vital avanzado adulto — ritmo desfibrilable vs no desfibrilable', badge:'red', tag:'Crítico', rank:6, steps:[
  {type:'action', text:'Confirmar PCR: inconsciente, no respira con normalidad (o gasping), sin pulso central palpable (máx. 10 seg)'},
  {type:'action', text:'Iniciar RCP básica de calidad: 30 compresiones : 2 ventilaciones, conectar monitor/desfibrilador en cuanto esté disponible'},
  {type:'action', text:'Analizar ritmo con palas/parches — minimizar interrupciones de las compresiones'},
  {type:'decision', text:'¿Ritmo desfibrilable (FV / TV sin pulso)?', yes:'FV/TVSP', no:'Asistolia/AESP'},
  {type:'action', branch:'yes', text:'Descarga inmediata (bifásico 150–200 J) → reanudar RCP 2 min sin pausa para comprobar ritmo/pulso'},
  {type:'action', branch:'yes', text:'Tras la 3ª descarga: amiodarona 300 mg IV/IO en bolo + adrenalina 1 mg IV/IO'},
  {type:'action', branch:'yes', text:'Tras la 5ª descarga: amiodarona 150 mg IV/IO adicional; adrenalina 1 mg cada 3–5 min'},
  {type:'action', branch:'no', text:'Adrenalina 1 mg IV/IO tan pronto como se consiga acceso, repetir cada 3–5 min'},
  {type:'action', branch:'no', text:'RCP continua 2 min entre análisis de ritmo — no desfibrilar'},
  {type:'info', text:'Buscar y tratar causas reversibles: 4H (Hipoxia, Hipovolemia, Hipo/Hiperpotasemia-metabólico, Hipotermia) + 4T (Neumotórax a Tensión, Taponamiento cardíaco, Tóxicos, Trombosis pulmonar/coronaria)'},
  {type:'info', text:'Capnografía (EtCO₂) continua para valorar calidad de RCP y detectar ROSC precoz; ecografía a pie de cama si disponible sin interrumpir compresiones'}
],
  src:'ERC 2025 Adult ALS · PMID 41117572 · AHA ALS 2025 · PMID 41122884'
},

{id:'via-aerea-dificil', title:'Vía aérea difícil', sub:'Algoritmo DAS 2025 — Plan A → B → C → D', badge:'red', tag:'Crítico', rank:7, steps:[
  {type:'action', text:'Preoxigenar con FiO₂ 100%, optimizar posición (olfateo/rampa) y preparación del material antes del primer intento'},
  {type:'action', text:'Plan A: laringoscopia directa o videolaringoscopia — máximo 3 intentos + 1 intento adicional por el operador más experto (4 en total)'},
  {type:'decision', text:'¿Intubación exitosa?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Confirmar posición con capnografía continua y auscultación bilateral; fijar el tubo'},
  {type:'action', branch:'no', text:'Plan B: colocar dispositivo supraglótico (mascarilla laríngea) — máximo 2 intentos'},
  {type:'decision', text:'¿Ventilación adecuada con el dispositivo supraglótico?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Continuar oxigenando con el DSG; valorar despertar al paciente o vía aérea definitiva diferida y planificada'},
  {type:'action', branch:'no', text:'Plan C: mascarilla facial con ventilación a dos manos + cánula orofaríngea/nasofaríngea, oxígeno al máximo'},
  {type:'decision', text:'¿Situación "no intubación, no oxigenación" (NINO)?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Plan D: cricotiroidotomía de emergencia (técnica quirúrgica o con kit) — no demorar'},
  {type:'info', text:'Declarar en voz alta la situación de vía aérea difícil desde el primer fallo y pedir ayuda precoz (anestesia/ORL); tener siempre un plan B preparado antes de iniciar'}
],
  src:'Difficult Airway Society 2025 · PMID 41203471'
},

{id:'sri', title:'Secuencia rápida de intubación (SRI)', sub:'Preparación, preoxigenación, inducción y relajación', badge:'red', tag:'Crítico', rank:9, steps:[
  {type:'action', text:'Preparación: checklist de equipo (succión, oxígeno, vía aérea con tubos y plan B, fármacos, monitor) — confirmar plan B/C definidos'},
  {type:'action', text:'Preoxigenación: FiO₂ 100% durante 3–5 min (o 8 respiraciones a capacidad vital máxima si urgencia)'},
  {type:'decision', text:'¿Riesgo de respuesta simpática/dolor (TCE, cardiopatía, aneurisma)?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Premedicación: fentanilo 1–3 mcg/kg IV, 3 min antes de la inducción'},
  {type:'action', text:'Inducción según estabilidad hemodinámica: propofol 1.5–2.5 mg/kg (estable) · etomidato 0.3 mg/kg (inestable) · ketamina 1–2 mg/kg (shock/broncoespasmo)'},
  {type:'action', text:'Relajante neuromuscular: succinilcolina 1–1.5 mg/kg (inicio rápido) o rocuronio 1–1.2 mg/kg si contraindicación a succinilcolina'},
  {type:'action', text:'Intubación orotraqueal tras relajación completa (≈45–60 seg)'},
  {type:'action', text:'Confirmación: capnografía continua (EtCO₂), auscultación bilateral, fijación del tubo'},
  {type:'info', text:'Presión cricoidea: no de rutina. DAS 2025 la reserva para riesgo de aspiración particularmente alto, y obliga a RETIRARLA si dificulta la laringoscopia, la intubación o la colocación de un supraglótico. Tener siempre preparados el plan B (dispositivo supraglótico) y el plan C (cricotiroidotomía) antes de inducir'}
],
  src:'DAS/ICS intubacion en paciente critico 2017 · PMID 29406182 · DAS 2025 · PMID 41203471'
},

{id:'hiperkalemia', title:'Manejo de hiperkalemia', sub:'Estabilización de membrana → redistribución → eliminación', badge:'amber', tag:'Urgente', rank:11, steps:[
  {type:'action', text:'Confirmar hiperkalemia con ECG y descartar pseudohiperpotasemia (hemólisis de la muestra, torniquete prolongado)'},
  {type:'decision', text:'¿Cambios ECG (T picudas, QRS ancho, aplanamiento de onda P) o K⁺ >6.5 mmol/L?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Estabilización de membrana — elegir UNA sal según el acceso venoso. Son fármacos distintos: aportan calcio elemental equivalente (~270 mg, ~13,6 mEq) pero NO son intercambiables mL a mL.\n• GLUCONATO cálcico 10%: 30 mL IV en 5–10 min. De elección con vía PERIFÉRICA, es menos flebotóxico.\n• CLORURO cálcico 10%: 10 mL IV en 2–5 min. Preferible con vía CENTRAL o en parada, aporta más Ca²⁺ por mL, pero es vesicante y causa necrosis si extravasa.\nReevaluar ECG y repetir a los 5 min si persisten los cambios'},
  {type:'action', text:'Redistribución: insulina rápida (regular/soluble) 10 UI IV + glucosa 25 g IV, en 15–30 min.\nForma preferida por ERC: glucosa 10% 250 mL (=25 g). Alternativa habitual en urgencias: glucosa 50% 50 mL (=25 g), más flebítica.\nSI LA GLUCEMIA BASAL ES <126 mg/dL (<7 mmol/L): añadir glucosa 10% a 50 mL/h durante 5 h para prevenir la hipoglucemia tardía'},
  {type:'action', text:'Redistribución: salbutamol nebulizado 10–20 mg (dosis alta, nebulizado continuo si es posible)'},
  {type:'action', text:'Eliminación: ciclosilicato de sodio y zirconio (SZC) 10 g VO precoz, en paralelo al resto (ERC 2025). Furosemida IV si diuresis conservada. Las resinas clásicas (Kayexalate/resincalcio) son de inicio lento y eficacia aguda limitada'},
  {type:'action', text:'Bicarbonato sódico IV si acidosis metabólica asociada'},
  {type:'decision', text:'¿K⁺ >6.5 refractario al tratamiento, anuria o insuficiencia renal grave?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Activar hemodiálisis urgente'},
  {type:'info', text:'Calcio y bicarbonato PRECIPITAN: no mezclarlos en la misma línea ni en Y. Líneas separadas o lavado abundante entre ambos'},
  {type:'info', text:'El 10% de cloruro cálcico no aporta el mismo calcio elemental en todos los países y fabricantes. Ante la duda, prescribir en mmol o mEq de Ca²⁺, no en mL'},
  {type:'info', text:'Tras la insulina, la hipoglucemia tardía es la complicación más frecuente: vigilar glucemia hasta 6 h, cada 30–60 min mientras pase la perfusión de glucosa. Mayor riesgo si ERC avanzada o diálisis, no diabético, bajo peso o anciano'},
  {type:'info', text:'K⁺ de control a la 1–2 h (efecto máximo de la insulina a los 30–60 min) y de nuevo a las 4–6 h: el efecto es transitorio y puede haber rebote si no se ha eliminado potasio'},
  {type:'info', text:'Monitorización ECG continua y controles de K⁺ seriados cada 1–2 h hasta normalización; la gravedad clínica depende tanto del valor de K⁺ como de la velocidad de instauración y los cambios ECG'}
],
  src:'ERC 2025 Special Circumstances · PMID 41117569 · ERC 2025 Executive Summary · PMID 41117573 · ILCOR 2025 ALS CoSTR · PMID 41122842 · Sales de calcio y via: Bianchi 2019 · PMID 31119681 · Variabilidad del CaCl2 10%: Putowski 2022 · PMID 36403822 · Insulina-glucosa e hipoglucemia: Jessen 2025 · PMID 39761907 · Ibarra 2024 · PMID 39111100'
},

{id:'transfusion-masiva', title:'Protocolo de transfusión masiva', sub:'Activación, ratio 1:1:1, ácido tranexámico y control de daños', badge:'red', tag:'Crítico', rank:10, steps:[
  {type:'decision', text:'¿Criterios de activación? (>10 CH en 24h, >4 CH en 1h, o hemorragia activa con inestabilidad hemodinámica)', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Activar protocolo de transfusión masiva: avisar al banco de sangre y al equipo quirúrgico/radiología intervencionista'},
  {type:'action', text:'Solicitar hemoderivados en ratio 1:1:1 (concentrados de hematíes : plasma fresco congelado : plaquetas)'},
  {type:'action', text:'Ácido tranexámico: 1 g IV en 10 min (=100 mg/min; diluir en 100 mL de SSF), seguido de 1 g IV en 8 h (=125 mg/h).\nDENTRO DE LAS PRIMERAS 3 h desde la lesión, cuanto antes mejor. Pasadas las 3 h NO iniciarlo: se asocia a MÁS muerte por sangrado (RR 1,44; IC95% 1,12–1,84).\nNo administrar en bolo rápido: produce hipotensión'},
  {type:'action', text:'Control de daños precoz: hemostasia quirúrgica o radiología intervencionista'},
  {type:'action', text:'Monitorizar gasometría, coagulación (incluido fibrinógeno) y calcio iónico cada 30–60 min'},
  {type:'info', text:'Objetivos de reanimación: Hb >7 g/dL, fibrinógeno >1.5 g/L, plaquetas >50.000/µL, pH >7.2, Tª >35°C, Ca²⁺ iónico >1.1 mmol/L'},
  {type:'info', text:'Evitar sobrecarga de cristaloides — priorizar hemoderivados como fluido de reanimación; en trauma, valorar hipotensión permisiva hasta control del sangrado'}
],
  src:'European guideline on major bleeding and coagulopathy following trauma, 6th ed · PMID 36859355 · NAEMSP/ACEP/ACS-COT TXA 2025 · PMID 40842057 · Ventana de 3 h, subanalisis de CRASH-2 · PMID 21439633'
},

{id:'dolor-toracico', title:'Manejo del dolor torácico', sub:'ECG precoz, troponina seriada y estratificación de riesgo', badge:'amber', tag:'Urgente', rank:12, steps:[
  {type:'action', text:'ECG de 12 derivaciones en menos de 10 minutos desde la llegada'},
  {type:'decision', text:'¿Elevación del ST o BRIHH de nueva aparición (SCACEST)?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Activar código IAM: doble antiagregación + traslado urgente para ICP primaria (<90–120 min) o fibrinólisis si no está disponible'},
  {type:'action', branch:'no', text:'Troponina de alta sensibilidad seriada (0h y 1h, o 0h y 3h según protocolo local)'},
  {type:'action', branch:'no', text:'Estratificar riesgo con escalas GRACE/TIMI'},
  {type:'decision', text:'¿Troponina elevada o alta sospecha clínica de SCASEST?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Ingreso, antiagregación/anticoagulación según riesgo, coronariografía según estratificación (urgente/precoz/diferida)'},
  {type:'action', branch:'no', text:'Valorar diagnósticos alternativos: TEP (Wells + dímero D), disección aórtica (angioTC si sospecha), pericarditis (ECG difuso, roce pericárdico), neumotórax (auscultación, Rx/eco)'},
  {type:'info', text:'Alta con seguimiento ambulatorio si SCA descartado, troponinas negativas seriadas y estratificación de bajo riesgo'}
],
  src:'ESC 2023 Acute Coronary Syndromes · PMID 37622654 · ACC/AHA/ACEP 2025 · PMID 40013746'
},

{id:'codi-iam', title:'Codi IAM', sub:'Activación de código SCA — criterios ECG y estrategia de reperfusión', badge:'red', tag:'Crítico', rank:1, codigo:true,
  folleto:"codigos/C01._Codi_infart_agut_de_miocardi_(IAM).pdf",
  galeria:{
    titulo:'Patrones ECG de oclusión coronaria (OMI)',
    nota:'Equivalentes de infarto con oclusión coronaria aguda que no cumplen los criterios clásicos de elevación del ST — no descartan activación del Codi IAM.',
    dir:'codigos/patrones iam nuevos/',
    items: PATRONES_OMI
  },
  flow:(() => {
    const f = n => n.toLocaleString('es-ES', { maximumFractionDigits: 1 });
    const hay = x => !isNaN(x) && x > 0;
    const faltaPeso = '<span class="pe-nota">Introduce el peso para calcular la dosis.</span>';
    const tnk = v => {
      if (!hay(v.peso)) return 'Tabla por peso: &lt;60 kg 30 mg (6 ml) · 60–69 kg 35 mg (7 ml) · 70–79 kg 40 mg (8 ml) · 80–89 kg 45 mg (9 ml) · ≥90 kg 50 mg (10 ml); con ≥75 años, media dosis. ' + faltaPeso;
      const llena = v.peso < 60 ? 30 : v.peso < 70 ? 35 : v.peso < 80 ? 40 : v.peso < 90 ? 45 : 50;
      if (!hay(v.edad)) return '<b>' + llena + ' mg (' + f(llena / 5) + ' ml)</b> por peso; si tiene ≥75 años, MEDIA DOSIS: <b>' + f(llena / 2) + ' mg (' + f(llena / 10) + ' ml)</b>. Introduce la edad.';
      const mg = v.edad >= 75 ? llena / 2 : llena;
      return '<b>' + f(mg) + ' mg = ' + f(mg / 5) + ' ml</b> IV en bolo único en 5–10 s' + (v.edad >= 75 ? ' (MEDIA DOSIS por ≥75 años; dosis completa ' + llena + ' mg)' : '') + '.';
    };
    const clopi = v => !hay(v.edad) ? 'clopidogrel 300 mg VO con ≤75 años o 75 mg sin carga con >75 años' :
      v.edad <= 75 ? '<b>clopidogrel 300 mg VO</b> (≤75 años)' : '<b>clopidogrel 75 mg VO sin dosis de carga</b> (>75 años)';
    const enox = v => {
      if (!hay(v.peso) || !hay(v.edad)) return 'ENOXAPARINA: &lt;75 años 30 mg IV en bolo y a los 15 min 1 mg/kg SC cada 12 h (máx. 100 mg en las 2 primeras dosis) · ≥75 años sin bolo, 0,75 mg/kg SC cada 12 h (máx. 75 mg en las 2 primeras) · ClCr &lt;30: 1 mg/kg SC cada 24 h. ' + (hay(v.peso) ? 'Introduce la edad.' : faltaPeso);
      const r = Math.round;
      if (hay(v.clcr) && v.clcr < 30) return 'ENOXAPARINA (ClCr &lt;30): ' + (v.edad < 75 ? '30 mg IV en bolo y a los 15 min ' : 'sin bolo, ') + '<b>' + r(v.peso) + ' mg SC cada 24 h</b> (1 mg/kg).';
      if (v.edad < 75) return 'ENOXAPARINA: <b>30 mg IV en bolo</b> y a los 15 min <b>' + r(Math.min(v.peso, 100)) + ' mg SC cada 12 h</b> (1 mg/kg; máx. 100 mg en las 2 primeras dosis' + (v.peso > 100 ? ', después ' + r(v.peso) + ' mg' : '') + ').' + (hay(v.clcr) ? '' : ' Si ClCr &lt;30, cada 24 h.');
      return 'ENOXAPARINA (≥75 años): sin bolo, <b>' + r(Math.min(0.75 * v.peso, 75)) + ' mg SC cada 12 h</b> (0,75 mg/kg; máx. 75 mg en las 2 primeras dosis' + (0.75 * v.peso > 75 ? ', después ' + r(0.75 * v.peso) + ' mg' : '') + ').' + (hay(v.clcr) ? '' : ' Si ClCr &lt;30: 1 mg/kg cada 24 h.');
    };
    const hnf = v => hay(v.peso) ? 'Alternativa, HEPARINA SÓDICA: <b>' + f(Math.min(60 * v.peso, 4000)) + ' UI IV</b> en bolo (60 UI/kg, máx. 4.000) + <b>' + f(Math.min(12 * v.peso, 1000)) + ' UI/h</b> (12 UI/kg/h, máx. 1.000) según TTPa.' :
      'Alternativa, HEPARINA SÓDICA: 60 UI/kg IV (máx. 4.000 UI) + 12 UI/kg/h (máx. 1.000 UI/h) según TTPa.';
    const TQ = {
      q: 'Tiempo estimado desde el ECG hasta la llegada al hospital con ICP',
      opts: [{ l: '&lt;90 min', go: 'icp' }, { l: '90–120 min (individualizar)', go: 'ventana' }, { l: '>120 min', go: 'fibci' }]
    };
    /* Patrón OMI → nodo: imagen, criterios y conducta según el tipo de patrón. */
    const OMI_EQUIV = ['OMI inferobasal - posterior.jpg', 'criterios Sgarbossa.jpg'];
    const omiNodo = it => {
      const base = '<img class="fl-omi-img" src="' + encodeURI('codigos/patrones iam nuevos/' + it.file) + '" alt="ECG con ' + it.label + '" loading="lazy">' +
        '<b>Criterios:</b> ' + it.criterios + '<br><b>Arteria:</b> ' + it.arteria + '<br><b>Significado:</b> ' + it.significado +
        '<br><span class="pe-nota">' + it.fuente + '</span><br>';
      if (it.file === 'Patron Wellens.jpg') return {
        t: it.label, c: 'mid',
        show: base + '<b>No es una oclusión activa: NO fibrinólisis y NO ergometría.</b> Tratar como SCA sin elevación del ST de alto riesgo (ACC/AHA 2025, ESC 2023).',
        q: '¿Dolor recurrente o refractario, inestabilidad hemodinámica o eléctrica, u otro criterio de muy alto riesgo?',
        opts: [{ l: 'Sí', go: 'muyalto' }, { l: 'No', go: 'wellens_alto' }]
      };
      if (OMI_EQUIV.includes(it.file)) return {
        t: it.label, c: 'high',
        show: base + '<b>Equivalente de IAMCEST:</b> misma estrategia de reperfusión, con fibrinólisis si la ICP se retrasa >120 min (ACC/AHA 2025, ESC 2023).' +
          (it.file === 'OMI inferobasal - posterior.jpg' ? ' Suele acompañar al inferior: aplicar sus precauciones y descartar el VD con V3R–V4R.' : ''),
        ...TQ
      };
      return {
        t: it.label, c: 'high',
        show: base + '<b>Posible oclusión sin criterios clásicos:</b> coronariografía o ICP urgente; avisar a hemodinámica. La fibrinólisis no está indicada de rutina: solo si la oclusión es segura y la ICP se retrasa >120 min, decidido con cardiología (ACC/AHA 2025; consenso ACC 2022).',
        q: 'Estrategia de reperfusión',
        opts: [{ l: 'Coronariografía o ICP urgente', go: 'icp' }, { l: 'Fibrinólisis consensuada con cardiología (ICP >120 min)', go: 'fibci' }]
      };
    };
    const mlh = (dosis, peso, conc) => f(Math.round(dosis * peso * 60 / conc * 10) / 10);
    return {
      inputs: [{ k: 'peso', l: 'Peso real', u: 'kg' }, { k: 'edad', l: 'Edad', u: 'años' }, { k: 'clcr', l: 'ClCr (opcional)', u: 'ml/min' }],
      start: 'ecg',
      nodes: {
        ecg: {
          t: 'Primer contacto', show: 'Dolor torácico sugestivo de SCA (valorar SCA sin dolor en mujeres, diabéticos y ancianos): <b>ECG de 12 derivaciones en &lt;10 min</b>.',
          q: '¿Cumple criterios ECG de activación del Codi IAM?',
          help: 'Elevación nueva del ST en el punto J en 2 derivaciones contiguas (≥1 mm; en V2–V3 ≥2 mm hombres >40 a, ≥2,5 mm hombres &lt;40 a, ≥1,5 mm mujeres) · depresión del ST ≥1 mm en ≥8 derivaciones + elevación en aVR · elevación >0,5 mm en V7–V9 con descenso en V1–V3 · elevación en derivaciones derechas · BRIHH o BRDHH nuevo (Sgarbossa-Smith), patrón de Winter o marcapasos con BRIHH. Equivalentes OMI: botón «Ver patrones IAM nuevos».',
          opts: [{ l: 'Sí, cumple criterios', go: 'activar' }, { l: 'No', go: 'scasest' }]
        },
        scasest: {
          q: '¿SCASEST de muy alto riesgo?',
          help: 'Inestabilidad hemodinámica o shock cardiogénico · dolor recurrente o refractario · arritmias potencialmente mortales · complicaciones mecánicas del IAM · insuficiencia cardiaca relacionada · elevación transitoria del ST.',
          opts: [{ l: 'Sí, algún criterio', go: 'muyalto' }, { l: 'No', go: 'nosca' }]
        },
        muyalto: { t: 'SCASEST de muy alto riesgo', c: 'high', show: 'Tratar como muy alto riesgo <b>SIN activar el Codi IAM</b>: estrategia invasiva inmediata (&lt;2 h, ESC 2023).' },
        nosca: { t: 'Sin criterios de Codi IAM', c: 'mid', show: 'Seguir el protocolo de SCASEST específico.' },
        activar: { farmacos: ['Ácido acetilsalicílico', 'Acetilsalicilato de lisina', { n: 'Fentanilo', inf: false }, 'Cloruro mórfico', 'Nitroglicerina'],
          t: 'ACTIVAR CODI IAM', c: 'high', escalas: ['killip'],
          show: 'Notificar y anotar la hora del ECG.<br><b>Tratamiento inicial:</b> O₂ solo si SpO₂ &lt;90 % · fentanilo 50–75 µg IV cada 5–10 min o cloruro mórfico 4–8 mg IV (+2 mg cada 5–15 min, máx. 15–20 mg) · <b>AAS 150–300 mg VO masticada</b> (450 mg IV de acetilsalicilato de lisina si no puede VO).<br>Nitroglicerina (SL 0,4 mg o IV): NO si TAS &lt;90, FC &lt;50, sospecha de IAM de VD o inhibidores de la PDE-5 en 24 h, ni como prueba diagnóstica.<br>Killip: I normal · II crepitantes o 3.er ruido · III edema agudo de pulmón · IV shock cardiogénico.',
          galeria: true,
          q: 'Localización del infarto en el ECG',
          help: 'En todo IAM inferior, y si hay descenso del ST en V1–V3, registrar V3R–V4R y V7–V9.',
          opts: [
            { l: 'Anterior o anteroseptal (V1–V4) o anterior extenso (V1–V6, I, aVL)', go: 'loc_ant' },
            { l: 'Inferior (II, III, aVF)', go: 'loc_infq' },
            { l: 'Lateral (I, aVL, V5–V6)', go: 'loc_lat' },
            { l: 'Posterior (descenso del ST en V1–V3, elevación en V7–V9)', go: 'loc_post' },
            { l: 'Descenso del ST en ≥8 derivaciones + elevación en aVR', go: 'loc_tronco' },
            { l: 'BRIHH, marcapasos u otro equivalente sin localización clara', go: 'loc_otro' },
            { l: 'Otros: nuevos patrones de IAM (OMI)', go: 'loc_omi' }
          ]
        },
        loc_ant: { farmacos: ['Atropina'],
          t: 'IAM ANTERIOR — arteria descendente anterior', c: 'high',
          show: 'Mayor riesgo de <b>insuficiencia cardiaca, shock y arritmias ventriculares</b>: vigilar crepitantes, TA y perfusión (Killip).<br>Los bloqueos AV del IAM anterior suelen ser infranodales (QRS ancho): la <b>atropina suele ser ineficaz</b> → preparar marcapasos transcutáneo.<br>Ecocardiograma precoz: trombo en el VI si hay acinesia apical.',
          ...TQ
        },
        loc_infq: {
          q: '¿Elevación del ST en V3R–V4R? (≥0,5 mm; ≥1 mm en hombres &lt;30 años)',
          opts: [{ l: 'Sí: afecta al ventrículo derecho', go: 'loc_vd' }, { l: 'No', go: 'loc_inf' }]
        },
        loc_inf: { farmacos: ['Atropina'],
          t: 'IAM INFERIOR — coronaria derecha o circunfleja', c: 'mid',
          show: 'Frecuentes: <b>bradicardia sinusal, hipotensión vagal y BAV nodal</b> (QRS estrecho), que suele responder a la atropina.<br><b>Evitar betabloqueante</b> si hay bradicardia, BAV o hipotensión.<br>Descartado el VD, la nitroglicerina se puede usar con las precauciones habituales.',
          ...TQ
        },
        loc_vd: { farmacos: [{ n: 'Dobutamina', mg: 250, vol: 250, dosis: 2.5 }, { n: 'Noradrenalina', mg: 4, vol: 250, dosis: 0.05 }],
          t: 'IAM INFERIOR CON VENTRÍCULO DERECHO', c: 'high',
          show: '<b>Dependiente de la precarga:</b> NO nitratos (ni SL ni IV) · NO diuréticos · opioides con mucha precaución (hipotensión) · evitar betabloqueante.<br>Si hay hipotensión sin congestión pulmonar: <b>cristaloide en bolos de 250–500 ml IV</b>, reevaluando TA, yugulares, auscultación y ecografía tras cada bolo.<br>Si persiste la hipotensión con la precarga optimizada: dobutamina ± noradrenalina (ver «Shock cardiogénico»).<br>Bradicardia y BAV frecuentes (ver «Bradicardia o bloqueo AV»).<br><span class="pe-nota">ESC 2023; ACC/AHA 2025.</span>',
          ...TQ
        },
        loc_lat: {
          t: 'IAM LATERAL — circunfleja o rama diagonal',
          show: 'Sin precauciones farmacológicas específicas por la localización.',
          ...TQ
        },
        loc_post: {
          t: 'IAM POSTERIOR — circunfleja o coronaria derecha', c: 'mid',
          show: 'Equivalente de IAMCEST: misma estrategia de reperfusión.<br>Suele acompañar al inferior: aplicar sus precauciones y descartar el VD con V3R–V4R.',
          ...TQ
        },
        loc_tronco: {
          t: 'Sospecha de TRONCO COMÚN o enfermedad multivaso', c: 'high',
          show: 'Alto riesgo de <b>shock cardiogénico</b>: coronariografía urgente; vigilar TA y perfusión (ver «Shock cardiogénico»).',
          ...TQ
        },
        loc_omi: {
          q: '¿Qué patrón tiene el ECG?',
          help: 'Equivalentes de oclusión coronaria sin criterios clásicos de elevación del ST. Para compararlos con imagen, abre los patrones.',
          galeria: true,
          desplegable: 'Elige un patrón…',
          opts: PATRONES_OMI.map((it, i) => ({ l: it.label, go: 'omi_' + i }))
        },
        ...Object.fromEntries(PATRONES_OMI.map((it, i) => ['omi_' + i, omiNodo(it)])),
        wellens_alto: {
          t: 'Wellens sin criterios de muy alto riesgo', c: 'mid',
          show: 'Ingreso monitorizado y <b>coronariografía precoz (&lt;24 h)</b>. Sin ergometría ni fibrinólisis. Si reaparece el dolor o hay inestabilidad: estrategia invasiva inmediata (&lt;2 h).<br><span class="pe-nota">ACC/AHA 2025; ESC 2023; consenso ACC 2022.</span>'
        },
        loc_otro: {
          t: 'Localización no valorable en el ECG',
          show: 'BRIHH nuevo, marcapasos con criterios de Sgarbossa-Smith u otro equivalente: tratar como IAMCEST. Las precauciones dependen de la clínica (hipotensión, bradicardia, congestión).',
          ...TQ
        },
        ventana: {
          q: 'Ventana de 90–120 min: decidir según el caso. ¿Qué estrategia se elige?',
          opts: [{ l: 'Angioplastia primaria', go: 'icp' }, { l: 'Fibrinólisis prehospitalaria', go: 'fibci' }]
        },
        icp: { farmacos: ['Heparina sódica'],
          t: 'ANGIOPLASTIA PRIMARIA', c: 'high',
          show: v => 'Traslado directo a la sala de hemodinámica.<br>HEPARINA SÓDICA 70 UI/kg IV en bolo' + (hay(v.peso) ? ': <b>' + f(Math.round(70 * v.peso)) + ' UI</b>' : '. ' + faltaPeso),
          q: 'Segundo antiagregante: ¿qué situación aplica?',
          opts: [
            { l: 'Dudas diagnósticas, hemorragia activa grave, no puede tomar VO o ya con doble antiagregación', go: 'sa_no' },
            { l: 'No se puede obtener información o alto riesgo hemorrágico', go: 'sa_clopi' },
            { l: 'Ictus o AIT previo, >75 años o &lt;60 kg', go: 'sa_tica', sug: v => (hay(v.edad) && v.edad > 75) || (hay(v.peso) && v.peso < 60) },
            { l: 'Ninguna de las anteriores', go: 'sa_pras' }
          ]
        },
        sa_no: { t: 'Segundo antiagregante', show: '<b>Ninguno</b> de momento.' },
        sa_clopi: { farmacos: ['Clopidogrel'], t: 'Segundo antiagregante', show: '<b>Clopidogrel 600 mg VO.</b>' },
        sa_tica: { farmacos: ['Ticagrelor'], t: 'Segundo antiagregante', show: '<b>Ticagrelor 180 mg VO.</b>' },
        sa_pras: { farmacos: ['Prasugrel'], t: 'Segundo antiagregante', show: '<b>Prasugrel 60 mg VO.</b>' },
        fibci: {
          q: '¿Alguna contraindicación absoluta para la fibrinólisis?',
          help: 'Hemorragia cerebral previa o ictus de causa desconocida · ictus isquémico &lt;6 meses · neoplasia o traumatismo del SNC · cirugía o traumatismo &lt;1 mes · sospecha de disección aórtica · sangrado activo o digestivo &lt;1 mes · punciones no compresibles recientes.',
          opts: [{ l: 'Sí', go: 'fibno' }, { l: 'No', go: 'fib' }]
        },
        fibno: {
          t: 'Fibrinólisis contraindicada', c: 'high', show: 'Traslado para angioplastia primaria aunque el tiempo supere la ventana (ESC 2023).',
          q: 'Continuar', opts: [{ l: 'Pautar la angioplastia primaria', go: 'icp' }]
        },
        fib: { farmacos: ['Tenecteplasa', 'Ácido acetilsalicílico', 'Clopidogrel', 'Enoxaparina', 'Heparina sódica'],
          t: 'FIBRINÓLISIS CON TENECTEPLASA', c: 'high',
          show: v => '<b>Tenecteplasa:</b> ' + tnk(v) + ' Es el doble que la dosis del ictus. Incompatible con glucosa: vía con SF 0,9 %.<br>' +
            '<b>Antiagregación:</b> AAS 150–300 mg VO (o 450 mg IV) + ' + clopi(v) + '. NO prasugrel ni ticagrelor.<br>' +
            '<b>Anticoagulación</b> (hasta la revascularización o el alta, máx. 8 días): ' + enox(v) + '<br>' + hnf(v) + '<br>' +
            'Traslado inmediato a un centro con ICP.<br><span class="pe-nota">Fuentes de la dosis: ACC/AHA 2025 y ESC 2023 (media dosis ≥75 años, STREAM-2); SEM v.03 2023 «mitad de dosis si >75 años»: el corte correcto es ≥75.</span>',
          q: 'A los 60–90 min de la lisis: ¿el ST baja ≥50 %, cede el dolor y está estable?',
          opts: [{ l: 'Sí: lisis eficaz', go: 'fibok' }, { l: 'No, o inestabilidad hemodinámica o eléctrica', go: 'rescate' }]
        },
        fibok: { t: 'Lisis eficaz', c: 'low', show: 'Coronariografía en <b>2–24 h</b> (ACC/AHA 2025, ESC 2023).' },
        rescate: { t: 'Lisis fallida', c: 'high', show: '<b>Coronariografía inmediata e ICP DE RESCATE</b> (ACC/AHA 2025, ESC 2023).' }
      },
      extras: {
        t: 'Complicaciones durante la evolución',
        help: 'Ábrelas cuando aparezcan, en cualquier momento del flujograma. Las dosis usan el peso de arriba.',
        items: [
          {
            farmacos: ['Nitroglicerina', 'Metoprolol'], l: 'Hipertensión arterial', t: 'Hipertensión arterial', c: 'mid',
            show: 'Tratar antes el dolor y la ansiedad. No bajar la TA de forma brusca.<br>' +
              '<b>Nitroglicerina IV</b>: empezar con 5–10 µg/min y subir cada 3–5 min según TA y dolor (Perfusión IV → Nitroglicerina). NO si IAM de VD, TAS &lt;90, FC &lt;50 o inhibidores de la PDE-5 (sildenafilo o vardenafilo 24 h, tadalafilo 48 h).<br>' +
              '<b>Metoprolol IV</b> 5 mg cada 2 min (máx. 15 mg), solo sin insuficiencia cardiaca, hipotensión, bradicardia ni BAV. La ESC 2023 lo contempla al ingreso si la TAS es >120 mmHg; la ACC/AHA 2025 no lo recomienda de rutina, solo con indicación (HTA, isquemia persistente). Si no, betabloqueante oral en las primeras 24 h.'
          },
          {
            farmacos: ['Nitroglicerina'], l: 'Edema agudo de pulmón (Killip III)', t: 'Edema agudo de pulmón (Killip III)', c: 'high',
            show: 'Sentado. O₂ si SpO₂ &lt;90 %. <b>VMNI (CPAP o BiPAP)</b> si hay trabajo respiratorio, hipoxemia o acidosis.<br>' +
              '<b>Nitroglicerina IV</b> si TAS ≥90 y sin IAM de VD; de elección en el edema hipertensivo.<br>' +
              '<b>Furosemida IV</b> si hay congestión: 20–40 mg si no tomaba diurético; si lo tomaba, 1–2,5 veces su dosis oral diaria.<br>' +
              'NO morfina de rutina (solo dolor intenso). NO betabloqueante.<br>' +
              'Ecocardiograma urgente: descartar complicación mecánica (insuficiencia mitral aguda, CIV).'
          },
          {
            farmacos: [{ n: 'Noradrenalina', mg: 4, vol: 250, dosis: 0.05 }, { n: 'Dobutamina', mg: 250, vol: 250, dosis: 2.5 }], l: 'Shock cardiogénico (Killip IV)', t: 'Shock cardiogénico (Killip IV)', c: 'high',
            show: v => '<b>ICP urgente solo de la arteria culpable</b>, aunque hayan pasado más de 12 h; no tratar otras arterias en el mismo procedimiento (ACC/AHA 2025, ESC 2023).<br>' +
              'Si es IAM de VD, primero volumen en bolos de 250–500 ml.<br>' +
              '<b>Noradrenalina</b> de primera elección, desde 0,05–0,1 µg/kg/min' + (hay(v.peso) ? ' = <b>' + mlh(0.05, v.peso, 16) + '–' + mlh(0.1, v.peso, 16) + ' ml/h</b> con 4 mg en 250 ml (16 µg/ml)' : '') + '; objetivo PAM ≥65 mmHg.<br>' +
              '<b>Dobutamina</b> si persiste el bajo gasto con TA sostenida: 2–5 µg/kg/min' + (hay(v.peso) ? ' = <b>' + mlh(2, v.peso, 1000) + '–' + mlh(5, v.peso, 1000) + ' ml/h</b> con 250 mg en 250 ml (1.000 µg/ml)' : '') + ', hasta 20 µg/kg/min.<br>' +
              'Evitar betabloqueantes y nitratos.<br>' +
              '<b>Ecocardiograma urgente</b>: CIV, insuficiencia mitral aguda por rotura de músculo papilar, rotura de pared libre o taponamiento.<br>' +
              'Soporte mecánico (Impella) en pacientes seleccionados y en un centro con experiencia (ACC/AHA 2025, ensayo DanGer Shock); ECMO no de rutina.' + (hay(v.peso) ? '' : ' ' + faltaPeso)
          },
          {
            farmacos: ['Atropina', { n: 'Adrenalina', inf: false }, 'Isoprenalina'], l: 'Bradicardia o bloqueo AV', t: 'Bradicardia o bloqueo AV', c: 'mid',
            show: '<b>Atropina</b> si es sintomática o hay compromiso hemodinámico: 0,5 mg IV (ERC; la AHA da 1 mg) cada 3–5 min, máx. 3 mg. Menos de 0,5 mg puede causar bradicardia paradójica.<br>' +
              'Si no responde, hay BAV avanzado o QRS ancho (típico del IAM anterior): <b>marcapasos transcutáneo</b>. Como puente: adrenalina 2–10 µg/min IV o isoprenalina (ver Fichas).<br>' +
              'En el IAM inferior el BAV suele ser nodal (QRS estrecho) y responder a la atropina. Evitar betabloqueantes.'
          }
        ]
      }
    };
  })(),
  steps:[
  {type:'action', text:'Dolor torácico sugestivo de SCA (valorar alto riesgo de SCA sin dolor en mujeres, diabéticos y ancianos): ECG de 12 derivaciones en <10 minutos'},
  {type:'decision', text:'¿Cumple criterios ECG de activación del Codi IAM?', yes:'Sí', no:'No'},
  {type:'info', branch:'yes', text:'Criterios ECG: nueva elevación del ST en el punto J en 2 derivaciones contiguas (≥1 mm en todas excepto V2-V3; en V2-V3 ≥2 mm en hombres >40a, ≥2,5 mm en hombres <40a, ≥1,5 mm en mujeres) · depresión del ST ≥1 mm en ≥8 derivaciones + elevación del ST en aVR (sospecha de tronco común/multivaso) · elevación persistente del ST >0,5 mm en V7-V9 con descenso especular en V1-V3 (IAM posterior) · elevación del ST en derivaciones derechas (IAM de VD) · BRIHH o BRDHH de nueva aparición (valorar Sgarbossa-Smith), patrón de Winter o ritmo de marcapasos con BRIHH'},
  {type:'action', branch:'yes', text:'ACTIVAR CODI IAM: notificar y anotar la hora del ECG'},
  {type:'decision', branch:'no', text:'¿Cumple criterios de SCASEST de muy alto riesgo? (inestabilidad hemodinámica/shock cardiogénico, dolor recurrente o refractario, arritmias potencialmente mortales, complicaciones mecánicas del IM, IC relacionada, elevación transitoria del ST)', yes:'Sí', no:'No'},
  {type:'info', branch:'no', text:'Si SÍ: tratar como muy alto riesgo SIN activar Codi IAM. Si NO: protocolo SCASEST específico'},
  {type:'decision', text:'Estrategia de reperfusión — tiempo estimado de traslado (ECG a llegada al hospital)', yes:'<90 min → angioplastia primaria', no:'>90 min → fibrinólisis prehospitalaria'},
  {type:'info', text:'Ventana individualizable entre 90 y 120 min según el caso'},
  {type:'action', text:'Tratamiento inicial: O₂ solo si SpO₂<90%. Analgesia: fentanilo 50-75 mcg IV c/5-10min o cloruro mórfico 4-8 mg IV (+2 mg c/5-15min, máx 15-20mg). AAS 150-300 mg VO masticada (450 mg IV acetilsalicilato de lisina si no puede VO). Heparina sódica 70 UI/kg IV bolus si angioplastia primaria'},
  {type:'info', text:'Nitroglicerina (SL 0,4 mg o IV 10-60 mcg/kg/h): NO administrar si TAS<90, FC<50, sospecha de IAM de VD o inhibidores de fosfodiesterasa en las 24h previas, ni como prueba diagnóstica del dolor torácico'},
  {type:'info', text:'2º antiagregante (SCAEST con angioplastia primaria): dudas diagnósticas/hemorragia activa grave/no puede VO/doble antiagregación previa → ninguno · imposibilidad de obtener información o alto riesgo hemorrágico → clopidogrel 600 mg VO · ictus/AIT previo, >75a o <60kg → ticagrelor 180 mg VO · resto → prasugrel 60 mg VO'},
  {type:'action', text:'FIBRINÓLISIS — tenecteplasa en bolo IV único en 5–10 s según el peso: <60 kg 30 mg (6 ml) · 60–69 kg 35 mg (7 ml) · 70–79 kg 40 mg (8 ml) · 80–89 kg 45 mg (9 ml) · ≥90 kg 50 mg (10 ml). Con ≥75 AÑOS, MEDIA DOSIS: 15 · 17,5 · 20 · 22,5 · 25 mg. Es el doble que la dosis del ictus: no confundirlas. Incompatible con glucosa (vía con SF 0,9 %). Ver Fichas → Tenecteplasa'},
  {type:'info', text:'Dosis de tenecteplasa según la fuente — ACC/AHA 2025: tabla por peso 30–50 mg; media dosis con ≥75 años (STREAM-2) · ESC 2023: misma tabla; media dosis con ≥75 años (IIa B, desde la ESC 2017) · SEM Codi IAM v.03 (2023): «ajustada al peso, mitad de dosis si >75 años». El corte correcto es ≥75: con 75 años cumplidos ya va media dosis'},
  {type:'action', text:'Antiagregación con la fibrinólisis: AAS 150–300 mg VO (o 450 mg IV de acetilsalicilato de lisina) + clopidogrel 300 mg VO con ≤75 años o 75 mg sin carga con >75 años — NO prasugrel ni ticagrelor (ACC/AHA 2025, ESC 2023; SEM: 300 mg si <75 a, 75 mg si >75 a)'},
  {type:'action', text:'Anticoagulación con la fibrinólisis — ENOXAPARINA: <75 años 30 mg IV en bolo y a los 15 min 1 mg/kg SC cada 12 h (máx. 100 mg en las 2 primeras dosis) · ≥75 años sin bolo, 0,75 mg/kg SC cada 12 h (máx. 75 mg en las 2 primeras) · ClCr <30: 1 mg/kg SC cada 24 h. Alternativa, HEPARINA SÓDICA: 60 UI/kg IV (máx. 4.000 UI) + 12 UI/kg/h (máx. 1.000 UI/h) según TTPa. Hasta la revascularización o el alta (máx. 8 días) (ACC/AHA 2025, ESC 2023; el SEM no la detalla)'},
  {type:'info', text:'Después de la lisis: traslado inmediato a un centro con ICP. A los 60–90 min, si el ST no baja ≥50 %, persiste el dolor o hay inestabilidad hemodinámica o eléctrica → coronariografía inmediata e ICP DE RESCATE. Si la lisis es eficaz → coronariografía en 2–24 h (ACC/AHA 2025, ESC 2023)'},
  {type:'info', text:'Fibrinólisis — Contraindicaciones absolutas: hemorragia cerebral previa o AVC de causa desconocida, AVC isquémico <6 meses, neoplasia/traumatismo del SNC, cirugía o trauma <1 mes, sospecha de disección aórtica, sangrado activo o gastrointestinal <1 mes, punciones no compresibles recientes'},
  {type:'info', text:'Clasificación Killip/Kimball: I auscultación normal · II estertores crepitantes y/o 3er ruido · III edema agudo de pulmón · IV shock cardiogénico'}
], src:'Codi IAM — SEM Catalunya, Grup de Treball SCA, v.03 abril 2023 · Fibrinólisis completada con ACC/AHA 2025 SCA (Rao SV, PMID 40013746) y ESC 2023 SCA (Byrne RA, Eur Heart J 2023;44:3720) · STREAM (Armstrong 2013, PMID 23473396) y STREAM-1/2 ≥75 años (Bainey 2024, PMID 39689189)'},

{id:'codi-ictus', title:'Codi Ictus', sub:'Test RAPID/RANCOM, escala RACE y activación', badge:'red', tag:'Crítico', rank:2, codigo:true,
  folleto:'codigos/C02._Codi_ictus.pdf',
  flow:(() => {
    const f = n => n.toLocaleString('es-ES', { maximumFractionDigits: 1 });
    const hay = x => !isNaN(x) && x > 0;
    const faltaPeso = '<span class="pe-nota">Introduce el peso para calcular la dosis.</span>';
    const taOk = v => hay(v.tas) && hay(v.tad) && v.tas < 185 && v.tad < 110;
    const taAlta = v => (hay(v.tas) && v.tas >= 185) || (hay(v.tad) && v.tad >= 110);
    const CI = {
      q: '¿Alguna contraindicación para la trombólisis?',
      help: v => 'Hemorragia en la TC · hemorragia intracraneal previa · ictus isquémico o TCE grave &lt;3 meses · cirugía intracraneal o espinal &lt;3 meses · cirugía mayor &lt;14 días · hemorragia digestiva &lt;21 días · glucemia &lt;50 mg/dl (corregir y reevaluar) · plaquetas &lt;100.000 · INR >1,7 · HBPM a dosis plenas &lt;24 h · anticoagulante oral directo &lt;48 h (caso a caso; dabigatrán: idarucizumab 5 g IV) · disección aórtica · endocarditis (AHA/ASA 2026). La TA no controlable se valora en el paso siguiente.' +
        (hay(v.gluc) && v.gluc < 50 ? '<br><b>Glucemia ' + v.gluc + ' mg/dl: corregir y reevaluar antes de decidir.</b>' : ''),
      opts: [{ l: 'Sí, alguna', go: 'contra', sug: v => hay(v.gluc) && v.gluc < 50 }, { l: 'No', go: 'ta' }]
    };
    const ext = v => v.ruta.includes('ventana2');
    return {
      inputs: [{ k: 'peso', l: 'Peso real', u: 'kg' }, { k: 'edad', l: 'Edad', u: 'años' }, { k: 'tas', l: 'TAS', u: 'mmHg' }, { k: 'tad', l: 'TAD', u: 'mmHg' }, { k: 'gluc', l: 'Glucemia', u: 'mg/dl' }],
      start: 'rapid',
      nodes: {
        rapid: {
          t: 'Test RAPID — estado clínico actual',
          show: '¿Ríe asimétrico? · ¿Dificultad para levantar o mantener los brazos? · ¿Disartria?',
          q: '¿RAPID positivo (algún ítem alterado)?',
          opts: [{ l: 'Sí', go: 'rancom' }, { l: 'No', go: 'atipico' }]
        },
        atipico: {
          q: '¿Sospecha de ictus de territorio posterior (vértigo, diplopía, ataxia) o paciente pediátrico?',
          opts: [{ l: 'Sí', go: 'tiempo', sug: v => hay(v.edad) && v.edad < 15 }, { l: 'No', go: 'nocodi' }]
        },
        nocodi: { t: 'No cumple criterios de Codi Ictus', c: 'mid', show: 'Valoración habitual. La sospecha de hemorragia subaracnoidea NO es Codi Ictus: tiene circuito específico.' },
        rancom: {
          t: 'Test RANCOM — estado clínico previo', show: '¿Necesitaba ayuda para vestirse, moverse o ir al baño?',
          q: '¿Era independiente antes del ictus (RANCOM negativo)?',
          opts: [{ l: 'Sí, independiente', go: 'tiempo' }, { l: 'No, necesitaba ayuda', go: 'nodep' }]
        },
        nodep: { t: 'RANCOM positivo', c: 'mid', show: 'Dependencia previa: no cumple los criterios de activación del Codi Ictus del SEM.' },
        tiempo: {
          q: '¿Síntomas de menos de 24 h (incluido AIT), inicio incierto o ictus del despertar?',
          opts: [{ l: 'Sí', go: 'activar' }, { l: 'No, más de 24 h', go: 'notiempo' }]
        },
        notiempo: { t: 'Más de 24 h de evolución', c: 'mid', show: 'No cumple los criterios de activación del Codi Ictus del SEM.' },
        activar: {
          t: 'ACTIVAR CODI ICTUS', c: 'high',
          show: 'Comunicar la puntuación RACE a CECOS, sea cual sea.<br>Datos para CECOS (SITREM): CIP/DNI, hora de inicio, anticoagulantes, RAPID/RANCOM, RACE, glucemia capilar, TA, FC y temperatura.',
          q: '¿Adulto o pediátrico?',
          opts: [{ l: 'Adulto (≥15 años)', go: 'race', sug: v => hay(v.edad) && v.edad >= 15 }, { l: 'Pediátrico (&lt;15 años)', go: 'ped', sug: v => hay(v.edad) && v.edad < 15 }]
        },
        ped: { t: 'Ictus pediátrico', c: 'high', show: 'Activar SIEMPRE el Codi Ictus, con cualquier RACE → centro de referencia pediátrico más cercano.' },
        race: {
          escalas: ['race'], q: 'Puntuación de la escala RACE (0–9)',
          help: 'Paresia facial (0–2) · brazo (0–2) · pierna (0–2) · desviación oculocefálica (0–1) · afasia si la debilidad es derecha o agnosia si es izquierda (0–2). ≥5 = alta probabilidad de oclusión de gran vaso.',
          opts: [{ l: 'RACE 0–4', go: 'race_lo' }, { l: 'RACE 5–9', go: 'race_hi' }]
        },
        race_lo: {
          t: 'RACE 0–4', show: 'Trasladar al centro de referencia de ictus más cercano (CTI, CPI o C-TI).',
          q: '¿Está en el Hospital de Campdevànol (fase hospitalaria con teleictus)?',
          opts: [{ l: 'Sí, valorar la trombólisis', go: 'hosp' }, { l: 'No, sigue el traslado prehospitalario', go: 'traslado' }]
        },
        race_hi: {
          t: 'RACE 5–9: probable oclusión de gran vaso', c: 'high',
          show: 'Llamar al neurólogo referente. Si el centro de referencia hace trombectomía → trasladar allí. Si no, y es candidato a trombólisis → centro de referencia; si no es candidato → centro más cercano con trombectomía.<br><b>La trombólisis no debe retrasar el traslado a trombectomía.</b>',
          q: '¿Está en el Hospital de Campdevànol (fase hospitalaria con teleictus)?',
          opts: [{ l: 'Sí, valorar la trombólisis', go: 'hosp' }, { l: 'No, sigue el traslado prehospitalario', go: 'traslado' }]
        },
        traslado: { t: 'Traslado', show: 'Transmitir los datos a CECOS y trasladar al centro indicado. Tratar las complicaciones (panel de abajo) durante el traslado.' },
        hosp: {
          t: 'Llegada al hospital', c: 'high',
          show: v => 'Activar el <b>teleictus</b> (el neurólogo valora por videoconsulta y decide la trombólisis) · TC craneal sin contraste ± angio-TC (perfusión si se dispone) · glucemia capilar · peso real · 2 vías. No esperar plaquetas, INR ni TTPa salvo sospecha (anticoagulante, hepatopatía, hemopatía). <b>Objetivo puerta-aguja &lt;60 min.</b>' +
            (hay(v.gluc) && v.gluc < 60 ? '<br><b>Glucemia ' + v.gluc + ' mg/dl: glucosa IV y mantener >70.</b>' : '') +
            (hay(v.gluc) && v.gluc > 180 ? '<br><b>Glucemia ' + v.gluc + ' mg/dl: insulina rápida IV según glucemia capilar.</b>' : ''),
          q: 'Tiempo desde la última vez que se le vio bien',
          opts: [{ l: '0–4,5 h', go: 'ventana1' }, { l: '4,5–9 h, o ictus del despertar / inicio incierto', go: 'ventana2' }, { l: 'Más de 9 h', go: 'fuera' }]
        },
        fuera: { t: 'Fuera de la ventana de trombólisis IV', c: 'mid', show: 'Sin trombólisis IV. Si hay oclusión de gran vaso, comentar con el neurólogo de teleictus el traslado a trombectomía.' },
        ventana1: { ...CI },
        ventana2: { farmacos: ['Alteplasa'],
          q: '¿Hay mismatch en la TC de perfusión o difusión-FLAIR en la RM?',
          help: '4,5–9 h o ictus del despertar: solo con imagen avanzada y solo ALTEPLASA (EXTEND, WAKE-UP). No tenecteplasa si solo hay TC sin contraste (TWIST).',
          opts: [{ l: 'Sí, hay mismatch', go: 'ventana2ci' }, { l: 'No, o solo hay TC sin contraste', go: 'sinimagen' }]
        },
        sinimagen: { t: 'Sin trombólisis IV', c: 'mid', show: 'Fuera de las 4,5 h sin imagen avanzada no hay indicación de trombólisis IV. Si hay oclusión de gran vaso, comentar la trombectomía con el neurólogo de teleictus.' },
        ventana2ci: { ...CI },
        contra: { t: 'Trombólisis contraindicada', c: 'high', show: 'Sin trombólisis IV. Si hay oclusión de gran vaso (RACE ≥5 o angio-TC), traslado a trombectomía según el neurólogo de teleictus.' },
        ta: {
          q: '¿TA &lt;185/110 mmHg?',
          help: v => hay(v.tas) && hay(v.tad) ? 'TA introducida: ' + v.tas + '/' + v.tad + ' mmHg.' : 'Introduce la TAS y la TAD arriba para que se marque la opción.',
          opts: [{ l: 'Sí', go: 'dosis', sug: taOk }, { l: 'No, ≥185/110', go: 'tactl', sug: taAlta }]
        },
        tactl: { farmacos: ['Labetalol', 'Urapidilo'],
          t: 'Bajar la TA antes de trombolisar', c: 'high',
          show: 'Objetivo &lt;185/110 antes de empezar y &lt;180/105 las 24 h siguientes (AHA/ASA 2026).<br><b>Labetalol IV</b> 10 mg en 1–2 min, repetible (máx. 150 mg), o <b>urapidilo</b> si hay contraindicación a los betabloqueantes.',
          q: '¿Se consigue &lt;185/110?',
          opts: [{ l: 'Sí', go: 'dosis' }, { l: 'No, TA no controlable', go: 'contra' }]
        },
        dosis: { farmacos: ['Alteplasa', 'Tenecteplasa'],
          t: 'TROMBÓLISIS (dosis con el peso real)', c: 'high',
          show: v => {
            let h = '';
            if (hay(v.peso)) {
              const tot = Math.min(0.9 * v.peso, 90), bolo = tot / 10, resto = tot - bolo;
              h += '<b>Alteplasa</b> 0,9 mg/kg, máx. 90 mg: <b>' + f(Math.round(tot * 10) / 10) + ' mg</b> en total (1 mg/ml) → <b>bolo de ' + f(Math.round(bolo * 10) / 10) + ' mg IV en 1 min</b> + <b>' + f(Math.round(resto * 10) / 10) + ' mg con bomba en 60 min (' + f(Math.round(resto * 10) / 10) + ' ml/h)</b>. Desechar antes lo que sobre del vial; al final, lavar con SF al mismo ritmo.';
            } else h += '<b>Alteplasa</b> 0,9 mg/kg, máx. 90 mg: 10 % en bolo IV en 1 min y 90 % con bomba en 60 min. ' + faltaPeso;
            if (ext(v)) h += '<br><b>Ventana 4,5–9 h: solo alteplasa</b> (no tenecteplasa).';
            else if (hay(v.peso)) {
              const t = v.peso < 60 ? 15 : v.peso < 70 ? 17.5 : v.peso < 80 ? 20 : v.peso < 90 ? 22.5 : 25;
              h += '<br><b>O tenecteplasa</b> (misma eficacia en &lt;4,5 h): <b>' + f(t) + ' mg = ' + f(t / 5) + ' ml</b> en bolo IV único en 5–10 s (tabla de la ficha técnica). No usar la dosis del IAM.';
            } else h += '<br><b>O tenecteplasa</b>: bolo único por peso, &lt;60 kg 15 mg · 60–69 kg 17,5 mg · 70–79 kg 20 mg · 80–89 kg 22,5 mg · ≥90 kg 25 mg.';
            return h + '<br>La decide el neurólogo de teleictus. Ver Fichas → Alteplasa / Tenecteplasa.<br><span class="pe-nota">AHA/ASA 2026; ESO 2021 y 2023; fichas técnicas Actilyse y Metalyse 25 mg.</span>';
          },
          q: 'Después de la trombólisis',
          opts: [{ l: 'Ver la vigilancia de las primeras 24 h', go: 'post' }]
        },
        post: {
          t: 'Vigilancia tras la trombólisis', escalas: ['nihss'],
          show: 'NIHSS y TA cada 15 min durante 2 h, cada 30 min hasta las 6 h y cada hora hasta las 24 h · <b>TA &lt;180/105</b> · sin antiagregantes ni anticoagulantes 24 h (heparina SC máx. 10.000 UI/día si es imprescindible) · evitar sondas y vías centrales las primeras horas · TC de control a las 24 h antes de los antitrombóticos.<br>Si aparece deterioro neurológico, cefalea, vómitos, HTA brusca o hinchazón de lengua o labios: panel de complicaciones.'
        }
      },
      extras: {
        t: 'Complicaciones',
        help: 'Ábrelas cuando aparezcan, en cualquier momento del flujograma.',
        items: [
          {
            farmacos: ['Ácido tranexámico'], l: 'Hemorragia tras la trombólisis', t: 'Sospecha de hemorragia', c: 'high',
            show: 'Deterioro neurológico, cefalea intensa, vómitos o HTA brusca: <b>parar la perfusión</b>, TC urgente, hemograma, coagulación y fibrinógeno.<br><b>Crioprecipitado 10 U IV</b> en 10–30 min, repitiendo hasta fibrinógeno ≥150 mg/dl (AHA/ASA 2026), o, si no hay o está contraindicado, <b>ácido tranexámico 1 g IV</b> en 10 min. Contactar con neurocirugía o la UCI de referencia.'
          },
          {
            farmacos: ['Metilprednisolona', 'Dexclorfeniramina', { n: 'Adrenalina', inf: false }], l: 'Angioedema orolingual', t: 'Angioedema orolingual', c: 'high',
            show: 'Más frecuente con IECA. <b>Parar la perfusión</b>, suspender los IECA y vigilar la vía aérea: intubación precoz (idealmente despierto y con fibroscopio) si afecta a laringe, paladar, suelo de la boca u orofaringe, o progresa en ~30 min.<br><b>Metilprednisolona 125 mg IV</b> + antihistamínico H1 IV (AHA: difenhidramina 50 mg; en España, dexclorfeniramina 5 mg IV) · famotidina 20 mg IV si está disponible.<br>Si progresa: <b>adrenalina 0,3 mg SC o 0,5 mg nebulizada</b>. Si no cede: icatibant 30 mg SC (cada 6 h, máx. 3 dosis/24 h) o inhibidor de la C1 esterasa 20 UI/kg IV (evidencia limitada).'
          },
          {
            farmacos: ['Labetalol', 'Urapidilo'], l: 'Tensión arterial alta', t: 'Tensión arterial', c: 'mid',
            show: '<b>Candidato a trombólisis o ya trombolisado:</b> &lt;185/110 antes y &lt;180/105 las 24 h siguientes.<br><b>No candidato:</b> tratar solo si TAS >220 y/o TAD >120, bajando ~10 % y evitando descensos >15 %.<br>Labetalol IV 10 mg en 1–2 min (máx. 150 mg) o urapidilo si hay contraindicación a los betabloqueantes.'
          },
          {
            farmacos: ['Haloperidol'], l: 'Agitación, coma o crisis comicial', t: 'Complicaciones neurológicas', c: 'mid',
            show: 'Agitación → <b>haloperidol 2,5–5 mg IV</b> (evitar benzodiacepinas) · coma con GCS &lt;9 → valorar aislar la vía aérea · crisis comicial → benzodiacepinas IV (no profilácticas).'
          },
          {
            farmacos: ['Paracetamol', { n: 'Insulina', inf: false }], l: 'Glucemia o fiebre', t: 'Glucemia y temperatura', c: 'mid',
            show: 'Hiperglucemia >180 mg/dl → insulina rápida IV según glucemia capilar · hipoglucemia &lt;60 → glucosa IV y mantener >70 · hipertermia >37,5 °C → paracetamol 1 g IV, evitar AAS.'
          }
        ]
      }
    };
  })(),
  steps:[
  {type:'action', text:'Test RAPID — estado clínico actual: ¿ríe asimétrico? ¿dificultad para levantar o mantener los brazos? ¿disartria?'},
  {type:'decision', text:'¿RAPID positivo (algún ítem alterado)?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Test RANCOM — estado clínico previo: ¿necesitaba ayuda para vestirse, moverse o ir al baño?'},
  {type:'decision', branch:'yes', text:'¿RANCOM negativo (no necesitaba ayuda previa)?', yes:'Sí', no:'No'},
  {type:'decision', branch:'yes', text:'¿Síntomas <24h de evolución (incluido AIT), inicio incierto o ictus del despertar?', yes:'Sí', no:'No'},
  {type:'action', text:'ACTIVAR CODI ICTUS: comunicar cualquier puntuación de la escala RACE a CECOS'},
  {type:'info', text:'Activar también ante sospecha de ictus de territorio posterior/vertebrobasilar (vértigo, diplopía, ataxia) y SIEMPRE en el paciente pediátrico, independientemente de la puntuación RACE. La sospecha de hemorragia subaracnoidea NO es Codi Ictus (circuito específico)'},
  {type:'info', text:'Escala RACE (0-9 puntos): paresia facial, paresia de brazo, paresia de pierna, desviación oculocefálica, y afasia (si debilidad derecha) o agnosia (si debilidad izquierda). ≥5 puntos = alta probabilidad de oclusión de gran vaso / ictus grave'},
  {type:'decision', text:'Paciente adulto (≥15a) — puntuación RACE', yes:'0-4', no:'5-9'},
  {type:'action', branch:'yes', text:'RACE 0-4: trasladar al centro de referencia de ictus más cercano (CTI, CPI o C-TI)'},
  {type:'action', branch:'no', text:'RACE 5-9: llamada al neurólogo referente. Si el centro de referencia hace trombectomía mecánica → trasladar allí. Si no, y es candidato a tPA → centro de referencia; si no es candidato → centro más cercano con capacidad de trombectomía'},
  {type:'info', text:'Candidato a tPA (SEM): llegada estimada al centro de referencia <4h desde el inicio de síntomas, sin anticoagulación, sin cirugía en los 15 días previos, sin antecedente de hemorragia cerebral. Matiz AHA/ASA 2026: con warfarina, un INR ≤1,7 no excluye; con anticoagulante oral directo tomado hace <48 h, valorar caso a caso con niveles específicos (dabigatrán: idarucizumab 5 g IV). Inicio incierto o del despertar: posible hasta 9 h con imagen de perfusión o RM'},
  {type:'action', text:'Pediátrico (<15a): activar SIEMPRE el Codi Ictus con cualquier puntuación RACE → centro de referencia pediátrico más cercano'},
  {type:'action', text:'Complicaciones agudas: agitación → haloperidol 2,5-5 mg IV (evitar benzodiacepinas) · coma GCS<9 → valorar aislamiento de vía aérea · crisis comicial → benzodiacepinas IV (no profilácticas) · tensión arterial: si NO es candidato a trombólisis, tratar solo si TAS>220 y/o TAD>120 → labetalol IV 10 mg/1-2min (máx 150 mg) o urapidilo si contraindicación a BB, bajar la TA ~10% evitando reducciones >15%; si ES candidato, bajarla a <185/110 ANTES de tratar y mantenerla <180/105 las 24 h siguientes (AHA/ASA 2026) · hiperglucemia >180 → insulina rápida IV según glucemia capilar · hipoglucemia <60 → glucosa IV, mantener >70 · hipertermia >37,5°C → paracetamol 1g IV, evitar AAS'},
  {type:'info', text:'Datos a transmitir a CECOS (registro SITREM): CIP/DNI, hora de inicio de síntomas, toma de anticoagulantes, resultado RAPID/RANCOM, puntuación RACE, glucemia capilar, TA, FC y temperatura'},
  {type:'info', text:'TROMBÓLISIS EN EL HOSPITAL DE CAMPDEVÀNOL (con teleictus): lo que sigue es la fase hospitalaria; el resto del Codi Ictus es el circuito prehospitalario del SEM'},
  {type:'action', text:'A la llegada: activar el teleictus (el neurólogo valora por videoconsulta y decide la trombólisis) · TC craneal sin contraste ± angio-TC (perfusión si se dispone) · glucemia capilar · peso real (o estimado) · 2 vías · TA <185/110. No esperar plaquetas, INR ni TTPa salvo sospecha (anticoagulante, hepatopatía, hemopatía). Objetivo puerta-aguja <60 min'},
  {type:'action', text:'Fármaco y dosis (peso real) — ALTEPLASA: 0,9 mg/kg, máx. 90 mg; el 10 % en bolo IV en 1 min y el 90 % con bomba en 60 min; desechar antes lo que sobre del vial y lavar al final con SF al mismo ritmo (ficha técnica Actilyse; AHA/ASA 2026; ESO 2021) · TENECTEPLASA: bolo IV único en 5–10 s por peso: <60 kg 15 mg · 60–69 kg 17,5 mg · 70–79 kg 20 mg · 80–89 kg 22,5 mg · ≥90 kg 25 mg (ficha técnica Metalyse 25 mg; AHA/ASA 2026 y ESO 2023: 0,25 mg/kg, máx. 25 mg, al mismo nivel que la alteplasa en <4,5 h). No usar 0,4 mg/kg. SEM v.03: «tPA», sin dosis. Ver Fichas → Alteplasa / Tenecteplasa'},
  {type:'info', text:'Ventanas: 0–4,5 h desde la última vez visto bien → alteplasa o tenecteplasa. 4,5–9 h o ictus del despertar con mismatch en perfusión o difusión-FLAIR en RM → alteplasa (EXTEND, WAKE-UP); no tenecteplasa si solo hay TC sin contraste (TWIST). Oclusión de gran vaso (RACE ≥5 o angio-TC): la trombólisis no debe retrasar el traslado a trombectomía'},
  {type:'info', text:'Contraindicaciones principales (AHA/ASA 2026): hemorragia en la TC · hemorragia intracraneal previa · ictus isquémico o TCE grave <3 meses · cirugía intracraneal o espinal <3 meses · cirugía mayor <14 días · hemorragia digestiva <21 días · TA no controlable <185/110 · glucemia <50 mg/dl (corregir y reevaluar) · plaquetas <100.000 · INR >1,7 · HBPM a dosis plenas <24 h · anticoagulante oral directo <48 h (caso a caso) · disección aórtica · endocarditis'},
  {type:'action', text:'Tras la trombólisis: exploración neurológica (NIHSS) y TA cada 15 min durante 2 h, cada 30 min hasta las 6 h y cada hora hasta las 24 h · TA <180/105 · sin antiagregantes ni anticoagulantes 24 h (heparina SC máx. 10.000 UI/día si imprescindible) · no sondas ni vías centrales las primeras horas si se puede evitar · TC de control a las 24 h antes de iniciar antitrombóticos'},
  {type:'info', text:'Deterioro neurológico, cefalea intensa, vómitos o HTA brusca → sospecha de HEMORRAGIA: parar la perfusión, TC urgente, hemograma, coagulación y fibrinógeno; crioprecipitado 10 U IV en 10–30 min, repitiendo hasta fibrinógeno ≥150 mg/dl (AHA/ASA 2026; en 2019, 200 mg/dl), o, si no hay crioprecipitado o está contraindicado, ácido tranexámico 1 g IV en 10 min; contactar con neurocirugía/UCI de referencia. ANGIOEDEMA orolingual (más con IECA): parar la perfusión, suspender los IECA y vigilar la vía aérea (intubación precoz, idealmente con fibroscopio y despierto, si afecta a laringe, paladar, suelo de la boca u orofaringe o progresa en ~30 min) · metilprednisolona 125 mg IV + antihistamínico H1 IV (la AHA usa difenhidramina 50 mg; en España, dexclorfeniramina 5 mg IV) · famotidina 20 mg IV si está disponible · si progresa: adrenalina 0,3 mg SC o 0,5 mg nebulizada · si no cede: icatibant 30 mg SC (repetible cada 6 h, máx. 3 dosis/24 h) o inhibidor de la C1 esterasa 20 UI/kg IV (evidencia limitada: series de casos)'}
], src:'Codi Ictus — SEM Catalunya, Grup de Treball en Ictus, v.03 abril 2023 · Fase hospitalaria (Campdevànol con teleictus): AHA/ASA 2026 Guideline for the Early Management of Acute Ischemic Stroke · ESO 2021 trombólisis IV (Berge E, Eur Stroke J 2021) y ESO 2023 tenecteplasa (Alamowitch S, Eur Stroke J 2023) · fichas técnicas Actilyse y Metalyse 25 mg (CIMA) · AcT (PMID 35779553), EXTEND (PMID 31067369), WAKE-UP (PMID 29766770), TWIST (Lancet Neurol 2023)'},

{id:'codi-ppt', title:'Codi PPT', sub:'Paciente traumático — criterios fisiológicos, anatómicos y mecanismo lesional', badge:'red', tag:'Crítico', rank:3, codigo:true,
  folleto:"codigos/C03._Codi_persona_pacient_traumàtica_(PPT).pdf",
  flow:(() => {
    const num = x => !isNaN(x) && x >= 0;
    const lact = v => num(v.edad) && v.edad < 1;
    const fisio = v => {
      const r = [];
      if (num(v.fr) && (v.fr > 29 || v.fr < (lact(v) ? 20 : 10))) r.push('FR ' + v.fr + ' rpm');
      if (num(v.tas) && v.tas < (lact(v) ? 70 : 90)) r.push('TAS ' + v.tas + ' mmHg');
      if (num(v.gcs) && v.gcs <= 13) r.push('Glasgow ' + v.gcs);
      return r;
    };
    const rts = v => {
      if (!num(v.fr) || !num(v.tas) || !num(v.gcs)) return null;
      const fr = v.fr > 29 ? 3 : v.fr >= 10 ? 4 : v.fr >= 6 ? 2 : v.fr >= 1 ? 1 : 0;
      const ta = v.tas > 89 ? 4 : v.tas >= 76 ? 3 : v.tas >= 50 ? 2 : v.tas >= 1 ? 1 : 0;
      const gc = v.gcs >= 13 ? 4 : v.gcs >= 9 ? 3 : v.gcs >= 6 ? 2 : v.gcs >= 4 ? 1 : 0;
      return fr + ta + gc;
    };
    const DEST01 = '<b>Destino</b> (tabla del folleto) · Adulto, isócrona CAT 3 &lt;30 min: CAT 3 (considerar CAT 3e) · isócrona CAT 3 >30 min: CAT 3 (considerar CAT 3e) / CAT 2b · Pediátrico: CAT P3 (considerar CAT P3e) / CAT P2b.';
    const TIPO = {
      q: '¿Traumatismo cerrado o penetrante?',
      help: 'Para decidir la inmovilización de la columna.',
      opts: [{ l: 'Cerrado', go: 'inm_c' }, { l: 'Penetrante', go: 'inm_p' }]
    };
    return {
      inputs: [{ k: 'edad', l: 'Edad', u: 'años' }, { k: 'fr', l: 'FR', u: 'rpm' }, { k: 'tas', l: 'TAS', u: 'mmHg' }, { k: 'gcs', l: 'Glasgow', u: 'puntos' }],
      start: 'fisio',
      nodes: {
        fisio: {
          escalas: ['gcs', 'gcsped'], q: '¿Tiene algún criterio FISIOLÓGICO?',
          help: v => {
            const r = fisio(v);
            return 'FR &lt;10 rpm (&lt;20 en &lt;1 año) o >29 rpm · TAS &lt;90 mmHg (&lt;70 en &lt;1 año) · ausencia de pulsos periféricos · Glasgow ≤13 (o pérdida transitoria de consciencia en &lt;1 año).' +
              (r.length ? '<br><b>Con los datos introducidos cumple: ' + r.join(' · ') + '.</b>' : '');
          },
          opts: [{ l: 'Sí, algún criterio', go: 'p0', sug: v => fisio(v).length > 0 }, { l: 'No', go: 'anat' }]
        },
        p0: {
          t: 'ACTIVAR CODI PPT — PRIORIDAD 0', c: 'high',
          show: 'Criterio fisiológico: <b>box de críticos</b>. Notificar a CECOS.<br>Traslado preferentemente con <b>USVA</b>; individualizar el destino si hay inestabilidad hemodinámica.<br>' + DEST01,
          ...TIPO
        },
        anat: {
          q: '¿Tiene algún criterio ANATÓMICO?',
          help: 'Herida penetrante en cabeza, cuello, tórax o extremidades (proximal a rodilla o codo) · fractura craneal abierta o hundimiento · tórax inestable (volet) · fractura de pelvis · ≥2 fracturas de huesos largos proximales (húmero o fémur; en &lt;1 año, ≥1) · amputación proximal a tobillo o muñeca · extremidad aplastada, desguantada o destrozada · parálisis o déficit motor o sensitivo de una extremidad (sospecha de lesión medular) · quemaduras de grado >II con extensión ≥15 % (≥10 % en &lt;10 años, >50 años o embarazadas) · quemaduras de grado III >5 % · quemadura completa de cara o cuello.',
          opts: [{ l: 'Sí, algún criterio', go: 'p1' }, { l: 'No', go: 'mec' }]
        },
        p1: {
          t: 'ACTIVAR CODI PPT — PRIORIDAD 1', c: 'high',
          show: 'Criterio anatómico: <b>box de críticos</b>. Notificar a CECOS.<br>Traslado preferentemente con <b>USVA</b>; individualizar el destino si hay inestabilidad hemodinámica.<br>' + DEST01,
          ...TIPO
        },
        mec: {
          q: '¿Tiene un MECANISMO LESIONAL de riesgo?',
          help: 'Caída: adultos >6 m, niños >2–3 veces su altura (en general >3 m) · colisión de vehículo con intrusión >30 cm en el lugar del acompañante o >45 cm en cualquier otro, eyección parcial o completa, muerte de un ocupante o telemetría de alto riesgo (en general >60 km/h) · atropello de peatón o ciclista con desplazamiento o impacto significativo (>30 km/h) · moto, bicicleta u otro dispositivo (p. ej., esquí) a velocidad significativa · sospecha de maltrato en &lt;3 años · objeto que cae desde altura (valorar peso y altura) · arma blanca o de fuego.',
          opts: [{ l: 'Sí', go: 'p2' }, { l: 'No', go: 'ant' }]
        },
        p2: {
          t: 'ACTIVAR CODI PPT — PRIORIDAD 2', c: 'mid',
          show: 'Mecanismo lesional de riesgo. Notificar a CECOS.<br>Sin criterios fisiológicos ni anatómicos: <b>considerar traslado con USVB</b>; individualizar si hay inestabilidad hemodinámica.<br><b>Destino</b> (tabla del folleto) · Adulto, isócrona CAT 3 &lt;30 o >30 min: CAT 2b / CAT 2a / CAT 1; CAT 3 (considerar CAT 3e) · Pediátrico: CAT P2a (considerar CAT P3e / CAT P2b / CAT P1).',
          ...TIPO
        },
        ant: {
          q: '¿Tiene algún antecedente o consideración especial?',
          help: 'Embarazo avanzado (>20 semanas) · anticoagulación o alteración de la coagulación · diálisis o múltiples patologías · niños pequeños o edad avanzada (orientativo &lt;3 y >65 años) · criterio del profesional.',
          opts: [{ l: 'Sí', go: 'p3', sug: v => num(v.edad) && (v.edad < 3 || v.edad > 65) }, { l: 'No', go: 'noact' }]
        },
        p3: {
          t: 'ACTIVAR CODI PPT — PRIORIDAD 3', c: 'mid',
          show: 'Antecedente relevante. Notificar a CECOS.<br>Sin criterios fisiológicos ni anatómicos: <b>considerar traslado con USVB</b>.<br><b>Destino:</b> hospital de referencia.',
          ...TIPO
        },
        noact: {
          t: 'Sin criterios de Codi PPT', c: 'low',
          show: 'No se activa el código. Valoración y traslado habituales; reevaluar si cambian las constantes.',
          ...TIPO
        },
        inm_c: {
          escalas: ['gcs'], q: '¿Cumple algún criterio de inmovilización completa de la columna?',
          help: 'Alteración de la consciencia (Glasgow &lt;15) · dolor, déficit neurológico o motor, o deformidad del raquis · mecanismo lesional de riesgo junto con: intoxicación (alcohol, drogas, fármacos), dolor intenso en otro lugar o lesión distractora, incapacidad para comunicarse (idioma, &lt;3 años, enfermedad) o &lt;3 años con mecanismo de riesgo (incluida sospecha de maltrato) y/o hipotensión mantenida.',
          opts: [{ l: 'Sí', go: 'inmov', sug: v => num(v.gcs) && v.gcs < 15 }, { l: 'No', go: 'noinmov' }]
        },
        inm_p: {
          q: '¿Sospecha de déficit o molestias neurológicas?',
          opts: [{ l: 'Sí', go: 'inmov' }, { l: 'No', go: 'noinmov' }]
        },
        inmov: {
          t: 'Inmovilización completa de la columna', c: 'mid',
          show: 'Traslado con <b>collarín cervical y colchón de vacío</b> hasta la transferencia. En caso de duda, inmovilizar.'
        },
        noinmov: {
          t: 'Sin criterios de inmovilización completa',
          show: 'No precisa inmovilización completa de la columna. En caso de duda, inmovilizar.'
        }
      },
      extras: {
        t: 'Durante la atención',
        help: 'Ábrelos cuando hagan falta, en cualquier momento del flujograma. El RTS usa la FR, la TAS y el Glasgow de arriba.',
        items: [
          {
            farmacos: ['Ácido tranexámico'], l: 'Hemorragia grave', t: 'Hemorragia grave', c: 'high',
            show: 'Compresión directa; <b>torniquete</b> si la hemorragia de una extremidad amenaza la vida; cinturón pélvico si se sospecha fractura de pelvis con hemorragia que amenaza la vida.<br>' +
              '<b>Ácido tranexámico</b> si sangra o hay riesgo de sangrado importante: <b>1 g IV en 10 min</b> (en 50–100 ml de SF) y después <b>1 g IV en 8 h</b>. Cuanto antes, dentro de las <b>3 h</b> desde la lesión; pasadas las 3 h, no iniciarlo. No en bolo rápido (hipotensión).<br>' +
              '<b>Hipotensión permisiva</b> sin TCE: TAS 80–90 mmHg (PAM 50–60) hasta controlar la hemorragia. Con TCE grave, no (ver «TCE grave»).<br>' +
              'Si hay criterios, activar la transfusión masiva (ver protocolo «Transfusión masiva»).<br><span class="pe-nota">Guía europea de hemorragia en el trauma, 6.ª ed., 2023 (PMID 36859355): torniquete 1B, cinturón pélvico 1C.</span>'
          },
          {
            l: 'TCE grave (Glasgow ≤8)', t: 'TCE grave (Glasgow ≤8)', c: 'high',
            show: 'Mantener <b>PAM ≥80 mmHg</b>: no aplicar la hipotensión permisiva.<br>Glasgow: leve 14–15 · moderado 9–13 · grave ≤8 (el folleto escribe «grave &lt;8»; el corte habitual, y el de la guía europea, es ≤8).<br><span class="pe-nota">Guía europea de hemorragia en el trauma, 6.ª ed., 2023.</span>'
          },
          {
            l: 'Escalas RTS e ITP', t: 'Escalas RTS (adulto) e ITP (pediátrico)',
            show: v => {
              const r = rts(v);
              return '<b>RTS</b> = FR + TAS + Glasgow (0–12)' + (r === null ? '. Introduce la FR, la TAS y el Glasgow para calcularlo.' : ': <b>' + r + '</b>' + (r < 12 ? ' → <b>traslado a un centro de trauma especializado</b>.' : '.')) + '<br>' +
                'FR 10–29 = 4 · >29 = 3 · 6–9 = 2 · 1–5 = 1 · 0 = 0 · TAS >89 = 4 · 76–89 = 3 · 50–75 = 2 · 1–49 = 1 · 0 = 0 · Glasgow 13–15 = 4 · 9–12 = 3 · 6–8 = 2 · 4–5 = 1 · 3 = 0. <b>RTS &lt;12 → centro de trauma especializado.</b><br>' +
                '<b>ITP</b> (sumar +2 / +1 / −1): peso >20 / 10–20 / &lt;10 kg · vía aérea normal / sostenible / insostenible · TAS >90 / 50–90 / &lt;50 mmHg · consciente / obnubilado / coma · heridas no / menores / mayores o penetrantes · fracturas no / cerrada / abiertas o múltiples. <b>ITP &lt;8 → centro de trauma especializado.</b>';
            }
          },
          {
            l: 'Transferencia al hospital', t: 'Transferencia al hospital',
            show: '<b>Verbal:</b> presentación (profesionales y paciente) · prioridad PPT (crítico P0/P1, no crítico P2/P3) · constantes · paciente: antecedentes (sexo, edad, perfil), accidente (qué ha pasado), patrón lesional (qué tiene), ABCDE y reconocimiento secundario (cómo le afecta), intervenciones y resultado (qué le hemos hecho), alertas (qué nos preocupa) · documentación · acompañantes.<br>' +
              '<b>Física:</b> camilla del hospital con tablero espinal e inmovilizador pélvico si está indicado · camillas juntas y a la misma altura · pasar al paciente con el colchón de vacío hecho · retirarlo con la técnica del puente lateral (líder en la cabecera) · no perder de vista monitorización, tubos y sondas.'
          }
        ]
      }
    };
  })(),
  steps:[
  {type:'decision', text:'¿Tiene algún criterio FISIOLÓGICO? (box de críticos)', yes:'Sí → Prioridad 0', no:'No'},
  {type:'info', branch:'yes', text:'Criterios fisiológicos: FR <10 rpm (<20 en <1a) o >29 rpm (todas las edades) · TAS <90 mmHg (<70 en <1a) · ausencia de pulsos periféricos · Glasgow ≤13 (o pérdida transitoria de consciencia en <1a)'},
  {type:'decision', branch:'no', text:'¿Tiene algún criterio ANATÓMICO? (box de críticos)', yes:'Sí → Prioridad 1', no:'No'},
  {type:'info', branch:'no', text:'Criterios anatómicos: herida penetrante en cabeza/cuello/tórax/extremidades (proximal a rodilla/codo) · fractura craneal abierta o con hundimiento · tórax inestable (volet) · fractura de pelvis · ≥2 fracturas de huesos largos proximales (húmero/fémur; en <1a ≥1) · amputación proximal a tobillo/muñeca · extremidad aplastada, degloved o destrozada · parálisis o déficit motor/sensitivo de extremidad (sospecha de lesión medular) · quemaduras grado >II con extensión ≥15% (≥10% en <10a, >50a o embarazada) · quemaduras grado III >5% · quemadura completa de cara o cuello'},
  {type:'decision', text:'¿Tiene mecanismo lesional de riesgo?', yes:'Sí → Prioridad 2', no:'No'},
  {type:'info', text:'Mecanismo de riesgo: caídas (adultos >6m, niños >2-3x su altura, en general >3m) · colisión de vehículo con intrusión >30cm (acompañante) o >45cm, eyección parcial/completa, muerte de un ocupante o telemetría con velocidad >60 km/h · atropello con desplazamiento o impacto >30 km/h · accidente de moto/bici a velocidad significativa · sospecha de maltrato en <3 años · objeto que cae desde altura · armas blancas o de fuego'},
  {type:'decision', text:'¿Tiene antecedentes relevantes?', yes:'Sí → Prioridad 3', no:'No → sin activación'},
  {type:'info', text:'Consideraciones especiales (Prioridad 3): embarazo avanzado (>20 semanas), anticoagulación o coagulopatía, diálisis o multipatología, <3 años o >65 años, criterio del profesional'},
  {type:'action', text:'ACTIVAR CODI PPT según la prioridad más alta alcanzada, notificar a CECOS'},
  {type:'info', text:'Destino: prioridades 0/1 → traslado preferentemente con USVA. Prioridades 2/3 sin criterios fisiológicos ni anatómicos → considerar USVB. Individualizar destino si inestabilidad hemodinámica'},
  {type:'action', text:'Inmovilización espinal completa (trauma cerrado) si: alteración de consciencia (GCS<15), dolor/déficit neurológico/deformidad de raquis, o mecanismo de riesgo con intoxicación, dolor distractor intenso, incapacidad de comunicarse o <3a con mecanismo de riesgo + hipotensión mantenida. Trauma penetrante: inmovilizar solo si sospecha de déficit neurológico'},
  {type:'info', text:'Escalas: Glasgow adulto/pediátrico (leve 14-15, moderado 9-13, grave <8) · RTS adulto (<12 → centro de trauma especializado) · Índice de Trauma Pediátrico ITP (<8 → centro de trauma especializado)'}
], src:'Codi PPT — SEM Catalunya, Grup de Treball de Trauma, revisión diciembre 2017'},

{id:'codi-sepsia', title:'Codi Sèpsia', sub:'NEWS ≥7 + sospecha de infección — activación y objetivos de la 1ª hora', badge:'red', tag:'Crítico', rank:4, codigo:true,
  folleto:'codigos/C04._Codi_sèpsia.pdf',
  flow:(() => {
    const f = n => n.toLocaleString('es-ES', { maximumFractionDigits: 1 });
    const hay = x => !isNaN(x) && x > 0;
    const faltaPeso = '<span class="pe-nota">Introduce el peso para calcular volúmenes y ml/h.</span>';
    const tam = v => hay(v.tas) && hay(v.tad) ? Math.round(v.tad + (v.tas - v.tad) / 3) : null;
    const ishock = v => hay(v.fc) && hay(v.tas) ? Math.round(v.fc / v.tas * 100) / 100 : null;
    const vital = v => {
      const r = [];
      if (hay(v.fr) && (v.fr > 30 || v.fr < 8)) r.push('FR ' + v.fr);
      if (hay(v.tas) && (v.tas < 90 || v.tas > 220)) r.push('TAS ' + v.tas);
      if (hay(v.fc) && (v.fc < 40 || v.fc > 131)) r.push('FC ' + v.fc);
      return r;
    };
    // NEWS2 (RCP 2017, tabla del folleto). cons: 0 alerta, 1 confusión nueva/voz/dolor/inconsciente.
    // oxi: 0 aire (escala 1), 1 O2 (escala 1), 2 aire (escala 2), 3 O2 (escala 2).
    const news = v => {
      const cons = v.resp.cons, oxi = v.resp.oxi;
      const p = [], falta = [];
      const add = (l, x, fn) => { if (hay(x)) p.push([l, fn(x)]); else falta.push(l); };
      add('FR', v.fr, x => x <= 8 ? 3 : x <= 11 ? 1 : x <= 20 ? 0 : x <= 24 ? 2 : 3);
      const o2 = oxi === 1 || oxi === 3;
      add('SpO₂', v.spo2, x => oxi >= 2
        ? (x <= 83 ? 3 : x <= 85 ? 2 : x <= 87 ? 1 : x <= 92 ? 0 : !o2 ? 0 : x <= 94 ? 1 : x <= 96 ? 2 : 3)
        : (x <= 91 ? 3 : x <= 93 ? 2 : x <= 95 ? 1 : 0));
      p.push([o2 ? 'Con oxígeno' : 'Aire ambiente', o2 ? 2 : 0]);
      add('TAS', v.tas, x => x <= 90 ? 3 : x <= 100 ? 2 : x <= 110 ? 1 : x <= 219 ? 0 : 3);
      add('FC', v.fc, x => x <= 40 ? 3 : x <= 50 ? 1 : x <= 90 ? 0 : x <= 110 ? 1 : x <= 130 ? 2 : 3);
      p.push(['Consciencia', cons === 1 ? 3 : 0]);
      add('Temperatura', v.temp, x => x <= 35 ? 3 : x <= 36 ? 1 : x <= 38 ? 0 : x <= 39 ? 1 : 2);
      return { total: p.reduce((a, x) => a + x[1], 0), p, falta };
    };
    const ml = (dosis, peso) => f(Math.round(dosis * peso * 60 / 160 * 10) / 10);
    const INFEC = {
      q: '¿Sospecha de infección o factores de riesgo de infección?',
      help: '<b>Sospecha:</b> fiebre (o sensación de haberla tenido), hipotermia no accidental o temperatura normal + ≥1 de: tos o expectoración · molestias urinarias, orina turbia o maloliente · dolor abdominal, diarrea o vómitos · cefalea o alteración del estado mental · dolor, inflamación o enrojecimiento de una extremidad · úlceras o heridas con supuración, catéter central con el punto de entrada enrojecido o sonda vesical permanente. O deterioro general sin otra causa que lo explique.<br>' +
        '<b>Factores de riesgo:</b> diabetes · corticoides o inmunosupresores crónicos · inmunosupresión (esplenectomía, VIH, hemodiálisis) · neoplasia activa o quimioterapia · infección reciente o en tratamiento antibiótico · cirugía o endoscopia (urinaria, biliar) en el último mes · heridas quirúrgicas, úlceras, catéter venoso central (diálisis, port-a-cath) o sonda vesical · >70 años con dependencia o en residencia (valorar antes su estado basal).',
      opts: [{ l: 'Sí', go: 'activar' }, { l: 'No', go: 'critico' }]
    };
    return {
      inputs: [{ k: 'peso', l: 'Peso real', u: 'kg' }, { k: 'fr', l: 'FR', u: 'rpm' }, { k: 'spo2', l: 'SpO₂', u: '%' }, { k: 'tas', l: 'TAS', u: 'mmHg' }, { k: 'tad', l: 'TAD', u: 'mmHg' }, { k: 'fc', l: 'FC', u: 'lpm' }, { k: 'temp', l: 'Temperatura', u: '°C' }],
      start: 'vital',
      nodes: {
        vital: {
          q: '¿Tiene algún criterio de RIESGO VITAL?',
          help: v => {
            const r = vital(v);
            return 'Al menos uno de: <b>A</b> vía aérea comprometida · <b>B</b> FR >30 o &lt;8 rpm (contada durante 1 min), trabajo respiratorio (escala de Patrick >3), cianosis · <b>C</b> TAS &lt;90 mmHg (o caída >40 % de la basal) o >220 mmHg, FC &lt;40 o >131 lpm · <b>D</b> somnolencia, estupor, coma o convulsiones. Un valor alterado aislado se interpreta según el estado general.' +
              (r.length ? '<br><b>Con los datos introducidos: ' + r.join(' · ') + '.</b>' : '');
          },
          opts: [{ l: 'Sí', go: 'rv', sug: v => vital(v).length > 0 }, { l: 'No', go: 'cons' }]
        },
        rv: {
          t: 'RIESGO VITAL', c: 'high',
          show: 'Actuación inicial (ABCDE) y traslado con <b>ALERTA DE PACIENTE CRÍTICO</b>.',
          ...INFEC
        },
        cons: {
          q: 'Nivel de consciencia (para el NEWS)',
          opts: [{ l: 'Alerta', go: 'oxi' }, { l: 'Confusión o desorientación nueva, responde solo a la voz o al dolor, o inconsciente', go: 'oxi' }]
        },
        oxi: {
          q: '¿Respira aire ambiente u oxígeno? (para el NEWS)',
          help: 'La escala 2 de SpO₂ es solo para pacientes con CPAP, BiPAP u oxígeno crónico domiciliario (objetivo de SpO₂ 88–92 %). Los demás, escala 1.',
          opts: [
            { l: 'Aire ambiente', go: 'news' },
            { l: 'Oxígeno', go: 'news' },
            { l: 'Aire ambiente, con CPAP, BiPAP u O₂ domiciliario (escala 2)', go: 'news' },
            { l: 'Oxígeno, con CPAP, BiPAP u O₂ domiciliario (escala 2)', go: 'news' }
          ]
        },
        news: {
          t: 'Escala NEWS2',
          show: v => {
            const n = news(v);
            return '<b>NEWS = ' + n.total + (n.falta.length ? ' (incompleto)' : '') + '</b>' + (n.total >= 7 ? ' → <b>≥7: paciente potencialmente crítico</b>' : '') + '<br>' +
              n.p.map(x => x[0] + ' ' + x[1]).join(' · ') +
              (n.falta.length ? '<br>Faltan: ' + n.falta.join(', ') + ' (introdúcelos arriba).' : '') +
              '<br><span class="pe-nota">Se puntúa la primera valoración o la peor durante la asistencia.</span>';
          },
          escalas: ['news2'], q: '¿Resultado del NEWS?',
          opts: [{ l: 'NEWS ≥7', go: 'news7', sug: v => news(v).total >= 7 }, { l: 'NEWS &lt;7', go: 'bajo', sug: v => !news(v).falta.length && news(v).total < 7 }]
        },
        news7: {
          t: 'NEWS ≥7', c: 'high',
          show: 'Comunicar a CECOS con la metodología IDEAS.',
          ...INFEC
        },
        bajo: {
          t: 'NEWS &lt;7', c: 'low',
          show: 'Comunicar a CECOS (IDEAS) y <b>valorar el traslado</b>. Repetir el NEWS si cambia la situación.'
        },
        critico: {
          t: 'Sin sospecha de infección', c: 'mid',
          show: 'No se activa el Codi Sèpsia: traslado a urgencias con <b>alerta de paciente crítico</b>.'
        },
        activar: { farmacos: [{ n: 'Fentanilo', inf: false }, 'Paracetamol', { n: 'Insulina', inf: false }],
          t: 'ACTIVAR CODI SÈPSIA', c: 'high',
          show: v => 'Comunicar a CECOS (IDEAS).<br>' +
            '<b>Primera hora:</b> hemocultivos y <b>antibiótico en &lt;1 h</b> · control del foco (drenaje precoz, &lt;12 h) · monitorización de FR, FC, TAM, relleno capilar, EtCO₂, índice de perfusión e índice de shock.<br>' +
            '<b>Objetivos:</b> TAM 65–70 mmHg · EtCO₂ >25 (35–45) mmHg · SpO₂ >90 % · glucemia &lt;180 mg/dl.<br>' +
            'Analgesia orientada al foco: si EVA ≥5/10 o dolor intenso, fentanilo 50 µg + paracetamol 1 g IV. Insulina rápida 10 UI SC si hiperglucemia; mantener cerca de 180 mg/dl y evitar la hipoglucemia.' +
            (tam(v) !== null || ishock(v) !== null ? '<br><b>Con los datos:</b> ' + [tam(v) !== null ? 'TAM ' + tam(v) + ' mmHg' : '', ishock(v) !== null ? 'índice de shock ' + f(ishock(v)) : ''].filter(Boolean).join(' · ') + '.' : '') +
            '<br><span class="pe-nota">SSC 2026: antibiótico inmediato, idealmente &lt;1 h, si el shock es posible, probable o seguro; en la sepsis posible sin shock, estudio rápido y antibiótico en &lt;3 h si persiste la sospecha.</span>',
          q: '¿Hay hipoperfusión o shock?',
          help: v => 'EtCO₂ &lt;25 mmHg · índice de perfusión &lt;1,4 · índice de shock (FC/TAS) >0,8 · TAM &lt;65 mmHg · mala perfusión periférica (relleno capilar lento, piel moteada).' +
            (ishock(v) !== null && ishock(v) > 0.8 ? '<br><b>Índice de shock ' + f(ishock(v)) + ' (>0,8).</b>' : '') +
            (tam(v) !== null && tam(v) < 65 ? '<br><b>TAM ' + tam(v) + ' mmHg (&lt;65).</b>' : ''),
          opts: [
            { l: 'Sí', go: 'fluidos', sug: v => (ishock(v) !== null && ishock(v) > 0.8) || (tam(v) !== null && tam(v) < 65) || (hay(v.tas) && v.tas < 90) },
            { l: 'No', go: 'nohipo' }
          ]
        },
        nohipo: {
          t: 'Sin hipoperfusión',
          show: 'Sin bolos de rutina. Mantener la monitorización y repetir la valoración; si aparece hipoperfusión, volver a esta pregunta.'
        },
        fluidos: { farmacos: ['Plasmalyte'],
          t: 'FLUIDOS', c: 'high',
          show: v => '<b>Cristaloide balanceado</b> (p. ej., Plasmalyte) en bolos de <b>500 ml</b>, reevaluando la tolerancia tras cada uno (crepitantes, SpO₂, trabajo respiratorio). Evitar coloides.<br>' +
            'Volumen orientativo: <b>20–30 ml/kg</b>' + (hay(v.peso) ? ' = <b>' + f(Math.round(20 * v.peso / 10) * 10) + '–' + f(Math.round(30 * v.peso / 10) * 10) + ' ml</b>' : '. ' + faltaPeso) + '.<br>' +
            '<span class="pe-nota">SSC 2026: sugiere al menos 30 ml/kg en las primeras 3 h, ajustado al paciente y con reevaluación frecuente (insuficiencia cardiaca, renal o cirrosis: más prudencia).</span>',
          q: 'Tras los fluidos, ¿persiste la hipotensión (TAM &lt;65 mmHg)?',
          opts: [{ l: 'Sí', go: 'nora', sug: v => tam(v) !== null && tam(v) < 65 }, { l: 'No, ha respondido', go: 'respuesta' }]
        },
        respuesta: {
          t: 'Responde a los fluidos', c: 'low',
          show: 'Reevaluar a menudo (TAM, relleno capilar, EtCO₂, diuresis); nuevos bolos de 500 ml solo si vuelve la hipoperfusión y los tolera.'
        },
        nora: { farmacos: [{ n: 'Noradrenalina', mg: 8, vol: 50, mlh: 3 }, 'Vasopresina', 'Hidrocortisona'],
          t: 'NORADRENALINA', c: 'high',
          show: v => 'Perfusión continua de elección. Dilución del folleto: <b>8 mg en 50 ml de SG 5 % (160 µg/ml)</b>. Empezar a <b>3 ml/h</b> (8 µg/min) y subir de 3 en 3 ml/h hasta TAM 65–70 mmHg.<br>' +
            (hay(v.peso) ? 'Dosis máxima 1 µg/kg/min = <b>' + ml(1, v.peso) + ' ml/h</b> con ' + f(v.peso) + ' kg.<br>' : 'Dosis máxima 1 µg/kg/min (con 80 kg, 30 ml/h). ' + faltaPeso + '<br>') +
            'Se puede empezar por una <b>vía periférica</b> (vena de la fosa antecubital o más proximal, por poco tiempo) en lugar de esperar a la vía central. Vigilar la extravasación. Para otra dilución, ver Perfusión IV.<br>' +
            '<b>Si sigue subiendo la noradrenalina:</b> añadir vasopresina en lugar de seguir subiéndola (SSC 2021: suele empezarse con noradrenalina 0,25–0,5 µg/kg/min' + (hay(v.peso) ? ' = ' + ml(0.25, v.peso) + '–' + ml(0.5, v.peso) + ' ml/h' : '') + ') e <b>hidrocortisona 200 mg/día</b> IV (50 mg cada 6 h) si persiste la necesidad de vasopresor (SSC 2021: a partir de 0,25 µg/kg/min durante ≥4 h).<br>' +
            '<span class="pe-nota">Objetivo de TAM: SSC 2026 sugiere 60–65 mmHg al inicio en pacientes ≥65 años; el folleto da 65–70.</span>'
        }
      },
      extras: {
        t: 'Durante la atención',
        help: 'Ábrelos cuando hagan falta, en cualquier momento del flujograma. Los volúmenes usan el peso de arriba.',
        items: [
          {
            l: 'Niños', t: 'Sepsis grave en niños', c: 'high',
            show: v => '<b>Detección:</b> foco, órganos con disfunción, mal aspecto. Administrar oxígeno.<br>' +
              '<b>Reanimación</b> (ERC PLS 2025): bolos de cristaloide de <b>10 ml/kg</b>' + (hay(v.peso) ? ' = <b>' + f(Math.round(10 * v.peso)) + ' ml</b>' : '') + ', reevaluando tras cada uno, hasta 40–60 ml/kg; vasoactivo no más tarde de 30–40 ml/kg; parar si hay signos de sobrecarga.<br>' +
              '<b>Control del foco:</b> cultivos, antibiótico &lt;1 h, drenaje precoz &lt;12 h.<br>' +
              '<b>Objetivos:</b> estado mental normal · diuresis >1 ml/kg/h · relleno capilar &lt;2 s · TA normal · pulsos periféricos iguales a los centrales.<br>' +
              '<b>Valoración:</b> soporte inotrópico, UCI pediátrica, necesidad de ECMO.' + (hay(v.peso) ? '' : ' ' + faltaPeso)
          },
          {
            l: 'Escala de Patrick', t: 'Trabajo respiratorio (escala de Patrick)',
            show: 'No usa la musculatura accesoria 0 · tensión cervical sin hundimiento 1 · no usa la musculatura subcostal 2 · tiraje subcostal marcado 3 · clavículas hundidas 4 · respiración abdominal 5. <b>>3 = criterio de riesgo vital.</b>'
          },
          {
            l: 'Comunicación IDEAS', t: 'Comunicación a CECOS (IDEAS)',
            show: '<b>I</b>dentificación: edad y sexo · sospecha <b>D</b>iagnóstica y síntoma guía · <b>E</b>stado: escala NEWS · <b>A</b>ctuación: tratamiento y acciones relevantes · <b>S</b>: alerta de paciente crítico o activación del Codi Sèpsia, si cumple los criterios.'
          }
        ]
      }
    };
  })(),
  steps:[
  {type:'action', text:'Calcular escala NEWS (frecuencia respiratoria, SpO₂, TAS, frecuencia cardíaca, nivel de consciencia, temperatura)'},
  {type:'decision', text:'¿Riesgo vital (vía aérea comprometida; FR>30 o <8; TAS<90 o >220; FC<40 o >131; somnolencia/estupor/coma/convulsiones) o NEWS ≥7?', yes:'Sí', no:'No → traslado sin activación'},
  {type:'decision', branch:'yes', text:'¿Sospecha de infección o factores de riesgo de infección?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'ACTIVAR CODI SÈPSIA'},
  {type:'action', branch:'no', text:'Traslado a urgencias con alerta de paciente crítico (sin activar código)'},
  {type:'info', text:'Sospecha de infección: fiebre (o sensación de haberla tenido), hipotermia no accidental o temperatura normal + ≥1 de: tos/expectoración, molestias urinarias, dolor abdominal/diarrea/vómitos, cefalea/alteración del estado mental, dolor/inflamación de una extremidad, úlceras o heridas supurativas, catéter central o sonda vesical con signos de infección — o deterioro general sin causa que lo explique'},
  {type:'info', text:'Factores de riesgo de infección: diabetes, corticoides/inmunosupresores crónicos, inmunosupresión (esplenectomía, VIH, hemodiálisis), neoplasia activa o quimioterapia, infección reciente o en tratamiento antibiótico, cirugía/endoscopia en el último mes, heridas quirúrgicas/úlceras/catéter central/sonda vesical, >70 años con dependencia o en residencia (valorar el estado basal antes de activar)'},
  {type:'action', text:'Objetivos de la primera hora: cristaloides 20-30 ml/kg (pediatría — ERC PLS 2025: bolos de 10 ml/kg con reevaluación tras cada uno, hasta 40-60 ml/kg; vasoactivo no más tarde de 30-40 ml/kg; parar si sobrecarga) → cultivos + antibiótico <1h + drenaje precoz del foco <12h → monitorización continua (FR, FC, TA media, relleno capilar, EtCO₂)'},
  {type:'info', text:'Objetivos: TA media 65-70 mmHg · EtCO₂ >25 (35-45) · SpO₂ >90% · glucemia <180 mg/dl'},
  {type:'action', text:'Fluidos: descargas de 500 ml de cristaloides balanceados si NEWS≥7 y EtCO₂<25/shock index>0,8 (evitar coloides). Noradrenalina en perfusión continua (máx 1 mcg/kg/min) si no responde a fluidos, objetivo TA media ≥65-70. Analgesia: fentanilo 50 mcg + paracetamol 1g IV si dolor. Insulina rápida 10 UI SC si hiperglucemia, mantener ~180 mg/dl evitando hipoglucemia'},
  {type:'info', text:'Comunicación a CECOS — metodología IDEAS: Identificación del paciente, sospecha Diagnóstica, Estado (escala NEWS), Actuación realizada, alerta/activación del Codi Sèpsia'}
], src:'Codi Sèpsia — SEM Catalunya, Junta Clínica, enero 2021'},

{id:'codi-risc-suicidi', title:'Codi Risc Suïcidi', sub:'Cribado MINI y estratificación del riesgo suicida', badge:'amber', tag:'Urgente', rank:5, codigo:true,
  folleto:'codigos/C05.Codi_risc_suïcidi.pdf', steps:[
  {type:'action', text:'Ante sospecha de riesgo de suicidio, aplicar el cribado MINI (mini-entrevista neuropsiquiátrica) sobre el último mes'},
  {type:'info', text:'Puntuación MINI si la respuesta es SÍ: ¿ha pensado que estaría mejor muerto/a? 1p · ¿ha querido hacerse daño? 2p · ¿ha pensado en el suicidio? 6p · ¿ha planeado cómo hacerlo? 10p · ¿lo ha intentado recientemente? 10p · ¿lo ha intentado alguna vez en la vida? 4p'},
  {type:'decision', text:'Puntuación total o tentativa de suicidio', yes:'≥10 puntos o tentativa → riesgo ALTO', no:'1-5 riesgo BAJO · 6-9 riesgo MEDIO'},
  {type:'action', branch:'yes', text:'ACTIVAR CODI RISC SUÏCIDI: activación de recursos, valoración del estado del paciente + contención, traslado a hospital de referencia CRS'},
  {type:'action', branch:'no', text:'Consejo telefónico con acompañamiento continuado + información de dispositivos de la red (Atención Primaria, Salud Mental)'},
  {type:'info', text:'Excepcionalmente, la comorbilidad y los factores de riesgo presentes en un paciente de riesgo medio pueden justificar subir el nivel de sospecha a riesgo alto'},
  {type:'info', text:'Factores de riesgo: depresión mayor · diagnóstico psiquiátrico (trastorno depresivo, psicótico, bipolar, límite de la personalidad, conducta alimentaria) · impulsividad/agresividad/agitación/consciencia alterada · consumo excesivo o dependencia de alcohol u otras sustancias · enfermedades orgánicas graves · género hombre, >65 años o adolescente · problemas sociales · eventos vitales estresantes <3 meses (laboral, pareja, económico, familiar) · acceso a armas/tóxicos/medios letales o situaciones de violencia · antecedentes familiares de 1er grado de suicidio consumado'},
  {type:'info', text:'Seguimiento posterior al alta hospitalaria (061/Salut Respon, a los 30 días): ¿recibió llamada del CSM? ¿tiene visita confirmada? ¿se encuentra mejor? ¿ha sido visitado en su CSM?'}
], src:'Codi Risc Suïcidi — SEM Catalunya, Grup de Treball en malalties mentals, v.01 junio 2024'},


{id:'intoxicacion-aguda', title:'Intoxicación aguda y toxíndromes', sub:'ABCDE → toxíndrome → descontaminación → antídoto → eliminación', badge:'red', tag:'Crítico', rank:14, steps:[
  {type:'action', text:'ABCDE. Vía aérea avanzada si GCS ≤ 8 o pérdida de reflejos protectores. Oxígeno, monitorización continua y dos accesos venosos.\nEl tratamiento es de SOPORTE: la mayoría de intoxicados sobreviven por una buena vía aérea y una buena hemodinámica, no por el antídoto'},
  {type:'action', text:'GLUCEMIA CAPILAR SIEMPRE, en todo paciente con alteración del nivel de consciencia. La hipoglucemia imita cualquier toxíndrome y es la causa reversible que más se pasa por alto'},
  {type:'action', text:'ECG de 12 derivaciones midiendo QRS y QTc. En toxicología son marcadores de gravedad, no un hallazgo incidental:\n• QRS > 100 ms = bloqueo de canales de sodio (ATC, flecainida, cocaína, difenhidramina, bupropión, quinina)\n• QTc > 500 ms = riesgo de torsade de pointes (metadona, antipsicóticos, citalopram, antiarrítmicos)\n• R en aVR > 3 mm predice convulsiones y arritmia en intoxicación por ATC'},
  {type:'action', text:'Anamnesis toxicológica dirigida: QUÉ, CUÁNTO, CUÁNDO, POR QUÉ VÍA, CON QUÉ MÁS (coingesta de alcohol o benzodiazepinas) e INTENCIONALIDAD.\nContrastar siempre con familia, SEM y farmacia: contar blísteres y envases. La cantidad referida por el paciente es poco fiable'},
  {type:'info', text:'"Coma cocktail" DIRIGIDO, no a ciegas: glucosa 25 g IV si hipoglucemia · tiamina 100 mg IV si desnutrición o alcoholismo (antes de la glucosa) · naloxona titulada si depresión respiratoria.\nEl flumazenilo NO forma parte del cóctel: puede desencadenar convulsiones y arritmias en coingesta con ATC o en dependencia crónica a benzodiazepinas'},
  {type:'decision', text:'¿Depresión respiratoria + miosis puntiforme + estupor?', yes:'Toxíndrome opioide', no:'Clasificar por toxíndrome'},
  {type:'action', branch:'yes', text:'NALOXONA 0,04 mg IV, doblando la dosis cada 2 – 3 min hasta ventilación eficaz (evita precipitar abstinencia en dependientes). Si no hay respuesta tras 10 mg acumulados, replantear el diagnóstico. En apnea o depresión respiratoria extrema, iniciar directamente con 0,2 – 2 mg IV.\nObjetivo: que VENTILE, no que despierte. Vida media más corta que la de la mayoría de opioides: vigilar la resedación y valorar perfusión (2/3 de la dosis eficaz por hora)'},
  {type:'action', branch:'no', text:'Clasificar el toxíndrome con cuatro datos de la exploración: PUPILAS · PIEL (seca o húmeda) · RUIDOS INTESTINALES · TEMPERATURA. Estos cuatro separan los seis síndromes clásicos'},
  {type:'info', text:'TOXÍNDROME ANTICOLINÉRGICO\nPupilas: midriasis arreactiva · FC/TA/Tª: ↑ / ↑ / ↑ · Piel: SECA, roja y caliente · Ruidos intestinales: abolidos, íleo y retención urinaria\nClínica: delirio agitado, alucinaciones visuales, habla farfullante, mioclonías\nAgentes: atropina, antihistamínicos, ATC, antipsicóticos, escopolamina, Datura stramonium (estramonio)\nManejo: benzodiazepinas a dosis altas + enfriamiento. Fisostigmina 1 – 2 mg IV lenta (en 5 min) solo en delirio puro con monitorización; CONTRAINDICADA si QRS ancho o sospecha de ATC (riesgo de asistolia y convulsiones)\nRegla mnemotécnica: loco como una cabra, ciego como un topo, seco como un hueso, rojo como una remolacha, caliente como el infierno'},
  {type:'info', text:'TOXÍNDROME COLINÉRGICO\nPupilas: miosis · FC/TA/Tª: ↓ / ↓ / normal · Piel: HÚMEDA, sudorosa · Ruidos intestinales: aumentados, diarrea\nClínica: DUMBELS (diarrea, micción, miosis, bradicardia, broncorrea, emesis, lagrimeo, salivación). La BRONCORREA y las FASCICULACIONES son los hallazgos que matan y los que orientan\nAgentes: organofosforados y carbamatos (insecticidas), armas neurotóxicas, setas del género Inocybe y Clitocybe, fisostigmina, rivastigmina\nManejo: retirar ropa y descontaminación cutánea con EPI. ATROPINA 1 – 2 mg IV DOBLANDO la dosis cada 5 min hasta secar campos pulmonares (no hay techo de dosis; el objetivo es la auscultación, no la FC). Pralidoxima 30 mg/kg IV en organofosforados. Benzodiazepinas si convulsiones'},
  {type:'info', text:'TOXÍNDROME SIMPATICOMIMÉTICO\nPupilas: midriasis reactiva · FC/TA/Tª: ↑↑ / ↑↑ / ↑ · Piel: DIAFORÉTICA · Ruidos intestinales: conservados o aumentados\nClínica: agitación, hipertensión extrema, dolor torácico, convulsiones, rabdomiólisis\nAgentes: cocaína, anfetaminas y derivados, catinonas sintéticas, MDMA, teofilina, cafeína\nManejo: BENZODIAZEPINAS IV a dosis altas como primera línea (sedar controla TA, FC y Tª a la vez) + enfriamiento activo si Tª > 39 °C. Fentolamina o nitroglicerina si HTA refractaria.\nDIFERENCIA CLAVE con el anticolinérgico: aquí la piel está HÚMEDA y hay ruidos intestinales; allí está SECA y hay íleo'},
  {type:'info', text:'TOXÍNDROME OPIOIDE\nPupilas: MIOSIS PUNTIFORME · FC/TA/Tª: ↓ / ↓ / ↓ · Piel: normal o fría · Ruidos intestinales: disminuidos\nClínica: la BRADIPNEA es el hallazgo dominante y el que mata; depresión del SNC, hipotonía. La miosis puede faltar con meperidina, tramadol o coingesta de simpaticomiméticos\nAgentes: heroína, fentanilo y análogos, metadona, oxicodona, tramadol, codeína\nManejo: naloxona titulada + soporte ventilatorio. Los fentanilos suelen requerir dosis mayores y repetidas. La metadona además prolonga el QT'},
  {type:'info', text:'TOXÍNDROME SEDANTE-HIPNÓTICO\nPupilas: normales o mióticas · FC/TA/Tª: ↓ / ↓ / ↓ · Piel: normal · Ruidos intestinales: disminuidos\nClínica: depresión del SNC CON CONSTANTES RELATIVAMENTE CONSERVADAS. La depresión respiratoria marcada sugiere coingesta o dosis masiva\nAgentes: benzodiazepinas, alcohol, barbitúricos, GHB, zolpidem, pregabalina\nManejo: SOPORTE. Flumazenilo 0,2 mg IV (hasta 3 mg) solo en sobredosis pura, iatrogénica y en paciente sin dependencia ni antecedente convulsivo. En el GHB es típico el coma profundo con recuperación brusca y espontánea en 2 – 4 h'},
  {type:'info', text:'TOXÍNDROME SEROTONINÉRGICO\nPupilas: midriasis · FC/TA/Tª: ↑ / ↑ / ↑↑ · Piel: diaforética · Ruidos intestinales: aumentados, diarrea\nClínica: CLONUS (inducible, espontáneo u ocular) e HIPERREFLEXIA de predominio en MMII: es el hallazgo que lo define. Agitación, temblor, rigidez. Criterios de Hunter\nAgentes: ISRS, IMAO, tramadol, linezolid, triptanes, litio, MDMA, fentanilo (a menudo por interacción entre dos fármacos)\nManejo: retirar el agente + benzodiazepinas + enfriamiento. Ciproheptadina 12 mg VO y después 2 mg / 2 h. Si Tª > 41,5 °C: relajación, intubación y enfriamiento agresivo\nDIAGNÓSTICO DIFERENCIAL: síndrome neuroléptico maligno (rigidez en tubo de plomo generalizada, HIPOrreflexia, instauración en días, tras antipsicóticos) e hipertermia maligna (tras anestésicos halogenados o succinilcolina, dantroleno)'},
  {type:'decision', text:'¿QRS > 100 ms con sospecha de bloqueo de canales de sodio?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'BICARBONATO SÓDICO 1 M: 1 – 2 mEq/kg en bolo IV en 1 – 2 min, repetible, hasta estrechar el QRS por debajo de 100 ms o alcanzar pH 7,45 – 7,55. Valorar perfusión de mantenimiento.\nEs el tratamiento del bloqueo del canal de sodio, no un simple alcalinizante. Vigilar potasio y calcio iónico'},
  {type:'decision', text:'¿Ingesta hace menos de 1 – 2 h, de tóxico adsorbible, con vía aérea intacta o protegida?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'CARBÓN ACTIVADO dosis única 1 g/kg (50 g en el adulto) VO o por SNG. El beneficio máximo es en los primeros 30 – 60 min y decae rápidamente después. No mejora el pronóstico de forma demostrada: no administrarlo de rutina'},
  {type:'info', text:'CARBÓN ACTIVADO — NO ADSORBE ni debe darse en: cáusticos, hidrocarburos, alcoholes (etanol, metanol, etilenglicol), litio, hierro, potasio, ácido bórico.\nCONTRAINDICADO si vía aérea no protegida (riesgo de neumonitis por aspiración), íleo, perforación o cirugía digestiva reciente.\nJarabe de ipecacuana: PROSCRITO. Lavado gástrico: prácticamente abandonado, valorable solo en ingesta masiva de riesgo vital y menos de 60 min, con vía aérea asegurada'},
  {type:'action', text:'IRRIGACIÓN INTESTINAL TOTAL con polietilenglicol 1,5 – 2 L/h por SNG hasta efluente claro. Indicaciones concretas: LITIO, HIERRO, potasio, formas de liberación prolongada o cubierta entérica, y transportadores intracorporales de drogas (body packers).\nContraindicada si obstrucción, perforación, íleo, inestabilidad hemodinámica o vía aérea comprometida'},
  {type:'info', text:'ANTÍDOTOS — parte 1\n• Paracetamol → N-acetilcisteína, según nomograma de Rumack-Matthew a partir de las 4 h; pauta IV de 21 h. Ante la duda, tratar\n• Opioides → naloxona 0,04 mg IV titulada (0,2 – 2 mg si apnea)\n• Benzodiazepinas → flumazenilo 0,2 mg IV, titulando hasta 3 mg (uso restringido)\n• ATC y bloqueadores del canal de sodio → bicarbonato 1 – 2 mEq/kg\n• Betabloqueantes → glucagón 2 – 10 mg IV (perfusión hasta 15 mg/h si responde) + insulina a dosis altas euglucémica (1 UI/kg bolo, después 1 UI/kg/h, escalable hasta 10 UI/kg/h, con glucosa)\n• Calcioantagonistas → gluconato cálcico 10 % 30 mL + la misma pauta de insulina a dosis altas\n• Digoxina → anticuerpos Fab antidigoxina, por digoxinemia o dosis empírica'},
  {type:'info', text:'ANTÍDOTOS — parte 2\n• Metanol y etilenglicol → fomepizol 15 mg/kg de carga (etanol si no se dispone) + hemodiálisis\n• Cianuro e inhalación de humo de incendio → hidroxocobalamina 5 g IV (70 mg/kg) en 15 min\n• Monóxido de carbono → oxígeno al 100 % con reservorio; cámara hiperbárica si coma, focalidad, isquemia miocárdica, gestante o COHb > 25 %\n• Metahemoglobinemia → azul de metileno 1 – 2 mg/kg IV\n• Isoniazida → piridoxina 1 g por cada g ingerido (5 g empíricos)\n• Organofosforados → atropina a dosis crecientes + pralidoxima 30 mg/kg\n• Sulfonilureas → glucosa + octreótido 50 – 100 microgramos SC/8 h\n• Anestésicos locales y tóxicos lipófilos → emulsión lipídica 20 %, 1,5 mL/kg en bolo + 0,25 mL/kg/min\n• Dicumarínicos → vitamina K + concentrado de complejo protrombínico · Dabigatrán → idarucizumab · Anti-Xa → andexanet alfa'},
  {type:'action', text:'ELIMINACIÓN EXTRACORPÓREA — valorar hemodiálisis intermitente (modalidad de elección) en tóxicos de bajo peso molecular, bajo volumen de distribución y baja unión a proteínas:\nlitio · salicilatos · metanol · etilenglicol · metformina (acidosis láctica) · teofilina · fenobarbital · valproico · carbamazepina\nUmbrales EXTRIP: salicilatos con alteración del nivel de consciencia, SDRA con necesidad de O2, fracaso del tratamiento estándar, pH ≤ 7,20 o concentración > 100 mg/dL (> 90 mg/dL si insuficiencia renal). Etilenglicol si acidosis grave, coma, convulsiones o fracaso renal'},
  {type:'action', text:'Alcalinización urinaria con bicarbonato (pH urinario 7,5 – 8) en salicilatos y fenobarbital. Carbón activado en dosis múltiples (25 g / 2 – 4 h) en carbamazepina, dapsona, fenobarbital, quinina y teofilina'},
  {type:'info', text:'RED FLAGS — reevaluar y escalar de inmediato:\n• QRS > 100 ms o QTc > 500 ms\n• Tª > 40 °C (hipertermia tóxica: es una emergencia, enfriar de forma activa)\n• Convulsiones repetidas: benzodiazepinas; si no ceden, pensar en isoniazida (piridoxina) y en teofilina\n• Bradicardia o hipotensión refractarias a fluidos y aminas: pensar en betabloqueantes, calcioantagonistas y digoxina\n• Acidosis metabólica con anion gap elevado que empeora pese al soporte\n• Deterioro del nivel de consciencia tras un periodo de mejoría (efecto tardío: paracetamol, metanol, setas hepatotóxicas, liberación prolongada)'},
  {type:'info', text:'ANALÍTICA ORIENTADA AL TÓXICO: gasometría con láctico · anion gap · GAP OSMOLAR (elevado en metanol, etilenglicol, isopropanol) · co-oximetría para COHb y metahemoglobina (la pulsioximetría convencional ENGAÑA en ambas) · paracetamolemia y salicilemia sistemáticas en toda ingesta voluntaria · CK si agitación o inmovilización · función renal y hepática · test de gestación'},
  {type:'info', text:'INTENCIONALIDAD: toda ingesta voluntaria requiere valoración psiquiátrica ANTES del alta, con el paciente ya libre de efecto tóxico. Estratificar el riesgo con el protocolo del Codi Risc Suïcidi. No dar el alta médica y psiquiátrica en el mismo acto sin reevaluar'},
  {type:'info', text:'Servicio de Información Toxicológica (España, 24 h): 91 562 04 20. Consultar de forma precoz en tóxico desconocido, dosis masiva, paciente pediátrico o gestante, y siempre antes de indicar un antídoto poco habitual'}
],
  src:'ERC 2025 Special Circumstances · PMID 41117569 · Carbon activado dosis unica, AACT/EAPCCT · PMID 15822758 · Irrigacion intestinal total, AACT/EAPCCT · PMID 25511637 · Jarabe de ipecacuana, AACT/EAPCCT · PMID 23406298 · Criterios de Hunter para toxicidad serotoninergica · PMID 12925718 · EXTRIP salicilatos · PMID 25986310 · EXTRIP etilenglicol · PMID 36765419 · Insulina a dosis altas en calcioantagonistas y betabloqueantes · PMID 30141827'},

{id:'epoc-agudizado', title:'EPOC agudizado (SAE)', sub:'Gravedad (criterios de Roma · GOLD 2026), tratamiento en urgencias y destino inicial', badge:'amber', tag:'Urgente', rank:12.5,
  flujograma:'protocolos/Flujograma_SAE_Campdevanol.pdf',
  /* Evaluador interactivo: index.html pinta los items y llama a calc(v) con
     v[k] = número (NaN si vacío), booleano (chk) o número (sel). calc devuelve
     secciones [{t: título, c: 'low'|'mid'|'high'|'', h: html}]. */
  eval:{
    items:[
      {t:'h', l:'Riesgo vital y nivel de intensidad terapéutica'},
      {k:'vital', t:'chk', l:'Riesgo vital inmediato: parada o preparada respiratoria, estupor/coma o agitación incontrolable, inestabilidad hemodinámica o arritmia grave, pH &lt;7,20 con deterioro rápido'},
      {k:'iot', t:'sel', l:'¿Candidato a IOT/UCI? (PIIC/PCC, voluntades anticipadas, situación basal, opinión del paciente)', o:[['Sin decidir',2],['Sí',1],['No: VMNI como techo',0]]},
      {t:'h', l:'Gravedad del episodio — criterios de Roma'},
      {k:'eva', t:'num', l:'Disnea EVA (0–10)', u:'0–10'},
      {k:'disAct', t:'sel', l:'Disnea actual en escala mMRC (GesEPOC)', o:[['0–2: solo al andar deprisa o en llano a su paso',0],['3–4: se para tras ~100 m o disnea al vestirse o en reposo',1]]},
      {k:'fr', t:'num', l:'Frecuencia respiratoria', u:'rpm'},
      {k:'fc', t:'num', l:'Frecuencia cardiaca', u:'lpm'},
      {k:'spo2', t:'num', l:'SpO₂ en reposo (aire ambiente u O₂ habitual)', u:'%'},
      {k:'spo2b', t:'num', l:'SpO₂ basal conocida (opcional)', u:'%'},
      {k:'pcr', t:'num', l:'PCR (opcional)', u:'mg/L'},
      {t:'h', l:'Gasometría y soporte'},
      {k:'ph', t:'num', l:'pH', u:'7,xx'},
      {k:'pco2', t:'num', l:'PaCO₂ (o pCO₂ venosa para seguir la tendencia)', u:'mmHg'},
      {k:'po2', t:'num', l:'PaO₂ (opcional)', u:'mmHg'},
      {k:'o2', t:'sel', l:'Oxígeno que necesita para SpO₂ 88–92 %', o:[['Aire ambiente / O₂ habitual',0],['Venturi ≤35 % (o gafas 1–2 L/min)',1],['Venturi &gt;35 % (≤40 %)',2],['FiO₂ &gt;40 % o no corrige con Venturi',3]]},
      {k:'musc', t:'chk', l:'Musculatura accesoria, respiración paradójica o fatiga muscular'},
      {k:'mental', t:'sel', l:'Nivel de conciencia', o:[['Normal',0],['Confusión o somnolencia',1],['Estupor o coma',2]]},
      {t:'h', l:'Antibiótico'},
      {k:'purul', t:'chk', l:'Esputo purulento'},
      {k:'vol', t:'chk', l:'Aumento del volumen del esputo'},
      {k:'disnea', t:'chk', l:'Aumento de la disnea'},
      {k:'fiebre', t:'chk', l:'Fiebre'},
      {k:'cultivo', t:'chk', l:'Cultivo de esputo positivo en una exacerbación previa'},
      {k:'pseudo', t:'chk', l:'Riesgo de Pseudomonas (aislamiento previo, ≥4 ciclos de antibiótico/año, FEV₁ &lt;30 %, bronquiectasias, corticoide oral crónico, ingreso reciente)'},
      {t:'h', l:'Situación basal y entorno'},
      {k:'fev1', t:'chk', l:'FEV₁ post-BD &lt;50 %'},
      {k:'mmrc', t:'chk', l:'Disnea basal mMRC ≥2'},
      {k:'exac', t:'chk', l:'≥2 agudizaciones o ≥1 ingreso en el último año'},
      {k:'social', t:'chk', l:'Comorbilidad grave descompensada (IC, arritmia) o apoyo domiciliario insuficiente'},
      {k:'compl', t:'chk', l:'Complicación que requiere UCI o especialista (TEP de alto riesgo, SCA, neumotórax, sepsis)'}
    ],
    calc:function(v){
      const has = x => !isNaN(x);
      const out = [];
      const SEL = ['iot', 'o2', 'mental', 'disAct'];
      if (!Object.keys(v).some(k => k !== 'iot' && (v[k] === true || (typeof v[k] === 'number' && has(v[k]) && !(SEL.includes(k) && v[k] === 0))))) return [{t:'Introduce los datos del paciente', c:'', h:'Constantes, gasometría y criterios: la gravedad, la clasificación, el tratamiento y el destino se calculan al momento.'}];
      const gas = has(v.ph) && has(v.pco2);
      const acidHiper = gas && v.pco2 > 45 && v.ph < 7.35;

      /* 1. Roma (GOLD 2026, fig. 4.2; Celli 2021) */
      const crit = [
        ['disnea EVA ≥5', has(v.eva) ? v.eva >= 5 : null],
        ['FR ≥24', has(v.fr) ? v.fr >= 24 : null],
        ['FC ≥95', has(v.fc) ? v.fc >= 95 : null],
        ['SpO₂ &lt;92 % o descenso &gt;3 puntos', has(v.spo2) ? (v.spo2 < 92 || (has(v.spo2b) && v.spo2b - v.spo2 > 3)) : null],
        ['PCR ≥10 mg/L', has(v.pcr) ? v.pcr >= 10 : null]
      ];
      const n = crit.filter(c => c[1] === true).length;
      const falta = crit.filter(c => c[1] === null).length;
      const cumple = crit.filter(c => c[1]).map(c => c[0]).join(' · ') || 'ninguno';
      let roma, romaC, romaD;
      if (falta === 5 && !gas) { roma = 'sin datos'; romaC = ''; romaD = 'Introduce las constantes y, si la hay, la gasometría.'; }
      const hipox60 = has(v.po2) && v.po2 <= 60;
      const gasGrave = [hipox60 ? 'PaO₂ ≤60 mmHg' : '', acidHiper ? 'hipercapnia con acidosis (PaCO₂ &gt;45 y pH &lt;7,35)' : ''].filter(Boolean).join(' y ');
      if (acidHiper || (hipox60 && n >= 3)) { roma = 'GRAVE'; romaC = 'high'; romaD = n + '/5 criterios (' + cumple + ') + gasometría con ' + gasGrave + '.' + (n < 3 ? ' Con acidosis hipercápnica se trata como grave aunque no llegue a 3 criterios.' : ''); }
      else if (n >= 3) { roma = 'MODERADA'; romaC = 'mid'; romaD = n + '/5 criterios (' + cumple + ')' + (gas || has(v.po2) ? ', sin PaO₂ ≤60 ni acidosis hipercápnica.' : '. <b>Falta gasometría</b>: con PaO₂ ≤60 o hipercapnia con acidosis sería GRAVE.'); }
      else { roma = n + falta >= 3 ? 'LEVE (provisional)' : 'LEVE'; romaC = 'low'; romaD = n + '/5 criterios (' + cumple + ')' + (n + falta >= 3 ? '. Faltan ' + falta + ' dato(s) que podrían convertirla en moderada.' : '.') + (hipox60 ? ' PaO₂ ≤60 sin 3 criterios clínicos: revisar los datos.' : ''); }
      out.push({t:'Criterios de Roma (GOLD 2026): exacerbación ' + roma, c:romaC, h:'<b>Criterios que cumple:</b> ' + romaD});

      /* 1b. Gravedad del SAE según GesEPOC 2021 (riesgo basal + episodio agudo) */
      const alto = v.fev1 || v.mmrc || v.exac;
      const ges = [];
      if (v.mental === 2) ges.push(['MUY GRAVE', 'estupor o coma']);
      if (gas && v.ph < 7.30) ges.push(['MUY GRAVE', 'pH &lt;7,30']);
      if (has(v.pco2) && v.pco2 >= 60) ges.push(['MUY GRAVE', 'PaCO₂ ≥60 mmHg']);
      if (v.disAct === 1) ges.push(['GRAVE', 'disnea mMRC ≥3']);
      if (v.mental === 1) ges.push(['GRAVE', 'somnolencia o confusión']);
      if (has(v.fr) && v.fr >= 30) ges.push(['GRAVE', 'FR ≥30']);
      if (has(v.po2) && v.po2 < 60) ges.push(['GRAVE', 'PaO₂ &lt;60 mmHg']);
      if (has(v.spo2) && v.spo2 < 90) ges.push(['GRAVE', 'SpO₂ &lt;90 %']);
      if (alto) ges.push(['MODERADA', 'riesgo basal alto']);
      if (has(v.fr) && v.fr >= 24 && v.fr < 30) ges.push(['MODERADA', 'FR 24–29']);
      if (has(v.spo2) && v.spo2 >= 90 && v.spo2 < 95) ges.push(['MODERADA', 'SpO₂ 90–94 %']);
      const gesNivel = ['MUY GRAVE', 'GRAVE', 'MODERADA'].find(g => ges.some(x => x[0] === g));
      const gesFalta = !has(v.fr) || !has(v.spo2);
      out.push({t:'Gravedad del SAE (GesEPOC 2021): ' + (gesNivel || (gesFalta ? 'LEVE (provisional)' : 'LEVE')),
        c:gesNivel === 'MUY GRAVE' || gesNivel === 'GRAVE' ? 'high' : gesNivel ? 'mid' : 'low',
        h:gesNivel ? '<b>Criterios que cumple:</b> ' + ['MUY GRAVE', 'GRAVE', 'MODERADA'].map(g => { const l = ges.filter(x => x[0] === g).map(x => x[1]); return l.length ? g.toLowerCase() + ': ' + l.join(', ') : ''; }).filter(Boolean).join(' · ') + '. Basta un criterio del nivel más alto, sea cual sea el riesgo basal.' :
          'Bajo riesgo basal, disnea mMRC ≤2, conciencia normal, FR &lt;24 y SpO₂ ≥95 %: se deben cumplir todos.' + (gesFalta ? ' <b>Faltan FR o SpO₂.</b>' : '')});

      /* 2. GOLD 2026 en el paciente hospitalizado + tipo gasométrico del flujograma */
      const vital = v.vital || v.mental || v.o2 === 3 || (gas && v.ph <= 7.25);
      const ir = v.musc || v.o2 >= 2 || (gas && v.pco2 > 45) || (has(v.fr) && has(v.fc) && v.fr > 24 && v.fc > 95);
      const gold = vital ? ['insuficiencia respiratoria CON riesgo vital', 'high'] : ir ? ['insuficiencia respiratoria SIN riesgo vital', 'mid'] : ['sin insuficiencia respiratoria', 'low'];
      const goldCrit = vital ? [v.vital ? 'riesgo vital inmediato' : '', v.mental ? 'alteración aguda del estado mental' : '', v.o2 === 3 ? 'FiO₂ &gt;40 % o no corrige con Venturi' : '', gas && v.ph <= 7.25 ? 'acidosis con pH ≤7,25' : ''] :
        ir ? [v.musc ? 'musculatura accesoria' : '', v.o2 >= 2 ? 'necesita Venturi &gt;35 %' : '', gas && v.pco2 > 45 ? 'PaCO₂ elevada (' + v.pco2 + ' mmHg)' : '', has(v.fr) && has(v.fc) && v.fr > 24 && v.fc > 95 ? 'FR &gt;24 y FC &gt;95' : ''] :
        ['FR ≤24 o FC ≤95, sin musculatura accesoria, conciencia normal, corrige con Venturi ≤35 %, sin hipercapnia'];
      const gasC = gas && v.ph <= 7.35 && v.pco2 >= 45;
      const tipoC = gasC || v.musc;
      const tipo = v.vital ? 'riesgo vital inmediato' :
        tipoC ? 'C · acidosis respiratoria hipercápnica' + (gasC ? '' : ' (por fatiga muscular)') :
        v.o2 >= 2 ? 'B · insuficiencia respiratoria hipoxémica (no corrige con Venturi ≤35 %)' :
        'A · sin insuficiencia respiratoria o hipoxemia que corrige con Venturi ≤35 %';
      const pendGas = !gas && !v.vital && !tipoC && (romaC === 'mid' || v.o2 >= 1 || (has(v.fr) && v.fr >= 24));
      out.push({t:'Clasificación GOLD 2026 del paciente hospitalizado: ' + gold[0], c:gold[1],
        h:'<b>Criterios que cumple:</b> ' + goldCrit.filter(Boolean).join(' · ') + '.' +
          '<br><b>Tipo según la gasometría (flujograma Campdevànol, tras el tratamiento inicial):</b> ' + tipo + '.' +
          (pendGas ? '<br><b>Pendiente de gasometría</b> para descartar acidosis hipercápnica (tipo C).' : '')});

      /* 3. Riesgo basal GesEPOC */
      out.push({t:'Estratificación del riesgo basal (GesEPOC): riesgo ' + (alto ? 'ALTO' : 'BAJO'), c:alto ? 'mid' : 'low',
        h:alto ? '<b>Criterios que cumple:</b> ' + [v.fev1 ? 'FEV₁ &lt;50 %' : '', v.mmrc ? 'disnea basal mMRC ≥2' : '', v.exac ? '≥2 agudizaciones o 1 ingreso el último año' : ''].filter(Boolean).join(' · ') + ' (basta uno).' : 'Bajo riesgo solo si FEV₁ ≥50 %, mMRC 0–1 y 0–1 agudización sin ingreso (marca lo que cumpla).'});

      /* 4. Tratamiento */
      const vm = tipoC || v.vital;
      const nSint = [v.vol, v.disnea, v.fiebre].filter(Boolean).length;
      const atbInd = (v.purul && nSint >= 1) || v.cultivo || vm;
      const graveAtb = romaC === 'high' || vital || vm || v.o2 >= 2;
      let atb;
      if (!atbInd) atb = '<b>Antibiótico: no indicado</b> con los criterios actuales (≥2 de aumento de disnea, fiebre, volumen o purulencia siendo uno la purulencia; cultivo previo positivo; o ventilación mecánica). Procalcitonina: no recomendada.';
      else {
        const motivo = [v.purul && nSint >= 1 ? 'purulencia + ' + nSint + ' síntoma(s) más' : '', v.cultivo ? 'cultivo previo positivo' : '', vm ? 'ventilación mecánica (VMNI/IOT)' : ''].filter(Boolean).join(' · ');
        atb = '<b>Antibiótico 5 días</b> (' + motivo + '). ' + (v.pseudo || graveAtb ? 'Cultivo de esputo antes de iniciarlo. ' : '') +
          (v.pseudo ? 'Con riesgo de <i>Pseudomonas</i>, β-lactámico antipseudomónico IV: piperacilina-tazobactam 4/0,5 g/6 h, cefepima 2 g/8 h, ceftazidima 2 g/8 h o meropenem 1 g/8 h. Alternativa: ciprofloxacino 750 mg/12 h VO o 400 mg/8 h IV (GesEPOC: 500–750 mg/12 h) o levofloxacino 500 mg/12 h (GesEPOC; otras guías usan 750 mg/24 h).' :
           graveAtb ? 'Grave sin riesgo de <i>Pseudomonas</i>: amoxicilina-clavulánico 1 g/200 mg/8 h IV (hasta 2 g/200 mg/8 h), ceftriaxona 1–2 g/24 h IV o cefotaxima 1–2 g/8 h IV. Alergia a β-lactámicos: levofloxacino 500 mg/24 h IV/VO o moxifloxacino 400 mg/24 h.' :
           'Leve-moderada: amoxicilina-clavulánico 875/125 mg/8 h VO. Alternativas: cefditoreno 400 mg/12 h VO, doxiciclina 100 mg/12 h VO (200 mg el 1.er día) o azitromicina 500 mg/24 h VO 3 días; levofloxacino 500 mg/24 h o moxifloxacino 400 mg/24 h VO solo si no hay alternativa (aviso FDA/EMA).') +
          ' Dosis de adulto con función renal normal: ajustar al filtrado glomerular.';
      }
      const o2txt = (v.o2 === 0 && (!has(v.spo2) || v.spo2 >= 88)) ? '<b>O₂:</b> no precisa si SpO₂ ≥88 %. Si lo necesita, objetivo 88–92 %.' :
        '<b>O₂ controlado</b> con Venturi 24–28 % (o gafas 1–2 L/min) → SpO₂ 88–92 % (PaO₂ 60–65). Evitar la hiperoxia. Gasometría a los 30–60 min si hay hipercapnia o se cambia la FiO₂.';
      const soporte = v.vital ? (v.iot === 1 ? '<b>SVA e IOT</b> (candidato).' : v.iot === 0 ? '<b>VMNI como techo terapéutico</b> o medidas de confort.' : '<b>Decidir YA la candidatura a IOT/UCI</b>: IOT si es candidato; si no, VMNI como techo.') :
        tipoC ? '<b>VMNI en el box</b> (vigilancia 1:1 de enfermería): BiPAP S/T con mascarilla oronasal, EPAP 4–6 e IPAP 10–12 cmH₂O → subir 2 cmH₂O cada 5–10 min hasta 18–20 (máx. 25). Objetivo FR &lt;25 y Vt 6–8 mL/kg; FiO₂ mínima para SpO₂ 88–92 %. Gasometría a 1 h y 2 h.' :
        v.o2 >= 2 ? '<b>OAF</b> (primera modalidad en la hipoxémica, GOLD 2026): 30–60 L/min, 31–37 °C, FiO₂ para SpO₂ 88–92 %. Gasometría a 1–2 h; si aparece hipercapnia con acidosis → VMNI (tipo C). Descartar neumonía, IC y TEP.' : '';
      const corti = romaC === 'low' && !ir ? '<b>Corticoide:</b> reservarlo para exacerbaciones significativas (incluso los ciclos cortos se asocian a neumonía, sepsis y muerte). Si se indica: prednisona 40 mg/día VO 5 días.' :
        '<b>Prednisona 40 mg/día VO durante 5 días</b>, sin pauta descendente (VO = IV; metilprednisolona 40 mg IV si no tolera la vía oral).';
      out.push({t:'Tratamiento en urgencias', c:'', h:[
        o2txt,
        '<b>Broncodilatadores:</b> salbutamol 2,5–5 mg + ipratropio 0,5 mg nebulizados con AIRE (no con O₂), 1 dosis cada hora × 2–3 y después cada 2–4 h según respuesta; evitar dosis altas de SABA. Alternativa: MDI con cámara, salbutamol 400–600 µg (4–6 pulsaciones) + ipratropio 80–120 µg con la misma pauta. No suspender los LABD. Metilxantinas IV: no.',
        corti, atb, soporte,
        '<b>Siempre:</b> ECG, troponina, NT-proBNP, Rx de tórax, hemograma con eosinófilos, PCR; dímero D si se sospecha TEP. Descartar neumonía, IC, SCA/arritmia, TEP y neumotórax. Si ingresa: HBPM profiláctica y balance hídrico. Reevaluar a los 30–60 min con clínica y gasometría.'
      ].filter(Boolean).map(x => '• ' + x).join('<br>')});

      /* 5. Destino inicial (flujograma Campdevànol → HUV) */
      let dest, dc;
      if (v.vital) { dest = v.iot === 1 ? 'IOT + SVA y <b>traslado a UCI de HUV</b> (llamada médico a médico; SEM con SVA).' : v.iot === 0 ? 'VMNI como techo o confort; ubicación según acuerdo local (PADES si procede).' : 'Decidir candidatura: si es candidato, IOT y <b>traslado a UCI de HUV</b>; si no, VMNI como techo.'; dc = 'high'; }
      else if (tipoC) {
        dest = (v.iot === 1 ? '<b>Avisar a HUV al iniciar la VMNI → traslado con VMNI.</b> pH &lt;7,25 que no mejora o fracaso → IOT + traslado.' :
                v.iot === 0 ? '<b>VMNI como techo terapéutico</b>, decisión compartida; ubicación según acuerdo local; confort/PADES si fracasa.' :
                '<b>Decidir candidatura a IOT/UCI.</b> Candidato: avisar a HUV al iniciar la VMNI y trasladar con VMNI. No candidato: VMNI como techo.') +
          '<br>Excepción: corrección rápida (pH ≥7,35) y tolera ≥4 h sin VMNI en urgencias → puede ir a planta. La VMNI se retira directamente, sin destete.';
        dc = 'high';
      }
      else if (v.compl) { dest = '<b>Traslado a HUV</b> por complicación que requiere UCI o especialista.'; dc = 'high'; }
      else if (v.o2 >= 2) { dest = 'OAF en urgencias. <b>A las 2 h:</b> si FiO₂ ≤40 %, FR &lt;25 y puede pasar a Venturi → <b>ingreso en planta (Campdevànol)</b>. Si no, o necesita OAF mantenida → <b>traslado a HUV</b>.'; dc = 'mid'; }
      else if (v.social) { dest = '<b>Ingreso en planta (Campdevànol)</b>: sin apoyo domiciliario suficiente o con comorbilidad descompensada. Si empeora (FR &gt;25, SpO₂ &lt;88 % con O₂, somnolencia) → gasometría y reclasificar (B/C).'; dc = 'mid'; }
      else if (romaC) {
        const pesan = [gesNivel === 'GRAVE' || gesNivel === 'MUY GRAVE' ? 'SAE ' + gesNivel.toLowerCase() + ' según GesEPOC' : '', alto ? 'riesgo basal alto' : '', romaC === 'high' ? 'exacerbación grave por Roma' : ''].filter(Boolean);
        dest = 'Tipo A: continuar tratamiento y reevaluar a las 2–4 h (disnea, FR, SpO₂, tolerancia al esfuerzo). ¿Buena respuesta, estable y con apoyo domiciliario? <b>Sí → alta</b> (AP en 48–72 h). <b>No → ingreso en planta (Campdevànol)</b>.' +
          (pesan.length ? '<br>A tener en cuenta al decidir: ' + pesan.join(' · ') + '.' : '');
        dc = romaC === 'low' && !pesan.length ? 'low' : 'mid';
      }
      else { dest = '—'; dc = ''; }
      out.push({t:'Destino inicial', c:dc, h:dest + (dest !== '—' ? '<br><span class="pe-nota">Umbrales locales propuestos (Campdevànol/HUV), a consensuar con la Dirección Asistencial y con UCI/Neumología de HUV.</span>' : '')});
      return out;
    }
  },
  steps:[
  {type:'info', text:'Recursos locales (Hospital de Campdevànol): OAF y VMNI en el box de urgencias. Sin observación con monitorización continua ni UCI/semicríticos. Centro de referencia: Hospital Universitari de Vic (HUV)'},
  {type:'action', text:'LLEGADA (primeros 15 min): triaje, monitorizar SpO₂, FC, FR, PA, temperatura, nivel de conciencia y disnea EVA 0–10'},
  {type:'action', text:'O₂ controlado con Venturi 24–28 % (o gafas 1–2 L/min) → SpO₂ 88–92 %. Evitar la hiperoxia'},
  {type:'action', text:'Vía venosa · gasometría arterial (venosa si es menos grave) · ECG · hemograma con eosinófilos, bioquímica, PCR, troponina, NT-proBNP; dímero D si se sospecha TEP · Rx de tórax'},
  {type:'action', text:'Fijar desde el inicio el nivel de intensidad terapéutica: ¿candidato a IOT/UCI? (PIIC/PCC, voluntades anticipadas, situación basal, opinión del paciente y la familia)'},
  {type:'decision', text:'¿Riesgo vital inmediato? (parada o preparada respiratoria, estupor/coma o agitación incontrolable, inestabilidad hemodinámica o arritmia grave, pH <7,20 con deterioro rápido)', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'SVA · IOT si es candidato y activar el traslado a UCI de HUV. Si no es candidato: VMNI como techo terapéutico o medidas de confort'},
  {type:'action', branch:'no', text:'Gravedad por criterios de Roma (GOLD 2026): LEVE si EVA <5, FR <24, FC <95, SpO₂ ≥92 % (descenso ≤3) y PCR <10 · MODERADA si ≥3 de 5 (EVA ≥5, FR ≥24, FC ≥95, SpO₂ <92 % o descenso >3, PCR ≥10) · GRAVE si además la gasometría muestra PaO₂ ≤60 y/o hipercapnia con acidosis (PaCO₂ >45 y pH <7,35)'},
  {type:'action', text:'Descartar lo que simula o agrava el SAE: neumonía, IC descompensada, SCA/arritmia, TEP (hasta el 5,9 % de los ingresados) y neumotórax. El riesgo cardiovascular es máximo los primeros 30 días'},
  {type:'action', text:'TRATAMIENTO INICIAL: salbutamol 2,5–5 mg + ipratropio 0,5 mg nebulizados con AIRE, 1 dosis/h × 2–3, luego cada 2–4 h · prednisona 40 mg/día 5 días · antibiótico 5 días si ≥2 de (↑disnea, fiebre, ↑volumen, ↑purulencia) siendo uno la purulencia, cultivo previo positivo o VMNI/IOT'},
  {type:'decision', text:'Reevaluar a los 30–60 min con clínica y gasometría: ¿qué tipo de insuficiencia respiratoria?', yes:'B / C', no:'A'},
  {type:'action', branch:'no', text:'A · Sin IR o hipoxemia que corrige con Venturi ≤35 %, pH ≥7,35, PaCO₂ ≤45 o basal: continuar y reevaluar a las 2–4 h → ALTA si buena respuesta, estable y con apoyo; si no, INGRESO EN PLANTA'},
  {type:'action', branch:'yes', text:'B · Hipoxémica (SpO₂ <88 % / PaO₂ <60 con Venturi ≥35 %, pH ≥7,35): OAF 30–60 L/min, 31–37 °C. A las 2 h: FiO₂ ≤40 %, FR <25 y pasa a Venturi → PLANTA; si no → TRASLADO A HUV'},
  {type:'action', branch:'yes', text:'C · Hipercápnica (pH ≤7,35 y PaCO₂ ≥45, o fatiga muscular): VMNI en el box, EPAP 4–6 / IPAP 10–12 subiendo hasta 18–20. Candidato → avisar a HUV al iniciar la VMNI y trasladar con VMNI. No candidato → VMNI como techo'},
  {type:'info', text:'Criterios de traslado a HUV: VMNI u OAF mantenidas, pH ≤7,25, PaCO₂ >60, FiO₂ >40 %, alteración del estado mental, necesidad de IOT, inestabilidad hemodinámica o arritmia grave, TEP de alto riesgo, SCA, neumotórax o sepsis'},
  {type:'info', text:'Al alta: LABA+LAMA (añadir CI si hay eosinofilia; eos ≥300 → triple terapia), revisar la técnica inhalatoria, completar prednisona y antibiótico 5 días, plan escrito, tabaco y vacunas (gripe, neumococo, COVID, VRS, dTpa, zóster). AP a las 48–72 h, revisión a las 1–4 semanas y a las 12–16 semanas con FEV₁, rehabilitación en <4 semanas'}],
  src:'Protocolo SAE Hospital de Campdevànol v2.2 (oct 2026) · GOLD 2026 Report v1.3 (figs. 4.2–4.10) · Criterios de Roma: Celli 2021, AJRCCM, doi:10.1164/rccm.202108-1819PP · GesEPOC 2021 SAE: Soler-Cataluña 2022, Arch Bronconeumol 58:159 · GesEPOC 2025: Miravitlles 2025, doi:10.1016/j.arbres.2025.10.008 · Dosis de antibiótico: ATS/IDSA NAC 2019 · PMID 31573350; MAESTRAL, Wilson 2012 · PMID 22135277; antibiótico 5 días: ACP 2021 · PMID 33819054'},

{id:'asma-crisis', title:'Crisis de asma (adulto)', sub:'Gravedad (SEMES 2026 · GEMA 5.5 · ALAT-SEPAR 2025), tratamiento en urgencias y destino inicial', badge:'amber', tag:'Urgente', rank:12.6,
  flujograma:'protocolos/Flujograma_Asma_Campdevanol.pdf',
  eval:{
    items:[
      {t:'h', l:'Situación inicial'},
      {k:'anafil', t:'chk', l:'Sospecha de anafilaxia (urticaria, angioedema, hipotensión, desencadenante alérgico)'},
      {k:'emb', t:'chk', l:'Embarazo'},
      {k:'peso', t:'num', l:'Peso real (para las dosis)', u:'kg'},
      {t:'h', l:'Gravedad a la llegada (antes de tratar)'},
      {k:'habla', t:'sel', l:'Disnea y habla', o:[['Leve: habla en párrafos',0],['Moderada: habla en frases',1],['Intensa: habla en palabras',2],['Agónica: no puede hablar',3]]},
      {k:'fr', t:'num', l:'Frecuencia respiratoria', u:'rpm'},
      {k:'fc', t:'num', l:'Frecuencia cardiaca', u:'lpm'},
      {k:'spo2', t:'num', l:'SpO₂ con aire ambiente', u:'%'},
      {k:'pef', t:'num', l:'PEF o FEV₁ (% del mejor personal o del teórico)', u:'%'},
      {k:'musc', t:'sel', l:'Musculatura accesoria', o:[['Ausente',0],['Presente',1],['Muy evidente',2],['Movimiento paradójico',3]]},
      {k:'mental', t:'sel', l:'Nivel de conciencia', o:[['Normal',0],['Agitación, somnolencia o confusión',1],['Estupor o coma',2]]},
      {k:'silencio', t:'chk', l:'Silencio auscultatorio'},
      {k:'fatiga', t:'chk', l:'Fatiga muscular: la FR baja sin mejoría clínica'},
      {k:'hemo', t:'chk', l:'Hipotensión, bradicardia o arritmia'},
      {t:'h', l:'Gasometría (si SpO₂ no mejora con tratamiento y O₂)'},
      {k:'ph', t:'num', l:'pH', u:'7,xx'},
      {k:'pco2', t:'num', l:'PaCO₂', u:'mmHg'},
      {k:'po2', t:'num', l:'PaO₂ (opcional)', u:'mmHg'},
      {t:'h', l:'Respuesta tras 1–3 h de tratamiento'},
      {k:'pef2', t:'num', l:'PEF o FEV₁ tras el tratamiento', u:'%'},
      {k:'spo2b', t:'num', l:'SpO₂ tras el tratamiento, sin O₂', u:'%'},
      {k:'resc', t:'chk', l:'Sigue sintomático y necesita rescate más a menudo que cada 4 h'},
      {k:'o2', t:'chk', l:'Necesita O₂ para mantener SpO₂ ≥93 %'},
      {k:'persist', t:'chk', l:'Tras el tratamiento persisten FR &gt;25, FC &gt;110 o musculatura accesoria'},
      {t:'h', l:'Factores de riesgo y entorno'},
      {k:'rapida', t:'chk', l:'Instauración rápida (&lt;3 h)'},
      {k:'vital', t:'chk', l:'Antecedente de crisis vital, ingreso en UCI o IOT'},
      {k:'visitas', t:'chk', l:'≥2 visitas a urgencias u hospitalizaciones en el último año'},
      {k:'nogci', t:'chk', l:'Sin GCI, mala adherencia o ≥3 inhaladores de SABA al año'},
      {k:'cortiPrev', t:'chk', l:'Empeora pese a corticoide sistémico ya iniciado'},
      {k:'comorb', t:'chk', l:'Comorbilidad cardiovascular, EPOC, edad avanzada o alergia alimentaria'},
      {k:'compl', t:'chk', l:'Complicación: neumonía, neumotórax o neumomediastino'},
      {k:'social', t:'chk', l:'No se garantizan el tratamiento o la vigilancia en el domicilio'}
    ],
    calc:function(v){
      const has = x => !isNaN(x);
      const out = [];
      const datos = ['fr', 'fc', 'spo2', 'pef', 'ph', 'pco2', 'po2', 'pef2', 'spo2b'].some(k => has(v[k])) || v.habla || v.musc || v.mental ||
        ['anafil', 'emb', 'silencio', 'fatiga', 'hemo', 'resc', 'o2', 'persist', 'compl'].some(k => v[k]);
      if (!datos) return [{t:'Introduce los datos del paciente', c:'', h:'Constantes, PEF y signos de gravedad: la clasificación, el tratamiento y el destino se calculan al momento. Mide el PEF antes de tratar (salvo crisis vital).'}];
      const gas = has(v.ph) && has(v.pco2);
      const hiperc = has(v.pco2) && v.pco2 > 45;
      const acidemia = has(v.ph) && v.ph < 7.35;
      const pesoOk = has(v.peso) && v.peso > 0;

      /* 1. SEMES 2026 (3 niveles, orienta el tratamiento) */
      const mg = [];
      if (v.mental) mg.push('alteración del estado mental');
      if (v.fatiga) mg.push('fatiga muscular');
      if (v.silencio) mg.push('silencio auscultatorio');
      if (v.o2 && has(v.spo2b) && v.spo2b < 90) mg.push('hipoxemia refractaria');
      if (hiperc) mg.push('hipercapnia (PaCO₂ ' + v.pco2 + ')');
      if (acidemia) mg.push('acidemia (pH ' + String(v.ph).replace('.', ',') + ')');
      if (v.musc === 3) mg.push('respiración paradójica');
      if (v.hemo) mg.push('hipotensión, bradicardia o arritmia');
      const gr = [];
      if (v.habla >= 2) gr.push('empeoramiento importante (habla en palabras o menos)');
      if (has(v.pef) && v.pef < 50) gr.push('PEF &lt;50 %');
      if (has(v.fr) && v.fr > 25) gr.push('FR &gt;25');
      if (v.emb) gr.push('embarazo (toda crisis es grave)');
      const ng = [has(v.pef) ? v.pef > 50 : null, has(v.fr) ? v.fr < 25 : null, has(v.spo2) ? v.spo2 > 93 : null];
      const ngNo = [has(v.pef) && v.pef <= 50 ? 'PEF ≤50 %' : '', has(v.fr) && v.fr >= 25 ? 'FR ≥25' : '', has(v.spo2) && v.spo2 <= 93 ? 'SpO₂ ≤93 %' : ''].filter(Boolean);
      let semes, sc, sd;
      if (mg.length) { semes = 'MUY GRAVE'; sc = 'high'; sd = mg.join(' · '); }
      else if (gr.length || ngNo.length) { semes = 'GRAVE'; sc = 'high'; sd = gr.concat(gr.length ? [] : ['no cumple todos los criterios de no grave: ' + ngNo.join(', ')]).join(' · '); }
      else { const falta = ng.filter(x => x === null).length; semes = falta ? 'NO GRAVE (provisional)' : 'NO GRAVE'; sc = 'low';
        sd = 'PEF &gt;50 %, FR &lt;25 y SpO₂ &gt;93 % con empeoramiento moderado: deben cumplirse todos' + (falta ? ' <b>Faltan ' + ['PEF', 'FR', 'SpO₂'].filter((x, i) => ng[i] === null).join(', ') + '.</b>' : ''); }
      out.push({t:'Gravedad SEMES 2026: crisis ' + semes, c:sc, h:'<b>Criterios que cumple:</b> ' + sd + '.'});

      /* 2. GEMA 5.5 (4 niveles: manda el parámetro más grave) */
      const g = [];
      const add = (n, txt) => g.push([n, txt]);
      if (v.habla === 3) add(3, 'disnea agónica, no habla'); else if (v.habla === 2) add(2, 'habla en palabras'); else if (v.habla === 1) add(1, 'habla en frases');
      if (has(v.fr)) { if (v.fatiga) add(3, 'bradipnea/fatiga'); else if (v.fr > 25) add(2, 'FR &gt;25'); else if (v.fr > 20) add(1, 'FR &gt;20'); }
      if (has(v.fc)) { if (v.fc > 120) add(2, 'FC &gt;120'); else if (v.fc > 100) add(1, 'FC &gt;100'); }
      if (v.hemo) add(3, 'bradicardia, hipotensión o arritmia');
      if (v.musc === 3) add(3, 'movimiento paradójico'); else if (v.musc === 2) add(2, 'musculatura accesoria muy evidente'); else if (v.musc === 1) add(1, 'musculatura accesoria');
      if (v.silencio) add(3, 'silencio auscultatorio');
      if (v.mental) add(3, 'conciencia disminuida');
      if (has(v.pef)) { if (v.pef < 50) add(2, 'PEF &lt;50 %'); else if (v.pef < 70) add(1, 'PEF &lt;70 %'); }
      if (has(v.spo2)) { if (v.spo2 < 90) add(2, 'SaO₂ &lt;90 %'); else if (v.spo2 < 95) add(1, 'SaO₂ &lt;95 %'); }
      if (hiperc) add(3, 'PaCO₂ &gt;45');
      if (has(v.po2)) { if (v.po2 < 60) add(2, 'PaO₂ &lt;60'); else if (v.po2 < 80) add(1, 'PaO₂ &lt;80'); }
      const gN = g.length ? Math.max(...g.map(x => x[0])) : 0;
      const gName = ['LEVE', 'MODERADA', 'GRAVE', 'VITAL (riesgo vital)'][gN];
      out.push({t:'Gravedad GEMA 5.5: crisis ' + gName, c:gN >= 2 ? 'high' : gN === 1 ? 'mid' : 'low',
        h:g.length ? '<b>Criterios que cumple:</b> ' + [3, 2, 1].map(n => { const l = g.filter(x => x[0] === n).map(x => x[1]); return l.length ? ['', 'moderada', 'grave', 'vital'][n] + ': ' + l.join(', ') : ''; }).filter(Boolean).join(' · ') + '. Clasifica el parámetro más grave.' :
          'Disnea leve, habla en párrafos, FC &lt;100, sin musculatura accesoria, PEF &gt;70 % y SaO₂ &gt;95 %.'});

      /* 3. ALAT-SEPAR 2025 */
      const am = [], ag = [];
      if (v.musc === 3) am.push('respiración paradójica');
      if (v.mental) am.push('disminución de la conciencia');
      if (v.hemo) am.push('inestabilidad hemodinámica');
      if (hiperc) am.push('PaCO₂ &gt;45');
      if (has(v.ph) && v.ph < 7.30) am.push('pH &lt;7,30');
      if (has(v.fr) && v.fr > 30) ag.push('FR &gt;30');
      if (has(v.fc) && v.fc > 120) ag.push('FC &gt;120');
      if (has(v.pef) && v.pef < 50) ag.push('PEF/FEV₁ &lt;50 %');
      if (has(v.spo2) && v.spo2 < (v.emb ? 92 : 90)) ag.push('SpO₂ &lt;' + (v.emb ? '92 % (embarazo)' : '90 %'));
      if (has(v.po2) && v.po2 < 60) ag.push('PaO₂ &lt;60');
      if (v.habla >= 2) ag.push('habla en palabras');
      if (v.musc >= 1 && v.musc <= 2) ag.push('musculatura accesoria');
      const alat = am.length ? ['MUY GRAVE', 'high', am] : ag.length ? ['GRAVE', 'high', ag] : ['NO GRAVE', 'low', []];
      out.push({t:'Gravedad ALAT-SEPAR 2025: exacerbación ' + alat[0], c:alat[1],
        h:alat[2].length ? '<b>Criterios que cumple:</b> ' + alat[2].join(' · ') + ' (basta uno). Umbrales distintos de SEMES/GEMA (FR &gt;30, FC &gt;120, SpO₂ &lt;90 %, pH &lt;7,30).' : 'Ningún criterio de grave ni muy grave.'});

      /* 4. Tratamiento en urgencias (SEMES 2026 + GEMA 5.5 + GINA 2026) */
      const nivel = mg.length ? 3 : sc === 'high' ? 2 : 1;
      const pd = '40–50 mg';
      const t = [];
      if (v.anafil) t.push('<b>Anafilaxia primero:</b> adrenalina 0,5 mg IM (1 mg/mL) en el vasto lateral, repetible cada 5–15 min; después los broncodilatadores. Triptasa a las 0, 2 y 24 h. Shock: perfusión IV titulada (GALAXIA).');
      const o2obj = v.emb ? '≥95 % (embarazo)' : '93–95 % (sin superar el 95 %)';
      t.push(nivel === 1 ? '<b>O₂</b> solo si SpO₂ &lt;92 %; objetivo ' + o2obj + '.' : nivel === 2 ? '<b>O₂</b> con FiO₂ &lt;40 % → SpO₂ ' + o2obj + '.' : '<b>O₂</b> a la FiO₂ necesaria hasta el soporte ventilatorio.');
      if (nivel === 1) t.push('<b>Salbutamol</b> MDI + cámara 4–10 inh (100 µg/inh) cada 20 min en la 1.ª hora; reevaluar tras la 1.ª dosis. Alternativa: budesonida-formoterol 160/4,5 µg (hasta 12 inh/24 h), puente a MART. Agitar el MDI antes de cada pulsación; cámara con 5–6 respiraciones a volumen corriente.');
      else if (nivel === 2) t.push('<b>Salbutamol + ipratropio:</b> MDI + cámara 4–10 inh de salbutamol + 4–8 inh de ipratropio (20 µg/inh) cada 10–15 min en la 1.ª hora, o NEB cada 20 min: salbutamol 2,5–5 mg + ipratropio 0,5 mg.');
      else t.push('<b>NEB continua:</b> salbutamol 10–15 mg/h + ipratropio 0,5 mg.');
      if (nivel >= 2) t.push('<b>GCI a dosis altas en la 1.ª hora:</b> budesonida NEB 0,5 mg cada 20 min, o fluticasona propionato 2 inh × 250 µg / budesonida 4 inh × 200 µg MDI + cámara cada 10–15 min (pauta SEMES; evidencia incierta: el ensayo en adultos usó budesonida 9 mg en la 1.ª hora y acortó la estancia sin reducir ingresos).');
      t.push(nivel === 3 ? '<b>Hidrocortisona 250 mg IV</b> (SEMES).' :
        nivel === 2 ? '<b>Prednisona ' + pd + ' VO al día</b>, dosis matutina, 5–7 días sin descenso (GINA; GEMA 5.5: 50 mg) o hidrocortisona 100–200 mg IV si no tolera la VO. SEMES usa 0,5–1 mg/kg (máx. 50 mg): por debajo de 80 kg queda por debajo de 40 mg.' :
        '<b>Corticoide sistémico</b> si no hay buena respuesta inmediata, lleva días mal, PEF &lt;60 %, instauración rápida o crisis graves previas: prednisona ' + pd + ' VO al día, 5–7 días.');
      if (nivel >= 2) t.push((nivel === 3 ? '<b>Ya, sin esperar:</b> ' : '<b>Si no mejora en 1 h</b> (hipoxemia persistente o PEF &lt;60 %): ') + '<b>sulfato de magnesio 2 g IV</b> en 50–100 mL de SSF en 20 min, dosis única (reflejos, PA, FR; ajustar con IR grave). Mg²⁺ nebulizado no recomendado de rutina.');
      if (nivel >= 2) t.push('<b>Salbutamol IV solo como rescate en la crisis refractaria</b>, con monitorización y de acuerdo con la UCI de HUV (GINA y ERS no lo recomiendan de rutina; GEMA 5.5 lo reserva a este caso): 200 µg en 30 min → 0,1–0,2 µg/kg/min' + (pesoOk ? ' (' + (v.peso * 0.1).toFixed(0) + '–' + (v.peso * 0.2).toFixed(0) + ' µg/min)' : '') + ', con ECG, K⁺ y lactato.');
      if (nivel === 3) t.push('<b>Preparar la IOT</b> y avisar a la UCI de HUV. VMI: Vt 6–8 mL/kg de peso ideal, FR 10–12, I:E 1:3–1:5, PEEP 0, Pplat &lt;30; hipercapnia permisiva con pH &gt;7,20 (pauta SEMES; sin parámetros fijados por GINA/GEMA).');
      else if (nivel === 2) t.push('<b>Soporte:</b> VMNI solo como puente en el box (pauta SEMES: IPAP 8 subiendo, EPAP 4–6, I:E 1:4–1:5; evidencia débil en asma) si persisten FR &gt;25, FC &gt;110, musculatura accesoria o PEF &lt;50 % con PaO₂/FiO₂ &gt;200 y PaCO₂ &lt;60. OAF: sin evidencia sólida, solo puente ante hipoxemia. Nunca retrasar la IOT.');
      t.push('<b>Pruebas:</b> PEF seriado' + (nivel >= 2 ? ', gasometría si SpO₂ no mejora, K⁺ y lactato (β2 a dosis altas)' : '') + '. Rx/ecografía si evolución atípica (neumotórax, neumonía). Disnea sin caída del PEF → descartar TEP (dímero D), IC (NT-proBNP) y obstrucción laríngea inducible. Taquipnea creciente pese a SABA → lactato: <b>más SABA no siempre es mejor</b>.');
      out.push({t:'Tratamiento en urgencias (' + ['', 'no grave', 'grave', 'muy grave'][nivel] + ')', c:'', h:t.map(x => '• ' + x).join('<br>')});

      /* 5. Respuesta y destino (flujograma Campdevànol → HUV) */
      const fr = [v.rapida ? 'instauración rápida' : '', v.vital ? 'crisis vital/UCI previa' : '', v.visitas ? 'visitas o ingresos frecuentes' : '', v.nogci ? 'sin GCI o abuso de SABA' : '',
        v.cortiPrev ? 'empeora con corticoide ya iniciado' : '', v.comorb ? 'comorbilidad o edad avanzada' : ''].filter(Boolean);
      let dest, dc, resp = '';
      const pef2 = has(v.pef2) ? v.pef2 : NaN;
      const uciCrit = nivel === 3 || (has(v.spo2b) && v.spo2b < 90 && v.o2) || hiperc || acidemia;
      if (uciCrit) {
        resp = 'C · mala respuesta o crisis vital';
        dest = '<b>Traslado a la UCI de HUV.</b> ¿Criterios de IOT (conciencia ↓, agitación, PaO₂/FiO₂ &lt;200, PaCO₂ &gt;60, inestabilidad)? <b>Sí</b> → IOT y traslado. <b>No</b> → avisar a HUV al iniciar la VMNI y trasladar con VMNI. Circuito: llamada médico a médico → SEM con SVA → mantener NEB/VMNI → informe con PEF, gasometrías, dosis y hora del corticoide.';
        dc = 'high';
      } else if (!has(pef2) && !v.resc && !v.o2 && !v.persist && !has(v.spo2b)) {
        dest = 'Reevaluar con PEF, SpO₂ y clínica: ' + (nivel === 1 ? 'cada 30 min, decidir en ~1 h' : 'de forma continua, decidir en ~3 h') + '. Introduce la respuesta al tratamiento para calcular el destino.';
        dc = '';
      } else {
        const malo = (has(pef2) && pef2 < 40) || (has(v.pef) && v.pef < 25) || v.persist;
        const bueno = has(pef2) && pef2 > 60 && !v.persist && !v.resc && !v.o2 && (!has(v.spo2b) || v.spo2b > 93);
        if (malo) { resp = 'C · mala respuesta (' + [has(pef2) && pef2 < 40 ? 'PEF &lt;40 % tras tratar' : '', has(v.pef) && v.pef < 25 ? 'PEF &lt;25 % a la llegada' : '', v.persist ? 'persisten FR &gt;25, FC &gt;110 o tiraje' : ''].filter(Boolean).join(', ') + ')'; dest = 'Intensificar: Mg IV, salbutamol IV, <b>VMNI en el box solo como PUENTE</b> y <b>traslado a la UCI de HUV</b> (SEMES: cualquier soporte ventilatorio = UCI).'; dc = 'high'; }
        else if (bueno) {
          resp = 'A · buena respuesta (PEF ' + pef2 + ' %' + (pef2 < 70 ? ', zona gris GEMA 50–70 %' : '') + ')';
          const alta = !v.social && !v.compl && !fr.length && !v.emb;
          dest = alta ? '<b>Alta</b> tras 1 h más sin broncodilatador para comprobar la estabilidad: tolera el decúbito, SpO₂ basal &gt;93 %, entiende el plan de acción.' :
            '<b>Ingreso en planta (Campdevànol)</b> o alta muy individualizada: ' + [fr.length ? 'factores de riesgo (' + fr.join(', ') + ')' : '', v.social ? 'sin garantía de tratamiento/vigilancia en domicilio' : '', v.compl ? 'complicación' : '', v.emb ? 'embarazo' : ''].filter(Boolean).join(' · ') + '.';
          dc = alta ? 'low' : 'mid';
        } else {
          resp = 'B · respuesta incompleta' + (has(pef2) ? ' (PEF ' + pef2 + ' %)' : '');
          dest = 'Intensificar (salbutamol + ipratropio, GCI a dosis altas, corticoide sistémico; Mg IV si hipoxemia o PEF &lt;60 % tras 1 h; gasometría si SpO₂ &lt;92 %). ¿Mejora en 2–3 h, sin hipercapnia y con SpO₂ ≥93 % con O₂ convencional? <b>Sí → ingreso en planta (Campdevànol)</b>: PEF y SpO₂ cada 4–6 h. <b>No → pasar a C</b> (traslado a HUV).';
          dc = 'mid';
        }
      }
      if (v.compl && dc !== 'high') dest += '<br>Complicación (neumonía, neumotórax, neumomediastino): mínimo ingreso; traslado si compromiso o neumotórax que precisa drenaje sin recursos.';
      out.push({t:'Respuesta y destino inicial' + (resp ? ': ' + resp : ''), c:dc, h:dest +
        (fr.length ? '<br>Factores de riesgo de mala evolución: ' + fr.join(' · ') + '.' : '') +
        '<br><b>Al alta:</b> todo paciente se va con GCI; MART preferente (budesonida-formoterol 160/4,5 µg 1–2 inh/12 h + 1 a demanda, máx. 12 inh/24 h); prednisona ' + pd + ' 5–7 días; técnica inhalatoria y plan escrito; AP en ~7 días; Neumología/Alergología en &lt;2 semanas si crisis vital, embarazo o anafilaxia.' +
        '<br><span class="pe-nota">Circuito local (sin observación monitorizada ni UCI en Campdevànol) pendiente de consenso con la Dirección Asistencial y la UCI de HUV.</span>'});
      return out;
    }
  },
  steps:[
  {type:'info', text:'Recursos locales (Hospital de Campdevànol): VMNI en el box solo como puente y OAF (evidencia limitada en asma). Sin observación con monitorización continua ni UCI. Centro de referencia: Hospital Universitari de Vic (HUV)'},
  {type:'action', text:'LLEGADA (primeros 15 min): SpO₂, FR, FC, PA, conciencia, capacidad para hablar, musculatura accesoria. PEF o FEV₁ antes de tratar (salvo crisis vital): mejor de 3 intentos, mismo medidor'},
  {type:'decision', text:'¿Anafilaxia? (urticaria, angioedema, hipotensión, desencadenante alérgico)', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Adrenalina 0,5 mg IM en el vasto lateral (repetible cada 5–15 min) PRIMERO, broncodilatadores después. Triptasa a las 0, 2 y 24 h'},
  {type:'decision', text:'¿Crisis vital (muy grave)? Somnolencia/confusión, fatiga (FR que baja), silencio auscultatorio, paradójica, bradicardia/hipotensión, SpO₂ <90 % con O₂, PaCO₂ ≥45 o acidemia', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'O₂ + salbutamol 10–15 mg/h NEB continua + ipratropio 0,5 mg · hidrocortisona 250 mg IV · Mg 2 g IV · preparar IOT y avisar a la UCI de HUV'},
  {type:'action', branch:'no', text:'Gravedad SEMES 2026: NO GRAVE si PEF >50 %, FR <25 y SpO₂ >93 % · GRAVE si PEF <50 %, FR >25, habla en palabras o embarazo'},
  {type:'action', text:'O₂ solo si SpO₂ <92 %; objetivo 93–95 % (gestante ≥95 %). No grave: salbutamol MDI + cámara 4–10 inh cada 20 min la 1.ª hora. Grave: + ipratropio, GCI a dosis altas y prednisona 40–50 mg VO'},
  {type:'action', text:'Descartar causa alternativa o añadida: neumotórax/neumomediastino, neumonía, TEP (disnea sin caída del PEF), IC, obstrucción laríngea inducible, acidosis láctica por β2'},
  {type:'decision', text:'Reevaluar (no grave cada 30 min, decidir en ~1 h; grave de forma continua, decidir en ~3 h): ¿respuesta?', yes:'A buena', no:'B / C'},
  {type:'action', branch:'yes', text:'A · PEF >60–70 %, SpO₂ >93 % sin O₂, asintomático: 1 h más sin broncodilatador → ALTA si estable, sin factores de riesgo y con apoyo; si no, PLANTA'},
  {type:'action', branch:'no', text:'B · PEF 40–60 %, rescate < cada 4 h, O₂ para SpO₂ ≥93 %: intensificar + Mg 2 g IV en 20 min → si mejora en 2–3 h → PLANTA; si no → C'},
  {type:'action', branch:'no', text:'C · PEF <40 % (o <25 % a la llegada), FR >25, FC >110, musculatura accesoria, hipercapnia: Mg IV, VMNI como PUENTE; salbutamol IV (200 µg en 30 min → 0,1–0,2 µg/kg/min) solo como rescate refractario con monitorización → TRASLADO A UCI DE HUV'},
  {type:'info', text:'Traslado a HUV: necesidad de VMNI/VMI o soporte hemodinámico, parada respiratoria, disminución de conciencia, deterioro pese al tratamiento, SpO₂ <90 % con O₂, PaCO₂ >45 o acidemia, neumotórax con compromiso, anafilaxia refractaria. Llamada médico a médico → SEM con SVA'},
  {type:'info', text:'Al alta: siempre con GCI (MART preferente), prednisona 40–50 mg/día 5–7 días sin descenso, técnica inhalatoria y plan escrito, AP en ~7 días, Neumología/Alergología <2 semanas si crisis vital, embarazo o anafilaxia. Vacunas: gripe, neumococo, COVID-19; VRS ≥65 años'}],
  src:'Protocolo Asma en Urgencias Hospital de Campdevànol v3.0 (nov 2026) · GEMA 5.5 (2025) · GINA 2026 · SEMES/REUE 2026: Piñera Salmerón P, Rev Esp Urg Emerg 2026;5:134-43, doi:10.55633/s3me/REUE014.2026 · ALAT-SEPAR 2025: Stok AM, Open Respir Arch 2025;7:100469, doi:10.1016/j.opresp.2025.100469 · Mg IV: Kew 2014, Cochrane CD010909 · GALAXIA 2022 · GINA (Reddel 2021, PMID 34658302) · ERS/EAACI 2019 (Bourdin, PMID 31467120) · 3Mg (Goodacre 2014, PMID 24731521) · Budesonida NEB a dosis altas (Kornthatchapong 2024, PMID 39694823)'},

{id:'tep-agudo', title:'TEP agudo', sub:'Probabilidad, categoría A–E (AHA/ACC 2026) y riesgo ESC 2019, anticoagulación, fibrinólisis y destino', badge:'red', tag:'Crítico', rank:12.7,
  flujograma:'protocolos/Flujograma_TEP_Campdevanol.pdf',
  eval:{
    items:[
      {t:'h', l:'Hemodinámica'},
      {k:'hemo', t:'sel', l:'Situación hemodinámica', o:[['Estable (PAS ≥90 sin vasopresores)',0],['Hipotensión transitoria que responde a fluidos',1],['Hipotensión persistente o recurrente / shock cardiogénico',2],['Shock refractario o PCR',3]]},
      {k:'lact', t:'num', l:'Lactato', u:'mmol/L'},
      {k:'olig', t:'chk', l:'Oliguria o lesión renal aguda'},
      {k:'mental', t:'chk', l:'Alteración del estado mental'},
      {k:'pam', t:'num', l:'PAM', u:'mmHg'},
      {k:'resp', t:'chk', l:'Compromiso respiratorio: hipoxemia, FiO₂ creciente o trabajo respiratorio (modificador R)'},
      {t:'h', l:'Probabilidad clínica — Wells (si aún no está confirmado)'},
      {k:'wTvp', t:'chk', l:'Signos clínicos de TVP'},
      {k:'wAlt', t:'chk', l:'Diagnóstico alternativo menos probable que TEP'},
      {k:'wInm', t:'chk', l:'Inmovilización ≥3 días o cirugía/traumatismo en las 4 semanas previas'},
      {k:'wPrev', t:'chk', l:'TVP o TEP previo'},
      {k:'wHemop', t:'chk', l:'Hemoptisis'},
      {k:'estrog', t:'chk', l:'Estrógenos u hormonas (solo PERC)'},
      {k:'dd', t:'num', l:'Dímero D', u:'µg/L FEU'},
      {t:'h', l:'Gravedad — PESI / sPESI'},
      {k:'edad', t:'num', l:'Edad', u:'años'},
      {k:'varon', t:'chk', l:'Sexo masculino'},
      {k:'cancer', t:'chk', l:'Cáncer activo'},
      {k:'ic', t:'chk', l:'Insuficiencia cardiaca crónica'},
      {k:'epc', t:'chk', l:'Enfermedad pulmonar crónica'},
      {k:'fc', t:'num', l:'Frecuencia cardiaca', u:'lpm'},
      {k:'pas', t:'num', l:'PAS', u:'mmHg'},
      {k:'fr', t:'num', l:'Frecuencia respiratoria', u:'rpm'},
      {k:'temp', t:'num', l:'Temperatura', u:'°C'},
      {k:'spo2', t:'num', l:'SpO₂ con aire ambiente', u:'%'},
      {t:'h', l:'Ventrículo derecho y biomarcadores (TEP confirmado)'},
      {k:'conf', t:'chk', l:'TEP confirmado por angio-TC (o TVP proximal en ecografía con sospecha de TEP)'},
      {k:'incid', t:'chk', l:'TEP incidental asintomático'},
      {k:'vd', t:'chk', l:'VD alterado: VD/VI ≥1,0 en angio-TC o criterio POCUS (septo en D, TAPSE &lt;16, McConnell)'},
      {k:'trop', t:'chk', l:'Troponina hs &gt; p99 del laboratorio'},
      {k:'bnp', t:'num', l:'NT-proBNP', u:'pg/mL'},
      {t:'h', l:'Hestia, dosis y lisis'},
      {k:'peso', t:'num', l:'Peso real', u:'kg'},
      {k:'clcr', t:'num', l:'Aclaramiento de creatinina', u:'mL/min'},
      {k:'sangr', t:'chk', l:'Sangrado activo o alto riesgo de sangrado'},
      {k:'ciLisis', t:'chk', l:'Contraindicación ABSOLUTA de fibrinólisis (ictus hemorrágico o desconocido, isquémico &lt;6 m, neoplasia SNC, trauma/cirugía/TCE &lt;3 sem, diátesis, sangrado activo, disección)'},
      {k:'o2dia', t:'chk', l:'Necesitará O₂ &gt;24 h para SpO₂ &gt;90 %'},
      {k:'enAco', t:'chk', l:'TEP diagnosticado durante anticoagulación'},
      {k:'dolor', t:'chk', l:'Dolor que requiere analgesia IV &gt;24 h'},
      {k:'social', t:'chk', l:'Razón médica o social para ingreso &gt;24 h'},
      {k:'hepat', t:'chk', l:'Insuficiencia hepática grave'},
      {k:'emb', t:'chk', l:'Embarazo'},
      {k:'tih', t:'chk', l:'Antecedente de trombocitopenia inducida por heparina'}
    ],
    calc:function(v){
      const has = x => !isNaN(x);
      const out = [];
      const any = Object.keys(v).some(k => v[k] === true || (k !== 'hemo' && typeof v[k] === 'number' && has(v[k])) || (k === 'hemo' && v[k] > 0));
      if (!any) return [{t:'Introduce los datos del paciente', c:'', h:'Hemodinámica, Wells/PERC y dímero D si aún se sospecha; PESI, VD y biomarcadores si ya está confirmado. La categoría A–E, el tratamiento y el destino se calculan al momento.'}];
      const pesoOk = has(v.peso) && v.peso > 0;
      const P = n => pesoOk ? Math.round(v.peso * n) : null;
      const fc = has(v.fc) ? v.fc : NaN;

      /* 1. Probabilidad clínica (solo si no está confirmado) */
      if (!v.conf && !v.incid && v.hemo < 2) {
        const w = (v.wTvp ? 3 : 0) + (v.wAlt ? 3 : 0) + (has(fc) && fc > 100 ? 1.5 : 0) + (v.wInm ? 1.5 : 0) + (v.wPrev ? 1.5 : 0) + (v.wHemop ? 1 : 0) + (v.cancer ? 1 : 0);
        const w3 = w < 2 ? 'baja' : w <= 6 ? 'intermedia' : 'alta';
        const perc = [has(v.edad) ? v.edad >= 50 : null, has(fc) ? fc >= 100 : null, has(v.spo2) ? v.spo2 < 95 : null, v.wTvp, v.wHemop, v.wInm, v.wPrev, v.estrog];
        const percPos = perc.filter(x => x === true).length, percFalta = perc.filter(x => x === null).length;
        const corte = has(v.edad) && v.edad > 50 ? v.edad * 10 : 500;
        let conducta;
        if (w > 6) conducta = '<b>Probabilidad alta → angio-TC directo, sin dímero D.</b> Si hay demora de imagen y el riesgo hemorrágico es aceptable: HBPM empírica.';
        else if (w < 2 && percPos === 0 && percFalta === 0) conducta = '<b>PERC 8/8 negativos → TEP descartado</b> sin dímero D.';
        else if (has(v.dd)) conducta = v.dd < corte ? '<b>Dímero D ' + v.dd + ' &lt; ' + corte + ' µg/L (ajustado por edad) → TEP descartado.</b>' : '<b>Dímero D ' + v.dd + ' ≥ ' + corte + ' µg/L → angio-TC</b> (informe con cociente VD/VI).';
        else conducta = (w < 2 ? 'PERC ' + (percFalta ? 'incompleto (faltan edad, FC o SpO₂)' : 'positivo (' + percPos + ' criterio/s)') + ' → ' : '') + '<b>dímero D</b> con corte ajustado por edad: ' + corte + ' µg/L FEU.';
        out.push({t:'Probabilidad clínica (Wells ' + String(w).replace('.', ',') + '): ' + w3.toUpperCase() + ' · ' + (w <= 4 ? 'TEP improbable' : 'TEP probable'), c:w > 6 ? 'high' : w >= 2 ? 'mid' : 'low',
          h:conducta + '<br><span class="pe-nota">PERC solo con probabilidad baja. El dímero D pierde utilidad con anticoagulación, cáncer, embarazo, infección, hospitalización o edad avanzada. YEARS es alternativa (0 ítems + DD &lt;1000; ≥1 ítem + DD &lt;500).</span>'});
      }

      /* 2. PESI, sPESI y Hestia (solo con TEP confirmado o inestable) */
      const confirmado = v.conf || v.incid || v.hemo > 0;
      const pesiOk = has(v.edad);
      const pesi = pesiOk ? v.edad + (v.varon ? 10 : 0) + (v.cancer ? 30 : 0) + (v.ic ? 10 : 0) + (v.epc ? 10 : 0) + (has(fc) && fc >= 110 ? 20 : 0) +
        (has(v.pas) && v.pas < 100 ? 30 : 0) + (has(v.fr) && v.fr >= 30 ? 20 : 0) + (has(v.temp) && v.temp < 36 ? 20 : 0) + (v.mental ? 60 : 0) + (has(v.spo2) && v.spo2 < 90 ? 20 : 0) : NaN;
      const pesiCl = !pesiOk ? null : pesi <= 65 ? 'I' : pesi <= 85 ? 'II' : pesi <= 105 ? 'III' : pesi <= 125 ? 'IV' : 'V';
      const spesiItems = [has(v.edad) && v.edad > 80 ? 'edad &gt;80' : '', v.cancer ? 'cáncer' : '', v.ic || v.epc ? 'enfermedad cardiopulmonar crónica' : '', has(fc) && fc >= 110 ? 'FC ≥110' : '', has(v.pas) && v.pas < 100 ? 'PAS &lt;100' : '', has(v.spo2) && v.spo2 < 90 ? 'SpO₂ &lt;90 %' : ''].filter(Boolean);
      const spesi = spesiItems.length;
      const hestia = [v.hemo > 0 ? 'inestabilidad hemodinámica' : '', v.hemo >= 2 ? 'necesita trombólisis' : '', v.sangr ? 'sangrado o alto riesgo' : '', v.o2dia ? 'O₂ &gt;24 h' : '', v.enAco ? 'TEP con anticoagulación' : '', v.dolor ? 'analgesia IV &gt;24 h' : '',
        v.social ? 'razón médica/social' : '', has(v.clcr) && v.clcr < 30 ? 'ClCr &lt;30' : '', v.hepat ? 'insuficiencia hepática grave' : '', v.emb ? 'embarazo' : '', v.tih ? 'TIH previa' : ''].filter(Boolean);
      const bajoEscala = (pesiOk ? (pesiCl === 'I' || pesiCl === 'II') : true) && spesi === 0;
      if (confirmado) out.push({t:'Escalas: ' + (pesiOk ? 'PESI ' + pesi + ' (clase ' + pesiCl + ')' : 'PESI sin edad') + ' · sPESI ' + spesi + ' · Hestia ' + hestia.length, c:bajoEscala && !hestia.length ? 'low' : 'mid',
        h:(pesiOk ? 'Mortalidad a 30 d PESI clase ' + pesiCl + ': ' + {I:'0–1,6 %', II:'1,7–3,5 %', III:'3,2–7,1 %', IV:'4,0–11,4 %', V:'10,0–24,5 %'}[pesiCl] + '. ' : '') +
          'sPESI ' + (spesi ? '≥1 (' + spesiItems.join(', ') + '): riesgo no bajo (≈10,9 %)' : '0: bajo riesgo (≈1 %)') + '. ' +
          'Hestia ' + (hestia.length ? 'positivo (' + hestia.join(', ') + '): no tratar en domicilio' : '0: candidato a tratamiento ambulatorio si el resto lo permite') + '.'});

      /* 3. Categoría A–E (AHA/ACC 2026) y riesgo ESC 2019 */
      const bnpPos = has(v.bnp) && v.bnp >= 600;
      const bio = [v.trop ? 'troponina +' : '', bnpPos ? 'NT-proBNP ≥600' : ''].filter(Boolean);
      const shockN = [has(v.lact) && v.lact > 2 ? 'lactato &gt;2' : '', v.olig ? 'oliguria/LRA' : '', v.mental ? 'alteración mental' : '', has(v.pam) && v.pam < 60 ? 'PAM &lt;60' : ''].filter(Boolean);
      let cat, cc, why;
      if (v.hemo === 3) { cat = 'E2'; cc = 'high'; why = 'shock refractario o PCR'; }
      else if (v.hemo === 2) { cat = 'E1'; cc = 'high'; why = 'hipotensión persistente o shock cardiogénico'; }
      else if (shockN.length && v.hemo === 0) { cat = 'D2'; cc = 'high'; why = 'shock normotenso: PAS ≥90 + ' + shockN.join(', '); }
      else if (v.hemo === 1) { cat = 'D1'; cc = 'high'; why = 'hipotensión transitoria que responde a fluidos' + (shockN.length ? ' (con ' + shockN.join(', ') + ': valorar D2)' : ''); }
      else if (!v.conf && !v.incid) { cat = null; }
      else if (v.vd && bio.length) { cat = 'C3'; cc = 'high'; why = 'VD alterado + ' + bio.join(' y '); }
      else if (v.vd || bio.length) { cat = 'C2'; cc = 'mid'; why = (v.vd ? 'VD alterado' : bio.join(' y ')) + (bajoEscala ? ' con escala baja (el protocolo no define este caso: se clasifica como C2, en línea con Barco 2019)' : ' + escala elevada'); }
      else if (v.incid && !v.resp) { cat = 'A'; cc = 'low'; why = 'TEP incidental asintomático'; }
      else if (!bajoEscala) { cat = 'C1'; cc = 'mid'; why = (pesiOk && !(pesiCl === 'I' || pesiCl === 'II') ? 'PESI ' + pesiCl : '') + (spesi ? (pesiOk && !(pesiCl === 'I' || pesiCl === 'II') ? ' · ' : '') + 'sPESI ' + spesi : '') + ' con VD y biomarcadores normales'; }
      else { cat = 'B'; cc = 'low'; why = 'PESI I–II / sPESI 0, VD y biomarcadores normales' + (hestia.length ? ' (Hestia positivo: no apto para alta precoz)' : ''); }
      const vdFalta = v.conf && cat && /^[BC]/.test(cat) && (!v.vd && !v.trop && !has(v.bnp));
      if (cat) {
        let esc;
        if (v.hemo >= 2) esc = 'ALTO';
        else if (!bajoEscala) esc = v.vd && v.trop ? 'INTERMEDIO-ALTO (VD + troponina)' : 'INTERMEDIO-BAJO';
        else esc = v.vd || v.trop ? 'INTERMEDIO-BAJO (escala baja con VD o troponina alterados)' : 'BAJO';
        out.push({t:'Categoría AHA/ACC 2026: ' + cat + (v.resp ? ' + R' : '') + ' · Riesgo ESC 2019: ' + esc.split(' (')[0], c:cc,
          h:'<b>Criterios:</b> ' + why + '.' + (v.resp ? ' <b>Modificador R:</b> compromiso respiratorio → más vigilancia aunque la categoría sea baja.' : '') +
            '<br><b>ESC 2019:</b> riesgo ' + esc + '.' + (/^D/.test(cat) ? ' ESC solo llama «alto» a la hipotensión persistente o el shock obstructivo; la categoría D de la AHA marca la urgencia aunque el riesgo ESC salga menor.' : '') + (cat === 'C3' && !v.trop ? ' C3 ≠ intermedio-alto ESC (ESC exige VD + troponina): documentar ambos.' : '') +
            (vdFalta ? '<br><b>Faltan VD/VI y biomarcadores</b> (troponina, NT-proBNP, lactato) antes de categorizar.' : '')});
      }

      /* 4. Tratamiento */
      const t = [];
      const renal = has(v.clcr) ? v.clcr : NaN;
      const enox = pesoOk ? P(1) + ' mg' : '1 mg/kg';
      const enoxTxt = has(renal) && renal < 15 ? 'ClCr &lt;15: <b>HNF</b> (HBPM contraindicada)' : has(renal) && renal < 30 ? '<b>Enoxaparina ' + enox + ' SC cada 24 h</b> (ClCr 15–30)' : '<b>Enoxaparina ' + enox + ' SC cada 12 h</b>';
      const hnf = '<b>HNF</b> bolo 80 U/kg' + (pesoOk ? ' (' + P(80) + ' U)' : '') + ' IV + perfusión 18 U/kg/h' + (pesoOk ? ' (' + P(18) + ' U/h = ' + (v.peso * 0.18).toFixed(1).replace('.', ',') + ' mL/h con 25.000 U en 250 mL)' : '') + '; TTPa a las 6 h y tras cada cambio (≈1,5–2,5 × control)';
      if (v.tih) t.push('<b>TIH previa:</b> evitar HNF y HBPM → anticoagulante no heparínico.');
      if (v.sangr && cat !== 'E1' && cat !== 'E2') t.push('<b>Sangrado activo / contraindicación absoluta de anticoagular:</b> no anticoagular; filtro de VCI recuperable en casos seleccionados y reevaluar a diario.');
      const wells = (v.wTvp ? 3 : 0) + (v.wAlt ? 3 : 0) + (has(fc) && fc > 100 ? 1.5 : 0) + (v.wInm ? 1.5 : 0) + (v.wPrev ? 1.5 : 0) + (v.wHemop ? 1 : 0) + (v.cancer ? 1 : 0);
      if (!confirmado) { if (wells > 6) t.push('Probabilidad alta: si hay demora de imagen y el riesgo hemorrágico es aceptable, ' + enoxTxt + ' empírica.'); else if (wells > 4) t.push('TEP probable: si la imagen se va a demorar, valorar anticoagulación empírica (' + enoxTxt + ') según el riesgo hemorrágico.'); }
      if (cat === 'E1' || cat === 'E2') {
        const alt = pesoOk && v.peso < 65 ? 'total máx. ' + Math.round(v.peso * 1.5) + ' mg (1,5 mg/kg, bolo incluido): 10 mg en bolo + ' + (Math.round(v.peso * 1.5) - 10) + ' mg en 2 h' : '100 mg IV en 2 h: 10 mg en bolo (1–2 min) + 90 mg en 2 h' + (pesoOk ? '' : ' (&lt;65 kg: máx. 1,5 mg/kg total)');
        t.push(hnf.replace(' + perfusión', ' en cuanto se sospecha; perfusión') + '.');
        t.push(v.ciLisis ? '<b>Contraindicación absoluta → PERT del Clínic de inmediato</b> (catéter, embolectomía, ECMO-VA).' :
          cat === 'E2' && v.hemo === 3 ? '<b>Alteplasa en PCR: 50 mg IV en bolo en 2 min</b>; si no hay ROSC a los 15–30 min, segunda dosis de 50 mg (máx. total 100 mg). Suspender la HNF/HBPM. RCP 60–90 min tras la lisis (ERC 2025; OUH 2026; ESC 2019). Alternativa por peso (ERC 2025): 0,6–1,0 mg/kg' + (pesoOk ? ' (' + Math.min(100, P(0.6)) + '–' + Math.min(100, P(1)) + ' mg)' : '') + ', máx. 100 mg. Shock refractario con pulso: pauta estándar ' + alt + '.' :
          '<b>Alteplasa estándar:</b> ' + alt + '. Acelerada solo en inestabilidad extrema (fuera de ficha): 0,6 mg/kg' + (pesoOk ? ' (' + Math.min(50, P(0.6)) + ' mg)' : '') + ' en 15 min, máx. 50 mg.');
        if (!v.ciLisis) t.push('<b>Parar la HNF durante la alteplasa</b> (criterio CHV; ESC permite mantenerla); al terminar, TTPa cada 2–4 h y reiniciar sin bolo cuando TTPa &lt;2 × LSN. Contraindicaciones relativas: se individualizan.');
      } else if (cat === 'D1' || cat === 'D2') {
        t.push(has(renal) && renal < 30 ? hnf + ' (FG &lt;30).' : enoxTxt + ' por defecto. Si se prevé reperfusión o procedimiento: ' + hnf + '.');
        t.push('<b>Fibrinólisis sistémica:</b> se puede considerar si el riesgo de sangrado es aceptable y se plantea terapia avanzada (AHA 2026; daño en A1–C2). Decidir con el PERT.');
      } else if (cat === 'C3') t.push((has(renal) && renal < 30 ? hnf + ' (FG &lt;30).' : enoxTxt + '; ' + hnf.replace('<b>HNF</b>', 'HNF') + ' si se prevé procedimiento.') + ' Reperfusión no rutinaria. Paso a ACOD tras 2–3 días de anticoagulación parenteral si está estable.');
      else if (cat === 'C1' || cat === 'C2') t.push((has(renal) && renal < 30 ? hnf + ' (preferente con ClCr ≤30, ESC 2019)' + (renal >= 15 ? '; alternativa: enoxaparina ' + enox + ' SC cada 24 h con control de anti-Xa (AHA 2026)' : '') + '.' : enoxTxt + '.') + ' → ACOD a las 24–48 h si está estable y sin procedimiento previsto.');
      else if (cat === 'A' || cat === 'B') t.push('<b>ACOD:</b> apixabán 10 mg/12 h VO × 7 días → 5 mg/12 h, o rivaroxabán 15 mg/12 h VO × 21 días → 20 mg/24 h con comida' + (has(renal) && renal < 15 ? ' (<b>ClCr &lt;15: evitar rivaroxabán</b>)' : '') + '.');
      if (v.emb) t.push('<b>Embarazo:</b> HBPM o HNF; ACOD y AVK no recomendados.');
      if (v.cancer && cat && !/^E/.test(cat)) t.push('<b>Cáncer activo:</b> ACOD o HBPM individualizados (localización, riesgo GI/GU, interacciones).');
      if (cat && /^[DE]/.test(cat)) t.push('<b>Soporte:</b> cristaloide ≤500 mL en 15–30 min solo sin congestión · noradrenalina (inicio de pauta local) 0,05–0,1 µg/kg/min' + (pesoOk ? ' (' + (v.peso * 0.05).toFixed(1).replace('.', ',') + '–' + (v.peso * 0.1).toFixed(1).replace('.', ',') + ' µg/min)' : '') + ' si PAM &lt;65, titular sin techo fijo · dobutamina 2–10 µg/kg/min si bajo gasto con PA conservada · O₂ para SpO₂ ≥90 %; evitar la IOT (si es imprescindible: ketamina/etomidato, vasopresor en marcha, Vt 6 mL/kg, PEEP baja).');
      if (confirmado) t.push('<b>Siempre:</b> anticoagulación ≥3 meses. Hemograma, creatinina/FG (CKD-EPI), coagulación y perfil hepático' + (cat && /^[DE]/.test(cat) ? '; grupo y pruebas cruzadas' : '') + '.');
      if (t.length) out.push({t:'Tratamiento' + (cat ? ' (' + cat + ')' : ''), c:'', h:t.map(x => '• ' + x).join('<br>') + (pesoOk ? '' : '<br><span class="pe-nota">Introduce el peso real para calcular las dosis.</span>')});

      /* 5. Destino (red Campdevànol – CHV Vic – PERT Clínic) */
      const dest = {
        A:'<b>Ambulatorio</b> con ACOD.',
        B:hestia.length ? '<b>Ingreso en planta (Campdevànol)</b>: Hestia positivo.' : '<b>Alta precoz u observación corta.</b> Requisitos: estable, bajo riesgo hemorrágico, sin barreras sociales, anticoagulante disponible y comprendido, control a las 48 h–7 días.',
        C1:'<b>Planta Campdevànol.</b> PERT recomendable (AHA 2026: PERT en C–E).',
        C2:'<b>Planta Campdevànol</b> con NEWS2 cada 4 h. PERT recomendable.',
        C3:'<b>Observación de urgencias con monitor</b> → planta solo con estabilidad confirmada (no por plazo fijo); NEWS2 cada 2 h; troponina/lactato a las 6–12 h. <b>PERT obligado</b> (clase 1). Traslado precoz a Vic si no hay box monitorizado o la tendencia empeora. <i>Discrepancia abierta: traslado precoz de todo C3 estable, pendiente de acuerdo de red.</i>',
        D1:'<b>Llamar al PERT del Clínic en ≤30 min</b> → Clínic o Medicina Interna monitorizada de Vic. Si no es candidato: guardia del CHV. Ningún D sale sin anticoagulación parenteral en curso. Si pasa a E: fibrinólisis local antes del traslado.',
        D2:'<b>PERT del Clínic en ≤30 min + UCI de Vic</b> → Clínic o UCI Vic. Si pasa a E: fibrinólisis local antes del traslado.',
        E1:'<b>Fibrinólisis en Campdevànol sin esperar traslado.</b> Llamada simultánea a PERT Clínic + UCI Vic (no retrasa la lisis). <b>No trasladar antes de estabilizar</b> (AHA 2026, clase 3: daño). Post-lisis: PERT decide Clínic (SEM 061, SVA); si no → UCI Vic.',
        E2:'<b>Fibrinólisis en Campdevànol sin esperar traslado</b> (en PCR con sospecha fundada, sin imagen). PERT Clínic + UCI Vic de inmediato. No trasladar antes de estabilizar.'
      };
      if (cat) {
        let d = dest[cat];
        const extra = [];
        if (/^[ABC]/.test(cat)) extra.push('Traslado a Vic al margen de la categoría: arritmia significativa · hipoxemia que no se controla con Ventimask/reservorio con deterioro rápido · cualquier C que evoluciona a D (↑FC, ↓PA, ↓SpO₂ o ↑FiO₂, oliguria, confusión, ↑lactato o troponina).');
        out.push({t:'Destino inicial', c:cc, h:d + (extra.length ? '<br>' + extra.join('<br>') : '') +
          '<br>PERT Clínic: 932 27 54 00, busca 380396 · SEM 061 (SVA) para D–E.' +
          '<br><span class="pe-nota">Adaptación local (red Campdevànol–Vic–Clínic) pendiente de validación con UCI CHV, PERT Clínic, Farmacia y Dirección médica.</span>'});
      }
      return out;
    }
  },
  steps:[
  {type:'info', text:'Recursos locales (Hospital de Campdevànol): angio-TC, troponina, NT-proBNP, lactato 24 h y alteplasa en stock; POCUS si hay urgenciólogo formado. Sin UCI ni ecocardiografía reglada. Red: CHV Vic (~30 min: UCI y MI monitorizada) y PERT del Hospital Clínic (~90 min: catéter, embolectomía, ECMO)'},
  {type:'action', text:'ABC, constantes, ECG y monitor; dos vías si hay compromiso hemodinámico. O₂ para SpO₂ ≥90 %; VMNI/IOT con precaución (la presión positiva puede precipitar el fallo del VD)'},
  {type:'decision', text:'¿PCR, hipotensión persistente o shock?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'HNF bolo 80 U/kg. Trasladable a TC → angio-TC inmediato acompañado. No trasladable → POCUS: VD alterado sin otra causa → tratar como E (lisis); VD normal → buscar otra causa. PCR con sospecha fundada → fibrinólisis sin imagen (ERC 2025)'},
  {type:'action', branch:'no', text:'Probabilidad clínica (Wells, Ginebra o YEARS): baja → PERC (8/8 negativos descarta) → dímero D ajustado por edad (edad × 10 µg/L si >50 a) · intermedia → dímero D · alta → angio-TC directo (HBPM si demora)'},
  {type:'action', text:'TEP confirmado: VD (VD/VI ≥1,0 en angio-TC o POCUS) + troponina, NT-proBNP y lactato + PESI/sPESI/Hestia → categoría A–E escrita en la historia antes de decidir el destino'},
  {type:'action', text:'A–B (incidental o PESI I–II/sPESI 0/Hestia 0, VD y biomarcadores normales): ACOD (apixabán 10 mg/12 h × 7 d → 5 mg/12 h o rivaroxabán 15 mg/12 h × 21 d → 20 mg/24 h) y alta precoz, control 48 h–7 d'},
  {type:'action', text:'C1–C3: enoxaparina 1 mg/kg/12 h SC (ClCr 15–30 → cada 24 h; <15 → HNF) → planta Campdevànol. C3 (VD + biomarcador): monitor en observación y PERT obligado'},
  {type:'action', text:'D1 (hipotensión transitoria) / D2 (shock normotenso: lactato >2, oliguria, alteración mental o PAM <60): HBPM (HNF si reperfusión prevista o FG <30) + PERT Clínic en ≤30 min; no candidato → guardia CHV'},
  {type:'action', text:'E (hipotensión persistente, shock, PCR): HNF 80 U/kg + llamada PERT + UCI Vic. Sin contraindicación absoluta → ALTEPLASA 100 mg en 2 h (10 mg bolo + 90 mg; <65 kg máx. 1,5 mg/kg) o en PCR 50 mg en bolo en 2 min, segunda dosis de 50 mg si no hay ROSC a los 15–30 min (máx. 100 mg; por peso, ERC 2025: 0,6–1,0 mg/kg, máx. 100 mg). Contraindicación absoluta → PERT (catéter/ECMO)'},
  {type:'info', text:'Nunca trasladar un E antes de estabilizarlo (AHA 2026, clase 3) ni un D sin anticoagulación parenteral en curso. Parar la HNF durante la alteplasa (criterio CHV); reiniciar sin bolo cuando TTPa <2 × LSN'},
  {type:'info', text:'Al alta: anticoagulación ≥3 meses, control a las 48 h–7 d y a los ~3 meses; signos de alarma (sangrado, disnea súbita, síncope); evitar AINE. Disnea o intolerancia persistente → estudio de HPTEC'}],
  src:'Protocolo TEP agudo Hospital de Campdevànol v1.1 (oct 2026) · 2026 AHA/ACC/ACCP/ACEP/CHEST/SCAI/SHM/SIR/SVM/SVN PE Guideline (Creager MA, Circulation 2026) · ESC/ERS 2019: Konstantinides SV, Eur Heart J 2020;41:543-603 · ERC 2025 · CHEST 2021: Stevens SM, Chest 2021;160:e545 · HOME-PE: Roy PM, Eur Heart J 2021;42:3146 · Barco S, Eur Heart J 2019;40:902 · Ficha técnica de alteplasa (CIMA) · Alteplasa en PCR: ERC 2025 Special Circumstances (Lott C, PMID 41117569); OUH Medicines Information Leaflet vol. 7 n.º 8 (ene 2026) · AHA/ACC 2026: PMID 41712677 / 41712898 · ESC 2019: PMID 31504429'},

];
