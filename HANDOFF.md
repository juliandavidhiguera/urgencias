# HANDOFF - urgencias (URG CLÍNICO)
> Leer integro ANTES de tocar codigo. Actualizar ANTES de cerrar sesion.
**Ultima actualizacion:** 2026-08-27 | **Sesion #:** 1 | **Rama:** main | **HEAD:** 7631aa7

## 1. OBJETIVO DEL PROYECTO
PWA de consulta rapida para urgencias: cheatsheets, escalas clinicas, formulas, protocolos de codigos de activacion (IAM/ictus/trauma/sepsis/riesgo suicidio), farmacos con perfusion IV calculada por peso, checklist de intubacion/SIR, fichas tecnicas y bibliografia. "Terminado" no aplica (herramienta viva de uso clinico); cada sesion anade/corrige contenido o UI.

## 2. STACK Y ARQUITECTURA
| Capa | Tecnologia | Version | Archivo clave |
|---|---|---|---|
| Frontend | HTML/CSS/JS vanilla, sin build ni framework | - | `index.html` (2388 lineas, monolito con CSS+JS embebidos) |
| Datos | Modulos JS `window.X = [...]` cargados como `<script>` | - | `data/{cheatsheets,scales,formulas,protocols,drugs,infusions,intubacion,fichas,bibliografia}.js` |
| Offline | Service Worker cache-first | `CACHE = 'urg-v44'` | `sw.js` |
| PWA | Manifest | - | `manifest.json`, `icon.svg` |
| Hosting | Cloudflare Pages, deploy automatico en push a `main` | - | (integracion nativa GitHub, sin paso de build) |
| CI | GitHub Action: purga cache de Cloudflare tras deploy | - | `.github/workflows/purge-cache.yml` (espera 90s, purga URLs fijas via `CF_URGENCIAS_PURGE_TOKEN`/`CF_ZONE_ID`) |
| Ingesta de fichas | Scripts Node puntuales (no pipeline automatizado) | - | `scripts/parse_fichas.js` (parsea `medicamentos/*.md`, extraido de PDF de Guies Cliniques catalanas), `scripts/merge_fichas.js` (75 fichas → `data/fichas.js`), `scripts/patch_fichas_verificacion.js` |

**Decisiones cerradas (no re-discutir):**
- Sin backend, sin framework, sin build: todo el frontend vive en `index.html` + `data/*.js` cargados directo por `<script>`. Confirmado sin `fetch()`, sin `<form>`, sin secretos en codigo.
- `localStorage` solo para `urg-favs`/`urg-recent`/`urg-theme` (favoritos, recientes, tema) — nunca dato de paciente.
- Cache-first en `sw.js`: **cada cambio en `index.html` o `data/*.js` exige subir `CACHE` en `sw.js`** o los usuarios con la app instalada siguen viendo contenido clinico desactualizado indefinidamente (ver commit `14108b3`, que ademas bajo `Cache-Control` a 5 min y agrego la purga de Cloudflare como segunda red de seguridad).
- Dosis de farmacos siempre con peso real; peso ideal solo para volumen tidal (ver memoria de usuario `peso_real_vs_ideal_dosis`).

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
| `sw.js` | Service worker cache-first, `CACHE='urg-v44'` | ESTABLE — **recordar bump en cada cambio de datos/HTML** |
| `.github/workflows/purge-cache.yml` | Purga Cloudflare tras cada push a main (espera 90s) | ESTABLE |
| `Calculadora_Index_Fragil_VIG.md` | Plantilla original (catalan) del Index Fragil-VIG, trackeada como referencia | ESTABLE |

## 4. ESTADO ACTUAL - QUE FUNCIONA
- App carga y todos los tabs renderizan (verificado leyendo `index.html` completo + `data/*.js`, sin ejecutar en navegador esta sesion).
- Busqueda global (`globalSearch()`, linea 1169) filtra por `SEARCH_ITEM_SELECTOR` (linea 1135) sobre `.card, .scale-card, .protocol-card, .drug-card, .ficha-list-btn` — cubre cheatsheets/escalas/protocolos/farmacos/fichas.
- Intubacion: checklist SIR con sincronizacion automatica de hora/dosis administrada al marcar farmaco (commits `754da86`, `8d68f98`), edicion de concentracion/dilucion por farmaco en mantenimiento (`0c38f78`), farmacos de bomba fuera de SIR (`88a62c8`).
- Verificacion clinica de contenido con Vera (ver commits `59e4aa7`, `a6d8e14`, `f59c4f3`, `a38bbbb`, `28aa6c0`) — proceso manual, no automatizado.
- No hay suite de tests ni CI de verificacion funcional: la unica verificacion es lectura de codigo y revision clinica manual.

## 5. CAMBIOS POR SESION (log inverso, mas reciente arriba)

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
| 1 | Agregar `.event-row, .drug-row` a `SEARCH_ITEM_SELECTOR` para que la busqueda global cubra el tab Intubacion | `index.html:1135` | P1 | - | Buscar el nombre de un farmaco que solo existe en Intubacion desde la caja "Buscar en todo…" y verificar que el tab aparece |
| 2 | Bump manual de `CACHE` en `sw.js` en cada deploy que toque `index.html`/`data/*.js` (recordatorio operativo, no una tarea de codigo) | `sw.js` | P2 | - | N/A — disciplina de proceso, verificar en cada PR que toque esos archivos |

## 7. BUGS CONOCIDOS Y DEUDA TECNICA
| ID | Sintoma | Reproduccion | Hipotesis de causa | Impacto |
|---|---|---|---|---|
| BUG-1 | El tab Intubacion desaparece por completo al usar la busqueda global | Escribir cualquier texto en "Buscar en todo…" mientras se esta en o se busca contenido de Intubacion | `SEARCH_ITEM_SELECTOR` (`index.html:1135`) no incluye `.event-row`/`.drug-row`, las clases reales de las filas de Intubacion (`index.html:1902,1918,1953`) — `hasVisible` queda `false` y el tab se oculta | Medio: un farmaco o paso documentado solo en Intubacion es invisible a la busqueda global, aunque siga accesible navegando el tab manualmente |

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

## 10. SIGUIENTE ACCION INMEDIATA
Corregir BUG-1: agregar `.event-row, .drug-row` a `SEARCH_ITEM_SELECTOR` en `index.html:1135` y verificar manualmente que la busqueda global ya no oculta el tab Intubacion.
