# HANDOFF - urgencias (URG CLÍNICO)
> Leer integro ANTES de tocar codigo. Actualizar ANTES de cerrar sesion.
**Ultima actualizacion:** 2026-08-27 | **Sesion #:** 3 | **Rama:** main | **HEAD:** 22ef883

## 1. OBJETIVO DEL PROYECTO
PWA de consulta rapida para urgencias: cheatsheets, escalas clinicas, formulas, protocolos de codigos de activacion (IAM/ictus/trauma/sepsis/riesgo suicidio), farmacos con perfusion IV calculada por peso, checklist de intubacion/SIR, fichas tecnicas y bibliografia. "Terminado" no aplica (herramienta viva de uso clinico); cada sesion anade/corrige contenido o UI.

## 2. STACK Y ARQUITECTURA
| Capa | Tecnologia | Version | Archivo clave |
|---|---|---|---|
| Frontend | HTML/CSS/JS vanilla, sin build ni framework | - | `index.html` (2388 lineas, monolito con CSS+JS embebidos) |
| Datos | Modulos JS `window.X = [...]` cargados como `<script>` | - | `data/{cheatsheets,scales,formulas,protocols,drugs,infusions,intubacion,fichas,bibliografia}.js` |
| Offline | Service Worker cache-first | `CACHE = 'urg-v47'` | `sw.js` |
| PWA | Manifest | - | `manifest.json`, `icon.svg` |
| Hosting | Cloudflare Pages, deploy automatico en push a `main` | - | (integracion nativa GitHub, sin paso de build) |
| CI | GitHub Action: purga cache de Cloudflare tras deploy | - | `.github/workflows/purge-cache.yml` (espera 90s, purga URLs fijas via `CF_URGENCIAS_PURGE_TOKEN`/`CF_ZONE_ID`) |
| Ingesta de fichas | Scripts Node puntuales (no pipeline automatizado) | - | `scripts/parse_fichas.js` (parsea `medicamentos/*.md`, extraido de PDF de Guies Cliniques catalanas), `scripts/merge_fichas.js` (75 fichas → `data/fichas.js`), `scripts/patch_fichas_verificacion.js` |

**Decisiones cerradas (no re-discutir):**
- Sin backend, sin framework, sin build: todo el frontend vive en `index.html` + `data/*.js` cargados directo por `<script>`. Confirmado sin `fetch()`, sin `<form>`, sin secretos en codigo.
- `localStorage` solo para `urg-favs`/`urg-recent`/`urg-theme` (favoritos, recientes, tema) — nunca dato de paciente.
- Cache-first en `sw.js`: **cada cambio en `index.html` o `data/*.js` exige subir `CACHE` en `sw.js`** o los usuarios con la app instalada siguen viendo contenido clinico desactualizado indefinidamente (ver commit `14108b3`, que ademas bajo `Cache-Control` a 5 min y agrego la purga de Cloudflare como segunda red de seguridad).
- Dosis de farmacos siempre con peso real; peso ideal solo para volumen tidal (ver memoria de usuario `peso_real_vs_ideal_dosis`).
- `data/infusions.js` es la **unica fuente de verdad** para calculo de mL/h de perfusion IV. `data/drugs.js` no debe tener su propio `doseCalc`/`extra` que calcule mL/h para un farmaco que tambien este en `INFUSIONS` — solo `infusionRef` + boton "Perfusion IV". Motivo: sesion 3 encontro 4 farmacos (noradrenalina, dopamina, dobutamina, midazolam) con dos diluciones de referencia distintas en cada archivo, hasta 6x de discrepancia en mL/h para la misma dosis prescrita.

## 3. MAPA DE ARCHIVOS CRITICOS
| Ruta | Funcion | Estado |
|---|---|---|
| `index.html` | Toda la UI: 9 tabs (cheatsheets, escalas, formulas, protocolos, farmacos, perfusiones, intubacion, fichas, bibliografia), busqueda global, favoritos/recientes, tema | ESTABLE |
| `data/drugs.js` | Farmacos de urgencias: dosis, alertas, antidotos, perfusion IV por peso | ESTABLE |
| `data/fichas.js` | 75 fichas tecnicas de medicamentos (generadas desde `medicamentos/*.md`) | ESTABLE |
| `data/intubacion.js` + tab `#tab-intubacion` (linea 919) | Checklist SIR, registro de dosis administrada/hora, perfusiones de mantenimiento post-intubacion | EN_CURSO (foco de las ultimas 7 sesiones de commits) |
| `data/scales.js` | Escalas clinicas agrupadas por sistema (16+ escalas, incluye 3D/3D+, ABCD2, Hestia, etc.) | ESTABLE |
| `data/protocols.js` | Protocolos de codigos de activacion + toxindromes/intoxicaciones | ESTABLE |
| `codigos/*.pdf` + `codigos/Fitxa_resum_codis_activacio.md` | Documentos fuente de los codigos de activacion (IAM, ictus, PPT, sepsia, riesgo suicidio) — referencia, no se parsean a JS | ESTABLE |
| `codigos/patrones iam nuevos/*.jpg` | Galeria de patrones ECG de oclusion coronaria (OMI) usada en tab codi-IAM | ESTABLE |
| `medicamentos/*.md` (75 archivos) | Texto fuente en catalan extraido de PDF de Guies Cliniques — input de `parse_fichas.js` | ESTABLE (fuente, no se edita a mano salvo error de OCR) |
| `sw.js` | Service worker cache-first, `CACHE='urg-v46'`, precachea tambien `codigos/*.pdf` y `codigos/patrones iam nuevos/*.jpg` | ESTABLE — **recordar bump en cada cambio de datos/HTML** |
| `.github/workflows/purge-cache.yml` | Purga Cloudflare tras cada push a main (espera 90s) | ESTABLE |
| `Calculadora_Index_Fragil_VIG.md` | Plantilla original (catalan) del Index Fragil-VIG, trackeada como referencia | ESTABLE |

## 4. ESTADO ACTUAL - QUE FUNCIONA
- App carga y todos los tabs renderizan (verificado en navegador local sesion 3, ver seccion 5, ademas de lectura de `index.html` + `data/*.js`).
- Busqueda global (`globalSearch()`, linea 1169) filtra por `SEARCH_ITEM_SELECTOR` (linea 1135) sobre `.card, .scale-card, .protocol-card, .drug-card, .ficha-list-btn` — cubre cheatsheets/escalas/protocolos/farmacos/fichas.
- Intubacion: checklist SIR con sincronizacion automatica de hora/dosis administrada al marcar farmaco (commits `754da86`, `8d68f98`), edicion de concentracion/dilucion por farmaco en mantenimiento (`0c38f78`), farmacos de bomba fuera de SIR (`88a62c8`).
- Verificacion clinica de contenido con Vera (ver commits `59e4aa7`, `a6d8e14`, `f59c4f3`, `a38bbbb`, `28aa6c0`) — proceso manual, no automatizado.
- No hay suite de tests ni CI de verificacion funcional: la unica verificacion es lectura de codigo y revision clinica manual.

## 5. CAMBIOS POR SESION (log inverso, mas reciente arriba)

### Sesion 3 (continuacion) - 2026-08-27
- Resuelto backlog #4 (BUG-5): techo de perfusion de Fentanilo. Consultado con skill `md-urg-hosp` (Vera + Perplexity): Vera cito 0.7-10 µg/kg/h (PMID 33170331) con "10" como techo mas citado en tablas de UCI pero sin techo universal; Perplexity confirmo variabilidad institucional real (protocolos 0.5-2 hasta 5-6 µg/kg/h) sin cambio de guia mayor. Ninguna fuente confirmaba 2.0 ni 3.0 como el techo unico — se le presento la discrepancia al usuario, quien eligio 2.0 µg/kg/h (mas conservador, coincide con `infusions.js`).
- Modificado: `data/drugs.js` — Fentanilo: eliminado `extra()` (calculo de mL/h con techo 3.0, desalineado de `infusions.js` que usa 2.0); `doseRange` actualizado a "Perfusión 0.5–2 µg/kg/h". Mismo patron que BUG-2 (sesion 3 inicial).
- Modificado: `sw.js` — `CACHE` de `urg-v46` a `urg-v47`.
- Verificado en navegador local: card de Fentanilo muestra el rango actualizado, sin "Cálculo adicional" duplicado, sin errores de consola.
- Decisiones tomadas: NO promediar ni elegir en silencio entre las dos cifras — se presento la evidencia (con discrepancia explicita entre Vera y Perplexity) y se dejo la decision clinica al usuario, siguiendo el protocolo de `md-urg-hosp`.

### Sesion 3 - 2026-08-27
- Auditoria con 3 agentes en paralelo (`engineering-code-reviewer`, `testing-accessibility-auditor`, `engineering-frontend-developer`) sobre calidad de codigo, accesibilidad y performance de todo el proyecto.
- Modificado: `data/drugs.js` — eliminado `doseCalc`/`extra` (calculo de mL/h) de Noradrenalina, Dopamina, Dobutamina y Midazolam; quedan solo con `doseRange` texto + `infusionRef` hacia `data/infusions.js` (unica fuente de verdad, ver seccion 2).
- Modificado: `index.html:2078` — fix de Atropina en checklist de intubacion: el suelo `doseMinAbs` ahora se aplica tambien a `mgMax` (antes mostraba rangos invertidos tipo "0.10–0.06 mg" en pediatria).
- Modificado: `sw.js` — `CACHE` de `urg-v45` a `urg-v46`; se agregan al precache los 5 PDF de `codigos/*.pdf` y las 11 fotos de `codigos/patrones iam nuevos/*.jpg` (antes fallaban offline durante un codigo real).
- Modificado: `index.html` — accesibilidad: `_scaleCtrl`/`renderOneScale` usan `<label for>` en vez de `<span>` suelto (cubre TODAS las escalas y formulas de una vez); modal de fichas (`showFicha`/`closeFicha`/`openGaleria`) con `role="dialog"`, `aria-modal`, gestion de foco (foco al abrir, retorno al trigger al cerrar) y trampa de Tab; `aria-live`/`role="alert"` en alertas de perfusion IV y resultados calculados (tiles SCA, score-display, dosis de intubacion); `section-title`/`scale-title` pasan de `div` a `h2`/`h3` (jerarquia de encabezados); `outline` visible en `:focus-visible` de inputs (antes `outline:none`); `aria-label` en inputs del checklist de intubacion y en la busqueda global; debounce de 130ms en `globalSearch`.
- Commits: `fd8437d` fix: unificar calculo de perfusion IV y corregir gaps de seguridad clinica y accesibilidad
- Decisiones tomadas: unificar el calculo de perfusion IV en `infusions.js` en vez de decidir manualmente que dilucion es la clinicamente correcta (evita que el agente tome una decision clinica que no le corresponde). NO se toco el boton de favorito anidado en `<summary>` (hallazgo de accesibilidad medio) por requerir rediseño estructural con riesgo de regresion visual no verificable sin browser en cada tema/card. NO se implemento lazy-load de `fichas.js` ni render diferido de tabs no visibles (hallazgos de performance alto) porque `globalSearch()` depende de que TODAS las tabs esten ya renderizadas en el DOM — es el mismo bug que se corrigio en la sesion 2; lazy-load las hubiera reintroducido.
- Verificado: servidor estatico local + Claude in Chrome — sin errores de consola; confirmado visualmente el fix de Fármacos (Noradrenalina/Dopamina/Dobutamina sin "Dosis calculada" duplicada, Fentanilo/Propofol sin cambios), el link a Perfusión IV con la dilución correcta, la alerta `role="alert"` disparando al poner dosis fuera de rango, Atropina mostrando "0.1 mg" a 3 kg, y el modal de fichas cerrando con Escape y devolviendo el foco al boton que lo abrio.
- Push a `origin/main` (`fd8437d`) — deploy automatico de Cloudflare Pages + purga de cache en curso.

### Sesion 2 - 2026-08-27
- Modificado: `index.html:1135` — `SEARCH_ITEM_SELECTOR` ahora incluye `.event-row, .drug-row` (filas del tab Intubacion).
- Modificado: `sw.js` — `CACHE` de `urg-v44` a `urg-v45` (obligatorio por el cambio en `index.html`, ver seccion 9).
- Commits: `3e73c6e` fix(busqueda): incluir Intubacion en el selector de busqueda global
- Decisiones tomadas: fix minimo de una linea, sin tocar el resto del selector ni la logica de `globalSearch()`.
- Descartado y por que: no se toco el hallazgo de estilo (uso de rayas) que senalo el hook de `impeccable` al editar — es preexistente en el archivo, sin relacion con este cambio.

### Sesion 1 - 2026-08-27
- Anadido: `HANDOFF.md` (Modo A, primera vez que existe en este repo).
- Anadido: `.claude/agents/*.md` (9 agentes curados: `agents-orchestrator`, `engineering-code-reviewer`, `engineering-git-workflow-master`, `engineering-minimal-change-engineer`, `engineering-rapid-prototyper`, `engineering-technical-writer`, `engineering-frontend-developer`, `testing-accessibility-auditor`, `healthcare-clinical-evidence-agent`) via `/curar-agentes`, copiados desde la biblioteca en `~/git/nuevo-proyecto`.
- Commits: `7631aa7` chore(agents): curar agentes de Claude Code para el proyecto
- Decisiones tomadas: nucleo de agentes reducido (sin bloque seguridad/privacidad, sin `-software-architect`, sin `project-manager-senior`) porque el proyecto no tiene backend/secretos/dato de paciente y es de una sola persona — mismo criterio que `git/herramientas`. Registro completo del razonamiento en `~/git/nuevo-proyecto/PROJECT.md`.
- Descartado y por que: no se agrego ningun agente adicional de la biblioteca de 270 mas alla de esos 9 — el resto (marketing, juegos, GIS, finanzas, enterprise, etc.) no cubre nada real de este proyecto.
- Hallazgo (sin fix aplicado, ver seccion 7): `globalSearch()` no incluye `.event-row`/`.drug-row` (contenido del tab Intubacion) en `SEARCH_ITEM_SELECTOR` — la busqueda global oculta ese tab completo. Confirmado leyendo `index.html` linea 1135 vs 350-362/1902-1953; nota previa de `/impeccable critique` (2026-08-25, `.impeccable/critique/`, no versionada) decia lo mismo mas un problema identico en Fichas (`.ficha-list-btn`) que **ya esta resuelto** en el codigo actual — solo Intubacion sigue pendiente.

## 6. PENDIENTE - BACKLOG PRIORIZADO
| # | Tarea | Archivos | Prioridad | Bloqueado por | Criterio de hecho |
|---|---|---|---|---|---|
| 1 | Bump manual de `CACHE` en `sw.js` en cada deploy que toque `index.html`/`data/*.js` (recordatorio operativo, no una tarea de codigo) | `sw.js` | P2 | - | N/A — disciplina de proceso, verificar en cada PR que toque esos archivos |
| 2 | ~~Sacar el boton de favorito (★) de dentro del `<summary>`~~ — INTENTADO Y REVERTIDO sesion 3 (2026-08-27): Chrome envuelve internamente TODO hijo no-`<summary>` de un `<details>` en un `::details-content` que se colapsa/oculta cuando el details esta cerrado — un boton hermano de `<summary>` (fuera de el) solo es visible/clicable con la tarjeta expandida (confirmado con `card.open=true/false` + `offsetTop` via JS: 49px/invisible cuando cerrado vs 8px/visible cuando abierto). No hay forma de lograrlo sin abandonar `<details>` nativo por un disclosure widget custom (JS + aria-expanded) — cambio grande, no quirurgico. Mantener el boton dentro de `<summary>` es la opcion correcta dado este limite del navegador | `index.html` | P3 (bloqueado por limite de plataforma, no de codigo) | Reescribir cards/escalas/protocolos sin `<details>` nativo | Requiere decision del usuario: ¿vale la pena cambiar 4 templates a un disclosure widget custom por este unico hallazgo de accesibilidad medio? |
| 3 | Evaluar indice de busqueda separado (no depender de que cada tab este renderizada en el DOM) para poder diferir `data/fichas.js` (172 KB) y el render de tabs no visibles sin romper `globalSearch()` — usuario confirmo sesion 3 dejarlo en espera: el ahorro de performance (~50-150ms) no justifica el riesgo de tocar `globalSearch()`, que ya tuvo 2 bugs reales (BUG-1, Fichas). No re-priorizar sin que el usuario reporte lentitud real | `index.html` (`globalSearch`, `SEARCH_ITEM_SELECTOR`) | P3 (en espera, decision explicita del usuario) | - | `fichas.js` carga diferido y las tabs no visitadas no se renderizan al inicio, `globalSearch` sigue encontrando resultados en todas las tabs sin abrirlas primero |

## 7. BUGS CONOCIDOS Y DEUDA TECNICA
| ID | Sintoma | Reproduccion | Hipotesis de causa | Impacto |
|---|---|---|---|---|
| ~~BUG-1~~ | ~~El tab Intubacion desaparecia por completo al usar la busqueda global~~ — CORREGIDO sesion 2 (2026-08-27) | - | `SEARCH_ITEM_SELECTOR` no incluia `.event-row`/`.drug-row` | Resuelto: selector ahora incluye ambas clases (`index.html:1135`) |
| ~~BUG-2~~ | ~~Noradrenalina/Dopamina/Dobutamina/Midazolam calculaban mL/h distinto en Fármacos vs Perfusión IV (hasta 6x)~~ — CORREGIDO sesion 3 (2026-08-27) | - | `drugs.js` tenia su propia dilucion de referencia, distinta a `infusions.js` | Resuelto: `drugs.js` ya no calcula mL/h para esos 4 farmacos, `infusions.js` es la unica fuente (`fd8437d`) |
| ~~BUG-3~~ | ~~Atropina mostraba rango invertido en intubacion pediatrica (ej. "0.10–0.06 mg")~~ — CORREGIDO sesion 3 (2026-08-27) | Peso <5 kg con Atropina en checklist de intubacion | `doseMinAbs` se aplicaba solo a `mgMin`, no a `mgMax` | Resuelto: floor aplicado a ambos (`index.html:2078`) |
| ~~BUG-5~~ | ~~Fentanilo: techo de perfusion 3 µg/kg/h en drugs.js vs 2.0 en infusions.js~~ — RESUELTO sesion 3 continuacion (2026-08-27) | - | Mismo patron que BUG-2, no detectado en la primera pasada de auditoria | Consultado Vera+Perplexity (ninguna fuente confirmaba 3.0 ni 2.0 como techo unico; rango aceptado 0.5-10 segun protocolo). Usuario eligio 2.0 (mas conservador). `drugs.js` ya no calcula mL/h de Fentanilo, `infusions.js` (doseMax:2.0) es la unica fuente |
| ~~BUG-4~~ | ~~PDF y fotos de patrones ECG de codigos de activacion no funcionaban offline~~ — CORREGIDO sesion 3 (2026-08-27) | Abrir "Ver folleto original" o "Ver patrones IAM" sin conexion, primera vez | No estaban en `ASSETS` de `sw.js` | Resuelto: precacheados, `CACHE` bumpeado a `urg-v46` |

## 8. ENTORNO Y COMANDOS
- Sin instalacion: es HTML/CSS/JS estatico, se abre `index.html` directo o se sirve con cualquier servidor estatico.
- Scripts de ingesta de fichas (uso puntual, no en cada sesion): `node scripts/parse_fichas.js` luego `node scripts/merge_fichas.js` (requieren los `scripts/fichas_es_batch*.json` y `medicamentos/*.md` presentes).
- Deploy: automatico via integracion nativa Cloudflare Pages ↔ GitHub en cada push a `main`. No hay comando manual de deploy en este repo.
- Purga de cache: automatica por GitHub Action tras push a main (usa secrets `CF_URGENCIAS_PURGE_TOKEN`, `CF_ZONE_ID` — nombres, no valores, configurados en GitHub).
- No hay variables de entorno locales, no hay `.env`.
- No hay comando de test ni de build.

## 9. TRAMPAS Y CONTEXTO NO OBVIO
- **Nunca olvidar el bump de `CACHE` en `sw.js`** al tocar `index.html` o cualquier `data/*.js` — el service worker es cache-first puro (`caches.match(e.request).then(r => r || fetch(e.request))`), sin fallback de red-primero. Sin bump, usuarios con la app instalada quedan atascados en contenido clinico viejo hasta que limpien cache a mano.
- `medicamentos/*.md` son texto crudo extraido de PDF (catalan) — contienen caracteres de Private Use Area por glifos de fuente incrustada que `parse_fichas.js` limpia con una regex (`raw.replace(/[-]/g, '')`, linea ~24) — no editar esos `.md` a mano sin entender ese artefacto.
- `.impeccable/`, `.wrangler/`, `.gstack/` estan en `.gitignore` — son directorios de trabajo local de las skills `impeccable`/`wrangler`/`gstack`, nunca se versionan. Las notas de critica de `/impeccable` en `.impeccable/critique/*.md` no sobreviven a un `git clone` fresco: si se necesita ese historial, extraer lo accionable a este HANDOFF (como se hizo con BUG-1) antes de que se pierda.
- Contenido clinico verificado manualmente con Vera (herramienta de verificacion) en varias sesiones recientes (`59e4aa7`, `a6d8e14`, etc.) — no asumir que un farmaco/dosis nuevo esta verificado solo porque esta en el repo; revisar el mensaje del commit que lo introdujo.
- `scripts/merge_fichas.js` espera exactamente 75 entradas (`if (merged.length !== 75) console.error('WARNING...')`) — si se agrega o quita una ficha, ese numero hardcodeado tambien hay que actualizarlo.
- `globalSearch()` (index.html) asume que las 9 tabs estan SIEMPRE completamente renderizadas en el DOM desde el arranque (`render*()` corridos al final del `<script>`) — cualquier intento futuro de lazy-load/defer de una tab o de `data/*.js` para mejorar performance debe primero resolver esto (ver backlog #3), o reintroduce el mismo bug que BUG-1/BUG-4.
- `data/drugs.js` y `data/infusions.js` describen el MISMO farmaco con campos distintos (`dilution`/`doseRange` vs `mg`/`vol`/`doseMin`/`doseMax`) — si un farmaco esta en ambos archivos, NUNCA le agregues un `doseCalc`/`extra` en `drugs.js` que calcule mL/h con una dilucion propia: usa `infusionRef` + el boton "Perfusion IV" para remitir a `infusions.js` (ver seccion 2 y BUG-2).
- **Un `<details>` cerrado oculta TODO hijo que no sea `<summary>`** (Chrome lo envuelve en un `::details-content` interno que colapsa cuando `open=false`) — NO se puede poner un boton/elemento persistente-visible como hermano de `<summary>` esperando que se vea con la tarjeta colapsada; solo se ve con `<details open>`. Confirmado en sesion 3 (backlog #2, revertido) con `card.open=true/false` + `offsetTop` via JS. Cualquier control que deba estar visible en el estado colapsado (favoritos, badges, etc.) tiene que ir DENTRO de `<summary>`, aceptando el patron control-dentro-de-control.

## 10. SIGUIENTE ACCION INMEDIATA
Backlog revisado por completo sesion 3: #1 es disciplina de proceso (sin accion), #2 tecnicamente inviable sin reescribir a disclosure widget custom (en espera de decision del usuario si vale la pena), #3 en espera explicita del usuario. No hay pendiente critico ni tarea inmediata abierta — la proxima sesion arranca sin bloqueantes conocidos.
