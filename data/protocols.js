/* ==================================================================
   PROTOCOLS — algoritmos de actuación paso a paso
   steps: {type:'action'|'decision'|'info', text, yes, no, branch:'yes'|'no'}
   Referencias: guías ERC/AHA, DAS (vía aérea difícil), SEM Gencat
   ================================================================== */
window.PROTOCOLS = [

{id:'anafilaxia', title:'Anafilaxia', sub:'Adrenalina IM inmediata — ERC 2025', badge:'red', tag:'Crítico', steps:[
  {type:'action', text:'Retirar el desencadenante si es posible (fármaco IV, picadura). NO retrasar la adrenalina por esto'},
  {type:'action', text:'ADRENALINA IM 0,5 mg (0,5 mL de solución 1 mg/mL = 1:1000) en cara anterolateral del muslo (vasto lateral), lo antes posible.\nAlternativa ponderal equivalente: 0,01 mg/kg IM, máximo 0,5 mg'},
  {type:'info', text:'IM en muslo, NO subcutánea ni en deltoides. Autoinyector en adultos: 0,5 mg (ERC First Aid 2025)'},
  {type:'action', text:'Posición: decúbito supino con piernas elevadas. Si disnea, semiincorporado. Si embarazo, decúbito lateral izquierdo.\nNO sentar ni levantar bruscamente'},
  {type:'action', text:'Oxígeno a alto flujo + acceso IV de grueso calibre + monitorización continua'},
  {type:'decision', text:'¿Persisten los síntomas a los 5 minutos?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'REPETIR adrenalina IM 0,5 mg. Se puede repetir cada 5 min según respuesta'},
  {type:'action', branch:'yes', text:'Fluidoterapia: cristaloide 500–1000 mL IV rápido si hipotensión; repetir según respuesta'},
  {type:'action', branch:'yes', text:'Refractaria tras ≥2 dosis IM: valorar adrenalina IV en perfusión con monitorización y personal experto. NO bolo IV a menos que haya parada'},
  {type:'action', branch:'no', text:'Mantener monitorización: riesgo de reacción bifásica'},
  {type:'info', text:'Broncoespasmo asociado: salbutamol nebulizado como adyuvante, nunca en sustitución de la adrenalina'},
  {type:'info', text:'Corticoide y antihistamínico son de segunda línea: no salvan la vida ni sustituyen a la adrenalina'},
  {type:'info', text:'Observación antes del alta según gravedad y respuesta. Alta con autoinyector, plan escrito y derivación a alergología'}],
  src:'ERC 2025 Special Circumstances · PMID 41117569 · ERC 2025 First Aid · PMID 41117568'},

{id:'fa-rapida', title:'FA con respuesta ventricular rápida', sub:'Control de frecuencia vs cardioversión — ESC 2024', badge:'amber', tag:'Urgente', steps:[
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

{id:'rcp', title:'RCP / SVA', sub:'Soporte vital avanzado adulto — ritmo desfibrilable vs no desfibrilable', badge:'red', tag:'Crítico', steps:[
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
]},

{id:'via-aerea-dificil', title:'Vía aérea difícil', sub:'Algoritmo DAS — Plan A → B → C → D', badge:'red', tag:'Crítico', steps:[
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
]},

{id:'sri', title:'Secuencia rápida de intubación (SRI)', sub:'Preparación, preoxigenación, inducción y relajación', badge:'red', tag:'Crítico', steps:[
  {type:'action', text:'Preparación: checklist de equipo (succión, oxígeno, vía aérea con tubos y plan B, fármacos, monitor) — confirmar plan B/C definidos'},
  {type:'action', text:'Preoxigenación: FiO₂ 100% durante 3–5 min (o 8 respiraciones a capacidad vital máxima si urgencia)'},
  {type:'decision', text:'¿Riesgo de respuesta simpática/dolor (TCE, cardiopatía, aneurisma)?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Premedicación: fentanilo 1–3 mcg/kg IV, 3 min antes de la inducción'},
  {type:'action', text:'Inducción según estabilidad hemodinámica: propofol 1.5–2.5 mg/kg (estable) · etomidato 0.3 mg/kg (inestable) · ketamina 1–2 mg/kg (shock/broncoespasmo)'},
  {type:'action', text:'Relajante neuromuscular: succinilcolina 1–1.5 mg/kg (inicio rápido) o rocuronio 1–1.2 mg/kg si contraindicación a succinilcolina'},
  {type:'action', text:'Intubación orotraqueal tras relajación completa (≈45–60 seg)'},
  {type:'action', text:'Confirmación: capnografía continua (EtCO₂), auscultación bilateral, fijación del tubo'},
  {type:'info', text:'La presión cricoidea no se recomienda de rutina; tener siempre preparados el plan B (dispositivo supraglótico) y el plan C (cricotiroidotomía) antes de inducir'}
]},

{id:'hiperkalemia', title:'Manejo de hiperkalemia', sub:'Estabilización de membrana → redistribución → eliminación', badge:'amber', tag:'Urgente', steps:[
  {type:'action', text:'Confirmar hiperkalemia con ECG y descartar pseudohiperpotasemia (hemólisis de la muestra, torniquete prolongado)'},
  {type:'decision', text:'¿Cambios ECG (T picudas, QRS ancho, aplanamiento de onda P) o K⁺ >6.5 mmol/L?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Estabilización de membrana: gluconato cálcico 10% 10 ml IV en 2–3 min; repetir a los 5–10 min si persisten cambios ECG'},
  {type:'action', text:'Redistribución: insulina rápida 10 UI + glucosa 50% 25 g IV en 15–30 min (vigilar glucemia capilar)'},
  {type:'action', text:'Redistribución: salbutamol nebulizado 10–20 mg (dosis alta, nebulizado continuo si es posible)'},
  {type:'action', text:'Eliminación: furosemida IV si diuresis conservada; resinas de intercambio (Kayexalate/resincalcio) si la función renal lo permite'},
  {type:'action', text:'Bicarbonato sódico IV si acidosis metabólica asociada'},
  {type:'decision', text:'¿K⁺ >6.5 refractario al tratamiento, anuria o insuficiencia renal grave?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Activar hemodiálisis urgente'},
  {type:'info', text:'Monitorización ECG continua y controles de K⁺ seriados cada 1–2 h hasta normalización; la gravedad clínica depende tanto del valor de K⁺ como de la velocidad de instauración y los cambios ECG'}
]},

{id:'transfusion-masiva', title:'Protocolo de transfusión masiva', sub:'Activación, ratio 1:1:1, ácido tranexámico y control de daños', badge:'red', tag:'Crítico', steps:[
  {type:'decision', text:'¿Criterios de activación? (>10 CH en 24h, >4 CH en 1h, o hemorragia activa con inestabilidad hemodinámica)', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Activar protocolo de transfusión masiva: avisar al banco de sangre y al equipo quirúrgico/radiología intervencionista'},
  {type:'action', text:'Solicitar hemoderivados en ratio 1:1:1 (concentrados de hematíes : plasma fresco congelado : plaquetas)'},
  {type:'action', text:'Ácido tranexámico 1 g IV en 10 min (idealmente en las primeras 3 h del sangrado), seguido de 1 g IV en infusión durante 8 h'},
  {type:'action', text:'Control de daños precoz: hemostasia quirúrgica o radiología intervencionista'},
  {type:'action', text:'Monitorizar gasometría, coagulación (incluido fibrinógeno) y calcio iónico cada 30–60 min'},
  {type:'info', text:'Objetivos de reanimación: Hb >7 g/dL, fibrinógeno >1.5 g/L, plaquetas >50.000/µL, pH >7.2, Tª >35°C, Ca²⁺ iónico >1.1 mmol/L'},
  {type:'info', text:'Evitar sobrecarga de cristaloides — priorizar hemoderivados como fluido de reanimación; en trauma, valorar hipotensión permisiva hasta control del sangrado'}
]},

{id:'dolor-toracico', title:'Manejo del dolor torácico', sub:'ECG precoz, troponina seriada y estratificación de riesgo', badge:'amber', tag:'Urgente', steps:[
  {type:'action', text:'ECG de 12 derivaciones en menos de 10 minutos desde la llegada'},
  {type:'decision', text:'¿Elevación del ST o BRIHH de nueva aparición (SCACEST)?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Activar código IAM: doble antiagregación + traslado urgente para ICP primaria (<90–120 min) o fibrinólisis si no está disponible'},
  {type:'action', branch:'no', text:'Troponina de alta sensibilidad seriada (0h y 1h, o 0h y 3h según protocolo local)'},
  {type:'action', branch:'no', text:'Estratificar riesgo con escalas GRACE/TIMI'},
  {type:'decision', text:'¿Troponina elevada o alta sospecha clínica de SCASEST?', yes:'Sí', no:'No'},
  {type:'action', branch:'yes', text:'Ingreso, antiagregación/anticoagulación según riesgo, coronariografía según estratificación (urgente/precoz/diferida)'},
  {type:'action', branch:'no', text:'Valorar diagnósticos alternativos: TEP (Wells + dímero D), disección aórtica (angioTC si sospecha), pericarditis (ECG difuso, roce pericárdico), neumotórax (auscultación, Rx/eco)'},
  {type:'info', text:'Alta con seguimiento ambulatorio si SCA descartado, troponinas negativas seriadas y estratificación de bajo riesgo'}
]}

];
