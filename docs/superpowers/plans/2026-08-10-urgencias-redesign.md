# URG CLÍNICO — Plan de implementación del rediseño

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolucionar el HTML monolítico actual a una app multi-archivo con tema auto claro/oscuro, 4 pestañas, resultado copiable en cada escala, contenido clínico nuevo y PWA offline en `urgencias.doctorhiguera.com`.

**Architecture:** HTML shell (`index.html`) con CSS y motor de renderizado JS + 4 archivos de datos (`data/*.js`) cargados via `<script src>`. Sin framework ni build step. Service worker para offline. Tema auto via `prefers-color-scheme` + toggle manual + `data-theme` en `<html>`.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS, Service Worker API, Clipboard API, Cloudflare Pages.

## Global Constraints

- Zero dependencias externas — todo inline o en archivos locales
- Sin build step — los archivos se sirven tal cual
- Los archivos `data/*.js` asignan a `window.CHEATSHEETS`, `window.SCALES`, etc. (no ESM)
- Mantener compatibilidad con el motor EXTRA_SCALES declarativo existente (items con `t:'chk'|'sel'|'num'`, `agg`, `interp`)
- Todo texto en castellano
- Touch targets mínimo 44px en mobile
- El CSS usa `var(--nombre)` para todos los colores — sin colores hardcodeados fuera de `:root`
- Cada escala incluye botón "Copiar resultado" que genera texto con formato: `[NOMBRE]: [pts] — [interpretación]\n[detalle]`

---

### Task 1: Sistema de tema auto (CSS refactor)

**Files:**
- Modify: `index.html:7-382` (bloque `<style>`)

**Interfaces:**
- Produces: Variables CSS en `:root` (tema claro por defecto), override en `[data-theme="dark"]` y `@media (prefers-color-scheme: dark)`. Función `toggleTheme()` global. Botón toggle en el header.

- [ ] **Step 1: Definir paleta claro/oscuro en variables CSS**

Reemplazar las variables CSS actuales (líneas 7-25) por el sistema dual. El tema claro es el default en `:root`, el oscuro se activa por `data-theme="dark"` o `prefers-color-scheme: dark`.

```css
:root {
  --bg: #f8f9fa;
  --bg2: #ffffff;
  --bg3: #f0f2f5;
  --border: #e2e5e9;
  --text: #1f2328;
  --text2: #656d76;
  --red: #cf222e;
  --red-bg: #ffebe9;
  --amber: #9a6700;
  --amber-bg: #fff8c5;
  --blue: #0969da;
  --blue-bg: #ddf4ff;
  --green: #1a7f37;
  --green-bg: #dafbe1;
  --purple: #8250df;
  --mono: 'Courier New', monospace;
  --sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0d1117;
    --bg2: #161b22;
    --bg3: #1c2128;
    --border: #30363d;
    --text: #e6edf3;
    --text2: #8b949e;
    --red: #f85149;
    --red-bg: #3d1515;
    --amber: #d29922;
    --amber-bg: #2d2008;
    --blue: #58a6ff;
    --blue-bg: #0d1f3c;
    --green: #3fb950;
    --green-bg: #0d2818;
    --purple: #bc8cff;
  }
}

[data-theme="dark"] {
  --bg: #0d1117;
  --bg2: #161b22;
  --bg3: #1c2128;
  --border: #30363d;
  --text: #e6edf3;
  --text2: #8b949e;
  --red: #f85149;
  --red-bg: #3d1515;
  --amber: #d29922;
  --amber-bg: #2d2008;
  --blue: #58a6ff;
  --blue-bg: #0d1f3c;
  --green: #3fb950;
  --green-bg: #0d2818;
  --purple: #bc8cff;
}
```

- [ ] **Step 2: Actualizar colores hardcodeados en el CSS**

Buscar y reemplazar los colores hardcodeados en clases que ya no usan variables. Líneas a revisar:

- `.key { color: #79c0ff; }` → usar una variable nueva `--key-color` con valor `#0550ae` (claro) / `#79c0ff` (oscuro)
- `.val { color: #3fb950; }` → ya usa el valor de `--green`, cambiar a `color: var(--green);`
- `.score-num` hereda correctamente
- Print CSS (línea 281): `body { background: white; color: black; }` — mantener hardcodeado (print siempre claro)

Añadir las variables nuevas:

```css
:root {
  --key-color: #0550ae;
}
/* En los bloques dark */
  --key-color: #79c0ff;
```

Actualizar `.key`:
```css
.key { color: var(--key-color); }
```

- [ ] **Step 3: Añadir botón toggle al header**

En el HTML del header (línea 386-391), añadir un botón toggle tema:

```html
<div class="header">
  <div>
    <h1>⚡ URG CLÍNICO</h1>
    <p>Dr. Higuera · Clínica Barcelona · Uso clínico interno</p>
  </div>
  <button class="btn theme-toggle" id="theme-toggle" onclick="toggleTheme()" aria-label="Cambiar tema">☀️</button>
</div>
```

CSS para el toggle:
```css
.theme-toggle {
  margin-left: auto;
  font-size: 18px;
  padding: 6px 10px;
  border-radius: 50%;
  line-height: 1;
}
```

- [ ] **Step 4: Escribir función toggleTheme()**

Al principio del bloque `<script>`, antes de `showTab()`:

```javascript
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let next;
  if (!current) next = prefersDark ? 'light' : 'dark';
  else if (current === 'dark') next = 'light';
  else next = 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('urg-theme', next);
  document.getElementById('theme-toggle').textContent = next === 'dark' ? '☀️' : '🌙';
}

(function initTheme() {
  const saved = localStorage.getItem('urg-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
  const isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.getElementById('theme-toggle').textContent = isDark ? '☀️' : '🌙';
})();
```

- [ ] **Step 5: Verificar visualmente ambos temas**

Abrir `index.html` en el navegador. Verificar:
- El tema claro carga por defecto (si el SO está en light mode)
- El botón toggle cambia correctamente entre claro y oscuro
- Recargar la página mantiene la preferencia
- Los badges, cards, escalas, toast y score-display son legibles en ambos temas
- El contraste de texto cumple WCAG AA (ratio 4.5:1 mínimo)

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: sistema de tema auto claro/oscuro con toggle manual"
```

---

### Task 2: Fix de bugs existentes + meta tags

**Files:**
- Modify: `index.html` (función `showTab()` línea 1380, HTML entities en EXTRA_SCALES, meta tags en `<head>`)

**Interfaces:**
- Consumes: N/A
- Produces: `showTab(name, btn)` que recibe el botón clickeado explícitamente

- [ ] **Step 1: Corregir showTab() para no depender de event global**

Cambiar la función y las llamadas en el HTML:

Función actual (línea 1380):
```javascript
function showTab(name) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  event.target.classList.add('active');
}
```

Cambiar a:
```javascript
function showTab(name, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');
}
```

Actualizar las llamadas en el nav (líneas 394-395):
```html
<button class="nav-btn active" onclick="showTab('cheatsheets', this)">📋 Cheatsheets</button>
<button class="nav-btn" onclick="showTab('escalas', this)">📊 Escalas</button>
```

- [ ] **Step 2: Corregir HTML entities en strings JS de EXTRA_SCALES**

Buscar y reemplazar en el bloque EXTRA_SCALES (líneas 1656+):
- `&gt;` → `>` en labels de JS (p.ej. `'TAS &gt;160'` → `'TAS >160'`)
- `&lt;` → `<`

NOTA: estas entidades están en strings JS que se insertan via `innerHTML`, así que `>` y `<` en texto plano son correctos — NO se interpretan como HTML porque están dentro de `<span>` o `<option>`. Verificar que cada caso está dentro de texto visible, no como cierre de tag.

- [ ] **Step 3: Añadir meta tags, OG tags y favicon al `<head>`**

Después de la línea `<title>` (línea 5), añadir:

```html
<meta name="description" content="URG CLÍNICO — Herramienta de consulta rápida para urgencias: cheatsheets, escalas interactivas, protocolos y fármacos.">
<meta property="og:title" content="URG CLÍNICO — Cheatsheet + Escalas">
<meta property="og:description" content="Consulta rápida para urgencias: escalas interactivas, protocolos, fármacos y cheatsheets clínicos.">
<meta property="og:type" content="website">
<meta name="theme-color" content="#0969da" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#161b22" media="(prefers-color-scheme: dark)">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
```

- [ ] **Step 4: Verificar que los fixes funcionan**

- Hacer click en ambas pestañas — la pestaña activa debe resaltarse correctamente
- Comprobar que las escalas que contenían `&gt;` muestran el carácter `>` correctamente
- Verificar que el favicon ⚡ aparece en la pestaña del navegador

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "fix: corregir showTab event global, HTML entities en escalas y añadir meta tags"
```

---

### Task 3: Extraer cheatsheets a data/cheatsheets.js

**Files:**
- Create: `data/cheatsheets.js`
- Modify: `index.html:401-913` (reemplazar HTML estático por `<div id="tab-cheatsheets">`)

**Interfaces:**
- Produces: `window.CHEATSHEETS` — array de objetos `{id, title, badge, badgeLabel, section, template}`. Función `renderCheatsheets()` en index.html que consume este array.

- [ ] **Step 1: Crear data/cheatsheets.js con el array de datos**

Crear directorio `data/` si no existe. Crear `data/cheatsheets.js` con todos los cheatsheets actuales extraídos del HTML. Cada objeto tiene:

```javascript
window.CHEATSHEETS = [
  {
    id: 'c1',
    title: 'Sepsis / Shock séptico',
    badge: 'red',
    badgeLabel: 'Crítico',
    section: 'Síndrome crítico / Shock',
    template: `/URG
Edad/Sexo: _a / M·F
Motivo: fiebre + hipotensión + foco _
Vitales: FC _ · FR _ · TA _/_ · SpO₂ _% · Tª _
Analítica: Lac _ · PCR _ · PCT _ · Cr _ · Bil _
          Leucos _ · Plaquetas _ · TP _
Hemocultivos: S·N (extraídos antes ATB: S·N)
Foco: pulmonar/urinario/abdominal/catéter/_
Fluidoterapia previa: _ ml cristaloide
AP: inmunosupresión S·N · DM S·N · neoplasia S·N
⚠ Hora inicio síntomas: _h · qSOFA: calcular
→ Escalas: qSOFA · SOFA · SAPS II`
  },
  // ... los 18 restantes con los mismos campos
];
```

Secciones existentes y sus cheatsheets:
1. "Síndrome crítico / Shock" (badge: red/Crítico): c1-Sepsis, c2-SCA, c3-TEP, c4-Ictus, c5-Shock
2. "Respiratorio / Cardiológico" (badge: amber/Urgente): c6-IC, c7-Neumonía, c8-FA, c9-EPOC
3. "Neurológico / Metabólico" (badge: amber/Urgente): c10-Delirium, c11-AKI, c12-CAD/HHS
4. "Digestivo / Geriátrico" (badge: amber/Urgente excepto c15-red/Crítico y c16-blue/Hospitalario): c13-HDA, c14-Pancreatitis, c15-Meningitis, c16-Caída anciano, c17-Intoxicación, c18-Crisis HTA

El template es texto plano — las marcas `<span class="key">`, `<span class="val">`, etc. se convierten en un sistema de marcado ligero en el template:
- Líneas que comienzan con texto seguido de `:` son keys
- `_` son campos rellenables (val)
- Líneas que comienzan con `⚠` son alerts
- Líneas que comienzan con `→` son notas

ALTERNATIVA MÁS SIMPLE: mantener el template como HTML raw (con los spans) tal cual está en el HTML original, y renderizarlo con `innerHTML`. Esto preserva exactamente el formato actual sin necesidad de parser.

```javascript
window.CHEATSHEETS = [
  {
    id: 'c1',
    title: 'Sepsis / Shock séptico',
    badge: 'red',
    badgeLabel: 'Crítico',
    section: 'Síndrome crítico / Shock',
    sectionIcon: '🔴',
    html: '<span class="key">/URG</span>\n<span class="key">Edad/Sexo:</span> <span class="val">_a / M·F</span>\n...'
  },
  // ...
];
```

Extraer el contenido de cada `<div class="code" id="cN">...</div>` tal cual (incluyendo spans) y asignarlo al campo `html`.

- [ ] **Step 2: Escribir renderCheatsheets() en index.html**

En el bloque `<script>` de `index.html`, añadir función que renderiza los cheatsheets:

```javascript
function renderCheatsheets() {
  const container = document.getElementById('tab-cheatsheets');
  const sections = {};
  CHEATSHEETS.forEach(ch => {
    if (!sections[ch.section]) sections[ch.section] = { icon: ch.sectionIcon, items: [] };
    sections[ch.section].items.push(ch);
  });
  container.innerHTML = Object.entries(sections).map(([name, sec]) =>
    '<div class="section-title">' + sec.icon + ' ' + name + '</div>' +
    '<div class="grid">' + sec.items.map(ch =>
      '<div class="card">' +
        '<div class="card-header">' +
          '<span class="badge badge-' + ch.badge + '">' + ch.badgeLabel + '</span>' +
          '<span class="card-title">' + ch.title + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="code" id="' + ch.id + '">' + ch.html + '</div>' +
          '<div class="btn-row"><button class="btn btn-copy" onclick="copyCard(\'' + ch.id + '\')">📋 Copiar</button></div>' +
        '</div>' +
      '</div>'
    ).join('') + '</div>'
  ).join('');
}
```

- [ ] **Step 3: Reemplazar HTML estático del tab cheatsheets**

Reemplazar todo el contenido entre `<div id="tab-cheatsheets" class="tab-content active">` y su cierre `</div><!-- end tab-cheatsheets -->` (líneas 401-913) por un contenedor vacío:

```html
<div id="tab-cheatsheets" class="tab-content active"></div>
```

Añadir `<script src="data/cheatsheets.js"></script>` antes del bloque `<script>` principal, y llamar `renderCheatsheets()` al final del script (junto a `renderScales()` y `calcSCA()`).

- [ ] **Step 4: Verificar que los cheatsheets se renderizan igual**

- Comparar visualmente con la versión anterior
- Verificar que copiar funciona en cada card
- Verificar que los spans de color (key, val, alert, note) se renderizan correctamente

- [ ] **Step 5: Commit**

```bash
git add data/cheatsheets.js index.html
git commit -m "refactor: extraer cheatsheets a data/cheatsheets.js con renderizado dinámico"
```

---

### Task 4: Extraer escalas a data/scales.js y migrar hand-coded scales

**Files:**
- Create: `data/scales.js`
- Modify: `index.html` (eliminar HTML de escalas hand-coded, eliminar funciones calc individuales, expandir el motor EXTRA_SCALES)

**Interfaces:**
- Produces: `window.SCALES` — array unificado con TODAS las escalas (las 8 hand-coded + las EXTRA_SCALES actuales). Formato: mismo que EXTRA_SCALES actual (`{id, title, sub, badge, tag, items, interp, agg}`).

- [ ] **Step 1: Migrar las 8 escalas hand-coded al formato EXTRA_SCALES**

Convertir cada escala hand-coded (qSOFA, CURB-65, Wells, CHA₂DS₂-VASc, HEART, Glasgow-Blatchford, BISAP, ABCD2) al formato declarativo EXTRA_SCALES. Ejemplo — qSOFA:

```javascript
{id:'qsofa', title:'qSOFA', sub:'Sepsis — screening rápido (≥2 = alto riesgo)', badge:'red', tag:'Sepsis', items:[
  {t:'chk', l:'FR ≥22 rpm', p:1},
  {t:'chk', l:'Alteración estado mental (GCS <15)', p:1},
  {t:'chk', l:'TAS ≤100 mmHg', p:1}],
  interp:s => s===0 ? ['low','Sin criterios','Riesgo bajo']
            : s===1 ? ['mid','1 criterio','Vigilancia — reevaluar']
                    : ['high','≥2 criterios','ALTO RIESGO SEPSIS — activar protocolo']}
```

Ejemplo — Wells TEP (con pesos decimales):
```javascript
{id:'wells', title:'Wells — TEP', sub:'Probabilidad pre-test de tromboembolismo', badge:'red', tag:'TEP', items:[
  {t:'chk', l:'Signos/síntomas de TVP', p:3},
  {t:'chk', l:'TEP más probable que diagnóstico alternativo', p:3},
  {t:'chk', l:'FC >100 lpm', p:1.5},
  {t:'chk', l:'Inmovilización ≥3 días o cirugía en <4 semanas', p:1.5},
  {t:'chk', l:'TEP o TVP previos', p:1.5},
  {t:'chk', l:'Hemoptisis', p:1},
  {t:'chk', l:'Neoplasia activa (tratamiento en <6 meses)', p:1}],
  interp:s => s<2 ? ['low','Probabilidad baja','DD <500 descarta TEP']
            : s<=6 ? ['mid','Probabilidad moderada','DD + AngioTC si DD+']
                   : ['high','Probabilidad alta','AngioTC directo sin DD previo']}
```

Ejemplo — HEART (con selects):
```javascript
{id:'heart', title:'HEART Score', sub:'SCA — Estratificación dolor torácico', badge:'red', tag:'SCA', items:[
  {t:'sel', l:'H — Historia', o:[['Poco sospechosa (0)',0],['Moderada (1)',1],['Muy sospechosa (2)',2]]},
  {t:'sel', l:'E — ECG', o:[['Normal (0)',0],['BRI/HVI/repolarización (1)',1],['Desviación ST nueva (2)',2]]},
  {t:'sel', l:'A — Edad', o:[['<45 años (0)',0],['45–65 años (1)',1],['>65 años (2)',2]]},
  {t:'sel', l:'R — Factores de riesgo CV', o:[['Sin FR conocidos (0)',0],['1–2 FR o historia aterosclerosis (1)',1],['≥3 FR o enfermedad aterosclerótica (2)',2]]},
  {t:'sel', l:'T — Troponina', o:[['≤LSN (0)',0],['1–3x LSN (1)',1],['>3x LSN (2)',2]]}],
  interp:s => s<=3 ? ['low','Riesgo bajo','Alta segura — MACE <2%']
            : s<=6 ? ['mid','Riesgo moderado','Ingreso — MACE 12–17%']
                   : ['high','Riesgo alto','Revascularización urgente — MACE >50%']}
```

Hacer lo mismo para: CURB-65, CHA₂DS₂-VASc, Glasgow-Blatchford, BISAP, ABCD2.

- [ ] **Step 2: Crear data/scales.js con todas las escalas unificadas**

```javascript
window.SCALES = [
  // 8 escalas migradas (antes hand-coded)
  {id:'qsofa', ...},
  {id:'curb65', ...},
  {id:'wells', ...},
  {id:'cha2ds2', ...},
  {id:'heart', ...},
  {id:'gbs', ...},
  {id:'bisap', ...},
  {id:'abcd2', ...},
  // Escalas que estaban en EXTRA_SCALES
  {id:'hasbled', ...},
  {id:'spesi', ...},
  {id:'pesi', ...},
  {id:'geneva', ...},
  {id:'nihss', ...},
  {id:'sofa', ...},
  {id:'gcs', ...},
  {id:'kdigo', ...},
  {id:'decaf', ...},
  {id:'ehra', ...},
  {id:'bms', ...},
];
```

- [ ] **Step 3: Actualizar index.html — eliminar escalas hand-coded y EXTRA_SCALES inline**

En `index.html`:
1. Eliminar todo el HTML de las 8 escalas hand-coded (líneas 1001-1369)
2. Eliminar las funciones calc individuales (calcQSOFA, calcCURB, calcWells, calcCHA, calcHEART, calcGBS, calcBISAP, calcABCD, resetScale, resetSelectScale — líneas 1399-1507)
3. Eliminar el array EXTRA_SCALES inline (líneas 1656-1885)
4. Mantener el Box SCA intacto (es un widget especial, no una escala declarativa)
5. Mantener las funciones del motor: `_scaleCtrl()`, `renderScales()`, `calcScale()`, `resetGeneric()` (eliminar `filterScales()` — será reemplazada por el buscador global en Task 6)
6. Cambiar `renderScales()` para usar `SCALES` en vez de `EXTRA_SCALES`
7. Añadir `<script src="data/scales.js"></script>` en el `<head>`

Actualizar renderScales:
```javascript
function renderScales() {
  document.getElementById('all-scales').innerHTML = SCALES.map(sc => ...
  // mismo código, cambiando EXTRA_SCALES → SCALES y 'extra-scales' → 'all-scales'
  SCALES.forEach(sc => calcScale(sc.id));
}
```

Actualizar calcScale, resetGeneric, y _scaleCtrl de la misma forma (EXTRA_SCALES → SCALES).

- [ ] **Step 4: Renombrar el div contenedor**

Cambiar `<div class="scales-grid" id="extra-scales">` a `<div class="scales-grid" id="all-scales">`.
Y el `<div class="section-title">Escalas adicionales — calculadoras generadas</div>` a `<div class="section-title">Escalas de gravedad — calculadoras interactivas</div>`.

Eliminar la sección-title anterior "Escalas de gravedad — calculadoras interactivas" (que envolvía las hand-coded).

Actualizar renderScales para usar `document.getElementById('all-scales')`.

- [ ] **Step 5: Verificar que todas las escalas funcionan**

- Verificar que las 8 escalas migradas dan los mismos resultados que las originales:
  - qSOFA: 3 checks → cada combinación da 0/1/2/3 con los mensajes correctos
  - Wells: comprobar que 1.5+1.5+3 = 6 (moderada), +3 = 9 (alta)
  - HEART: selects de 0-2 → rango 0-10
  - Glasgow-Blatchford: mix de selects y checks
- Verificar que el filtro funciona
- Verificar que el Box SCA sigue funcionando correctamente

- [ ] **Step 6: Commit**

```bash
git add data/scales.js index.html
git commit -m "refactor: unificar todas las escalas en data/scales.js con motor declarativo"
```

---

### Task 5: Botón "Copiar resultado" en todas las escalas

**Files:**
- Modify: `index.html` (función `renderScales()` y `calcScale()` para incluir botón copy)

**Interfaces:**
- Consumes: Motor de escalas de Task 4 (`SCALES`, `calcScale`, `renderScales`)
- Produces: Función `copyScaleResult(id)` global. Cada escala renderizada incluye botón "Copiar resultado".

- [ ] **Step 1: Añadir botón "Copiar resultado" al renderizado**

En `renderScales()`, después del botón reset, añadir:

```javascript
'<button class="btn btn-copy" onclick="copyScaleResult(\'' + sc.id + '\')" style="margin-top:8px;margin-left:6px">📋 Copiar resultado</button>'
```

- [ ] **Step 2: Implementar copyScaleResult()**

```javascript
function copyScaleResult(id) {
  const sc = SCALES.find(x => x.id === id);
  const num = document.getElementById(id + '-num').textContent;
  const risk = document.getElementById(id + '-risk').textContent;
  const detail = document.getElementById(id + '-detail').textContent;
  const txt = sc.title + ': ' + num + ' — ' + risk + '\n' + detail;
  navigator.clipboard.writeText(txt).then(showToast);
}
```

Formato de salida ejemplo:
```
qSOFA: 2/3 — ≥2 criterios
ALTO RIESGO SEPSIS — activar protocolo
```

Para escalas con puntuación máxima conocida, incluir el denominador. Añadir campo `max` al objeto de la escala en `data/scales.js`:

```javascript
{id:'qsofa', title:'qSOFA', max:3, ...}
```

Y en copyScaleResult:
```javascript
const score = sc.max ? num + '/' + sc.max : num;
const txt = sc.title + ': ' + score + ' — ' + risk + '\n' + detail;
```

- [ ] **Step 3: Verificar el formato copiado**

- Calcular qSOFA con 2 criterios → copiar → pegar en notepad → debe mostrar `qSOFA: 2/3 — ≥2 criterios\nALTO RIESGO SEPSIS — activar protocolo`
- Calcular Wells con probabilidad alta → copiar → verificar formato
- Verificar que el Box SCA sigue usando su propia función copySCA()

- [ ] **Step 4: Commit**

```bash
git add index.html data/scales.js
git commit -m "feat: botón copiar resultado estandarizado en todas las escalas"
```

---

### Task 6: Navegación de 4 pestañas + buscador global

**Files:**
- Modify: `index.html` (nav, tabs, función showTab, buscador)

**Interfaces:**
- Consumes: `showTab(name, btn)` de Task 2
- Produces: 4 pestañas (Cheatsheets, Escalas, Protocolos, Fármacos). Función `globalSearch(q)`.

- [ ] **Step 1: Añadir pestañas Protocolos y Fármacos al nav**

```html
<div class="nav">
  <button class="nav-btn active" onclick="showTab('cheatsheets', this)">📋 Cheatsheets</button>
  <button class="nav-btn" onclick="showTab('escalas', this)">📊 Escalas</button>
  <button class="nav-btn" onclick="showTab('protocolos', this)">🔀 Protocolos</button>
  <button class="nav-btn" onclick="showTab('farmacos', this)">💊 Fármacos</button>
  <input class="filter-input" type="search" placeholder="🔍 Buscar en todo…" oninput="globalSearch(this.value)" style="margin-left:auto;max-width:240px">
</div>
```

CSS para la barra de búsqueda en el nav:
```css
.nav .filter-input {
  font-size: 12px;
  padding: 5px 10px;
}
```

- [ ] **Step 2: Añadir contenedores para las pestañas nuevas**

Después de `</div><!-- end tab-escalas -->`:

```html
<div id="tab-protocolos" class="tab-content"></div>
<div id="tab-farmacos" class="tab-content"></div>
```

- [ ] **Step 3: Implementar buscador global**

```javascript
function globalSearch(q) {
  const t = q.trim().toLowerCase();
  if (!t) {
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.style.display = '';
      tab.querySelectorAll('.card, .scale-card, .protocol-card, .drug-card').forEach(c => c.style.display = '');
    });
    // Restore active tab state
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    const activeBtn = document.querySelector('.nav-btn.active');
    const activeName = activeBtn ? activeBtn.textContent.toLowerCase() : 'cheatsheets';
    const tabId = activeName.includes('cheatsheet') ? 'tab-cheatsheets'
               : activeName.includes('escala') ? 'tab-escalas'
               : activeName.includes('protocolo') ? 'tab-protocolos'
               : 'tab-farmacos';
    document.getElementById(tabId).classList.add('active');
    return;
  }
  // Show ALL tabs and filter within each
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'block';
    let hasVisible = false;
    tab.querySelectorAll('.card, .scale-card, .protocol-card, .drug-card').forEach(card => {
      const match = card.textContent.toLowerCase().includes(t);
      card.style.display = match ? '' : 'none';
      if (match) hasVisible = true;
    });
    // Hide entire tab section if no matches
    tab.style.display = hasVisible ? 'block' : 'none';
  });
}
```

- [ ] **Step 4: Mover el filtro de escalas existente al buscador global**

Eliminar el `<div class="filter-wrap">` que está dentro del tab-escalas (línea 919). El buscador global del nav reemplaza esta funcionalidad. Eliminar la función `filterScales()`.

- [ ] **Step 5: Verificar navegación**

- Click en cada pestaña → solo su contenido es visible
- Buscar "sepsis" → muestra cards de cheatsheets y escalas que contengan "sepsis"
- Buscar vacío → restaura todo
- Verificar en móvil que el nav no desborda

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: navegación de 4 pestañas con buscador global"
```

---

### Task 7: Contenido — escalas clínicas nuevas

**Files:**
- Modify: `data/scales.js` (añadir 11 escalas nuevas al array SCALES)

**Interfaces:**
- Consumes: Motor de escalas (`renderScales`, `calcScale`) y formato EXTRA_SCALES
- Produces: 11 escalas nuevas: NEWS2, APACHE II, Ranson, SAPS II, MELD, Child-Pugh, 4AT, CAM-ICU, PSI/PORT, RASS, MRC

- [ ] **Step 1: Implementar NEWS2**

```javascript
{id:'news2', title:'NEWS2', sub:'Triaje general — detección precoz de deterioro', badge:'red', tag:'Triaje', items:[
  {t:'sel', l:'FR (rpm)', o:[['12–20 (0)',0],['9–11 (1)',1],['21–24 (2)',2],['≤8 o ≥25 (3)',3]]},
  {t:'sel', l:'SpO₂ (%) — Escala 1', o:[['≥96 (0)',0],['94–95 (1)',1],['92–93 (2)',2],['≤91 (3)',3]]},
  {t:'sel', l:'Aire / O₂', o:[['Aire ambiente (0)',0],['O₂ suplementario (2)',2]]},
  {t:'sel', l:'TAS (mmHg)', o:[['111–219 (0)',0],['101–110 (1)',1],['91–100 (2)',2],['≤90 o ≥220 (3)',3]]},
  {t:'sel', l:'FC (lpm)', o:[['51–90 (0)',0],['41–50 o 91–110 (1)',1],['111–130 (2)',2],['≤40 o ≥131 (3)',3]]},
  {t:'sel', l:'Consciencia', o:[['Alerta (0)',0],['Confusión / voz / dolor / no responde (3)',3]]},
  {t:'sel', l:'Temperatura (°C)', o:[['36,1–38,0 (0)',0],['35,1–36,0 o 38,1–39,0 (1)',1],['≥39,1 (2)',2],['≤35,0 (3)',3]]}],
  interp:s => s<=4 ? ['low',s+' puntos','Bajo riesgo — monitorización rutinaria']
            : s<=6 ? ['mid',s+' puntos — respuesta urgente','Escalón: valoración clínica urgente']
                   : ['high',s+' puntos — emergencia','Activar equipo de respuesta rápida']}
```

- [ ] **Step 2: Implementar las otras 10 escalas**

Añadir al array SCALES en `data/scales.js`:

Escalas a implementar (con su formato):
1. **APACHE II** (UCI) — items tipo `sel` para cada variable fisiológica + edad + Glasgow + enfermedad crónica. 12 variables. `interp` con mortalidad estimada por rangos.
2. **Ranson** (Digestivo) — 11 items `chk` (5 al ingreso, 6 a las 48h). `interp` con rangos de mortalidad.
3. **SAPS II** (UCI) — items tipo `sel` para variables fisiológicas. `interp` con mortalidad estimada.
4. **MELD** (Digestivo) — items tipo `num` para bilirrubina, creatinina, INR. Fórmula logarítmica. `interp` con mortalidad a 3 meses.
5. **Child-Pugh** (Digestivo) — 5 items tipo `sel`. `interp` con clase A/B/C.
6. **4AT** (Neuro) — 4 items tipo `sel`. `interp` con screening delirium.
7. **CAM-ICU** (UCI) — 4 items tipo `sel` (criterios CAM adaptados). `interp` positivo/negativo.
8. **PSI/PORT** (Respiratorio) — items tipo `num` y `chk` para demografía y hallazgos. `interp` con clases I-V.
9. **RASS** (UCI) — 1 item tipo `sel` con escala -5 a +4. `interp` con nivel de sedación.
10. **MRC** (Respiratorio) — 1 item tipo `sel` con grados 0-4. `interp` con grado de disnea.

Para MELD, que requiere fórmula logarítmica, usar items tipo `num` con una función `interp` personalizada:

```javascript
{id:'meld', title:'MELD', sub:'Hepatopatía — prioridad trasplante', badge:'amber', tag:'Digestivo',
  items:[
    {t:'num', l:'Bilirrubina total (mg/dL)', u:'mg/dL', f:v => 0},
    {t:'num', l:'Creatinina (mg/dL)', u:'mg/dL', f:v => 0},
    {t:'num', l:'INR', u:'', f:v => 0}],
  agg:'custom',
  calcCustom: function(vals, items) {
    const bil = Math.max(1, vals[0] || 1);
    const cr = Math.min(4, Math.max(1, vals[1] || 1));
    const inr = Math.max(1, vals[2] || 1);
    return Math.round(10 * (0.957 * Math.log(cr) + 0.378 * Math.log(bil) + 1.12 * Math.log(inr) + 0.643));
  },
  interp:s => s<10 ? ['low',s+' puntos','Mortalidad 3 meses ~2%']
            : s<20 ? ['mid',s+' puntos','Mortalidad 3 meses ~6%']
            : s<30 ? ['high',s+' puntos','Mortalidad 3 meses ~20%']
                   : ['high',s+' puntos','Mortalidad 3 meses ~50–70% — priorizar trasplante']}
```

NOTA: Para escalas con `agg:'custom'`, actualizar `calcScale()` en index.html para soportar `calcCustom`:

```javascript
function calcScale(id) {
  const sc = SCALES.find(x => x.id === id);
  const vals = sc.items.map((it, i) => {
    const el = document.getElementById(id + '_' + i);
    if (it.t === 'sel') return parseFloat(el.value);
    if (it.t === 'num') {
      const v = parseFloat(el.value);
      const p = isNaN(v) ? 0 : it.f(v);
      document.getElementById(id + '_' + i + '-p').textContent = '+' + p;
      return it.f ? p : v;
    }
    return el.checked ? it.p : 0;
  });
  let s;
  if (sc.calcCustom) {
    const rawVals = sc.items.map((it, i) => {
      const el = document.getElementById(id + '_' + i);
      if (it.t === 'num') return parseFloat(el.value);
      return parseFloat(el.value);
    });
    s = sc.calcCustom(rawVals, sc.items);
  } else {
    s = sc.agg === 'max' ? Math.max.apply(null, vals) : vals.reduce((a, b) => a + b, 0);
  }
  const [cls, risk, det] = sc.interp(s);
  document.getElementById(id + '-num').textContent = s;
  const r = document.getElementById(id + '-risk');
  r.className = 'score-risk risk-' + cls;
  r.innerHTML = risk;
  document.getElementById(id + '-detail').innerHTML = det;
}
```

- [ ] **Step 3: Verificar las 11 escalas nuevas**

Para cada escala nueva:
- Verificar que se renderiza correctamente
- Probar valores extremos (mínimo y máximo)
- Verificar que la interpretación cambia según los rangos documentados
- Copiar resultado → verificar formato

- [ ] **Step 4: Commit**

```bash
git add data/scales.js index.html
git commit -m "feat: añadir 11 escalas clínicas nuevas (NEWS2, APACHE II, Ranson, etc.)"
```

---

### Task 8: Contenido — cheatsheets nuevos

**Files:**
- Modify: `data/cheatsheets.js` (añadir 8 cheatsheets al array CHEATSHEETS)

**Interfaces:**
- Consumes: `renderCheatsheets()` de Task 3
- Produces: 8 cheatsheets nuevos añadidos al array

- [ ] **Step 1: Añadir los 8 cheatsheets nuevos**

Añadir al array `CHEATSHEETS` en `data/cheatsheets.js`:

1. **Anafilaxia** (Crítico/red) — sección "Síndrome crítico / Shock"
2. **Politrauma / ATLS (ABCDE)** (Crítico/red) — misma sección
3. **Arritmias** (Urgente/amber) — sección "Respiratorio / Cardiológico"
4. **Crisis asmática** (Urgente/amber) — misma sección
5. **Dolor abdominal agudo** (Urgente/amber) — sección "Digestivo / Geriátrico"
6. **Convulsiones / Status epiléptico** (Urgente/amber) — sección "Neurológico / Metabólico"
7. **TCE** (Urgente/amber) — misma sección
8. **TVP** (Urgente/amber) — nueva sección "Vascular"

Cada cheatsheet sigue la estructura de los existentes: template con campos rellenables (_), claves en `<span class="key">`, valores en `<span class="val">`, alertas en `<span class="alert">`, notas en `<span class="note">`.

Ejemplo — Anafilaxia:
```javascript
{
  id: 'c19',
  title: 'Anafilaxia',
  badge: 'red',
  badgeLabel: 'Crítico',
  section: 'Síndrome crítico / Shock',
  sectionIcon: '🔴',
  html: '<span class="key">/URG ANAFILAXIA</span>\n' +
    '<span class="key">Edad/Sexo/Peso:</span> <span class="val">_a / M·F / _kg</span>\n' +
    '<span class="key">Alérgeno sospechoso:</span> fármaco/alimento/picadura/látex/_\n' +
    '<span class="key">Tiempo exposición-síntomas:</span> _ min\n' +
    '<span class="key">Vitales:</span> FC _ · TA _/_ · SpO₂ _% · FR _\n' +
    '<span class="key">Piel:</span> urticaria S·N · angioedema S·N · prurito generalizado S·N\n' +
    '<span class="key">Respiratorio:</span> estridor S·N · sibilancias S·N · disnea S·N\n' +
    '<span class="key">CV:</span> hipotensión S·N · síncope S·N · taquicardia S·N\n' +
    '<span class="key">GI:</span> náuseas/vómitos S·N · dolor abdominal S·N\n' +
    '<span class="key">Triptasa sérica:</span> _ (extraer en primera hora)\n' +
    '<span class="key">Adrenalina IM:</span> _ mg (0,01 mg/kg máx 0,5) · hora: _\n' +
    '<span class="key">Dosis repetidas:</span> _ (cada 5-15 min si necesario)\n' +
    '<span class="key">Fluidoterapia:</span> _ ml bolo SSF\n' +
    '<span class="key">AP:</span> alergias conocidas _ · asma S·N · mastocitosis S·N\n' +
    '<span class="alert">⚠ ADRENALINA IM 0,5 mg INMEDIATA — cara anterolateral muslo</span>\n' +
    '<span class="note">→ Observación mínima 6-12 h por riesgo bifásica</span>'
}
```

- [ ] **Step 2: Verificar renderizado**

- Los 8 cheatsheets nuevos aparecen en sus secciones correctas
- El formato visual es idéntico al de los existentes
- Copiar funciona en cada uno

- [ ] **Step 3: Commit**

```bash
git add data/cheatsheets.js
git commit -m "feat: añadir 8 cheatsheets clínicos nuevos (anafilaxia, politrauma, arritmias, etc.)"
```

---

### Task 9: Pestaña Protocolos con data/protocols.js

**Files:**
- Create: `data/protocols.js`
- Modify: `index.html` (renderProtocols, CSS para protocol-card)

**Interfaces:**
- Consumes: Tab navigation de Task 6
- Produces: `window.PROTOCOLS` array. `renderProtocols()` función. 6 protocolos.

- [ ] **Step 1: Definir formato de datos para protocolos**

Los protocolos son algoritmos paso a paso con decisiones binarias. Formato:

```javascript
window.PROTOCOLS = [
  {
    id: 'rcp',
    title: 'RCP / SVA',
    sub: 'Soporte vital avanzado — desfibrilable vs no desfibrilable',
    badge: 'red',
    tag: 'Crítico',
    steps: [
      {type: 'action', text: 'Confirmar PCR: comprobar respuesta, vía aérea, respiración, pulso (máx 10 s)'},
      {type: 'action', text: 'Iniciar RCP 30:2 · Monitorizar · Pedir DEA/desfibrilador'},
      {type: 'decision', text: '¿Ritmo desfibrilable?', yes: 'FV / TV sin pulso', no: 'Asistolia / AESP'},
      {type: 'action', text: 'FV/TV: Descarga 150-200 J bifásico → RCP 2 min', branch: 'yes'},
      {type: 'action', text: 'Asistolia/AESP: RCP 2 min → Adrenalina 1 mg IV cada 3-5 min', branch: 'no'},
      {type: 'action', text: 'Tras 3ª descarga: Amiodarona 300 mg IV', branch: 'yes'},
      {type: 'action', text: 'Buscar causas reversibles: 4H + 4T'},
      {type: 'info', text: '4H: Hipoxia · Hipovolemia · Hipo/Hiperkaliemia · Hipotermia\n4T: Neumotórax a Tensión · Taponamiento · Tóxicos · TEP'}
    ]
  },
  // ... otros 5 protocolos
];
```

- [ ] **Step 2: Crear data/protocols.js con 6 protocolos**

Protocolos a crear:
1. RCP / SVA
2. Vía aérea difícil (plan A/B/C/D)
3. Secuencia rápida de intubación
4. Manejo de hiperkalemia
5. Protocolo de transfusión masiva
6. Manejo del dolor torácico

- [ ] **Step 3: Añadir CSS para protocol-card**

```css
.protocol-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}
.protocol-step {
  padding: 8px 14px;
  border-bottom: 1px solid var(--bg3);
  font-size: 12px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.protocol-step:last-child { border-bottom: none; }
.step-icon {
  font-size: 14px;
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}
.step-decision { background: var(--amber-bg); font-weight: 500; }
.step-info { background: var(--blue-bg); font-size: 11px; }
```

- [ ] **Step 4: Implementar renderProtocols()**

```javascript
function renderProtocols() {
  const container = document.getElementById('tab-protocolos');
  container.innerHTML = '<div class="section-title">🔀 Protocolos de actuación</div>' +
    PROTOCOLS.map(p =>
      '<div class="protocol-card">' +
        '<div class="scale-header"><div>' +
          '<div class="scale-title">' + p.title + '</div>' +
          '<div class="scale-subtitle">' + p.sub + '</div>' +
        '</div><span class="badge badge-' + p.badge + '">' + p.tag + '</span></div>' +
        '<div class="scale-body">' +
          p.steps.map((s, i) => {
            const icon = s.type === 'decision' ? '◇' : s.type === 'info' ? 'ℹ' : (i + 1);
            const cls = s.type === 'decision' ? ' step-decision' : s.type === 'info' ? ' step-info' : '';
            return '<div class="protocol-step' + cls + '"><span class="step-icon">' + icon + '</span><span>' + s.text.replace(/\n/g, '<br>') + '</span></div>';
          }).join('') +
        '</div>' +
      '</div>'
    ).join('');
}
```

Añadir `<script src="data/protocols.js"></script>` y llamar `renderProtocols()`.

- [ ] **Step 5: Verificar protocolos**

- La pestaña Protocolos muestra los 6 protocolos
- Las decisiones se distinguen visualmente
- El buscador global encuentra contenido en protocolos

- [ ] **Step 6: Commit**

```bash
git add data/protocols.js index.html
git commit -m "feat: pestaña Protocolos con 6 algoritmos de actuación"
```

---

### Task 10: Pestaña Fármacos con data/drugs.js

**Files:**
- Create: `data/drugs.js`
- Modify: `index.html` (renderDrugs, CSS para drug-card, calculadora por peso)

**Interfaces:**
- Consumes: Tab navigation de Task 6
- Produces: `window.DRUGS` array. `renderDrugs()` función. `recalcDrugs(peso)` función. 6 grupos de fármacos.

- [ ] **Step 1: Definir formato de datos para fármacos**

```javascript
window.DRUGS = [
  {
    group: 'Drogas vasoactivas',
    badge: 'red',
    tag: 'UCI',
    drugs: [
      {
        name: 'Noradrenalina',
        dilution: '4 mg (4 amp) en 250 mL SG5% = 16 µg/mL',
        doseRange: '0,05–1 µg/kg/min',
        doseCalc: peso => ({
          min: (0.05 * peso * 60 / 16).toFixed(1),
          max: (1 * peso * 60 / 16).toFixed(1),
          unit: 'mL/h'
        }),
        alerts: ['Vía central obligatoria', 'Monitorizar TA invasiva']
      },
      // ... más fármacos
    ]
  },
  // ... más grupos
];
```

- [ ] **Step 2: Crear data/drugs.js con 6 grupos**

Grupos:
1. Drogas vasoactivas (noradrenalina, dopamina, dobutamina)
2. Sedación/analgesia (midazolam, fentanilo, ketamina, propofol)
3. Antiarrítmicos (amiodarona, adenosina, verapamilo, flecainida)
4. Urgencias (adrenalina, atropina, bicarbonato, gluconato cálcico)
5. Anticoagulación (heparina sódica, enoxaparina)
6. Otros (alteplasa, flumazenilo, naloxona, N-acetilcisteína)

- [ ] **Step 3: Implementar renderDrugs() y calculadora por peso**

```javascript
function renderDrugs() {
  const container = document.getElementById('tab-farmacos');
  const pesoInput = '<div class="filter-wrap" style="display:flex;align-items:center;gap:8px">' +
    '<label style="font-size:12px;color:var(--text2)">Peso del paciente:</label>' +
    '<input type="number" class="num-in" id="drug-peso" value="70" min="20" max="250" ' +
    'oninput="recalcDrugs(this.value)" style="width:80px"> <span style="font-size:12px;color:var(--text2)">kg</span></div>';

  container.innerHTML = '<div class="section-title">💊 Dosificación rápida por peso</div>' +
    pesoInput +
    '<div class="scales-grid">' +
    DRUGS.map(g => g.drugs.map(d =>
      '<div class="drug-card scale-card">' +
        '<div class="scale-header"><div>' +
          '<div class="scale-title">' + d.name + '</div>' +
          '<div class="scale-subtitle">' + g.group + '</div>' +
        '</div><span class="badge badge-' + g.badge + '">' + g.tag + '</span></div>' +
        '<div class="scale-body">' +
          '<div class="scale-item"><span class="scale-label">Dilución</span><span class="scale-pts">' + d.dilution + '</span></div>' +
          '<div class="scale-item"><span class="scale-label">Dosis</span><span class="scale-pts">' + d.doseRange + '</span></div>' +
          '<div class="scale-item" id="dose-' + d.name.replace(/\s/g,'') + '"><span class="scale-label">Para <span class="drug-peso-val">70</span> kg</span>' +
            '<span class="scale-pts drug-dose">—</span></div>' +
          (d.alerts ? d.alerts.map(a => '<div class="scale-item" style="color:var(--red);font-size:11px">⚠ ' + a + '</div>').join('') : '') +
        '</div>' +
      '</div>'
    ).join('')).join('') +
    '</div>';

  recalcDrugs(70);
}

function recalcDrugs(peso) {
  peso = parseFloat(peso) || 70;
  document.querySelectorAll('.drug-peso-val').forEach(el => el.textContent = peso);
  DRUGS.forEach(g => g.drugs.forEach(d => {
    if (d.doseCalc) {
      const calc = d.doseCalc(peso);
      const el = document.querySelector('#dose-' + d.name.replace(/\s/g,'') + ' .drug-dose');
      if (el) el.textContent = calc.min + '–' + calc.max + ' ' + calc.unit;
    }
  }));
}
```

- [ ] **Step 4: Verificar fármacos**

- La pestaña Fármacos muestra los 6 grupos con todos los fármacos
- Cambiar el peso a 80 kg → las dosis recalculan
- Peso mínimo (20 kg) y máximo (250 kg) no producen NaN
- Las alertas se muestran en rojo

- [ ] **Step 5: Commit**

```bash
git add data/drugs.js index.html
git commit -m "feat: pestaña Fármacos con calculadora por peso y 6 grupos"
```

---

### Task 11: PWA — manifest.json + service worker

**Files:**
- Create: `manifest.json`
- Create: `sw.js`
- Modify: `index.html` (`<head>` — link manifest + register SW)

**Interfaces:**
- Consumes: Todos los archivos del proyecto
- Produces: PWA instalable con soporte offline completo

- [ ] **Step 1: Crear manifest.json**

```json
{
  "name": "URG CLÍNICO",
  "short_name": "URG",
  "description": "Cheatsheets + Escalas para urgencias",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0d1117",
  "theme_color": "#0969da",
  "icons": [
    {"src": "icon-192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "icon-512.png", "sizes": "512x512", "type": "image/png"}
  ]
}
```

NOTA: Los iconos se generarán como SVG inline convertidos a PNG, o se usarán emojis renderizados. Si no hay iconos PNG disponibles, usar SVG data URI:

```json
"icons": [
  {"src": "icon.svg", "sizes": "any", "type": "image/svg+xml"}
]
```

Y crear `icon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚡</text></svg>
```

- [ ] **Step 2: Crear sw.js**

```javascript
const CACHE = 'urg-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/data/cheatsheets.js',
  '/data/scales.js',
  '/data/protocols.js',
  '/data/drugs.js',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
```

- [ ] **Step 3: Registrar SW y vincular manifest en index.html**

En `<head>`, añadir:
```html
<link rel="manifest" href="manifest.json">
```

Al final del `<script>`, añadir:
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
```

- [ ] **Step 4: Verificar PWA**

- Abrir en Chrome DevTools > Application > Manifest — datos correctos
- Application > Service Workers — registrado y activo
- Lighthouse > PWA — cumple criterios de instalabilidad
- Desconectar red → recargar → funciona offline

- [ ] **Step 5: Commit**

```bash
git add manifest.json sw.js icon.svg index.html
git commit -m "feat: PWA con manifest y service worker para offline completo"
```

---

### Task 12: Favoritos y escalas recientes

**Files:**
- Modify: `index.html` (funciones JS para favoritos + recientes, CSS para estrella)

**Interfaces:**
- Consumes: `renderCheatsheets()`, `renderScales()`, `renderProtocols()`, `renderDrugs()`
- Produces: `toggleFav(type, id)`, `trackRecent(id)`. Cards favoritas se ordenan primero. Sección "Recientes" en tab escalas.

- [ ] **Step 1: Implementar sistema de favoritos con localStorage**

```javascript
function getFavs() {
  try { return JSON.parse(localStorage.getItem('urg-favs') || '{}'); } catch { return {}; }
}

function toggleFav(type, id) {
  const favs = getFavs();
  const key = type + ':' + id;
  if (favs[key]) delete favs[key];
  else favs[key] = Date.now();
  localStorage.setItem('urg-favs', JSON.stringify(favs));
  // Re-render the relevant tab
  if (type === 'cheatsheet') renderCheatsheets();
  else if (type === 'scale') renderScales();
  else if (type === 'protocol') renderProtocols();
  else renderDrugs();
}
```

- [ ] **Step 2: Añadir estrella a cada card en las funciones de render**

En `renderCheatsheets()`, dentro de cada card header, después del título:

```javascript
const favs = getFavs();
const isFav = favs['cheatsheet:' + ch.id];
// Add star button:
'<button class="fav-btn' + (isFav ? ' fav-active' : '') + '" onclick="event.stopPropagation();toggleFav(\'cheatsheet\',\'' + ch.id + '\')" aria-label="Favorito">★</button>'
```

CSS:
```css
.fav-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: var(--text2);
  cursor: pointer;
  padding: 4px;
  margin-left: auto;
}
.fav-btn.fav-active { color: var(--amber); }
.fav-btn:hover { color: var(--amber); }
```

Hacer lo mismo en `renderScales()`, `renderProtocols()`, `renderDrugs()`.

- [ ] **Step 3: Ordenar favoritos primero en cada render**

En cada función de render, antes de generar HTML, ordenar el array poniendo favoritos primero:

```javascript
const favs = getFavs();
const sorted = [...items].sort((a, b) => {
  const fa = favs[type + ':' + a.id] || 0;
  const fb = favs[type + ':' + b.id] || 0;
  return fb - fa; // favoritos primero, más recientes arriba
});
```

- [ ] **Step 4: Sección "Recientes" en escalas**

```javascript
function trackRecent(id) {
  let recent = [];
  try { recent = JSON.parse(localStorage.getItem('urg-recent') || '[]'); } catch {}
  recent = recent.filter(r => r !== id);
  recent.unshift(id);
  recent = recent.slice(0, 5);
  localStorage.setItem('urg-recent', JSON.stringify(recent));
}
```

Llamar `trackRecent(id)` dentro de `calcScale(id)`.

En `renderScales()`, al inicio del contenedor, mostrar las 5 recientes:

```javascript
const recent = JSON.parse(localStorage.getItem('urg-recent') || '[]');
const recentHtml = recent.length ? '<div class="section-title">🕐 Usadas recientemente</div><div class="scales-grid">' +
  recent.map(rid => { const sc = SCALES.find(x => x.id === rid); return sc ? renderOneScale(sc) : ''; }).join('') +
  '</div>' : '';
```

- [ ] **Step 5: Verificar favoritos y recientes**

- Marcar un cheatsheet como favorito → aparece primero al recargar
- Calcular 3 escalas → sección "Recientes" las muestra
- Recargar la página → favoritos y recientes persisten

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: sistema de favoritos y escalas recientes con localStorage"
```

---

### Task 13: Mejoras mobile + touch targets + print CSS

> **Nota:** El header sticky ya existe en el CSS actual (`.header { position: sticky; top: 0; }`). Esta task mejora el comportamiento en móvil.

**Files:**
- Modify: `index.html` (CSS responsive)

**Interfaces:**
- Consumes: Todo el CSS existente
- Produces: Touch targets ≥44px, grid responsive mejorado, print CSS completo

- [ ] **Step 1: Aumentar touch targets**

```css
.scale-input input[type=checkbox] {
  width: 20px;
  height: 20px;
}

.scale-input select {
  min-height: 36px;
  font-size: 13px;
}

.btn, .nav-btn, .reset-btn {
  min-height: 44px;
  min-width: 44px;
  padding: 8px 14px;
}

.field input, .field select {
  min-height: 40px;
}
```

- [ ] **Step 2: Mejorar responsive grid**

```css
@media (max-width: 600px) {
  .grid, .scales-grid { grid-template-columns: 1fr; }
  .nav { top: auto; position: static; flex-wrap: wrap; }
  .header { flex-wrap: wrap; }
  .header h1 { font-size: 14px; }
  .fields { grid-template-columns: repeat(2, 1fr); }
  .chk-grid { grid-template-columns: 1fr; }
  .tiles { grid-template-columns: 1fr; }
}

@media (min-width: 601px) and (max-width: 900px) {
  .grid, .scales-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 3: Completar print CSS**

```css
@media print {
  .nav, .header .btn, .btn-row, .reset-btn, .filter-wrap, .theme-toggle,
  .scale-input, input, select, button { display: none; }
  body { background: white; color: black; font-size: 12px; }
  .card, .scale-card, .protocol-card, .drug-card {
    border: 1px solid #ccc;
    break-inside: avoid;
    margin-bottom: 8px;
  }
  .header { position: static; background: white; border-bottom: 2px solid black; }
  .tab-content { display: block !important; }
  .score-display { border: 1px solid #999; }
  .badge { border: 1px solid currentColor; }
}
```

- [ ] **Step 4: Verificar en móvil**

- Redimensionar a 375px de ancho
- Todos los botones y checkboxes son pulsables fácilmente
- El nav no desborda
- Las cards ocupan todo el ancho
- Preview > print — formato limpio

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: mejoras responsive, touch targets 44px y print CSS completo"
```

---

### Task 14: Deploy en Cloudflare Pages

**Files:**
- No files created — configuración vía CLI/dashboard

**Interfaces:**
- Consumes: Todo el proyecto completo
- Produces: URL pública en `urgencias.doctorhiguera.com`

- [ ] **Step 1: Verificar que el repo está limpio y todo committed**

```bash
git status
git log --oneline -5
```

- [ ] **Step 2: Push a GitHub**

```bash
git push origin main
```

- [ ] **Step 3: Crear proyecto en Cloudflare Pages**

Vía wrangler CLI o Cloudflare dashboard:
- Conectar al repo `juliandavidhiguera/urgencias`
- Build command: (vacío — no hay build step)
- Output directory: `/` (raíz del proyecto)
- Deploy automático en push a `main`

```bash
npx wrangler pages project create urgencias
npx wrangler pages deploy . --project-name=urgencias
```

- [ ] **Step 4: Configurar subdominio**

En Cloudflare DNS para doctorhiguera.com:
- CNAME `urgencias` → `urgencias.pages.dev`

En Cloudflare Pages > Custom Domains:
- Añadir `urgencias.doctorhiguera.com`

- [ ] **Step 5: Verificar deploy**

- Abrir `urgencias.doctorhiguera.com` en navegador
- Verificar que carga correctamente
- Verificar HTTPS
- Verificar que la PWA se puede instalar
- Verificar offline

- [ ] **Step 6: Commit con deploy exitoso (si hay cambios de config)**

```bash
git add -A
git commit -m "chore: deploy en Cloudflare Pages como urgencias.doctorhiguera.com"
```
