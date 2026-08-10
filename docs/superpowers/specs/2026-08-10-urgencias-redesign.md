# URG CLÍNICO — Rediseño y ampliación

## Contexto

Herramienta clínica de consulta rápida para urgencias hospitalarias. Uso personal del Dr. Higuera en guardias (móvil en triaje/pasillos, PC en el box). Actualmente es un HTML monolítico de ~2000 líneas con tema oscuro, 15 cheatsheets y 8+ escalas interactivas.

## Objetivos

1. Rediseñar la UI con tema auto (claro/oscuro)
2. Añadir contenido clínico: más escalas, cheatsheets, protocolos y fármacos
3. Resultado copiable estandarizado en cada escala para pegar en historia clínica
4. Desplegar como PWA offline en `urgencias.doctorhiguera.com`
5. Code review y correcciones del código existente

## Arquitectura

### Enfoque: HTML evolucionado con datos separados

Sin framework. Carga instantánea. Funciona offline nativamente.

```
urgencias/
├── index.html              ← Shell: header, nav, tabs, CSS, motor de renderizado
├── data/
│   ├── cheatsheets.js      ← Array de objetos con plantillas clínicas
│   ├── scales.js           ← Array de objetos con escalas (formato EXTRA_SCALES)
│   ├── protocols.js        ← Algoritmos de decisión paso a paso
│   └── drugs.js            ← Dosificación rápida de fármacos
├── manifest.json           ← PWA
├── sw.js                   ← Service worker para offline
├── icon-192.png            ← Icono PWA
└── icon-512.png            ← Icono PWA
```

### Motor de renderizado

El `index.html` contiene un motor JS declarativo que:
1. Importa los arrays de `data/*.js` (via `<script src>`)
2. Renderiza las cards según el tipo (cheatsheet, escala, protocolo, fármaco)
3. Gestiona tabs, filtros, favoritos y copiado

Los archivos `data/*.js` exportan arrays de objetos a variables globales (no ESM, para compatibilidad máxima):
- `window.CHEATSHEETS = [...]`
- `window.SCALES = [...]`
- `window.PROTOCOLS = [...]`
- `window.DRUGS = [...]`

## Diseño UI/UX

### Tema auto (claro/oscuro)

- Por defecto: sigue `prefers-color-scheme` del sistema
- Toggle manual en el header (sol/luna) que persiste en `localStorage`
- Tema claro: fondo blanco (#f8f9fa), cards blancas, bordes suaves (#e2e5e9)
- Tema oscuro: fondo #0d1117, cards #161b22, bordes #30363d (estilo actual mejorado)
- Variables CSS para todos los colores, cambiadas por `data-theme` en `<html>`

### Navegación (4 pestañas)

1. **Cheatsheets** — plantillas de registro clínico (existentes + nuevas)
2. **Escalas** — calculadoras interactivas con Box SCA destacado
3. **Protocolos** — algoritmos de decisión paso a paso (nuevo)
4. **Fármacos** — dosificación rápida con calculadora por peso (nuevo)

### Buscador global

- Campo de búsqueda en el header, busca en TODAS las pestañas
- Filtra por nombre, tags, y contenido de las cards
- Al buscar, muestra resultados de todas las pestañas con indicador de origen

### Favoritos/recientes

- Estrella en cada card para fijar como favorito (localStorage)
- Los favoritos aparecen primero en cada pestaña
- Sección "Recientes" con las 5 últimas escalas usadas

### Mobile-first

- Touch targets mínimo 44px para todos los inputs
- Grid responsive: 1 columna en móvil, 2 en tablet, 3 en desktop
- Header sticky compacto en scroll
- Botones de acción más grandes en las escalas

### Resultado copiable estandarizado

Cada escala tiene un botón "Copiar resultado" que genera texto formateado para la historia clínica:

```
[NOMBRE_ESCALA]: [puntos] — [interpretación]
[detalle clínico]
```

Ejemplos:
- `qSOFA: 2/3 — ≥2 criterios — ALTO RIESGO SEPSIS — activar protocolo`
- `CURB-65: 3/5 — Grave — Ingreso UCI valorar (mortalidad ~17%)`
- `GRACE: 156 — Riesgo alto — Mortalidad >3% · invasiva precoz <24 h`
- `Wells TEP: 7,5 — Probabilidad alta — AngioTC directo sin DD previo`

El Box SCA ya tiene esta funcionalidad (`copySCA()`); se extiende a todas las escalas.

## Contenido clínico a añadir

### Escalas nuevas

| Escala | Uso | Badge |
|--------|-----|-------|
| NEWS2 | Triaje general — detección precoz de deterioro | Triaje |
| APACHE II | Pronóstico UCI | UCI |
| Ranson | Pancreatitis — complementa BISAP | Digestivo |
| SAPS II | Pronóstico UCI | UCI |
| MELD | Hepatopatía | Digestivo |
| Child-Pugh | Cirrosis | Digestivo |
| 4AT | Delirium — screening rápido | Neuro |
| CAM-ICU | Delirium en UCI | UCI |
| PSI/PORT | Neumonía — complementa CURB-65 | Respiratorio |
| RASS | Sedación en UCI | UCI |
| MRC | Disnea | Respiratorio |

### Cheatsheets nuevos

| Cheatsheet | Categoría | Badge |
|------------|-----------|-------|
| Anafilaxia | Crítico | Rojo |
| Politrauma / ATLS (ABCDE) | Crítico | Rojo |
| Arritmias (FA rápida, TPSV, bradicardia, TV) | Cardiológico | Ámbar |
| Crisis asmática | Respiratorio | Ámbar |
| Dolor abdominal agudo (diferencial) | Digestivo | Ámbar |
| Convulsiones / Status epiléptico | Neurológico | Ámbar |
| TCE | Neurológico | Ámbar |
| Trombosis venosa profunda | Vascular | Ámbar |

### Protocolos (nueva pestaña)

Algoritmos paso a paso con decisiones binarias y acciones:

| Protocolo | Formato |
|-----------|---------|
| RCP / SVA — desfibrilable vs no desfibrilable | Flowchart interactivo |
| Vía aérea difícil — plan A/B/C/D | Checklist expandible |
| Secuencia rápida de intubación | Checklist con dosis |
| Manejo de hiperkalemia | Escalones de tratamiento |
| Protocolo de transfusión masiva | Checklist con ratios |
| Manejo del dolor torácico | Árbol de decisión |

### Fármacos (nueva pestaña)

Dosificación rápida con calculadora por peso del paciente:

| Grupo | Fármacos |
|-------|----------|
| Drogas vasoactivas | Noradrenalina, dopamina, dobutamina (diluciones + dosis) |
| Sedación/analgesia | Midazolam, fentanilo, ketamina, propofol |
| Antiarrítmicos | Amiodarona, adenosina, verapamilo, flecainida |
| Urgencias | Adrenalina, atropina, bicarbonato, gluconato cálcico |
| Anticoagulación | Heparina sódica (carga + perfusión), enoxaparina |
| Otros | Fibrinolíticos (alteplasa), antídotos comunes |

Cada fármaco tiene:
- Campo "Peso del paciente (kg)" que recalcula automáticamente todas las dosis
- Dilución estándar y concentración resultante
- Dosis habitual con rango (mín/máx)
- Alertas de contraindicaciones clave

## Despliegue

### PWA

- `manifest.json`: nombre "URG Clínico", icono cruz médica, `display: standalone`
- `sw.js`: estrategia cache-first — cachea todos los archivos al instalar
- Funciona 100% offline tras primera visita

### Hosting

- Cloudflare Pages conectado al repo GitHub `juliandavidhiguera/urgencias`
- Deploy automático en push a `main`
- Subdominio: `urgencias.doctorhiguera.com` (CNAME en Cloudflare DNS)
- Sin protección de acceso — solo URL oculta

## Code review del código existente

Problemas identificados a corregir:
1. `event.target` en `showTab()` — depende del event global, no robusto
2. HTML entities en JS strings (p.ej. `&gt;` en labels de escalas) — deberían ser texto plano cuando se renderizan via JS
3. Repetición de patrones de cálculo de escalas — ya resuelto parcialmente con EXTRA_SCALES engine
4. Sin meta description ni og tags
5. Sin favicon
6. Print CSS incompleto

## Fuera de alcance

- Autenticación/login
- Base de datos de pacientes
- Integración con HIS del hospital
- App nativa (la PWA cubre el caso de uso)
