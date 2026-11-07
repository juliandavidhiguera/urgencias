/* ==================================================================
   PROTOCOLOS PEDIÁTRICOS — algoritmos de la SEUP (Sociedad Española de
   Urgencias de Pediatría, https://seup.org/algoritmos-seup/) convertidos
   en flujogramas. Cada uno enlaza su página y su PDF completo (campo docs).
   Contenido transcrito del PDF de la SEUP (sin añadir datos propios; lo
   que la SEUP no da figura como «según protocolo local»). Dosis con el
   peso real. Se pintan en la sección «Pediatría» de Protocolos (p.ped).
   Se cargan después de data/protocols.js (usan window.PROTOCOLS.push).
   ================================================================== */
/* ---------- seup-fiebre-sin-foco ---------- */
/* SEUP · Algoritmo 14: Fiebre sin focalidad en lactante de 0-24 meses previamente sano (junio 2025).
   Flujograma: algoritmo general (pág. 1) + Figura 14-1 (≤60 días) + Figura 14-2 (2-24 meses) + notas 1-14. */
window.PROTOCOLS.push({ id:'seup-fiebre-sin-foco', ped:true, title:'Fiebre sin foco 0-24 meses (SEUP)', sub:'Lactante previamente sano: TEP, edad (≤21 d, 22-60 d, 2-24 m), pruebas, antibiótico y destino', badge:'amber', tag:'Pediatría', rank:1,
  src:'SEUP · Algoritmo 14: Fiebre sin focalidad en lactante de 0-24 meses previamente sano · PDF revisado junio 2025 (14-Lactante-febril-Junio-25R; autores no constan en el PDF) · https://seup.org/algoritmo-lactante-febril/',
  docs:[{l:'📄 Algoritmo SEUP completo (PDF)', f:'https://seup.org/wp-content/uploads/2025/06/14-Lactante-febril-Junio-25R.pdf'}, {l:'🌐 Página SEUP', f:'https://seup.org/algoritmo-lactante-febril/'}],
  steps:[
    {text:'TEP: si está inestable → ABCDE, O₂, acceso venoso, bolos de cristaloide 10-20 ml/kg, pruebas, antibiótico empírico (± aciclovir) e ingreso'},
    {text:'Estable: decidir por edad → ≤21 días, 22-60 días o 2-24 meses'},
    {text:'≤21 días: tira de orina y urocultivo por sondaje, HRF, PCR, PCT, hemocultivo, rt-PCR de enterovirus, PL e ingreso con antibiótico empírico'},
    {text:'22-60 días (secuencial): leucocituria/nitrituria → T.ª y gripe → PCT ≥0,5 ng/ml → PCR >20 mg/L o neutrófilos >10.000 → observación ≥12 h si bajo riesgo'},
    {text:'2-24 meses: edad (&lt;6 / ≥6 meses), T.ª, vacunación antineumocócica, epidemia gripal → descartar ITU y, si procede, analítica (PCT, leucocitos, neutrófilos)'},
    {text:'Sin leucocituria con PCT ≥0,5 ng/ml, &gt;15.000 leucocitos o &gt;10.000 neutrófilos: ceftriaxona 50 mg/kg (máx. 2 g) y control en 24 h'},
    {text:'Aciclovir 20 mg/kg/8 h en cualquier edad si convulsiones, vesículas mucocutáneas o signos de encefalitis'},
    {type:'info', text:'Descartar ITU: tira de orina por bolsa perineal; si leucocituria/nitrituria, confirmar por sondaje uretral; si se confirma, urocultivo por sondaje'}
  ],
  flow:(() => {
    const hay = x => typeof x === 'number' && !isNaN(x) && x > 0;
    const f = (x, dec) => (Math.round(x * Math.pow(10, dec)) / Math.pow(10, dec)).toString().replace('.', ',');
    /* d(v, dosisPorKg, máximo|null, decimales, unidad): dosis con el peso real y su máximo. */
    const d = (v, k, max, dec, u) => hay(v.peso) ? ' <b>= ' + f(Math.min(v.peso * k, max == null ? Infinity : max), dec) + ' ' + u + '</b>' + (max != null && v.peso * k > max ? ' (máximo)' : '') : '';
    const rg = (v, k1, k2, dec, u) => hay(v.peso) ? ' <b>= ' + f(v.peso * k1, dec) + '–' + f(v.peso * k2, dec) + ' ' + u + '</b>' : '';
    const sinPeso = v => hay(v.peso) ? '' : '<br><span class="pe-nota">Introduce el peso real arriba para ver las dosis calculadas.</span>';
    const dias = v => hay(v.dias) ? v.dias : hay(v.meses) ? v.meses * 30.44 : NaN;
    const meses = v => hay(v.meses) ? v.meses : hay(v.dias) ? v.dias / 30.44 : NaN;
    const ACICLOVIR = v => '<b>Aciclovir 20 mg/kg/8 h</b>' + d(v, 20, null, 0, 'mg') + ' en cualquier paciente si ha presentado convulsiones, vesículas mucocutáneas o cualquier otro signo de encefalitis.';
    const DESCARTAR_ITU = 'Descartar ITU: tira reactiva de orina por bolsa perineal → si leucocituria/nitrituria, confirmación por sondaje uretral → si se confirma, urocultivo por sondaje.';
    const CEFIXIMA = v => 'Con leucocituria, el antibiótico depende de las resistencias locales; pauta adecuada habitual: <b>cefixima 8 mg/kg/24 h</b>' + d(v, 8, 400, 0, 'mg') + ' (máx. 400 mg) durante 7-10 días.';
    /* Tabla del apartado 7 (≤21 días). */
    const ATB7 = v => '<b>Sin pleocitosis:</b> ampicilina 50 mg/kg/8 h' + d(v, 50, null, 0, 'mg') + ' + gentamicina 4 mg/kg/24 h' + d(v, 4, null, 1, 'mg') + '. Sustituir la gentamicina por cefotaxima 50 mg/kg' + d(v, 50, null, 0, 'mg') + ' (cada 8 h si &gt;7 días; cada 12 h si ≤7 días) si hay alta tasa de bacterias resistentes a gentamicina (sobre todo E. coli).<br>' +
      '<b>Con pleocitosis:</b> ampicilina 75 mg/kg/6 h si &gt;7 días' + d(v, 75, null, 0, 'mg') + ' o 100 mg/kg/8 h si ≤7 días' + d(v, 100, null, 0, 'mg') + ' + cefotaxima 100 mg/kg/8 h' + d(v, 100, null, 0, 'mg') + ' (o ceftazidima 50 mg/kg/8 h' + d(v, 50, null, 0, 'mg') + ') + aciclovir 20 mg/kg/8 h' + d(v, 20, null, 0, 'mg') + '.';
    /* Tabla del apartado 12 (22-60 días con pruebas alteradas). */
    const ATB12 = v => '<b>Sin pleocitosis:</b> ceftriaxona 50 mg/kg/24 h' + d(v, 50, null, 0, 'mg') + '. Considerar asociar ampicilina 50 mg/kg/6 h' + d(v, 50, null, 0, 'mg') + ' si alta prevalencia de bacteriemia por Listeria o enterococo.<br>' +
      '<b>Con pleocitosis:</b> cefotaxima 75 mg/kg' + d(v, 75, null, 0, 'mg') + ' y después 50 mg/kg/6 h' + d(v, 50, null, 0, 'mg') + ' + vancomicina 15 mg/kg/6 h' + d(v, 15, null, 0, 'mg') + '. Considerar asociar ampicilina 75 mg/kg/6 h' + d(v, 75, null, 0, 'mg') + ' si alta prevalencia de meningitis por Listeria o enterococo.';
    const NOTA_TABLA = '<br><span class="pe-nota">La Figura 14-1 remite a la «tabla del apartado nº 7» (pauta de ≤21 días) también en 22-60 días; el algoritmo general asigna a 22-60 días con pruebas alteradas la pauta del apartado 12 (arriba). Confirmar con el protocolo local.</span>';
    return {
      inputs: [
        { k: 'peso', l: 'Peso real', u: 'kg' },
        { k: 'meses', l: 'Edad', u: 'meses' },
        { k: 'dias', l: 'Edad si ≤3 meses', u: 'días' },
        { k: 'temp', l: 'T.ª máx.', u: '°C' },
        { k: 'pct', l: 'PCT', u: 'ng/ml' },
        { k: 'pcr', l: 'PCR', u: 'mg/L' },
        { k: 'leuco', l: 'Leucocitos', u: '/µl' },
        { k: 'neutro', l: 'Neutrófilos', u: '/µl' }
      ],
      start: 'inicio',
      escalas: [{ id: 'tep-ped', para: 'estable o inestable (TEP)' }],
      nodes: {
        inicio: {
          t: 'Fiebre sin focalidad en lactante de 0-24 meses previamente sano',
          escalas: ['tep-ped'],
          show: v => 'Primero, el <b>Triángulo de Evaluación Pediátrica</b> (apariencia, respiración, circulación a la piel).' + sinPeso(v),
          q: '¿Está estable o inestable?',
          opts: [{ l: 'Inestable (TEP alterado)', go: 'inestable' }, { l: 'Estable (TEP normal)', go: 'edad' }]
        },
        inestable: {
          t: 'Paciente inestable', c: 'high',
          farmacos: ['Cloruro sódico 0,9%'],
          show: v => '<b>A</b>: O₂ suplementario al 100 %; SatO₂ y, si se dispone, CO₂ espirado. <b>B</b>: puede precisar instrumentalizar la vía aérea; FR. ' +
            '<b>C</b>: vía periférica (idealmente dos) o intraósea; FC y PA; <b>bolos de cristaloide 10-20 ml/kg</b>' + rg(v, 10, 20, 0, 'ml') + ' lo antes posible. ' +
            '<b>D</b>: glucemia capilar, pupilas, alerta. <b>E</b>: temperatura, evitar la hipotermia.<br>' +
            '<b>Pruebas</b> (sin retrasar el antibiótico): tira reactiva de orina y urocultivo por sondaje, HRF, PCR, PCT, hemocultivo; rt-PCR de enterovirus (≤60 días) o de S. pneumoniae y N. meningitidis (&gt;60 días). Considerar protocolo de sepsis; posponer la PL si sigue inestable tras estabilizar.<br>' +
            '<b>Antibiótico empírico</b>:<br>• &lt;1 mes: <b>ampicilina 75 mg/kg</b>' + d(v, 75, null, 0, 'mg') + ' + <b>cefotaxima 50 mg/kg</b>' + d(v, 50, null, 0, 'mg') + '; valorar aciclovir 20 mg/kg' + d(v, 20, null, 0, 'mg') + ' si sospecha de VHS.<br>' +
            '• 1-3 meses (Figura 14-1): <b>cefotaxima 75 mg/kg</b>' + d(v, 75, null, 0, 'mg') + '.<br>' +
            '• &gt;1 mes (nota 2) y 2-24 meses (Figura 14-2): <b>cefotaxima 75 mg/kg</b>' + d(v, 75, 2000, 0, 'mg') + ' (máx. 2 g). Alergia a betalactámicos: aztreonam 30 mg/kg' + d(v, 30, 2000, 0, 'mg') + ' (máx. 2 g). Asociar vancomicina 15 mg/kg' + d(v, 15, 1000, 0, 'mg') + ' (máx. 1 g) si alta prevalencia de SARM o neumococo resistente a cefalosporinas; clindamicina 10 mg/kg' + d(v, 10, 650, 0, 'mg') + ' (máx. 650 mg) si sospecha de shock tóxico estreptocócico.<br>' +
            ACICLOVIR(v) + '<br><b>Destino: ingreso.</b>' + sinPeso(v)
        },
        edad: {
          q: '¿Qué edad tiene?',
          help: v => hay(dias(v)) ? 'Con los datos: ' + (dias(v) <= 92 ? f(dias(v), 0) + ' días' : f(meses(v), 1) + ' meses') + '.' : 'Pon la edad arriba (en días si tiene ≤3 meses) para que se sugiera la opción.',
          opts: [
            { l: '≤21 días', go: 'd21', sug: v => hay(dias(v)) && dias(v) <= 21 },
            { l: '22-60 días', go: 'orina', sug: v => hay(dias(v)) && dias(v) > 21 && dias(v) <= 60 },
            { l: '&gt;60 días (2-24 meses)', go: 'm2', sug: v => hay(dias(v)) && dias(v) > 60 && meses(v) <= 24 }
          ]
        },
        d21: {
          t: '≤21 días', c: 'high',
          show: v => '• Tira reactiva de orina y urocultivo por sondaje.<br>• HRF, PCR, PCT, hemocultivo y rt-PCR de enterovirus en sangre.<br>• <b>Punción lumbar</b> (LCR: examen y cultivo).<br>' +
            '<b>Ingreso con antibiótico empírico</b> (apartado 7):<br>' + ATB7(v) + '<br>' + ACICLOVIR(v) + '<br><b>Destino: ingreso.</b>' + sinPeso(v)
        },
        orina: {
          q: '¿Leucocituria o nitrituria?',
          help: 'Despistaje inicial por bolsa perineal; confirmación por sondaje uretral.',
          opts: [{ l: 'Sí', go: 'itu60' }, { l: 'No', go: 'temp' }]
        },
        itu60: {
          t: '22-60 días con leucocituria/nitrituria', c: 'mid',
          show: v => '• Urocultivo por sondaje uretral.<br>• HRF, PCR, PCT, hemocultivo y rt-PCR de enterovirus en sangre.<br>' +
            'Pruebas alteradas → <b>antibiótico</b> (apartado 12):<br>' + ATB12(v) + '<br>' +
            '<b>Destino: individualizar ingreso hospitalario o Unidad de Observación de Urgencias</b> según edad y parámetros analíticos.' + sinPeso(v)
        },
        temp: {
          q: '¿T.ª &lt;39 °C?',
          help: v => hay(v.temp) ? 'Con los datos: T.ª ' + f(v.temp, 1) + ' °C.' : '',
          opts: [{ l: 'Sí, &lt;39 °C', go: 'gripe', sug: v => hay(v.temp) && v.temp < 39 }, { l: 'No, ≥39 °C', go: 'pct', sug: v => hay(v.temp) && v.temp >= 39 }]
        },
        gripe: {
          q: '¿rt-PCR de influenza positiva o vacunación en las 24 horas previas?',
          opts: [{ l: 'Sí', go: 'altagripe' }, { l: 'No', go: 'pct' }]
        },
        altagripe: {
          t: 'Fiebre explicada (gripe o vacuna reciente)', c: 'low',
          show: '<b>Destino: alta.</b> Control por su pediatra en 24 horas.'
        },
        pct: {
          q: '¿Procalcitonina?',
          help: v => hay(v.pct) ? 'Con los datos: PCT ' + f(v.pct, 2) + ' ng/ml.' : 'Introduce la PCT arriba para que se sugiera la opción.',
          opts: [{ l: '≥0,5 ng/ml', go: 'pctalta', sug: v => hay(v.pct) && v.pct >= 0.5 }, { l: '&lt;0,5 ng/ml', go: 'pcrn', sug: v => hay(v.pct) && v.pct < 0.5 }]
        },
        pctalta: {
          t: 'PCT ≥0,5 ng/ml', c: 'high',
          show: v => '• Urocultivo por sondaje.<br>• <b>Considerar punción lumbar.</b><br>• <b>Antibiótico empírico</b> (apartado 12):<br>' + ATB12(v) + NOTA_TABLA + '<br>' + ACICLOVIR(v) + '<br><b>Destino: ingreso.</b>' + sinPeso(v)
        },
        pcrn: {
          q: '¿PCR y recuento de neutrófilos en sangre?',
          help: v => (hay(v.pcr) || hay(v.neutro)) ? 'Con los datos: ' + [hay(v.pcr) ? 'PCR ' + f(v.pcr, 1) + ' mg/L' : '', hay(v.neutro) ? 'neutrófilos ' + f(v.neutro, 0) + '/µl' : ''].filter(Boolean).join(' · ') + '.' : 'Introduce la PCR y los neutrófilos arriba para que se sugiera la opción.',
          opts: [
            { l: 'PCR &gt;20 mg/L o neutrófilos &gt;10.000/µl', go: 'pcralta', sug: v => (hay(v.pcr) && v.pcr > 20) || (hay(v.neutro) && v.neutro > 10000) },
            { l: 'PCR ≤20 mg/L y neutrófilos ≤10.000/µl', go: 'obs', sug: v => hay(v.pcr) && hay(v.neutro) && v.pcr <= 20 && v.neutro <= 10000 }
          ]
        },
        pcralta: {
          t: 'PCR &gt;20 mg/L o neutrófilos &gt;10.000/µl', c: 'mid',
          farmacos: ['Ceftriaxona'],
          show: v => '• Urocultivo por sondaje.<br>• <b>Ceftriaxona 50 mg/kg IV</b>' + d(v, 50, null, 0, 'mg') + '.<br>' +
            '<b>Destino: ingreso o Unidad de Observación de Urgencias</b> (pruebas alteradas, algoritmo general).' +
            '<br><span class="pe-nota">La Figura 14-1 no indica el destino en esta rama; se toma del algoritmo general (pruebas alteradas → antibiótico + ingreso/Unidad de Observación).</span>' + sinPeso(v)
        },
        obs: {
          t: 'Bajo riesgo: observación', c: 'low',
          show: 'Observación en el Servicio de Urgencias (<b>al menos 12 horas si la fiebre tenía &lt;2 horas</b> de evolución a su llegada).',
          q: '¿Mantiene buen estado general y no hay datos clínicos de alarma?',
          opts: [{ l: 'Sí', go: 'altaobs' }, { l: 'No', go: 'reval' }]
        },
        altaobs: {
          t: 'Alta tras observación', c: 'low',
          show: '<b>Destino: alta sin antibiótico</b> si no hay incidencias. Control por su pediatra en 24 horas.'
        },
        reval: {
          t: 'Empeora en observación', c: 'high',
          show: v => '• Control analítico.<br>• <b>Considerar punción lumbar, antibiótico e ingreso.</b><br>' + ATB12(v) + NOTA_TABLA + sinPeso(v)
        },
        m2: {
          q: '¿Edad (2-24 meses)?',
          help: v => hay(meses(v)) ? 'Con los datos: ' + f(meses(v), 1) + ' meses.' : '',
          opts: [{ l: '&lt;6 meses', go: 'lt6', sug: v => hay(meses(v)) && meses(v) < 6 }, { l: '≥6 meses', go: 'ge6', sug: v => hay(meses(v)) && meses(v) >= 6 }]
        },
        lt6: {
          q: '¿Temperatura?',
          help: v => hay(v.temp) ? 'Con los datos: T.ª ' + f(v.temp, 1) + ' °C.' : '',
          opts: [{ l: 'T.ª &lt;39 °C', go: 'itusimple', sug: v => hay(v.temp) && v.temp < 39 }, { l: 'T.ª ≥39 °C', go: 'epi', sug: v => hay(v.temp) && v.temp >= 39 }]
        },
        itusimple: {
          t: '&lt;6 meses con T.ª &lt;39 °C', c: 'low',
          show: v => '• ' + DESCARTAR_ITU + '<br>• Si ITU: manejo según el algoritmo correspondiente. ' + CEFIXIMA(v) + '<br><b>Destino: si no hay ITU, alta.</b>' + sinPeso(v)
        },
        ge6: {
          q: '¿Temperatura?',
          help: v => (hay(v.temp) ? 'Con los datos: T.ª ' + f(v.temp, 1) + ' °C. ' : '') + '<span class="pe-nota">El PDF da los tramos &gt;40,5 °C y 39,5-40,4 °C; 40,5 °C exacto no está asignado.</span>',
          opts: [
            { l: 'T.ª &gt;40,5 °C', go: 'epi', sug: v => hay(v.temp) && v.temp > 40.5 },
            { l: 'T.ª 39,5-40,4 °C', go: 'vcn', sug: v => hay(v.temp) && v.temp >= 39.5 && v.temp < 40.5 },
            { l: 'T.ª &lt;39,5 °C', go: 'itu39', sug: v => hay(v.temp) && v.temp < 39.5 }
          ]
        },
        vcn: {
          q: '¿Vacunado frente a neumococo (VCN)?',
          help: 'Se considera vacunado si ha recibido al menos dos dosis, la última al menos 15 días antes de la consulta.',
          opts: [{ l: 'Sí, vacunado', go: 'itu39' }, { l: 'No vacunado', go: 'epi' }]
        },
        itu39: {
          t: '≥6 meses de bajo riesgo', c: 'low',
          show: v => '• Descartar ITU si T.ª &gt;39 °C en todas las niñas y en los varones &lt;12 meses. ' + DESCARTAR_ITU + '<br>• Si ITU: manejo según el algoritmo correspondiente. ' + CEFIXIMA(v) + '<br><b>Destino: si no hay ITU, alta.</b>' + sinPeso(v)
        },
        epi: {
          q: '¿Hay epidemia gripal?',
          opts: [{ l: 'Sí', go: 'flu' }, { l: 'No', go: 'anal' }]
        },
        flu: {
          q: 'rt-PCR de influenza',
          opts: [{ l: 'Positiva (+)', go: 'flupos' }, { l: 'Negativa (−)', go: 'anal' }]
        },
        flupos: {
          t: 'Gripe confirmada', c: 'low',
          show: v => '• ' + DESCARTAR_ITU + '<br>• Si ITU: manejo según el algoritmo correspondiente. ' + CEFIXIMA(v) + '<br><b>Destino: si no hay ITU, alta con seguimiento por su pediatra.</b>' + sinPeso(v)
        },
        anal: {
          t: 'Descartar ITU y considerar analítica', c: 'mid',
          show: '• Descartar ITU en todas las niñas y en los varones &lt;12 meses. ' + DESCARTAR_ITU + '<br>• Si ITU: manejo según el algoritmo correspondiente.<br>' +
            '• Considerar analítica sanguínea: hemograma y PCT; hemocultivo y rt-PCR de S. pneumoniae y N. meningitidis.',
          q: 'Con tira de orina normal, ¿alguno de estos criterios: PCT ≥0,5 ng/ml, &gt;15.000 leucocitos/µl o &gt;10.000 neutrófilos/µl?',
          help: v => { const r = []; if (hay(v.pct)) r.push('PCT ' + f(v.pct, 2)); if (hay(v.leuco)) r.push('leucocitos ' + f(v.leuco, 0)); if (hay(v.neutro)) r.push('neutrófilos ' + f(v.neutro, 0)); return r.length ? 'Con los datos: ' + r.join(' · ') + '.' : 'Introduce PCT, leucocitos y neutrófilos arriba para que se sugiera la opción.'; },
          opts: [
            { l: 'Sí, alguno', go: 'ceftri', sug: v => (hay(v.pct) && v.pct >= 0.5) || (hay(v.leuco) && v.leuco > 15000) || (hay(v.neutro) && v.neutro > 10000) },
            { l: 'No, ninguno', go: 'altam', sug: v => hay(v.pct) && hay(v.leuco) && hay(v.neutro) && v.pct < 0.5 && v.leuco <= 15000 && v.neutro <= 10000 },
            { l: 'Tira de orina alterada (ITU)', go: 'itum' }
          ]
        },
        ceftri: {
          t: 'Elevación de reactantes sin leucocituria', c: 'mid',
          farmacos: ['Ceftriaxona'],
          show: v => '• <b>Ceftriaxona IM 50 mg/kg</b>' + d(v, 50, 2000, 0, 'mg') + ' (máx. 2 g).<br>• Rx de tórax si &gt;20.000 leucocitos o &gt;10.000 neutrófilos.<br>' +
            '<b>Destino: alta</b>; si la PCT está elevada, considerar observación en Urgencias. Control por su pediatra en 24 horas, con pautas de vigilancia y de cuándo volver a consultar.' + sinPeso(v)
        },
        altam: {
          t: 'Sin criterios analíticos', c: 'low',
          show: '<b>Destino: alta.</b>'
        },
        itum: {
          t: 'ITU', c: 'mid',
          show: v => 'Manejo según el algoritmo de ITU correspondiente. ' + CEFIXIMA(v) + sinPeso(v)
        }
      }
    };
  })()
});

/* ---------- seup-bronquiolitis ---------- */
window.PROTOCOLS.push({ id:'seup-bronquiolitis', ped:true, title:'Bronquiolitis aguda (SEUP)', sub:'TEP, score clínico (Tal modificada), oxigenoterapia, OAF y destino', badge:'amber', tag:'Pediatría', rank:2,
  src:'SEUP · Algoritmo 5: Bronquiolitis aguda · PDF «5_Bronquiolitis_may2024» (mayo 2024; página publicada el 03/05/2024; el PDF no indica autores) · https://seup.org/algoritmo-bronquiolitis/',
  docs:[{l:'📄 Algoritmo SEUP completo (PDF)', f:'https://seup.org/wp-content/uploads/2024/04/5_Bronquiolitis_may2024.pdf'}, {l:'🌐 Página SEUP', f:'https://seup.org/algoritmo-bronquiolitis/'}],
  steps:[
    {text:'Primer episodio de infección respiratoria inferior vírica en menores de 2 años. Impresión inicial con el TEP: estable, dificultad respiratoria o fallo respiratorio.'},
    {text:'Estable: FR, SpO₂ y score clínico (Tal modificada); valorar lavado/aspirado nasal y factores de riesgo (FFR).'},
    {text:'Leve (SpO₂ >94 %, score <5, sin FFR): alta con medidas generales.'},
    {text:'Inestable: ABCDE con SpO₂ (y CO₂ espirado si fallo respiratorio), cabecera elevada, lavado/aspirado nasal; O₂ si SpO₂ <92 % o mascarilla con reservorio a 15 l/min si fallo respiratorio. Reevaluar.'},
    {text:'Moderada (SpO₂ 92–94 %, score 6–8): alta con control en 24 h si no hay FFR ni criterios de observación; si los hay, observación hospitalaria.'},
    {text:'Grave (mal estado general, SpO₂ <92 % o score >8): O₂ con reservorio 15 l/min; si FR >70, cianosis, consciencia alterada o quejido, valorar adrenalina nebulizada 0,5 mg/kg (máx. 3 mg) y OAF.'},
    {text:'Si no mejora: OAF y, si no es eficaz, CPAP o doble nivel de presión; no demorarlos en la insuficiencia respiratoria grave. UCI si no mejora o hay apneas recurrentes.'},
    {type:'info', text:'Evitar broncodilatadores de rutina; el suero salino hipertónico no aporta beneficio. La aspiración de secreciones es la medida general más eficaz.'}
  ],
  flow:(() => {
    const W = v => v.peso > 0 ? v.peso : NaN;
    const f = (x, dec) => (Math.round(x * Math.pow(10, dec)) / Math.pow(10, dec)).toString().replace('.', ',');
    /* d(v, porKg, max, decimales, unidad): dosis con el peso real, o nada si no hay peso. */
    const d = (v, k, max, dec, u) => { const w = W(v); if (!w) return ''; const x = w * k; return ' <b>= ' + f(Math.min(x, max == null ? Infinity : max), dec) + ' ' + u + '</b>' + (max != null && x > max ? ' (máximo)' : ''); };
    const r = (v, k1, k2, dec, u) => { const w = W(v); return w ? ' <b>= ' + f(w * k1, dec) + '–' + f(w * k2, dec) + ' ' + u + '</b>' : ''; };
    const sinPeso = v => W(v) ? '' : '<br><span class="pe-nota">Introduce el peso real arriba para ver las dosis calculadas.</span>';
    const F = n => ({ n: n, inf: false });
    const TAL = '<b>Escala de Tal modificada</b> (0–3 por ítem): <b>FR</b> &lt;6 m: ≤40 / 41–55 / 56–70 / ≥70 · ≥6 m: ≤30 / 31–45 / 46–60 / ≥60 rpm · ' +
      '<b>Sibilancias/crepitantes</b>: no / solo espiratorias / insp. y esp. audibles con fonendo / audibles sin fonendo · ' +
      '<b>Retracciones</b>: no / leves (subcostal, intercostal) / moderadas (intercostales) / intensas (intercostales y supraesternal, cabeceo) · ' +
      '<b>SatO₂</b>: ≥95 / 92–94 / 90–91 / ≤89 %.<br>Leve &lt;5 · moderada 6–8 · grave &gt;8. También valen Wood-Downes modificado, RDAI o BROSJOD (no están en la app).';
    const FFR = '<b>Factores de riesgo (FFR)</b>: prematuridad &lt;35 semanas, edad &lt;6 semanas, displasia broncopulmonar, fibrosis quística, cardiopatía congénita con repercusión hemodinámica significativa, inmunodeficiencia; también enfermedad neuromuscular, parálisis cerebral y ciertas malformaciones congénitas.';
    const OBS = '<b>Criterios de observación hospitalaria</b>: uno o más FFR (cardiopatía con repercusión hemodinámica, DBP, FQ, inmunodeficiencia, prematuridad &lt;35 s) · edad &lt;6 semanas, sea cual sea el distrés · apnea referida o presenciada · ingesta inadecuada o atragantamientos frecuentes · necesidad de O₂ para SatO₂ &gt;92 % · score moderado/grave tras aspirar secreciones y terapias adicionales · entorno social desfavorable (domicilio lejano, padres poco entrenados).';
    const MEDGEN = '<b>Medidas generales en domicilio</b>: aspirar secreciones si hay dificultad respiratoria (sobre todo antes de las tomas, del sueño y de la medicación inhalada; enseñar la técnica a la familia) · tomas fraccionadas · cabecera de la cuna a 30° · evitar el tabaquismo pasivo · antitérmico si fiebre. Fisioterapia y humedad ambiental: ineficaces.';
    const ASP = 'Lavado/aspirado nasal: instilar unas gotas de suero salino en cada fosa y aspirar suavemente (sonda fina o pera).';
    const ADR = v => '<b>Adrenalina nebulizada 0,5 mg/kg</b>' + d(v, 0.5, 3, 1, 'mg') + ' (máx. 3 mg)';
    return {
      inputs: [{ k: 'peso', l: 'Peso real', u: 'kg' }],
      start: 'inicio',
      escalas: [{ id: 'tep-ped', para: 'impresión inicial (TEP)' }, { id: 'tal-mod', para: 'gravedad (Tal modificada, cortes SEUP)' }],
      nodes: {
        inicio: {
          t: 'Bronquiolitis aguda',
          escalas: ['tep-ped'],
          show: 'Primer episodio de infección respiratoria inferior en <b>menores de 2 años</b>, de origen vírico, con síntomas catarrales y dificultad respiratoria variable; estertores, subcrepitantes y/o sibilancias.<br>' +
            'El TEP suele estar alterado solo por el lado respiratorio; si se afecta la apariencia (fallo respiratorio) o la circulación, es más grave.',
          q: '¿Cómo está el TEP?',
          opts: [
            { l: 'Estable', go: 'estable' },
            { l: 'Inestable: dificultad respiratoria (tiraje ± ruidos respiratorios ± taquipnea)', go: 'dr' },
            { l: 'Inestable: fallo respiratorio (DR ± somnolencia ± decaimiento ± irritabilidad)', go: 'fallo' }
          ]
        },
        estable: {
          t: 'Estable: FR, SpO₂ y score clínico', escalas: ['tal-mod'],
          show: TAL + '<br>' + ASP + '<br>Anamnesis y valoración de FFR para observación hospitalaria.<br>' + FFR,
          q: '¿Cumple criterios de bronquiolitis leve (SpO₂ &gt;94 %, score &lt;5 y sin FFR)?',
          help: 'El algoritmo de la SEUP solo dibuja la bronquiolitis leve en la rama estable. Si no la cumple, sigue la rama de reevaluación.',
          opts: [
            { l: 'Sí: bronquiolitis leve', go: 'leve' },
            { l: 'No (SpO₂ ≤94 %, score ≥5 o FFR): valorar como dificultad respiratoria', go: 'reev' }
          ]
        },
        leve: {
          t: 'Bronquiolitis leve', c: 'low',
          show: 'Tratamiento con medidas generales.<br>' + MEDGEN + '<br><b>Destino: alta a domicilio</b> con medidas generales.'
        },
        dr: {
          t: 'Dificultad respiratoria', c: 'mid',
          show: 'ABCDE con SpO₂ · elevar la cabecera de la camilla · lavado/aspirado nasal · <b>oxigenoterapia si SpO₂ &lt;92 %</b>.<br>' +
            'O₂ humidificado y caliente (gafas nasales o mascarilla) si la SatO₂ se mantiene &lt;90–92 %, o si SatO₂ &lt;92 % y score ≥3 tras aspirar secreciones. Monitorización continua de SpO₂ solo si recibe O₂.',
          q: 'Reevaluación: ¿cómo está?',
          opts: [{ l: 'Dificultad respiratoria', go: 'reev' }, { l: 'Fallo respiratorio', go: 'grave' }]
        },
        fallo: {
          t: 'Fallo respiratorio', c: 'high',
          show: 'ABCDE con SpO₂ y <b>CO₂ espirado</b> · elevar la cabecera de la camilla · lavado/aspirado nasal · <b>oxígeno con mascarilla y reservorio (15 l/min)</b>.',
          q: 'Reevaluación: ¿cómo está?',
          opts: [{ l: 'Dificultad respiratoria', go: 'reev' }, { l: 'Fallo respiratorio', go: 'grave' }]
        },
        reev: {
          t: 'Reevaluación: FR, SpO₂ y score clínico',
          show: TAL,
          q: '¿Qué gravedad tiene?',
          opts: [
            { l: 'Moderada (SpO₂ 92–94 %, score 6–8)', go: 'moderada' },
            { l: 'Grave (mal estado general, SpO₂ &lt;92 % o score &gt;8)', go: 'grave' }
          ]
        },
        moderada: {
          t: 'Bronquiolitis moderada', c: 'mid',
          show: 'ABCDE. SpO₂ 92–94 %, score clínico 6–8.<br>' + OBS,
          q: '¿Tiene FFR o algún criterio de observación hospitalaria?',
          opts: [{ l: 'No', go: 'altaMod' }, { l: 'Sí', go: 'obs' }]
        },
        altaMod: {
          t: 'Alta con medidas generales', c: 'low',
          show: MEDGEN + '<br><b>Destino: alta a domicilio con control clínico en 24 h.</b>'
        },
        grave: {
          farmacos: [F('Adrenalina')],
          t: 'Bronquiolitis grave', c: 'high',
          show: v => 'ABCDE. Mal estado general, SpO₂ &lt;92 % o score clínico &gt;8.<br>' +
            '• <b>Oxígeno con mascarilla y reservorio (15 l/min)</b>.<br>' +
            '• Si <b>FR &gt;70 rpm, cianosis, consciencia alterada o quejido</b>, valorar:<br>' +
            '&nbsp;&nbsp;– ' + ADR(v) + ', con SSF y flujo de O₂ de 6–8 l/min.<br>' +
            '&nbsp;&nbsp;– <b>Oxígeno en alto flujo (OAF)</b>: inicio <b>2 l/kg</b>' + d(v, 2, null, 0, 'l/min') + ' y FiO₂ 50–60 %.<br>' +
            '• Maniobras de RCP si precisa.<br>' +
            'Si no mejora, considerar OAF en casos seleccionados; si no es eficaz, escalar a <b>CPAP o doble nivel de presión</b>. En la insuficiencia respiratoria grave, no demorar la CPAP o el doble nivel.' + sinPeso(v) +
            '<br><span class="pe-nota">La nota 9 del mismo PDF da para la adrenalina de rescate 1–3 mg nebulizados; el flujograma, 0,5 mg/kg (máx. 3 mg). El PDF escribe «2 litros/kg» para el OAF; se calcula como l/min.</span>',
          q: '¿Cómo evoluciona?',
          help: '<b>UCI</b> si insuficiencia respiratoria grave que no mejora con el tratamiento o vuelve a empeorar en &lt;1 h, o apneas recurrentes con desaturación.',
          opts: [
            { l: 'Estable o mejora', go: 'obs' },
            { l: 'No mejora, empeora en &lt;1 h o apneas recurrentes', go: 'uci' }
          ]
        },
        obs: {
          farmacos: [F('Adrenalina'), 'Salbutamol'],
          t: 'Observación hospitalaria', c: 'mid',
          show: v => '<b>Medidas de soporte</b>: cabecera a 30° · aspiración nasal (sobre todo antes de las tomas y de las inhalaciones) · tomas fraccionadas; si mala tolerancia oral o distrés importante, <b>SNG 4–6 ml/kg/h</b>' + r(v, 4, 6, 0, 'ml/h') + ' o perfusión IV al 80 % del mantenimiento si no hay deshidratación · monitor de apneas si &lt;6 semanas o apneas previas · O₂ humidificado y caliente si distrés importante o SatO₂ &lt;92 %.<br>' +
            '<b>Valorar O₂ y adrenalina nebulizada de rescate</b> si empeora y respondió antes: 1–3 mg con SSF y O₂ a 6–8 l/min. Adrenalina o β2 solo si se ha documentado respuesta, y a demanda.<br>' +
            '<b>Salbutamol</b> solo en &gt;12 meses con antecedentes personales o familiares de atopia o asma, fuera de la epidemia de VRS (noviembre–febrero): MDI 5 pulsaciones con cámara, o nebulizado 2,5 mg con O₂ a 6–8 l/min si distrés grave. Las nebulizaciones, con SSF; el salino hipertónico no aporta beneficio.<br>' +
            '<b>Valorar OAF</b> (score grave tras optimizar las medidas, o score moderado con SatO₂ &lt;90 % tras fracasar las medidas habituales): flujo &gt;2 l/min en lactantes y &gt;6 l/min en niños.<br>' +
            '<b>Aislamiento</b>: lavado de manos antes y después del contacto, bata y guantes; la enfermera no debe llevar a la vez pacientes de riesgo.' + sinPeso(v),
          q: '¿Mejora?',
          help: 'Si no mejora o tiene FFR asociados, considerar ingreso en UCI.',
          opts: [{ l: 'Sí', go: 'planta' }, { l: 'No mejora o FFR asociados', go: 'uci' }]
        },
        planta: {
          t: 'Sigue en observación hospitalaria', c: 'low',
          show: 'Mantener las medidas de soporte y reevaluar con FR, SpO₂ y score. <b>Destino: observación o ingreso hospitalario.</b><br><span class="pe-nota">El algoritmo SEUP no detalla los criterios de alta desde la observación: según protocolo local.</span>'
        },
        uci: {
          t: 'Ingreso en UCI', c: 'high',
          show: '<b>Criterios</b>: insuficiencia respiratoria grave que no mejora con tratamiento o vuelve a empeorar en &lt;1 h · apneas recurrentes con desaturación.<br>' +
            'Ventilación no invasiva (<b>CPAP o BiPAP</b>) como alternativa o paso previo a la ventilación invasiva. Los más graves pueden precisar ventilación mecánica; en los refractarios, surfactante exógeno o ECMO.<br><b>Destino: UCI pediátrica.</b>'
        }
      }
    };
  })()
});

/* ---------- seup-asma ---------- */
window.PROTOCOLS.push({ id:'seup-asma', ped:true, title:'Crisis asmática pediátrica (SEUP)', sub:'TEP, Pulmonary Score, salbutamol, ipratropio, corticoide, magnesio y destino', badge:'amber', tag:'Pediatría', rank:3,
  src:'SEUP · Algoritmo 7: Crisis asmática · PDF «7_Crisis-asma_may2024» (mayo 2024; página publicada el 30/04/2024; el PDF no indica autores) · https://seup.org/algoritmo-crisis-asmatica/',
  docs:[{l:'📄 Algoritmo SEUP completo (PDF)', f:'https://seup.org/wp-content/uploads/2024/04/7_Crisis-asma_may2024.pdf'}, {l:'🌐 Página SEUP', f:'https://seup.org/algoritmo-crisis-asmatica/'}],
  steps:[
    {text:'TEP: estable/dificultad respiratoria o fallo respiratorio (respiración + apariencia y/o circulación anormal).'},
    {text:'Estable: triaje (FR, SatO₂, nivel de gravedad), revalorar TEP y ABCDE, historia y exploración; gravedad con el Pulmonary Score.'},
    {text:'Leve: salbutamol MDI (peso/3 pulsaciones, mín. 5, máx. 10) y valorar corticoide oral → alta.'},
    {text:'Moderada-grave: O₂ (SatO₂ ≥92 %), salbutamol + bromuro de ipratropio MDI y corticoide oral → ¿criterios de alta?'},
    {text:'Fallo respiratorio: estabilización con capnografía, O₂ 100 % (valorar OAF), vía IV, salbutamol + ipratropio nebulizados, corticoide IV, sulfato de magnesio IV, valorar Rx de tórax.'},
    {text:'Si mejora → tratamiento de moderada-grave; si no → UCIP.'},
    {text:'Sin criterios de alta: observación/ingreso (O₂ ± OAF, salbutamol a demanda, completar corticoide, valorar Rx).'},
    {text:'Alta: salbutamol MDI a demanda, completar corticoide, valorar corticoide inhalado, información oral y escrita, control en 24–48 h.'},
    {type:'info', text:'Criterios de alta: score de gravedad leve (PS ≤2), SatO₂ ≥92 % sin dificultad respiratoria, familia colaboradora y técnica de inhalación adecuada.'}
  ],
  flow:(() => {
    const W = v => v.peso > 0 ? v.peso : NaN;
    const f = (x, dec) => (Math.round(x * Math.pow(10, dec)) / Math.pow(10, dec)).toString().replace('.', ',');
    /* d(v, porKg, max, decimales, unidad): dosis con el peso real, o nada si no hay peso. */
    const d = (v, k, max, dec, u) => { const w = W(v); if (!w) return ''; const x = w * k; return ' <b>= ' + f(Math.min(x, max == null ? Infinity : max), dec) + ' ' + u + '</b>' + (max != null && x > max ? ' (máximo)' : ''); };
    /* rango por kg con tope opcional */
    const r = (v, k1, k2, max, dec, u) => { const w = W(v); if (!w) return ''; const M = max == null ? Infinity : max; return ' <b>= ' + f(Math.min(w * k1, M), dec) + '–' + f(Math.min(w * k2, M), dec) + ' ' + u + '</b>' + (w * k2 > M ? ' (con tope)' : ''); };
    const sinPeso = v => W(v) ? '' : '<br><span class="pe-nota">Introduce el peso real arriba para ver las dosis calculadas.</span>';
    const F = n => ({ n: n, inf: false });
    /* Salbutamol MDI: peso/3 pulsaciones (mín. 5, máx. 10), 100 µg cada una. */
    const puffs = v => { const w = W(v); if (!w) return ''; const p = Math.min(Math.max(Math.round(w / 3), 5), 10); return ' <b>= ' + p + ' pulsaciones</b>' + (w / 3 < 5 ? ' (mínimo)' : w / 3 > 10 ? ' (máximo)' : ''); };
    /* Salbutamol nebulizado: 0,15 mg/kg (mín. 2,5, máx. 5). */
    const salbNeb = v => { const w = W(v); if (!w) return ''; const x = w * 0.15; return ' <b>= ' + f(Math.min(Math.max(x, 2.5), 5), 2) + ' mg</b>' + (x < 2.5 ? ' (mínimo)' : x > 5 ? ' (máximo)' : ''); };
    const ipraNeb = v => { const w = W(v); return !w ? '' : w < 20 ? ' → <b>250 µg</b>' : w > 20 ? ' → <b>500 µg</b>' : ' → <span class="pe-nota">con 20 kg exactos la SEUP no precisa si 250 o 500 µg</span>'; };
    const PS = '<b>Pulmonary Score</b> (0–3 por ítem, total 0–9): <b>FR</b> &lt;6 años: &lt;30 / 31–45 / 46–60 / &gt;60 · &gt;6 años: &lt;20 / 21–35 / 36–50 / &gt;50 · ' +
      '<b>Sibilancias</b>: no / final de la espiración / toda la espiración / inspiración y espiración sin fonendo · ' +
      '<b>Uso de ECM</b>: no / leve / moderado / máximo. Sin sibilancias y con ECM aumentado: puntuar 3.<br>' +
      'Leve PS 0–3 · moderada PS 4–6 · grave PS 7–9 (el PDF de la SEUP escribe «leve &lt;3» y no asigna el 3; la clasificación publicada del score lo incluye en leve). Calcúlalo con la escala «Pulmonary Score».';
    const SALB = v => '<b>Salbutamol MDI</b> con cámara (mascarilla si &lt;4 años): peso/3 pulsaciones de 100 µg, mín. 5 y máx. 10' + puffs(v) + '. Inicio: 3 dosis en la 1.ª hora (cada 20 min), después a demanda.';
    const SALBNEB = v => '<b>Salbutamol nebulizado</b> (crisis graves) con O₂ a 6–8 l/min: 0,15 mg/kg, mín. 2,5 y máx. 5 mg' + salbNeb(v) + ' (o 2,5 mg si &lt;20 kg y 5 mg si &gt;20 kg).';
    const IPRA = '<b>Bromuro de ipratropio</b> MDI 4 pulsaciones (80 µg), 2–3 dosis junto a las tandas iniciales de salbutamol.';
    const IPRANEB = v => '<b>Bromuro de ipratropio nebulizado</b>: 250 µg si &lt;20 kg, 500 µg si &gt;20 kg' + ipraNeb(v) + ', 2–3 dosis con las tandas iniciales de salbutamol.';
    const CORT_VO = v => '<b>Dexametasona oral 0,6 mg/kg</b>' + d(v, 0.6, 12, 1, 'mg') + ' (máx. 12 mg), repetir la misma dosis a las 24 h; o <b>prednisona/prednisolona</b> 1–2 mg/kg' + r(v, 1, 2, 60, 0, 'mg') + ' y después 1–2 mg/kg/día 3–5 días (1–2 dosis/día, máx. 40–60 mg; sin pauta descendente).';
    const ALTA_CRIT = 'Estabilidad clínica mantenida sin recaídas: <b>PS ≤2 y SatO₂ ≥92 %</b> sin signos de dificultad respiratoria, familia colaboradora y técnica de inhalación adecuada.';
    return {
      inputs: [{ k: 'peso', l: 'Peso real', u: 'kg' }],
      start: 'inicio',
      escalas: [{ id: 'tep-ped', para: 'impresión inicial (TEP)' }, { id: 'pulmonary-score', para: 'gravedad de la crisis (Pulmonary Score)' }],
      nodes: {
        inicio: {
          t: 'Crisis asmática',
          escalas: ['tep-ped'],
          show: 'El TEP suele estar alterado solo por el lado respiratorio (dificultad respiratoria); si se afecta la apariencia (fallo respiratorio) o la circulación (fallo cardiorrespiratorio), es más grave.',
          q: '¿Cómo está el TEP?',
          help: '<b>Signos de alarma de fallo respiratorio</b>: apariencia anormal (irritabilidad o somnolencia, dificultad para hablar), preferencia por la sedestación, taquipnea y retracciones intensas, respiración lenta y dificultosa con hipoventilación grave en la auscultación.',
          opts: [
            { l: 'Estable o dificultad respiratoria', go: 'triaje' },
            { l: 'Fallo respiratorio (respiración + apariencia y/o circulación anormal)', go: 'estab' }
          ]
        },
        triaje: {
          t: 'Triaje y valoración', escalas: ['pulmonary-score'],
          show: 'Motivo de consulta, <b>FR y SatO₂</b>. Nivel de gravedad (PaedCTAS): I fallo cardiorrespiratorio, atención inmediata · II fallo respiratorio, ≤15 min · III dificultad respiratoria, ≤30 min · IV estable con síntomas respiratorios sin dificultad, 1–2 h.<br>' +
            'Revalorar TEP y ABCDE; historia clínica y exploración física.<br>' + PS,
          q: '¿Qué gravedad tiene según la escala clínica?',
          help: 'PS = 3 cuenta como leve (clasificación publicada 0–3; el PDF de la SEUP escribe «&lt;3»). El criterio de alta exige PS ≤2.',
          opts: [
            { l: 'Leve (PS 0–3)', go: 'leve' },
            { l: 'Moderada-grave (PS ≥4)', go: 'modgrave' }
          ]
        },
        leve: {
          farmacos: ['Salbutamol'],
          t: 'Crisis leve', c: 'low',
          show: v => '• ' + SALB(v) + '<br>' +
            '• <b>Valorar corticoide oral</b> si precisa más de 1 tanda de salbutamol y/o tiene factores de riesgo: ' + CORT_VO(v) + sinPeso(v),
          q: 'Siguiente paso',
          opts: [{ l: 'Alta a domicilio', go: 'alta' }]
        },
        modgrave: {
          farmacos: ['Salbutamol', 'Bromuro de ipratropio'],
          t: 'Crisis moderada-grave', c: 'mid',
          show: v => '• <b>Oxigenoterapia</b> humidificada, con el dispositivo más cómodo y la menor concentración que mantenga <b>SatO₂ ≥92 %</b>.<br>' +
            '• ' + SALB(v) + '<br>• ' + IPRA + '<br>' +
            '• Vía nebulizada solo en crisis graves: ' + SALBNEB(v) + ' ' + IPRANEB(v) + '<br>' +
            '• <b>Corticoide oral</b>: ' + CORT_VO(v) + sinPeso(v),
          q: '¿Cumple criterios de alta?',
          help: ALTA_CRIT,
          opts: [{ l: 'Sí', go: 'alta' }, { l: 'No', go: 'obs' }]
        },
        estab: {
          farmacos: ['Salbutamol', 'Bromuro de ipratropio', 'Metilprednisolona', 'Sulfato de magnesio'],
          t: 'Fallo respiratorio: estabilización', c: 'high',
          show: v => 'Monitorización completa con <b>capnógrafo</b>.<br>' +
            '<b>A</b>: apertura de la vía aérea, postura semiincorporada, valorar secuencia rápida de intubación.<br>' +
            '<b>B</b>: <b>O₂ 100 %</b>, valorar <b>OAF</b>.<br>' +
            '<b>C</b>: vía periférica, analítica con gasometría.<br>' +
            '• ' + SALBNEB(v) + '<br>• ' + IPRANEB(v) + '<br>' +
            '• <b>Corticoide IV</b>: metilprednisolona 1–2 mg/kg' + r(v, 1, 2, null, 0, 'mg') + ', después 1–2 mg/kg/día.<br>' +
            '• <b>Sulfato de magnesio IV 40 mg/kg</b>' + d(v, 40, 2000, 0, 'mg') + ' (máx. 2 g) en perfusión lenta de 20 min, dosis única. Vigilar la TA (hipotensión); contraindicado en insuficiencia renal.<br>' +
            '• Considerar <b>Rx de tórax</b> (auscultación asimétrica o hipoxemia persistente, casos graves).<br>' +
            '<b>OAF</b> si tras el tratamiento intensivo inicial persiste PS &gt;6, SatO₂ &lt;94 % con mascarilla reservorio o pCO₂/EtCO₂ &gt;45 mmHg; si fracasa, ventilación no invasiva.' + sinPeso(v),
          q: '¿Mejoría?',
          opts: [{ l: 'Sí', go: 'modgrave' }, { l: 'No', go: 'ucip' }]
        },
        obs: {
          farmacos: ['Salbutamol', 'Metilprednisolona'],
          t: 'Observación / ingreso hospitalario', c: 'mid',
          show: v => '• <b>Oxigenoterapia</b>, valorar <b>OAF</b>.<br>' +
            '• <b>Salbutamol a demanda</b> (valorar de forma continua).<br>' +
            '• <b>Completar la pauta de corticoide</b> (VO o IV) si permanece horas o días: dexametasona 0,6 mg/kg' + d(v, 0.6, 12, 1, 'mg') + ' (máx. 12 mg) a las 24 h, prednisona/prednisolona 1–2 mg/kg/día' + r(v, 1, 2, 60, 0, 'mg') + ' (máx. 40–60 mg) o metilprednisolona IV 1–2 mg/kg/día' + r(v, 1, 2, null, 0, 'mg') + '.<br>' +
            '• Valorar <b>Rx de tórax</b>.' + sinPeso(v),
          q: '¿Cumple criterios de alta?',
          help: ALTA_CRIT,
          opts: [{ l: 'Sí', go: 'alta' }, { l: 'No', go: 'ingreso' }]
        },
        ingreso: {
          t: 'Ingreso hospitalario', c: 'mid',
          show: '<b>Criterios</b>: dificultad respiratoria persistente tras el tratamiento inicial · broncodilatador con frecuencia &lt;2 h · necesidad de O₂ · considerar si enfermedad de base grave (cardiopatía, DBP, fibrosis quística, enfermedad neuromuscular) · antecedente de crisis graves o de rápida progresión · mala adherencia o difícil acceso a la atención sanitaria.<br>' +
            '<b>Destino: ingreso hospitalario.</b> Pasar a UCIP si PS de gravedad persistente, SatO₂ &lt;90 % con FiO₂ &gt;0,4 o pCO₂ &gt;45 mmHg pese al rescate, o arritmias.'
        },
        ucip: {
          t: 'Ingreso en UCIP', c: 'high',
          show: '<b>Criterios</b>: PS de gravedad persistente tras el tratamiento inicial · SatO₂ &lt;90 % con FiO₂ &gt;0,4 o pCO₂ &gt;45 mmHg pese al tratamiento de rescate (valorar OAF y, si fracasa o no está disponible, ventilación no invasiva en UCIP) · arritmias.<br><b>Destino: UCIP.</b>'
        },
        alta: {
          farmacos: ['Salbutamol'],
          t: 'Alta a domicilio', c: 'low',
          show: v => '• <b>Salbutamol MDI a demanda</b> con cámara (5 pulsaciones); espaciar según tolerancia y control por su pediatra.<br>' +
            '• <b>Completar el corticoide oral</b> si se inició en urgencias: 2.ª dosis de dexametasona a las 24 h' + d(v, 0.6, 12, 1, 'mg') + ', o ciclo corto de prednisona/prednisolona 3–5 días.<br>' +
            '• <b>Valorar corticoide inhalado</b> de base (iniciar o subir, o derivar a su centro de salud) si: asma persistente (síntomas diurnos &gt;2/semana o nocturnos &gt;2/mes; cuestionario PACT), ≥2 episodios con corticoide oral en 6 meses, crisis grave con ingreso, o ≥4 episodios de sibilancias en el último año con atopia personal o asma familiar.<br>' +
            '• Información a la familia oral y escrita.<br>' +
            '<b>Destino: alta con control por su pediatra en 24–48 h.</b>'
        }
      }
    };
  })()
});

/* ---------- seup-laringitis ---------- */
window.PROTOCOLS.push({ id:'seup-laringitis', ped:true, title:'Laringitis aguda (crup) (SEUP)', sub:'TEP, escala de Westley, corticoide oral, adrenalina nebulizada y destino', badge:'amber', tag:'Pediatría', rank:4,
  src:'SEUP · Algoritmo 19: Laringitis aguda · PDF «19_Laringitis_ene2025» (actualización enero 2025; página publicada el 08/01/2025; el PDF no indica autores) · https://seup.org/algoritmo-laringitis/',
  docs:[{l:'📄 Algoritmo SEUP completo (PDF)', f:'https://seup.org/wp-content/uploads/2025/01/19_Laringitis_ene2025.pdf'}, {l:'🌐 Página SEUP', f:'https://seup.org/algoritmo-laringitis/'}],
  steps:[
    {text:'Tos perruna, afonía, estridor y dificultad respiratoria por edema subglótico, generalmente vírico. Impresión inicial con el TEP.'},
    {text:'Estable: SpO₂ y score clínico (Westley). Leve (≤3): considerar corticoide oral; alta con medidas generales y signos de alarma.'},
    {text:'Inestable (dificultad respiratoria o fallo cardiorrespiratorio): ABCDE, minimizar la ansiedad, postura confortable, O₂ humidificado si SpO₂ <92 % o tiraje moderado/grave; score.'},
    {text:'Moderada (4–5): adrenalina nebulizada; si mejora, corticoide oral y observación → alta si mejora. Si persiste la dificultad o no mejora, como grave.'},
    {text:'Grave (≥6): adrenalina nebulizada 0,5 mg/kg (máx. 5 mg) + corticoide oral. Si mejora, observación 3–4 h y valorar alta.'},
    {text:'Si no mejora: repetir la adrenalina hasta 3 dosis cada 30 min; si sigue sin mejorar, valorar ingreso hospitalario/UCI.'},
    {type:'info', text:'Dexametasona oral 0,15–0,6 mg/kg (máx. 10 mg); alternativa prednisona/prednisolona 1 mg/kg/día 3 días. Budesonida nebulizada 2 mg si intolerancia oral en las formas leves.'}
  ],
  flow:(() => {
    const W = v => v.peso > 0 ? v.peso : NaN;
    const f = (x, dec) => (Math.round(x * Math.pow(10, dec)) / Math.pow(10, dec)).toString().replace('.', ',');
    /* d(v, porKg, max, decimales, unidad): dosis con el peso real, o nada si no hay peso. */
    const d = (v, k, max, dec, u) => { const w = W(v); if (!w) return ''; const x = w * k; return ' <b>= ' + f(Math.min(x, max == null ? Infinity : max), dec) + ' ' + u + '</b>' + (max != null && x > max ? ' (máximo)' : ''); };
    const r = (v, k1, k2, max, dec, u) => { const w = W(v); if (!w) return ''; return ' <b>= ' + f(Math.min(w * k1, max), dec) + '–' + f(Math.min(w * k2, max), dec) + ' ' + u + '</b>' + (w * k2 > max ? ' (con tope)' : ''); };
    const sinPeso = v => W(v) ? '' : '<br><span class="pe-nota">Introduce el peso real arriba para ver las dosis calculadas.</span>';
    const F = n => ({ n: n, inf: false });
    const CORT = v => '<b>Dexametasona oral 0,15–0,6 mg/kg</b>' + r(v, 0.15, 0.6, 10, 1, 'mg') + ' (máx. 10 mg); si no hay dexametasona, <b>prednisona o prednisolona 1 mg/kg/día</b>' + d(v, 1, null, 0, 'mg') + ' durante 3 días.';
    const ADR = v => '<b>Adrenalina nebulizada 0,5 mg/kg</b>' + d(v, 0.5, 5, 1, 'mg') + ' (máx. 5 mg por nebulización). Efecto a los 10 min, pico a los 30 min, dura 2 h.';
    const ALTA = '<b>Criterios de alta</b>: sin estridor en reposo · SatO₂ &gt;95 % · sin dificultad respiratoria · buena coloración y estado general · buena tolerancia oral a líquidos · posibilidad de volver al hospital si empeora.';
    const WESTLEY = '<b>Escala de Westley</b> (SEUP): estridor inspiratorio no 0 / con la agitación 1 / en reposo 2 · retracciones no 0 / leves 1 / moderadas 2 / severas 3 · ventilación normal 0 / hipoventilación leve 1 / moderada-severa 2 · cianosis no 0 / con la agitación 4 / en reposo 5 · consciencia normal 0 / disminuida 5.<br>' +
      '<b>≤3 leve · 4–5 moderada · ≥6 grave.</b><br><span class="pe-nota">La escala Westley de la app muestra la clasificación clásica y, al lado, la de la SEUP; en este algoritmo manda la SEUP.</span>';
    return {
      inputs: [{ k: 'peso', l: 'Peso real', u: 'kg' }],
      start: 'inicio',
      escalas: [{ id: 'tep-ped', para: 'impresión inicial (TEP)' }, { id: 'westley', para: 'gravedad del crup (muestra la clasificación SEUP)' }],
      nodes: {
        inicio: {
          t: 'Laringitis aguda',
          escalas: ['tep-ped'],
          show: 'Obstrucción aguda de la vía aérea superior por edema subglótico, generalmente vírica: tos perruna o metálica, afonía, estridor y dificultad respiratoria variables.<br>' +
            'El TEP suele estar alterado solo por el lado respiratorio; si se afecta la apariencia o la circulación, es más grave.',
          q: '¿Cómo está el TEP?',
          opts: [
            { l: 'Estable', go: 'estable' },
            { l: 'Inestable: dificultad respiratoria (tiraje ± ruidos respiratorios ± taquipnea)', go: 'abcde' },
            { l: 'Inestable: fallo cardiorrespiratorio (distrés ± somnolencia ± cianosis)', go: 'abcde' }
          ]
        },
        estable: {
          t: 'Estable: SpO₂ y score clínico',
          escalas: ['westley'],
          show: WESTLEY,
          q: '¿Qué score tiene?',
          help: 'En el algoritmo SEUP la rama estable lleva a la laringitis leve. Si el score es ≥4, se maneja como en la rama inestable.',
          opts: [
            { l: 'Leve (score ≤3)', go: 'leve' },
            { l: 'Score ≥4: valorar como en la rama inestable', go: 'abcde' }
          ]
        },
        leve: {
          farmacos: ['Budesonida'],
          t: 'Laringitis leve', c: 'low',
          show: v => '<b>Considerar corticoide oral</b>: ' + CORT(v) + '<br>' +
            'Si hay intolerancia oral: <b>budesonida nebulizada 2 mg</b> (sea cual sea el peso o la edad).<br>' +
            ALTA + '<br><b>Destino: alta con medidas generales y signos de alarma.</b>' + sinPeso(v)
        },
        abcde: {
          t: 'ABCDE y score de laringitis', c: 'mid',
          escalas: ['westley'],
          show: 'ABCDE · <b>minimizar la ansiedad, postura confortable</b> · SpO₂ + <b>O₂ humidificado</b> si SpO₂ &lt;92 % o tiraje moderado/severo.<br>' + WESTLEY,
          q: '¿Qué score tiene?',
          opts: [
            { l: 'Laringitis moderada (score 4–5)', go: 'moderada' },
            { l: 'Laringitis grave (score ≥6)', go: 'grave' }
          ]
        },
        moderada: {
          farmacos: [F('Adrenalina')],
          t: 'Laringitis moderada', c: 'mid',
          show: v => ADR(v) + sinPeso(v),
          q: '¿Cómo responde a la adrenalina?',
          opts: [
            { l: 'Mejoría respiratoria', go: 'modObs' },
            { l: 'Persiste la dificultad respiratoria', go: 'grave' }
          ]
        },
        modObs: {
          t: 'Corticoide oral y observación', c: 'mid',
          show: v => '<b>Iniciar corticoterapia oral</b>: ' + CORT(v) + '<br>' +
            'Observación: tras la adrenalina, al menos <b>3–4 h</b> antes de decidir el alta; el corticoide simultáneo evita el empeoramiento al pasar su efecto.' + sinPeso(v),
          q: '¿Cómo evoluciona?',
          opts: [{ l: 'Mejoría', go: 'altaMod' }, { l: 'No mejoría', go: 'grave' }]
        },
        altaMod: {
          t: 'Alta a domicilio', c: 'low',
          show: ALTA + '<br><b>Destino: alta con signos de alarma y recomendaciones.</b>'
        },
        grave: {
          farmacos: [F('Adrenalina')],
          t: 'Laringitis grave', c: 'high',
          show: v => ADR(v) + '<br>+ <b>corticoide oral</b>: ' + CORT(v) + sinPeso(v),
          q: '¿Cómo evoluciona?',
          opts: [{ l: 'Mejoría', go: 'obsGrave' }, { l: 'No mejoría', go: 'repetir' }]
        },
        obsGrave: {
          t: 'Observación 3–4 h', c: 'mid',
          show: 'Observación <b>3–4 h</b> tras la última adrenalina y valorar el alta.<br>' + ALTA + '<br><b>Destino: valorar alta a domicilio</b>; si no cumple los criterios, valorar ingreso.'
        },
        repetir: {
          farmacos: [F('Adrenalina')],
          t: 'Repetir adrenalina nebulizada', c: 'high',
          show: v => 'Repetir la adrenalina nebulizada <b>hasta 3 dosis en intervalos de 30 min</b>: 0,5 mg/kg' + d(v, 0.5, 5, 1, 'mg') + ' (máx. 5 mg por nebulización).' + sinPeso(v),
          q: '¿Cómo evoluciona?',
          help: 'El algoritmo solo dibuja la salida «No mejoría → valorar ingreso».',
          opts: [{ l: 'Mejoría', go: 'obsGrave' }, { l: 'No mejoría', go: 'ingreso' }]
        },
        ingreso: {
          t: 'Valorar ingreso hospitalario / UCI', c: 'high',
          show: '<b>Criterios de ingreso</b>: afectación del estado general o deterioro progresivo · score moderado-grave sin mejoría tras el tratamiento · hipoxia · tiraje intenso o taquipnea · cianosis o palidez extrema · consciencia disminuida · obstrucción grave previa o anomalía estructural de la vía aérea · <b>edad &lt;6 meses</b> · mala respuesta al tratamiento habitual · diagnóstico incierto · ansiedad familiar · entorno sociofamiliar desfavorable · difícil acceso a la atención sanitaria · consultas repetidas en urgencias.<br>' +
            '<b>Destino: ingreso hospitalario o UCI</b> según la gravedad.<br><span class="pe-nota">La SEUP no detalla qué criterios llevan a UCI y cuáles a planta: según protocolo local.</span>'
        }
      }
    };
  })()
});

/* ---------- seup-deshidratacion ---------- */
/* SEUP · Algoritmo «Paciente con deshidratación en el contexto de gastroenteritis aguda» (PDF mayo 2024)
   convertido en flujograma. Contenido clínico del PDF de la SEUP; volúmenes con el peso real. */
window.PROTOCOLS.push({ id:'seup-deshidratacion', ped:true, title:'Deshidratación por gastroenteritis (SEUP)', sub:'TEP, gravedad, rehidratación oral, RIR y rehidratación IV convencional según natremia (no neonatos)', badge:'amber', tag:'Pediatría', rank:5,
  src:'SEUP · Algoritmo: Paciente con deshidratación en el contexto de gastroenteritis aguda (no incluye periodo neonatal) · PDF mayo 2024 (sin autores en el PDF) · https://seup.org/algoritmo-deshidratacion/',
  docs:[
    {l:'📄 Algoritmo SEUP completo (PDF)', f:'https://seup.org/wp-content/uploads/2024/04/9_Deshidratacion_may2024.pdf'},
    {l:'🌐 Página SEUP', f:'https://seup.org/algoritmo-deshidratacion/'}
  ],
  steps:[
    {text:'TEP: la mayoría están estables; lo primero que se altera es la circulación (shock compensado)'},
    {text:'Shock descompensado: vía, monitor, O₂, analítica y bolos de SSF o solución balanceada 10 ml/kg; fallo cardiorrespiratorio: reanimación'},
    {text:'Triaje: motivo, enfermedades previas, peso siempre; con TEP alterado TA, FC, FR y glucemia. Triaje avanzado: iniciar rehidratación oral'},
    {text:'Gravedad por pérdida aguda de peso + signos clínicos (tabla NICE): leve 3–5 %, moderada 5–10 %, grave >10 %'},
    {text:'Leve/moderada sin contraindicación: SRO 30–50 ml/kg (leve) o 50–100 ml/kg (moderada)'},
    {text:'Si no es posible la vía oral: analítica y vía; RIR con SSF o balanceada 20 ml/kg/h 1–4 h (máx. 700 ml/h) si no está contraindicada'},
    {text:'Rehidratación IV convencional (necesidades basales + déficit) según natremia: 24 h en iso/hiponatremia, 48–72 h en hipernatremia'},
    {text:'Corrección del Na <0,5 mEq/L/h; hiponatremia sintomática: SSH 3 % 2–5 ml/kg (máx. 100 ml)'},
    {text:'Reevaluar cada hora y pasar a vía oral en cuanto sea posible; alta o ingreso según criterios'}
  ],
  flow:(() => {
    const f = (x, d) => (Math.round(x * Math.pow(10, d)) / Math.pow(10, d)).toString().replace('.', ',');
    const P = v => (v.peso > 0 ? v.peso : NaN);
    const sinPeso = v => (P(v) ? '' : '<br><span class="pe-nota">Introduce el peso arriba para ver los volúmenes calculados.</span>');
    const ml = (v, k, max) => { const w = P(v); return w ? ' <b>= ' + f(Math.min(w * k, max == null ? Infinity : max), 0) + ' ml</b>' + (max != null && w * k > max ? ' (máximo)' : '') : ''; };
    const rng = (v, a, b, max, u) => { const w = P(v); if (!w) return ''; const lo = Math.min(w * a, max == null ? Infinity : max), hi = Math.min(w * b, max == null ? Infinity : max); return ' <b>= ' + f(lo, 0) + '–' + f(hi, 0) + ' ' + (u || 'ml') + '</b>' + (max != null && w * b > max ? ' (máximo)' : ''); };
    const pct = v => (v.pct >= 0 ? v.pct : NaN);
    const na = v => (v.na > 0 ? v.na : NaN);
    /* Necesidades basales en 24 h por Holliday-Segar (fórmula citada por la SEUP): 100 ml/kg los primeros 10 kg, 50 ml/kg de 10 a 20 kg y 20 ml/kg por encima de 20 kg. */
    const nb = w => (w <= 10 ? 100 * w : w <= 20 ? 1000 + 50 * (w - 10) : 1500 + 20 * (w - 20));
    /* Déficit: el % de pérdida de peso equivale a ml de agua (1 kg ≈ 1 l); se calcula con el peso introducido. */
    const deficit = v => (P(v) && !isNaN(pct(v)) ? pct(v) * P(v) * 10 : NaN);
    const rirDada = v => (v.rir > 0 ? v.rir : 0);
    const defTxt = v => { const de = deficit(v); return !isNaN(de) ? 'Déficit estimado: <b>' + f(pct(v), 1) + ' % × ' + f(P(v), 1) + ' kg ≈ ' + f(de, 0) + ' ml</b>.' : 'Pon el peso y el % de pérdida de peso para calcular el déficit (% × kg × 10 ml).'; };
    /* Pauta convencional: (NB × días + déficit − RIR ya dada) / horas. */
    const pauta = (v, horas) => {
      const w = P(v), de = deficit(v);
      if (!w) return 'Pon el peso para calcular las necesidades basales.';
      const base = nb(w);
      let h = 'Necesidades basales (Holliday-Segar): <b>' + f(base, 0) + ' ml/24 h</b>.<br>';
      if (isNaN(de)) return h + 'Pon el % de pérdida de peso para calcular el déficit y el ritmo.';
      const rest = Math.max(de - rirDada(v), 0);
      h += 'Déficit ≈ <b>' + f(de, 0) + ' ml</b>' + (rirDada(v) ? ' − RIR ya administrada ' + f(rirDada(v), 0) + ' ml = <b>' + f(rest, 0) + ' ml</b>' : '') + '.<br>';
      return h + horas.map(hh => 'Reposición en ' + hh + ' h: (' + f(base, 0) + ' × ' + (hh / 24) + ' + ' + f(rest, 0) + ') / ' + hh + ' = <b>' + f((base * hh / 24 + rest) / hh, 0) + ' ml/h</b>').join('<br>');
    };
    const sueroConv = 'Suero: <b>SSF 0,9 % (154 mEq/L) + glucosa 5 % + potasio 20 mEq/L</b>. Antes de añadir potasio: comprobar que no hay hiperpotasemia, que hay diuresis y función renal normal.';
    return {
      inputs: [
        { k: 'peso', l: 'Peso', u: 'kg' },
        { k: 'edad', l: 'Edad', u: 'años' },
        { k: 'pct', l: 'Pérdida de peso', u: '%' },
        { k: 'na', l: 'Na plasmático', u: 'mEq/L' },
        { k: 'rir', l: 'RIR ya administrada', u: 'ml' }
      ],
      start: 'inicio',
      escalas: [{ id: 'tep-ped', para: 'estimación de la gravedad (TEP)' }],
      nodes: {
        inicio: {
          t: 'Estimación de la gravedad: TEP',
          escalas: ['tep-ped'],
          show: v => 'En la deshidratación la mayoría tiene <b>TEP estable</b>. Lo primero que se altera es el lado <b>circulatorio</b> (palidez, cutis reticular, cianosis) = <b>shock compensado</b> (la fiebre alta también puede alterarlo).<br>' +
            'Si se altera la <b>apariencia</b> (irritabilidad, decaimiento, bajo nivel de conciencia; descartar hipoglucemia) = <b>shock descompensado</b>. Cianosis con bradipnea = <b>fallo cardiorrespiratorio</b>.<br>' +
            'No incluye el periodo neonatal.' + sinPeso(v),
          q: '¿Cómo está el TEP?',
          opts: [
            { l: 'Estable o shock compensado', go: 'triaje' },
            { l: 'Shock descompensado (triaje nivel 1–2)', go: 'shock' },
            { l: 'Fallo cardiorrespiratorio', go: 'reanim' }
          ]
        },
        reanim: {
          t: 'Fallo cardiorrespiratorio: reanimación', c: 'high',
          show: 'Urgencia vital: <b>comenzar reanimación</b> (protocolo de RCP pediátrica).<br>Destino tras estabilizar: el algoritmo no lo especifica (según protocolo local).'
        },
        shock: {
          farmacos: ['Cloruro sódico 0,9%', 'Plasmalyte', 'Glucosa'],
          t: 'Shock hipovolémico', c: 'high',
          show: v => 'Signos: taqui- o bradicardia, pulsos débiles o ausentes, hipotensión, relleno capilar &gt;3 s, frialdad, piel moteada, oligoanuria, bajo nivel de conciencia, ojos y fontanela muy hundidos, mucosas muy secas.<br>' +
            '• <b>Acceso venoso</b>; monitor (FC, PA, FR, ECG, SatO₂); <b>oxígeno</b>.<br>' +
            '• Analítica: gasometría venosa, iones, creatinina, glucosa.<br>' +
            '• <b>SSF o solución balanceada 10 ml/kg en bolo</b>' + ml(v, 10) + ', repetir si es preciso.<br>' +
            '• Valorar drogas vasoactivas (el algoritmo no detalla cuáles; según protocolo local).<br>' +
            '• Tratar la hipoglucemia si es preciso (dosis no especificada en el algoritmo).' + sinPeso(v),
          q: 'Tras estabilizar la volemia:',
          opts: [{ l: 'Estimar déficit de agua y de Na y seguir con la rehidratación IV', go: 'iv' }]
        },
        triaje: {
          t: 'Triaje y proceso médico',
          show: v => '<b>Triaje</b>: motivo de consulta · enfermedades previas (metabolopatías, malabsorción) · alergias · <b>peso siempre</b>; si TEP alterado, TA, FC, FR y glucemia.<br>' +
            'Niveles: <b>I</b> fallo cardiorrespiratorio/shock descompensado con coma o convulsión · <b>II</b> deshidratación grave, hipotensión, taquicardia sin fiebre ni dolor, bradicardia o enfermedad previa importante (15 min) · <b>III</b> moderada con PA normal (30 min) · <b>IV–V</b> leve (1 h).<br>' +
            'Triaje avanzado: se puede <b>iniciar rehidratación oral</b> y antitérmico/analgésico según protocolo del servicio.<br>' +
            '<b>Proceso médico</b>: SAMPLE y exploración. La <b>pérdida aguda de peso</b> es el mejor indicador del déficit.<br>' +
            '<b>Tabla NICE</b> — deshidratación clínica: alerta alterada (irritable, letárgico)*, diuresis disminuida, mucosas secas, ojos hundidos*, taquipnea*, taquicardia*, pérdida de turgencia*; piel, extremidades, TA, relleno capilar y pulsos normales. <b>Shock clínico</b>: alteración de conciencia, pálido o moteado, frialdad distal, hipotensión, relleno &gt;2 s, pulsos débiles. (*signos de alarma)<br>' +
            'Leve 3–5 % · moderada 5–10 % · grave &gt;10 % (las &lt;2 % no suelen dar clínica).<br>' + defTxt(v),
          q: '¿Gravedad de la deshidratación?',
          opts: [
            { l: 'Leve o moderada', go: 'leve', sug: v => pct(v) <= 10 },
            { l: 'Grave', go: 'iv', sug: v => pct(v) > 10 }
          ]
        },
        leve: {
          t: 'Leve o moderada: ¿se puede rehidratar por vía oral?',
          show: 'Contraindicaciones de la rehidratación oral (RHO): deshidratación grave (&gt;10 %) · inestabilidad hemodinámica · sospecha de íleo paralítico · riesgo de aspiración (bajo nivel de conciencia) · malabsorción intestinal (p. ej., intestino corto) · pérdidas &gt;10 ml/kg/h.<br>' +
            'Relativas: vómitos incoercibles, problemas con la técnica, familia poco colaboradora.',
          q: '¿Está contraindicada la RHO?',
          opts: [
            { l: 'No', go: 'sro', sug: v => pct(v) <= 10 },
            { l: 'Sí', go: 'iv', sug: v => pct(v) > 10 }
          ]
        },
        sro: {
          t: 'Rehidratación oral con SRO', c: 'low',
          show: v => '<b>Volumen total de SRO</b> según el déficit: leve (3–5 %) <b>30–50 ml/kg</b>' + rng(v, 30, 50) + ' · moderada (5–10 %) <b>50–100 ml/kg</b>' + rng(v, 50, 100) + '.<br>' +
            'Con vómitos: pequeñas cantidades cada 3–5 min, aumentando progresivamente. Si vomita y está estable: pausa de unos 20 min y reiniciar.<br>' +
            'Vómitos persistentes: <b>ondansetrón oral 0,15 mg/kg</b>' + (P(v) ? ' <b>= ' + f(Math.min(P(v) * 0.15, 8), 1) + ' mg</b>' + (P(v) * 0.15 > 8 ? ' (máximo)' : '') : '') + ' (máx. 8 mg) antes de reiniciar. Precaución si sospecha de obstrucción o vómitos de origen poco claro; alarga el QT (no en riesgo de QT largo o arritmias).<br>' +
            'Alternativa con vómitos: SRO a débito continuo por sonda nasogástrica.<br>' +
            'En la leve no hace falta completar la rehidratación en Urgencias si tolera y el estado general es bueno.' + sinPeso(v),
          q: '¿Tolera la rehidratación oral?',
          opts: [
            { l: 'Sí', go: 'destino' },
            { l: 'No: fracaso de la vía oral o pérdidas excesivas', go: 'iv' }
          ]
        },
        iv: {
          t: 'Analítica y vía', c: 'mid',
          show: v => 'Analítica si: alteración del estado mental, deshidratación grave, clínica de hipopotasemia, hiper- o hiponatremia grave, o si hace falta para el diagnóstico.<br>' +
            '• Bioquímica: Na, K, Cl, osmolaridad, urea y creatinina. • Gasometría venosa: suele haber acidosis metabólica; HCO₃ &lt;17 orienta a deshidratación moderada-grave. • Anión GAP = Na − (Cl + HCO₃) = 10 ± 2 (normal en la diarrea). • Glucemia (hipoglucemia por ayuno).<br>' +
            '<b>RIR contraindicada</b> si: hipernatremia (Na &gt;150) o hiponatremia (Na &lt;130), sobre todo si &gt;48 h de evolución · enfermedad sistémica que altere la regulación hemodinámica o hidroelectrolítica · <b>&lt;3 meses</b>. En DH grave o entre 3 y 6 meses: manejo individualizado.' +
            (na(v) ? '<br>Na ' + f(na(v), 0) + ' mEq/L' + (na(v) > 150 || na(v) < 130 ? ' → <b>contraindica la RIR</b>.' : ' → no contraindica la RIR.') : '') +
            (v.edad >= 0 && v.edad < 0.25 ? '<br><b>Menor de 3 meses → RIR contraindicada.</b>' : ''),
          q: '¿Está contraindicada la rehidratación intravenosa rápida (RIR)?',
          opts: [
            { l: 'No', go: 'rir', sug: v => na(v) >= 130 && na(v) <= 150 && !(v.edad >= 0 && v.edad < 0.25) },
            { l: 'Sí', go: 'conv', sug: v => na(v) > 150 || na(v) < 130 || (v.edad >= 0 && v.edad < 0.25) }
          ]
        },
        rir: {
          farmacos: ['Cloruro sódico 0,9%', 'Plasmalyte'],
          t: 'Rehidratación intravenosa rápida (RIR)', c: 'mid',
          show: v => { const w = P(v), de = deficit(v); return 'Suero <b>isotónico</b>: SSF 0,9 % o solución balanceada, con o sin glucosa (2,5–3 %).<br>' +
            '<b>20 ml/kg/h durante 1–4 h</b>' + (w ? ' <b>= ' + f(Math.min(w * 20, 700), 0) + ' ml/h</b>' + (w * 20 > 700 ? ' (máximo 700 ml/h)' : '') : '') + ' (cada hora repone ≈ 2 % del déficit).<br>' +
            '<b>No superar el déficit calculado</b>' + (!isNaN(de) ? ' (≈ ' + f(de, 0) + ' ml)' : '') + ' ni 700 ml/h.<br>' +
            'Reevaluar tras cada hora para pasar a vía oral en cuanto se pueda; vigilar diuresis y signos de sobrecarga. Control analítico al terminar si la analítica basal era alterada o la evolución es desfavorable.' + sinPeso(v); },
          q: 'Tras cada hora de RIR:',
          opts: [
            { l: 'Mejora: pasar a rehidratación oral', go: 'destino' },
            { l: 'Pérdidas excesivas sin poder usar la vía oral, o sigue deshidratado tras 2–4 h', go: 'conv' }
          ]
        },
        conv: {
          t: 'Rehidratación IV convencional según natremia', c: 'mid',
          show: v => 'Indicada si la RIR está contraindicada, o si persisten pérdidas excesivas sin vía oral o la deshidratación tras 2–4 h de RIR.<br>' +
            'Volumen = <b>necesidades basales (Holliday-Segar) + déficit</b> (descontando la RIR ya administrada).<br>' +
            'Estimar también el déficit de Na y otras alteraciones (glucosa, K, Cl, Ca…).' + (na(v) ? '<br>Na plasmático: <b>' + f(na(v), 0) + ' mEq/L</b>.' : ''),
          q: '¿Qué natremia tiene?',
          opts: [
            { l: 'Isonatremia o hiponatremia leve (Na ≥130)', go: 'iso', sug: v => na(v) >= 130 && na(v) <= 150 },
            { l: 'Hiponatremia sintomática (≈ Na &lt;125)', go: 'hiposint' },
            { l: 'Hiponatremia asintomática moderada o grave (Na &lt;130)', go: 'hipoasint', sug: v => na(v) < 130 },
            { l: 'Hipernatremia (Na &gt;150)', go: 'hiper', sug: v => na(v) > 150 }
          ]
        },
        iso: {
          farmacos: ['Cloruro sódico 0,9%', 'Glucosa'],
          t: 'Iso- o hiponatremia con Na ≥130: reposición en 24 h', c: 'mid',
          show: v => sueroConv + '<br>' + pauta(v, [24]) + '<br>Reevaluar cada hora y pasar a RHO cuando sea posible.',
          q: 'Siguiente paso:',
          opts: [{ l: 'Reevaluar y decidir destino', go: 'destino' }]
        },
        hiposint: {
          t: 'Hiponatremia sintomática', c: 'high',
          show: v => '<b>Suero salino hipertónico 3 % 2–5 ml/kg</b>' + rng(v, 2, 5, 100) + ' (máx. 100 ml) hasta que remitan los síntomas.<br>' +
            'Después, rehidratación IV corrigiendo el Na <b>&lt;0,5 mEq/L/h</b> (máx. 10–12 mEq/L al día). Inicialmente SSF 0,9 %, modificándolo según el Na plasmático; reposición del déficit en 24 h.<br>' + pauta(v, [24]) + sinPeso(v),
          q: 'Siguiente paso:',
          opts: [{ l: 'Reevaluar y decidir destino', go: 'destino' }]
        },
        hipoasint: {
          farmacos: ['Cloruro sódico 0,9%'],
          t: 'Hiponatremia asintomática moderada o grave', c: 'mid',
          show: v => 'Rehidratación IV con corrección del Na <b>&lt;0,5 mEq/L/h</b> (máx. 10–12 mEq/L al día). Inicialmente SSF 0,9 %, modificándolo según el Na plasmático; reposición del déficit en 24 h.<br>' + pauta(v, [24]) + '<br>Reevaluar cada hora.',
          q: 'Siguiente paso:',
          opts: [{ l: 'Reevaluar y decidir destino', go: 'destino' }]
        },
        hiper: {
          farmacos: ['Cloruro sódico 0,9%'],
          t: 'Hipernatremia: corrección lenta', c: 'high',
          show: v => 'Opciones: <b>SRO no hiposódicas o rehidratación IV</b>. Predominan los síntomas neurológicos (irritabilidad, sed intensa, letargia; convulsiones o coma si es intensa).<br>' +
            'Corrección lenta: <b>48 h</b> en las moderadas · <b>72 h</b> en las graves (Na &gt;170) o crónicas (&gt;48 h)' + (na(v) > 150 ? ' → con Na ' + f(na(v), 0) + ': <b>' + (na(v) > 170 ? '72 h' : '48 h (72 h si es crónica)') + '</b>' : '') + '.<br>' +
            'Descenso máximo del Na <b>&lt;0,5 mEq/L/h (12 mEq/L en 24 h)</b>. Inicialmente SSF 0,9 %, modificándolo según el Na plasmático.<br>' + pauta(v, na(v) > 170 ? [72] : [48, 72]),
          q: 'Siguiente paso:',
          opts: [{ l: 'Reevaluar y decidir destino', go: 'destino' }]
        },
        destino: {
          t: 'Reevaluación y destino',
          show: 'Reevaluar cada hora; pasar a rehidratación oral en cuanto sea posible.<br>' +
            '<b>Alta</b> si: buena tolerancia oral · sin deshidratación o leve · buen cumplimiento asegurado por la familia.<br>' +
            '<b>Ingreso</b> si: mala evolución o afectación persistente del estado general · fracaso de la tolerancia oral · deposiciones de alto ritmo y volumen · descompensación de enfermedad de base no tratable en domicilio.',
          q: '¿Cumple criterios de alta?',
          opts: [
            { l: 'Sí', go: 'alta' },
            { l: 'No: cumple algún criterio de ingreso', go: 'ingreso' }
          ]
        },
        alta: {
          t: 'Alta a domicilio', c: 'low',
          show: 'Tolera la vía oral, sin deshidratación o leve y con buen cumplimiento familiar: <b>alta</b>. En la leve no es necesario completar toda la rehidratación en Urgencias.'
        },
        ingreso: {
          t: 'Ingreso hospitalario', c: 'mid',
          show: '<b>Ingreso hospitalario</b>: mala evolución o afectación persistente del estado general, fracaso de la tolerancia oral, deposiciones de alto ritmo y volumen o enfermedad de base descompensada no tratable en domicilio.'
        }
      }
    };
  })()
});

/* ---------- seup-tce ---------- */
/* SEUP · Algoritmo 30: Traumatismo craneal (flujograma interactivo).
   Fuente: https://seup.org/algoritmo-traumatismo-craneal/ (PDF 30_TCE.pdf). */
window.PROTOCOLS.push({ id:'seup-tce', ped:true, title:'Traumatismo craneal pediátrico (SEUP)', sub:'Estable o inestable, grupos de riesgo de lesión intracraneal (&lt;2 / ≥2 años), observación frente a TAC y destino', badge:'amber', tag:'Pediatría', rank:6,
  src:'SEUP · Algoritmo 30: Traumatismo craneal · PDF de septiembre de 2022 (autores no constan en el PDF) · https://seup.org/algoritmo-traumatismo-craneal/',
  docs:[{l:'📄 Algoritmo SEUP completo (PDF)', f:'https://seup.org/pdf_public/algoritmos/30_TCE.pdf'}, {l:'🌐 Página SEUP', f:'https://seup.org/algoritmo-traumatismo-craneal/'}],
  steps:[
    {text:'Triángulo de Evaluación Pediátrica y constantes (incluido el dolor). Tríada de Cushing (bradicardia, HTA, respiración irregular) = aumento de la PIC.'},
    {text:'Inestable: ABCDE, control cervical si riesgo, O₂ 100 %, intubar si GCS &lt;9, monitorizar (FC, FR, TA, EtCO₂, SatO₂), dolor, acceso venoso, valorar tratamiento de la PIC, TAC si riesgo alto e ingreso.'},
    {text:'Estable: historia clínica (mecanismo de riesgo, síntomas, sospecha de maltrato) y exploración física (GCS, cabeza, signos de fractura, fontanela).'},
    {text:'Riesgo alto de LIC (focalidad, fractura palpable, signos de fractura basilar, fontanela tensa, convulsiones) → TAC.'},
    {text:'Riesgo intermedio (criterios distintos en &lt;2 y ≥2 años) → observación hospitalaria mínima de 4–6 h frente a TAC.'},
    {text:'Riesgo bajo → alta con recomendaciones y observación domiciliaria 24–48 h.'},
    {text:'Ingreso si GCS &lt;15, focalidad, estado neurológico alterado, intolerancia oral, lesiones extracraneales graves, LIC, sospecha de maltrato o cuidadores inadecuados. UCIP si GCS &lt;13, focalidad o LIC.'},
    {type:'info', text:'La tabla de grupos de riesgo de la SEUP sigue la línea de PECARN; aquí se aplica con preguntas y se puede puntuar con las escalas PECARN de la app (&lt;2 y ≥2 años).'}
  ],
  flow:(() => {
    const ok = x => typeof x === 'number' && x > 0;
    const edadTxt = v => ok(v.edad) ? (v.edad < 2 ? '&lt;2 años' : '≥2 años') : '';
    const gcsNota = v => {
      if (!(typeof v.gcs === 'number' && v.gcs >= 3 && v.gcs <= 15)) return '<br><span class="pe-nota">Introduce el Glasgow arriba para ver qué criterios cumple.</span>';
      if (v.gcs < 9) return '<br><b>GCS ' + v.gcs + ': &lt;9 → intubar</b>; criterio de UCIP (GCS &lt;13).';
      if (v.gcs < 13) return '<br><b>GCS ' + v.gcs + ': criterio de UCIP</b> (GCS &lt;13).';
      if (v.gcs < 15) return '<br><b>GCS ' + v.gcs + ': criterio de observación u hospitalización</b> (GCS &lt;15).';
      return '<br>GCS 15.';
    };
    const ingresoTxt = 'Observación en Urgencias u hospitalización si: GCS &lt;15 · focalidad neurológica · estado neurológico alterado · intolerancia oral · lesiones extracraneales graves · lesión intracraneal · sospecha de maltrato · cuidadores inadecuados para vigilar al niño y reconsultar.';
    const ucipTxt = '<b>UCIP</b> si GCS &lt;13 o focalidad neurológica, o si hay LIC (considerar planta si hematoma no epidural &lt;1 cm).';
    const altaTxt = '<b>Destino: alta</b> con observación domiciliaria por un adulto responsable durante <b>24–48 h</b>. Reconsultar si: cefalea intensa o irritabilidad · vómitos repetidos · salida de líquido o sangre por oídos o nariz · cambios de comportamiento, equilibrio, visión o habla · dificultad para despertarse o mantenerse despierto · movimientos extraños o pérdida de fuerza.';
    const neuroqTxt ='Valoración o tratamiento <b>neuroquirúrgico</b> si: LIC, fractura deprimida, fractura basilar, fractura con diástasis (&gt;3 mm) o deterioro clínico.';
    return {
      inputs:[{k:'peso', l:'Peso', u:'kg'}, {k:'edad', l:'Edad', u:'años'}, {k:'gcs', l:'Glasgow', u:'3–15'}],
      start:'inicio',
      escalas:[
        {id:'tep-ped', para:'impresión inicial (TEP)'},
        {id:'gcsped', para:'Glasgow en el niño (verbal modificada en &lt;2 años)'},
        {id:'gcs', para:'Glasgow en el niño mayor'},
        {id:'flacc', para:'dolor en el niño que no habla'},
        {id:'pecarn-menor2', para:'riesgo de lesión intracraneal (&lt;2 años)'},
        {id:'pecarn-mayor2', para:'riesgo de lesión intracraneal (≥2 años)'}
      ],
      nodes:{
        inicio:{
          t:'Evaluación inicial', escalas:['tep-ped'],
          show: v => '<b>TEP</b>: suele ser normal; si está alterado, lo está la apariencia (disfunción del SNC) e indica más gravedad.<br>' +
            '<b>Constantes</b> con valoración del dolor (el dolor no controlado aumenta la PIC). <b>Tríada de Cushing</b> (bradicardia, hipertensión, respiración irregular) = aumento de la PIC.<br>' +
            'Nivel de consciencia con <b>GCS</b> (en &lt;2 años, verbal modificada) y <b>pupilas</b> (anisocoria → compresión del III par; midriasis arreactiva → tronco).' + gcsNota(v),
          q:'¿El paciente está estable?',
          opts:[
            {l:'Estable', go:'historia', sug: v => typeof v.gcs === 'number' && v.gcs >= 13 && v.gcs <= 15},
            {l:'Inestable', go:'inestable', sug: v => typeof v.gcs === 'number' && v.gcs >= 3 && v.gcs < 9}
          ]
        },
        inestable:{
          t:'Paciente inestable', c:'high', escalas:['gcsped', 'flacc'],
          show: v => '• Valoración <b>ABCDE</b> · control cervical si riesgo de lesión cervical · <b>O₂ 100 %</b>.<br>' +
            '• Estabilizar la vía aérea: <b>intubar si GCS &lt;9</b>, inestabilidad hemodinámica o distrés respiratorio grave.<br>' +
            '• Monitorizar FC, FR, TA, EtCO₂ y SatO₂ · valorar el dolor y analgesia según escala · acceso venoso.<br>' +
            '• Valorar el tratamiento del <b>aumento de la PIC</b> (fármacos y dosis según protocolo local: el algoritmo SEUP no los detalla) y anticomicial si convulsiona (ver «Estatus epiléptico SEUP»).<br>' +
            '• <b>TAC</b> si riesgo alto de LIC, una vez estabilizado.<br>' + neuroqTxt + gcsNota(v) +
            '<br><b>Destino: ingreso.</b> ' + ucipTxt
        },
        historia:{
          t:'Historia clínica y exploración física',
          show: v => '<b>Antecedentes</b> que aumentan el riesgo: coagulopatía, fármacos, válvula de derivación, malformaciones vasculares. Lugar, localización y tiempo de evolución (el daño secundario es más frecuente en las primeras 6 h).<br>' +
            '<b>Mecanismo de riesgo</b>: caída &gt;1,5 m (<b>&gt;1 m en &lt;2 años</b>), impacto directo con objeto contundente, accidente de tráfico con desplazamiento, muerte de un pasajero o vuelco, traumatismo no presenciado, peatón o ciclista sin casco atropellado, zambullida, colisión en bicicleta, accidente de moto, herida penetrante.<br>' +
            '<b>Síntomas</b>: pérdida de consciencia y duración, vómitos (sobre todo &gt;1 h tras el TCE), cefalea, irritabilidad, convulsión, cambio de comportamiento, ceguera, confusión.<br>' +
            '<b>Sospecha de maltrato</b> (sobre todo lactantes): lesiones incongruentes con la historia, demora injustificada, lesiones geométricas, en zonas protegidas o en distinto estadio, otras fracturas o hemorragias retinianas, actitud inadecuada de los padres, conducta inhabitual del lactante.<br>' +
            '<b>Exploración</b>: neurológica completa (pares craneales, reflejos) y repetida; cabeza: hematoma subgaleal o cefalohematoma (más riesgo si no frontal en &lt;2 años, &gt;3 cm y blando, o cualquier localización en &lt;3 meses), escalón o crepitación, signos de fractura de base (hemotímpano, Battle, ojos de mapache, licuorrea), fontanela tensa, heridas del cuero cabelludo, fondo de ojo, lesiones asociadas.' + gcsNota(v),
          q:'¿Tiene algún criterio de <b>riesgo alto</b> de lesión intracraneal?',
          help:'Riesgo alto: focalidad neurológica · fractura craneal palpable · signos de fractura basilar · fontanela tensa · convulsiones.',
          opts:[{l:'Sí', go:'alto'}, {l:'No', go:'edad'}]
        },
        alto:{
          t:'Riesgo alto de LIC → TAC', c:'high',
          show: v => '<b>TAC craneal</b> una vez estabilizado (prueba de elección para la LIC).<br>' + neuroqTxt +
            '<br>Anticomicial si convulsiona (ver «Estatus epiléptico SEUP»); control de la PIC según protocolo local.' + gcsNota(v),
          q:'Tras el TAC, ¿hay LIC u otro criterio de observación o ingreso?',
          help: ingresoTxt,
          opts:[{l:'Sí', go:'ingreso'}, {l:'No', go:'altaTac'}]
        },
        edad:{
          q:'¿Qué edad tiene?',
          help: v => ok(v.edad) ? 'Edad introducida: ' + edadTxt(v) + '.' : 'Los criterios de riesgo intermedio cambian a los 2 años.',
          opts:[
            {l:'Menor de 2 años', go:'inter2', sug: v => ok(v.edad) && v.edad < 2},
            {l:'2 años o más', go:'interM', sug: v => ok(v.edad) && v.edad >= 2}
          ]
        },
        inter2:{
          escalas:['pecarn-menor2'],
          q:'¿Tiene algún criterio de <b>riesgo intermedio</b> (&lt;2 años)?',
          help:'Cefalohematoma no frontal importante · pérdida de conocimiento &gt;5 s · vómitos · mecanismo de riesgo · actitud anormal según los padres.',
          opts:[{l:'Sí', go:'obs'}, {l:'No', go:'bajo'}]
        },
        interM:{
          escalas:['pecarn-mayor2'],
          q:'¿Tiene algún criterio de <b>riesgo intermedio</b> (≥2 años)?',
          help:'Pérdida de conocimiento · vómitos · cefalea intensa · mecanismo de riesgo.',
          opts:[{l:'Sí', go:'obs'}, {l:'No', go:'bajo'}]
        },
        obs:{
          t:'Riesgo intermedio: observación frente a TAC', c:'mid', escalas:['gcsped'],
          show: v => '<b>Observación hospitalaria mínima de 4–6 h</b> tras el traumatismo, con revaloración periódica del GCS y vigilancia de síntomas nuevos o empeoramiento.<br>' +
            '<b>Considerar TAC</b> si: empeoramiento clínico · varios signos o síntomas · <b>edad &lt;3 meses</b> · preferencia familiar. También indicado si hay factores predisponentes de sangrado o sospecha de maltrato.' +
            (ok(v.edad) && v.edad < 0.25 ? '<br><b>Edad &lt;3 meses: considerar TAC.</b>' : ''),
          q:'¿Se hace TAC?',
          opts:[
            {l:'Sí: TAC', go:'tac', sug: v => ok(v.edad) && v.edad < 0.25},
            {l:'No: observación con buena evolución', go:'bajo'}
          ]
        },
        tac:{
          t:'TAC craneal', c:'mid',
          show: v => 'LIC más frecuentes: hematoma epidural (puede quedar oculto), subdural (interhemisférico en lactantes: pensar en maltrato), lesión axonal difusa y contusión.<br>' + neuroqTxt + gcsNota(v),
          q:'¿Hay LIC u otro criterio de observación o ingreso?',
          help: ingresoTxt,
          opts:[{l:'Sí', go:'ingreso'}, {l:'No', go:'altaTac'}]
        },
        altaTac:{
          t:'TAC sin LIC y sin criterios de ingreso: alta', c:'low',
          show: altaTxt
        },
        ingreso:{
          t:'Destino: observación u hospitalización', c:'high',
          show: v => ingresoTxt + '<br>' + ucipTxt + '<br>' + neuroqTxt + gcsNota(v)
        },
        bajo:{
          t:'Riesgo bajo de LIC: alta con recomendaciones', c:'low',
          show: 'Riesgo bajo: GCS 15, sin signos de fractura, sin mecanismo de riesgo, sin focalidad, asintomático.<br>' +
            'Antes del alta, comprobar que no hay criterios de ingreso (intolerancia oral, sospecha de maltrato, cuidadores inadecuados…).<br>' + altaTxt
        }
      },
      extras:{
        t:'Consulta rápida',
        help:'Ábrelos en cualquier momento del flujograma.',
        items:[
          {l:'Grupos de riesgo de LIC (tabla 30-2)', t:'Grupos de riesgo de lesión intracraneal',
            show:'<b>Alto</b>: focalidad neurológica · fractura craneal palpable · signos de fractura basilar · fontanela tensa · convulsiones.<br>' +
              '<b>Intermedio &lt;2 años</b>: cefalohematoma no frontal importante · pérdida de conocimiento &gt;5 s · vómitos · mecanismo de riesgo · actitud anormal según los padres.<br>' +
              '<b>Intermedio ≥2 años</b>: pérdida de conocimiento · vómitos · cefalea intensa · mecanismo de riesgo.<br>' +
              '<b>Bajo</b>: GCS 15 · sin signos de fractura · sin mecanismo de riesgo · sin focalidad · asintomático.'},
          {l:'Indicaciones de TAC', t:'Indicaciones de TAC craneal',
            show:'Grupo de riesgo alto · varios factores de riesgo intermedio · evolución de síntomas de riesgo intermedio durante la observación · factores predisponentes de sangrado · sospecha de maltrato. Se hace una vez estabilizado el paciente.'},
          {l:'Glasgow pediátrico (tabla 30-1)', t:'Escala de Glasgow',
            show:'<b>Ojos</b>: espontánea 4 · al habla 3 · al dolor 2 · no 1.<br><b>Motora</b>: obedece 6 · localiza 5 · retira 4 · flexión 3 · extensión 2 · nada 1.<br>' +
              '<b>Verbal niños</b>: orientado 5 · desorientado 4 · palabras inapropiadas 3 · sonidos incomprensibles 2 · nada 1.<br><b>Verbal lactantes</b>: sonríe, sigue sonidos y objetos 5 · irritable, consolable 4 · llora con el dolor 3 · se queja ante el dolor 2 · nada 1.'}
        ]
      }
    };
  })()
});

/* ---------- seup-dolor ---------- */
/* SEUP · Algoritmo «Manejo del dolor (agudo) en urgencias pediátricas» convertido en flujograma.
   Contenido clínico del PDF de la SEUP (tablas 21-1 a 21-9); dosis con el peso real. */
window.PROTOCOLS.push({ id:'seup-dolor', ped:true, title:'Dolor agudo en urgencias pediátricas (SEUP)', sub:'Medir con la escala adecuada, estratificar, tratar según intensidad y origen, y reevaluar', badge:'blue', tag:'Pediatría', rank:7,
  src:'SEUP · Algoritmo: Manejo del dolor agudo en urgencias pediátricas · PDF de 2022 (sin fecha de versión ni autores en el PDF; publicado en la web en mayo de 2024) · https://seup.org/algoritmo-manejo-del-dolor-en-urgencias-pediatricas/',
  docs:[
    {l:'📄 Algoritmo SEUP completo (PDF)', f:'https://seup.org/pdf_public/algoritmos/21_Dolor.pdf'},
    {l:'🌐 Página SEUP', f:'https://seup.org/algoritmo-manejo-del-dolor-en-urgencias-pediatricas/'}
  ],
  steps:[
    {text:'Medir el dolor en todos los pacientes, aunque el motivo de consulta no sea dolor'},
    {text:'Escala adaptada a la edad y desarrollo: autoinforme (numérica, visual analógica, caras Wong-Baker, FPS-R) u observacional (FLACC, LLANTO, FLACC revisada)'},
    {text:'Estratificar: sin dolor, leve, moderado o intenso; SAMPLE y exploración para conocer las características del dolor'},
    {text:'Leve: ibuprofeno (inflamatorio) o paracetamol (no inflamatorio)'},
    {text:'Moderado: ibuprofeno y otros AINE (inflamatorio) o metamizol / opioides menores (no inflamatorio)'},
    {text:'Intenso: opiáceos mayores (fentanilo o cloruro mórfico) con analgesia multimodal para reducir la dosis de opiáceos'},
    {text:'Usar siempre medidas no farmacológicas y coadyuvantes si hay indicación'},
    {text:'Reevaluar el dolor tras el tratamiento'}
  ],
  flow:(() => {
    const f = (x, d) => (Math.round(x * Math.pow(10, d)) / Math.pow(10, d)).toString().replace('.', ',');
    const P = v => (v.peso > 0 ? v.peso : NaN);
    /* r(v, a, b, max, dec, unidad): rango por kg calculado con el peso real, limitado al máximo por dosis. */
    const r = (v, a, b, max, dec, u) => {
      const w = P(v); if (!w) return '';
      const m = max == null ? Infinity : max;
      const lo = Math.min(w * a, m), hi = Math.min(w * b, m);
      return ' <b>= ' + (lo === hi ? f(lo, dec) : f(lo, dec) + '–' + f(hi, dec)) + ' ' + u + '</b>' + (w * b > m ? ' (máximo)' : '');
    };
    const sinPeso = v => (P(v) ? '' : '<br><span class="pe-nota">Introduce el peso arriba para ver las dosis calculadas.</span>');
    const F = n => ({ n: n, inf: false });
    const nivel = v => (isNaN(v.dolor) || v.dolor < 0 ? '' : v.dolor === 0 ? 'sin' : v.dolor <= 3 ? 'leve' : v.dolor <= 6 ? 'mod' : 'int');
    const noFarm = '<br>¡Usar <b>siempre medidas no farmacológicas</b> y coadyuvantes si hay indicación (abajo, «Durante la atención»)!';
    const paraTxt = v => '<b>Paracetamol</b> oral: &gt;10 días–10 años <b>15 mg/kg</b>' + r(v, 15, 15, null, 0, 'mg') + ' cada 4–6 h (máx. 90 mg/kg/día) · &gt;10 años 0,5–1 g cada 4–6 h (máx. 4 g/día) · &lt;10 días 10–15 mg/kg cada 6 h (máx. 60 mg/kg/día).<br>' +
      'Paracetamol IV: &lt;10 kg <b>7,5 mg/kg</b> (máx. 30 mg/kg/día) · 10–50 kg <b>15 mg/kg</b> (máx. 60 mg/kg/día; 2 g/día si 10–33 kg, 3 g/día si 33–50 kg) · &gt;50 kg 1 g (máx. 4 g/día)' +
      (P(v) ? ' → con ' + f(P(v), 1) + ' kg: <b>' + (P(v) < 10 ? f(P(v) * 7.5, 0) + ' mg' : P(v) <= 50 ? f(P(v) * 15, 0) + ' mg' : '1 g') + '</b> cada 4–6 h' : '') + '.';
    const ibuTxt = v => '<b>Ibuprofeno</b> oral (&gt;3 meses): <b>5–10 mg/kg</b>' + r(v, 5, 10, null, 0, 'mg') + ' cada 6–8 h (máx. 40 mg/kg/día o 1,2 g/día) · &gt;40 kg o adultos 400 mg cada 6–8 h.<br>' +
      'Ibuprofeno IV (&gt;6 años o &gt;20 kg): <b>10 mg/kg</b>' + r(v, 10, 10, 400, 0, 'mg') + ' cada 6 h (máx. 400 mg/dosis y 30 mg/kg/día).';
    return {
      inputs: [
        { k: 'peso', l: 'Peso', u: 'kg' },
        { k: 'edad', l: 'Edad', u: 'años' },
        { k: 'dolor', l: 'Puntuación de dolor', u: '0–10' }
      ],
      start: 'inicio',
      escalas: [{ id: 'dolor-eva', para: 'intensidad del dolor en el niño colaborador' }, { id: 'flacc', para: 'dolor en el niño no colaborador o preverbal' }],
      nodes: {
        inicio: {
          t: 'Paso 1: medir la intensidad del dolor',
          show: v => 'Medir el dolor en <b>todos</b> los pacientes, aunque no consulten por dolor. Escala adaptada a la edad y al desarrollo cognitivo; a menudo conviene combinar dos escalas y también puede ser útil preguntar a los padres. Los métodos fisiológicos pueden ayudar, pero en salas de observación.' + sinPeso(v),
          q: '¿Colabora el paciente?',
          opts: [
            { l: 'Niño colaborador: escala de autoinforme', go: 'auto' },
            { l: 'Etapa preverbal, no colaborador o discapacidad cognitiva: escala observacional', go: 'obsv' }
          ]
        },
        auto: {
          t: 'Escalas de autoinforme', escalas: ['dolor-eva'],
          show: '• <b>Escala numérica verbal</b> (0–10: «0 es nada de dolor y 10 el peor dolor imaginable»): 0 no dolor · 2 leve · 4–6 moderado · 8–10 intenso.<br>' +
            '• <b>Escala visual analógica</b> (línea de 100 mm; se mide la marca del niño y da un valor 0–10): 0 no dolor · 1–3 leve · 4–6 moderado · 7–10 intenso.<br>' +
            '• <b>Caras FPS-R</b> (6 caras puntuadas 0, 2, 4, 6, 8, 10) y <b>caras de Wong-Baker</b> («no duele» → «duele el máximo»): 0 no dolor · 2 leve · 4–6 moderado · 8–10 intenso. No usar palabras como «contento» o «triste»; Wong-Baker no sirve para que un tercero valore el dolor.<br>' +
            'Puntúala con la escala «Intensidad del dolor (autoinforme)» y anota el resultado en «Puntuación de dolor».',
          q: 'Paso 2: ¿qué intensidad tiene?',
          opts: [
            { l: 'Sin dolor', go: 'sin', sug: v => nivel(v) === 'sin' },
            { l: 'Dolor leve', go: 'leve', sug: v => nivel(v) === 'leve' },
            { l: 'Dolor moderado', go: 'moderado', sug: v => nivel(v) === 'mod' },
            { l: 'Dolor intenso', go: 'intenso', sug: v => nivel(v) === 'int' }
          ]
        },
        obsv: {
          t: 'Escalas observacionales',
          escalas: ['flacc'],
          show: 'Deben estar validadas para la edad y la situación del paciente. Puntuación 0–10: 0 no dolor · 1–3 leve · 4–6 moderado · 7–10 intenso.<br>' +
            '• <b>FLACC</b> (cara, piernas, actividad, llanto, consuelo; 0–2 cada una): no colaboradores o preverbales; observar 1–2 min al niño despierto.<br>' +
            '• <b>LLANTO</b> (llanto, actitud, normorrespiración, tono postural, observación facial; 0–2 cada una): dolor agudo post-procedimiento o posquirúrgico en preverbales y no colaboradores (no está en la app).<br>' +
            '• <b>FLACC revisada (r-FLACC)</b>: niños con discapacidad cognitiva; se añaden con los padres los comportamientos de dolor propios del niño (no está en la app).<br>' +
            'El algoritmo cita también la escala numérica verbal revisada, sin detallarla.',
          q: 'Paso 2: ¿qué intensidad tiene?',
          opts: [
            { l: 'Sin dolor', go: 'sin', sug: v => nivel(v) === 'sin' },
            { l: 'Dolor leve', go: 'leve', sug: v => nivel(v) === 'leve' },
            { l: 'Dolor moderado', go: 'moderado', sug: v => nivel(v) === 'mod' },
            { l: 'Dolor intenso', go: 'intenso', sug: v => nivel(v) === 'int' }
          ]
        },
        sin: {
          t: 'Sin dolor', c: 'low',
          show: '<b>Mantener la alerta</b> ante la aparición de signos de dolor y volver a medirlo durante la estancia.<br>Destino: el algoritmo no lo especifica; según la patología de base.'
        },
        leve: {
          t: 'Dolor leve', c: 'low',
          show: 'Hacer <b>SAMPLE y exploración física</b> para adaptar la analgesia no solo a la intensidad, sino a las características del dolor.',
          q: '¿Origen del dolor?',
          opts: [
            { l: 'Inflamatorio', go: 'leveInf' },
            { l: 'No inflamatorio', go: 'leveNoInf' }
          ]
        },
        moderado: {
          t: 'Dolor moderado', c: 'mid',
          show: 'Hacer <b>SAMPLE y exploración física</b> para adaptar la analgesia no solo a la intensidad, sino a las características del dolor.',
          q: '¿Origen del dolor?',
          opts: [
            { l: 'Inflamatorio', go: 'modInf' },
            { l: 'No inflamatorio', go: 'modNoInf' }
          ]
        },
        leveInf: {
          t: 'Leve inflamatorio: ibuprofeno', c: 'low',
          show: v => ibuTxt(v) + noFarm + sinPeso(v),
          q: 'Paso 4:',
          opts: [{ l: 'Reevaluar el dolor', go: 'reeval' }]
        },
        leveNoInf: {
          farmacos: ['Paracetamol'],
          t: 'Leve no inflamatorio: paracetamol', c: 'low',
          show: v => paraTxt(v) + noFarm + sinPeso(v),
          q: 'Paso 4:',
          opts: [{ l: 'Reevaluar el dolor', go: 'reeval' }]
        },
        modInf: {
          farmacos: ['Dexketoprofeno'],
          t: 'Moderado inflamatorio: ibuprofeno y otros AINE', c: 'mid',
          show: v => ibuTxt(v) + '<br>Otros AINE (tabla SEUP):<br>' +
            '• <b>Naproxeno</b> oral &gt;2 años <b>5–7,5 mg/kg</b>' + r(v, 5, 7.5, null, 0, 'mg') + ' cada 8–12 h (máx. 1 g/día) · &gt;12 años 200 mg cada 8–12 h · adultos 250–500 mg cada 12 h.<br>' +
            '• <b>Ketorolaco IV</b> 2–16 años <b>0,5 mg/kg</b>' + r(v, 0.5, 0.5, 15, 1, 'mg') + ' (máx. 15 mg/dosis, 60 mg/día, 2 días) · 1 mes–2 años 0,5 mg/kg cada 6–8 h (máx. 2 días). IM 2–16 años 1 mg/kg (máx. 30 mg).<br>' +
            '• <b>Dexketoprofeno</b> oral &lt;14 años (off-label) 12,5 mg cada 4–6 h o 25 mg cada 8 h (máx. 75 mg/día) · IV/IM 50 mg cada 8–12 h (máx. 150 mg/día, &lt;2 días).<br>' +
            '• <b>Ketoprofeno</b> oral 3–14 años 0,5 mg/kg' + r(v, 0.5, 0.5, null, 1, 'mg') + ' cada 6–8 h (máx. 2 mg/kg/día) · &gt;14 años 50 mg cada 6–8 h.<br>' +
            '• Diclofenaco: ver la tabla del PDF (las dosis pediátricas impresas tienen erratas de unidades).' + noFarm + sinPeso(v),
          q: 'Paso 4:',
          opts: [{ l: 'Reevaluar el dolor', go: 'reeval' }]
        },
        modNoInf: {
          farmacos: ['Metamizol', 'Tramadol'],
          t: 'Moderado no inflamatorio: metamizol y opioides menores', c: 'mid',
          show: v => '<b>Metamizol</b> oral (&gt;3 meses o &gt;5 kg): <b>12,5–20 mg/kg</b>' + r(v, 12.5, 20, 2000, 0, 'mg') + ' cada 6 h (máx. 2 g/8 h y 6 g/día). IV/IM (&gt;3 meses): 12,5–20 mg/kg (el PDF lo expresa «/día»); dosis puntual de 40 mg/kg' + r(v, 40, 40, 2000, 0, 'mg') + '; máx. 2 g/8 h. Rectal: 1–3 años 250 mg · 3–11 años 500 mg · adolescentes 1 g, cada 6–8 h.<br>' +
            '<b>Opioides menores</b>:<br>' +
            '• <b>Tramadol</b> &gt;12 años 50–100 mg cada 4–6 h (máx. 400 mg/día) · &lt;12 años (off-label) <b>1–2 mg/kg</b>' + r(v, 1, 2, null, 0, 'mg') + ' en dosis única.<br>' +
            '• <b>Codeína</b> oral/rectal solo &gt;12 años: <b>0,5–1 mg/kg</b>' + r(v, 0.5, 1, 60, 0, 'mg') + ' cada 6 h (máx. 60 mg/dosis o 240 mg/día).' +
            (v.edad >= 0 && v.edad <= 12 ? '<br><span class="pe-nota">Con ' + f(v.edad, 1) + ' años la codeína no está indicada (solo &gt;12 años) y el tramadol es off-label.</span>' : '') + noFarm + sinPeso(v),
          q: 'Paso 4:',
          opts: [{ l: 'Reevaluar el dolor', go: 'reeval' }]
        },
        intenso: {
          farmacos: [F('Fentanilo'), F('Cloruro mórfico'), F('Ketamina')],
          t: 'Dolor intenso: opiáceos mayores', c: 'high',
          show: v => 'Tratamiento con <b>opiáceos mayores (fentanilo o cloruro mórfico)</b>. Intentar <b>analgesia multimodal</b> para reducir en lo posible la dosis de opiáceos.<br>' +
            '• <b>Fentanilo IV/IM</b> 2–12 años (off-label &lt;2 años): <b>1–2 µg/kg</b>' + r(v, 1, 2, 50, 0, 'µg') + ' cada 30–60 min (máx. 50 µg/dosis) · &gt;12 años 25–50 µg cada 1–2 h (máx. 500 µg/4 h).<br>' +
            '• <b>Fentanilo intranasal</b> (&gt;10 kg): <b>1–2 µg/kg</b>' + r(v, 1, 2, 100, 0, 'µg') + ', repetir 0,3–0,5 µg/kg' + r(v, 0.3, 0.5, null, 0, 'µg') + ' cada 3–5 min (máx. 100 µg/dosis o 3 µg/kg)' + (P(v) && P(v) <= 10 ? ' — <b>con ≤10 kg no está indicado por vía IN</b>' : '') + '. Nebulizado 3 µg/kg (máx. 200 µg).<br>' +
            '• <b>Morfina (cloruro mórfico) IV</b>: <b>0,05–0,1 mg/kg</b>' + r(v, 0.05, 0.1, null, 2, 'mg') + ' cada 2–4 h, en 5 min (máx. 15 mg/día) · IM/SC 0,1–0,2 mg/kg' + r(v, 0.1, 0.2, null, 2, 'mg') + ' cada 4 h · perfusión 0,01 mg/kg/h (máx. 0,04 mg/kg/h).<br>' +
            '• <b>Ketamina</b> (tabla de dolor intenso) IV <b>0,5–2 mg/kg</b>' + r(v, 0.5, 2, 50, 1, 'mg') + ' (máx. 50 mg) · IM 4–5 mg/kg' + r(v, 4, 5, 100, 0, 'mg') + ' (máx. 100 mg) · IN off-label 0,5–4 mg/kg.' + noFarm + sinPeso(v),
          q: 'Paso 4:',
          opts: [{ l: 'Reevaluar el dolor', go: 'reeval' }]
        },
        reeval: {
          t: 'Paso 4: reevaluación',
          show: 'Volver a medir el dolor con la escala adecuada tras el tratamiento; si persiste, volver a estratificar (paso 2) y tratar según la nueva intensidad.<br>' +
            'El algoritmo no fija tiempos de reevaluación ni criterios de alta o ingreso: destino según la patología de base.'
        }
      },
      extras: {
        t: 'Durante la atención',
        help: 'Ábrelos cuando hagan falta, en cualquier momento del flujograma.',
        items: [
          {
            l: 'Medidas no farmacológicas', t: 'Medidas no farmacológicas (tablas 21-6 y 21-7)',
            show: '<b>Recomendación A</b>: familia presente en los procedimientos · información previa · distracción (cartas, caleidoscopio, globos) · móvil/tablet · música · ejercicios de respiración · pecho, piel con piel, coger en brazos · sacarosa en lactantes de 0–3 meses. <b>Recomendación B</b>: frío local y vibración en la venopunción.<br>' +
              '<b>Recién nacidos</b>: piel con piel, contención en flexión, voz de los padres, pecho o leche materna, succión no nutritiva, sacarosa 24 % (hasta 3 meses).<br>' +
              '<b>Hasta 1 año</b>: brazos, caricias, música suave, sonajeros, pompas. <b>1–3 años</b>: pompas, molinillos, juguetes con ruido, libros pop-up, canciones, cuentos.<br>' +
              '<b>3–6 años</b>: además juegos de conteo y hablar de sus cosas favoritas. <b>6–12 años</b>: música, pelota antiestrés, caleidoscopio, conteo, su serie favorita.<br>' +
              '<b>13–18 años</b>: música con auriculares, relajación y respiración, humor, realidad virtual, imágenes mentales, móvil o tablet.'
          },
          {
            farmacos: ['Diazepam'],
            l: 'Coadyuvantes', t: 'Coanalgésicos y coadyuvantes (tablas 21-8 y 21-9)',
            show: v => '<b>Neuropático</b>: amitriptilina (inicio 0,1 mg/kg al acostarse' + r(v, 0.1, 0.1, null, 1, 'mg') + '; máx. 0,5–2 mg/kg/día), gabapentina (6–12 años: 5 mg/kg al acostarse el 1.er día, cada 12 h el 2.º, cada 8 h el 3.º; titular a 8–35 mg/kg/día), carbamazepina 10–30 mg/kg/día en 3–4 dosis, anestésicos tópicos o locales.<br>' +
              '<b>Espasmo muscular agudo</b>: diazepam oral 0,12–0,8 mg/kg/día cada 8 h (≥6 meses y &lt;12 años)' + r(v, 0.12, 0.8, null, 1, 'mg/día') + '; ≥12 años 2–10 mg 2–4 veces al día (máx. 10 mg/dosis).<br>' +
              '<b>Espasticidad</b>: baclofeno 0,75–2 mg/kg/día, siempre progresivo; diazepam.<br>' +
              '<b>Dolor óseo, inflamación o compresión</b>: dexametasona 0,2–0,5 mg/kg/día en 3 dosis oral o IV' + r(v, 0.2, 0.5, null, 1, 'mg/día') + '.' + sinPeso(v)
          }
        ]
      }
    };
  })()
});

/* ---------- seup-anafilaxia ---------- */
/* SEUP · Algoritmo «Sospecha de anafilaxia» (PDF mayo 2024) convertido en flujograma.
   Todo el contenido clínico procede del PDF de la SEUP; las dosis se calculan con el peso real. */
window.PROTOCOLS.push({ id:'seup-anafilaxia', ped:true, title:'Anafilaxia pediátrica (SEUP)', sub:'Sospecha de anafilaxia: TEP, adrenalina IM, segunda y tercera línea, observación y alta', badge:'red', tag:'Pediatría', rank:8,
  src:'SEUP · Algoritmo: Sospecha de anafilaxia · PDF mayo 2024 (sin autores en el PDF) · https://seup.org/algoritmo-anafilaxia/',
  docs:[
    {l:'📄 Algoritmo SEUP completo (PDF)', f:'https://seup.org/wp-content/uploads/2024/04/3_Anafilaxia_may2024.pdf'},
    {l:'🌐 Página SEUP', f:'https://seup.org/algoritmo-anafilaxia/'}
  ],
  steps:[
    {text:'Diagnóstico clínico: piel/mucosas + compromiso respiratorio o hipotensión; o ≥2 sistemas tras alérgeno probable; o hipotensión tras alérgeno conocido'},
    {text:'Triaje con TEP: la anafilaxia activa se asocia a TEP inestable (sobre todo lado respiratorio)'},
    {text:'Retirar alérgeno, decúbito supino o semiincorporado (no Trendelenburg), O₂ con reservorio, monitor y acceso venoso'},
    {text:'Adrenalina IM 0,01 mg/kg (máx. 0,5 mg) en cara anterolateral del muslo: única medicación de primera línea'},
    {text:'Shock: SSF 20 ml/kg · estridor: adrenalina nebulizada · broncoespasmo: salbutamol'},
    {text:'Sin respuesta en 5 min: repetir adrenalina IM (cada 5–15 min), líquidos y broncodilatadores'},
    {text:'Refractaria: perfusión de adrenalina y/o glucagón, preparar SRI, contactar con UCIP'},
    {text:'Observación 2, 6 o 12 h según la tabla; alta con autoinyector, plan de evitación y Alergología Infantil'},
    {type:'info', text:'Corticoides y antihistamínicos no son primera línea: nunca retrasan la adrenalina'}
  ],
  flow:(() => {
    const f = (x, d) => (Math.round(x * Math.pow(10, d)) / Math.pow(10, d)).toString().replace('.', ',');
    const P = v => (v.peso > 0 ? v.peso : NaN);
    /* d(v, porKg, max, decimales, unidad): dosis con el peso real y su máximo. */
    const d = (v, k, max, dec, u) => { const w = P(v); return w ? ' <b>= ' + f(Math.min(w * k, max == null ? Infinity : max), dec) + ' ' + u + '</b>' + (max != null && w * k > max ? ' (máximo)' : '') : ''; };
    const sinPeso = v => (P(v) ? '' : '<br><span class="pe-nota">Introduce el peso arriba para ver las dosis calculadas.</span>');
    const F = n => ({ n: n, inf: false });
    /* Hipotensión según la SEUP: lactante TAS <70; 1–10 años <70 + 2 × edad; >10 años <90 (o descenso del 30 % sobre la basal). */
    const umbral = v => (isNaN(v.edad) || v.edad < 0 ? NaN : v.edad < 1 ? 70 : v.edad <= 10 ? 70 + 2 * v.edad : 90);
    const hipoTA = v => { const u = umbral(v); return !isNaN(u) && v.tas > 0 && v.tas < u; };
    const taTxt = v => { const u = umbral(v); if (isNaN(u)) return 'Pon la edad para ver el umbral de hipotensión.'; return 'Umbral de hipotensión para esta edad: <b>TAS &lt;' + f(u, 0) + ' mmHg</b>' + (v.tas > 0 ? (hipoTA(v) ? ' → <b>TAS ' + f(v.tas, 0) + ': hipotensión</b>' : ' → TAS ' + f(v.tas, 0) + ': no cumple el criterio de hipotensión') : '') + '.'; };
    const salbu = v => (P(v) ? (P(v) < 20 ? ' <b>= 2,5 mg</b> (&lt;20 kg)' : P(v) > 20 ? ' <b>= 5 mg</b> (&gt;20 kg)' : ' (con 20 kg exactos el PDF no precisa: 2,5 o 5 mg)') : '');
    const adreIM = v => '<b>Adrenalina IM 0,01 mg/kg</b>' + d(v, 0.01, 0.5, 2, 'mg') + ' (máx. 0,5 mg) = <b>0,01 ml/kg de adrenalina 1 mg/ml sin diluir</b>' + d(v, 0.01, 0.5, 2, 'ml') + ' (máx. 0,5 ml), en la <b>cara anterolateral del muslo</b>.';
    return {
      inputs: [
        { k: 'peso', l: 'Peso', u: 'kg' },
        { k: 'edad', l: 'Edad', u: 'años' },
        { k: 'tas', l: 'TAS', u: 'mmHg' }
      ],
      start: 'inicio',
      escalas: [{ id: 'tep-ped', para: 'triaje de la anafilaxia (TEP)' }],
      nodes: {
        inicio: {
          t: 'Sospecha de anafilaxia: criterios clínicos',
          escalas: ['tep-ped'],
          show: v => 'Reacción alérgica rápida, multisistémica y potencialmente mortal. Diagnóstico <b>clínico</b> si cumple uno de:<br>' +
            '<b>1.</b> Inicio agudo con afectación de <b>piel y/o mucosas</b> (urticaria, prurito, eritema, sofoco, edema de labios, úvula o lengua) + al menos uno: <b>compromiso respiratorio</b> o <b>descenso de la TA</b>/disfunción orgánica (hipotonía, síncope, incontinencia).<br>' +
            '<b>2.</b> Tras exposición a un <b>alérgeno probable</b>, ≥2 de: piel/mucosas · respiratorio · TA baja/disfunción orgánica · síntomas digestivos persistentes.<br>' +
            '<b>3.</b> <b>Descenso de la TA</b> tras exposición a un <b>alérgeno conocido</b>: lactante TAS &lt;70 · 1–10 años TAS &lt;70 + (edad × 2) · &gt;10 años TAS &lt;90 o descenso del 30 % sobre la basal.<br>' +
            taTxt(v) + '<br>Una anafilaxia activa, por definición, se asocia a <b>TEP inestable</b> (casi siempre por el lado respiratorio, aunque puede alterarse cualquiera).' + sinPeso(v),
          q: '¿Cómo está el TEP?',
          opts: [
            { l: 'Inestable', go: 'inestable', sug: v => hipoTA(v) },
            { l: 'Estable (incluido el que consulta asintomático tras un episodio compatible)', go: 'estable' }
          ]
        },
        estable: {
          farmacos: [F('Adrenalina')],
          t: 'TEP estable', c: 'mid',
          show: v => 'Retirar el posible alérgeno.<br>' +
            '<b>Valorar adrenalina IM si cumple criterios de anafilaxia</b>, especialmente si: reacción grave previa · exposición a alérgeno conocido · asma concomitante.<br>' + adreIM(v) + '<br>' +
            'Si consulta <b>asintomático</b> tras un episodio compatible: decisión de adrenalina <b>individualizada</b> según tiempo transcurrido, alérgeno, edad y antecedentes.' + sinPeso(v),
          q: '¿Cómo evoluciona?',
          opts: [
            { l: 'Se mantiene estable', go: 'obs' },
            { l: 'Se inestabiliza (TEP inestable)', go: 'inestable', sug: v => hipoTA(v) }
          ]
        },
        inestable: {
          farmacos: [F('Adrenalina'), 'Cloruro sódico 0,9%', 'Salbutamol'],
          t: 'TEP inestable: ABCDE y primera línea', c: 'high',
          show: v => 'ABCDE · retirar el posible alérgeno · <b>decúbito supino</b> (semiincorporado si hay dificultad respiratoria; no Trendelenburg) · <b>O₂ con mascarilla reservorio</b> · monitor y acceso venoso.<br>' +
            adreIM(v) + ' Es la <b>única medicación de primera línea</b>.<br>' +
            'Según el problema que predomine:<br>' +
            '• <b>Fallo cardiovascular / shock descompensado</b>: segundo acceso venoso o intraóseo + <b>expansión con SSF 20 ml/kg</b>' + d(v, 20, null, 0, 'ml') + '.<br>' +
            '• <b>Obstrucción de vía aérea superior (estridor)</b>: <b>adrenalina nebulizada 0,5 mg/kg</b>' + d(v, 0.5, 5, 1, 'mg') + ' (máx. 5 mg), diluida en SSF hasta 3–5 ml, O₂ a 4–6 l/min.<br>' +
            '• <b>Obstrucción de vía aérea inferior (broncoespasmo)</b>: <b>salbutamol</b> inhalado 5–10 puff o nebulizado (&lt;20 kg 2,5 mg; &gt;20 kg 5 mg)' + salbu(v) + ', diluido en SSF hasta 2,5 ml, O₂ a 6–8 l/min.' + sinPeso(v),
          q: 'Revalorar ABCDE: ¿responde en 5 minutos?',
          opts: [
            { l: 'Estable', go: 'obs' },
            { l: 'No responde en 5 minutos', go: 'segunda' }
          ]
        },
        segunda: {
          farmacos: [F('Adrenalina'), 'Cloruro sódico 0,9%', 'Salbutamol', 'Dexclorfeniramina', 'Metilprednisolona'],
          t: 'Segunda línea', c: 'high',
          show: v => '• <b>Repetir adrenalina IM</b>' + d(v, 0.01, 0.5, 2, 'mg') + ' (se puede repetir cada 5–15 min).<br>' +
            '• <b>Repetir la expansión</b> de líquidos IV (SSF 20 ml/kg' + d(v, 20, null, 0, 'ml') + ').<br>' +
            '• Si hay dificultad respiratoria, <b>repetir broncodilatadores</b>.<br>' +
            '• <b>Valorar corticoides y antihistamínicos</b> para el control de los síntomas cutáneos. No son primera línea ni deben retrasar la adrenalina; corticoides solo en asma mal controlada o anafilaxia refractaria a 2 dosis de adrenalina:<br>' +
            '&nbsp;&nbsp;– <b>Dexclorfeniramina IV 0,15 mg/kg</b>' + d(v, 0.15, 5, 2, 'mg') + ' cada 6–8 h (máx. 5 mg/dosis), sin diluir, en bolo lento.<br>' +
            '&nbsp;&nbsp;– <b>Metilprednisolona IV 1–2 mg/kg</b>' + (P(v) ? ' <b>= ' + f(P(v), 0) + '–' + f(P(v) * 2, 0) + ' mg</b>' : '') + ', después 0,5–2 mg/kg/día en 3 dosis (máx. 120 mg/día). Reconstituir con su disolvente y en bolo.' + sinPeso(v),
          q: 'Revalorar ABCDE: ¿responde en 5 minutos?',
          opts: [
            { l: 'Estable', go: 'obs' },
            { l: 'No responde en 5 minutos', go: 'tercera' }
          ]
        },
        tercera: {
          farmacos: [{ n: 'Adrenalina', inf: 'Adrenalina (perfusión)', mg: 1, vol: 100, dosis: 0.1 }, 'Glucagón', 'Metilprednisolona'],
          t: 'Tercera línea: anafilaxia refractaria', c: 'high',
          show: v => { const w = P(v); return '• <b>Valorar corticoides</b> (metilprednisolona, ver segunda línea).<br>' +
            '• <b>Preparar perfusión de adrenalina IV 0,1–1 µg/kg/min</b>: 1 mg de adrenalina (1 mg/ml) en 100 ml de SSF (10 µg/ml); 1 ml/h = 0,17 µg/min' +
            (w ? ' → con ' + f(w, 1) + ' kg: <b>' + f(w * 0.6, 1) + '–' + f(w * 6, 1) + ' ml/h</b>' : '') + '.<br>' +
            '• <b>Glucagón IV</b> (sobre todo si toma betabloqueantes): <b>20–30 µg/kg/dosis</b>' + (w ? ' <b>= ' + (w * 0.02 >= 1 ? '1' : f(w * 0.02, 2) + '–' + f(Math.min(w * 0.03, 1), 2)) + ' mg</b>' + (w * 0.03 > 1 ? ' (máximo)' : '') : '') + ' (máx. 1 mg), después perfusión a 5–15 µg/min. Reconstituir con 1 ml de agua estéril; uso inmediato.<br>' +
            '• <b>Preparar secuencia rápida de intubación</b> (fármacos y dosis: el algoritmo no los detalla; según protocolo local).<br>' +
            'Vasopresores y glucagón, preferiblemente en UCIP.' + sinPeso(v); },
          q: '¿Mejora?',
          opts: [
            { l: 'Sí, se estabiliza', go: 'obs' },
            { l: 'No mejora', go: 'ucip' }
          ]
        },
        ucip: {
          t: 'Contactar con UCIP', c: 'high',
          show: 'Anafilaxia refractaria sin mejoría tras la tercera línea: <b>contactar con la UCIP</b> para ingreso, manteniendo la perfusión de adrenalina y el soporte ABCDE.'
        },
        obs: {
          t: 'Observación hospitalaria', c: 'mid',
          show: '<b>Alta tras 2 h</b> desde el control de los síntomas si se cumple todo: buena respuesta (5–10 min) a <b>una única dosis</b> de adrenalina dada en los primeros 30 min · resolución completa · dispone de autoinyector y sabe usarlo · vigilancia adecuada al alta.<br>' +
            '<b>Mínimo 6 h</b> tras la resolución si: ha precisado <b>2 dosis</b> de adrenalina o tiene reacciones bifásicas previas.<br>' +
            '<b>Mínimo 12 h</b> si alguno: anafilaxia grave con <b>más de 2 dosis</b> · asma grave o insuficiencia respiratoria grave · absorción continuada del alérgeno (p. ej., medicamento de liberación prolongada) · consulta de noche o puede no responder si empeora · difícil acceso a Urgencias.',
          q: '¿Reaparecen los síntomas durante la observación?',
          opts: [
            { l: 'No, sin recurrencia', go: 'alta' },
            { l: 'Sí: revalorar ABCDE', go: 'inestable' }
          ]
        },
        alta: {
          t: 'Alta con recomendaciones y control en Alergología Infantil', c: 'low',
          show: v => { const w = P(v); return '• Informar del <b>alérgeno sospechado</b> y de los productos que lo contienen; enseñar a reconocer los primeros síntomas.<br>' +
            '• <b>Autoinyector de adrenalina</b>: 0,15 mg para 10–25 kg; 0,3 mg para &gt;25 kg; &lt;10 kg, riesgo-beneficio individual' +
            (w ? ' → con ' + f(w, 1) + ' kg: <b>' + (w < 10 ? 'valoración individual' : w <= 25 ? '0,15 mg' : '0,3 mg') + '</b>' : '') + '.<br>' +
            '• Técnica: sentar al niño en las piernas y sujetarle las piernas con las propias; quitar el tapón y agarrar el autoinyector con todo el puño; apoyarlo en el muslo (sin golpear) y apretar contando 10 s desde el chasquido; masajear 10 s; llamar a Emergencias.<br>' +
            '• Si recibió corticoides: <b>prolongarlos por vía oral 3 días</b> (prednisona 1–2 mg/kg/día' + (w ? ' <b>= ' + f(w, 0) + '–' + f(w * 2, 0) + ' mg/día</b>' : '') + '; el PDF indica «cada 12-14 horas»).<br>' +
            '• Antihistamínico oral si hace falta: cetirizina una vez al día (&lt;20 kg 2,5 mg; 20–30 kg 5 mg; &gt;30 kg 10 mg)' +
            (w ? ' → <b>' + (w < 20 ? '2,5' : w <= 30 ? '5' : '10') + ' mg</b>' : '') + '.<br>' +
            '• <b>Derivar a Alergología Infantil</b> para estudio completo.' + sinPeso(v); }
        }
      }
    };
  })()
});

/* ---------- seup-estatus ---------- */
/* SEUP · Algoritmo 12: Estatus epiléptico (flujograma interactivo).
   Fuente: https://seup.org/algoritmo-epilepsia/ (PDF 12_Epilepsia_ene2025.pdf). */
window.PROTOCOLS.push({ id:'seup-estatus', ped:true, title:'Estatus epiléptico pediátrico (SEUP)', sub:'Minuto 0-5-10-15-30: benzodiacepina sin o con vía IV, 2.ª línea (levetiracetam, valproato, fenitoína) y refractario', badge:'red', tag:'Pediatría', rank:9,
  src:'SEUP · Algoritmo 12: Estatus epiléptico · versión enero 2025 (PDF modificado el 21/12/2024; autores no constan en el PDF) · https://seup.org/algoritmo-epilepsia/',
  docs:[{l:'📄 Algoritmo SEUP completo (PDF)', f:'https://seup.org/wp-content/uploads/2025/01/12_Epilepsia_ene2025.pdf'}, {l:'🌐 Página SEUP', f:'https://seup.org/algoritmo-epilepsia/'}],
  steps:[
    {text:'Min 0: ABCDE, O₂, monitorización, glucemia capilar, intentar acceso venoso; antitérmico si Tª &gt;38 °C; corregir si glucemia &lt;60 mg/dl; analítica (hemograma, electrólitos, tóxicos, niveles de anticomiciales) e historia clínica.'},
    {text:'Min 5 (EE precoz), sin vía IV: midazolam IM 0,2 mg/kg o bucal/intranasal 0,3 mg/kg (máx. 10 mg), o diazepam rectal 0,5 mg/kg (máx. 10 mg).'},
    {text:'Min 5, con vía IV/IO: diazepam IV 0,1–0,2 mg/kg (máx. 5 mg &lt;5 años, 10 mg &gt;5 años) o midazolam IV 0,1–0,2 mg/kg (máx. 5 mg &lt;6 años, 10 mg ≥6 años), en 2 min.'},
    {text:'Min 10: segunda dosis de benzodiacepina IV o IO.'},
    {text:'Min 15 (EE establecido): 1.er fármaco de 2.ª línea: levetiracetam 40–60 mg/kg (máx. 4.500 mg), valproato 40 mg/kg (máx. 3.000 mg) o fenitoína 20 mg/kg (máx. 1.500 mg). Piridoxina 100 mg IV en &lt;3 años.'},
    {text:'Si no cede 5 min después de acabar la perfusión: 2.º fármaco de 2.ª línea, distinto del primero.'},
    {text:'Min 30 (EE refractario): UCIP; midazolam 0,2 mg/kg + 0,05–0,4 mg/kg/h → propofol → tiopental; monitorización EEG.'},
    {type:'info', text:'Todos los fármacos pueden darse por vía intraósea a la misma dosis que por vía IV. Durante todo el proceso: control de constantes y diagnosticar y tratar la causa.'}
  ],
  flow:(() => {
    const ok = x => typeof x === 'number' && x > 0;
    const f = (x, dec) => (Math.round(x * Math.pow(10, dec)) / Math.pow(10, dec)).toString().replace('.', ',');
    /* d(v, mg/kg, máx., decimales, unidad): dosis calculada con el peso real. */
    const d = (v, k, max, dec, u) => ok(v.peso) ? ' <b>= ' + f(Math.min(v.peso * k, max == null ? Infinity : max), dec) + ' ' + u + '</b>' + (max != null && v.peso * k > max ? ' (máximo)' : '') : '';
    /* r(v, mín./kg, máx./kg, tope, decimales, unidad): intervalo calculado. */
    const r = (v, k1, k2, max, dec, u) => {
      if (!ok(v.peso)) return '';
      const tope = max == null ? Infinity : max;
      return ' <b>= ' + f(Math.min(v.peso * k1, tope), dec) + '–' + f(Math.min(v.peso * k2, tope), dec) + ' ' + u + '</b>' + (v.peso * k2 > tope ? ' (con el máximo)' : '');
    };
    const sinPeso = v => ok(v.peso) ? '' : '<br><span class="pe-nota">Introduce el peso real arriba para ver las dosis calculadas.</span>';
    const maxDzp = v => !ok(v.edad) ? null : v.edad < 5 ? 5 : v.edad > 5 ? 10 : null;
    const maxMdz = v => !ok(v.edad) ? null : v.edad < 6 ? 5 : 10;
    const bzdIV = v => {
      const md = maxDzp(v), mm = maxMdz(v);
      return '<b>Diazepam IV 0,1–0,2 mg/kg</b>' + (md ? r(v, 0.1, 0.2, md, 1, 'mg') : '') + ' (máx. <b>5 mg &lt;5 años</b>, <b>10 mg &gt;5 años</b>' + (ok(v.edad) && v.edad === 5 ? '; con 5 años justos el algoritmo no lo precisa' : '') + '), en 2 min<br>' +
        'o <b>midazolam IV 0,1–0,2 mg/kg</b>' + (mm ? r(v, 0.1, 0.2, mm, 1, 'mg') : '') + ' (máx. <b>5 mg &lt;6 años</b>, <b>10 mg ≥6 años</b>), en 2 min.' +
        (ok(v.peso) && !ok(v.edad) ? '<br><span class="pe-nota">Introduce la edad para aplicar el máximo que corresponde.</span>' : '');
    };
    const bzdNota = '<br><span class="pe-nota">Benzodiacepinas: depresión respiratoria, sedación, hipotensión. Contraindicadas en insuficiencia hepática grave y miastenia gravis.</span>';
    const reval = 'Revalorar vía aérea, respiración, circulación y constantes tras cada dosis y cada 5 min mientras siga convulsionando.';
    const segunda = ['lev', 'vpa', 'pht'];
    const segTxt = {
      lev: v => '<b>Levetiracetam IV 40–60 mg/kg</b>' + r(v, 40, 60, 4500, 0, 'mg') + ' en 5 min (máx. 4.500 mg). Si cede: 25–30 mg/kg' + r(v, 25, 30, null, 0, 'mg') + ' cada 12 h IV.<br><span class="pe-nota">Indicado sobre todo en EE mioclónico y no convulsivo. Si ya toma &gt;40 mg/kg/día, probar otro anticonvulsivo; si toma menos, dar la carga.</span>',
      vpa: v => '<b>Valproato sódico IV 40 mg/kg</b>' + d(v, 40, 3000, 0, 'mg') + ' en 5 min (máx. 3.000 mg). Si cede: 1–2 mg/kg/h' + r(v, 1, 2, null, 1, 'mg/h') + ' IV.<br><span class="pe-nota">No en &lt;2 años; precaución de 2 a 4 años. Contraindicado en hepatopatía, pancreatopatía, hiperamoniemia, coagulopatía, enfermedad mitocondrial y metabolopatía. No darlo si ya lo toma a dosis correctas. Fármaco de riesgo reproductivo: precauciones de preparación.</span>' +
        (ok(v.edad) && v.edad < 2 ? '<br><b>Menor de 2 años: no usar valproato.</b>' : ''),
      pht: v => '<b>Fenitoína IV 20 mg/kg</b>' + d(v, 20, 1500, 0, 'mg') + ' en 20 min (1 mg/kg/min; máx. 1.500 mg). Si cede: 7 mg/kg/día' + d(v, 7, null, 0, 'mg/día') + ' en 2 o 3 dosis IV.<br><span class="pe-nota">No indicada en cardiopatía ni en crisis febril parcial unilateral &lt;12 meses. No darla si ya la toma a dosis correctas. Fármaco de riesgo reproductivo: precauciones de preparación.</span>'
    };
    const piridoxina = v => 'Considerar <b>piridoxina 100 mg IV</b>, dosis única, en <b>menores de 3 años</b>' + (ok(v.edad) && v.edad < 3 ? ' <b>(aplica por edad)</b>' : '') + '.';
    const F = n => ({ n: n, inf: false });
    return {
      inputs:[{k:'peso', l:'Peso', u:'kg'}, {k:'edad', l:'Edad', u:'años'}],
      start:'inicio',
      escalas:[
        {id:'tep-ped', para:'impresión inicial (TEP)'},
        {id:'gcsped', para:'consciencia tras la crisis'}
      ],
      nodes:{
        inicio:{
          t:'Minuto 0: estabilización', c:'high', escalas:['tep-ped'], farmacos:['Glucosa'],
          show: v => 'TEP alterado a expensas de la apariencia; si se afectan el lado respiratorio o el circulatorio, más gravedad.<br>' +
            '• <b>ABCDE</b> · oxigenoterapia · monitorización · <b>glucemia capilar</b> · intentar acceso venoso.<br>' +
            '• Si Tª &gt;38 °C: antitérmico. Si glucemia &lt;60 mg/dl: corregir (el algoritmo no da la dosis: según protocolo local).<br>' +
            '• Analítica: hemograma, electrólitos, tóxicos, niveles de anticomiciales · historia clínica.<br>' +
            'Se trata a los <b>5 min</b> en la crisis tónico-clónica generalizada y a los <b>10 min</b> en la focal.' + sinPeso(v),
          q:'¿Tiene vía intravenosa (o intraósea)?',
          opts:[{l:'No', go:'bzdNoIV'}, {l:'Sí', go:'bzdIV'}]
        },
        bzdNoIV:{
          t:'Minuto 5 · EE precoz: benzodiacepina sin vía IV', c:'high', farmacos:[F('Midazolam'), 'Diazepam'],
          show: v => '<b>Midazolam IM 0,2 mg/kg</b>' + d(v, 0.2, 10, 1, 'mg') + ' (máx. 10 mg)<br>' +
            'o <b>midazolam bucal o intranasal 0,3 mg/kg</b>' + d(v, 0.3, 10, 1, 'mg') + ' (máx. 10 mg)<br>' +
            'o <b>diazepam rectal 0,5 mg/kg</b>' + d(v, 0.5, 10, 1, 'mg') + ' (máx. 10 mg).<br>' + reval + bzdNota + sinPeso(v),
          q:'¿Cede la crisis?',
          opts:[{l:'Sí', go:'cede'}, {l:'No: minuto 10', go:'bzd2'}]
        },
        bzdIV:{
          t:'Minuto 5 · EE precoz: benzodiacepina IV', c:'high', farmacos:['Diazepam', F('Midazolam')],
          show: v => bzdIV(v) + '<br>' + reval + bzdNota + sinPeso(v),
          q:'¿Cede la crisis?',
          opts:[{l:'Sí', go:'cede'}, {l:'No: minuto 10', go:'bzd2'}]
        },
        bzd2:{
          t:'Minuto 10: segunda dosis de benzodiacepina IV o IO', c:'high', farmacos:['Diazepam', F('Midazolam')],
          show: v => 'Por vía <b>intravenosa o intraósea</b> (todos los fármacos, a la misma dosis por IO que por IV):<br>' + bzdIV(v) +
            '<br>Preparar ya el fármaco de 2.ª línea.' + bzdNota + sinPeso(v),
          q:'¿Cede la crisis?',
          opts:[{l:'Sí', go:'cede'}, {l:'No: minuto 15', go:'linea2a'}]
        },
        linea2a:{
          t:'Minuto 15 · EE establecido: 1.er fármaco de 2.ª línea', c:'high', farmacos:['Levetiracetam', 'Valproato sódico'],
          show: v => 'Elegir uno (no hay evidencia de que uno sea superior; depende del tipo de EE, contraindicaciones y experiencia del centro):<br>' +
            segunda.map(k => '• ' + segTxt[k](v)).join('<br>') + '<br>' + piridoxina(v) +
            '<br><span class="pe-nota">Fenitoína: sin ficha en la app; la dosis va en el texto.</span>' + sinPeso(v),
          q:'¿Cede 5 min después de acabar la perfusión?',
          opts:[
            {l:'Sí', go:'cedeL2'},
            {l:'No, tras levetiracetam', go:'linea2b'},
            {l:'No, tras valproato', go:'linea2b'},
            {l:'No, tras fenitoína', go:'linea2b'}
          ]
        },
        linea2b:{
          t:'2.º fármaco de 2.ª línea (distinto del primero)', c:'high', farmacos:['Levetiracetam', 'Valproato sódico'],
          show: v => {
            const usado = segunda[(v.resp && v.resp.linea2a) - 1];
            const resto = segunda.filter(k => k !== usado);
            return (usado ? 'Ya se dio ' + {lev:'levetiracetam', vpa:'valproato', pht:'fenitoína'}[usado] + '. Opciones:<br>' : 'Elegir un fármaco distinto del primero:<br>') +
              resto.map(k => '• ' + segTxt[k](v)).join('<br>') + '<br>' + piridoxina(v) + sinPeso(v);
          },
          q:'¿Cede la crisis?',
          opts:[{l:'Sí', go:'cedeL2'}, {l:'No: minuto 30', go:'refractario'}]
        },
        refractario:{
          t:'Minuto 30 · EE refractario: UCIP', c:'high',
          farmacos:[{n:'Midazolam', dosis:0.05, min:0.05, max:0.4, rango:'estatus refractario SEUP'}, {n:'Propofol', dosis:5, min:5, max:10, rango:'estatus refractario SEUP'}],
          show: v => 'Por orden, en la UCIP:<br>' +
            '1. <b>Midazolam 0,2 mg/kg</b>' + d(v, 0.2, null, 1, 'mg') + ' en bolo → <b>0,05–0,4 mg/kg/h</b>' + r(v, 0.05, 0.4, null, 2, 'mg/h') + '.<br>' +
            '2. <b>Propofol 3–5 mg/kg</b>' + r(v, 3, 5, null, 0, 'mg') + ' en bolo → <b>5–10 mg/kg/h</b>' + r(v, 5, 10, null, 0, 'mg/h') + '.<br>' +
            '3. <b>Tiopental 2–3 mg/kg</b>' + r(v, 2, 3, null, 0, 'mg') + ' en bolo → <b>3–5 mg/kg/h</b>' + r(v, 3, 5, null, 0, 'mg/h') + ' (sin ficha en la app).<br>' +
            '<b>Monitorización EEG</b>. Control de constantes; diagnosticar y tratar la causa.<br>' +
            '<span class="pe-nota">Los botones abren la perfusión con la dosis inicial de la SEUP; los rangos del panel son de sedación del adulto.</span>' + sinPeso(v) +
            '<br><b>Destino: UCIP.</b>'
        },
        cede:{
          t:'Crisis cedida tras benzodiacepina', c:'mid', escalas:['gcsped'],
          show: 'Control de constantes <b>cada 15 min</b> hasta que recupere la consciencia.<br>' +
            '<b>Diagnosticar y tratar la causa</b> (ver «Causas y pruebas» abajo).<br>' +
            '<b>Destino</b>: el algoritmo no lo especifica; decidir según la causa, la evolución y el protocolo local.'
        },
        cedeL2:{
          t:'Crisis cedida con fármaco de 2.ª línea', c:'mid', escalas:['gcsped'],
          show: v => 'Seguir con el mantenimiento del fármaco con el que cedió:<br>' +
            '• Levetiracetam 25–30 mg/kg' + r(v, 25, 30, null, 0, 'mg') + ' cada 12 h IV.<br>' +
            '• Valproato 1–2 mg/kg/h' + r(v, 1, 2, null, 1, 'mg/h') + ' IV.<br>' +
            '• Fenitoína 7 mg/kg/día' + d(v, 7, null, 0, 'mg/día') + ' en 2 o 3 dosis IV.<br>' +
            'Control de constantes <b>cada 15 min</b> hasta que recupere la consciencia; diagnosticar y tratar la causa.<br>' +
            '<b>Destino</b>: el algoritmo no lo especifica; decidir según la causa, la evolución y el protocolo local.' + sinPeso(v)
        }
      },
      extras:{
        t:'Durante todo el estatus',
        help:'Ábrelos en cualquier momento del flujograma.',
        items:[
          {l:'Causas y pruebas', t:'Diagnóstico y tratamiento de la causa',
            show:'Buscar a la vez causas potencialmente mortales: hipoglucemia, intoxicaciones, meningitis, lesiones ocupantes de espacio.<br>' +
              '• Tóxicos si hay sospecha · errores innatos del metabolismo según contexto.<br>' +
              '• Punción lumbar (Gram, PCR, cultivo) si se sospecha infección.<br>' +
              '• <b>TAC</b> si crisis focales, traumatismo previo, enfermedad neoplásica, sospecha de infección o hemorragia, y en lactantes. <b>RM</b> si EE refractario de mala evolución y en el seguimiento.'},
          {l:'Revaloración', t:'Revaloración ABC y constantes',
            show:'Al menos: después de cada dosis de anticomicial · cada 5 min mientras siga convulsionando · cada 15 min tras la crisis hasta recuperar la consciencia.'},
          {l:'Fases del estatus', t:'Definición y fases (ILAE 2015)',
            show:'Tratar a los 5 min (tónico-clónica generalizada) o 10 min (focal). <b>Precoz</b> 5–10 min · <b>establecido</b> 10–30 min · <b>refractario</b> 30–60 min o tras 2–3 fármacos de 1.ª y 2.ª línea · <b>superrefractario</b> &gt;24 h pese a anestésicos.'}
        ]
      }
    };
  })()
});

/* ---------- seup-sepsis ---------- */
/* SEUP · Algoritmo 26: Sepsis (mayo 2024). Flujograma por tiempos (0-5, 5-15, 15-60 min) + notas 1-6 y Tabla 26-1. */
window.PROTOCOLS.push({ id:'seup-sepsis', ped:true, title:'Sepsis pediátrica (SEUP)', sub:'Fiebre y TEP alterado: ABCDE, bolos de cristaloide, pruebas, antibiótico empírico e inotrópicos en la 1.ª hora', badge:'red', tag:'Pediatría', rank:10,
  src:'SEUP · Algoritmo 26: Sepsis · PDF mayo 2024 (26_Sepsis_may2024; autores no constan en el PDF) · https://seup.org/algoritmo-sepsis/',
  docs:[{l:'📄 Algoritmo SEUP completo (PDF)', f:'https://seup.org/wp-content/uploads/2024/04/26_Sepsis_may2024.pdf'}, {l:'🌐 Página SEUP', f:'https://seup.org/algoritmo-sepsis/'}],
  steps:[
    {text:'Usar en todo paciente con fiebre y TEP alterado, sobre todo con alteración del comportamiento o de la circulación a la piel'},
    {text:'0-5 min: TEP y ABCDE, O₂ al 100 %, monitorización (ECG, TA, EtCO₂, FR, SatO₂), 2 vías periféricas (IO si shock y no hay vía en 5 min), protección del personal'},
    {text:'5-15 min: bolo de cristaloide 10-20 ml/kg (balanceado de elección; SSF alternativa aceptable), reevaluar; repetir hasta 40-60 ml/kg vigilando sobrecarga'},
    {text:'Pruebas: hemocultivo, PCR de N. meningitidis y S. pneumoniae, gasometría, hemograma, iones, calcio iónico, urea, creatinina, GPT, bilirrubina, lactato, coagulación, PCT y PCR'},
    {text:'15-60 min: antibiótico empírico (&lt;1 mes ampicilina + cefotaxima; &gt;1 mes cefotaxima 75 mg/kg, máx. 2 g)'},
    {text:'Shock que no revierte tras 40-60 ml/kg o sobrecarga: adrenalina o noradrenalina desde 0,05 µg/kg/min (dopamina 5-10 si no hay), SRI y vía central'},
    {text:'Corregir hipocalcemia (gluconato cálcico 10 % 0,5 ml/kg) e hipoglucemia (dextrosa 10 % 3 ml/kg)'},
    {type:'info', text:'El diagnóstico es clínico: ninguna prueba debe retrasar el antibiótico. La PL está contraindicada si hay inestabilidad hemodinámica'}
  ],
  flow:(() => {
    const hay = x => typeof x === 'number' && !isNaN(x) && x > 0;
    const f = (x, dec) => (Math.round(x * Math.pow(10, dec)) / Math.pow(10, dec)).toString().replace('.', ',');
    const d = (v, k, max, dec, u) => hay(v.peso) ? ' <b>= ' + f(Math.min(v.peso * k, max == null ? Infinity : max), dec) + ' ' + u + '</b>' + (max != null && v.peso * k > max ? ' (máximo)' : '') : '';
    const rg = (v, k1, k2, dec, u) => hay(v.peso) ? ' <b>= ' + f(v.peso * k1, dec) + '–' + f(v.peso * k2, dec) + ' ' + u + '</b>' : '';
    const sinPeso = v => hay(v.peso) ? '' : '<br><span class="pe-nota">Introduce el peso real arriba para ver las dosis calculadas.</span>';
    const noUcip = v => v.ruta.includes('hipo');
    const CORREGIR = v => '<b>Corregir hipocalcemia/hipoglucemia</b>:<br>• Hipocalcemia (calcio iónico &lt;1,1 mmol/L o &lt;4,8 mg/dl): <b>gluconato cálcico 10 % 50 mg/kg (0,5 ml/kg)</b>' + d(v, 0.5, 20, 1, 'ml') + ' (máx. 2 g = 20 ml).<br>' +
      '• Hipoglucemia: <b>dextrosa 10 % 0,3 g/kg (3 ml/kg)</b>' + d(v, 3, null, 0, 'ml') + ' a 2-3 ml/min.';
    const SIGUE = {
      q: '¿Persiste el shock tras 40-60 ml/kg de cristaloide o aparecen signos de sobrecarga de fluidos?',
      help: 'Sobrecarga: crepitantes, hepatomegalia, ritmo de galope.',
      opts: [{ l: 'Sí: shock refractario a fluidos o sobrecarga', go: 'vaso' }, { l: 'No: revierte', go: 'revierte' }]
    };
    return {
      inputs: [
        { k: 'peso', l: 'Peso real', u: 'kg' },
        { k: 'edad', l: 'Edad', u: 'años' }
      ],
      start: 'inicio',
      escalas: [{ id: 'tep-ped', para: 'impresión inicial (TEP)' }, { id: 'gcsped', para: 'nivel de conciencia (D)' }, { id: 'psofa', para: 'disfunción orgánica (pSOFA ≥2)' }],
      nodes: {
        inicio: {
          t: '0-5 minutos: sospecha de sepsis', c: 'high',
          escalas: ['tep-ped'],
          show: v => 'Sepsis = disfunción orgánica grave por una respuesta mal regulada a una infección (pSOFA ≥2, no evaluable a la llegada). Usar este algoritmo en <b>todo paciente con fiebre y TEP alterado</b>.<br>' +
            '• Valoración del <b>TEP y ABCDE</b>. Si dos lados del TEP alterados: órdenes de estabilización ya y pedir ayuda.<br>' +
            '• <b>O₂ al 100 %</b>. Considerar instrumentalizar la vía aérea.<br>' +
            '• Monitorización: ECG, TA, EtCO₂, FR y SatO₂.<br>' +
            '• <b>2 vías venosas periféricas</b>; intraósea si shock y no se logra vía periférica en 5 min.<br>' +
            '• D: nivel de conciencia, pupilas, <b>glucemia</b>. E: temperatura, púrpura/petequias (meningococo), antitérmicos, evitar hipotermia.<br>' +
            '• Protección individual del personal sanitario.' + sinPeso(v),
          q: '¿Hay accesibilidad a una Unidad de Cuidados Intensivos Pediátricos?',
          help: 'Cambia la pauta de sueroterapia inicial (nota 3).',
          opts: [{ l: 'Sí, hay UCIP accesible', go: 'bolos' }, { l: 'No hay UCIP accesible', go: 'hipo' }]
        },
        hipo: {
          q: 'Sin UCIP accesible: ¿hay hipotensión?',
          help: 'El algoritmo no define el umbral de hipotensión: usar el de referencia del centro para la edad.',
          opts: [{ l: 'Sí, hipotensión', go: 'bolos' }, { l: 'No hay hipotensión', go: 'mant' }]
        },
        mant: {
          t: 'Sin UCIP y sin hipotensión', c: 'mid',
          show: v => 'Iniciar <b>sueroterapia de mantenimiento</b> (ritmo según protocolo local; el algoritmo no lo especifica). Vigilar la respuesta clínica y los signos de sobrecarga (crepitantes, ritmo de galope, hepatomegalia).<br>' +
            '<b>Pruebas</b> (sin retrasar el antibiótico): hemocultivo, PCR de N. meningitidis y S. pneumoniae (E. coli y S. agalactiae si &lt;3 meses), gasometría, hemograma, iones, calcio iónico, urea, creatinina, GPT, bilirrubina, lactato, coagulación, PCT y PCR. PL solo tras estabilizar.' + sinPeso(v),
          q: 'Siguiente paso (15-60 min)',
          opts: [{ l: 'Antibiótico empírico', go: 'atb' }]
        },
        bolos: {
          t: '5-15 minutos: fluidos y pruebas', c: 'high',
          farmacos: ['Plasmalyte', 'Cloruro sódico 0,9%', { n: 'Ketamina', inf: false }],
          show: v => '• <b>Bolo de cristaloide 10-20 ml/kg</b>' + rg(v, 10, 20, 0, 'ml') + '. Primera opción: cristaloide balanceado; el SSF es alternativa aceptable. Albúmina 5 % como 2.ª línea solo en malaria o dengue.<br>' +
            '• Reevaluar ABCDE y la respuesta.<br>' +
            '• Repetir bolos de 10-20 ml/kg si precisa, hasta <b>' + (noUcip(v) ? '40 ml/kg' : '40-60 ml/kg') + '</b> en la 1.ª hora' + (hay(v.peso) ? ' (<b>' + (noUcip(v) ? f(v.peso * 40, 0) : f(v.peso * 40, 0) + '–' + f(v.peso * 60, 0)) + ' ml</b>)' : '') + (noUcip(v) ? ' (sin UCIP accesible)' : '') + ', vigilando sobrecarga (crepitantes, hepatomegalia, galope).<br>' +
            '• Valorar oxigenoterapia de alto flujo, CPAP o secuencia rápida de intubación (considerar ketamina como sedante).<br>' +
            '• <b>Pruebas</b>: hemocultivo, PCR de N. meningitidis y S. pneumoniae (E. coli y S. agalactiae si &lt;3 meses), gasometría, hemograma, iones, calcio iónico, urea, creatinina, GPT, bilirrubina, lactato, coagulación, PCT y PCR. PL contraindicada si hay inestabilidad hemodinámica.' + sinPeso(v),
          q: 'Siguiente paso (15-60 min)',
          opts: [{ l: 'Antibiótico empírico', go: 'atb' }]
        },
        atb: {
          q: '¿Edad? (pauta antibiótica en niños previamente sanos)',
          help: v => hay(v.edad) ? 'Con los datos: ' + f(v.edad, 2) + ' años (1 mes ≈ 0,08 años).' : 'Pon la edad en años arriba (1 mes ≈ 0,08 años) para que se sugiera la opción.',
          opts: [{ l: '&lt;1 mes', go: 'atb1', sug: v => hay(v.edad) && v.edad < 1 / 12 }, { l: '&gt;1 mes', go: 'atb2', sug: v => hay(v.edad) && v.edad >= 1 / 12 }]
        },
        atb1: Object.assign({
          t: '15-60 minutos: antibiótico (&lt;1 mes)', c: 'high',
          farmacos: ['Gluconato de calcio', 'Glucosa'],
          show: v => '• <b>Ampicilina 75 mg/kg</b>' + d(v, 75, null, 0, 'mg') + ' + <b>cefotaxima 50 mg/kg</b>' + d(v, 50, null, 0, 'mg') + '.<br>' +
            '• Valorar <b>aciclovir 20 mg/kg</b>' + d(v, 20, null, 0, 'mg') + ' si sospecha de infección por VHS.<br>' + CORREGIR(v) + sinPeso(v)
        }, SIGUE),
        atb2: Object.assign({
          t: '15-60 minutos: antibiótico (&gt;1 mes)', c: 'high',
          farmacos: ['Gluconato de calcio', 'Glucosa'],
          show: v => '• <b>Cefotaxima 75 mg/kg</b>' + d(v, 75, 2000, 0, 'mg') + ' (máx. 2 g).<br>' +
            '• Alergia a betalactámicos: <b>aztreonam 30 mg/kg</b>' + d(v, 30, 2000, 0, 'mg') + ' (máx. 2 g).<br>' +
            '• Asociar <b>vancomicina 15 mg/kg</b>' + d(v, 15, 1000, 0, 'mg') + ' (máx. 1 g) si alta prevalencia de S. aureus resistente a meticilina o de S. pneumoniae resistente a cefalosporinas.<br>' +
            '• Asociar <b>clindamicina 10 mg/kg</b>' + d(v, 10, 650, 0, 'mg') + ' (máx. 650 mg) si sospecha de shock tóxico estreptocócico.<br>' + CORREGIR(v) + sinPeso(v)
        }, SIGUE),
        vaso: {
          t: 'Shock refractario a fluidos: inotrópicos', c: 'high',
          farmacos: [{ n: 'Adrenalina', inf: 'Adrenalina (perfusión)', dosis: 0.05 }, { n: 'Noradrenalina', dosis: 0.05 }, { n: 'Dopamina', dosis: 5 }, { n: 'Ketamina', inf: false }],
          show: v => '• <b>Adrenalina o noradrenalina</b>, ambas desde <b>0,05 µg/kg/min</b>' + (hay(v.peso) ? ' (<b>= ' + f(v.peso * 0.05, 2) + ' µg/min</b>)' : '') + ', titulando el efecto. Sin evidencia para preferir una u otra. Alternativa si no están disponibles: <b>dopamina 5-10 µg/kg/min</b>' + rg(v, 5, 10, 0, 'µg/min') + '.<br>' +
            '• Preferible por vía central, pero se admite vía periférica o intraósea si no la hay.<br>' +
            '• <b>Secuencia rápida de intubación</b> (considerar ketamina como sedante; dosis según protocolo local).<br>' +
            '• Canalización de vía central.<br>' +
            '• Refractario a catecolaminas: individualizar 2.º inotrópico, milrinona, levosimendán o terlipresina según PA, SvcO₂ o índice cardiaco.<br>' +
            '<b>Destino: UCIP.</b>' + sinPeso(v) +
            '<br><span class="pe-nota">El algoritmo no indica el destino de forma explícita.</span>'
        },
        revierte: {
          t: 'Shock revertido con fluidos', c: 'mid',
          show: 'Mantener monitorización y reevaluación ABCDE seriada; vigilar sobrecarga hídrica. Completar el estudio del foco (orina, LCR tras estabilizar, otros cultivos e imagen según sospecha) y ajustar el antibiótico.<br>' +
            '<b>Destino: según protocolo local</b> (el algoritmo SEUP no especifica el destino; el shock séptico es dinámico y puede precisar inotrópicos en las horas siguientes).'
        }
      },
      extras: {
        t: 'Información de apoyo (SEUP)',
        items: [
          { l: 'Etiología', t: 'Etiología de la sepsis en Urgencias', show: 'Bacterias (principal causa): N. meningitidis, S. pneumoniae, S. pyogenes (más frecuente con la edad), E. coli (menos con la edad), S. aureus.<br>&lt;3 meses: S. agalactiae y E. coli. Oncológicos con neutropenia: estafilococos coagulasa negativos, S. viridans, P. aeruginosa, Klebsiella, Acinetobacter.<br>Virus: influenza (H1N1), parainfluenza, dengue (sospechar coinfección bacteriana); VHS, enterovirus y parechovirus en neonatos y lactantes pequeños; CMV y VEB en inmunodeprimidos. Hongos (Candida) en inmunodeprimidos o con dispositivos intravasculares. Rickettsias y Plasmodium según epidemiología.' },
          { l: 'Interpretar las pruebas', t: 'Pruebas complementarias', show: 'PCT: cinética más rápida que la PCR; ambas sirven para seguir la respuesta. Leucopenia, trombocitopenia y neutropenia: peor pronóstico. Gasometría: acidosis metabólica por hipoperfusión. Lactato &gt;3,5-4 mmol/L se relaciona con progresión a disfunción orgánica y mortalidad. Hipocalcemia: calcio iónico &lt;1,1 mmol/L (&lt;4,8 mg/dl). TP, TTPa o INR alargados, fibrinógeno bajo y dímero D alto: CID. Las PCR microbiológicas no se afectan por el antibiótico previo.' }
        ]
      }
    };
  })()
});

/* ---------- seup-shock ---------- */
/* SEUP · Algoritmo 27: Shock (mayo 2024). Flujograma por tiempos (0, 5, 15, 60 min) + notas 1-14. */
window.PROTOCOLS.push({ id:'seup-shock', ped:true, title:'Shock pediátrico (SEUP)', sub:'TEP y ABCDE, sobrecarga, bolos de 10 ml/kg, inotrópicos, intubación y manejo según TA y SvcO₂', badge:'red', tag:'Pediatría', rank:11,
  src:'SEUP · Algoritmo 27: Shock · PDF mayo 2024 (27_Shock_may2024; autores no constan en el PDF) · https://seup.org/algoritmo-shock/',
  docs:[{l:'📄 Algoritmo SEUP completo (PDF)', f:'https://seup.org/wp-content/uploads/2024/04/27_Shock_may2024.pdf'}, {l:'🌐 Página SEUP', f:'https://seup.org/algoritmo-shock/'}],
  steps:[
    {text:'TEP alterado a expensas del lado circulatorio; si también la apariencia, shock descompensado'},
    {text:'0 min: O₂ FiO₂ 100 %, dos accesos IV (IO si no hay vía en 90 s), monitorización (FC, FR, SatO₂, TA, capnografía)'},
    {text:'5 min: si hay hepatomegalia/crepitantes o la ecografía muestra mala contractilidad o VCI dilatada no colapsable → inotrópicos antes que fluidos'},
    {text:'Si no: fluidos 10 ml/kg a ritmo rápido (hasta 40-60 ml/kg sin sobrecarga), antibiótico si sospecha de shock séptico, adrenalina IM si anafiláctico, corregir hipoglucemia e hipocalcemia'},
    {text:'15 min: inestable tras ≥3 bolos → inotrópicos (adrenalina en shock frío, noradrenalina en caliente; vía periférica válida) y valorar intubación'},
    {text:'60 min: valorar hidrocortisona; ajustar según TA, SvcO₂ e índice cardiaco (UCI)'},
    {text:'Estable: valorar UCI y tratamiento específico según la causa'},
    {type:'info', text:'Paquete de resucitación: acceso IV/IO &lt;5 min, fluidos &lt;30 min, antibiótico de amplio espectro &lt;60 min, hemocultivo si no demora el antibiótico, inotrópico periférico &lt;60 min'}
  ],
  flow:(() => {
    const hay = x => typeof x === 'number' && !isNaN(x) && x > 0;
    const f = (x, dec) => (Math.round(x * Math.pow(10, dec)) / Math.pow(10, dec)).toString().replace('.', ',');
    const d = (v, k, max, dec, u) => hay(v.peso) ? ' <b>= ' + f(Math.min(v.peso * k, max == null ? Infinity : max), dec) + ' ' + u + '</b>' + (max != null && v.peso * k > max ? ' (máximo)' : '') : '';
    const sinPeso = v => hay(v.peso) ? '' : '<br><span class="pe-nota">Introduce el peso real arriba para ver las dosis calculadas.</span>';
    const bolos = v => v.ruta.filter(n => n === 'fluidos').length;
    const OBJ = v => '<b>Objetivos de mantenimiento</b>: relleno capilar &lt;2 s · presión de perfusión (PAM − PVC) normal = 55 + edad × 1,5' + (v.edad >= 0 && !isNaN(v.edad) ? ' (<b>' + f(55 + v.edad * 1.5, 0) + ' mmHg</b>)' : '') + ' · SvcO₂ &gt;70 % · índice cardiaco 3,3-6 L/min/m².';
    const INTUB = 'Valorar <b>intubación</b> si aumenta el trabajo respiratorio, hipoventila o baja el nivel de consciencia: asegurar buena carga de volumen e inotrópico por vía periférica. Sedante sin efecto cardiovascular (<b>ketamina</b>); etomidato útil pero <b>contraindicado si sospecha de shock séptico</b>; fentanilo o remifentanilo con cautela (rigidez torácica, depresión hemodinámica, sobre todo en neonatos). Relajante: <b>rocuronio</b>; la succinilcolina tiene numerosas contraindicaciones (sobre todo en politraumatizados). Dosis según protocolo local.';
    return {
      inputs: [
        { k: 'peso', l: 'Peso real', u: 'kg' },
        { k: 'edad', l: 'Edad', u: 'años' }
      ],
      start: 'inicio',
      escalas: [{ id: 'tep-ped', para: 'reconocer el shock (TEP)' }],
      nodes: {
        inicio: {
          t: '0 min: reconocimiento y ABCDE', c: 'high',
          escalas: ['tep-ped'],
          show: v => '<b>TEP</b>: alterado a expensas del lado circulatorio (cianosis, palidez, piel moteada). Si también la apariencia: shock descompensado. Si además el lado respiratorio: parada cardiorrespiratoria.<br>' +
            '<b>A</b>: apertura de la vía aérea y aspiración si precisa. <b>B</b>: O₂ FiO₂ 100 % (mascarilla con reservorio).<br>' +
            '<b>C</b>: dos accesos vasculares, preferentemente en vena de gran calibre (antecubital); <b>intraósea si en 90 s no hay vía periférica</b>. La vía central no es adecuada en la atención inicial.<br>' +
            '<b>D</b>: pupilas y AVPU. <b>E</b>: exposición, buscar hemorragias.<br>' +
            'Monitorizar FC, FR, SatO₂, TA y capnografía.' + sinPeso(v),
          q: '5 min: ¿hepatomegalia y/o crepitantes (signos de sobrecarga hídrica)?',
          help: 'También ritmo de galope.',
          opts: [{ l: 'Sí', go: 'inotropicos' }, { l: 'No', go: 'eco' }]
        },
        eco: {
          q: '¿Ecografía a pie de cama sugestiva de mala contractilidad y/o vena cava dilatada no colapsable?',
          help: 'Solo si hay un pediatra con experiencia en ecografía a pie de cama.',
          opts: [{ l: 'Sí', go: 'inotropicos' }, { l: 'No (o no disponible)', go: 'fluidos' }]
        },
        fluidos: {
          t: '5 min: fluidos y tratamiento etiológico', c: 'high',
          farmacos: [{ n: 'Cloruro sódico 0,9%' }, { n: 'Adrenalina', inf: false }, 'Gluconato de calcio', 'Glucosa'],
          show: v => (bolos(v) > 1 ? '<b>Bolo n.º ' + bolos(v) + '</b>' + (hay(v.peso) ? ' (acumulado ≈ ' + f(v.peso * 10 * bolos(v), 0) + ' ml)' : '') + '.<br>' : '') +
            '• <b>Fluidos 10 ml/kg a ritmo rápido</b>' + d(v, 10, null, 0, 'ml') + ' (jeringa o manguito de presión): SSF 0,9 %, Ringer lactato o albúmina 5 % (cristaloide balanceado probablemente indicado de inicio en fase hipotensiva). Puede necesitar hasta 40-60 ml/kg si no hay sobrecarga.<br>' +
            '• <b>Shock séptico</b> (fiebre, petequias, equimosis, foco infeccioso): antibiótico de amplio espectro, con cultivos previos si es posible (pauta: algoritmo SEUP de sepsis).<br>' +
            '• <b>Shock anafiláctico</b> (urticaria, contacto con alérgeno, anafilaxia previa, clínica digestiva o respiratoria): <b>adrenalina 1:1.000 IM 0,01 mg/kg</b>' + d(v, 0.01, 0.3, 2, 'mg') + ' (máx. 0,3 mg = 0,01 ml/kg' + d(v, 0.01, 0.3, 2, 'ml') + ', máx. 0,3 ml).<br>' +
            '• Corregir hipoglucemia e hipocalcemia (dosis: algoritmo SEUP de sepsis).' + sinPeso(v),
          q: '¿Está estable?',
          opts: [{ l: 'Sí', go: 'estable' }, { l: 'No', go: 'nbolos' }]
        },
        nbolos: {
          q: '¿Ha recibido ya ≥3 bolos?',
          help: v => 'Bolos registrados en este flujograma: ' + bolos(v) + '.',
          opts: [{ l: 'Sí, ≥3 bolos', go: 'inotropicos', sug: v => bolos(v) >= 3 }, { l: 'No: repetir bolo de 10 ml/kg', go: 'fluidos', sug: v => bolos(v) < 3 }]
        },
        inotropicos: {
          t: '15 min: inotrópicos', c: 'high',
          farmacos: [{ n: 'Adrenalina', inf: 'Adrenalina (perfusión)' }, { n: 'Noradrenalina' }, { n: 'Ketamina', inf: false }, 'Rocuronio'],
          show: v => (v.ruta.includes('fluidos') ? '' : 'Signos de sobrecarga o mala contractilidad: <b>inotrópicos antes que fluidos</b>.<br>') +
            '• <b>Adrenalina</b> en el shock «frío» (frialdad cutánea, piel moteada, relleno capilar lento).<br>' +
            '• <b>Noradrenalina</b> en el shock «caliente» (piel normal, pulsos saltones, relleno capilar rápido).<br>' +
            'Ambas por vía periférica. El algoritmo de shock no da dosis; el de sepsis SEUP inicia ambas a 0,05 µg/kg/min.<br>' + INTUB,
          q: '¿Está estable?',
          opts: [{ l: 'Sí', go: 'estable' }, { l: 'No', go: 'refractario' }]
        },
        refractario: {
          t: '60 min: shock refractario', c: 'high',
          farmacos: ['Hidrocortisona'],
          show: v => '• <b>Valorar hidrocortisona</b> si sospecha de insuficiencia adrenal (sobre todo en el shock séptico; dosis según protocolo local, el algoritmo no la da).<br>' +
            '• En fases iniciales se guía por la SatO₂; en mantenimiento (UCI), SvcO₂ &gt;70 %.<br>' + OBJ(v),
          q: '¿Qué situación hemodinámica tiene?',
          opts: [
            { l: 'TA normal · shock frío · SvcO₂ &lt;70 % / Hb &gt;10 g/dl con adrenalina', go: 'frionormo' },
            { l: 'TA baja · shock frío · SvcO₂ &lt;70 % / Hb &gt;10 g/dl con adrenalina', go: 'friohipo' },
            { l: 'TA normal · shock caliente · SvcO₂ &lt;70 % con noradrenalina', go: 'caliente' }
          ]
        },
        frionormo: {
          t: 'Shock frío normotenso', c: 'high',
          farmacos: ['Nitroprusiato sódico'],
          show: v => '• Comenzar infusión de <b>milrinona</b>.<br>• Añadir <b>nitroprusiato</b> si índice cardiaco &lt;3,3 L/min/m² con resistencias vasculares altas y mala perfusión.<br>• Valorar <b>levosimendán</b> si no responde.<br>' + OBJ(v) + '<br><b>Destino: UCI.</b>' +
            '<br><span class="pe-nota">Milrinona y levosimendán no tienen ficha en la app; dosis según protocolo local.</span>'
        },
        friohipo: {
          t: 'Shock frío hipotenso', c: 'high',
          farmacos: [{ n: 'Noradrenalina' }, { n: 'Dobutamina' }],
          show: v => '• Añadir <b>noradrenalina</b> para conseguir una presión arterial normal.<br>• Si índice cardiaco &lt;3,3 L/min/m²: añadir <b>dobutamina, milrinona o levosimendán</b>.<br>' + OBJ(v) + '<br><b>Destino: UCI.</b>'
        },
        caliente: {
          t: 'Shock caliente normotenso', c: 'high',
          farmacos: [{ n: 'Adrenalina', inf: 'Adrenalina (perfusión)' }, { n: 'Dobutamina' }],
          show: v => '• Si normovolémico: añadir <b>vasopresina</b> (dosis pediátrica según protocolo local).<br>• Si índice cardiaco &lt;3,3 L/min/m²: añadir <b>adrenalina, dobutamina o levosimendán</b>.<br>' + OBJ(v) + '<br><b>Destino: UCI.</b>'
        },
        estable: {
          t: 'Paciente estable', c: 'mid',
          show: '• <b>Valorar traslado a UCI.</b><br>• Anamnesis y exploración detalladas en busca de la causa y <b>tratamiento específico según la causa</b> (hipovolémico, cardiogénico, séptico, anafiláctico: ver «Causas de shock» abajo).'
        }
      },
      extras: {
        t: 'Información de apoyo (SEUP)',
        items: [
          { l: 'Causas de shock', t: 'Causas de shock', show: '<b>Hipovolémico</b>: pérdida de líquidos o electrolitos (vómitos, diarrea, poliuria, sudoración); hemorragia (traumatismo, cirugía, sangrado digestivo); tercer espacio (quemaduras, escape capilar); aportes insuficientes (hipogalactia en neonatos).<br><b>Cardiogénico</b>: miocarditis/miocardiopatías, errores congénitos del metabolismo, causa hipóxico-isquémica, enfermedades del tejido conectivo, neuromusculares, fármacos, traumatismo cardiaco, arritmias.<br><b>Séptico.</b> <b>Anafiláctico.</b>' },
          { l: 'Paquete de resucitación', t: 'Paquete de medidas de resucitación', show: '• Acceso IV o intraóseo antes de 5 minutos.<br>• Fluidoterapia IV adecuada iniciada antes de 30 minutos.<br>• Antibioterapia de amplio espectro antes de 60 minutos.<br>• Hemocultivo si no demora el antibiótico.<br>• Inotrópico por vía periférica antes de 60 minutos.' },
          { l: 'Objetivos terapéuticos', t: 'Objetivos en la fase de mantenimiento', show: v => OBJ(v) + '<br>Shock normotenso con bajo gasto y resistencias altas: puede ser útil un vasodilatador (nitroprusiato o milrinona).' }
        ]
      }
    };
  })()
});

/* ---------- seup-toxicos ---------- */
/* SEUP · Algoritmo 13: Exposición a tóxicos (flujograma interactivo).
   Fuente: https://seup.org/algoritmo-toxicos/ (PDF 13_Intoxicaciones_may2024.pdf). */
window.PROTOCOLS.push({ id:'seup-toxicos', ped:true, title:'Exposición a tóxicos en pediatría (SEUP)', sub:'Valoración del riesgo, descontaminación (carbón activado, lavado intestinal, externa), eliminación, antídotos, pruebas, aspectos legales y destino', badge:'amber', tag:'Pediatría', rank:12,
  src:'SEUP · Algoritmo 13: Exposición a tóxicos · versión mayo 2024 (PDF del 24/04/2024; autores no constan en el PDF) · https://seup.org/algoritmo-toxicos/',
  docs:[{l:'📄 Algoritmo SEUP completo (PDF)', f:'https://seup.org/wp-content/uploads/2024/04/13_Intoxicaciones_may2024.pdf'}, {l:'🌐 Página SEUP', f:'https://seup.org/algoritmo-toxicos/'}],
  steps:[
    {text:'Inestable: evaluación y estabilización ABCDE (naloxona si opiáceos o depresión neurológica y respiratoria, glucemia, convulsiones, arritmias, descontaminación externa).'},
    {text:'Estable: valoración del riesgo. Sin riesgo (sin clínica, sustancia no tóxica o dosis no tóxica, ingesta no intencionada) → alta con normas preventivas.'},
    {text:'Con riesgo: monitorización y tratamiento de soporte.'},
    {text:'Descontaminación digestiva solo si: verdadera intoxicación por sustancia recuperable, &lt;1–2 h (hasta 6 h si hipoperistaltismo), sin riesgo de aspiración y sin contraindicaciones. Elección: carbón activado 1 g/kg (máx. 50 g).'},
    {text:'Lavado intestinal total en intoxicación grave por hierro, litio o potasio, liberación retardada &gt;2 h, body packers o parches.'},
    {text:'Valorar: descontaminación cutánea u ocular, técnicas que aumentan la eliminación, antídotos, pruebas complementarias y actuación social o legal.'},
    {text:'Observación si hay clínica o es esperable; ingreso si puede tardar en aparecer o ser grave; UCIP si toxicidad grave. Si no, alta con medidas preventivas.'},
    {type:'info', text:'Sobreingesta con fin suicida: la anamnesis no es fiable; considerar siempre la exposición potencialmente tóxica.'}
  ],
  flow:(() => {
    const ok = x => typeof x === 'number' && x > 0;
    const f = (x, dec) => (Math.round(x * Math.pow(10, dec)) / Math.pow(10, dec)).toString().replace('.', ',');
    const d = (v, k, max, dec, u) => ok(v.peso) ? ' <b>= ' + f(Math.min(v.peso * k, max == null ? Infinity : max), dec) + ' ' + u + '</b>' + (max != null && v.peso * k > max ? ' (máximo)' : '') : '';
    const r = (v, k1, k2, max, dec, u) => {
      if (!ok(v.peso)) return '';
      const tope = max == null ? Infinity : max;
      return ' <b>= ' + f(Math.min(v.peso * k1, tope), dec) + '–' + f(Math.min(v.peso * k2, tope), dec) + ' ' + u + '</b>' + (v.peso * k2 > tope ? ' (con el máximo)' : '');
    };
    const sinPeso = v => ok(v.peso) ? '' : '<br><span class="pe-nota">Introduce el peso real arriba para ver las dosis calculadas.</span>';
    const sig = { l:'Continuar', go:'externa' };
    const prevencion = 'Guardar medicamentos y productos tóxicos en su envase original, cerrados con llave y fuera de la vista y del alcance (baño, hogar, garaje, cocina, jardín, tabaco, alcohol y drogas) · pestillos de seguridad · pilas de botón fuera del alcance · no llamar «caramelo» a la medicina · desechar la medicación sobrante · no tomar medicación delante de los niños · envases con cierre de seguridad · revisar estufas y detectores de humo y CO · tener a mano el teléfono del Instituto Nacional de Toxicología · aplicarlo también en casa de los abuelos.';
    return {
      inputs:[{k:'peso', l:'Peso', u:'kg'}, {k:'edad', l:'Edad', u:'años'}],
      start:'inicio',
      escalas:[
        {id:'tep-ped', para:'impresión inicial (TEP)'},
        {id:'gcsped', para:'nivel de consciencia'}
      ],
      nodes:{
        inicio:{
          t:'Exposición a tóxicos', escalas:['tep-ped'],
          show: v => 'Triángulo de Evaluación Pediátrica para decidir si está estable.' + sinPeso(v),
          q:'¿El paciente está estable?',
          opts:[{l:'Estable', go:'riesgo'}, {l:'Inestable', go:'abcde'}]
        },
        abcde:{
          t:'Evaluación y estabilización ABCDE', c:'high',
          farmacos:[{n:'Naloxona', inf:false}, 'Glucosa', 'Bicarbonato sódico', 'Sulfato de magnesio', {n:'Midazolam', inf:false}, 'Diazepam'],
          show: v => '<b>A</b>: abrir la vía aérea; valorar intubación (sobre todo si depresión neurológica o afectación respiratoria alta por cáusticos o gases irritantes). Control cervical si hay traumatismo.<br>' +
            '<b>B</b>: soporte respiratorio (de oxigenoterapia a ventilación). <b>O₂ 100 %</b> si gases asfixiantes (CO, cianhídrico…).<br>' +
            '<b>C</b>: acceso vascular; <b>SSF 10 ml/kg</b>' + d(v, 10, null, 0, 'ml') + ' si shock. Arritmias según el tóxico: <b>bicarbonato sódico</b> si arritmia ventricular con QRS ancho por bloqueo de canales de sodio (antidepresivos cíclicos, antiarrítmicos IA y IC, difenhidramina, carbamazepina, cloroquina, bupropión); <b>sulfato de magnesio</b> si torsade de pointes.<br>' +
            '<b>D</b>: oxígeno; detectar y tratar la <b>hipoglucemia</b>; valorar <b>naloxona</b> si opiáceos o tóxico desconocido con depresión neurológica y respiratoria, sobre todo con pupilas puntiformes; tratar convulsiones y agitación con <b>benzodiacepinas</b>.<br>' +
            '<b>E</b>: hiper o hipotermia; iniciar la descontaminación externa (urgente si cáusticos); lesiones externas.<br>' +
            '<span class="pe-nota">El algoritmo no da las dosis de estos fármacos: ver la ficha o el Manual de Intoxicaciones SEUP.</span>' + sinPeso(v),
          q:'Una vez estabilizado:',
          opts:[{l:'Continuar con monitorización y soporte', go:'monit'}]
        },
        riesgo:{
          t:'Valoración del riesgo',
          show:'Recoger SIEMPRE: sustancia, presentación y dosis (la máxima posible) · vía · causa · tiempo desde el contacto · medidas previas · síntomas · antecedentes · constantes (Tª, FC, FR, TA; SatO₂ y glucemia en casos seleccionados) · exploración completa con especial atención a lo neurológico y a los signos guía.',
          q:'¿Hay alguna situación de riesgo?',
          help:'Clínica de toxicidad · contacto con sustancia tóxica a dosis tóxica o desconocida · sustancia que no se puede identificar · exposición con fin suicida o en contexto de maltrato.<br>' +
            'Ingesta no tóxica solo si se cumple todo: producto y composición conocidos con certeza · incluido en la tabla de mínimamente tóxicos · sin pictogramas de peligro · información fiable de que no es gran cantidad · sin signos de aspiración · asintomático · no intencionada · sin signos de alarma social.',
          opts:[{l:'Sí', go:'monit'}, {l:'No', go:'altaPrev'}]
        },
        altaPrev:{
          t:'Sin riesgo: alta con normas preventivas', c:'low',
          show:'<b>Destino: alta</b> con normas preventivas.<br>' + prevencion
        },
        monit:{
          t:'Monitorización y tratamiento de soporte', c:'mid',
          show:'Observación con control de constantes y del nivel de consciencia. <b>Acceso venoso</b> si toxicidad moderada o grave, o sustancia muy tóxica a dosis bajas. <b>Monitorización cardiaca</b> si puede haber cardiotoxicidad. Monitorizar órganos según el tóxico (p. ej., función hepática con paracetamol). Tratamiento de soporte.',
          q:'¿Está indicada la descontaminación digestiva?',
          help:'Solo si se cumplen las 4: verdadera intoxicación por una sustancia recuperable · &lt;2 h (mejor &lt;1 h) desde la ingesta, hasta 6 h si hipoperistaltismo (coma, tóxicos que enlentecen el tránsito, con circulación enterohepática o que forman conglomerados) · alerta sin riesgo de aspiración, o intubado · sin contraindicaciones.',
          opts:[
            {l:'Sí, y la sustancia es adsorbible por carbón activado', go:'carbon'},
            {l:'No, o la sustancia no es adsorbible', go:'lavadoQ'}
          ]
        },
        carbon:{
          t:'Carbón activado', c:'mid', farmacos:['Carbón activado'],
          show: v => '<b>1 g/kg por vía oral</b>' + d(v, 1, 50, 0, 'g') + ' (máx. 50 g), mejor en la 1.ª hora. Puede mezclarse con zumo, agua, bebida de cola o chocolate (sin leche). La sonda nasogástrica aumenta las complicaciones y no reduce la broncoaspiración.<br>' +
            '<b>Contraindicado</b>: vía aérea no protegida con disminución de consciencia · obstrucción o riesgo de hemorragia o perforación digestiva · cáusticos e hidrocarburos.<br>' +
            'No adsorbe (<b>PHAILS</b>): pesticidas, hidrocarburos, ácidos, álcalis, alcoholes, hierro y metales pesados, litio, disolventes.' + sinPeso(v),
          q:'Siguiente paso:', opts:[sig]
        },
        lavadoQ:{
          q:'¿Hay indicación de lavado intestinal total?',
          help:'Intoxicación grave por sustancias no adsorbibles (hierro, litio, potasio) · liberación retardada o cubierta entérica con &gt;2 h · ingesta de parches o de paquetes de drogas (body packers).',
          opts:[{l:'Sí', go:'lavado'}, {l:'No', go:'externa'}]
        },
        lavado:{
          t:'Lavado intestinal total', c:'mid',
          show: v => '<b>Macrogol 4000</b>: cada sobre en 250 ml de agua, hasta que el líquido salga claro (4–6 h).<br>' +
            '• &gt;9 meses y &lt;6 años: por sonda nasogástrica, <b>250–500 ml/h</b>.<br>• &gt;6 años: <b>1.000 ml/h</b>.<br>• Adolescente: <b>1.500–2.000 ml/h</b>.' +
            (ok(v.edad) ? (v.edad > 0.75 && v.edad < 6 ? '<br><b>Por la edad: 250–500 ml/h por sonda.</b>' : v.edad <= 0.75 ? '<br><span class="pe-nota">El algoritmo no da el ritmo para ≤9 meses.</span>' : '') : '') +
            '<br><b>Contraindicado</b>: compromiso respiratorio, vía aérea no protegida, inestabilidad hemodinámica, obstrucción, perforación o hemorragia digestiva.',
          q:'Siguiente paso:', opts:[sig]
        },
        externa:{
          q:'¿Necesita descontaminación cutánea u ocular?',
          opts:[{l:'Sí', go:'externaSi'}, {l:'No', go:'elim'}]
        },
        externaSi:{
          t:'Descontaminación externa', c:'mid',
          show:'Cuanto antes: <b>agua abundante al menos 15 min</b>. Con cáusticos o corrosivos es una emergencia, dentro del ABCDE. Piel y ojos: agua o Diphoterine®; ojos también con suero fisiológico, mucho caudal y baja presión, mínimo 15 min. Sustancias liposolubles (hidrocarburos, pesticidas): agua y jabón abundantes, con protección del personal.',
          q:'Siguiente paso:', opts:[{l:'Continuar', go:'elim'}]
        },
        elim:{
          q:'¿Están indicadas técnicas que aumenten la eliminación? (excepcional en pediatría)',
          opts:[{l:'Sí', go:'elimSi'}, {l:'No', go:'antidoto'}]
        },
        elimSi:{
          t:'Técnicas que aumentan la eliminación', c:'mid', farmacos:['Carbón activado', 'Bicarbonato sódico'],
          show: v => '<b>Dosis repetidas de carbón activado</b>: tóxicos con circulación enterohepática (amatoxinas, lamotrigina), fenobarbital, teofilina, megadosis, liberación retardada o bezoares. Tras la dosis inicial, <b>0,25–0,5 g/kg</b>' + r(v, 0.25, 0.5, 25, 1, 'g') + ' (máx. 25 g) cada 3–6 h hasta 24 h. Sin catárticos.<br>' +
            '<b>Alcalinización de la orina</b>: salicilatos moderada-grave sin criterios de hemodiálisis (pauta según protocolo local).<br>' +
            '<b>Depuración extrarrenal</b>: intoxicación grave por alcoholes tóxicos, barbitúricos, carbamazepina, fenitoína, litio, metformina, talio, teofilina, salicilatos y valproato (recomendaciones EXTRIP).' + sinPeso(v),
          q:'Siguiente paso:', opts:[{l:'Continuar', go:'antidoto'}]
        },
        antidoto:{
          q:'¿Está indicado algún antídoto?',
          opts:[{l:'Sí', go:'antidotoSi'}, {l:'No', go:'pruebas'}]
        },
        antidotoSi:{
          t:'Antídotos', c:'mid',
          farmacos:[{n:'Naloxona', inf:false}],
          show:'En casos seleccionados. El algoritmo remite para indicaciones y dosis pediátricas al <b>Manual de Intoxicaciones del GT de Intoxicaciones de la SEUP</b> (seup.org/pdf_public/gt/intox_manual3_enr.pdf) y a la Guía de antídotos de la SCFC (redantidotos.org/antidotos).<br>' +
            '<span class="pe-nota">Botones: solo antídotos con ficha en la app. N-acetilcisteína y otros no tienen ficha: consultar el manual.</span>',
          q:'Siguiente paso:', opts:[{l:'Continuar', go:'pruebas'}]
        },
        pruebas:{
          q:'¿Necesita exámenes complementarios?',
          opts:[{l:'Sí', go:'pruebasSi'}, {l:'No', go:'social'}]
        },
        pruebasSi:{
          t:'Exámenes complementarios', c:'mid',
          show:'Según la toxicidad esperable o la clínica:<br>' +
            '• <b>Analítica</b> si toxicidad moderada o grave, parámetros que vigilar o niveles útiles (paracetamol, aspirina, etanol, etilenglicol, metanol, teofilina, digoxina, hierro, litio): gasometría, iones, anion gap, glucosa, transaminasas, urea, creatinina; coagulación si hepatotoxicidad; CK si rabdomiólisis.<br>' +
            '• <b>ECG</b> si sustancia cardiotóxica o desconocida, o clínica cardiovascular.<br>' +
            '• <b>Tóxicos en orina</b> solo si cambia el manejo: clínica cardiológica, neurológica o psiquiátrica no explicada · coma con intoxicación etílica · &lt;12 años con sospecha de droga de abuso · sospecha de sumisión química. Muchos falsos positivos: confirmar si tiene repercusión legal.<br>' +
            '• <b>Rx de tórax</b>: volátiles con neumonitis, cáusticos con neumomediastino, sospecha de aspiración o edema pulmonar. <b>Rx de abdomen</b>: sustancias radioopacas (hierro, plomo, mercurio, yoduros, potasio, bismuto) y paquetes de drogas.<br>' +
            '• <b>TAC craneal</b>: sospecha de hemorragia (cocaína, simpaticomiméticos), TCE asociado o edema cerebral por hipoxemia.',
          q:'Siguiente paso:', opts:[{l:'Continuar', go:'social'}]
        },
        social:{
          q:'¿Requiere actuación a nivel social o legal?',
          opts:[{l:'Sí', go:'socialSi'}, {l:'No', go:'obsQ'}]
        },
        socialSi:{
          t:'Actuación social o legal', c:'mid',
          show:'• <b>Trabajo social</b>: circunstancias poco claras, sospecha de negligencia o episodios previos.<br>' +
            '• <b>Parte judicial</b>: en todas las situaciones anteriores y en el adolescente con intoxicación voluntaria.<br>' +
            '• <b>Comunicación urgente al juzgado de guardia</b>: sospecha de maltrato, intoxicación con fin criminal, transporte intracorporal de drogas o resultado de muerte.',
          q:'Siguiente paso:', opts:[{l:'Continuar', go:'obsQ'}]
        },
        obsQ:{
          q:'¿Necesita observación o ingreso?',
          help:'Observación si hay clínica de toxicidad o es esperable. Ingreso hospitalario si la clínica puede tardar en aparecer (liberación retardada, sulfonilureas), si es grave o puede llegar a serlo, si necesita protección o evaluación psiquiátrica (maltrato, intento de suicidio) o por circunstancias familiares (angustia no resuelta, difícil acceso a la atención, pocas garantías de vigilancia en casa).',
          opts:[{l:'Sí', go:'uciQ'}, {l:'No', go:'altaMed'}]
        },
        uciQ:{
          q:'¿Necesita UCIP?',
          help:'Indicación principal: toxicidad grave que puede precisar soporte vital avanzado o monitorización invasiva.',
          opts:[{l:'Sí', go:'ucip'}, {l:'No', go:'ingreso'}]
        },
        ucip:{
          t:'Destino: UCIP', c:'high',
          show:'<b>Ingreso en UCIP</b> por toxicidad grave (soporte vital avanzado o monitorización invasiva).'
        },
        ingreso:{
          t:'Destino: observación o ingreso hospitalario', c:'mid',
          show:'<b>Observación en Urgencias</b> si hay clínica o es esperable. <b>Ingreso hospitalario</b> si el periodo de aparición es prolongado, la clínica es o puede ser grave, o por necesidad de protección, evaluación psiquiátrica o circunstancias familiares.'
        },
        altaMed:{
          t:'Destino: alta con medidas preventivas', c:'low',
          show:'<b>Alta</b> con normas preventivas.<br>' + prevencion
        }
      },
      extras:{
        t:'Consulta rápida',
        help:'Ábrelos en cualquier momento del flujograma.',
        items:[
          {l:'Sobreingesta con fin suicida', t:'Sobreingesta medicamentosa con fin suicida',
            show:'El algoritmo pide tener en cuenta sus peculiaridades. En las notas: la anamnesis no es fiable y la exposición se considera siempre potencialmente tóxica · parte judicial en el adolescente con intoxicación voluntaria · el ingreso puede indicarse por necesidad de protección o evaluación psiquiátrica.'},
          {l:'Falsos positivos en orina', t:'Falsos positivos del inmunoensayo (tabla 13-1)',
            show:'<b>Anfetaminas</b> (muy poco específica): bupropión, metilfenidato, pseudoefedrina, efedrina, fenilefrina, labetalol, metformina, ranitidina, trazodona, aripiprazol, atomoxetina, inhaladores con L-metanfetamina, entre otros.<br>' +
              '<b>Antidepresivos tricíclicos</b>: antihistamínicos, carbamazepina, ciclobenzaprina, cicloheptadina, fenotiacinas, quetiapina.<br>' +
              '<b>Barbitúricos</b>: AINE, fenitoína. <b>Benzodiacepinas</b>: efavirenz, sertralina, fluoxetina, entre otros.<br>' +
              '<b>Cannabis</b>: AINE, efavirenz, IBP, raltegravir, dronabinol. <b>Cocaína</b>: té de coca, anestésicos tópicos con cocaína.<br>' +
              '<b>Metadona</b>: difenhidramina, doxilamina, verapamilo, entre otros. <b>Opiáceos</b>: fluoroquinolonas, quinina, rifampicina, semillas de amapola, dextrometorfano.'},
          {l:'Normas preventivas al alta', t:'Normas preventivas al alta', show: prevencion}
        ]
      }
    };
  })()
});
