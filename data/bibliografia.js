/* ==================================================================
   BIBLIOGRAFÍA — registro de verificación clínica de las fichas de
   medicamentos (Vera + Perplexity), por lote temático.

   PROPÓSITO: cuando se pida "actualizar" las fichas, leer primero este
   archivo. Cada lote indica las GUÍAS BASE usadas — antes de repetir
   toda la verificación, comprobar si esas guías ya tienen una versión
   más reciente (año superior al indicado). Si no la tienen, no hace
   falta re-verificar ese lote; si la tienen, focalizar la nueva
   consulta solo en lo que cambió esa guía nueva.

   Formato: { id, tema, fecha, farmacos[], guiasBase[{nombre, año}],
             referenciasVera[{titulo, autor, revista, año, pmid, doi}],
             referenciasPerplexity[{titulo, url}],
             cambiosAplicados[{ficha, cambio}], pendientes[{ficha, nota}] }
   ================================================================== */
window.BIBLIOGRAFIA = [

{id: 'vasoactivos', tema: 'Vasopresores, inotrópicos y vasodilatadores', fecha: '2026-08-25',
  farmacos: ['Noradrenalina','Adrenalina','Dobutamina','Nitroglicerina','Nitroprusiato sódico','Isoprenalina','Hidrocloruro de fenilefrina','Labetalol','Urapidilo'],
  guiasBase: [
    {nombre: 'ACC Expert Consensus — Cardiogenic Shock', año: 2025},
    {nombre: 'AHA Adult ALS (Part 9)', año: 2025},
    {nombre: 'AHA/ACC High Blood Pressure Guideline', año: 2025}
  ],
  referenciasVera: [
    {titulo: '2025 Concise Clinical Guidance: ACC Expert Consensus Statement on Cardiogenic Shock', autor: 'Sinha SS', revista: 'JACC', año: 2025, pmid: '40100174', doi: '10.1016/j.jacc.2025.02.018'},
    {titulo: 'Part 9: Adult Advanced Life Support — AHA Guidelines for CPR and ECC', autor: 'Wigginton JG', revista: 'Circulation', año: 2025, pmid: '41122884', doi: '10.1161/cir.0000000000001376'},
    {titulo: 'AHA/ACC Guideline for Prevention, Detection, Evaluation and Management of High Blood Pressure in Adults', autor: 'Jones DW', revista: 'Circulation', año: 2025, pmid: '40811497', doi: '10.1161/cir.0000000000001356'},
    {titulo: 'AHA/ACC Guideline for High Blood Pressure in Adults (JACC)', autor: 'Jones DW', revista: 'JACC', año: 2025, pmid: '40815242', doi: '10.1016/j.jacc.2025.05.007'}
  ],
  referenciasPerplexity: [
    {titulo: 'Surviving Sepsis Campaign Guidelines 2021', url: 'https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-guidelines-2021'},
    {titulo: 'Emergency Medicine Practice — Sepsis 2025', url: 'https://www.ebmedicine.net/media_library/files/Sepsis-Emergency-Medicine-2025.pdf'}
  ],
  cambiosAplicados: [
    {ficha: 'Nitroglicerina', cambio: 'Añadidas contraindicaciones: hipotensión/hipovolemia no corregida, IPDE5 en 24h previas o riociguat'},
    {ficha: 'Nitroprusiato sódico', cambio: 'Añadida contraindicación: IPDE5/riociguat concomitante'},
    {ficha: 'Dobutamina', cambio: 'Añadida contraindicación: miocardiopatía hipertrófica obstructiva'},
    {ficha: 'Labetalol', cambio: 'Añadido "asma/broncoespasmo activo" a contraindicaciones'}
  ],
  pendientes: [
    {ficha: 'Nitroglicerina', nota: 'Dosis en mcg/kg/h (convención del protocolo SEM catalán) vs mcg/min (convención ACC/AHA 2025). No se ha unificado; revisar si aporta confusión clínica real.'},
    {ficha: 'Hidrocloruro de fenilefrina', nota: 'Dosis fija en mcg/min; ACC 2025 sugiere mcg/kg/min en shock cardiogénico. Contextos distintos (prehospitalario vs UCI), sin cambio aplicado.'},
    {ficha: 'Urapidilo', nota: 'Vera no pudo confirmar con fuentes propias — sin guía específica localizada. Pendiente de una fuente citable si se quiere verificar con cita.'}
  ]
},

{id: 'sedacion-rsi', tema: 'Sedación, analgesia y secuencia rápida de intubación', fecha: '2026-08-25',
  farmacos: ['Midazolam','Propofol','Fentanilo','Cloruro mórfico','Ketamina','Etomidato','Diazepam','Clonazepam','Rocuronio','Succinilcolina'],
  guiasBase: [
    {nombre: 'SCCM RSI in the Critically Ill Adult Patient', año: 2023},
    {nombre: 'International Delphi — Physiologically Difficult Airway', año: 2024},
    {nombre: 'Induction agents for emergency tracheal intubation — Network Meta-Analysis', año: 2026}
  ],
  referenciasVera: [
    {titulo: 'SCCM Clinical Practice Guidelines for Rapid Sequence Intubation in the Critically Ill Adult Patient', autor: 'Acquisto NM', revista: 'Critical Care Medicine', año: 2023, pmid: '37707379', doi: '10.1097/ccm.0000000000006000'},
    {titulo: 'Tracheal intubation in critically ill adults with a physiologically difficult airway — International Delphi study', autor: 'Karamchandani K', revista: 'Intensive Care Medicine', año: 2024, pmid: '39162823', doi: '10.1007/s00134-024-07578-2'},
    {titulo: 'Induction agents for emergency tracheal intubation in critically ill adults — Systematic review and NMA', autor: 'Zampieri FG', revista: 'Critical Care', año: 2026, pmid: '42121165', doi: '10.1186/s13054-026-06067-w'}
  ],
  referenciasPerplexity: [
    {titulo: 'Manejo de sedoanalgesia y delirium en el paciente crítico', url: 'https://www.revistafarmaciahospitalaria.es/es-manejo-sedoanalgesia-delirio-el-paciente-avance-S1130634325001047'},
    {titulo: 'Guía de práctica clínica basada en la evidencia para el manejo de la sedo-analgesia en el paciente adulto críticamente enfermo', url: 'https://www.medintensiva.org/es-guia-practica-clinica-basada-evidencia-articulo-13111622'}
  ],
  cambiosAplicados: [],
  pendientes: [
    {ficha: 'Etomidato', nota: 'SCCM 2023 concluye que "contraindicado en shock séptico" NO es universal en adultos (sí lo es en sepsis pediátrica, SSC Children 2020). Nuestra ficha no hace esa afirmación, así que no requiere cambio, pero queda anotado por si se añade contenido futuro sobre esto.'},
    {ficha: 'Ketamina', nota: 'El rango 0,25-0,5 mg/kg que la ficha llama "disociativa" es, según Vera, más bien subdisociativo/analgésico. Es la terminología literal del documento SEM original — no se ha alterado.'}
  ]
},

{id: 'antiarritmicos', tema: 'Antiarrítmicos y bradicardia', fecha: '2026-08-25',
  farmacos: ['Amiodarona','Adenosina','Verapamilo','Flecainida','Procainamida','Digoxina','Lidocaína','Metoprolol','Atropina'],
  guiasBase: [
    {nombre: 'ERC Adult Advanced Life Support', año: 2025},
    {nombre: 'AHA Adult Advanced Life Support (Part 9)', año: 2025},
    {nombre: 'ESC Guidelines for Atrial Fibrillation', año: 2024}
  ],
  referenciasVera: [
    {titulo: 'European Resuscitation Council Guidelines 2025 Adult Advanced Life Support', autor: 'Soar J', revista: 'Resuscitation', año: 2025, pmid: '41117572', doi: '10.1016/j.resuscitation.2025.110769'},
    {titulo: 'Part 9: Adult Advanced Life Support — AHA Guidelines for CPR and ECC', autor: 'Wigginton JG', revista: 'Circulation', año: 2025, pmid: '41122884', doi: '10.1161/cir.0000000000001376'},
    {titulo: '2024 ESC Guidelines for the management of atrial fibrillation', autor: 'Van Gelder IC', revista: 'European Heart Journal', año: 2024, pmid: '39210723', doi: '10.1093/eurheartj/ehae176'}
  ],
  referenciasPerplexity: [
    {titulo: 'GUÍAS ERC 2025 Soporte Vital Avanzado (PDF)', url: 'https://atencionprimaria.almirallmed.es/wp-content/uploads/sites/12/2026/06/1.10_Guia-SVA_ERC-2025.pdf'},
    {titulo: '2024 ESC Guidelines for AF — Key Points (ACC)', url: 'https://www.acc.org/latest-in-cardiology/ten-points-to-remember/2024/09/17/04/05/2024-esc-guidelines-for-af-esc-2024'}
  ],
  cambiosAplicados: [],
  pendientes: [
    {ficha: 'Verapamilo', nota: 'Ficha ya usa 5-10 mg IV (rango completo, alineado con AHA 2025 0,075-0,15 mg/kg). Sin acción.'},
    {ficha: 'Adenosina', nota: 'Ficha ya escala 6→12→18 mg (ERC 2025). Sin acción.'},
    {ficha: 'Lidocaína', nota: 'La ficha se centra en anestesia local, no cubre el esquema de PCR (100 mg tras 3ª descarga +50 mg tras 5ª de ERC 2025). Valorar si se quiere añadir ese uso.'}
  ]
},

{id: 'anticoagulacion', tema: 'Anticoagulación, antiagregación y hemostasia', fecha: '2026-08-25',
  farmacos: ['Heparina sódica','Enoxaparina','Ácido tranexámico','Tenecteplasa','Clopidogrel','Prasugrel','Ticagrelor','Ácido acetilsalicílico','Acetilsalicilato de lisina'],
  guiasBase: [
    {nombre: 'ACC/AHA/ACEP/NAEMSP/SCAI Guideline for Acute Coronary Syndromes', año: 2025},
    {nombre: 'ESC Guidelines for NSTE-ACS', año: 2020},
    {nombre: 'ESC/ESCVS consensus — Antithrombotic therapy and body mass', año: 2024}
  ],
  referenciasVera: [
    {titulo: '2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes', autor: 'Rao SV', revista: 'Circulation', año: 2025, pmid: '40014670', doi: '10.1161/cir.0000000000001309'},
    {titulo: '2020 ESC Guidelines for NSTE-ACS', autor: 'Collet JP', revista: 'European Heart Journal', año: 2020, pmid: '32860058', doi: '10.1093/eurheartj/ehaa575'},
    {titulo: 'Update on antithrombotic therapy and body mass — ESC consensus statement', autor: 'Gigante B', revista: 'Eur Heart J Cardiovasc Pharmacother', año: 2024, pmid: '39237457', doi: '10.1093/ehjcvp/pvae064'},
    {titulo: '2021 ACC/AHA/SCAI Guideline for Coronary Artery Revascularization', autor: 'Lawton JS', revista: 'JACC', año: 2021, pmid: '34895950', doi: '10.1016/j.jacc.2021.09.006'}
  ],
  referenciasPerplexity: [
    {titulo: '2025 Guideline for Acute Coronary Syndromes (AHA)', url: 'https://professional.heart.org/en/science-news/2025-guideline-for-the-management-of-patients-with-acute-coronary-syndromes/top-things-to-know'},
    {titulo: 'Practice Management Guidelines for Venous Thromboembolism Prophylaxis (trauma)', url: 'https://www.vumc.org/trauma-and-scc/sites/default/files/public_files/Trauma%20VTE%20Prophylaxis%20Guidelines%20Jan%202025.pdf'}
  ],
  cambiosAplicados: [],
  pendientes: [
    {ficha: 'Ácido acetilsalicílico / Acetilsalicilato de lisina', nota: 'ESC recomienda 75-250 mg IV; nuestro protocolo Codi IAM (fuente oficial SEM) usa 450 mg IV de acetilsalicilato de lisina. No se ha modificado por ser cita textual de un protocolo oficial vigente — verificar si el SEM lo ha actualizado.'},
    {ficha: 'Prasugrel', nota: 'Ficha ya contraindica ictus/AIT previo y >75 años. Sin acción.'}
  ]
},

{id: 'electrolitos-fluidos', tema: 'Electrolitos, fluidos y metabólico', fecha: '2026-08-25',
  farmacos: ['Bicarbonato sódico','Gluconato de calcio','Cloruro sódico 0,9%','Cloruro sódico 7,5%','Sulfato de magnesio','Glucosa','Insulina','Manitol','Plasmalyte'],
  guiasBase: [
    {nombre: 'ERC Executive Summary', año: 2025},
    {nombre: 'ERC Adult Advanced Life Support', año: 2025},
    {nombre: 'ERC Special Circumstances in Resuscitation', año: 2025}
  ],
  referenciasVera: [
    {titulo: 'European Resuscitation Council Guidelines 2025 Executive Summary', autor: 'Greif R', revista: 'Resuscitation', año: 2025, pmid: '41117573', doi: '10.1016/j.resuscitation.2025.110770'},
    {titulo: 'European Resuscitation Council Guidelines 2025 Adult Advanced Life Support', autor: 'Soar J', revista: 'Resuscitation', año: 2025, pmid: '41117572', doi: '10.1016/j.resuscitation.2025.110769'},
    {titulo: 'European Resuscitation Council Guidelines 2025 Special Circumstances in Resuscitation', autor: 'Lott C', revista: 'Resuscitation', año: 2025, pmid: '41117569', doi: '10.1016/j.resuscitation.2025.110753'}
  ],
  referenciasPerplexity: [
    {titulo: 'Diabetic Ketoacidosis Management (ADA/EASD/JBDS 2024)', url: 'https://attendme.ai/pathways/dka-management-ada-2024'},
    {titulo: 'Elevated intracranial pressure (ICP) — EMCrit', url: 'https://emcrit.org/ibcc/icp/'}
  ],
  cambiosAplicados: [],
  pendientes: [
    {ficha: 'Sulfato de magnesio', nota: 'Ficha ya usa 4,5 g en eclampsia (ERC 2025) y 2 g en torsades. Sin acción — confirmado correcto en esta misma verificación.'},
    {ficha: 'Cloruro sódico 7,5%', nota: 'Ficha ya distingue correctamente SSH 7,5% (HTIC/shock) de SSH 3% (hiponatremia). Sin acción.'},
    {ficha: 'Bicarbonato sódico', nota: 'ERC 2025 no fija dosis para acidosis metabólica grave fuera de parada; nuestra ficha (1 mEq/kg) es un esquema clásico no contradicho pero tampoco confirmado por esa guía. Sin fuente mejor disponible, sin cambio.'}
  ]
},

{id: 'antidotos-toxicologia', tema: 'Antídotos y toxicología', fecha: '2026-08-25',
  farmacos: ['Flumazenilo','Naloxona','Carbón activado','Hidroxocobalamina','Glucagón','Tiamina'],
  guiasBase: [
    {nombre: 'AHA Adult and Pediatric Special Circumstances of Resuscitation (Part 10)', año: 2025},
    {nombre: 'Clinical Toxicology Recommendations Collaborative — Activated Charcoal', año: 2026}
  ],
  referenciasVera: [
    {titulo: 'Part 10: Adult and Pediatric Special Circumstances of Resuscitation — AHA Guidelines for CPR and ECC', autor: 'Cao D', revista: 'Circulation', año: 2025, pmid: '41122889', doi: '10.1161/CIR.0000000000001380'},
    {titulo: 'Naloxone dosing in the era of synthetic opioids: Applying the Goldilocks principle', autor: 'Gonzalez Utrilla M', revista: 'Addiction', año: 2025, pmid: '40197810', doi: '10.1111/add.70060'},
    {titulo: 'Recommendations from the Clinical Toxicology Recommendations Collaborative on the administration of activated charcoal in acute oral overdose', autor: 'Hoegberg LCG', revista: 'Clinical Toxicology', año: 2026, pmid: '41906697', doi: '10.1080/15563650.2025.2609807'},
    {titulo: 'Stepwise clinical and diagnostic strategy for coma of unknown origin', autor: 'Silva S', revista: 'Intensive Care Medicine', año: 2026, pmid: '42059919', doi: '10.1007/s00134-026-08418-1'}
  ],
  referenciasPerplexity: [
    {titulo: 'MurciaSalud Toxiconet — protocolo de intoxicaciones', url: 'https://www.murciasalud.es/toxiconet.php?iddoc=165181&idsec=4014'},
    {titulo: 'Guía Práctica de Antídotos (INGESA)', url: 'https://ingesa.sanidad.gob.es/dam/jcr:371b37be-dbf2-4ea0-b88b-202fa4c1fd0c/Guia_Practica_Antidotos.pdf'}
  ],
  cambiosAplicados: [],
  pendientes: [
    {ficha: 'Glucagón', nota: 'Ficha ya usa 0,05 mg/kg (≈3,5 mg a 70 kg), dentro del rango AHA 2025 (2-10 mg). Sin acción.'},
    {ficha: 'Carbón activado', nota: 'Guías 2026 amplían la ventana útil más allá de 1-2h en ingestas seleccionadas (hasta 6h+). La ficha no fija una ventana explícita, así que no hay contradicción; valorar añadir esta nota informativa en el futuro.'},
    {ficha: 'Tiamina', nota: 'Para Wernicke establecido/sospecha fuerte, evidencia de UCI reciente propone dosis altas repetidas (500 mg IV TID) frente a los 100 mg de profilaxis de la ficha. Pendiente de decidir si se añade como matiz.'}
  ]
},

{id: 'psiquiatria-neuro', tema: 'Agitación psiquiátrica y status epiléptico', fecha: '2026-08-25',
  farmacos: ['Haloperidol','Olanzapina','Levetiracetam','Valproato sódico','Biperideno'],
  guiasBase: [
    {nombre: 'ACEP Clinical Policy — Seizures in the Emergency Department', año: 2024},
    {nombre: 'ACEP Clinical Policy — Severe Agitation', año: 2023}
  ],
  referenciasVera: [
    {titulo: 'Clinical Policy: Critical Issues in the Management of Adult Patients Presenting to the ED With Seizures', autor: 'Smith MD', revista: 'Annals of Emergency Medicine', año: 2024, pmid: '38906639', doi: '10.1016/j.annemergmed.2024.02.018'},
    {titulo: 'Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting With Severe Agitation', autor: 'Thiessen MEW', revista: 'Annals of Emergency Medicine', año: 2023, pmid: '38105109', doi: '10.1016/j.annemergmed.2023.09.010'}
  ],
  referenciasPerplexity: [
    {titulo: 'Manual de Práctica Clínica en Epilepsia — Actualización 2025 (SEN)', url: 'https://www.sen.es/profesionales/guias-y-protocolos/3786-manual-de-practica-clinica-en-epilepsia-actualizacion-2025'},
    {titulo: 'Ficha técnica Haloperidol (CIMA/AEMPS)', url: 'https://cima.aemps.es/cima/dochtml/ft/58345/FichaTecnica_58345.html'}
  ],
  cambiosAplicados: [],
  pendientes: [
    {ficha: 'Biperideno', nota: 'Ni Vera ni Perplexity encontraron una guía/ensayo con dosis citable para distonía aguda. La ficha actual no se ha podido verificar por falta de fuente — no es un error conocido, solo ausencia de evidencia localizada.'}
  ]
},

{id: 'analgesia-antiemesis', tema: 'Analgesia no opioide, tramadol y antiemesis', fecha: '2026-08-25',
  farmacos: ['Paracetamol','Metamizol','Dexketoprofeno','Tramadol','Granisetrón','Dexclorfeniramina'],
  guiasBase: [
    {nombre: 'American Headache Society — Acute Migraine Parenteral Pharmacotherapy in the ED', año: 2026}
  ],
  referenciasVera: [
    {titulo: '2025 guideline update to acute treatment of migraine for adults in the ED: AHS evidence assessment of parenteral pharmacotherapies', autor: 'Robblee J', revista: 'Headache', año: 2026, pmid: '41321235', doi: '10.1111/head.70016'},
    {titulo: 'The 2023 WSES guidelines on the management of trauma in elderly and frail patients', autor: 'De Simone B', revista: 'World Journal of Emergency Surgery', año: 2024, pmid: '38816766', doi: '10.1186/s13017-024-00537-8'}
  ],
  referenciasPerplexity: [
    {titulo: 'Guía SEMES — Manejo del dolor en Urgencias (2019)', url: 'https://www.semes.org/wp-content/uploads/2019/10/GU%C3%8DA-DOLOR-GdT-SEMES-DOLOR.pdf'}
  ],
  cambiosAplicados: [],
  pendientes: [
    {ficha: 'Tramadol', nota: 'Confirmado contraindicado en epilepsia no controlada (riesgo de bajar el umbral convulsivo) — ya reflejado en la ficha. Precaución adicional en cirrosis (≤50mg/12h) no está en la ficha; valorar añadir.'},
    {ficha: 'Granisetrón', nota: 'La guía de migraña 2026 no evalúa su uso antiemético estándar (solo un ensayo pequeño en migraña). Sin cambio — nuestra ficha cubre CINV/PONV, contexto distinto.'}
  ]
},

{id: 'corticoides-atb-captopril', tema: 'Corticoides, antibióticos, respiratorio y captopril', fecha: '2026-08-25',
  farmacos: ['Ceftriaxona','Hidrocortisona','Metilprednisolona','Budesonida','Omeprazol','Salbutamol','Bromuro de ipratropio','Captopril'],
  guiasBase: [
    {nombre: 'AHA/ACC High Blood Pressure Guideline', año: 2025},
    {nombre: 'ESC Guidelines for elevated blood pressure and hypertension', año: 2024},
    {nombre: 'Philippine CPG on Acute Severe Blood Pressure Elevation', año: 2024}
  ],
  referenciasVera: [
    {titulo: 'AHA/ACC Guideline for High Blood Pressure in Adults', autor: 'Jones DW', revista: 'Circulation', año: 2025, pmid: '40811497', doi: '10.1161/cir.0000000000001356'},
    {titulo: '2024 ESC Guidelines for the management of elevated blood pressure and hypertension', autor: 'McEvoy JW', revista: 'European Heart Journal', año: 2024, pmid: '39210715', doi: '10.1093/eurheartj/ehae178'},
    {titulo: 'Executive Summary of the 2024 Philippine CPG on Acute Severe Blood Pressure Elevation', autor: 'Ona DID', revista: 'Journal of Clinical Hypertension', año: 2026, pmid: '41614648', doi: '10.1111/jch.70199'}
  ],
  referenciasPerplexity: [
    {titulo: 'Emergency treatment of anaphylaxis — Resuscitation Council UK 2021', url: 'https://www.resus.org.uk/sites/default/files/2021-05/Emergency%20Treatment%20of%20Anaphylaxis%20May%202021_0.pdf'},
    {titulo: 'Ceftriaxone for Injection — Ficha técnica Pfizer', url: 'https://labeling.pfizer.com/ShowLabeling.aspx?id=9707'}
  ],
  cambiosAplicados: [],
  pendientes: [
    {ficha: 'Captopril', nota: 'Confirmado: la ficha ya distingue "urgencia" de "emergencia" hipertensiva y ya advierte que la vía sublingual es errática. Sin acción — coincide con el consenso de que SL no se recomienda para emergencia hipertensiva.'}
  ]
},

{id: 'obstetricia-hemorragia-digestiva', tema: 'Obstetricia y hemorragia digestiva por varices', fecha: '2026-08-25',
  farmacos: ['Oxitocina','Somatostatina','Mepivacaína','Bromuro de butilescopolamina'],
  guiasBase: [
    {nombre: 'Baveno VII — Renewing consensus in portal hypertension', año: 2021},
    {nombre: 'AGA Clinical Practice Update — Vasoactive Drugs and IV Albumin in Cirrhosis', año: 2023},
    {nombre: 'CNGOF Postpartum Hemorrhage Guidelines', año: 2015}
  ],
  referenciasVera: [
    {titulo: 'Baveno VII – Renewing consensus in portal hypertension', autor: 'de Franchis R', revista: 'Journal of Hepatology', año: 2021, pmid: '35120736', doi: '10.1016/j.jhep.2021.12.022'},
    {titulo: 'AGA Clinical Practice Update on the Use of Vasoactive Drugs and Intravenous Albumin in Cirrhosis', autor: 'Garcia-Tsao G', revista: 'Gastroenterology', año: 2023, pmid: '37978969', doi: '10.1053/j.gastro.2023.10.016'},
    {titulo: 'Postpartum hemorrhage: guidelines for clinical practice (CNGOF)', autor: 'Sentilhes L', revista: 'Eur J Obstet Gynecol Reprod Biol', año: 2015, pmid: '26773243', doi: '10.1016/j.ejogrb.2015.12.012'}
  ],
  referenciasPerplexity: [
    {titulo: 'Protocolo Multidisciplinar para el manejo de la Hemorragia Posparto (SEDAR 2025)', url: 'https://www.sedar.es/images/images/GUIAS/2025-GUIA_HPP-MULTIDISCIPLINAR_MANEJO-HEMORRAGIA-POSPARTO-Interactivo.pdf'},
    {titulo: 'Ficha técnica Oxitocina Kabi (CIMA/AEMPS)', url: 'https://cima.aemps.es/cima/dochtml/ft/83281/FT_83281.html'}
  ],
  cambiosAplicados: [
    {ficha: 'Somatostatina', cambio: 'Corregido "creatinina superior a 30 ml/min" → "filtración glomerular inferior a 30 ml/min" para reducir dosis (criterio estaba invertido). Corrección confirmada por el usuario tras la verificación inicial.'}
  ],
  pendientes: [
    {ficha: 'Somatostatina', nota: 'Perfusión expresada en mcg/kg/h (250-500 mcg/h equivalente); Baveno VII la expresa en dosis fija mcg/h. Diferencia de convención, sin cambio adicional aplicado.'},
    {ficha: 'Bromuro de butilescopolamina', nota: 'Ni Vera ni Perplexity encontraron guía/ficha citable para verificar la dosis. Sin fuente para confirmar o corregir.'}
  ]
}

];
