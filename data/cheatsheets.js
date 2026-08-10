window.CHEATSHEETS = [
  // ── Section 1: Sindrome critico / Shock ──
  {
    id: 'c1',
    title: 'Sepsis / Shock séptico',
    badge: 'red',
    badgeLabel: 'Crítico',
    section: 'Síndrome crítico / Shock',
    sectionIcon: '🔴',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> fiebre + hipotensión + foco _
<span class="key">Vitales:</span> FC _ · FR _ · TA _/_ · SpO₂ _% · Tª _
<span class="key">Analítica:</span> Lac _ · PCR _ · PCT _ · Cr _ · Bil _
          Leucos _ · Plaquetas _ · TP _
<span class="key">Hemocultivos:</span> S·N (extraídos antes ATB: S·N)
<span class="key">Foco:</span> pulmonar/urinario/abdominal/catéter/_
<span class="key">Fluidoterapia previa:</span> _ ml cristaloide
<span class="key">AP:</span> inmunosupresión S·N · DM S·N · neoplasia S·N
<span class="alert">⚠ Hora inicio síntomas: _h · qSOFA: calcular</span>
<span class="note">→ Escalas: qSOFA · SOFA · SAPS II</span>`
  },
  {
    id: 'c2',
    title: 'SCA — Síndrome coronario agudo',
    badge: 'red',
    badgeLabel: 'Crítico',
    section: 'Síndrome crítico / Shock',
    sectionIcon: '🔴',
    html: `<span class="key">/URG SCA</span>
<span class="key">Edad/Sexo/Peso:</span> <span class="val">_a / M·F / _kg</span>
<span class="key">Motivo:</span> dolor torácico _ min evolución
<span class="key">Tiempo desde inicio del dolor:</span> _ h
<span class="key">Vitales:</span> FC _ · PAS _ · TA _/_ · SpO₂ _% · FR _
<span class="key">Killip:</span> I · II · III · IV
<span class="key">PCR (parada) al ingreso:</span> S·N
<span class="key">ECG:</span> ritmo _ · localización ST↑ _ (ant/inf/lat/post)
     desviación ST ≥0,5 mm S·N · BRIHH nuevo S·N
<span class="key">Troponina elevada:</span> S·N (h0 _ · h1/h3 _) · CK _
<span class="key">Analítica:</span> Creatinina _ mg/dL · Hematocrito _ % · Hb _
<span class="key">Irradiación:</span> brazo izq/mandíbula/espalda/_ · Diaforesis S·N
<span class="key">Antecedentes:</span> DM · HTA · DL · tabaco · EC previa (estenosis ≥50%)
     enf. vascular periférica/cerebral · IC · antec. familiares precoces
<span class="key">AAS en los 7 días previos:</span> S·N
<span class="key">Antiagregación/ACO previa:</span> _ · última dosis _ h
<span class="key">Episodios anginosos en 24 h:</span> _
<span class="alert">⚠ Puerta-balón <90 min · GRACE >140 → invasiva <24 h</span>
<span class="note">→ Escalas: GRACE · TIMI · CRUSADE · HEART (pestaña Escalas → Box SCA)</span>`
  },
  {
    id: 'c3',
    title: 'TEP — Tromboembolismo pulmonar',
    badge: 'red',
    badgeLabel: 'Crítico',
    section: 'Síndrome crítico / Shock',
    sectionIcon: '🔴',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> disnea aguda ± dolor pleurítico ± síncope
<span class="key">Vitales:</span> FC _ · FR _ · TA _/_ · SpO₂ _%
<span class="key">ECG:</span> S1Q3T3 S·N · BRDHH S·N · taquicardia S·N
<span class="key">Analítica:</span> DD _ · TnI _ · BNP/NT-proBNP _
          pO₂ _ · pCO₂ _ · pH _
<span class="key">Eco:</span> disfunción VD S·N · McConnell S·N
<span class="key">FR:</span> inmovilización _ días · cirugía reciente S·N
      neoplasia activa S·N · anticonceptivos S·N
      TVP previa S·N · embarazo S·N
<span class="key">AngioTC:</span> realizado S·N · resultado _
<span class="alert">⚠ Estabilidad HD: estable·inestable</span>
<span class="note">→ Escalas: Wells TEP · Geneva revisado · PESI</span>`
  },
  {
    id: 'c4',
    title: 'Ictus / AIT — Código Ictus',
    badge: 'red',
    badgeLabel: 'Crítico',
    section: 'Síndrome crítico / Shock',
    sectionIcon: '🔴',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> déficit neurológico focal agudo
<span class="key">Hora último bien conocido:</span> __:__h
<span class="key">Hora llegada urgencias:</span> __:__h
<span class="key">Vitales:</span> FC _ · TA _/_ · SpO₂ _% · Glucemia _
<span class="key">NIHSS:</span> _ puntos
<span class="key">Déficit:</span> hemiparesia D·I · afasia S·N
          hemianopsia S·N · disartria S·N · ataxia S·N
<span class="key">TC urgente:</span> hemorragia S·N · ASPECTS _
<span class="key">Analítica:</span> Hb _ · Plaquetas _ · INR _ · TTPa _
<span class="key">FA conocida:</span> S·N · anticoagulado S·N (fármaco _)
<span class="key">AP:</span> HTA · DM · ictus previo S·N · cardiopatía S·N
<span class="alert">⚠ Trombolisis: <4.5h · Trombectomía: <24h</span>
<span class="note">→ Escalas: NIHSS · ABCD2 (AIT) · CHA₂DS₂-VASc</span>`
  },
  {
    id: 'c5',
    title: 'Shock — Diferencial',
    badge: 'red',
    badgeLabel: 'Crítico',
    section: 'Síndrome crítico / Shock',
    sectionIcon: '🔴',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> hipotensión · TAS <90 mmHg
<span class="key">Vitales:</span> FC _ · FR _ · TA _/_ · SpO₂ _% · Tª _
<span class="key">Piel:</span> fría/caliente · sudoración S·N · livideces S·N
<span class="key">PVY:</span> elevada/normal/baja
<span class="key">Ruidos cardiacos:</span> normales/soplo/alejados
<span class="key">Analítica:</span> Lac _ · Hb _ · Troponina _ · DD _
          PCT _ · Cr _ · pH _ · HCO₃ _
<span class="key">Eco POCUS:</span> FE _ · derrame pericárdico S·N
              colapso VD S·N · IVC _
<span class="key">Contexto:</span> fiebre S·N · hemorragia S·N · alergia S·N
<span class="alert">⚠ Tipo probable: distributivo/cardiogénico/hipovolémico/obstructivo</span>
<span class="note">→ Escalas: SOFA · qSOFA · MAP objetivo >65 mmHg</span>`
  },

  // ── Section 2: Respiratorio / Cardiologico ──
  {
    id: 'c6',
    title: 'IC descompensada',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Respiratorio / Cardiológico',
    sectionIcon: '🟡',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> disnea aguda/subaguda · ortopnea S·N · DPN S·N
<span class="key">Vitales:</span> FC _ · FR _ · TA _/_ · SpO₂ _% AA/GN
<span class="key">Exploración:</span> crepitantes bil/unil/no
              edemas MMII +/++/+++ · PVY elevada S·N
              S3 S·N · hepatomegalia S·N
<span class="key">Analítica:</span> BNP/NT-proBNP _ · TnI _ · Cr _ · Na _
          K _ · Hb _ · urea _
<span class="key">Rx tórax:</span> cardiomegalia S·N · redistribución S·N
             líneas B Kerley S·N · derrame pleural S·N
<span class="key">Eco:</span> FE _% · FEr/FEm/FEp · disfunción VD S·N
<span class="key">Diurético habitual:</span> furosemida _ mg/día oral
<span class="key">AP:</span> IC conocida S·N · FA · HTA · cardiopatía isq.
<span class="note">→ Escalas: NYHA · AHA/ACC estadio · MAGGIC</span>`
  },
  {
    id: 'c7',
    title: 'Neumonía / IRA',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Respiratorio / Cardiológico',
    sectionIcon: '🟡',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> fiebre + tos + disnea _ días evolución
<span class="key">Vitales:</span> FC _ · FR _ · TA _/_ · SpO₂ _% · Tª _
<span class="key">Exploración:</span> crepitantes en _ · consolidación S·N
              disminución MV en _ · derrame pleural S·N
<span class="key">Analítica:</span> Leucos _ · PCR _ · PCT _ · Cr _
          Hb _ · Na _ · pH _ · pO₂ _
<span class="key">Rx/TC:</span> consolidación _ · bilateral S·N · derrame S·N
<span class="key">Antígenos:</span> Legionella S·N · Neumococo S·N
<span class="key">Esputo:</span> mucopurulento S·N · hemoptoico S·N
<span class="key">ATB previo:</span> S·N (cuál _ · _ días)
<span class="key">AP:</span> EPOC/asma S·N · inmunosupresión S·N · neoplasia S·N
<span class="note">→ Escalas: CURB-65 · PSI/PORT · A-DROP</span>`
  },
  {
    id: 'c8',
    title: 'FA de novo / descompensada',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Respiratorio / Cardiológico',
    sectionIcon: '🟡',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> palpitaciones/disnea/síncope · inicio _ h
<span class="key">Vitales:</span> FC _ irreg · TA _/_ · SpO₂ _%
<span class="key">ECG:</span> FA · RV _ lpm · preexcitación S·N
       isquemia asociada S·N
<span class="key">Analítica:</span> TSH _ · K _ · Mg _ · Cr _
          TnI _ · BNP _
<span class="key">FA previa:</span> S·N · tipo: parox/persist/permanente
<span class="key">Anticoagulado:</span> S·N · fármaco _ · última dosis _h
<span class="key">CHA₂DS₂-VASc:</span> _ (calcular)
<span class="key">HAS-BLED:</span> _ (calcular)
<span class="key">Objetivo:</span> control ritmo·frecuencia
<span class="key">AP:</span> valvulopatía S·N · cardiopatía estructural S·N · HTA
<span class="note">→ Escalas: CHA₂DS₂-VASc · HAS-BLED · EHRA</span>`
  },
  {
    id: 'c9',
    title: 'EPOC agudizado',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Respiratorio / Cardiológico',
    sectionIcon: '🟡',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> disnea + cambio en esputo _ días
<span class="key">Vitales:</span> FC _ · FR _ · TA _/_ · SpO₂ _% · Tª _
<span class="key">Exploración:</span> sibilancias S·N · roncus S·N
              uso musculatura accesoria S·N · cianosis S·N
<span class="key">Gasometría:</span> pH _ · pO₂ _ · pCO₂ _ · HCO₃ _
<span class="key">Analítica:</span> PCR _ · PCT _ · Hb _ · Hto _
<span class="key">Rx:</span> hiperinsuflación S·N · infiltrado S·N · neumotórax S·N
<span class="key">FEV1 basal:</span> _% · GOLD estadio _
<span class="key">Esputo:</span> color: claro/amarillo/verde/marrón
<span class="key">ATB indicado:</span> S·N (criterios Anthonisen: _/3)
<span class="key">VMNI previa:</span> S·N · domiciliaria S·N
<span class="note">→ Escalas: DECAF · BAP-65 · GOLD</span>`
  },

  // ── Section 3: Neurologico / Metabolico ──
  {
    id: 'c10',
    title: 'Síndrome confusional agudo (delirium)',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Neurológico / Metabólico',
    sectionIcon: '🟡',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> alteración aguda comportamiento/consciencia
<span class="key">Inicio:</span> hiperagudo/agudo · fluctuante S·N
<span class="key">Vitales:</span> FC _ · FR _ · TA _/_ · SpO₂ _% · Tª _ · Glucemia _
<span class="key">CAM:</span> positivo S·N (inicio agudo + inatención + fluctuación)
<span class="key">Glasgow:</span> _ /15 · hipoactivo/hiperactivo/mixto
<span class="key">Analítica:</span> Na _ · K _ · Cr _ · Glucosa _ · Ca _
          PCR _ · Hb _ · Leucos _ · TSH _ · NH₃ _
<span class="key">Orina:</span> sedimento _ · retención urinaria S·N
<span class="key">Fármacos recientes:</span> BDZ/opioides/anticolinérgicos S·N
<span class="key">Estreñimiento/fecaloma:</span> S·N
<span class="key">Situación basal:</span> independiente/dep.parcial/dep.total
<span class="key">Demencia previa:</span> S·N · tipo _
<span class="alert">⚠ Descartar: ITU · retención · fecaloma · fármaco · hipoglucemia</span>
<span class="note">→ Escalas: CAM · DOS · 4AT · Nu-DESC</span>`
  },
  {
    id: 'c11',
    title: 'AKI — Fracaso renal agudo',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Neurológico / Metabólico',
    sectionIcon: '🟡',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> deterioro función renal · oliguria S·N
<span class="key">Vitales:</span> FC _ · TA _/_ · SpO₂ _% · Tª _
<span class="key">Diuresis:</span> _ ml/h · anuria S·N · sonda S·N
<span class="key">Analítica:</span> Cr actual _ · Cr basal _ · ratio Cr/Cr_basal _
          BUN _ · K _ · Na _ · HCO₃ _ · pH _
          Lac _ · Albumina _
<span class="key">Orina:</span> Na urinario _ · Cr urinaria _ · FENa _
          cilindros granulosos S·N · proteinuria _
<span class="key">Eco renal:</span> hidronefrosis S·N · tamaño renal _
<span class="key">KDIGO stage:</span> 1(x1.5-1.9) / 2(x2-2.9) / 3(x3 o >4)
<span class="key">Causa:</span> prerrenal/intrínseca/obstructiva
<span class="key">Nefrotóxicos:</span> AINEs/contraste/aminoglucósidos/_ · suspendidos S·N
<span class="key">AP:</span> IRC previa estadio _ · HTA · DM · mieloma
<span class="note">→ Escalas: KDIGO · AKIN · RIFLE</span>`
  },
  {
    id: 'c12',
    title: 'Cetoacidosis diabética / HHS',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Neurológico / Metabólico',
    sectionIcon: '🟡',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> náuseas/vómitos/poliuria/dolor abdominal
<span class="key">Vitales:</span> FC _ · FR _ · TA _/_ · SpO₂ _% · Tª _
<span class="key">Glasgow:</span> _ /15 · respiración Kussmaul S·N
<span class="key">Analítica:</span> Glucosa _ · pH _ · HCO₃ _
          Cetonas plasma _ · Cetonuria _
          Na _ (Na corregido _) · K _ · Cr _
          Osm _ · Gap aniónico _
          Lac _ · PCR _
<span class="key">Orina:</span> glucosuria S·N · cetonuria _+
<span class="key">Tipo DM:</span> DM1/DM2 · debut S·N
<span class="key">Insulina habitual:</span> _ · última dosis _h
<span class="key">Factor precipitante:</span> infección/omisión insulina/nuevo diagnóstico/_
<span class="alert">⚠ CAD: pH<7.3 + HCO₃<15 + cetonemia>3 / HHS: Osm>320 + glucosa>600</span>
<span class="note">→ Escalas: criterios gravedad CAD · Bicarbonato gap</span>`
  },

  // ── Section 4: Digestivo / Geriatrico ──
  {
    id: 'c13',
    title: 'Hemorragia digestiva alta',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Digestivo / Geriátrico',
    sectionIcon: '🟡',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> hematemesis/melenas · _ episodios en _h
<span class="key">Vitales:</span> FC _ · TA _/_ · SpO₂ _% · TAS ortostática _
<span class="key">Aspecto:</span> hematemesis roja/posos café · melenas S·N
<span class="key">Analítica:</span> Hb _ · Hto _ · Plaquetas _ · INR _
          Cr _ · Urea _ · grupo ABO + Rh _
<span class="key">Glasgow-Blatchford:</span> calcular
<span class="key">Rockall pre-endoscopia:</span> calcular
<span class="key">AINEs/ASS:</span> S·N · anticoagulantes S·N
<span class="key">Alcohol:</span> S·N · hepatopatía S·N · varices conocidas S·N
<span class="key">H.pylori:</span> conocido S·N · tratado S·N
<span class="key">AP:</span> úlcera previa S·N · cirrosis S·N
<span class="alert">⚠ Inestabilidad HD: reponer antes de endoscopia urgente</span>
<span class="note">→ Escalas: Glasgow-Blatchford · Rockall · AIMS65</span>`
  },
  {
    id: 'c14',
    title: 'Pancreatitis aguda',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Digestivo / Geriátrico',
    sectionIcon: '🟡',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> dolor epigástrico/mesogástrico irradiado a espalda
<span class="key">Vitales:</span> FC _ · TA _/_ · SpO₂ _% · Tª _
<span class="key">Exploración:</span> defensa S·N · signo Grey Turner S·N · Cullen S·N
<span class="key">Analítica:</span> Amilasa _ (x3 VN=_) · Lipasa _
          PCR _ (a las 48h: _) · Leucos _ · Hb _
          Cr _ · BUN _ · Ca _ · glucosa _
          TGO _ · TGP _ · FA _ · Bil _
          Hto _ · LDH _
<span class="key">Eco:</span> colelitiasis S·N · dilatación VB S·N · necrosis S·N
<span class="key">Etiología:</span> biliar/alcohol/hipertrigliceridemia/idiopática/_
<span class="key">TG:</span> _ (si hipertrigliceridemia)
<span class="key">Fluidoterapia:</span> _ ml/h pautados
<span class="alert">⚠ Ranson >3 o APACHE II >8 → grave → UCI</span>
<span class="note">→ Escalas: Ranson · BISAP · APACHE II · Atlanta revisada</span>`
  },
  {
    id: 'c15',
    title: 'Meningitis / Encefalitis',
    badge: 'red',
    badgeLabel: 'Crítico',
    section: 'Digestivo / Geriátrico',
    sectionIcon: '🟡',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> fiebre + cefalea + rigidez nucal ± alteración consciencia
<span class="key">Tríada clásica:</span> fiebre S·N + rigidez S·N + alt.consciencia S·N
<span class="key">Vitales:</span> FC _ · FR _ · TA _/_ · SpO₂ _% · Tª _
<span class="key">Glasgow:</span> _ /15 · Kernig S·N · Brudzinski S·N
<span class="key">Petequias/purpura:</span> S·N · localización _
<span class="key">Analítica:</span> PCR _ · PCT _ · Leucos _ · Hb _
          Coagulación: TP _ · TTPa _ · Fib _
<span class="key">LCR (si no CI):</span> aspecto _ · células _ · PMN _
                  proteínas _ · glucosa _ · glucemia _
                  Gram _ · cultivo pendiente
<span class="key">TC craneal:</span> previo a PL S·N · resultado _
<span class="key">Inmunosupresión:</span> S·N · VIH S·N · corticoides S·N
<span class="alert">⚠ ATB INMEDIATO si sospecha — no demorar por PL</span>
<span class="note">→ Escalas: Glasgow · Bacterial Meningitis Score</span>`
  },
  {
    id: 'c16',
    title: 'Caída en anciano frágil',
    badge: 'blue',
    badgeLabel: 'Hospitalario',
    section: 'Digestivo / Geriátrico',
    sectionIcon: '🟡',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Mecanismo:</span> espontánea/tropiezo/sincope/mecánica
<span class="key">Vitales:</span> FC _ · TA _/_ · SpO₂ _% · Tª _ · Glucemia _
<span class="key">Consciencia en caída:</span> presente/ausente · duración _
<span class="key">Exploración:</span> deformidad _ · dolor a palpación _
              TCE S·N · heridas _
<span class="key">Rx:</span> fractura en _ · tipo _
<span class="key">Analítica:</span> Hb _ · Cr _ · Na _ · K _ · Ca _
          INR _ (si anticoagulado) · TSH _
<span class="key">Medicación revisada:</span> BDZ S·N · antihipertensivos S·N
                       diuréticos S·N · STOPP aplicable S·N
<span class="key">Situación basal:</span> Barthel basal _ /100 · Lawton _ /8
<span class="key">Caídas previas 12m:</span> _ (número)
<span class="key">Demencia:</span> S·N · GDS _ · MMSE _
<span class="key">Vive:</span> solo/acompañado · residencia S·N
<span class="note">→ Escalas: Barthel · Morse · STRATIFY · Downton</span>`
  },
  {
    id: 'c17',
    title: 'Intoxicación / Sobredosis',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Digestivo / Geriátrico',
    sectionIcon: '🟡',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> ingesta/exposición a _
<span class="key">Hora exposición:</span> __:__h · cantidad estimada _
<span class="key">Vitales:</span> FC _ · FR _ · TA _/_ · SpO₂ _% · Tª _ · Pupilas _
<span class="key">Glasgow:</span> _ /15 · agitación S·N · convulsiones S·N
<span class="key">Tóxico:</span> fármaco/alcohol/droga/cáustico/CO/_
<span class="key">Vía:</span> oral/inhalada/IV/transdérmica
<span class="key">Analítica:</span> paracetamol _ · etanol _ · Na _ · K _
          pH _ · Lac _ · CO-Hb _ · metHb _
          osmolalidad _ · gap osmolar _
<span class="key">ECG:</span> QTc _ · QRS _ · alteraciones _
<span class="key">Intencionalidad:</span> accidental/voluntaria · psiquiátrico previo S·N
<span class="key">Vómitos inducidos:</span> S·N · carbón activado S·N
<span class="alert">⚠ Contactar toxicología: 91 562 04 20 (España)</span>
<span class="note">→ Escalas: PSS (Poisoning Severity Score) · Glasgow</span>`
  },
  {
    id: 'c18',
    title: 'Crisis hipertensiva',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Digestivo / Geriátrico',
    sectionIcon: '🟡',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> cefalea/síntomas neurológicos/disnea + TA elevada
<span class="key">Vitales:</span> TA _ (brazo D) / _ (brazo I) · FC _ · SpO₂ _% · Tª _
<span class="key">Fondo de ojo:</span> papiledema S·N · hemorragias S·N · exudados S·N
<span class="key">Neurológico:</span> GCS _ · déficit focal S·N · cefalea thunderclap S·N
<span class="key">Cardiaco:</span> disnea S·N · dolor torácico S·N · S3 S·N
<span class="key">Renal:</span> Cr _ · proteinuria _ · hematuria S·N
<span class="key">Analítica:</span> Cr _ · Na _ · K _ · TnI _ · BNP _
          Hb _ · esquistocitos S·N (MAT)
<span class="key">ECG:</span> HVI S·N · isquemia S·N
<span class="key">Tratamiento habitual:</span> _ · cumplimiento S·N
<span class="key">Causa secundaria:</span> feocromocitoma/ESR/eclampsia/drogas S·N
<span class="alert">⚠ Urgencia hipertensiva vs Emergencia (daño órgano diana)</span>
<span class="note">→ Diferencial: emergencia (descenso <25% en 1h) vs urgencia (oral 24-48h)</span>`
  },
  {
    id: 'c19',
    title: 'Anafilaxia',
    badge: 'red',
    badgeLabel: 'Crítico',
    section: 'Síndrome crítico / Shock',
    sectionIcon: '🔴',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo/Peso:</span> <span class="val">_a / M·F / _kg</span>
<span class="key">Motivo:</span> reacción anafiláctica aguda
<span class="key">Alérgeno sospechoso:</span> fármaco/alimento/picadura/contraste/_
<span class="key">Tiempo exposición-síntomas:</span> _ min
<span class="key">Vitales:</span> FC _ · FR _ · TA _/_ · SpO₂ _%
<span class="key">Piel:</span> urticaria S·N · angioedema S·N · prurito S·N
<span class="key">Respiratorio:</span> estridor S·N · sibilancias S·N · disnea S·N
<span class="key">Cardiovascular:</span> hipotensión S·N · síncope S·N · taquicardia S·N
<span class="key">Digestivo:</span> náuseas/vómitos S·N · dolor abdominal S·N · diarrea S·N
<span class="key">Adrenalina IM:</span> 0.01 mg/kg (máx 0.5 mg) · dosis 1 __:__h
<span class="key">Dosis repetidas:</span> cada 5-15 min · nº dosis _
<span class="key">Fluidoterapia:</span> cristaloide _ ml en bolo
<span class="key">Coadyuvantes:</span> corticoide IV S·N · antiH1 S·N · antiH2 S·N
<span class="key">Broncoespasmo refractario:</span> salbutamol nebulizado S·N
<span class="key">Triptasa sérica:</span> basal (0-3h) _ · diferida (24h) _
<span class="key">AP:</span> alergias conocidas _ · asma S·N · mastocitosis S·N
<span class="alert">⚠ ADRENALINA IM 0.5mg INMEDIATA cara anterolateral muslo</span>
<span class="note">→ Observación mínima 6-12h por riesgo de reacción bifásica</span>`
  },
  {
    id: 'c20',
    title: 'Politrauma / ATLS (ABCDE)',
    badge: 'red',
    badgeLabel: 'Crítico',
    section: 'Síndrome crítico / Shock',
    sectionIcon: '🔴',
    html: `<span class="key">/URG ATLS</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Mecanismo lesional:</span> AT/precipitación/agresión/arma/_
<span class="key">Hora del accidente:</span> __:__h
<span class="key">A — Vía aérea + control cervical:</span> permeable S·N · collarín S·N
                          cuerpo extraño S·N · estridor S·N
<span class="key">B — Ventilación:</span> FR _ · SpO₂ _% · simetría S·N
              neumotórax S·N · hemotórax S·N · enfisema subcutáneo S·N
<span class="key">C — Circulación:</span> FC _ · TA _/_ · relleno capilar _ seg
              hemorragia externa S·N · localización _
              fluidoterapia _ ml · transfusión S·N (concentrados _)
<span class="key">D — Neurológico:</span> Glasgow _ /15 · pupilas _
              lateralización S·N · glucemia _
<span class="key">E — Exposición:</span> Tª _ · lesiones asociadas _
              medidas prevención hipotermia S·N
<span class="key">FAST eco:</span> líquido libre S·N (Morrison/esplenorrenal/pelvis/pericardio)
<span class="key">Analítica:</span> Hb _ · Lac _ · pruebas cruzadas S·N
          coagulación: TP _ · TTPa _ · Fib _
<span class="key">TC body:</span> realizado S·N · hallazgos _
<span class="alert">⚠ Ácido tranexámico 1g IV en <3h si sospecha hemorragia</span>
<span class="note">→ Escalas: GCS · FAST · RTS</span>`
  },
  {
    id: 'c21',
    title: 'Arritmias',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Respiratorio / Cardiológico',
    sectionIcon: '🟠',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> palpitaciones/síncope/disnea · inicio _ h
<span class="key">Vitales:</span> FC _ · TA _/_ · SpO₂ _% · FR _
<span class="key">Tipo arritmia:</span> TSV/TV/FA/flutter/bradicardia/BAV/_
<span class="key">QRS:</span> estrecho (<120ms)/ancho (≥120ms) · duración _ ms
<span class="key">Ritmo:</span> regular/irregular
<span class="key">Estabilidad hemodinámica:</span> estable/inestable
<span class="key">Signos inestabilidad:</span> hipotensión S·N · dolor torácico S·N
                       disminución consciencia S·N · signos IC S·N
<span class="key">ECG:</span> descripción _ · eje _ · QTc _
<span class="key">Analítica:</span> K _ · Mg _ · Ca _ · TSH _ · TnI _
<span class="key">Antiarrítmicos previos:</span> _ · última dosis _h
<span class="key">Maniobras vagales:</span> S·N · adenosina S·N (dosis _ mg)
<span class="key">AP:</span> cardiopatía estructural S·N · arritmia previa S·N
<span class="alert">⚠ Inestable → cardioversión sincronizada inmediata</span>
<span class="note">→ Escalas: CHA₂DS₂-VASc (si FA) · EHRA</span>`
  },
  {
    id: 'c22',
    title: 'Crisis asmática',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Respiratorio / Cardiológico',
    sectionIcon: '🟠',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> disnea + sibilancias · inicio _ h
<span class="key">Gravedad:</span> leve/moderada/grave/parada inminente
<span class="key">Vitales:</span> FC _ · FR _ · TA _/_ · SpO₂ _%
<span class="key">PEF:</span> _ L/min (_% del teórico/mejor personal)
<span class="key">Habla entrecortada:</span> S·N
<span class="key">Musculatura accesoria:</span> S·N · tiraje S·N
<span class="key">Auscultación:</span> sibilancias difusas S·N · hipoventilación S·N
<span class="key">GSA (si grave):</span> pH _ · pO₂ _ · pCO₂ _
<span class="key">Salbutamol nebulizado:</span> 2.5-5 mg c/20min x3 · dosis dadas _
<span class="key">Ipratropio:</span> 0.5 mg nebulizado · asociado S·N
<span class="key">Corticoide sistémico:</span> prednisona _ mg VO/metilprednisolona _ mg IV
<span class="key">MgSO4 (si refractaria):</span> 2g IV en 20min · S·N
<span class="key">Desencadenante:</span> infección/alérgeno/AINEs/ejercicio/_
<span class="key">AP:</span> ingresos previos S·N · UCI previa S·N · tto de base _
<span class="alert">⚠ Silencio auscultatorio = GRAVEDAD EXTREMA</span>
<span class="note">→ Escalas: mMRC · PEF post-broncodilatador</span>`
  },
  {
    id: 'c23',
    title: 'Dolor abdominal agudo',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Digestivo / Geriátrico',
    sectionIcon: '🟠',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> dolor abdominal · inicio _ h
<span class="key">Localización:</span> HD/HI/FID/FII/epigastrio/mesogastrio/difuso
<span class="key">Irradiación:</span> espalda/hombro/región lumbar/_
<span class="key">Inicio:</span> brusco/gradual · carácter: cólico/continuo/punzante
<span class="key">Vitales:</span> FC _ · TA _/_ · SpO₂ _% · Tª _
<span class="key">Síntomas asociados:</span> vómitos S·N · fiebre S·N · diarrea S·N · hematoquecia S·N
<span class="key">Exploración:</span> defensa S·N · peritonismo S·N
              Blumberg S·N · Murphy S·N · McBurney S·N · Rovsing S·N
<span class="key">Última regla (mujeres):</span> _ · β-hCG S·N (resultado _)
<span class="key">Analítica:</span> Leucos _ · PCR _ · Lac _ · amilasa/lipasa _
          Bil _ · TGO/TGP _ · Cr _ · orina _
<span class="key">Eco/TC abdominal:</span> realizado S·N · hallazgos _
<span class="key">AP:</span> cirugía abdominal previa S·N · litiasis biliar S·N
<span class="alert">⚠ Defensa generalizada + lactato elevado → cirugía urgente</span>
<span class="note">→ Diferencial: apendicitis · colecistitis · diverticulitis · obstrucción · isquemia mesentérica · rotura AAA</span>`
  },
  {
    id: 'c24',
    title: 'Convulsiones / Status epiléptico',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Neurológico / Metabólico',
    sectionIcon: '🟠',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> crisis convulsiva · testigos S·N
<span class="key">Tipo:</span> focal/generalizada/desconocida
<span class="key">Duración:</span> _ min · primera crisis S·N
<span class="key">Vitales:</span> FC _ · FR _ · TA _/_ · SpO₂ _% · Tª _ · Glucemia _
<span class="key">Recuperación postcrítica:</span> S·N · tiempo _ min
<span class="key">Mordedura lingual:</span> S·N · incontinencia S·N
<span class="key">Glasgow:</span> _ /15 · focalidad neurológica S·N
<span class="key">Tratamiento 1ª línea (BZD):</span> diazepam/midazolam _ mg __:__h
<span class="key">Tratamiento 2ª línea:</span> levetiracetam/valproato/fenitoína _ mg __:__h
<span class="key">Tratamiento 3ª línea:</span> UCI · anestesia S·N
<span class="key">Analítica:</span> glucemia _ · Na _ · Ca _ · Mg _
          tóxicos en orina S·N · niveles antiepiléptico _
<span class="key">TC craneal:</span> realizado S·N · hallazgos _
<span class="key">EEG (si status):</span> S·N · hallazgos _
<span class="key">AP:</span> epilepsia conocida S·N · cumplimiento tto S·N · alcohol/tóxicos S·N
<span class="alert">⚠ >5 min = Status epiléptico → iniciar BZD inmediato</span>
<span class="note">→ Escalas: GCS · NIHSS (si focalidad)</span>`
  },
  {
    id: 'c25',
    title: 'TCE — Traumatismo craneoencefálico',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Neurológico / Metabólico',
    sectionIcon: '🟠',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Mecanismo:</span> caída/AT/agresión/deportivo/_
<span class="key">Vitales:</span> FC _ · TA _/_ · SpO₂ _% · FR _
<span class="key">GCS inicial:</span> _ /15 · GCS actual _ /15 (hora __:__h)
<span class="key">Pupilas:</span> isocóricas/anisocoria · reactivas S·N
<span class="key">Focalidad neurológica:</span> S·N · descripción _
<span class="key">Pérdida de consciencia:</span> S·N · duración _ min
<span class="key">Amnesia postraumática:</span> S·N · duración _ min
<span class="key">Vómitos:</span> nº episodios _ · cefalea S·N intensidad _/10
<span class="key">Signos fractura base cráneo:</span> hemotímpano S·N · ojos mapache S·N
                            otorrea/rinorrea LCR S·N · signo Battle S·N
<span class="key">Anticoagulación/antiagregación:</span> S·N · fármaco _ · última dosis _h
<span class="key">Criterios TC (Canadian CT Head Rule):</span>
   GCS <15 a 2h S·N · fractura abierta/deprimida sospechada S·N
   >2 vómitos S·N · >65 años S·N · amnesia >30min S·N
   mecanismo peligroso S·N
<span class="key">TC craneal:</span> realizado S·N · hallazgos _
<span class="alert">⚠ GCS ≤8 → proteger vía aérea + TC inmediato</span>
<span class="note">→ Escalas: GCS · Canadian CT Head Rule</span>`
  },
  {
    id: 'c26',
    title: 'TVP — Trombosis venosa profunda',
    badge: 'amber',
    badgeLabel: 'Urgente',
    section: 'Vascular',
    sectionIcon: '🟣',
    html: `<span class="key">/URG</span>
<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>
<span class="key">Motivo:</span> dolor/hinchazón extremidad · inicio _ días
<span class="key">Extremidad afectada:</span> MID/MII · localización _
<span class="key">Vitales:</span> FC _ · TA _/_ · SpO₂ _% · Tª _
<span class="key">Edema:</span> S·N · fóvea S·N · unilateral S·N
<span class="key">Dolor a la palpación trayecto venoso:</span> S·N
<span class="key">Empastamiento gemelar:</span> S·N
<span class="key">Diferencia de perímetro (>3cm):</span> S·N · medida _ cm
<span class="key">Eritema/calor local:</span> S·N · Homans S·N
<span class="key">Factores de riesgo:</span> inmovilización S·N · cirugía reciente S·N
                    neoplasia activa S·N · ACO/THS S·N
                    viaje prolongado S·N · TVP/TEP previo S·N
<span class="key">Wells TVP score:</span> _ (calcular) · probabilidad baja/media/alta
<span class="key">D-dímero:</span> _
<span class="key">Eco-Doppler:</span> realizado S·N · trombo S·N · localización _
<span class="key">Tratamiento HBPM:</span> _ (fármaco/dosis mg o UI) · peso _ kg
<span class="key">Medias de compresión:</span> S·N
<span class="key">Síntomas respiratorios:</span> disnea S·N · dolor torácico S·N
<span class="alert">⚠ Descartar TEP concomitante si disnea/dolor torácico</span>
<span class="note">→ Escalas: Wells TVP · D-dímero</span>`
  }
];
